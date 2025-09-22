import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

import "github-markdown-css/github-markdown-light.css";

export default function MarkdownPreview({ markdown }: { markdown: string }) {
  return (
    <div className="markdown-body p-6 bg-white rounded-lg">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
