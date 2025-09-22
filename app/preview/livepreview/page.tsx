"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Clipboard, Check, ChevronLeft } from "lucide-react";
import "github-markdown-css"; // GitHub markdown styling

const MarkdownPreview = dynamic(() => import("@/components/MarkdownPreview"), {
  ssr: false,
});

function LivePreviewContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const rawMd = searchParams.get("md") || "";
  let initialMd = rawMd;
  try {
    initialMd = decodeURIComponent(rawMd);
  } catch {
    initialMd = rawMd;
  }

  const [md, setMd] = useState(initialMd);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-900 overflow-hidden">
      {/* LEFT: Markdown Editor */}
      <div className="flex w-1/2 flex-col bg-slate-900 text-white rounded-lg m-4 shadow-xl border border-gray-700">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-700 p-4">
          <div className="flex items-center space-x-2">
            <motion.button
              onClick={() => router.back()}
              className="rounded-md p-2 transition-colors duration-200 hover:bg-gray-700 text-gray-400"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft size={20} />
            </motion.button>
            <h2 className="text-lg font-bold text-gray-200">Markdown Code</h2>
          </div>
          <motion.button
            onClick={handleCopy}
            className="rounded-md p-2 transition-colors duration-200 hover:bg-gray-700 text-gray-400"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {copied ? (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                <Check size={20} className="text-green-500" />
              </motion.div>
            ) : (
              <Clipboard size={20} />
            )}
          </motion.button>
        </div>

        {/* Editor */}
        <textarea
          value={md}
          onChange={(e) => setMd(e.target.value)}
          className="flex-1 resize-none overflow-y-auto border-none bg-slate-900 p-4 font-mono text-sm leading-6 text-gray-200 outline-none"
        />
      </div>

      {/* RIGHT: Live Preview */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="flex w-1/2 flex-col rounded-lg m-4 shadow-xl border border-gray-700"
      >
        <div className="border-b border-gray-700 p-4 bg-gray-800 rounded-t-lg">
          <h2 className="text-lg font-bold text-gray-100">Live Preview</h2>
        </div>
        <div className="markdown-body flex-1 overflow-y-auto bg-gray-900 p-6 text-gray-100 rounded-b-lg">
          <style jsx global>{`
            .markdown-body {
              background-color: #111827 !important;
              color: #d1d5db !important;
            }
          `}</style>
          <MarkdownPreview markdown={md} />
        </div>
      </motion.div>
    </div>
  );
}

export default function LivePreviewPage() {
  return (
    <Suspense fallback={<div className="text-gray-300 p-8">Loading preview...</div>}>
      <LivePreviewContent />
    </Suspense>
  );
}
