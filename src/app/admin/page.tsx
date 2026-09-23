import Link from "next/link";
import {
  Plus,
  Search,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Pencil,
} from "lucide-react";
import { requireAdmin } from "@/lib/cms/auth";
import {
  contentHref,
  contentKinds,
  contentStatuses,
  kindLabels,
  type ContentRecord,
} from "@/lib/cms/schema";
import { signOut } from "./actions";

const pageSize = 20;

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const { supabase, user } = await requireAdmin();
  const params = await searchParams;
  const q = (params.q ?? "").slice(0, 120);
  const kind = contentKinds.find((value) => value === params.kind);
  const status = contentStatuses.find((value) => value === params.status);
  const page = Math.max(
    1,
    Math.min(10000, Number.parseInt(params.page ?? "1", 10) || 1),
  );
  let query = supabase
    .from("content")
    .select("id,title,slug,kind,status,updated_at", { count: "exact" })
    .order("updated_at", { ascending: false })
    .order("id");
  if (q) query = query.ilike("title", `%${q.replace(/[\\%_]/g, "\\$&")}%`);
  if (kind) query = query.eq("kind", kind);
  if (status) query = query.eq("status", status);
  const { data, count, error } = await query.range(
    (page - 1) * pageSize,
    page * pageSize - 1,
  );
  const entries = (data ?? []) as Pick<
    ContentRecord,
    "id" | "title" | "slug" | "kind" | "status" | "updated_at"
  >[];
  const pageHref = (number: number) =>
    `/admin?${new URLSearchParams({ q, kind: kind ?? "", status: status ?? "", page: String(number) })}`;

  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div>
          <h1 className="text-3xl font-semibold">Content</h1>
          <p className="mt-2 text-sm text-[var(--steel)]">
            Articles, updates and opportunities for your community.
          </p>
        </div>
        <Link href="/admin/new" className="admin-button">
          <Plus size={18} aria-hidden="true" />
          New content
        </Link>
      </div>
      <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-b border-[var(--hairline)] pb-5 text-sm text-[var(--steel)]">
        <p className="break-all">{user.email}</p>
        <form action={signOut}>
          <button className="inline-flex min-h-10 items-center gap-2 hover:text-black">
            <LogOut size={15} aria-hidden="true" />
            Sign out
          </button>
        </form>
      </div>
      {contentStatuses.includes(
        params.saved as (typeof contentStatuses)[number],
      ) && (
        <p
          role="status"
          className="mt-5 rounded-lg bg-green-50 p-4 text-sm text-green-800"
        >
          {params.saved === "published"
            ? "Published. Your content is now visible on the website."
            : params.saved === "archived"
              ? "Archived. This entry is no longer visible on the website."
              : "Draft saved. Only admins can see this entry."}
        </p>
      )}
      <form className="my-6 grid items-end gap-3 sm:grid-cols-[1fr_160px_150px_auto]">
        <label className="admin-field">
          Search
          <input
            className="admin-input"
            name="q"
            type="search"
            defaultValue={q}
            placeholder="Search titles"
            maxLength={120}
          />
        </label>
        <label className="admin-field">
          Type
          <select className="admin-input" name="kind" defaultValue={kind ?? ""}>
            <option value="">All types</option>
            {contentKinds.map((value) => (
              <option key={value} value={value}>
                {kindLabels[value]}
              </option>
            ))}
          </select>
        </label>
        <label className="admin-field">
          Status
          <select
            className="admin-input"
            name="status"
            defaultValue={status ?? ""}
          >
            <option value="">All statuses</option>
            {contentStatuses.map((value) => (
              <option key={value} value={value}>
                {value[0].toUpperCase() + value.slice(1)}
              </option>
            ))}
          </select>
        </label>
        <button className="admin-button admin-button-secondary justify-center">
          <Search size={17} aria-hidden="true" />
          Filter
        </button>
      </form>
      {error ? (
        <p
          role="alert"
          className="rounded-lg border border-red-200 p-5 text-sm text-red-700"
        >
          Content could not be loaded. Check the database connection and reload
          this page.
        </p>
      ) : (
        <>
          <p className="mb-3 text-sm text-[var(--steel)]">
            {count ?? 0} {count === 1 ? "entry" : "entries"}
          </p>
          <div className="divide-y divide-[var(--hairline)] border-y border-[var(--hairline)]">
            {entries.map((item) => (
              <article
                key={item.id}
                className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-x-5 gap-y-2 py-5 sm:grid-cols-[minmax(0,1fr)_100px_100px_80px]"
              >
                <div className="col-span-3 min-w-0 sm:col-span-1">
                  <Link
                    className="break-words font-medium hover:text-[var(--brand-blue-deep)]"
                    href={`/admin/${item.id}`}
                  >
                    <h2>{item.title}</h2>
                  </Link>
                  <p className="mt-2 text-xs text-[var(--steel)]">
                    {kindLabels[item.kind]} / Updated{" "}
                    {new Date(item.updated_at).toLocaleDateString("en-GB", {
                      timeZone: "UTC",
                    })}
                  </p>
                </div>
                <p
                  className={`w-fit rounded-full px-3 py-1 text-xs font-medium ${item.status === "published" ? "bg-green-50 text-green-800" : item.status === "draft" ? "bg-amber-50 text-amber-800" : "bg-[var(--surface)] text-[var(--steel)]"}`}
                >
                  {item.status[0].toUpperCase() + item.status.slice(1)}
                </p>
                <Link
                  href={`/admin/${item.id}`}
                  className="inline-flex min-h-10 items-center gap-2 text-sm"
                >
                  <Pencil size={15} aria-hidden="true" />
                  Edit
                </Link>
                {item.status === "published" && (
                  <Link
                    href={contentHref(item)}
                    className="inline-flex min-h-10 items-center gap-2 text-sm text-[var(--brand-blue-deep)]"
                  >
                    View
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </Link>
                )}
              </article>
            ))}
            {!entries.length && (
              <div className="py-16 text-center">
                <h2 className="text-lg font-medium">
                  {q || kind || status
                    ? "No matching content"
                    : "Your content starts here"}
                </h2>
                <p className="mt-2 text-sm text-[var(--steel)]">
                  {q || kind || status
                    ? "Try another search or change the filters."
                    : "Create an article, post, event or resource."}
                </p>
              </div>
            )}
          </div>
          <nav
            aria-label="Content pages"
            className="mt-6 flex items-center justify-between text-sm"
          >
            <span>
              Page {page} of {Math.max(1, Math.ceil((count ?? 0) / pageSize))}
            </span>
            <div className="flex gap-5">
              {page > 1 && (
                <Link
                  href={pageHref(page - 1)}
                  className="inline-flex items-center gap-1"
                >
                  <ChevronLeft size={16} />
                  Previous
                </Link>
              )}
              {page * pageSize < (count ?? 0) && (
                <Link
                  href={pageHref(page + 1)}
                  className="inline-flex items-center gap-1"
                >
                  Next
                  <ChevronRight size={16} />
                </Link>
              )}
            </div>
          </nav>
        </>
      )}
    </>
  );
}
