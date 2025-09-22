import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FormData } from "@/common/types";

const techCategories = {
  "Programming Languages": [
    "c","cplusplus","csharp","go","java","javascript","typescript","php",
    "perl","ruby","scala","python","swift","objectivec","clojure","rust",
    "haskell","coffeescript","elixir","erlang","nim"
  ],
  "Frontend Development": [
    "vuejs","react","svelte","angularjs","angular","backbonejs","bootstrap",
    "vuetify","css3","html5","pug","gulp","sass","redux","webpack","babel",
    "tailwind","materialize","bulma","gtk","qt","wx_widgets","ember"
  ],
  "Backend Development": [
    "nodejs","spring","express","graphql","kafka","solr","rabbitMQ",
    "hadoop","nginx","openresty","nestjs"
  ],
  "Mobile Development": [
    "android","flutter","dart","kotlin","nativescript","xamarin",
    "reactnative","ionic","apachecordova"
  ],
  "AI / ML": ["tensorflow","pytorch","pandas","seaborn","opencv","scikit_learn"],
  "Databases": [
    "mongodb","mysql","postgresql","redis","oracle","cassandra","couchdb",
    "hive","realm","mariadb","cockroachdb","elasticsearch","sqlite","mssql"
  ],
  "Data Visualization": ["d3js","chartjs","canvasjs","kibana","grafana"],
  "DevOps": [
    "aws","docker","jenkins","gcp","kubernetes","bash","azure","vagrant",
    "circleci","travisci"
  ],
  "BaaS": ["firebase","appwrite","amplify","heroku"],
  "Frameworks": [
    "django","dotnet","electron","symfony","laravel","codeigniter",
    "rails","flask","quasar"
  ],
  "Testing": ["cypress","selenium","jest","mocha","puppeteer","karma","jasmine"],
  "Software Tools": [
    "illustrator","photoshop","xd","figma","blender","sketch","invision",
    "framer","matlab","postman"
  ],
  "Static Site Generators": [
    "gatsby","gridsome","hugo","jekyll","nextjs","nuxtjs","11ty","scully",
    "sculpin","sapper","vuepress","hexo","middleman"
  ],
  "Game Engines": ["unity","unreal"],
  "Automation": ["zapier","ifttt"],
  "Other": ["linux","git","arduino"]
};

const socials = [
  { id: "github", label: "GitHub Username", placeholder: "e.g., your-username" },
  { id: "twitter", label: "Twitter Handle", placeholder: "e.g., your-handle" },
  { id: "linkedin", label: "LinkedIn Profile", placeholder: "e.g., your-profile-url" },
  { id: "instagram", label: "Instagram Handle", placeholder: "e.g., your-handle" },
  { id: "website", label: "Personal Website", placeholder: "e.g., your-website.com" },
];

