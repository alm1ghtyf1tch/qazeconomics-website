import Link from "next/link";
import { PageIntro, PageShell } from "../../_components/page-shell";

export default function EssentialsOfEconomicsPage() {
  return (
    <PageShell>
      <PageIntro title="Essentials of Economics" description="A QazEconomics book covering MYP, A-Level and AP Economics for teenagers, especially students in grades 7–9." />
      <section className="bg-[var(--surface)] py-12 sm:py-16"><div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8"><div className="rounded-[24px] border border-[var(--hairline)] bg-white p-6 sm:p-8"><p className="text-lg leading-8 text-[var(--slate)]">The source page describes this as an accessible economics book written by QazEconomics contributors and reviewed by an experienced Economics HL teacher.</p><a href="https://drive.google.com/file/d/14aMTUpR_sVYs3A2wBH8-pRD8oUebaYec/view?usp=sharing" target="_blank" rel="noreferrer" className="mt-7 inline-flex rounded-full bg-[var(--ink)] px-6 py-3 text-sm font-semibold text-white hover:bg-[var(--charcoal)]">Read the book</a></div><Link href="/for-students" className="mt-6 inline-block text-sm font-semibold text-[var(--brand-blue-deep)] hover:underline">Back to For students</Link></div></section>
    </PageShell>
  );
}