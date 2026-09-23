"use client";

export default function AdminError({ reset }: { reset: () => void }) {
  return (
    <div role="alert" className="py-12">
      <h1 className="text-2xl font-semibold">Unable to load the workspace</h1>
      <p className="mt-3 text-[var(--steel)]">
        Please check the connection and try again. Unsaved changes may need to
        be re-entered.
      </p>
      <button onClick={reset} className="admin-button mt-6">
        Try again
      </button>
    </div>
  );
}
