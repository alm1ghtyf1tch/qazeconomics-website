import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Admin | QazEconomics",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-workspace min-h-dvh bg-white text-[var(--ink)]">
      <a
        href="#admin-main"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-white focus:p-4"
      >
        Skip to content
      </a>
      <header className="border-b border-[var(--hairline)]">
        <div className="mx-auto flex min-h-18 max-w-7xl items-center justify-between gap-4 px-4 sm:px-8">
          <Link href="/admin" className="text-lg font-semibold">
            QazEconomics
            <span className="ml-3 hidden border-l border-[var(--hairline)] pl-3 text-sm font-normal text-[var(--steel)] sm:inline">
              Editorial
            </span>
          </Link>
          <Link href="/" className="inline-flex items-center gap-2 text-sm">
            View website <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </header>
      <main
        id="admin-main"
        className="mx-auto max-w-7xl px-4 py-10 sm:px-8 sm:py-12"
      >
        {children}
      </main>
    </div>
  );
}
