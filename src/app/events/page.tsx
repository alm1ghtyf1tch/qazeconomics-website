import { publishedContent } from "@/lib/cms/queries";
import { eventStatusLabels } from "@/lib/cms/schema";
import { CardLink, PageIntro, PageShell } from "../_components/page-shell";

export const dynamic = "force-dynamic";

export default async function EventsPage() {
  const events = await publishedContent("olympiad,event");
  return (
    <PageShell>
      <PageIntro title="Events and olympiads" description="Explore economics competitions, upcoming opportunities and past events." />
      <section className="bg-[var(--surface)] py-12 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          {events.map((event) => <CardLink key={event.slug} href={`/events/${event.slug}`} title={event.title} description={[eventStatusLabels[event.event_status], event.date_label, event.location].filter(Boolean).join(" / ")} />)}
          {!events.length && <p>No events have been published yet.</p>}
        </div>
      </section>
    </PageShell>
  );
}
