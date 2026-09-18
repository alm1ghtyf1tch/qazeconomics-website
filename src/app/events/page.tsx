import { events } from "../_lib/content";
import { CardLink, PageIntro, PageShell } from "../_components/page-shell";

export default function EventsPage() {
  return (
    <PageShell>
      <PageIntro title="Events" description="A record of QazEconomics olympiads and their published historical information." />
      <section className="bg-[var(--surface)] py-12 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          {events.map((event) => <CardLink key={event.slug} href={`/events/${event.slug}`} title={event.title} description={`${event.date} · ${event.location}`} />)}
        </div>
      </section>
    </PageShell>
  );
}