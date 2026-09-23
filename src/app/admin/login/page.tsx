import { supabaseConfig } from "@/lib/supabase/config";
import { LoginForm } from "./login-form";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ access?: string }>;
}) {
  const configured = !!supabaseConfig();
  const { access } = await searchParams;
  return (
    <div className="mx-auto max-w-md py-8 sm:py-12">
      <p className="text-sm font-medium text-[var(--brand-blue-deep)]">
        QazEconomics admin
      </p>
      <h1 className="mt-4 text-3xl font-semibold">Welcome back.</h1>
      <p className="mt-3 text-base leading-7 text-[var(--steel)]">
        Sign in to manage articles, olympiads and student resources.
      </p>
      {!configured && (
        <div
          role="status"
          className="mt-7 rounded-lg border border-[var(--hairline)] bg-[var(--surface)] p-4 text-sm leading-6"
        >
          <strong className="block font-semibold">Connection pending</strong>
          Admin access will be available once the site owner completes the
          Supabase setup.
        </div>
      )}
      {access === "denied" && (
        <p role="alert" className="mt-6 text-sm text-red-700">
          Your account does not have admin access. Contact the site owner.
        </p>
      )}
      <LoginForm configured={configured} />
      <p className="mt-6 text-sm text-[var(--steel)]">
        Accounts are created by the site owner. Contact them if you need access
        or a password reset.
      </p>
    </div>
  );
}
