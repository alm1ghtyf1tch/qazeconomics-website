"use client";

import { useState } from "react";
import Link from "next/link";

const navItems = [
  { href: "/articles", label: "Articles" },
  { href: "/events", label: "Events" },
  { href: "/for-students", label: "For students" },
  { href: "/about-us", label: "About us" },
  { href: "/volunteer", label: "Volunteer" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpen((isOpen) => !isOpen)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--hairline)] text-[var(--ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-blue)]"
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <span aria-hidden="true" className="text-xl leading-none">
          {open ? "×" : "☰"}
        </span>
      </button>
      {open ? (
        <div
          id="mobile-navigation"
          className="absolute inset-x-0 top-16 border-b border-[var(--hairline)] bg-white px-4 py-4 shadow-[0_12px_30px_rgba(10,10,10,0.08)] sm:px-6"
        >
          <nav aria-label="Mobile navigation" className="grid gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-[var(--ink)] hover:bg-[var(--surface)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-blue)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </div>
  );
}