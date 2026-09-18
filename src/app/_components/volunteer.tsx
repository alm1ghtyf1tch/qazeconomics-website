export function Volunteer() {
  return (
    <section id="volunteer" className="bg-[var(--surface)] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.75fr_1fr] lg:px-8">
        <div>
          <h2 className="text-4xl font-semibold leading-tight tracking-[-0.045em] text-[var(--ink)] sm:text-5xl">
            Opportunity for volunteering.
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-[var(--slate)]">
            The current website invites students to fill out a form to become
            part of the QazEconomics team.
          </p>
        </div>
        <form
          action="mailto:qazeconomics@gmail.com"
          method="post"
          encType="text/plain"
          className="rounded-[24px] border border-[var(--hairline)] bg-white p-6 sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-semibold text-[var(--ink)]">
              First name
              <input
                name="first-name"
                autoComplete="given-name"
                required
                className="h-11 rounded-lg border border-[var(--hairline)] px-4 text-base font-normal outline-none transition-colors focus:border-[var(--brand-blue-deep)] focus-visible:ring-2 focus-visible:ring-[var(--brand-blue)] focus-visible:ring-offset-2"
              />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-[var(--ink)]">
              Last name
              <input
                name="last-name"
                autoComplete="family-name"
                required
                className="h-11 rounded-lg border border-[var(--hairline)] px-4 text-base font-normal outline-none transition-colors focus:border-[var(--brand-blue-deep)] focus-visible:ring-2 focus-visible:ring-[var(--brand-blue)] focus-visible:ring-offset-2"
              />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-[var(--ink)] sm:col-span-2">
              E-Mail
              <input
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                spellCheck={false}
                required
                className="h-11 rounded-lg border border-[var(--hairline)] px-4 text-base font-normal outline-none transition-colors focus:border-[var(--brand-blue-deep)] focus-visible:ring-2 focus-visible:ring-[var(--brand-blue)] focus-visible:ring-offset-2"
              />
            </label>
          </div>
          <button
            type="submit"
            className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-[var(--ink)] px-7 text-sm font-semibold text-white transition-colors hover:bg-[var(--charcoal)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-blue)]"
          >
            Send
          </button>
        </form>
      </div>
    </section>
  );
}
