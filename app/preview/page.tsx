"use client";
import React, { useEffect, useState } from "react";
import { themes } from "@/templates/themes";
import { fillTemplate } from "@/templates/templateFiller";
import { FormData } from "@/common/types";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Github, Coffee, Check, Copy, Eye } from "lucide-react";

const defaultFormData: FormData = {
  hero: { name: "Dharmadeep Madisetty", tagline: "AI/ML Engineer" },
  about:
    "Exploring Generative AI and Frontend Craft.\n Founder of CasualYaps.com.\nInspired by minimalism, nostalgia, and the future.\nAlways tinkering, always building.",
  stack: ["react", "nextjs", "javascript", "python", "go", "rust"],
  hobbies:
    "Gaming under neon skies\nAnime & cyberpunk films\nManga & stories that linger\nCoffee + synthwave",
  stats: { showStats: true, showTrophies: true, github_username: "Bot-code-2003" },
  socials: {
    github: "Bot-code-2003",
    twitter: "your-twitter-handle",
    linkedin: "your-linkedin-profile",
    website: "CasualYaps.com",
  },
  quote: "⬢ Code ⬢ Create ⬢ Escape ⬢ Repeat ⬢",
};

/**
 * Simple deep-set helper for dot-notation keys (e.g. "hero.name")
 */
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

function deepSet<T extends Record<string, any>>(obj: T, path: string, value: unknown): void {
  const parts = path.split(".");
  let current: any = obj;
  
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    if (current[part] === undefined || current[part] === null) {
      current[part] = {};
    }
    current = current[part];
  }
  
  current[parts[parts.length - 1]] = value;
}

/**
 * Prefill local draft with an optional patch (dot-notation) and attach template id.
 * Then navigate to a route using next/router.
 */
function prefillDraftAndNavigate(
  patch: DeepPartial<FormData> = {},
  themeId?: string,
  routerPush?: (path: string) => void,
  navigateTo: string = "/form"
) {
  try {
    const raw = localStorage.getItem("formData");
    const draft: any = raw ? JSON.parse(raw) : {};
    Object.entries(patch).forEach(([k, v]) => {
      deepSet(draft, k, v);
    });
    if (themeId) draft._selectedTemplate = { id: themeId, at: Date.now() };
    localStorage.setItem("formData", JSON.stringify(draft));
    if (routerPush) routerPush(navigateTo);
    else window.location.href = navigateTo;
  } catch (err) {
    console.error("prefillDraftAndNavigate failed", err);
    if (routerPush) routerPush(navigateTo);
    else window.location.href = navigateTo;
  }
}

