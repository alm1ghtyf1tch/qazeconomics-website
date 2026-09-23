import Link from "next/link";
import { studentResources } from "../_lib/content";
import { publishedContent } from "@/lib/cms/queries";
import { CardLink, PageIntro, PageShell } from "../_components/page-shell";

export const dynamic = "force-dynamic";

export default async function ForStudentsPage() {
  const resources = await publishedContent("resource");
  return (
    <PageShell>
      <PageIntro title="For students" description="Lessons, curriculum links, olympiad preparation and economics resources published by QazEconomics." />
      <section className="bg-[var(--surface)] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-2">
            {resources.map((resource) => <CardLink key={resource.id} href={`/resources/${resource.slug}`} title={resource.title} description={resource.summary} />)}
            {studentResources.map((resource) => <CardLink key={resource.slug} href={resource.href} title={resource.title} description={resource.description} />)}
          </div>
          <Link href="/" className="mt-6 inline-block text-sm font-semibold text-[var(--brand-blue-deep)] hover:underline">Back to home</Link>
        </div>
      </section>
    </PageShell>
  );
}
