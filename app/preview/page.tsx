"use client";
import { useEffect, useState } from "react";
import { themes } from "@/templates/themes";
import { fillTemplate } from "@/templates/templateFiller";
import { FormData } from "@/common/types";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";

import {
  Github,
  Coffee,
  Eye,
  Check,
  Copy,
  X,
} from "lucide-react";

const MarkdownPreview = dynamic(() => import("@/components/MarkdownPreview"), {
  ssr: false,
});

const defaultFormData: FormData = {
  hero: { name: "Dharmadeep Madisetty", tagline: "AI/ML Engineer" },
  about: "Exploring Generative AI and Frontend Craft.\n Founder of CasualYaps.com.\nInspired by minimalism, nostalgia, and the future.\nAlways tinkering, always building.",
  stack: ["react", "nextjs", "javascript", "python", "go", "rust"],
  hobbies: "Gaming under neon skies\nAnime & cyberpunk films\nManga & stories that linger\nCoffee + synthwave",
  stats: { showStats: true, showTrophies: true, github_username: "Bot-code-2003" },
  socials: {
    github: "Bot-code-2003",
    twitter: "your-twitter-handle",
    linkedin: "your-linkedin-profile",
    website: "CasualYaps.com",
  },
  quote: "⬢ Code ⬢ Create ⬢ Escape ⬢ Repeat ⬢",
};

// Modal component for preview with dark theme
const PreviewModal = ({ 
  isOpen, 
  content, 
  onClose 
}: {
  isOpen: boolean;
  content: string;
  onClose: () => void;
}) => {
  const [copied, setCopied] = useState(false);
  const [editableContent, setEditableContent] = useState(content);

  useEffect(() => {
    setEditableContent(content);
  }, [content]);

  const handleCopy = () => {
    navigator.clipboard.writeText(editableContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white w-screen h-screen flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
            <h3 className="text-xl font-bold text-gray-900">Live Preview</h3>
            <div className="flex space-x-2">
              <motion.button
                onClick={handleCopy}
                className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.div
                      key="copied"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0.8 }}
                      className="flex items-center space-x-2"
                    >
                      <Check size={16} className="text-green-400" />
                      <span>Copied!</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="copy"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0.8 }}
                      className="flex items-center space-x-2"
                    >
                      <Copy size={16} />
                      <span>Copy</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
              <motion.button
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <X size={16} />
                <span>Close</span>
              </motion.button>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-1 overflow-hidden">
            {/* Markdown Source */}
            <div className="w-[45%] bg-gray-900 text-white flex flex-col">
              <div className="p-4 border-b border-gray-700">
                <h4 className="text-lg font-semibold text-gray-200">Markdown Code</h4>
              </div>
              <textarea
                value={editableContent}
                onChange={(e) => setEditableContent(e.target.value)}
                className="flex-1 resize-none overflow-y-auto border-none bg-gray-900 p-4 font-mono text-sm leading-6 text-gray-200 outline-none"
                placeholder="Your markdown content..."
              />
            </div>

            {/* Preview - NOW WITH DARK THEME */}
            <div className="w-[55%] bg-gray-900 flex flex-col">
              <div className="p-4 border-b border-gray-700 bg-gray-800">
                <h4 className="text-lg font-semibold text-gray-200">Live Preview</h4>
              </div>
              <div className="flex-1 overflow-auto p-6 bg-gray-900">
                {/* Dark Theme CSS for Markdown */}
                <style jsx global>{`
                  .markdown-body {
                    background-color: #111827 !important;
                    color: #d1d5db !important;
                    line-height: 1.6;
                  }
                  .markdown-body h1, 
                  .markdown-body h2, 
                  .markdown-body h3, 
                  .markdown-body h4, 
                  .markdown-body h5, 
                  .markdown-body h6 {
                    color: #f9fafb !important;
                    border-bottom-color: #374151 !important;
                  }
                  .markdown-body pre {
                    background-color: #1f2937 !important;
                    border: 1px solid #374151 !important;
                  }
                  .markdown-body code {
                    background-color: #1f2937 !important;
                    color: #f9fafb !important;
                    padding: 2px 4px;
                    border-radius: 3px;
                  }
                  .markdown-body pre code {
                    background-color: transparent !important;
                  }
                  .markdown-body blockquote {
                    border-left: 4px solid #6b7280 !important;
                    background-color: #1f2937 !important;
                    color: #d1d5db !important;
                  }
                  .markdown-body table {
                    background-color: transparent !important;
                  }
                  .markdown-body table th, 
                  .markdown-body table td {
                    border: 1px solid #374151 !important;
                    background-color: #1f2937 !important;
                    color: #d1d5db !important;
                  }
                  .markdown-body table th {
                    background-color: #374151 !important;
                    color: #f9fafb !important;
                  }
                  .markdown-body a {
                    color: #60a5fa !important;
                  }
                  .markdown-body a:hover {
                    color: #93c5fd !important;
                  }
                  .markdown-body hr {
                    border-color: #374151 !important;
                  }
                  .markdown-body ul, .markdown-body ol {
                    color: #d1d5db !important;
                  }
                  .markdown-body li {
                    color: #d1d5db !important;
                  }
                  .markdown-body strong {
                    color: #f9fafb !important;
                  }
                  .markdown-body em {
                    color: #e5e7eb !important;
                  }
                  
                  /* GitHub badges and external content */
                  .markdown-body svg {
                    background-color: transparent !important;
                  }
                `}</style>
                
                <div className="markdown-body">
                  <MarkdownPreview markdown={editableContent} />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
