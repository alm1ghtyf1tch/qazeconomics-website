import { publishedContent } from "@/lib/cms/queries";
import { CardLink, PageIntro, PageShell } from "../_components/page-shell";

export const dynamic = "force-dynamic";

export default async function PostsPage() {
  const posts = await publishedContent("post");
  return (
    <PageShell>
      <PageIntro title="Updates" description="The latest from QazEconomics." />
      <section className="mx-auto grid max-w-7xl gap-4 px-4 pb-16 sm:px-6 md:grid-cols-2 lg:px-8">
        {posts.map((post) => (
          <CardLink
            key={post.id}
            href={`/posts/${post.slug}`}
            title={post.title}
            description={post.summary}
          />
        ))}
        {!posts.length && (
          <p className="text-[var(--steel)]">
            No updates have been published yet.
          </p>
        )}
      </section>
    </PageShell>
  );
}
