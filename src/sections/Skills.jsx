import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { 
  Code2,
  Database,
  Settings,
  Sparkles,
  Zap,
  Target,
  Search,
  Filter,
  RotateCcw,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

// Skill data organized by category with Lucide icons
const skillData = {
  frontend: [
    { 
      name: 'HTML', 
      icon: 'Code2',
      iconColor: 'text-orange-500',
      about: 'HyperText Markup Language (HTML) is the foundational language for creating web pages. It defines the structure and content of a webpage using semantic elements to improve accessibility and SEO, ensuring the page is properly understood by browsers and search engines.', 
      level: 90,
      gradient: 'from-orange-500 to-red-500'
    },
    { 
      name: 'CSS', 
      icon: 'Code2',
      iconColor: 'text-blue-500',
      about: 'Cascading Style Sheets (CSS) is used to style and layout web pages. It controls the visual presentation including colors, fonts, spacing, and animations, making the web pages visually appealing and responsive across different devices.', 
      level: 85,
      gradient: 'from-blue-500 to-cyan-500'
    },
    { 
      name: 'JavaScript', 
      icon: 'Code2',
      iconColor: 'text-yellow-400',
      about: 'JavaScript is a versatile programming language that enables interactive features on websites, such as form validation, animations, dynamic content updates, and handling user events, transforming static pages into dynamic web applications.', 
      level: 80,
      gradient: 'from-yellow-400 to-orange-400'
    },
    { 
      name: 'React', 
      icon: 'Code2',
      iconColor: 'text-blue-400',
      about: 'React is a popular JavaScript library for building fast and scalable user interfaces using reusable components. It enables efficient rendering through a virtual DOM, supports state management, and facilitates the creation of complex single-page applications.', 
      level: 75,
      gradient: 'from-blue-400 to-purple-500'
    },
    { 
      name: 'Tailwind CSS', 
      icon: 'Code2',
      iconColor: 'text-cyan-400',
      about: 'Tailwind CSS is a utility-first CSS framework that allows developers to rapidly build custom designs by composing small, reusable classes. It promotes consistency and speed, enabling responsive and modern designs without writing traditional CSS.', 
      level: 70,
      gradient: 'from-cyan-400 to-teal-500'
    },
    { 
      name: 'Redux', 
      icon: 'Code2',
      iconColor: 'text-purple-500',
      about: 'Redux is a predictable state management library for JavaScript applications, often used with React. It centralizes application state, making it easier to debug, maintain, and test complex applications by following strict unidirectional data flow principles.', 
      level: 65,
      gradient: 'from-purple-500 to-pink-500'
    }
  ],

  backend: [
    {
      name: 'Python',
      icon: 'Database',
      iconColor: 'text-yellow-500',
      about: "Python is a high-level, interpreted, general-purpose programming language known for its simplicity and readability. It supports multiple programming paradigms including procedural, object-oriented, and functional programming.",
      level: 85,
      gradient: 'from-yellow-500 to-green-500'
    },
    {
      name: 'Django',
      icon: 'Database',
      iconColor: 'text-green-500',
      about: "Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design. It follows the model-template-views architectural pattern and includes an ORM for database operations.",
      level: 80,
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      name: 'SQL',
      icon: 'Database',
      iconColor: 'text-blue-600',
      about: "Structured Query Language (SQL) is used to communicate with relational databases. It allows performing queries, updates, inserts, and management of data effectively.",
      level: 75,
      gradient: 'from-blue-600 to-indigo-600'
    },
    {
      name: 'PostgreSQL',
      icon: 'Database',
      iconColor: 'text-sky-500',
      about: "PostgreSQL is a powerful, open-source relational database system with advanced features like JSON support, indexing, transactions, and strong SQL compliance.",
      level: 70,
      gradient: 'from-sky-500 to-blue-500'
    },
    {
      name: 'Django REST Framework',
      icon: 'Database',
      iconColor: 'text-green-700',
      about: "Django REST Framework is a toolkit for building Web APIs. It provides features like serialization, authentication, permissions, and browsable APIs, making it easy to build RESTful services.",
      level: 75,
      gradient: 'from-green-700 to-teal-600'
    }
  ],

  tools: [
    { 
      name: 'Git', 
      icon: 'Settings',
      iconColor: 'text-orange-600',
      about: 'Git is a distributed version control system that tracks changes in source code during software development. It enables collaboration, branching, merging, and maintaining a complete history of project changes.',
      level: 80,
      gradient: 'from-orange-600 to-red-600'
    },
    { 
      name: 'VS Code', 
      icon: 'Settings',
      iconColor: 'text-blue-500',
      about: 'Visual Studio Code is a lightweight but powerful source code editor with built-in support for debugging, task running, version control, and extensive customization through extensions.',
      level: 90,
      gradient: 'from-blue-500 to-purple-500'
    },
  ],
};

// Icon mapping
const IconMap = {
  Code2,
  Database,
  Settings
};

// Enhanced Animation Variants
const containerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const itemVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: [0.6, -0.05, 0.01, 0.99] 
    },
  },
};

