import Link from "next/link";
import { PageIntro, PageShell } from "../../_components/page-shell";

const units = [
  ["Unit 1: Foundation to economics", "Economics as social science, scarcity, factors of production, opportunity cost and PPC, economic systems"],
  ["Unit 2: The forces of Market", "Demand and demand curve, movements and determinants of demand, supply, market equilibrium and shifts"],
  ["Unit 3: Elasticity", "Introduction to elasticity, PED, determinants of PED, PES and determinants of PES"],
  ["Unit 4: Production", "Types of competition, perfect competition, monopolistic competition, oligopoly and monopoly"],
  ["Unit 5: Economic agents", "Circular flow model, money, definitions in economics, central bank and bank system"],
];

export default function LessonsPage() {
  return (
    <PageShell>
      <PageIntro title="Lessons" description="The published Grade 9 economics curriculum is organized into five units." />
      <section className="bg-[var(--surface)] py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4">
            {units.map(([title, topics]) => <article key={title} className="rounded-[24px] border border-[var(--hairline)] bg-white p-6 sm:p-7"><h2 className="text-2xl font-semibold tracking-[-0.04em] text-[var(--ink)]">{title}</h2><p className="mt-3 text-base leading-7 text-[var(--slate)]">{topics}</p></article>)}
          </div>
          <a href="https://docs.google.com/document/d/1oB-nOXmTeixuQb4IOOQgl77SntT_FdgeA7wo9ARK4PY/edit?usp=sharing" target="_blank" rel="noreferrer" className="mt-8 inline-flex rounded-full bg-[var(--ink)] px-6 py-3 text-sm font-semibold text-white hover:bg-[var(--charcoal)]">Open the 9th grade curriculum</a>
          <p className="mt-6 text-sm leading-6 text-[var(--steel)]">Individual lesson PDFs from the source site have not been migrated yet.</p>
          <Link href="/for-students" className="mt-6 inline-block text-sm font-semibold text-[var(--brand-blue-deep)] hover:underline">Back to For students</Link>
        </div>
      </section>
    </PageShell>
  );
}