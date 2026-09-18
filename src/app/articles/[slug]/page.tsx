import { notFound } from "next/navigation";
import { articles } from "../../_lib/content";
import { PageShell } from "../../_components/page-shell";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);

  if (!article) notFound();

  return (
    <PageShell>
      <article className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <p className="text-sm font-semibold text-[var(--brand-blue-deep)]">{article.category}</p>
        <h1 className="mt-4 text-5xl font-semibold leading-tight tracking-[-0.055em] text-[var(--ink)] sm:text-6xl">{article.title}</h1>
        <p className="mt-5 text-sm text-[var(--steel)]">
          {article.author ?? "Author information not migrated"}{article.date ? ` · ${article.date}` : ""}{article.readingTime ? ` · ${article.readingTime}` : ""}
        </p>
        {article.summary ? <p className="mt-10 max-w-3xl text-xl leading-8 text-[var(--slate)]">{article.summary}</p> : null}
        {article.keyTerms ? (
          <div className="mt-8 flex flex-wrap gap-2">
            {article.keyTerms.map((term) => <span key={term} className="rounded-full bg-[var(--surface)] px-4 py-2 text-sm font-semibold text-[var(--ink)]">{term}</span>)}
          </div>
        ) : null}
        {article.body ? (
          <div className="mt-10 grid gap-5 text-lg leading-8 text-[var(--charcoal)]">
            {article.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        ) : null}
        <div className="mt-12 rounded-[24px] border border-dashed border-[var(--hairline)] bg-[var(--surface)] p-6 text-sm leading-6 text-[var(--slate)]">
          The original live-site article body, images and engagement data have not been fully migrated into this static page yet. No replacement content has been added.
        </div>
      </article>
    </PageShell>
  );
}