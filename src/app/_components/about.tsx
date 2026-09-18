const values = ["Education", "Empowerment", "Engagement", "Impact"];

export function About() {
  return (
    <section id="about" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1fr] lg:px-8">
        <div>
          <h2 className="text-4xl font-semibold leading-tight tracking-[-0.045em] text-[var(--ink)] sm:text-5xl">
            Informative, interactive and engaging.
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-[var(--slate)]">
            QazEconomics offers information, competitions and events to help
            people learn more about finance and economics.
          </p>
          <p className="mt-4 max-w-xl text-lg leading-8 text-[var(--slate)]">
            Its stated mission is to educate and empower the youth and
            population of Kazakhstan with finance and economics knowledge.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {values.map((value) => (
              <span
                key={value}
                className="rounded-full border border-[var(--hairline)] bg-[var(--surface)] px-4 py-2 text-sm font-semibold text-[var(--ink)]"
              >
                {value}
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-[24px] border border-[var(--hairline)] bg-[var(--surface)] p-6 sm:p-8">
          <h3 className="text-xl font-semibold tracking-[-0.03em] text-[var(--ink)]">Team</h3>
          <p className="mt-4 text-base leading-7 text-[var(--slate)]">
            The live site includes a team section with member profiles. Those profile details and images have not been migrated into this static implementation yet.
          </p>
        </div>
      </div>
    </section>
  );
}