const cardVariant = {
  hidden: { opacity: 0, scale: 0.8, rotateY: -15 },
  visible: {
    opacity: 1,
    scale: 1,
    rotateY: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

// Single Skill Card component
const SkillCard = function SkillCard({ skill, flippedCard, setFlippedCard, isDarkMode }) {
  const { name, icon, iconColor, about, level, gradient } = skill;
  const flipped = flippedCard === name;
  const IconComponent = IconMap[icon];

  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const themeClasses = {
    card: isDarkMode 
      ? 'bg-black/20 border-white/10' 
      : 'bg-white/20 border-black/10',
    cardBack: isDarkMode 
      ? 'bg-black/40 border-white/20' 
      : 'bg-white/40 border-black/20',
    text: isDarkMode ? 'text-white' : 'text-gray-900',
    textMuted: isDarkMode ? 'text-gray-300' : 'text-gray-600',
    accent: isDarkMode ? 'text-cyan-400' : 'text-blue-600',
    progressBg: isDarkMode ? 'bg-gray-700/50' : 'bg-gray-300/50',
  };

  return (
    <motion.div
      variants={cardVariant}
      className="relative perspective-1000 cursor-pointer w-full max-w-sm mx-auto group"
      onClick={() => setFlippedCard(flipped ? null : name)}
      tabIndex={0}
      role="button"
      aria-pressed={flipped}
      aria-label={`Skill card for ${name}, press enter or space to flip`}
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      <motion.div
        className="relative w-full h-72 rounded-3xl shadow-2xl backdrop-blur-xl border select-none overflow-hidden"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Glow Effect */}
        <div className={`absolute -inset-1 bg-gradient-to-r ${gradient} rounded-3xl opacity-20 blur-lg group-hover:opacity-30 transition-opacity`} />

        {/* Front Side */}
        <motion.div
          className={`absolute inset-0 flex flex-col items-center justify-center p-8 ${themeClasses.card} backdrop-blur-xl border rounded-3xl`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Icon with animated background */}
          <motion.div 
            className="relative mb-6"
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <div className={`absolute -inset-4 bg-gradient-to-r ${gradient} rounded-2xl opacity-20 blur-lg`} />
            <div className={`relative p-4 ${themeClasses.card} backdrop-blur-sm rounded-2xl border`}>
              <IconComponent className={`${iconColor} w-12 h-12`} />
            </div>
          </motion.div>

          <h3 className={`text-2xl font-bold mb-6 ${themeClasses.text} text-center`}>{name}</h3>

          {/* Enhanced Skill Progress Bar */}
          <div className="w-full space-y-2">
            <div className="flex justify-between items-center">
              <span className={`text-sm font-medium ${themeClasses.textMuted}`}>Proficiency</span>
              <motion.span
                className={`text-sm font-bold ${themeClasses.accent}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: inView ? 1 : 0 }}
                transition={{ delay: 0.8 }}
              >
                {level}%
              </motion.span>
            </div>
            <div
              ref={ref}
              className={`w-full ${themeClasses.progressBg} backdrop-blur-sm rounded-full h-3 overflow-hidden border border-white/10`}
            >
              <motion.div
                initial={{ width: 0, opacity: 0.8 }}
                animate={{ 
                  width: inView ? `${level}%` : 0,
                  opacity: inView ? 1 : 0.8
                }}
                transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
                className={`h-full rounded-full bg-gradient-to-r ${gradient} shadow-lg relative overflow-hidden`}
              >
                {/* Progress shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: [-100, 200] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                />
              </motion.div>
            </div>
          </div>

          {/* Flip indicator */}
          <motion.div
            className={`mt-4 flex items-center gap-2 ${themeClasses.textMuted} text-xs`}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <RotateCcw className="w-3 h-3" />
            <span>Click to learn more</span>
          </motion.div>
        </motion.div>

        {/* Back Side */}
        <motion.div
          className={`absolute inset-0 flex items-center justify-center p-6 ${themeClasses.cardBack} backdrop-blur-xl border rounded-3xl`}
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className="text-center space-y-4">
            <div className={`p-3 ${themeClasses.card} backdrop-blur-sm rounded-2xl border inline-block`}>
              <IconComponent className={`${iconColor} w-8 h-8`} />
            </div>
            <h4 className={`text-xl font-bold ${themeClasses.text} mb-3`}>{name}</h4>
            <p className={`${themeClasses.textMuted} text-sm leading-relaxed`}>{about}</p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// Main Skills component
export default function ModernSkills() {
  const [tab, setTab] = useState('frontend');
  const [search, setSearch] = useState('');
  const [flippedCard, setFlippedCard] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const tabs = Object.keys(skillData);

  // Theme detection
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.body.classList.contains('bg-slate-900'));
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // Filter skills
  const filteredSkills = skillData[tab].filter(skill =>
    skill.name.toLowerCase().includes(search.toLowerCase())
  );

  const themeClasses = {
    bg: isDarkMode 
      ? 'bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800' 
      : 'bg-gradient-to-br from-gray-50 via-white to-blue-50',
    card: isDarkMode 
      ? 'bg-black/20 border-white/10' 
      : 'bg-white/30 border-black/10',
    text: isDarkMode ? 'text-white' : 'text-gray-900',
    textMuted: isDarkMode ? 'text-gray-300' : 'text-gray-600',
    accent: isDarkMode ? 'text-cyan-400' : 'text-blue-600',
    tabActive: isDarkMode 
      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white' 
      : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white',
    tabInactive: isDarkMode 
      ? 'bg-black/30 text-gray-300 hover:bg-black/40' 
      : 'bg-white/30 text-gray-600 hover:bg-white/40',
    searchBg: isDarkMode 
      ? 'bg-black/30 border-white/20' 
      : 'bg-white/30 border-black/20',
  };

  const tabIcons = {
    frontend: Code2,
    backend: Database,
    tools: Settings
  };

  return (
    <section 
      id="skills" 
      className={`min-h-screen py-24 px-6 relative overflow-hidden ${themeClasses.bg}`}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 rounded-full ${isDarkMode ? 'bg-cyan-400/20' : 'bg-blue-400/20'}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Gradient Orbs */}
        <motion.div 
          className={`absolute top-20 right-20 w-96 h-96 rounded-full opacity-10 blur-3xl ${
            isDarkMode ? 'bg-gradient-to-r from-cyan-400 to-purple-500' : 'bg-gradient-to-r from-blue-400 to-pink-500'
          }`}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <motion.div
        variants={containerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-7xl mx-auto relative z-10"
      >
        {/* Section Header */}
        <motion.div
          variants={itemVariant}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-3 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className={`w-8 h-8 ${themeClasses.accent}`} />
            <h1 className={`text-5xl lg:text-6xl font-black tracking-tight ${themeClasses.text}`}>
              My <span className={themeClasses.accent}>Skills</span>
            </h1>
            <Sparkles className={`w-8 h-8 ${themeClasses.accent}`} />
          </motion.div>
          <p className={`text-xl ${themeClasses.textMuted} max-w-2xl mx-auto`}>
            Technologies and tools I use to bring ideas to life
          </p>
        </motion.div>

        {/* Main Content Card */}
        <div className={`backdrop-blur-xl ${themeClasses.card} border rounded-3xl shadow-2xl p-8 lg:p-12 relative overflow-hidden`}>
          {/* Decorative Elements */}
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-6 right-6"
          >
            <Zap className={`w-6 h-6 ${themeClasses.accent}`} />
          </motion.div>

          {/* Search Bar */}
          <motion.div
            variants={itemVariant}
            className="mb-8"
          >
            <div className={`relative max-w-md mx-auto ${themeClasses.searchBg} backdrop-blur-sm border rounded-2xl overflow-hidden`}>
              <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${themeClasses.textMuted}`} />
              <input
                type="text"
                placeholder="Search skills..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={`w-full pl-12 pr-4 py-4 bg-transparent ${themeClasses.text} placeholder-gray-500 focus:outline-none`}
              />
            </div>
          </motion.div>

          {/* Enhanced Tabs */}
          <motion.div 
            variants={itemVariant}
            className="flex justify-center gap-2 mb-12 flex-wrap"
          >
            {tabs.map(category => {
              const TabIcon = tabIcons[category];
              return (
                <motion.button
                  key={category}
                  onClick={() => { 
                    setTab(category); 
                    setFlippedCard(null); 
                    setSearch('');
                  }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center gap-3 px-8 py-4 rounded-2xl text-lg font-bold tracking-wide transition-all duration-300 backdrop-blur-sm border ${
                    tab === category ? themeClasses.tabActive : themeClasses.tabInactive
                  }`}
                >
                  <TabIcon className="w-5 h-5" />
                  <span>{category.charAt(0).toUpperCase() + category.slice(1)}</span>
                  {tab === category && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full"
                    />
                  )}
                </motion.button>
              );
            })}
          </motion.div>

          {/* Skills Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              variants={containerVariant}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredSkills.length > 0 ? (
                filteredSkills.map(skill => (
                  <SkillCard
                    key={skill.name}
                    skill={skill}
                    flippedCard={flippedCard}
                    setFlippedCard={setFlippedCard}
                    isDarkMode={isDarkMode}
                  />
                ))
              ) : (
                <motion.div
                  variants={itemVariant}
                  className="col-span-full text-center py-12"
                >
                  <Target className={`w-16 h-16 ${themeClasses.textMuted} mx-auto mb-4 opacity-50`} />
                  <p className={`${themeClasses.textMuted} text-xl`}>No skills found matching "{search}"</p>
                  <button
                    onClick={() => setSearch('')}
                    className={`mt-4 px-6 py-2 ${themeClasses.tabInactive} backdrop-blur-sm border rounded-xl hover:scale-105 transition-all`}
                  >
                    Clear Search
                  </button>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Skills Summary */}
          <motion.div
            variants={itemVariant}
            className="mt-16 text-center"
          >
            <div className={`inline-flex items-center gap-4 px-6 py-3 ${themeClasses.card} backdrop-blur-sm border rounded-2xl`}>
              <Target className={`w-5 h-5 ${themeClasses.accent}`} />
              <span className={`${themeClasses.textMuted}`}>
                {Object.values(skillData).flat().length} total skills across {tabs.length} categories
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}