"use client";
import { useEffect, useState } from "react";
import { themes } from "@/templates/themes";
import { fillTemplate } from "@/templates/templateFiller";
import { FormData } from "@/common/types";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
  Github,
  Coffee,
  Eye,
  Check,
  Copy,
} from "lucide-react";

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

export default function PreviewPage() {
  const [data, setData] = useState<FormData>(defaultFormData);
  const [copiedThemeId, setCopiedThemeId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem("formData");
    if (saved) {
      setData(JSON.parse(saved));
    }
  }, []);

  const handleCopy = (themeId: string, md: string) => {
    navigator.clipboard.writeText(md).then(() => {
      setCopiedThemeId(themeId);
      setTimeout(() => setCopiedThemeId(null), 1500);
    });
  };

  const openPreviewPage = (md: string) => {
    const encodedMd = encodeURIComponent(md);
    router.push(`/preview/livepreview?md=${encodedMd}`);
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
      <header className="fixed top-0 left-0 w-full py-3 z-50 backdrop-blur-md bg-white/70 border-b border-gray-100">
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
      <div className="max-w-7xl mx-auto">
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
                {/* Banner Image */}
                <div className="h-90 w-full relative overflow-hidden">
                  <img
                    src={`/assets/${theme.name}.png`} // your saved images: neon.png, retro.png, medieval.png
                    alt={theme.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                  
                </div>
                <div className="pl-6 text-lg mt-4">
                  {theme.name}
                </div>

                {/* Actions */}
                <div className="p-6 pt-0 flex gap-4 mt-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openPreviewPage(md);
                    }}
                    className="flex-1 inline-flex items-center justify-center px-6 py-3 text-sm font-semibold rounded-xl bg-gray-900 text-white shadow-md hover:bg-gray-800 transition-colors"
                  >
                    <Eye className="mr-2 h-4 w-4" /> Preview
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(theme.id, md);
                    }}
                    className="flex-1 inline-flex items-center justify-center px-6 py-3 text-sm font-semibold rounded-xl border border-gray-300 text-gray-900 hover:bg-gray-100 transition-colors relative"
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
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
