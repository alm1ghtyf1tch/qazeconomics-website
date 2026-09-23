import "server-only";
import { createClient } from "@supabase/supabase-js";
import { cache } from "react";
import { supabaseConfig } from "../supabase/config";
import { legacyContent } from "./legacy";
import type { ContentRecord } from "./schema";

// Public reads never inherit an admin's cookies, so previews cannot leak into public pages.
export const publishedContent = cache(
  async (kinds: string, slug?: string): Promise<ContentRecord[]> => {
    const config = supabaseConfig();
    const types = kinds.split(",");
    if (!config)
      return legacyContent.filter(
        (item) => types.includes(item.kind) && (!slug || item.slug === slug),
      );
    const supabase = createClient(config.url, config.key, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
      global: {
        fetch: (input, init) => fetch(input, { ...init, cache: "no-store" }),
      },
    });
    let query = supabase
      .from("content")
      .select("*")
      .eq("status", "published")
      .in("kind", types)
      .order("published_at", { ascending: false, nullsFirst: false })
      .order("created_at", { ascending: false });
    if (slug) query = query.eq("slug", slug);
    const { data, error } = await query;
    if (error) throw new Error("Published content is temporarily unavailable.");
    return data as ContentRecord[];
  },
);
