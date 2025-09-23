"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { Clipboard, Check, ChevronLeft, AlertCircle, Download, Share2 } from "lucide-react";
import "github-markdown-css"; // GitHub markdown styling

const MarkdownPreview = dynamic(() => import("@/components/MarkdownPreview"), {
  ssr: false,
});

function LivePreviewContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [md, setMd] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const encodedData = searchParams.get("data");
    
    if (encodedData) {
      try {
        setIsLoading(true);
        // Decode the compressed data
        const decodedMd = decodeURIComponent(atob(encodedData));
        setMd(decodedMd);
        setError(null);
      } catch (err) {
        setError("Failed to decode preview data. The URL might be corrupted or too long.");
        console.error("Error decoding preview:", err);
      } finally {
        setIsLoading(false);
      }
    } else {
      setError("No preview data provided. Please go back and select a template to preview.");
      setIsLoading(false);
    }
  }, [searchParams]);

  const handleCopy = async () => {
    if (md) {
      try {
        await navigator.clipboard.writeText(md);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      } catch (err) {
        console.error("Failed to copy to clipboard:", err);
        // Fallback for older browsers or when clipboard API fails
        const textArea = document.createElement("textarea");
        textArea.value = md;
        document.body.appendChild(textArea);
        textArea.select();
        try {
          document.execCommand('copy');
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        } catch (fallbackErr) {
          console.error("Fallback copy also failed:", fallbackErr);
        }
        document.body.removeChild(textArea);
      }
    }
  };

  const handleDownload = () => {
    if (md) {
      const blob = new Blob([md], { type: "text/markdown" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "README.md";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "GitHub Profile README",
          text: "Check out this awesome GitHub profile README!",
          url: window.location.href,
        });
      } catch (err) {
        console.error("Error sharing:", err);
        handleCopy(); // Fallback to copy URL
      }
    } else {
      // Fallback: copy current URL to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        // You could show a toast notification here
        console.log("URL copied to clipboard");
      } catch (err) {
        console.error("Failed to copy URL:", err);
      }
    }
  };

  // Error state
  if (error) {
    return (
      <div className="flex h-screen bg-gray-900 items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6 max-w-md mx-auto p-8"
        >
          <AlertCircle className="w-20 h-20 text-red-400 mx-auto" />
          <h2 className="text-3xl font-bold text-gray-200">Preview Error</h2>
          <p className="text-gray-400 leading-relaxed">{error}</p>
          <div className="space-y-3">
            <motion.button
              onClick={() => router.back()}
              className="block w-full px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors font-medium"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              ← Go Back
            </motion.button>
            <motion.button
              onClick={() => router.push("/")}
              className="block w-full px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors font-medium"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Start Over
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Loading state
  if (isLoading || !md) {
    return (
      <div className="flex h-screen bg-gray-900 items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center space-y-6"
        >
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-blue-300 border-b-transparent rounded-full animate-spin mx-auto" 
                 style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          </div>
          <div className="space-y-2">
            <p className="text-gray-300 text-lg font-medium">Loading preview...</p>
            <p className="text-gray-500 text-sm">Preparing your README template</p>
          </div>
        </motion.div>
      </div>
    );
  }

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
          
          <div className="flex items-center space-x-2">
            <motion.button
              onClick={handleShare}
              className="rounded-md p-2 transition-colors duration-200 hover:bg-gray-700 text-gray-400"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Share"
            >
              <Share2 size={20} />
            </motion.button>
            
            <motion.button
              onClick={handleDownload}
              className="rounded-md p-2 transition-colors duration-200 hover:bg-gray-700 text-gray-400"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Download README.md"
            >
              <Download size={20} />
            </motion.button>
            
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
            .markdown-body h1, .markdown-body h2, .markdown-body h3, .markdown-body h4, .markdown-body h5, .markdown-body h6 {
              color: #f9fafb !important;
              border-bottom: none !important;
            }
            .markdown-body pre {
              background-color: #1f2937 !important;
              border: 1px solid #374151 !important;
            }
            .markdown-body code {
              background-color: #1f2937 !important;
              color: #f9fafb !important;
            }
            .markdown-body blockquote {
              border-left: 4px solid #6b7280 !important;
              background-color: #1f2937 !important;
            }
            .markdown-body table {
              background-color: transparent !important;
            }
            .markdown-body table th, .markdown-body table td {
              border: 1px solid #374151 !important;
              background-color: #1f2937 !important;
            }
            .markdown-body a {
              color: #60a5fa !important;
            }
            .markdown-body a:hover {
              color: #93c5fd !important;
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
    <Suspense fallback={
      <div className="flex h-screen bg-gray-900 items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-300">Loading preview...</p>
        </div>
      </div>
    }>
      <LivePreviewContent />
    </Suspense>
  );
}