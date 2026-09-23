import { notFound } from "next/navigation";
import { publishedContent } from "@/lib/cms/queries";
import { ContentDetail } from "../../_components/content-detail";
import { PageShell } from "../../_components/page-shell";

export const dynamic = "force-dynamic";

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [post] = await publishedContent("post", slug);
  if (!post) notFound();
  return (
    <PageShell>
      <ContentDetail item={post} />
    </PageShell>
  );
}
