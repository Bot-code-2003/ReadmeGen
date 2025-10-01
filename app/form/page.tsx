"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { themes } from "@/templates/themes";
import { fillTemplate } from "@/templates/templateFiller";
import { FormData } from "@/common/types";
import { techList } from "@/common/techstack"; // assumed existing
import { Copy, ArrowLeft } from "lucide-react";

const MarkdownPreview = dynamic(() => import("@/components/MarkdownPreview"), { ssr: false });

/** Default shape — keep similar to your other default */
const EMPTY_FORM: FormData = {
  hero: { name: "", tagline: "" },
  about: "",
  stack: [],
  hobbies: "",
  stats: { github_username: "", showStats: true, showTrophies: false },
  socials: {
    github: "",
    twitter: "",
    linkedin: "",
    website: ""
  },
  quote: "",
  // custom_md: "",
};

function setDeepCopy<T extends object>(obj: T, path: string, value: unknown): T {
  const parts = path.split(".");
  const clone = JSON.parse(JSON.stringify(obj || {}));
  let cur = clone;
  for (let i = 0; i < parts.length - 1; i++) {
    const p = parts[i];
    if (cur[p] == null || typeof cur[p] !== "object") cur[p] = {};
    cur = cur[p];
  }
  cur[parts[parts.length - 1]] = value;
  return clone as T;
}

