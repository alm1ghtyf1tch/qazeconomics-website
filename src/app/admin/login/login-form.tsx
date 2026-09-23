"use client";

import { useActionState } from "react";
import { LogIn } from "lucide-react";
import { signIn } from "../actions";

export function LoginForm({ configured }: { configured: boolean }) {
  const [state, action, pending] = useActionState(signIn, {});
  return (
    <form action={action} className="mt-8 grid gap-5">
      <label className="admin-field">
        Email
        <input
          className="admin-input"
          name="email"
          type="email"
          autoComplete="username"
          required
          disabled={!configured}
        />
      </label>
      <label className="admin-field">
        Password
        <input
          className="admin-input"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          maxLength={200}
          disabled={!configured}
        />
      </label>
      {state.error && (
        <p role="alert" className="text-sm text-red-700">
          {state.error}
        </p>
      )}
      <button
        className="admin-button mt-1 justify-center"
        disabled={!configured || pending}
      >
        <LogIn size={17} aria-hidden="true" />
        {pending ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
