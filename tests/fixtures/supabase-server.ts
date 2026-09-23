// Local test double for HTTP integration tests. Never imported by the application.
import { createServer, type IncomingMessage } from "node:http";
import { randomUUID } from "node:crypto";
import { legacyContent } from "../../src/lib/cms/legacy";
import type { ContentRecord } from "../../src/lib/cms/schema";

const adminId = "00000000-0000-4000-8000-000000000001";
const memberId = "00000000-0000-4000-8000-000000000002";
let entries: ContentRecord[] = [];
const reset = () => {
  entries = legacyContent.map((item) => ({
    ...item,
    id: randomUUID(),
    updated_at: new Date().toISOString(),
  }));
};
reset();
const user = (id: string) => ({
  id,
  aud: "authenticated",
  role: "authenticated",
  email: id === adminId ? "admin@example.test" : "member@example.test",
  email_confirmed_at: new Date().toISOString(),
  created_at: new Date().toISOString(),
  app_metadata: {},
  user_metadata: {},
});
const tokenFor = (id: string) =>
  [
    Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString(
      "base64url",
    ),
    Buffer.from(
      JSON.stringify({
        sub: id,
        aud: "authenticated",
        role: "authenticated",
        exp: Math.floor(Date.now() / 1000) + 3600,
      }),
    ).toString("base64url"),
    "fixture-signature",
  ].join(".");
const identity = (req: IncomingMessage) => {
  try {
    return JSON.parse(
      Buffer.from(
        (req.headers.authorization ?? "").split(".")[1],
        "base64url",
      ).toString(),
    ).sub as string;
  } catch {
    return null;
  }
};

const server = createServer(async (req, res) => {
  const url = new URL(req.url!, "http://127.0.0.1:54329");
  const id = identity(req);
  const admin = id === adminId;
  const send = (status: number, value?: unknown) => {
    res.writeHead(status, {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    });
    res.end(value === undefined ? "" : JSON.stringify(value));
  };
  const json = async () => {
    let raw = "";
    for await (const chunk of req) raw += chunk;
    return raw ? JSON.parse(raw) : {};
  };
  if (url.pathname === "/health") return send(200, { ok: true });
  if (url.pathname === "/__test/reset" && req.method === "POST") {
    reset();
    return send(200, {});
  }
  if (url.pathname === "/auth/v1/token") {
    const credentials = await json();
    if (
      credentials.password !== "test-password" ||
      !["admin@example.test", "member@example.test"].includes(credentials.email)
    )
      return send(400, { error: "invalid_grant", msg: "Invalid credentials" });
    const userId =
      credentials.email === "admin@example.test" ? adminId : memberId;
    return send(200, {
      access_token: tokenFor(userId),
      refresh_token: "fixture-refresh",
      token_type: "bearer",
      expires_in: 3600,
      user: user(userId),
    });
  }
  if (url.pathname === "/auth/v1/user")
    return id ? send(200, user(id)) : send(401, { msg: "Not signed in" });
  if (url.pathname === "/auth/v1/logout") return send(204);
  if (url.pathname === "/rest/v1/cms_admins")
    return send(200, admin ? [{ user_id: adminId }] : []);
  if (url.pathname !== "/rest/v1/content")
    return send(404, { message: "Unknown fixture endpoint" });
  let filtered = entries.filter((item) => admin || item.status === "published");
  for (const key of [
    "id",
    "slug",
    "kind",
    "status",
    "updated_at",
    "title",
  ] as const) {
    const condition = url.searchParams.get(key);
    if (condition?.startsWith("eq."))
      filtered = filtered.filter((item) => item[key] === condition.slice(3));
    if (condition?.startsWith("in.("))
      filtered = filtered.filter((item) =>
        condition.slice(4, -1).split(",").includes(item[key]),
      );
    if (condition?.startsWith("ilike."))
      filtered = filtered.filter((item) =>
        item[key]
          .toLowerCase()
          .includes(condition.slice(6).replaceAll("%", "").toLowerCase()),
      );
  }
  if (req.method === "POST" || req.method === "PATCH") {
    if (!admin)
      return send(403, { code: "42501", message: "Permission denied" });
    const values = await json();
    if (
      req.method === "POST" &&
      entries.some((item) => item.slug === values.slug)
    )
      return send(409, { code: "23505", message: "Duplicate slug" });
    const timestamp = new Date().toISOString();
    if (req.method === "POST") {
      const entry = {
        ...values,
        legacy: false,
        created_at: timestamp,
        updated_at: timestamp,
        published_at: values.status === "published" ? timestamp : null,
      };
      entries.unshift(entry);
      return send(201);
    }
    filtered.forEach((item) =>
      Object.assign(item, values, {
        updated_at: timestamp,
        published_at:
          item.published_at ??
          (values.status === "published" ? timestamp : null),
      }),
    );
    return send(200, filtered);
  }
  const count = filtered.length;
  const sortKey = url.searchParams.get("order")?.startsWith("updated_at")
    ? "updated_at"
    : "published_at";
  filtered.sort((a, b) => (b[sortKey] ?? "").localeCompare(a[sortKey] ?? ""));
  const start = Number(url.searchParams.get("offset") || 0);
  const limit = Number(url.searchParams.get("limit") || filtered.length);
  filtered = filtered.slice(start, start + limit);
  res.setHeader(
    "Content-Range",
    `${start}-${Math.max(start, start + filtered.length - 1)}/${count}`,
  );
  if (req.headers.accept?.includes("application/vnd.pgrst.object+json"))
    return filtered.length === 1
      ? send(200, filtered[0])
      : send(406, {
          code: "PGRST116",
          details: `The result contains ${filtered.length} rows`,
        });
  return send(200, filtered);
});
server.listen(54329, "127.0.0.1", () =>
  console.log("Supabase HTTP fixture listening on 54329"),
);
