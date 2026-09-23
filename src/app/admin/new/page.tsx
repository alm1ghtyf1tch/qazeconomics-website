import { requireAdmin } from "@/lib/cms/auth";
import { ContentEditor } from "../_components/content-editor";

export default async function NewContentPage() {
  await requireAdmin();
  return <ContentEditor />;
}
