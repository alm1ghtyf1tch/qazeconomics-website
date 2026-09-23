"use client";

import Link from "next/link";

export default function PageError({ reset }: { reset: () => void }) {
  return (
    <main className="mx-auto max-w-xl px-6 py-20">
      <h1 className="text-3xl font-semibold">
        Content is temporarily unavailable
      </h1>
      <p className="mt-4 text-[var(--steel)]">Please try again in a moment.</p>
      <button onClick={reset} className="admin-button mt-6">
        Try again
      </button>
      <Link href="/" className="ml-5 text-sm underline">
        Home
      </Link>
    </main>
  );
}
