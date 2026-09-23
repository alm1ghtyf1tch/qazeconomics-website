import { notFound } from "next/navigation";
import { publishedContent } from "@/lib/cms/queries";
import { ContentDetail } from "../../_components/content-detail";
import { PageShell } from "../../_components/page-shell";

export const dynamic = "force-dynamic";

export default async function ResourcePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [resource] = await publishedContent("resource", slug);
  if (!resource) notFound();
  return (
    <PageShell>
      <ContentDetail item={resource} />
    </PageShell>
  );
}
