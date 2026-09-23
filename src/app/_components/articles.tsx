import Link from "next/link";
import { publishedContent } from "@/lib/cms/queries";

export async function Articles() {
  const articles = (await publishedContent("article")).slice(0, 4);
  if (!articles.length) return null;
  return (
    <section id="articles" className="bg-[var(--surface)] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-semibold leading-tight tracking-[-0.045em] text-[var(--ink)] sm:text-5xl">
            Articles on theory and real economies.
          </h2>
          <p className="mt-5 text-lg leading-8 text-[var(--slate)]">
            Browse the published archive by topic, with full article pages and
            the original author and date information where available.
          </p>
        </div>
        <div className="mt-10 rounded-[24px] border border-[var(--hairline)] bg-white">
          {articles.map((article, index) => (
            <article
              key={article.title}
              className={`grid gap-4 p-6 sm:grid-cols-[1fr_180px] sm:p-7 ${
                index !== articles.length - 1
                  ? "border-b border-[var(--hairline-soft)]"
                  : ""
              }`}
            >
              <div>
                <p className="text-sm font-semibold text-[var(--brand-blue-deep)]">
                  {article.category}
                </p>
                <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[var(--ink)]">
                  <Link href={`/articles/${article.slug}`} className="hover:text-[var(--brand-blue-deep)]">
                    {article.title}
                  </Link>
                </h3>
              </div>
              <p className="text-sm leading-6 text-[var(--steel)] sm:text-right">
                {article.author}
              </p>
            </article>
          ))}
        </div>
        <Link
          href="/articles"
          className="mt-6 inline-flex rounded-full border border-[var(--ink)] px-5 py-2.5 text-sm font-semibold text-[var(--ink)] hover:bg-[var(--surface)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-blue)]"
        >
          View all articles
        </Link>
      </div>
    </section>
  );
}
