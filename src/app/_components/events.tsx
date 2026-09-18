import Link from "next/link";
import { events } from "../_lib/content";

export function Events() {
  return (
    <section id="events" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-semibold leading-tight tracking-[-0.045em] text-[var(--ink)] sm:text-5xl">
            Completed economics events.
          </h2>
          <p className="mt-5 text-lg leading-8 text-[var(--slate)]">
            Explore the published archive of QazEconomics olympiads and their
            historical event information.
          </p>
        </div>
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {events.slice(0, 3).map((event) => (
            <article
              key={event.title}
              className={`${event.className} flex min-h-[360px] flex-col justify-between rounded-[32px] p-7 text-white sm:p-8`}
            >
              <div>
                <p className="text-sm font-semibold text-white/80">{event.date}</p>
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
