import { z } from "zod";

export const contentKinds = [
  "article",
  "post",
  "olympiad",
  "event",
  "resource",
] as const;
export const contentStatuses = ["draft", "published", "archived"] as const;
export const eventStatuses = [
  "upcoming",
  "registration-open",
  "registration-closed",
  "completed",
] as const;
export const kindLabels = {
  article: "Article",
  post: "Post",
  olympiad: "Olympiad",
  event: "Event",
  resource: "Resource",
};
export const eventStatusLabels = {
  upcoming: "Upcoming",
  "registration-open": "Registration open",
  "registration-closed": "Registration closed",
  completed: "Completed",
};
export const accentClasses = {
  blue: "bg-[var(--brand-blue)]",
  coral: "bg-[var(--brand-coral)]",
  purple: "bg-[var(--brand-purple)]",
  magenta: "bg-[var(--brand-magenta)]",
};

const webUrl = z
  .string()
  .trim()
  .max(2048)
  .refine((value) => {
    if (!value) return true;
    try {
      const url = new URL(value);
      return (
        ["http:", "https:"].includes(url.protocol) &&
        !url.username &&
        !url.password
      );
    } catch {
      return false;
    }
  }, "Enter a full https:// or http:// URL.");

export const contentSchema = z
  .object({
    kind: z.enum(contentKinds),
    title: z
      .string()
      .trim()
      .min(3, "Use at least 3 characters for the title.")
      .max(200),
    slug: z
      .string()
      .trim()
      .min(3)
      .max(180)
      .regex(
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        "Use lowercase letters, numbers and single hyphens.",
      ),
    status: z.enum(contentStatuses),
    summary: z.string().trim().max(700),
    body: z.string().trim().max(100000),
    category: z.string().trim().max(100),
    author: z.string().trim().max(120),
    date_label: z.string().trim().max(100),
    location: z.string().trim().max(160),
    event_status: z.enum(eventStatuses),
    external_url: webUrl,
    cover_url: webUrl,
    cover_alt: z.string().trim().max(250),
    accent: z.enum(["blue", "coral", "purple", "magenta"]),
    facts: z.array(z.string().trim().min(1).max(200)).max(20),
    key_terms: z.array(z.string().trim().min(1).max(100)).max(20),
  })
  .superRefine((data, ctx) => {
    if (data.cover_url && !data.cover_alt)
      ctx.addIssue({
        code: "custom",
        path: ["cover_alt"],
        message: "Describe the image for readers who cannot see it.",
      });
    if (data.status === "published" && !data.body && !data.summary)
      ctx.addIssue({
        code: "custom",
        path: ["body"],
        message: "Add a summary or body before publishing.",
      });
    if (
      data.status === "published" &&
      ["event", "olympiad"].includes(data.kind) &&
      !data.date_label
    )
      ctx.addIssue({
        code: "custom",
        path: ["date_label"],
        message: "Add the date, or state that it is to be announced.",
      });
  });

export type ContentInput = z.infer<typeof contentSchema>;
export type ContentRecord = ContentInput & {
  id: string;
  created_at: string;
  updated_at: string;
  published_at: string | null;
  legacy: boolean;
};
export type ActionState = {
  error?: string;
  fieldErrors?: Record<string, string[]>;
};

export function contentHref(item: Pick<ContentInput, "kind" | "slug">) {
  const base =
    item.kind === "article"
      ? "articles"
      : item.kind === "post"
        ? "posts"
        : item.kind === "resource"
          ? "resources"
          : "events";
  return `/${base}/${item.slug}`;
}

export function slugify(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 180)
    .replace(/-+$/g, "");
}

export function parseContentForm(form: FormData) {
  const values = Object.fromEntries(form.entries());
  const lines = (key: string) =>
    String(values[key] ?? "")
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
  return contentSchema.safeParse({
    ...values,
    facts: lines("facts"),
    key_terms: lines("key_terms"),
  });
}
