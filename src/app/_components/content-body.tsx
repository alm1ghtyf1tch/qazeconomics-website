import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function ContentBody({ body }: { body: string }) {
  return (
    <div className="content-prose">
      <Markdown remarkPlugins={[remarkGfm]} skipHtml>
        {body}
      </Markdown>
    </div>
  );
}
