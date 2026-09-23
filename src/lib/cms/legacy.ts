import { articles, events } from "@/app/_lib/content";
import type { ContentRecord } from "./schema";

const defaults = {
  status: "published" as const,
  summary: "",
  body: "",
  category: "",
  author: "",
  date_label: "",
  location: "",
  event_status: "completed" as const,
  external_url: "",
  cover_url: "",
  cover_alt: "",
  accent: "blue" as const,
  facts: [],
  key_terms: [],
  created_at: "2023-01-01T00:00:00Z",
  updated_at: "2023-01-01T00:00:00Z",
  published_at: null,
  legacy: true,
};

// Existing archive is the unconfigured-site fallback and the one-time database seed.
export const legacyContent: ContentRecord[] = [
  ...articles.map((article) => ({
    ...defaults,
    id: `legacy-${article.slug}`,
    kind: "article" as const,
    slug: article.slug,
    title: article.title,
    summary: article.summary ?? "",
    body: article.body?.join("\n\n") ?? "",
    author: article.author ?? "",
    category: article.category,
    date_label: article.date ?? "",
    key_terms: article.keyTerms ?? [],
  })),
  ...events.map((event) => ({
    ...defaults,
    id: `legacy-${event.slug}`,
    kind: "olympiad" as const,
    slug: event.slug,
    title: event.title,
    summary: event.description ?? "",
    body: [
      ...(event.rounds ?? []),
      ...(event.support ? [`Support: ${event.support}`] : []),
    ].join("\n\n"),
    date_label: event.date,
    location: event.location,
    facts: event.facts,
    accent: (event.className.includes("purple")
      ? "purple"
      : event.className.includes("coral")
        ? "coral"
        : event.className.includes("magenta")
          ? "magenta"
          : "blue") as ContentRecord["accent"],
  })),
];
