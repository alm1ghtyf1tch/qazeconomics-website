import { notFound } from "next/navigation";
import { publishedContent } from "@/lib/cms/queries";
import { ContentDetail } from "../../_components/content-detail";
import { PageShell } from "../../_components/page-shell";

export const dynamic = "force-dynamic";

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [article] = await publishedContent("article", slug);

  if (!article) notFound();

  return (
    <PageShell>
      <ContentDetail item={article} />
    </PageShell>
  );
}
