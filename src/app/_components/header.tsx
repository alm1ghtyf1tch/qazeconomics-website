import Link from "next/link";
import { MobileNav } from "./mobile-nav";

const navItems = [
  { href: "/articles", label: "Articles" },
  { href: "/events", label: "Events" },
  { href: "/for-students", label: "For students" },
  { href: "/about-us", label: "About us" },
  { href: "/volunteer", label: "Volunteer" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-[var(--hairline)] bg-white/90 backdrop-blur-md">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-[var(--ink)] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:ring-offset-2"
      >
        Skip to main content
      </a>
      <nav
        className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="text-[18px] font-semibold tracking-[-0.03em] text-[var(--ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-blue)]"
        >
          QazEconomics
        </Link>
        <div className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-[var(--steel)] transition-colors hover:text-[var(--ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-blue)]"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <Link
          href="/volunteer"
          className="rounded-full bg-[var(--ink)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--charcoal)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-blue)]"
        >
          Join the team
        </Link>
        <MobileNav />
      </nav>
    </header>
  );
}
