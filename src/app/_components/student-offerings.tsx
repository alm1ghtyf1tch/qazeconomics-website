import Link from "next/link";
import { studentResources } from "../_lib/content";

export function StudentOfferings() {
  return (
    <section id="students" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-semibold leading-tight tracking-[-0.045em] text-[var(--ink)] sm:text-5xl">
            Student-facing offerings.
          </h2>
          <p className="mt-5 text-lg leading-8 text-[var(--slate)]">
            Access the learning and competition resources published by
            QazEconomics for students.
          </p>
        </div>
        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {studentResources.map((resource) => (
            <article
              key={resource.slug}
              className="min-h-64 rounded-[32px] bg-[var(--surface)] p-7 sm:p-8"
            >
              <div className="flex h-full flex-col justify-between gap-12">
                <h3 className="max-w-sm text-3xl font-semibold leading-tight tracking-[-0.04em] text-[var(--ink)]">
                  {resource.title}
                </h3>
                <p className="max-w-md text-base leading-7 text-[var(--slate)]">
                  {resource.description}
                </p>
                <Link href={resource.href} className="text-sm font-semibold text-[var(--brand-blue-deep)] hover:underline">Open resource</Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
