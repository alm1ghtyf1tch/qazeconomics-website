export default function AdminLoading() {
  return (
    <div role="status" aria-label="Loading content" className="space-y-6">
      <div className="h-9 w-48 rounded bg-[var(--surface)]" />
      <div className="h-11 rounded bg-[var(--surface)]" />
      <div className="h-64 rounded bg-[var(--surface)]" />
      <span className="sr-only">Loading content...</span>
    </div>
  );
}
