import Link from "next/link";
import { articleCategories } from "../_lib/content";
import { publishedContent } from "@/lib/cms/queries";
import { CardLink, PageIntro, PageShell } from "../_components/page-shell";

export const dynamic = "force-dynamic";

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const articles = await publishedContent("article");
  const categories = [...new Set([...articleCategories, ...articles.map((article) => article.category).filter(Boolean)])];
  const selectedCategory = category && categories.includes(category) ? category : "All Posts";
  const visibleArticles = selectedCategory === "All Posts"
    ? articles
    : articles.filter((article) => article.category === selectedCategory);

  return (
    <PageShell>
      <PageIntro
        title="Articles"
        description="Published QazEconomics writing across the economy of Kazakhstan, world economy and economic theory."
      />
      <section className="bg-[var(--surface)] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Article categories" className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Link
                key={category}
                href={category === "All Posts" ? "/articles" : `/articles?category=${encodeURIComponent(category)}`}
                aria-current={selectedCategory === category ? "page" : undefined}
                className={`rounded-full border px-4 py-2 text-sm font-semibold ${selectedCategory === category ? "border-[var(--ink)] bg-[var(--ink)] text-white" : "border-[var(--hairline)] bg-white text-[var(--steel)]"}`}
              >
                {category}
              </Link>
            ))}
          </nav>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {visibleArticles.map((article) => (
              <CardLink
                key={article.slug}
                href={`/articles/${article.slug}`}
                title={article.title}
                description={[article.category, article.author, article.date_label].filter(Boolean).join(" / ")}
              />
            ))}
          </div>
          {visibleArticles.length === 0 ? <p className="mt-8 text-sm leading-6 text-[var(--steel)]">No articles are currently listed in this category.</p> : null}
          <Link href="/" className="mt-6 inline-block text-sm font-semibold text-[var(--brand-blue-deep)] hover:underline">Back to home</Link>
        </div>
      </section>
    </PageShell>
  );
}