interface ToggleSwitchProps {
  label: string;
  isToggled: boolean;
  onToggle: () => void;
}
const ToggleSwitch = ({ label, isToggled, onToggle }: ToggleSwitchProps) => {
  return (
    <motion.div
      className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
      onClick={onToggle}
    >
      <div
        className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
          isToggled ? "bg-gray-900" : "bg-gray-200"
        }`}
      >
        <motion.div
          className="w-4 h-4 bg-white rounded-full shadow-md"
          layout
          transition={{ type: "spring", stiffness: 700, damping: 30 }}
          style={{ x: isToggled ? "100%" : "0%" }}
        />
      </div>
      <label className="text-lg text-gray-700 cursor-pointer font-medium">{label}</label>
    </motion.div>
  );
};
// 🌱 Sprout animation for selected skills
const Sprout = () => (
  <motion.div
    className="absolute -top-2 right-2"
    initial={{ scale: 0, y: 6, opacity: 0 }}
    animate={{ scale: 1, y: 0, opacity: 1 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
  >
    🌱
  </motion.div>
);

export default function DynamicForm() {
  const [step, setStep] = useState(0);
  const totalSteps = 7;
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState(() => {
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem("formData");
      if (savedData) {
        return JSON.parse(savedData);
      }
    }
    return {
      hero: { name: "", tagline: "" },
      about: "",
      stack: [] as string[],
      hobbies: "",
      stats: {github_username:"", showStats: true, showTrophies: false },
      socials: {} as Record<string, string>,
      quote: "",
    };
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem("formData", JSON.stringify(formData));
    }, 500);
    return () => clearTimeout(timer);
  }, [formData]);

  const handleChange = (
    section: keyof FormData,
    key: string,
    value: string | boolean
  ) => {
    setFormData((prev) => {
      if (section === "hero") {
        return { ...prev, hero: { ...prev.hero, [key]: value } };
      }
      if (section === "stats") {
        return { ...prev, stats: { ...prev.stats, [key]: value } };
      }
      if (section === "socials") {
        return { ...prev, socials: { ...prev.socials, [key]: value } };
      }
      return { ...prev, [section]: value };
    });
  };

  const toggleSkill = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      stack: prev.stack.includes(id)
        ? prev.stack.filter((s) => s !== id)
        : [...prev.stack, id],
    }));
  };

  const nextStep = () => {
    if (step < totalSteps - 1) {
      setStep((s) => s + 1);
    } else {
      window.location.href = "/preview";
    }
  };

  const prevStep = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const renderStep = useMemo(() => {
    switch (step) {
      case 0:
        return (
          <>
            <motion.h2 className="text-3xl font-bold text-gray-800" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <span className="mr-2">👤</span> Hero Section
            </motion.h2>
            <motion.input
  placeholder="Your Name"
  className="border-b-2 border-gray-200 px-4 py-3 w-full bg-transparent focus:outline-none focus:border-gray-400 text-lg transition-all"
  value={formData.hero.name}
  onChange={(e) => {
    const rawName = e.target.value;
    handleChange("hero", "name", rawName);
    handleChange("hero", "encodedName", encodeURIComponent(rawName));
  }}
  whileFocus={{ scale: 1.01 }}
/>

            <motion.input
              placeholder="Tagline"
              className="border-b-2 border-gray-200 px-4 py-3 w-full bg-transparent focus:outline-none focus:border-gray-400 text-lg transition-all"
              value={formData.hero.tagline}
              onChange={(e) => handleChange("hero", "tagline", e.target.value)}
              whileFocus={{ scale: 1.01 }}
            />
          </>
        );
      case 1:
        return (
          <>
            <motion.h2 className="text-3xl font-bold text-gray-800" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <span className="mr-2">📖</span> About You
            </motion.h2>
            <motion.textarea
              placeholder="Write a short bio..."
              className="border-2 border-gray-200 rounded-2xl p-6 w-full h-48 bg-transparent focus:outline-none focus:border-gray-400 text-lg transition-all resize-none shadow-sm"
              value={formData.about}
              onChange={(e) => handleChange("about", "text", e.target.value)}
              whileFocus={{ scale: 1.01 }}
            />
          </>
        );
      case 2:
        return (
          <>
            <motion.h2
              className="text-3xl font-semibold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
            >
              🛠️ Tech Stack
            </motion.h2>

            {/* Search bar */}
            <motion.input
              type="text"
              placeholder="Search skills..."
              value={search}
              onChange={(e) => setSearch(e.target.value.toLowerCase())}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition mb-8"
              whileFocus={{ scale: 1.01 }}
            />

            <div className="space-y-10">
              {Object.entries(techCategories).map(([category, skills]) => {
                const filtered = skills.filter((s) =>
                  s.toLowerCase().includes(search)
                );
                if (!filtered.length) return null;

                return (
                  <div key={category} className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                      {category}
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                      {filtered.map((tech) => {
                        const selected = formData.stack.includes(tech);
                        return (
                          <motion.button
                            key={tech}
                            onClick={() => toggleSkill(tech)}
                            className={`relative flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium capitalize transition-all duration-300
                              ${
                                selected
                                  ? "bg-gray-900 text-white shadow-lg"
                                  : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                              }`}
                            whileHover={{ y: -3, scale: 1.03 }}
                            whileTap={{ scale: 0.96 }}
                          >
                            <img
                              src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech}/${tech}-original.svg`}
                              onError={(e) =>
                                (e.currentTarget.style.display = "none")
                              }
                              alt={tech}
                              className="w-5 h-5"
                            />
                            {tech}
                            {selected && <Sprout />}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        );
      case 3:
        return (
          <>
            <motion.h2 className="text-3xl font-bold text-gray-800" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <span className="mr-2">🎮</span> Beyond Code
            </motion.h2>
            <motion.textarea
              placeholder="Tell us about your hobbies..."
              className="border-2 border-gray-200 rounded-2xl p-6 w-full h-48 bg-transparent focus:outline-none focus:border-gray-400 text-lg transition-all resize-none shadow-sm"
              value={formData.hobbies}
              onChange={(e) => handleChange("hobbies", "text", e.target.value)}
              whileFocus={{ scale: 1.01 }}
            />
          </>
        );
        case 4:
          return (
            <>
              <motion.h2
                className="text-3xl font-bold text-gray-800 mb-6 flex items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <span className="mr-2">📊</span> Stats & Trophies
              </motion.h2>
        
              <div className="space-y-6">
                {/* GitHub Username */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <label className="block text-gray-700 font-medium mb-2">
                    GitHub Username
                  </label>
                  <motion.input
                    type="text"
                    placeholder="e.g., your-github-username"
                    value={formData.stats.github_username || ""}
                    onChange={(e) => handleChange("stats", "github_username", e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-transparent focus:outline-none focus:border-gray-400 text-lg transition-all"
                    whileFocus={{ scale: 1.01 }}
                  />
                </motion.div>
        
                {/* Toggles */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <ToggleSwitch
                    label="Show GitHub Stats"
                    isToggled={formData.stats.showStats}
                    onToggle={() =>
                      handleChange("stats", "showStats", !formData.stats.showStats)
                    }
                  />
                  <ToggleSwitch
                    label="Show GitHub Trophies"
                    isToggled={formData.stats.showTrophies}
                    onToggle={() =>
                      handleChange("stats", "showTrophies", !formData.stats.showTrophies)
                    }
                  />
                </div>
        
                {/* Small Hint */}
                <p className="text-sm text-gray-500 italic">
                  🔑 GitHub username is required to display stats and trophies.
                </p>
              </div>
            </>
          );
        
      case 5:
        return (
          <>
            <motion.h2 className="text-3xl font-bold text-gray-800" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <span className="mr-2">🌐</span> Social Links
            </motion.h2>
            {socials.map((s, index) => (
              <motion.input
                key={s.id}
                placeholder={s.label}
                className="border-b-2 border-gray-200 px-4 py-3 w-full bg-transparent focus:outline-none focus:border-gray-400 text-lg transition-all"
                value={formData.socials[s.id] || ""}
                onChange={(e) => handleChange("socials", s.id, e.target.value)}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileFocus={{ scale: 1.01 }}
              />
            ))}
          </>
        );
      case 6:
        return (
          <>
            <motion.h2 className="text-3xl font-bold text-gray-800" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <span className="mr-2">✨</span> End Quote
            </motion.h2>
            <motion.textarea
              placeholder="Leave an inspiring closing line..."
              className="border-2 border-gray-200 rounded-2xl p-6 w-full h-36 bg-transparent focus:outline-none focus:border-gray-400 text-lg transition-all resize-none shadow-sm"
              value={formData.quote}
              onChange={(e) => handleChange("quote", "text", e.target.value)}
              whileFocus={{ scale: 1.01 }}
            />
          </>
        );
      default:
        return null;
    }
  }, [step, formData, search]);

  const progress = ((step + 1) / totalSteps) * 100;

  return (
    <div className="max-w-4xl mx-auto py-24 px-8 font-sans">
      {/* Stepper Header with Progress Bar */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-4">
          <span className="text-gray-700 font-medium text-lg">
            Step {step + 1} of {totalSteps}
          </span>
        </div>
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gray-900 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
      </motion.div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          className="space-y-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30, transition: { duration: 0.3 } }}
          transition={{ duration: 0.5 }}
        >
          {renderStep}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <motion.div
        className="flex justify-between mt-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {step > 0 ? (
          <motion.button
            onClick={prevStep}
            className="px-8 py-3 border-2 border-gray-300 rounded-full text-gray-700 font-semibold hover:bg-gray-100 transition-all duration-300"
            whileHover={{ y: -4, boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)" }}
            whileTap={{ scale: 0.98 }}
          >
            Back
          </motion.button>
        ) : (
          <div />
        )}

        <motion.button
          onClick={nextStep}
          className="px-8 py-3 bg-gray-900 text-white rounded-full font-semibold hover:bg-gray-800 transition-all duration-300 shadow-lg"
          whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)" }}
          whileTap={{ scale: 0.98 }}
        >
          {step === totalSteps - 1 ? "Finish" : "Next"}
        </motion.button>
      </motion.div>
    </div>
  );
}
