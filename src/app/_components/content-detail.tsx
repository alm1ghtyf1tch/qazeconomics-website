import Link from "next/link";
import type { ContentRecord } from "@/lib/cms/schema";
import { accentClasses, eventStatusLabels, kindLabels } from "@/lib/cms/schema";
import { ContentBody } from "./content-body";

export function ContentDetail({ item }: { item: ContentRecord }) {
  const isEvent = item.kind === "event" || item.kind === "olympiad";
  return (
    <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-sm font-semibold text-[var(--brand-blue-deep)]">
        {item.category || kindLabels[item.kind]}
      </p>
      <header
        className={
          isEvent
            ? `${accentClasses[item.accent]} mt-5 rounded-[32px] p-6 text-white sm:p-10`
            : "mt-5"
        }
      >
        {isEvent && (
          <p className="mb-4 text-sm font-semibold">
            {eventStatusLabels[item.event_status]}
          </p>
        )}
        <h1 className="break-words text-3xl font-semibold leading-tight sm:text-5xl">
          {item.title}
        </h1>
        <p
          className={`mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm ${isEvent ? "text-white" : "text-[var(--steel)]"}`}
        >
          {item.author && <span>{item.author}</span>}
          {(item.date_label || (!item.legacy && item.published_at)) && (
            <span>
              {item.date_label ||
                new Date(item.published_at!).toLocaleDateString("en-GB", {
                  dateStyle: "long",
                  timeZone: "UTC",
                })}
            </span>
          )}
          {item.location && <span>{item.location}</span>}
        </p>
      </header>
      {item.cover_url && (
        // Editorial images are admin-supplied remote URLs with required alt text.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.cover_url}
          alt={item.cover_alt}
          className="mt-8 max-h-[520px] w-full rounded-lg object-contain"
        />
      )}
      {item.summary && (
        <p className="mt-8 text-xl leading-8 text-[var(--slate)]">
          {item.summary}
        </p>
      )}
      {!!item.facts.length && (
        <ul className="my-8 flex flex-wrap gap-3">
          {item.facts.map((fact, index) => (
            <li
              key={index}
              className="rounded-full bg-[var(--surface)] px-4 py-2 text-sm"
            >
              {fact}
            </li>
          ))}
        </ul>
      )}
      {!!item.key_terms.length && (
        <p className="mt-6 text-sm text-[var(--steel)]">
          Key terms: {item.key_terms.join(", ")}
        </p>
      )}
      {item.body && (
        <div className="mt-10">
          <ContentBody body={item.body} />
        </div>
      )}
      {item.external_url && (
        <a
          href={item.external_url}
          rel="noopener noreferrer"
          target="_blank"
          className="admin-button mt-8"
        >
          {isEvent ? "Visit event website" : "Open resource"}
        </a>
      )}
      {item.legacy && item.kind === "article" && (
        <p className="mt-10 border-t border-[var(--hairline)] pt-5 text-sm text-[var(--steel)]">
          This archive entry contains a summary.{" "}
          <a
            className="underline"
            href={`https://www.qazeconomics.com/post/${item.slug}`}
          >
            Read the original article
          </a>
          .
        </p>
      )}
      <Link
        className="mt-12 block text-sm font-medium text-[var(--brand-blue-deep)]"
        href={
          isEvent
            ? "/events"
            : item.kind === "resource"
              ? "/for-students"
              : item.kind === "post"
                ? "/posts"
                : "/articles"
        }
      >
        Back to{" "}
        {isEvent
          ? "events"
          : item.kind === "resource"
            ? "student resources"
            : item.kind === "post"
              ? "posts"
              : "articles"}
      </Link>
    </article>
  );
}
