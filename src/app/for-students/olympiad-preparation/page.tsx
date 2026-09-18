import Link from "next/link";
import { PageIntro, PageShell } from "../../_components/page-shell";

const materials = [
  ["Macroeconomics", "https://www.qazeconomics.com/_files/ugd/5d0e81_f617e7ecb8804c59b44b9f9c0ca90dcf.pdf"],
  ["Microeconomics", ""],
  ["Exam Style Book", "https://www.qazeconomics.com/_files/ugd/5d0e81_16ab3497f0384af8a4b0ea4c5b689523.pdf"],
  ["Economic Theory", "https://www.qazeconomics.com/_files/ugd/5d0e81_54bd65ee3d4f49d2bb0efd4d14acb7df.pdf"],
];

export default function OlympiadPreparationPage() {
  return (
    <PageShell>
      <PageIntro title="Olympiad Preparation" description="Preparation materials published by QazEconomics for economics competition study." />
      <section className="bg-[var(--surface)] py-12 sm:py-16"><div className="mx-auto grid max-w-4xl gap-4 px-4 sm:px-6 lg:px-8">{materials.map(([title, href]) => <article key={title} className="rounded-[24px] border border-[var(--hairline)] bg-white p-6 sm:p-7"><h2 className="text-2xl font-semibold tracking-[-0.04em] text-[var(--ink)]">{title}</h2>{href ? <a href={href} target="_blank" rel="noreferrer" className="mt-5 inline-block text-sm font-semibold text-[var(--brand-blue-deep)] hover:underline">Open published PDF</a> : <p className="mt-5 text-sm leading-6 text-[var(--steel)]">The source page lists this material, but its direct file link was not safely recovered during migration.</p>}</article>)}<Link href="/for-students" className="mt-4 text-sm font-semibold text-[var(--brand-blue-deep)] hover:underline">Back to For students</Link></div></section>
    </PageShell>
  );
}