/** Simple modal: left half theme image, right half actions (Proceed / Back) */
function PreviewModalSimple({
  isOpen,
  theme,
  onClose,
  onProceed,
}: {
  isOpen: boolean;
  theme: (typeof themes)[number] | null;
  onClose: () => void;
  onProceed: (theme: (typeof themes)[number]) => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen || !theme) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
        <motion.div
          initial={{ scale: 0.98, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.98, opacity: 0 }}
          className="bg-white w-full max-w-4xl h-[85vh] rounded-xl overflow-hidden shadow-2xl flex"
        >
          {/* Left: banner / image */}
          <div className="w-1/2 bg-black flex items-center justify-center overflow-hidden">
            <img
              src={`/assets/${theme.name}.png`}
              alt={theme.name}
              className="object-cover w-full h-full object-top object-center"
              onError={(e) => {
                // fallback to asset by id if name-based asset missing
                (e.currentTarget as HTMLImageElement).src = `/assets/${theme.id}.png`;
              }}
            />
          </div>

          {/* Right: actions */}
          <div className="w-1/2 p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">{theme.name}</h3>
              <p className="text-sm text-gray-600 mb-6">
                This template is preview-only here. Click <strong>Proceed</strong> to personalize it (your draft is saved locally).
              </p>

              {/* Small meta / tags area (optional) */}
              <div className="mb-6 flex flex-wrap gap-2">
                <span className="inline-block bg-gray-100 text-xs px-3 py-1 rounded-full">Template</span>
                <span className="inline-block bg-gray-100 text-xs px-3 py-1 rounded-full">Readme</span>
                {Array.isArray(theme.colors) && (
                  <div className="flex items-center ml-2 gap-1">
                    {theme.colors.slice(0, 5).map((c: string, idx: number) => (
                      <span
                        key={idx}
                        className="w-4 h-4 rounded-full border"
                        style={{ backgroundColor: `#${c}` }}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="text-sm text-gray-500">
                Tip: Tech users can copy the template markdown and edit directly. Non-tech users can personalize step-by-step after clicking Proceed.
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => onProceed(theme)}
                className="flex-1 px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition"
              >
                Proceed
              </button>

              <button
                onClick={onClose}
                className="flex-1 px-6 py-3 border border-gray-300 rounded-xl text-gray-900 font-medium hover:bg-gray-50 transition"
              >
                Back
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default function PreviewPage() {
  const [data, setData] = useState<FormData>(defaultFormData);
  const [copiedThemeId, setCopiedThemeId] = useState<string | null>(null);

  // modal state now holds theme
  const [previewModal, setPreviewModal] = useState<{ isOpen: boolean; theme: any | null }>({
    isOpen: false,
    theme: null,
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
    navigator.clipboard
      .writeText(md)
      .then(() => {
        setCopiedThemeId(themeId);
        setTimeout(() => setCopiedThemeId(null), 1500);
      })
      .catch((error) => {
        console.error("Failed to copy to clipboard:", error);
      });
  };

  // open the new simple preview modal with theme image & CTAs
  const openPreviewModal = (theme: any) => {
    setPreviewModal({ isOpen: true, theme });
  };

  // Proceed clicked in modal -> attach template to draft and navigate to /form
  const handleProceedFromModal = (theme: any) => {
    // Optionally pass a small patch: e.g., if you want to prefill hero from defaults in theme.presets
    const patch: Record<string, any> = {};
    // if theme has presets we can prefill a few keys:
    if (theme.presets?.hero?.name) deepSet(patch, "hero.name", theme.presets.hero.name);
    if (theme.presets?.hero?.tagline) deepSet(patch, "hero.tagline", theme.presets.hero.tagline);
    // attach template and navigate
    prefillDraftAndNavigate(patch, theme.id, (p: string) => router.push(p), "/form");
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
            <motion.div whileHover={{ scale: 1.1, rotate: 10 }} whileTap={{ scale: 0.95 }}>
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
      <div className="mx-auto">
        <div className="text-center mb-10 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">Choose a Template.</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Select a template that fits your style. Customize it to create a stunning GitHub profile README.
          </p>
        </div>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12" variants={containerVariants} initial="hidden" animate="visible">
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
                  className="h-[320px] w-full relative overflow-hidden"
                  whileHover="hover"
                  initial="initial"
                >
                  <motion.img
                    src={`/assets/${theme.name}.png`}
                    alt={theme.name}
                    className="w-full h-auto min-h-full object-cover object-top"
                    variants={{
                      initial: { y: 0 },
                      hover: { y: -300 },
                    }}
                    transition={{
                      duration: 0.8,
                      ease: "easeInOut",
                    }}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = theme.banner || `/assets/${theme.id}.png`;
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

                <div className="pl-6 text-lg mt-4">{theme.name}</div>

                {/* Actions */}
                <div className="p-6 pt-0 flex gap-4 mt-4">
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      openPreviewModal(theme);
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
                    {isCopied ? (
                      <div className="absolute inset-0 flex items-center justify-center text-green-600">
                        <Check className="h-5 w-5 mr-1" /> Copied!
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Copy className="mr-2 h-4 w-4" /> Copy
                      </div>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Simple Preview Modal */}
      <PreviewModalSimple
        isOpen={previewModal.isOpen}
        theme={previewModal.theme}
        onClose={() => setPreviewModal({ isOpen: false, theme: null })}
        onProceed={(theme) => {
          setPreviewModal({ isOpen: false, theme: null });
          handleProceedFromModal(theme);
        }}
      />
    </div>
  );
}
