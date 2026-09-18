import Link from "next/link";

export function Hero() {
  return (
    <section id="top" className="overflow-hidden bg-white">
      <div className="mx-auto grid min-h-[calc(100dvh-4rem)] w-full max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8 lg:py-20">
        <div className="max-w-3xl">
          <p className="mb-5 w-fit rounded-full border border-[var(--hairline)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--slate)]">
            Youth economics education
          </p>
          <h1 className="max-w-4xl text-[48px] font-semibold leading-[1.05] tracking-[-0.055em] text-[var(--ink)] sm:text-[64px] lg:text-[80px]">
            Economics for young thinkers.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--slate)]">
            QazEconomics shares finance and economics knowledge, current
            economic issues in Kazakhstan and student opportunities.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/articles"
              className="inline-flex h-12 items-center justify-center rounded-full bg-[var(--ink)] px-7 text-sm font-semibold text-white transition-colors hover:bg-[var(--charcoal)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-blue)]"
            >
              Explore articles
            </Link>
            <Link
              href="/events"
              className="inline-flex h-12 items-center justify-center rounded-full border border-[var(--ink)] px-7 text-sm font-semibold text-[var(--ink)] transition-colors hover:bg-[var(--surface)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-blue)]"
            >
              View events
            </Link>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[560px] lg:max-w-none">
          <div className="rounded-[32px] bg-[var(--brand-blue)] p-5 text-white shadow-[0_24px_80px_rgba(20,86,240,0.18)] sm:p-8">
            <div className="rounded-[24px] bg-white p-5 text-[var(--ink)] sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-[var(--steel)]">
                    Kazakhstan economy
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">
                    Ideas, events and resources
                  </h2>
                </div>
                <span className="rounded-full bg-[var(--brand-blue-200)] px-3 py-1 text-xs font-semibold text-[var(--brand-blue-deep)]">
                  Learn
                </span>
              </div>
              <div className="mt-8 aspect-[4/3] overflow-hidden rounded-2xl border border-[var(--hairline)] bg-[linear-gradient(180deg,#f7f8fa,#ffffff)] p-5">
                <div className="relative h-full border-b-2 border-l-2 border-[var(--ink)]">
                  <div className="absolute bottom-[12%] left-[12%] h-[2px] w-[72%] origin-left -rotate-[28deg] rounded-full bg-[var(--brand-coral)]" />
                  <div className="absolute bottom-[26%] left-[20%] h-[2px] w-[66%] origin-left -rotate-[28deg] rounded-full bg-[var(--brand-magenta)]" />
                  <div className="absolute bottom-[28%] left-[18%] h-[2px] w-[68%] origin-left rotate-[29deg] rounded-full bg-[var(--brand-blue)]" />
                  <div className="absolute bottom-[45%] left-[49%] h-4 w-4 rounded-full border-4 border-white bg-[var(--ink)] shadow-sm" />
                  <span className="absolute bottom-1 right-0 text-xs font-semibold text-[var(--steel)]">
                    Quantity
                  </span>
                  <span className="absolute left-2 top-0 text-xs font-semibold text-[var(--steel)]">
                    Price
                  </span>
                </div>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {["Articles", "Olympiads", "Volunteering"].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] px-4 py-3 text-sm font-semibold"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute -bottom-8 -left-5 hidden w-44 rounded-[24px] bg-[var(--brand-coral)] p-5 text-white shadow-[0_18px_50px_rgba(255,85,48,0.22)] sm:block">
            <p className="text-sm font-semibold">Exam skill</p>
            <p className="mt-8 text-3xl font-semibold tracking-[-0.05em]">
              open access
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