export default function PreviewPage() {
  const [data, setData] = useState<FormData>(defaultFormData);
  const [copiedThemeId, setCopiedThemeId] = useState<string | null>(null);
  const [previewModal, setPreviewModal] = useState<{isOpen: boolean, content: string}>({
    isOpen: false, 
    content: ""
  });
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem("formData");
    if (saved) {
      try {
        setData(JSON.parse(saved));
      } catch (error) {
        console.error("Failed to parse saved form data:", error);
      }
    }
  }, []);

  const handleCopy = (themeId: string, md: string) => {
    navigator.clipboard.writeText(md).then(() => {
      setCopiedThemeId(themeId);
      setTimeout(() => setCopiedThemeId(null), 1500);
    }).catch((error) => {
      console.error("Failed to copy to clipboard:", error);
    });
  };

  const openPreviewPage = (md: string) => {
    try {
      // Method 1: Try URL parameter approach for smaller content
      const compressed = btoa(encodeURIComponent(md));
      
      // Check if URL would be too long (most browsers support ~2000 chars)
      if (compressed.length <= 1500) {
        router.push(`/preview/livepreview?data=${compressed}`);
      } else {
        // Method 2: Fallback to modal for large content
        setPreviewModal({ isOpen: true, content: md });
      }
    } catch (error) {
      console.error('Failed to encode preview data:', error);
      // Fallback to modal
      setPreviewModal({ isOpen: true, content: md });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 py-24 px-6 sm:px-12 lg:px-32 font-sans">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full py-3 z-40 backdrop-blur-md bg-white/70 border-b border-gray-100">
        <nav className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 10 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-6 h-6 text-gray-800 group-hover:text-black transition-colors duration-200" />
            </motion.div>
            <span className="font-semibold text-lg text-gray-800 group-hover:text-black transition-colors duration-200">
              ReadmeGen
            </span>
          </Link>

          <motion.a
            href="https://www.buymeacoffee.com/your-username"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 px-4 py-2 bg-white hover:bg-gray-50 border border-gray-200 rounded-full text-sm font-medium text-gray-800 transition-all duration-200 group shadow-sm hover:shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Coffee className="w-4 h-4 text-yellow-500 transition-colors" />
            <span className="hidden sm:inline">Support</span>
          </motion.a>
        </nav>
      </header>

      {/* Body */}
      <div className=" mx-auto">
        <div className="text-center mb-10 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
            Choose a Template.
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Select a template that fits your style. Customize it to create a stunning GitHub profile README.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {themes.map((theme) => {
            const md = fillTemplate(theme.markdownTemplate, data, theme);
            const isCopied = copiedThemeId === theme.id;

            return (
              <motion.div
                key={theme.id}
                variants={itemVariants}
                whileHover={{ y: -6, scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="relative flex flex-col h-full rounded-2xl bg-white border border-gray-200 shadow-sm transition-all duration-300 overflow-hidden group"
              >
                {/* Banner Image with Hover Scroll Effect */}
                <motion.div 
                  className="h-[300px] w-full relative overflow-hidden"
                  whileHover="hover"
                  initial="initial"
                >
                  <motion.img
                    src={`/assets/${theme.name}.png`}
                    alt={theme.name}
                    className="w-full h-auto min-h-full object-cover object-top"
                    variants={{
                      initial: { y: 0 },
                      hover: { y: -300 }
                    }}
                    transition={{ 
                      duration: 0.8,
                      ease: "easeInOut",
                    }}
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                  
                  {/* Scroll Hint Indicator */}
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full opacity-80 group-hover:opacity-60 transition-all duration-300 pointer-events-none">
                    ↓ Hover to scroll
                  </div>

                  {/* Bottom gradient fade for visual hint */}
                  <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/30 to-transparent opacity-60 group-hover:opacity-20 transition-opacity duration-300" />
                  
                  {/* Subtle scroll dots indicator */}
                  <div className="absolute bottom-3 right-3 flex flex-col space-y-1 opacity-70 group-hover:opacity-40 transition-opacity duration-300">
                    <div className="w-1.5 h-1.5 bg-white rounded-full shadow-sm"></div>
                    <div className="w-1.5 h-1.5 bg-white/70 rounded-full shadow-sm"></div>
                    <div className="w-1.5 h-1.5 bg-white/40 rounded-full shadow-sm"></div>
                  </div>
                </motion.div>

                <div className="pl-6 text-lg mt-4">
                  {theme.name}
                </div>

                {/* Actions */}
                <div className="p-6 pt-0 flex gap-4 mt-4">
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      openPreviewPage(md);
                    }}
                    className="flex-1 inline-flex items-center justify-center px-6 py-3 text-sm font-semibold rounded-xl bg-gray-900 text-white shadow-md hover:bg-gray-800 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Eye className="mr-2 h-4 w-4" /> Preview
                  </motion.button>
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(theme.id, md);
                    }}
                    className="flex-1 inline-flex items-center justify-center px-6 py-3 text-sm font-semibold rounded-xl border border-gray-300 text-gray-900 hover:bg-gray-100 transition-colors relative"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <AnimatePresence mode="wait">
                      {isCopied ? (
                        <motion.div
                          key="copied"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="absolute inset-0 flex items-center justify-center text-green-600"
                        >
                          <Check className="h-5 w-5 mr-1" /> Copied!
                        </motion.div>
                      ) : (
                        <motion.div
                          key="copy-btn-content"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="flex items-center"
                        >
                          <Copy className="mr-2 h-4 w-4" /> Copy
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Preview Modal */}
      <PreviewModal 
        isOpen={previewModal.isOpen} 
        content={previewModal.content} 
        onClose={() => setPreviewModal({isOpen: false, content: ""})} 
      />
    </div>
  );
}
