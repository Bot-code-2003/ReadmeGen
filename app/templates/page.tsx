"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Eye, Sparkles, Github } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { themes } from "../../templates/themes";
import SplitScreenForm from "../../components/SplitScreenForm";

interface Theme {
  id: string;
  name: string;
  banner: string;
  logoColor: string;
  colors: string[];
  description: string;
  presets: {
    about: string | { content: string };
    stack: string[] | { technologies: string[] };
    quote?: string;
    end_quote?: { content: string };
  };
}

export default function TemplatesPage() {
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showSplitScreen, setShowSplitScreen] = useState(false);
  const router = useRouter();

  const handleThemeSelect = (theme: Theme) => {
    setSelectedTheme(theme);
    setShowPreview(true);
  };

  const handleBack = () => {
    setShowPreview(false);
    setSelectedTheme(null);
  };

  const handleProceed = (theme: Theme) => {
    setShowSplitScreen(true);
  };

  const handleBackFromSplitScreen = () => {
    setShowSplitScreen(false);
    setSelectedTheme(null);
    setShowPreview(false);
  };

  // Show split-screen form if in that mode
  if (showSplitScreen && selectedTheme) {
    return (
      <SplitScreenForm
        themeId={selectedTheme.id}
        onBack={handleBackFromSplitScreen}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full py-4 z-50 backdrop-blur-xl bg-white/90 border-b border-gray-100/60">
        <nav className="max-w-7xl mx-auto px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2 rounded-xl bg-gray-900 group-hover:bg-gray-800 transition-colors duration-300"
            >
              <Github className="w-5 h-5 text-white" />
            </motion.div>
            <span className="font-bold text-xl text-gray-900 group-hover:text-gray-700 transition-colors duration-300 tracking-tight">
              ReadmeGen
            </span>
          </Link>
          
          <motion.button
            onClick={() => window.history.back()}
            className="flex items-center space-x-2 px-5 py-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200/60 rounded-full text-sm font-medium text-gray-700 hover:text-gray-900 transition-all duration-300 shadow-sm hover:shadow-md"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </motion.button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 py-12 pt-24">
        <AnimatePresence mode="wait">
          {!showPreview ? (
            // Templates Grid
            <motion.div
              key="templates-grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              <div className="text-center space-y-6">
                <motion.h2 
                  className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  Choose Your Style
                </motion.h2>
                <motion.p 
                  className="text-lg text-gray-600 max-w-2xl mx-auto font-medium"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Each template tells a unique story. Choose the one that matches your personality.
                </motion.p>
              </div>

              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
              >
                {themes.map((theme, index) => {
                  const itemVariants = {
                    hidden: { opacity: 0, y: 30 },
                    visible: { 
                      opacity: 1, 
                      y: 0,
                      transition: { duration: 0.6, ease: "easeOut" }
                    }
                  };

                  return (
                    <motion.div
                      key={theme.id}
                      variants={itemVariants}
                      whileHover={{ y: -6, scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="relative flex flex-col h-full rounded-2xl bg-white border border-gray-200 shadow-sm transition-all duration-300 overflow-hidden group cursor-pointer"
                      onClick={() => handleThemeSelect(theme)}
                    >
                      {/* Banner Image */}
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
                            ease: "easeInOut"
                          }}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = theme.banner;
                          }}
                        />
                        
                        {/* Hover Overlay */}
                        <motion.div
                          className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                        >
                          <motion.div
                            className="bg-white/90 backdrop-blur-sm rounded-full p-3"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Eye className="w-6 h-6 text-gray-800" />
                          </motion.div>
                        </motion.div>
                      </motion.div>

                      {/* Content */}
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors">
                            {theme.name}
                          </h3>
                          <motion.div
                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            whileHover={{ scale: 1.1 }}
                          >
                            <Sparkles className="w-5 h-5 text-yellow-500" />
                          </motion.div>
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-4 flex-1 leading-relaxed">
                          {typeof theme.presets.about === 'string' 
                            ? theme.presets.about.slice(0, 80) + '...'
                            : (theme.presets.about?.content || '').slice(0, 80) + '...'
                          }
                        </p>
                        
                        {/* Color Palette */}
                        <div className="flex items-center justify-between">
                          <div className="flex space-x-2">
                            {theme.colors.slice(0, 4).map((color, colorIndex) => (
                              <motion.div
                                key={colorIndex}
                                className="w-4 h-4 rounded-full border border-gray-200"
                                style={{ backgroundColor: color }}
                                whileHover={{ scale: 1.2 }}
                                transition={{ duration: 0.2 }}
                              />
                            ))}
                          </div>
                          <div className="text-xs text-gray-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Click to preview
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          ) : (
            // Preview Modal
            <motion.div
              key="preview-modal"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-6xl mx-auto"
            >
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Left Side - Theme Preview */}
                  <div className="relative h-[600px] overflow-hidden">
                    <img
                      src={`/assets/${selectedTheme?.name}.png`}
                      alt={selectedTheme?.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (selectedTheme) {
                          target.src = selectedTheme.banner;
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-6 left-6 text-white">
                      <h3 className="text-2xl font-bold mb-2">{selectedTheme?.name}</h3>
                      <p className="text-white/90 text-sm">
                        {typeof selectedTheme?.presets.about === 'string' 
                          ? selectedTheme.presets.about
                          : selectedTheme?.presets.about?.content || ''
                        }
                      </p>
                    </div>
                  </div>

                  {/* Right Side - Details & Actions */}
                  <div className="p-8 flex flex-col justify-between">
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-3">
                          {selectedTheme?.name}
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                          This template features a unique design that's perfect for showcasing your personality and professional skills.
                        </p>
                      </div>

                      {/* Color Palette */}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 mb-3">Color Palette</h4>
                        <div className="flex space-x-3">
                          {selectedTheme?.colors.map((color, index) => (
                            <div
                              key={index}
                              className="w-8 h-8 rounded-lg border border-gray-200 shadow-sm"
                              style={{ backgroundColor: color }}
                              title={color}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-4 pt-6">
                      <motion.button
                        onClick={handleBack}
                        className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Back
                      </motion.button>
                      <motion.button
                        onClick={() => selectedTheme && handleProceed(selectedTheme)}
                        className="flex-1 px-6 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Proceed
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
