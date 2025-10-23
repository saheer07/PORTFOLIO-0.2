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
  X,
  ExternalLink,
  BookOpen,
  Award,
  TrendingUp
} from 'lucide-react';
import { 
  SiHtml5, 
  SiCss3, 
  SiJavascript, 
  SiReact, 
  SiTailwindcss, 
  SiRedux,
  SiPython,
  SiDjango,
  SiMysql,
  SiPostgresql,
  SiGit
} from 'react-icons/si';

// Skill data with real logos and enhanced details
const skillData = {
  frontend: [
    { 
      name: 'HTML', 
      logo: SiHtml5,
      iconColor: 'text-orange-500',
      about: 'HyperText Markup Language (HTML) is the foundational language for creating web pages. It defines the structure and content of a webpage using semantic elements to improve accessibility and SEO, ensuring the page is properly understood by browsers and search engines.', 
      level: 90,
      gradient: 'from-orange-500 to-red-500',
      experience: '8+ months',
      projects: 5,
      category: 'Markup Language'
    },
    { 
      name: 'CSS', 
      logo: SiCss3,
      iconColor: 'text-blue-500',
      about: 'Cascading Style Sheets (CSS) is used to style and layout web pages. It controls the visual presentation including colors, fonts, spacing, and animations, making the web pages visually appealing and responsive across different devices.', 
      level: 85,
      gradient: 'from-blue-500 to-cyan-500',
      experience: '8+ monsth',
      projects: 3,
      category: 'Styling'
    },
    { 
      name: 'JavaScript', 
      logo: SiJavascript,
      iconColor: 'text-yellow-400',
      about: 'JavaScript is a versatile programming language that enables interactive features on websites, such as form validation, animations, dynamic content updates, and handling user events, transforming static pages into dynamic web applications.', 
      level: 80,
      gradient: 'from-yellow-400 to-orange-400',
      experience: '7+ months',
      projects: 6,
      category: 'Programming'
    },
    { 
      name: 'React', 
      logo: SiReact,
      iconColor: 'text-blue-400',
      about: 'React is a popular JavaScript library for building fast and scalable user interfaces using reusable components. It enables efficient rendering through a virtual DOM, supports state management, and facilitates the creation of complex single-page applications.', 
      level: 75,
      gradient: 'from-blue-400 to-purple-500',
      experience: '7+ months',
      projects: 5,
      category: 'Library'
    },
    { 
      name: 'Tailwind CSS', 
      logo: SiTailwindcss,
      iconColor: 'text-cyan-400',
      about: 'Tailwind CSS is a utility-first CSS framework that allows developers to rapidly build custom designs by composing small, reusable classes. It promotes consistency and speed, enabling responsive and modern designs without writing traditional CSS.', 
      level: 70,
      gradient: 'from-cyan-400 to-teal-500',
      experience: '6+ months',
      projects: 4,
      category: 'Framework'
    },
    { 
      name: 'Redux', 
      logo: SiRedux,
      iconColor: 'text-purple-500',
      about: 'Redux is a predictable state management library for JavaScript applications, often used with React. It centralizes application state, making it easier to debug, maintain, and test complex applications by following strict unidirectional data flow principles.', 
      level: 65,
      gradient: 'from-purple-500 to-pink-500',
      experience: '5+ months',
      projects: 3,
      category: 'State Management'
    }
  ],

  backend: [
    {
      name: 'Python',
      logo: SiPython,
      iconColor: 'text-yellow-500',
      about: "Python is a high-level, interpreted, general-purpose programming language known for its simplicity and readability. It supports multiple programming paradigms including procedural, object-oriented, and functional programming.",
      level: 85,
      gradient: 'from-yellow-500 to-green-500',
      experience: '3+ months',
      projects: 3,
      category: 'Programming'
    },
    {
      name: 'Django',
      logo: SiDjango,
      iconColor: 'text-green-500',
      about: "Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design. It follows the model-template-views architectural pattern and includes an ORM for database operations.",
      level: 80,
      gradient: 'from-green-500 to-emerald-500',
      experience: '3+ months',
      projects: 1,
      category: 'Framework'
    },
    {
      name: 'SQL',
      logo: SiMysql,
      iconColor: 'text-blue-600',
      about: "Structured Query Language (SQL) is used to communicate with relational databases. It allows performing queries, updates, inserts, and management of data effectively.",
      level: 75,
      gradient: 'from-blue-600 to-indigo-600',
      experience: '3+ month',
      projects: 3,
      category: 'Database Query'
    },
    {
      name: 'PostgreSQL',
      logo: SiPostgresql,
      iconColor: 'text-sky-500',
      about: "PostgreSQL is a powerful, open-source relational database system with advanced features like JSON support, indexing, transactions, and strong SQL compliance.",
      level: 70,
      gradient: 'from-sky-500 to-blue-500',
      experience: '2+ months',
      projects: 3,
      category: 'Database'
    },
    {
      name: 'Django REST Framework',
      logo: SiDjango,
      iconColor: 'text-green-700',
      about: "Django REST Framework is a toolkit for building Web APIs. It provides features like serialization, authentication, permissions, and browsable APIs, making it easy to build RESTful services.",
      level: 60,
      gradient: 'from-green-700 to-teal-600',
      experience: '1+ month',
      projects: 2,
      category: 'API Framework'
    }
  ],

  tools: [
    { 
      name: 'Git', 
      logo: SiGit,
      iconColor: 'text-orange-600',
      about: 'Git is a distributed version control system that tracks changes in source code during software development. It enables collaboration, branching, merging, and maintaining a complete history of project changes.',
      level: 80,
      gradient: 'from-orange-600 to-red-600',
      experience: '7+ months',
      projects: 8,
      category: 'Version Control'
    },
    { 
      name: 'VS Code', 
      logo: Code2,
      iconColor: 'text-blue-500',
      about: 'Visual Studio Code is a lightweight but powerful source code editor with built-in support for debugging, task running, version control, and extensive customization through extensions.',
      level: 90,
      gradient: 'from-blue-500 to-purple-500',
      experience: '8+ month',
      projects: 8,
      category: 'Code Editor'
    },
  ],
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
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

// Modal Component
const SkillModal = ({ skill, onClose, isDarkMode }) => {
  const LogoComponent = skill.logo;
  
  const themeClasses = {
    card: isDarkMode 
      ? 'bg-black/40 border-white/20' 
      : 'bg-white/40 border-black/20',
    text: isDarkMode ? 'text-white' : 'text-gray-900',
    textMuted: isDarkMode ? 'text-gray-300' : 'text-gray-600',
    accent: isDarkMode ? 'text-cyan-400' : 'text-blue-600',
    progressBg: isDarkMode ? 'bg-gray-700/50' : 'bg-gray-300/50',
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: 'spring', damping: 25 }}
        className={`relative max-w-2xl w-full ${themeClasses.card} backdrop-blur-2xl border rounded-3xl p-8 shadow-2xl`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <motion.button
          onClick={onClose}
          className="absolute -top-4 -right-4 p-3 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors z-10"
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.95 }}
        >
          <X className="w-6 h-6" />
        </motion.button>

        {/* Glow Effect */}
        <div className={`absolute -inset-1 bg-gradient-to-r ${skill.gradient} rounded-3xl opacity-20 blur-xl`} />

        <div className="relative space-y-6">
          {/* Header with Logo */}
          <div className="flex items-center gap-6">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', damping: 15 }}
              className={`relative p-6 ${themeClasses.card} backdrop-blur-sm rounded-2xl border`}
            >
              <div className={`absolute -inset-2 bg-gradient-to-r ${skill.gradient} rounded-2xl opacity-20 blur-lg`} />
              <LogoComponent className={`${skill.iconColor} w-16 h-16 relative z-10`} />
            </motion.div>

            <div className="flex-1">
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className={`text-3xl font-black ${themeClasses.text} mb-2`}
              >
                {skill.name}
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className={`inline-block px-4 py-1 ${themeClasses.card} backdrop-blur-sm border rounded-full`}
              >
                <span className={`text-sm font-semibold ${themeClasses.accent}`}>
                  {skill.category}
                </span>
              </motion.div>
            </div>
          </div>

          {/* Stats Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-3 gap-4"
          >
            <div className={`${themeClasses.card} backdrop-blur-sm border rounded-2xl p-4 text-center`}>
              <TrendingUp className={`w-6 h-6 ${themeClasses.accent} mx-auto mb-2`} />
              <div className={`text-2xl font-bold ${themeClasses.text}`}>{skill.level}%</div>
              <div className={`text-xs ${themeClasses.textMuted}`}>Proficiency</div>
            </div>
            <div className={`${themeClasses.card} backdrop-blur-sm border rounded-2xl p-4 text-center`}>
              <BookOpen className={`w-6 h-6 ${themeClasses.accent} mx-auto mb-2`} />
              <div className={`text-2xl font-bold ${themeClasses.text}`}>{skill.experience}</div>
              <div className={`text-xs ${themeClasses.textMuted}`}>Experience</div>
            </div>
            <div className={`${themeClasses.card} backdrop-blur-sm border rounded-2xl p-4 text-center`}>
              <Award className={`w-6 h-6 ${themeClasses.accent} mx-auto mb-2`} />
              <div className={`text-2xl font-bold ${themeClasses.text}`}>{skill.projects}</div>
              <div className={`text-xs ${themeClasses.textMuted}`}>Projects</div>
            </div>
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-2"
          >
            <div className="flex justify-between items-center">
              <span className={`text-sm font-medium ${themeClasses.textMuted}`}>Skill Level</span>
              <span className={`text-sm font-bold ${themeClasses.accent}`}>{skill.level}%</span>
            </div>
            <div className={`w-full ${themeClasses.progressBg} backdrop-blur-sm rounded-full h-4 overflow-hidden border border-white/10`}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${skill.level}%` }}
                transition={{ duration: 1.5, ease: 'easeOut', delay: 0.5 }}
                className={`h-full rounded-full bg-gradient-to-r ${skill.gradient} shadow-lg relative overflow-hidden`}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: [-100, 200] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className={`${themeClasses.card} backdrop-blur-sm border rounded-2xl p-6`}
          >
            <h3 className={`text-lg font-bold ${themeClasses.text} mb-3 flex items-center gap-2`}>
              <BookOpen className="w-5 h-5" />
              About
            </h3>
            <p className={`${themeClasses.textMuted} leading-relaxed text-sm`}>
              {skill.about}
            </p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Single Skill Card component
const SkillCard = ({ skill, onClick, isDarkMode }) => {
  const LogoComponent = skill.logo;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const themeClasses = {
    card: isDarkMode 
      ? 'bg-black/20 border-white/10' 
      : 'bg-white/30 border-black/10',
    text: isDarkMode ? 'text-white' : 'text-gray-900',
    textMuted: isDarkMode ? 'text-gray-300' : 'text-gray-600',
    accent: isDarkMode ? 'text-cyan-400' : 'text-blue-600',
    progressBg: isDarkMode ? 'bg-gray-700/50' : 'bg-gray-300/50',
  };

  return (
    <motion.div
      variants={cardVariant}
      className="relative cursor-pointer w-full max-w-sm mx-auto group"
      onClick={onClick}
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      {/* Glow Effect */}
      <div className={`absolute -inset-1 bg-gradient-to-r ${skill.gradient} rounded-3xl opacity-0 blur-xl group-hover:opacity-30 transition-opacity duration-500`} />

      <div className={`relative ${themeClasses.card} backdrop-blur-xl border rounded-3xl p-6 shadow-2xl h-full flex flex-col`}>
        {/* Logo and Name */}
        <div className="flex items-center gap-4 mb-6">
          <motion.div 
            className={`relative p-3 ${themeClasses.card} backdrop-blur-sm rounded-2xl border`}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <div className={`absolute -inset-2 bg-gradient-to-r ${skill.gradient} rounded-2xl opacity-20 blur-lg`} />
            <LogoComponent className={`${skill.iconColor} w-10 h-10 relative z-10`} />
          </motion.div>
          
          <div className="flex-1">
            <h3 className={`text-xl font-bold ${themeClasses.text}`}>{skill.name}</h3>
            <p className={`text-xs ${themeClasses.textMuted}`}>{skill.category}</p>
          </div>

          <ExternalLink className={`w-5 h-5 ${themeClasses.accent} opacity-0 group-hover:opacity-100 transition-opacity`} />
        </div>

        {/* Mini Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className={`${themeClasses.card} backdrop-blur-sm border rounded-xl p-2 text-center`}>
            <div className={`text-sm font-bold ${themeClasses.text}`}>{skill.experience}</div>
            <div className={`text-xs ${themeClasses.textMuted}`}>Experience</div>
          </div>
          <div className={`${themeClasses.card} backdrop-blur-sm border rounded-xl p-2 text-center`}>
            <div className={`text-sm font-bold ${themeClasses.text}`}>{skill.projects}</div>
            <div className={`text-xs ${themeClasses.textMuted}`}>Projects</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2 mt-auto">
          <div className="flex justify-between items-center">
            <span className={`text-xs font-medium ${themeClasses.textMuted}`}>Proficiency</span>
            <span className={`text-xs font-bold ${themeClasses.accent}`}>{skill.level}%</span>
          </div>
          <div
            ref={ref}
            className={`w-full ${themeClasses.progressBg} backdrop-blur-sm rounded-full h-2 overflow-hidden border border-white/10`}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: inView ? `${skill.level}%` : 0 }}
              transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
              className={`h-full rounded-full bg-gradient-to-r ${skill.gradient} shadow-lg`}
            />
          </div>
        </div>

        {/* Click indicator */}
        <motion.div
          className={`mt-4 text-center ${themeClasses.textMuted} text-xs flex items-center justify-center gap-2`}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Sparkles className="w-3 h-3" />
          <span>Click for details</span>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Main Skills component
