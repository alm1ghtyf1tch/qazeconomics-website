import Link from "next/link";
import { PageIntro, PageShell } from "../../_components/page-shell";
import { publishedContent } from "@/lib/cms/queries";
import { eventStatusLabels } from "@/lib/cms/schema";

const olympiads = [
  ["AEO Winter/Summer", "Asian Economics Olympiad for high school students in Asia. Participation is free.", "https://aeolymp.org/"],
  ["IEO Winter / Open track", "International Economics Olympiad for high school students, with economics, finance and business case components.", "https://ieo-official.org/"],
  ["National Economics Olympiad", "A national competition for high school students from Kazakhstan.", "https://daryn.kz/"],
];

export const dynamic = "force-dynamic";

export default async function OlympiadTrackerPage() {
  const current = (await publishedContent("olympiad")).filter((item) => item.event_status !== "completed");
  return (
    <PageShell>
      <PageIntro title="Olympiad Tracker" description="External competition links and descriptions published by QazEconomics." />
      {current.length > 0 && <section className="mx-auto max-w-4xl px-4 pb-12 sm:px-6 lg:px-8"><h2 className="mb-5 text-2xl font-semibold">Current olympiads</h2><div className="divide-y divide-[var(--hairline)]">{current.map((item) => <article key={item.id} className="py-5"><p className="text-sm text-[var(--steel)]">{eventStatusLabels[item.event_status]} / {item.date_label}</p><h3 className="mt-2 text-xl font-medium"><Link href={`/events/${item.slug}`} className="text-[var(--brand-blue-deep)]">{item.title}</Link></h3></article>)}</div></section>}
      <section className="bg-[var(--surface)] py-12 sm:py-16"><div className="mx-auto grid max-w-4xl gap-4 px-4 sm:px-6 lg:px-8">{olympiads.map(([title, description, href]) => <article key={title} className="rounded-[24px] border border-[var(--hairline)] bg-white p-6 sm:p-7"><h2 className="text-2xl font-semibold tracking-[-0.04em] text-[var(--ink)]">{title}</h2><p className="mt-3 text-base leading-7 text-[var(--slate)]">{description}</p><a href={href} target="_blank" rel="noreferrer" className="mt-5 inline-block text-sm font-semibold text-[var(--brand-blue-deep)] hover:underline">Visit external site</a></article>)}<Link href="/for-students" className="mt-4 text-sm font-semibold text-[var(--brand-blue-deep)] hover:underline">Back to For students</Link></div></section>
    </PageShell>
  );
}
