import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "../supabase/server";
import { supabaseConfig } from "../supabase/config";

export const requireAdmin = cache(async () => {
  if (!supabaseConfig()) redirect("/admin/login");
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  const { data: membership, error } = await supabase
    .from("cms_admins")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();
  if (error || !membership) redirect("/admin/login?access=denied");
  return { supabase, user };
});
