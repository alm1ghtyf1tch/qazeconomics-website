import { notFound } from "next/navigation";
import { z } from "zod";
import { requireAdmin } from "@/lib/cms/auth";
import type { ContentRecord } from "@/lib/cms/schema";
import { ContentEditor } from "../_components/content-editor";

export default async function EditContentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { supabase } = await requireAdmin();
  const { id } = await params;
  if (!z.uuid().safeParse(id).success) notFound();
  const { data, error } = await supabase
    .from("content")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error("Content could not be loaded.");
  if (!data) notFound();
  return <ContentEditor entry={data as ContentRecord} />;
}
