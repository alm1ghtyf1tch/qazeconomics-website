"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requireAdmin } from "@/lib/cms/auth";
import { parseContentForm, type ActionState } from "@/lib/cms/schema";
import { supabaseConfig } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function signIn(
  _previous: ActionState,
  form: FormData,
): Promise<ActionState> {
  if (!supabaseConfig())
    return {
      error: "Admin sign-in will be available once Supabase is connected.",
    };
  const credentials = z
    .object({ email: z.email(), password: z.string().min(1).max(200) })
    .safeParse(Object.fromEntries(form));
  if (!credentials.success)
    return { error: "Enter your email address and password." };
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signInWithPassword(
    credentials.data,
  );
  if (error || !data.user)
    return {
      error: "Unable to sign in. Check your credentials and try again.",
    };
  const { data: membership, error: membershipError } = await supabase
    .from("cms_admins")
    .select("user_id")
    .eq("user_id", data.user.id)
    .maybeSingle();
  if (membershipError || !membership) {
    await supabase.auth.signOut();
    return {
      error: "This account does not have admin access. Contact the site owner.",
    };
  }
  redirect("/admin");
}

export async function signOut() {
  if (supabaseConfig()) {
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut();
  }
  redirect("/admin/login");
}

export async function saveContent(
  _previous: ActionState,
  form: FormData,
): Promise<ActionState> {
  const { supabase } = await requireAdmin();
  const parsed = parseContentForm(form);
  if (!parsed.success)
    return {
      error: "Check the highlighted fields.",
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
    };
  const rawId = form.get("id");
  const id = rawId ? z.uuid().safeParse(rawId) : null;
  if (id && !id.success)
    return { error: "This entry could not be identified. Reload the page." };
  const contentId = id?.success ? id.data : randomUUID();
  let error;
  if (id?.success) {
    const version = z.iso
      .datetime({ offset: true })
      .safeParse(form.get("updated_at"));
    if (!version.success) return { error: "Reload this entry before saving." };
    const { data: previous, error: readError } = await supabase
      .from("content")
      .select("kind,slug,body,legacy")
      .eq("id", contentId)
      .single();
    if (readError || !previous)
      return { error: "This entry could not be loaded. Try again." };
    // URLs stay stable after creation, including previously published links.
    const values = {
      ...parsed.data,
      kind: previous.kind,
      slug: previous.slug,
      legacy: previous.legacy && previous.body === parsed.data.body,
    };
    const result = await supabase
      .from("content")
      .update(values)
      .eq("id", contentId)
      .eq("updated_at", version.data)
      .select("id");
    error = result.error;
    if (!error && !result.data?.length)
      return {
        error:
          "Someone else updated this entry. Open it in a new tab to compare before saving again.",
      };
  } else {
    const result = await supabase
      .from("content")
      .insert({ ...parsed.data, id: contentId });
    error = result.error;
  }
  if (error)
    return {
      error:
        error.code === "23505"
          ? "That URL slug is already in use. Choose a different slug."
          : "The entry could not be saved. Your changes are still here; please try again.",
    };
  revalidatePath("/", "layout");
  redirect(`/admin?${new URLSearchParams({ saved: parsed.data.status })}`);
}
