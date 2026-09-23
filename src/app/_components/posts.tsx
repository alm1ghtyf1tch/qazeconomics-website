import Link from "next/link";
import { publishedContent } from "@/lib/cms/queries";

export async function Posts() {
  const posts = (await publishedContent("post")).slice(0, 3);
  if (!posts.length) return null;
  return (
    <section className="border-t border-[var(--hairline)] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-semibold">Latest updates</h2>
        <div className="mt-8 divide-y divide-[var(--hairline)]">
          {posts.map((post) => (
            <article key={post.id} className="py-6">
              <h3 className="text-2xl font-medium">
                <Link
                  href={`/posts/${post.slug}`}
                  className="hover:text-[var(--brand-blue-deep)]"
                >
                  {post.title}
                </Link>
              </h3>
              <p className="mt-3 max-w-3xl text-[var(--steel)]">
                {post.summary}
              </p>
            </article>
          ))}
        </div>
        <Link
          href="/posts"
          className="mt-5 inline-block text-sm font-semibold text-[var(--brand-blue-deep)]"
        >
          All updates
        </Link>
      </div>
    </section>
  );
}
