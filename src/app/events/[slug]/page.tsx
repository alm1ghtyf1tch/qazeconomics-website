import { notFound } from "next/navigation";
import { events } from "../../_lib/content";
import { PageShell } from "../../_components/page-shell";

export function generateStaticParams() {
  return events.map((event) => ({ slug: event.slug }));
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = events.find((item) => item.slug === slug);

  if (!event) notFound();

  return (
    <PageShell>
      <article className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className={`${event.className} rounded-[32px] p-7 text-white sm:p-10`}>
          <p className="text-sm font-semibold text-white/80">Registration closed</p>
          <h1 className="mt-4 max-w-3xl text-5xl font-semibold leading-tight tracking-[-0.055em] sm:text-6xl">{event.title}</h1>
          <p className="mt-5 text-lg text-white/85">{event.date} · {event.location}</p>
        </div>
        <div className="mt-10 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <aside>
            <h2 className="text-sm font-semibold text-[var(--steel)]">Quick facts</h2>
            <ul className="mt-4 grid gap-2">
              {event.facts.map((fact) => <li key={fact} className="rounded-full bg-[var(--surface)] px-4 py-3 text-sm font-semibold text-[var(--ink)]">{fact}</li>)}
            </ul>
          </aside>
          <div>
            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[var(--ink)]">About the event</h2>
            {event.description ? <p className="mt-5 text-lg leading-8 text-[var(--slate)]">{event.description}</p> : null}
            {event.rounds ? <ul className="mt-6 grid gap-4 text-base leading-7 text-[var(--charcoal)]">{event.rounds.map((round) => <li key={round}>{round}</li>)}</ul> : null}
            {event.support ? <p className="mt-6 text-base leading-7 text-[var(--charcoal)]"><strong>Support:</strong> {event.support}</p> : null}
          </div>
        </div>
      </article>
    </PageShell>
  );
}