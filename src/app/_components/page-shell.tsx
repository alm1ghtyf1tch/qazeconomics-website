import Link from "next/link";
import { Footer } from "./footer";
import { Header } from "./header";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-white text-[var(--ink)]">
      <Header />
      <main id="main-content" className="scroll-mt-20">{children}</main>
      <Footer />
    </div>
  );
}

export function PageIntro({ title, description }: { title: string; description: string }) {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-10 pt-14 sm:px-6 lg:px-8 lg:pb-14 lg:pt-20">
      <div className="max-w-3xl">
        <h1 className="text-5xl font-semibold leading-tight tracking-[-0.055em] text-[var(--ink)] sm:text-6xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--slate)]">{description}</p>
      </div>
    </div>
  );
}

export function CardLink({ href, title, description }: { href: string; title: string; description?: string }) {
  return (
    <Link
      href={href}
      className="group rounded-[24px] border border-[var(--hairline)] bg-white p-6 transition-colors hover:border-[var(--brand-blue)] hover:bg-[var(--surface)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-blue)] sm:p-7"
    >
      <h2 className="text-2xl font-semibold tracking-[-0.04em] text-[var(--ink)] group-hover:text-[var(--brand-blue-deep)]">
        {title}
      </h2>
      {description ? <p className="mt-3 text-base leading-7 text-[var(--slate)]">{description}</p> : null}
      <span className="mt-6 inline-block text-sm font-semibold text-[var(--brand-blue-deep)]">Open page</span>
    </Link>
  );
}