export default function ModernSkills() {
  const [tab, setTab] = useState('frontend');
  const [search, setSearch] = useState('');
  const [selectedSkill, setSelectedSkill] = useState(null);
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
      className={`min-h-screen py-24 px-4 relative overflow-hidden ${themeClasses.bg}`}
    >
      {/* Floating Background Elements - Matching About */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
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
      </div>

      <motion.div
        variants={containerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-7xl mx-auto relative z-10"
        data-aos="fade-up"
      >
        {/* Header - Matching About */}
        <motion.div variants={itemVariant} className="text-center mb-16">
          <motion.div className="inline-flex items-center gap-3 mb-6">
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
          {/* Search Bar */}
          <motion.div variants={itemVariant} className="mb-8">
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
            className="flex justify-center gap-3 mb-12 flex-wrap"
          >
            {tabs.map(category => {
              const TabIcon = tabIcons[category];
              return (
                <motion.button
                  key={category}
                  onClick={() => { 
                    setTab(category); 
                    setSearch('');
                  }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center gap-3 px-6 py-3 rounded-2xl text-base font-bold tracking-wide transition-all duration-300 backdrop-blur-sm border ${
                    tab === category ? themeClasses.tabActive : themeClasses.tabInactive
                  }`}
                >
                  <TabIcon className="w-5 h-5" />
                  <span>{category.charAt(0).toUpperCase() + category.slice(1)}</span>
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
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredSkills.length > 0 ? (
                filteredSkills.map(skill => (
                  <SkillCard
                    key={skill.name}
                    skill={skill}
                    onClick={() => setSelectedSkill(skill)}
                    isDarkMode={isDarkMode}
                  />
                ))
              ) : (
                <motion.div
                  variants={itemVariant}
                  className="col-span-full text-center py-12"
                >
                  <Target className={`w-16 h-16 ${themeClasses.textMuted} mx-auto mb-4 opacity-50`} />
                  <p className={`${themeClasses.textMuted} text-xl mb-4`}>No skills found matching "{search}"</p>
                  <button
                    onClick={() => setSearch('')}
                    className={`px-6 py-3 ${themeClasses.tabInactive} backdrop-blur-sm border rounded-xl hover:scale-105 transition-all`}
                  >
                    Clear Search
                  </button>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Skills Summary */}
          <motion.div variants={itemVariant} className="mt-16 text-center">
            <div className={`inline-flex items-center gap-4 px-6 py-4 ${themeClasses.card} backdrop-blur-xl border rounded-2xl`}>
              <Target className={`w-5 h-5 ${themeClasses.accent}`} />
              <span className={`${themeClasses.textMuted} text-base`}>
                {Object.values(skillData).flat().length} total skills across {tabs.length} categories
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Skill Detail Modal */}
      <AnimatePresence>
        {selectedSkill && (
          <SkillModal
            skill={selectedSkill}
            onClose={() => setSelectedSkill(null)}
            isDarkMode={isDarkMode}
          />
        )}
      </AnimatePresence>
    </section>
  );
}