/** simple debounce hook */
function useDebouncedEffect(fn: () => void, deps: unknown[], delay = 600) {
  useEffect(() => {
    const t = setTimeout(fn, delay);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export default function ThemeCustomizePage() {
  const router = useRouter();
  const [theme, setTheme] = useState<any>(null);
  const [formData, setFormData] = useState<FormData>(EMPTY_FORM);
  const [copied, setCopied] = useState(false);

  // load selected template id from localStorage
  useEffect(() => {
    try {
      const rawSelected = localStorage.getItem("_selectedTemplate") || (() => {
        const draft = localStorage.getItem("formData");
        if (!draft) return null;
        try {
          const parsed = JSON.parse(draft);
          return parsed?._selectedTemplate ? JSON.stringify(parsed._selectedTemplate) : null;
        } catch { return null; }
      })();

      const selected = rawSelected ? (typeof rawSelected === "string" ? JSON.parse(rawSelected) : rawSelected) : null;
      const themeId = selected?.id || (selected && selected.id) || localStorage.getItem("selectedThemeId") || null;

      // fallback: check localStorage.formData._selectedTemplate
      if (!themeId) {
        const raw = localStorage.getItem("formData");
        if (raw) {
          try {
            const parsed = JSON.parse(raw);
            if (parsed?._selectedTemplate?.id) {
              const tid = parsed._selectedTemplate.id;
              const t = themes.find((th) => th.id === tid);
              if (t) setTheme(t);
            }
          } catch {}
        }
      } else {
        const t = themes.find((th) => th.id === themeId);
        if (t) {
          setTheme(t);
          // Note: Themes with version 2.0 are now handled by split-screen form in templates page
        }
      }

      // load saved form data (draft) or theme presets
      const saved = localStorage.getItem("formData");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setFormData((prev) => ({ ...prev, ...parsed }));
        } catch {
          /* ignore */
        }
      } else {
        // use theme presets if available (will set below once theme is set)
      }
    } catch (err) {
      console.error("Error reading selected template:", err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // when theme becomes available, seed formData with theme.presets (non-destructive)
  useEffect(() => {
    if (!theme) return;
    const saved = localStorage.getItem("formData");
    if (!saved) {
      const seeded = { ...EMPTY_FORM };
      // pull common seeds if present
      if (theme.presets?.hero) seeded.hero = { ...seeded.hero, ...theme.presets.hero };
      if (theme.presets?.about) seeded.about = theme.presets.about;
      if (theme.presets?.stack) seeded.stack = [...(theme.presets.stack || [])];
      if (theme.presets?.stats) seeded.stats = { ...seeded.stats, ...theme.presets.stats };
      if (theme.presets?.socials) seeded.socials = { ...seeded.socials, ...theme.presets.socials };
      if (theme.presets?.quote) seeded.quote = theme.presets.quote;
      setFormData(seeded);
    }
  }, [theme]);

  // autosave to localStorage debounced
  useDebouncedEffect(() => {
    try {
      const draft = { ...formData, _selectedTemplate: theme ? { id: theme.id, at: Date.now() } : undefined };
      localStorage.setItem("formData", JSON.stringify(draft));
    } catch (err) {
      console.warn("Failed to save draft:", err);
    }
  }, [formData, theme]);

  // generated markdown
  const markdown = useMemo(() => {
    if (!theme) return "";
    try {
      return fillTemplate(theme.markdownTemplate, formData, theme);
    } catch (err) {
      console.error("fillTemplate error", err);
      return "";
    }
  }, [theme, formData]);

  // basic handlers
  function setPath(path: string, value: unknown) {
    setFormData((prev) => setDeepCopy(prev, path, value));
  }

  function toggleStackTech(id: string) {
    setFormData((prev) => {
      const set = new Set(prev.stack || []);
      if (set.has(id)) set.delete(id);
      else set.add(id);
      return { ...prev, stack: Array.from(set) };
    });
  }

  function handleCopyMarkdown() {
    navigator.clipboard.writeText(markdown).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    });
  }

  function goBackToGallery() {
    router.push("/preview");
  }

  if (!theme) {
    // while resolving, show a simple message and back link
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="max-w-xl text-center">
          <h2 className="text-2xl font-bold mb-4">No template selected</h2>
          <p className="text-gray-600 mb-6">Please pick a template from the gallery first.</p>
          <button onClick={() => router.push("/templates")} className="px-4 py-2 bg-gray-900 text-white rounded-lg inline-flex items-center gap-2">
            <ArrowLeft size={16} /> Back to templates
          </button>
        </div>
      </div>
    );
  }

  // Note: New themes with version 2.0 are handled by the split-screen form in templates page
  // This form page is kept for backward compatibility with older themes

  // theme.order expected to be array of keyword strings, fallback to default order if absent
  const order: string[] = theme.order && Array.isArray(theme.order) ? theme.order : ["hero", "about", "stack", "stats", "socials", "end_quote"];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 lg:px-10">
      <div className=" mx-auto flex gap-4">
        {/* LEFT: Live preview */}
        <div className="w-[60%] bg-white rounded-xl shadow p-6 flex flex-col">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold">{theme.name}</h3>
              <p className="text-sm text-gray-500">{theme.description || "Customize this template"}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleCopyMarkdown}
                className="px-3 py-2 bg-gray-900 text-white rounded-md text-sm inline-flex items-center gap-2"
                title="Copy generated markdown"
              >
                <Copy size={14} /> {copied ? "Copied" : "Copy"}
              </button>
              <button
                onClick={() => {
                  // quick: push final md to preview route with encoded param (if small)
                  try {
                    const compressed = btoa(encodeURIComponent(markdown));
                    if (compressed.length <= 1500) router.push(`/preview/livepreview?data=${compressed}`);
                    else router.push("/preview"); // fallback
                  } catch {
                    router.push("/preview");
                  }
                }}
                className="px-3 py-2 border border-gray-200 rounded-md text-sm"
              >
                Open Preview
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-auto border rounded-md p-4 bg-white">
            {/* Render markdown preview */}
            <div className="prose max-w-none">
              <MarkdownPreview markdown={markdown || "No preview yet — fill the form to see live preview."} />
            </div>
          </div>

          {/* small footer */}
          <div className="mt-4 text-xs text-gray-500">Draft autosaved locally. Sign in later to sync.</div>
        </div>

        {/* RIGHT: dynamic form */}
        <div className="w-[40%] bg-white rounded-xl shadow p-6 overflow-auto">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-lg font-semibold">Customize — {theme.name}</h4>
            <div className="text-sm text-gray-500">Fields are created from theme order</div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              // maybe navigate to preview route
              router.push("/preview");
            }}
            className="space-y-6"
          >
            {order.map((keyword) => {
              switch (keyword) {
                case "hero":
                  return (
                    <section key="hero" className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Name</label>
                      <input
                        value={formData.hero?.name || ""}
                        onChange={(e) => setPath("hero.name", e.target.value)}
                        className="w-full border rounded px-3 py-2"
                        placeholder="Your full name"
                      />
                      <label className="block text-sm font-medium text-gray-700">Tagline</label>
                      <input
                        value={formData.hero?.tagline || ""}
                        onChange={(e) => setPath("hero.tagline", e.target.value)}
                        className="w-full border rounded px-3 py-2"
                        placeholder="A short tagline"
                      />
                    </section>
                  );
                case "about":
                  return (
                    <section key="about" className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">About / Bio</label>
                      <textarea
                        value={formData.about || ""}
                        onChange={(e) => setPath("about", e.target.value)}
                        className="w-full border rounded px-3 py-2 min-h-[120px] resize-vertical"
                        placeholder="Short bio that appears in the template"
                      />
                    </section>
                  );
                case "stack":
                  return (
                    <section key="stack" className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Tech stack (click to toggle)</label>
                      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                        {(techList && techList.length ? techList : []).map((t: any) => {
                          const id = typeof t === "string" ? t : t.id || t.name;
                          const name = typeof t === "string" ? t : t.name || t.id;
                          const selected = (formData.stack || []).includes(id);
                          return (
                            <button
                              key={id}
                              type="button"
                              onClick={() => toggleStackTech(id)}
                              className={`px-3 py-2 rounded-md text-xs border ${selected ? "bg-gray-900 text-white" : "bg-white text-gray-800"}`}
                            >
                              {name}
                            </button>
                          );
                        })}
                      </div>
                    </section>
                  );
                case "stats":
                  return (
                    <section key="stats" className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">GitHub Username (for stats)</label>
                      <input
                        value={formData.stats?.github_username || ""}
                        onChange={(e) => setPath("stats.github_username", e.target.value)}
                        className="w-full border rounded px-3 py-2"
                        placeholder="your-github-username"
                      />
                      <div className="flex gap-2 mt-2">
                        <label className="inline-flex items-center gap-2">
                          <input type="checkbox" checked={!!formData.stats?.showStats} onChange={(e) => setPath("stats.showStats", e.target.checked)} />
                          <span className="text-sm">Show Stats</span>
                        </label>
                        <label className="inline-flex items-center gap-2">
                          <input type="checkbox" checked={!!formData.stats?.showTrophies} onChange={(e) => setPath("stats.showTrophies", e.target.checked)} />
                          <span className="text-sm">Show Trophies</span>
                        </label>
                      </div>
                    </section>
                  );
                case "socials":
                  return (
                    <section key="socials" className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Socials</label>
                      {["github", "twitter", "linkedin", "website", "instagram"].map((s) => (
                        <input
                          key={s}
                          placeholder={s}
                          value={formData.socials?.[s] || ""}
                          onChange={(e) => setPath(`socials.${s}`, e.target.value)}
                          className="w-full border rounded px-3 py-2"
                        />
                      ))}
                    </section>
                  );
                case "end_quote":
                case "quote":
                  return (
                    <section key="quote" className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">End Quote</label>
                      <textarea
                        value={formData.quote || ""}
                        onChange={(e) => setPath("quote", e.target.value)}
                        className="w-full border rounded px-3 py-2 min-h-[80px]"
                        placeholder="A short closing line or quote"
                      />
                    </section>
                  );
                case "appearance":
                  return (
                    <section key="appearance" className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Banner image URL</label>
                      <input value={formData?.appearance?.banner || theme.banner || ""} onChange={(e) => setPath("appearance.banner", e.target.value)} className="w-full border rounded px-3 py-2" placeholder="https://..." />
                      <label className="block text-sm font-medium text-gray-700">Primary color (hex)</label>
                      <input value={formData?.appearance?.primary || theme.colors?.[0] || ""} onChange={(e) => setPath("appearance.primary", e.target.value)} className="w-full border rounded px-3 py-2" placeholder="#ff0000 or ff0000" />
                    </section>
                  );
                case "custom_md":
                  return (
                    <section key="custom_md" className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Custom Markdown (append)</label>
                      <textarea value={formData.custom_md || ""} onChange={(e) => setPath("custom_md", e.target.value)} className="w-full border rounded px-3 py-2 min-h-[120px]" placeholder="Add extra markdown content..." />
                    </section>
                  );
                default:
                  // unknown keyword -> fallback to a generic textarea
                  return (
                    <section key={keyword} className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">{keyword}</label>
                      <textarea value={(formData as any)[keyword] || ""} onChange={(e) => setPath(keyword, e.target.value)} className="w-full border rounded px-3 py-2 min-h-[80px]" />
                    </section>
                  );
              }
            })}

            <div className="flex gap-3 items-center">
              <button type="button" onClick={() => goBackToGallery()} className="px-4 py-2 border rounded-md">
                Back to templates
              </button>

              <button
                type="button"
                onClick={() => {
                  // quick finalize: save and show preview page
                  try {
                    const compressed = btoa(encodeURIComponent(markdown));
                    if (compressed.length <= 1500) router.push(`/preview/livepreview?data=${compressed}`);
                    else router.push("/preview");
                  } catch {
                    router.push("/preview");
                  }
                }}
                className="px-4 py-2 bg-gray-900 text-white rounded-md"
              >
                Save & Preview
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
