"use client";

import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Eye, Pencil } from "lucide-react";
import { ContentBody } from "@/app/_components/content-body";
import {
  accentClasses,
  contentHref,
  contentKinds,
  contentStatuses,
  eventStatusLabels,
  eventStatuses,
  kindLabels,
  slugify,
  type ContentRecord,
} from "@/lib/cms/schema";
import { saveContent } from "../actions";

export function ContentEditor({ entry }: { entry?: ContentRecord }) {
  const [state, action, pending] = useActionState(saveContent, {});
  const [kind, setKind] = useState(entry?.kind ?? "article");
  const [title, setTitle] = useState(entry?.title ?? "");
  const [slug, setSlug] = useState(entry?.slug ?? "");
  const [slugEdited, setSlugEdited] = useState(!!entry);
  const [body, setBody] = useState(entry?.body ?? "");
  const [preview, setPreview] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [fields, setFields] = useState<Record<string, string>>({
    summary: entry?.summary ?? "",
    author: entry?.author ?? "",
    category: entry?.category ?? "",
    date_label: entry?.date_label ?? "",
    location: entry?.location ?? "",
    external_url: entry?.external_url ?? "",
    cover_url: entry?.cover_url ?? "",
    cover_alt: entry?.cover_alt ?? "",
    event_status: entry?.event_status ?? "upcoming",
    facts: entry?.facts.join("\n") ?? "",
    key_terms: entry?.key_terms.join("\n") ?? "",
    status: entry?.status ?? "draft",
    accent: entry?.accent ?? "blue",
  });
  const isEvent = kind === "olympiad" || kind === "event";

  useEffect(() => {
    const warn = (event: BeforeUnloadEvent) => {
      if (dirty && !pending) event.preventDefault();
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty, pending]);

  useEffect(() => {
    if (state.error) document.getElementById("save-error")?.focus();
  }, [state]);

  const error = (name: string) => state.fieldErrors?.[name]?.[0];
  const errors = (name: string) =>
    error(name) ? (
      <span id={`${name}-error`} className="text-xs font-normal text-red-700">
        {error(name)}
      </span>
    ) : null;
  const inputProps = (name: string) => ({
    name,
    id: name,
    value: fields[name],
    onChange: (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => setFields((previous) => ({ ...previous, [name]: event.target.value })),
    "aria-invalid": !!error(name),
    "aria-describedby": error(name) ? `${name}-error` : undefined,
  });
  const field = (
    name:
      | "summary"
      | "author"
      | "category"
      | "date_label"
      | "location"
      | "external_url"
      | "cover_url"
      | "cover_alt",
    label: string,
    maxLength: number,
    type = "text",
  ) => (
    <label className="admin-field">
      {label}
      <input
        {...inputProps(name)}
        className="admin-input"
        maxLength={maxLength}
        type={type}
      />
      {errors(name)}
    </label>
  );

  return (
    <>
      <Link
        href="/admin"
        onClick={(event) => {
          if (dirty && !window.confirm("Leave without saving your changes?"))
            event.preventDefault();
        }}
        className="mb-6 inline-flex min-h-10 items-center gap-2 text-sm text-[var(--steel)]"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        All content
      </Link>
      <h1 className="text-3xl font-semibold">
        {entry ? "Edit content" : "New content"}
      </h1>
      <form
        action={action}
        onChange={() => setDirty(true)}
        onReset={(event) => event.preventDefault()}
        className="mt-8"
      >
        {entry && (
          <>
            <input type="hidden" name="id" value={entry.id} />
            <input type="hidden" name="updated_at" value={entry.updated_at} />
          </>
        )}
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-12">
          <div className="grid min-w-0 gap-6">
            <label className="admin-field">
              Title
              <input
                {...inputProps("title")}
                className="admin-input text-lg"
                value={title}
                required
                minLength={3}
                maxLength={200}
                onChange={(event) => {
                  setTitle(event.target.value);
                  if (!slugEdited) setSlug(slugify(event.target.value));
                }}
              />
              {errors("title")}
            </label>
            <label className="admin-field">
              URL slug
              <input
                {...inputProps("slug")}
                className="admin-input"
                value={slug}
                required
                readOnly={!!entry}
                minLength={3}
                maxLength={180}
                pattern="[a-z0-9]+(-[a-z0-9]+)*"
                onChange={(event) => {
                  setSlugEdited(true);
                  setSlug(event.target.value);
                }}
              />
              <span className="break-all text-xs font-normal text-[var(--steel)]">
                {contentHref({ kind, slug: slug || "your-title" })}
                {entry ? " (fixed after creation)" : ""}
              </span>
              {errors("slug")}
            </label>
            <div className="admin-field">
              <label htmlFor="summary">Summary</label>
              <textarea
                {...inputProps("summary")}
                className="admin-input min-h-28 resize-y"
                maxLength={700}
                rows={3}
              />
              {errors("summary")}
            </div>
            <div>
              <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                <label htmlFor="body" className="text-sm font-medium">
                  Body
                </label>
                <div className="flex gap-1" aria-label="Editor mode">
                  <button
                    type="button"
                    aria-pressed={!preview}
                    onClick={() => setPreview(false)}
                    className={`admin-mode ${!preview ? "bg-[var(--surface)]" : ""}`}
                  >
                    <Pencil size={14} aria-hidden="true" />
                    Write
                  </button>
                  <button
                    type="button"
                    aria-pressed={preview}
                    onClick={() => setPreview(true)}
                    className={`admin-mode ${preview ? "bg-[var(--surface)]" : ""}`}
                  >
                    <Eye size={14} aria-hidden="true" />
                    Preview
                  </button>
                </div>
              </div>
              <textarea
                {...inputProps("body")}
                hidden={preview}
                className="admin-input min-h-96 resize-y leading-7"
                value={body}
                onChange={(event) => setBody(event.target.value)}
                rows={16}
                maxLength={100000}
              />
              {preview && (
                <div className="min-h-96 rounded-lg border border-[var(--hairline)] p-5">
                  {body ? (
                    <ContentBody body={body} />
                  ) : (
                    <p className="text-sm text-[var(--steel)]">
                      No body content yet.
                    </p>
                  )}
                </div>
              )}
              {errors("body")}
              <p className="mt-2 text-xs text-[var(--steel)]">
                Markdown supported: ## Heading, **bold**, - list item,
                [link](https://example.com).
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {field("author", "Author", 120)}
              {field("category", "Category", 100)}
            </div>
            <div className="grid gap-5 border-t border-[var(--hairline)] pt-6 sm:grid-cols-2">
              {field("cover_url", "Cover image URL", 2048, "url")}
              {field("cover_alt", "Image description", 250)}
            </div>
            {isEvent && (
              <fieldset className="grid gap-5 border-t border-[var(--hairline)] pt-6">
                <legend className="pt-6 text-lg font-semibold">
                  Event details
                </legend>
                <div className="grid gap-5 sm:grid-cols-2">
                  {field("date_label", "Event dates", 100)}
                  {field("location", "Location", 160)}
                </div>
                <label className="admin-field">
                  Registration status
                  <select
                    {...inputProps("event_status")}
                    className="admin-input"
                  >
                    {eventStatuses.map((status) => (
                      <option key={status} value={status}>
                        {eventStatusLabels[status]}
                      </option>
                    ))}
                  </select>
                  {errors("event_status")}
                </label>
                <div className="admin-field">
                  <label htmlFor="facts">Key facts, one per line</label>
                  <textarea
                    {...inputProps("facts")}
                    className="admin-input"
                    rows={4}
                  />
                  {errors("facts")}
                </div>
              </fieldset>
            )}
            {!isEvent && (
              <>
                <input type="hidden" name="event_status" value="upcoming" />
                <input type="hidden" name="location" value="" />
                <input type="hidden" name="facts" value="" />
                {field("date_label", "Display date (optional)", 100)}
              </>
            )}
            {field(
              "external_url",
              isEvent
                ? "Event / registration URL"
                : "Resource / source URL (optional)",
              2048,
              "url",
            )}
            <div className="admin-field">
              <label htmlFor="key_terms">Key terms, one per line</label>
              <textarea
                {...inputProps("key_terms")}
                className="admin-input"
                rows={3}
              />
              {errors("key_terms")}
            </div>
          </div>
          <aside
            className="order-first grid gap-5 border-b border-[var(--hairline)] pb-6 lg:sticky lg:top-6 lg:order-last lg:border-b-0 lg:pb-0"
            aria-label="Publishing settings"
          >
            <h2 className="text-lg font-semibold">Publishing</h2>
            <label className="admin-field">
              Content type
              <select
                className="admin-input"
                value={kind}
                disabled={!!entry}
                onChange={(event) => setKind(event.target.value as typeof kind)}
              >
                {contentKinds.map((value) => (
                  <option key={value} value={value}>
                    {kindLabels[value]}
                  </option>
                ))}
              </select>
              <input type="hidden" name="kind" value={kind} />
              {errors("kind")}
            </label>
            <label className="admin-field">
              Visibility
              <select {...inputProps("status")} className="admin-input">
                {contentStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status[0].toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
              {errors("status")}
            </label>
            {isEvent ? (
              <fieldset>
                <legend className="mb-3 text-sm font-medium">
                  Event color
                </legend>
                <div className="flex gap-3">
                  {Object.entries(accentClasses).map(([color, className]) => (
                    <label
                      key={color}
                      title={color}
                      className="flex size-11 cursor-pointer items-center justify-center"
                    >
                      <input
                        className="peer sr-only"
                        type="radio"
                        name="accent"
                        value={color}
                        checked={fields.accent === color}
                        onChange={() => {
                          setFields((previous) => ({
                            ...previous,
                            accent: color,
                          }));
                          setDirty(true);
                        }}
                      />
                      <span
                        className={`${className} size-8 rounded-full border-2 border-white outline-offset-2 peer-checked:outline peer-checked:outline-2 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-[var(--brand-blue-deep)]`}
                      />
                      <span className="sr-only">{color}</span>
                    </label>
                  ))}
                </div>
                {errors("accent")}
              </fieldset>
            ) : (
              <input type="hidden" name="accent" value={fields.accent} />
            )}
            <p className="text-sm leading-6 text-[var(--steel)]">
              Published entries are visible to everyone. Drafts and archived
              entries are only visible to admins.
            </p>
            {state.error && (
              <div
                id="save-error"
                role="alert"
                tabIndex={-1}
                className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800"
              >
                {state.error}
              </div>
            )}
            <button disabled={pending} className="admin-button justify-center">
              <Save size={17} aria-hidden="true" />
              {pending ? "Saving..." : "Save changes"}
            </button>
            {entry?.status === "published" && (
              <Link
                href={contentHref(entry)}
                target="_blank"
                className="admin-button admin-button-secondary justify-center"
              >
                <Eye size={17} aria-hidden="true" />
                View published page
              </Link>
            )}
          </aside>
        </div>
      </form>
    </>
  );
}
