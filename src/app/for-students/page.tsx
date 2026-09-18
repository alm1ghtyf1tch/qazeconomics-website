import Link from "next/link";
import { studentResources } from "../_lib/content";
import { CardLink, PageIntro, PageShell } from "../_components/page-shell";

export default function ForStudentsPage() {
  return (
    <PageShell>
      <PageIntro title="For students" description="Lessons, curriculum links, olympiad preparation and economics resources published by QazEconomics." />
      <section className="bg-[var(--surface)] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-2">
            {studentResources.map((resource) => <CardLink key={resource.slug} href={resource.href} title={resource.title} description={resource.description} />)}
          </div>
          <div className="mt-8 rounded-[24px] border border-[var(--hairline)] bg-white p-6 text-base leading-7 text-[var(--slate)]">
            The live site also provides member sign-up and login through Wix. Authentication is intentionally not recreated in this static phase.
          </div>
          <Link href="/" className="mt-6 inline-block text-sm font-semibold text-[var(--brand-blue-deep)] hover:underline">Back to home</Link>
        </div>
      </section>
    </PageShell>
  );
}