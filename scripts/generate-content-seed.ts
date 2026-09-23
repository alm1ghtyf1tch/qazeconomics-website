import { writeFileSync } from "node:fs";
import { legacyContent } from "../src/lib/cms/legacy";

const quote = (value: string) => `'${value.replaceAll("'", "''")}'`;
const statements = [...legacyContent].reverse().map((entry) => {
  const values = Object.entries(entry).filter(
    ([key]) =>
      !["id", "created_at", "updated_at", "published_at"].includes(key),
  );
  const sqlValue = (value: unknown): string =>
    Array.isArray(value)
      ? `ARRAY[${value.map((part) => quote(String(part))).join(", ")}]::text[]`
      : typeof value === "boolean"
        ? String(value)
        : quote(String(value));
  return `insert into public.content (${values.map(([key]) => key).join(", ")})\nvalues (${values.map(([, value]) => sqlValue(value)).join(", ")})\non conflict (slug) do nothing;`;
});
writeFileSync(
  "supabase/seed.sql",
  `-- Generated from the existing site archive. Does not overwrite edited entries.\nbegin;\n${statements.join("\n\n")}\ncommit;\n`,
);
console.log(
  `Generated supabase/seed.sql with ${statements.length} existing archive entries.`,
);
