"use client";
import DynamicForm from "@/components/DynamicForm";
import { ArrowRight, Github, Zap, Coffee, Palette, Feather, Layers, Eye, Check, ClipboardList, Copy, MessageSquare, Briefcase, TrendingUp } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function FormPage() {
  return (
    <div className="">
       <header className="fixed top-0 left-0 w-full py-3 z-50 backdrop-blur-md bg-white/70 border-b border-gray-100">
  <nav className="max-w-6xl mx-auto px-6 flex items-center justify-between">
    
    {/* Logo */}
    <Link href="/" className="flex items-center space-x-2 group">
      <motion.div
        whileHover={{ scale: 1.1, rotate: 10 }}
        whileTap={{ scale: 0.95 }}
        className="relative"
      >
        <Github className="w-6 h-6 text-gray-800 group-hover:text-black transition-colors duration-200" />
      </motion.div>
      <span 
        className="font-semibold text-lg text-gray-800 group-hover:text-black transition-colors duration-200"
      >
        ReadmeGen
      </span>
    </Link>

    {/* Buy Me a Coffee Button */}
    <motion.a
      href="https://www.buymeacoffee.com/your-username" // Replace with your actual Buy Me a Coffee link
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
      <div className="p-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">
          ✨ Fill Your Info
        </h2>
        <DynamicForm />
      </div>
    </div>
  );
}
