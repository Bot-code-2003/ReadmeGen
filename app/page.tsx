"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Coffee, Github, ClipboardList, Copy, MessageSquare, Briefcase, TrendingUp, Palette, Zap, Feather } from "lucide-react";

export default function HomePage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const features = [
    {
      title: 'Tell Your Story',
      description: 'Just a few clicks and a handful of words. We\'ll turn your inputs into a compelling profile.',
      icon: MessageSquare,
      color: 'bg-indigo-100',
      size: 'md:col-span-2'
    },
    {
      title: 'Find Your Perfect Look',
      description: 'Browse our collection of stunning, designer-made themes until you find the perfect one.',
      icon: Palette,
      color: 'bg-yellow-100',
      size: 'md:col-span-1'
    },
    {
      title: 'Watch It Come to Life',
      description: 'Our engine works instantly, building a beautiful README from your choices in a flash.',
      icon: Zap,
      color: 'bg-pink-100',
      size: 'md:col-span-1'
    },
    {
      title: 'One Click to Go Live',
      description: 'Copy the code and paste it into GitHub. Your new profile is ready to impress!',
      icon: Copy,
      color: 'bg-blue-100',
      size: 'md:col-span-2'
    },
    {
      title: 'Tailor It to You',
      description: 'Fine-tune the details to make your profile uniquely yours, even after you\'ve copied the code.',
      icon: Feather,
      color: 'bg-green-100',
      size: 'md:col-span-2'
    },
  ];

  const processSteps = [
    {
      number: "1",
      title: "Choose Your Theme",
      description: "Select from our collection of beautiful, professionally designed README themes.",
      icon: Palette,
    },
    {
      number: "2",
      title: "Fill the Form",
      description: "Input your information using our smart form that adapts to your chosen theme.",
      icon: ClipboardList,
    },
    {
      number: "3",
      title: "Copy & Use",
      description: "Get your generated README and paste it directly into your GitHub profile.",
      icon: Copy,
    },
  ];

  // Bold SVG Flower for title decoration
  const TitleFlower = ({ className = "", delay = 0, rotate = 0 }) => (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      initial={{ opacity: 0, scale: 0.8, rotate: rotate }}
      animate={{ 
        opacity: 0.6,
        scale: 1,
        rotate: rotate + 360,
      }}
      transition={{ 
        opacity: { delay, duration: 1 },
        scale: { delay, duration: 1 },
        rotate: { duration: 20, repeat: Infinity, ease: "linear" }
      }}
    >
      <svg width="120" height="120" viewBox="0 0 120 120" className="text-pink-300/80">
        {/* Outer petals - larger and bolder */}
        <ellipse cx="60" cy="25" rx="15" ry="25" fill="currentColor" opacity="0.9"/>
        <ellipse cx="60" cy="25" rx="15" ry="25" fill="currentColor" opacity="0.9" transform="rotate(45 60 60)"/>
        <ellipse cx="60" cy="25" rx="15" ry="25" fill="currentColor" opacity="0.9" transform="rotate(90 60 60)"/>
        <ellipse cx="60" cy="25" rx="15" ry="25" fill="currentColor" opacity="0.9" transform="rotate(135 60 60)"/>
        <ellipse cx="60" cy="25" rx="15" ry="25" fill="currentColor" opacity="0.9" transform="rotate(180 60 60)"/>
        <ellipse cx="60" cy="25" rx="15" ry="25" fill="currentColor" opacity="0.9" transform="rotate(225 60 60)"/>
        <ellipse cx="60" cy="25" rx="15" ry="25" fill="currentColor" opacity="0.9" transform="rotate(270 60 60)"/>
        <ellipse cx="60" cy="25" rx="15" ry="25" fill="currentColor" opacity="0.9" transform="rotate(315 60 60)"/>
        
        {/* Inner petals - slightly smaller */}
        <ellipse cx="60" cy="35" rx="10" ry="18" fill="#fef3c7" opacity="0.8" transform="rotate(22.5 60 60)"/>
        <ellipse cx="60" cy="35" rx="10" ry="18" fill="#fef3c7" opacity="0.8" transform="rotate(67.5 60 60)"/>
        <ellipse cx="60" cy="35" rx="10" ry="18" fill="#fef3c7" opacity="0.8" transform="rotate(112.5 60 60)"/>
        <ellipse cx="60" cy="35" rx="10" ry="18" fill="#fef3c7" opacity="0.8" transform="rotate(157.5 60 60)"/>
        <ellipse cx="60" cy="35" rx="10" ry="18" fill="#fef3c7" opacity="0.8" transform="rotate(202.5 60 60)"/>
        <ellipse cx="60" cy="35" rx="10" ry="18" fill="#fef3c7" opacity="0.8" transform="rotate(247.5 60 60)"/>
        <ellipse cx="60" cy="35" rx="10" ry="18" fill="#fef3c7" opacity="0.8" transform="rotate(292.5 60 60)"/>
        <ellipse cx="60" cy="35" rx="10" ry="18" fill="#fef3c7" opacity="0.8" transform="rotate(337.5 60 60)"/>
        
        {/* Bold flower center */}
        <circle cx="60" cy="60" r="12" fill="#fbbf24" opacity="1" />
        <circle cx="60" cy="60" r="8" fill="#f59e0b" opacity="0.9" />
        <circle cx="60" cy="60" r="4" fill="#d97706" opacity="0.8" />
      </svg>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col font-sans overflow-hidden">

      {/* Header */}
      <header className="fixed top-0 left-0 w-full py-4 z-50 backdrop-blur-xl bg-white/80 border-b border-gray-100/50">
        <nav className="max-w-7xl mx-auto px-8 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2 rounded-xl bg-gray-900 group-hover:bg-gray-800 transition-colors duration-300"
            >
              <Github className="w-5 h-5 text-white" />
            </motion.div>
            <span 
              className="font-bold text-xl text-gray-900 group-hover:text-gray-700 transition-colors duration-300 tracking-tight"
            >
              ReadmeGen
            </span>
          </Link>

          {/* Support Button */}
          <motion.a
            href="https://github.com/Bot-code-2003/ReadmeGen"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 px-5 py-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200/60 rounded-full text-sm font-medium text-gray-700 hover:text-gray-900 transition-all duration-300 shadow-sm hover:shadow-md"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Coffee className="w-4 h-4 text-amber-600" />
            <span className="hidden sm:inline">Star on GitHub</span>
          </motion.a>

        </nav>
      </header>

      {/* Hero */}
      <main className="flex-1 min-h-[100vh] flex items-center justify-center text-center relative overflow-hidden pt-20">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(0,0,0) 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}></div>
        </div>

        {/* Hero Content */}
        <div className="max-w-6xl px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-8"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9] text-gray-900">
              <div className="relative">
                <div className="relative inline-block">
                  <span className="block">Create Your</span>
                  {/* Flower underneath "Create Your" to the left */}
                  <TitleFlower
                    className="-bottom-12 -left-16 z-[-1]"
                    delay={1.2}
                    rotate={-15}
                  />
                </div>
                <span className="block">Perfect</span>
                <div className="relative inline-block">
                  <span className="block bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
                    README
                  </span>
                  {/* Flower on "README" to the right */}
                  <TitleFlower
                    className="-top-6 -right-20 z-[-1]"
                    delay={1.6}
                    rotate={25}
                  />
                </div>
              </div>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-medium"
            >
              Beautiful, professional GitHub profiles in minutes. Choose from designer themes and customize with ease.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex items-center justify-center gap-4 text-sm text-gray-500"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>5 Designer Themes</span>
              </div>
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span>Live Preview</span>
              </div>
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                <span>One-Click Copy</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Minimal CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
        >
          <Link href="/templates">
            <motion.button
              className="group flex items-center justify-center gap-3 px-10 py-4 bg-gray-900 hover:bg-gray-800 text-white rounded-2xl shadow-lg hover:shadow-xl text-base font-medium transition-all duration-300 border border-gray-800"
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="tracking-wide">Start Creating</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>
          </Link>
        </motion.div>
      </main>

      {/* Enhanced Bento Grid Features */}
      <section id="features" className="pb-20">
        <div className="max-w-7xl mx-auto px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold text-center mb-16 tracking-tight"
          >
            Built for the Modern Developer
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className={`relative p-8 rounded-3xl ${feature.color} ${feature.size} border border-gray-400 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group`}
                variants={cardVariants}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="space-y-4">
                  <motion.div
                    className="inline-block p-3 bg-white/70 rounded-2xl"
                    whileHover={{ rotate: 5 }}
                  >
                    <feature.icon className="w-8 h-8 text-gray-800" />
                  </motion.div>
                  <h3 className="font-extrabold text-2xl md:text-3xl leading-tight group-hover:text-gray-700 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                <div className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-10 transition-opacity" style={{ background: `radial-gradient(circle at 100% 100%, white 0, transparent 80%)` }}></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 text-center bg-gray-50/50">
        <div className="max-w-4xl mx-auto px-8">
          <motion.h2 
            className="text-4xl md:text-5xl font-extrabold tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Ready, Set, Profile!
          </motion.h2>
          <motion.p 
            className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Your perfect GitHub profile is just a few joyful steps away.
          </motion.p>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                className={`flex flex-col p-8 rounded-3xl bg-white/60 backdrop-blur-sm border border-gray-200/50 shadow-sm transition-all duration-300 group ${index === 0 ? '' : index === 1 ? 'md:mt-16' : 'lg:mt-32'}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
              >
                <motion.div 
                  className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-900 text-white shadow-xl mb-6 group-hover:shadow-2xl transition-shadow"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <step.icon className="w-8 h-8" />
                </motion.div>
                <div className="text-left">
                  <h3 className="font-extrabold text-2xl mb-2 group-hover:text-gray-700 transition-colors">{step.title}</h3>
                  <p className="text-gray-600 text-base leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="stand-out" className="py-20 bg-gray-50/50">
        <div className="max-w-4xl mx-auto px-8 space-y-8 text-center">
          <motion.h2 
            className="text-4xl md:text-5xl font-extrabold tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Your Profile, Your Advantage
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            A great GitHub profile is your professional calling card. Its where your work speaks for itself, opening doors to new opportunities.
          </motion.p>
          <div className="max-w-xl mx-auto mt-16 space-y-12">
            {[
              { icon: Briefcase, title: "Impress Recruiters", desc: "Instantly showcase your skills and attention to detail to potential employers." },
              { icon: TrendingUp, title: "Boost Your Visibility", desc: "Make your projects discoverable and your skills undeniable in the dev community." },
              { icon: MessageSquare, title: "Spark New Connections", desc: "A clear profile attracts like-minded collaborators and builds your professional network." }
            ].map((item, index) => (
              <motion.div 
                key={index} 
                className="relative text-left flex items-start space-x-6 md:space-x-8"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="relative flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-gray-900 text-white shadow-lg">
                  <span className="font-bold text-xl">{index + 1}</span>
                </div>
                <div className="flex-1 space-y-1">
                  <h3 className="font-extrabold text-2xl group-hover:text-gray-700 transition-colors">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 bg-gray-50/50 mb-5">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
            <div className="col-span-2 md:col-span-4 lg:col-span-2">
              <h3 className="text-2xl font-extrabold tracking-tight text-gray-900">
                Ready to level up your profile?
              </h3>
              <p className="mt-2 text-gray-600 max-w-sm mx-auto md:mx-0">
                Join thousands of developers building a better first impression.
              </p>
              <div className="mt-6">
                <a href="/templates" className="inline-block px-6 py-3 rounded-full bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors">
                  Get Started
                </a>
              </div>
            </div>

            <div className="col-span-2 lg:col-span-1 md:text-left">
              <h4 className="font-bold text-gray-900">Quick Links</h4>
              <ul className="mt-4 space-y-2 text-gray-600">
                <li><a href="https://github.com/Bot-code-2003/ReadmeGen" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors">GitHub Repo</a></li>
                <li><a href="https://www.linkedin.com/in/dharmadeep-madisetty-oct2003" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors">Connect on LinkedIn</a></li>
              </ul>
            </div>

            <div className="col-span-2 lg:col-span-1 md:text-left">
              <h4 className="font-bold text-gray-900">Support Me</h4>
              <ul className="mt-4 space-y-2 text-gray-600">
                <li><a href="mailto:youremail@example.com" className="hover:text-gray-900 transition-colors">Contact</a></li>
                <li><a href="https://www.buymeacoffee.com/your-username" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors">Buy Me a Coffee</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-gray-200 text-center text-xs text-gray-500">
            <p>
              © {new Date().getFullYear()} ReadmeGen. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
