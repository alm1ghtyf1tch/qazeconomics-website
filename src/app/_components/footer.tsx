import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[var(--footer-bg)] px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-lg font-semibold tracking-[-0.03em]">QazEconomics</p>
        <p className="text-sm text-white/64">
          <a href="mailto:qazeconomics@gmail.com" className="hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
            qazeconomics@gmail.com
          </a>{" "}
          · Phone{" "}
          <a href="tel:+77028889855" className="hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
            +7 (702)-888-98-55
          </a>
        </p>
        <nav aria-label="Footer navigation" className="flex flex-wrap gap-5">
          {[
            ["Articles", "/articles"],
            ["Updates", "/posts"],
            ["Events", "/events"],
            ["For students", "/for-students"],
            ["About us", "/about-us"],
            ["Volunteer", "/volunteer"],
            ["Admin", "/admin"],
          ].map(([item, href]) => (
            <Link
              key={href}
              href={href}
              className="text-sm text-white/64 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              {item}
            </Link>
          ))}
          <a
            href="https://www.instagram.com/qazeconomics/"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-white/64 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Instagram
          </a>
        </nav>
      </div>
    </footer>
  );
}
