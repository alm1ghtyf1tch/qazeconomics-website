import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { PGlite } from "@electric-sql/pglite";
import {
  contentHref,
  contentSchema,
  parseContentForm,
  slugify,
  type ContentInput,
} from "../src/lib/cms/schema";

const valid: ContentInput = {
  kind: "article",
  title: "Test article",
  slug: "test-article",
  status: "draft",
  summary: "",
  body: "",
  category: "",
  author: "",
  date_label: "",
  location: "",
  event_status: "upcoming",
  external_url: "",
  cover_url: "",
  cover_alt: "",
  accent: "blue",
  facts: [],
  key_terms: [],
};

test("drafts may be incomplete but publication needs content and event dates", () => {
  assert.equal(contentSchema.safeParse(valid).success, true);
  assert.equal(
    contentSchema.safeParse({ ...valid, status: "published" }).success,
    false,
  );
  assert.equal(
    contentSchema.safeParse({
      ...valid,
      status: "published",
      body: "A full body.",
    }).success,
    true,
  );
  assert.equal(
    contentSchema.safeParse({
      ...valid,
      kind: "olympiad",
      status: "published",
      summary: "Details",
    }).success,
    false,
  );
  assert.equal(
    contentSchema.safeParse({
      ...valid,
      kind: "olympiad",
      status: "published",
      summary: "Details",
      date_label: "To be announced",
    }).success,
    true,
  );
});

test("URLs, image descriptions and slugs are validated", () => {
  for (const url of [
    "javascript:alert(1)",
    "data:text/html,hi",
    "//example.com",
    "https://user:pass@example.com",
  ])
    assert.equal(
      contentSchema.safeParse({ ...valid, external_url: url }).success,
      false,
    );
  assert.equal(
    contentSchema.safeParse({
      ...valid,
      cover_url: "https://example.com/photo.jpg",
    }).success,
    false,
  );
  assert.equal(
    contentSchema.safeParse({ ...valid, slug: "../../admin" }).success,
    false,
  );
  assert.equal(
    contentSchema.safeParse({
      ...valid,
      cover_url: "https://example.com/photo.jpg",
      cover_alt: "Students at the event",
    }).success,
    true,
  );
  assert.equal(
    slugify("  An Economic Perspective! "),
    "an-economic-perspective",
  );
  assert.equal(
    contentHref({ kind: "olympiad", slug: "competition" }),
    "/events/competition",
  );
});

test("form parsing preserves multiline text and splits facts safely", () => {
  const form = new FormData();
  Object.entries(valid).forEach(([key, value]) => form.set(key, String(value)));
  form.set("facts", "One fact\n\n Another fact ");
  form.set("body", "## Heading\n\nParagraph.");
  const result = parseContentForm(form);
  assert.equal(result.success, true);
  if (result.success) {
    assert.deepEqual(result.data.facts, ["One fact", "Another fact"]);
    assert.equal(result.data.body, "## Heading\n\nParagraph.");
  }
});

test("migration enforces actual PostgreSQL permissions and preserves seeded content", async () => {
  const db = new PGlite();
  try {
    await db.exec(`create role anon; create role authenticated; create schema auth;
      create table auth.users (id uuid primary key);
      create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid $$;
      grant usage on schema public, auth to anon, authenticated;
      grant execute on function auth.uid() to anon, authenticated;
      insert into auth.users values ('00000000-0000-4000-8000-000000000001'), ('00000000-0000-4000-8000-000000000002');`);
    await db.exec(
      await readFile(
        "supabase/migrations/202609230001_content_admin.sql",
        "utf8",
      ),
    );
    const seed = await readFile("supabase/seed.sql", "utf8");
    await db.exec(seed);
    await db.exec(seed);
    const { rows } = await db.query<{ count: number }>(
      "select count(*)::int as count from public.content",
    );
    assert.equal(rows[0].count, 19);
    await db.exec(
      "insert into public.cms_admins(user_id) values ('00000000-0000-4000-8000-000000000001');",
    );
    await db.exec(
      "set role authenticated; set request.jwt.claim.sub = '00000000-0000-4000-8000-000000000001';",
    );
    await db.exec(
      "insert into public.content(kind,title,slug,body) values ('post','Private draft','private-draft','Private content');",
    );
    await db.exec("reset role; set role anon;");
    assert.equal(
      (
        await db.query(
          "select * from public.content where slug = 'private-draft'",
        )
      ).rows.length,
      0,
    );
    await assert.rejects(
      db.exec(
        "insert into public.content(kind,title,slug) values ('post','Forbidden','forbidden');",
      ),
    );
    await db.exec(
      "reset role; set role authenticated; set request.jwt.claim.sub = '00000000-0000-4000-8000-000000000002';",
    );
    assert.equal(
      (
        await db.query(
          "select * from public.content where slug = 'private-draft'",
        )
      ).rows.length,
      0,
    );
    await assert.rejects(
      db.exec(
        "insert into public.cms_admins(user_id) values ('00000000-0000-4000-8000-000000000002');",
      ),
    );
    await assert.rejects(
      db.exec(
        "insert into public.content(kind,title,slug) values ('post','Forbidden','forbidden');",
      ),
    );
    assert.equal(
      (
        await db.query(
          "update public.content set title='Not allowed' returning id",
        )
      ).rows.length,
      0,
    );
    await db.exec(
      "set request.jwt.claim.sub = '00000000-0000-4000-8000-000000000001';",
    );
    await db.exec(
      "update public.content set status='published' where slug='private-draft';",
    );
    const published = await db.query<{ published_at: string }>(
      "select published_at from public.content where slug='private-draft'",
    );
    assert.ok(published.rows[0].published_at);
    await db.exec("reset role; set role anon;");
    assert.equal(
      (
        await db.query(
          "select * from public.content where slug='private-draft'",
        )
      ).rows.length,
      1,
    );
    await db.exec(
      "reset role; set role authenticated; set request.jwt.claim.sub = '00000000-0000-4000-8000-000000000001';",
    );
    await db.exec(
      "update public.content set status='archived' where slug='private-draft';",
    );
    await db.exec("reset role; set role anon;");
    assert.equal(
      (
        await db.query(
          "select * from public.content where slug='private-draft'",
        )
      ).rows.length,
      0,
    );
    await db.exec(
      "reset role; delete from public.cms_admins; set role authenticated; set request.jwt.claim.sub = '00000000-0000-4000-8000-000000000001';",
    );
    await assert.rejects(
      db.exec(
        "insert into public.content(kind,title,slug) values ('post','Revoked','revoked');",
      ),
    );
  } finally {
    await db.close();
  }
});
