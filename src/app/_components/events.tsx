import Link from "next/link";
import { publishedContent } from "@/lib/cms/queries";
import { accentClasses, eventStatusLabels } from "@/lib/cms/schema";

export async function Events() {
  const events = (await publishedContent("olympiad,event")).slice(0, 3);
  if (!events.length) return null;
  return (
    <section id="events" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-semibold leading-tight tracking-[-0.045em] text-[var(--ink)] sm:text-5xl">
            Economics events and olympiads.
          </h2>
          <p className="mt-5 text-lg leading-8 text-[var(--slate)]">
            Explore student competitions, upcoming opportunities and the
            QazEconomics event archive.
          </p>
        </div>
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {events.slice(0, 3).map((event) => (
            <article
              key={event.title}
              className={`${accentClasses[event.accent]} flex min-h-[360px] flex-col justify-between rounded-[32px] p-7 text-white sm:p-8`}
            >
              <div>
                <p className="text-sm font-semibold text-white">{eventStatusLabels[event.event_status]} / {event.date_label}</p>
                <h3 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.04em]"><Link href={`/events/${event.slug}`} className="hover:underline">{event.title}</Link></h3>
                <p className="mt-3 text-base text-white/80">{event.location}</p>
              </div>
              <ul className="mt-10 grid gap-2">
                {event.facts.map((fact) => (
                  <li
                    key={fact}
                    className="rounded-full bg-white/14 px-4 py-2 text-sm font-medium"
                  >
                    {fact}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <Link
          href="/events"
          className="mt-6 inline-flex rounded-full border border-[var(--ink)] px-5 py-2.5 text-sm font-semibold text-[var(--ink)] hover:bg-[var(--surface)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-blue)]"
        >
          View all events
        </Link>
      </div>
    </section>
  );
}
