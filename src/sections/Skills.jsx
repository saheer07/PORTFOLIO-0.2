import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Code2,
  Database,
  Settings,
  Sparkles,
  Target,
  Search,
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
      iconColor: 'text-red-500',
      about: 'HyperText Markup Language (HTML) is the foundational language for creating web pages. It defines the structure and content of a webpage using semantic elements to improve accessibility and SEO, ensuring the page is properly understood by browsers and search engines.',
      level: 90,
      gradient: 'from-orange-600 to-red-600',
      experience: '8+ months',
      projects: 5,
      category: 'Markup Language'
    },
    {
      name: 'CSS',
      logo: SiCss3,
      iconColor: 'text-red-400',
      about: 'Cascading Style Sheets (CSS) is used to style and layout web pages. It controls the visual presentation including colors, fonts, spacing, and animations, making the web pages visually appealing and responsive across different devices.',
      level: 85,
      gradient: 'from-blue-600 to-red-500',
      experience: '8+ months',
      projects: 3,
      category: 'Styling'
    },
    {
      name: 'JavaScript',
      logo: SiJavascript,
      iconColor: 'text-red-300',
      about: 'JavaScript is a versatile programming language that enables interactive features on websites, such as form validation, animations, dynamic content updates, and handling user events, transforming static pages into dynamic web applications.',
      level: 80,
      gradient: 'from-red-400 to-yellow-500',
      experience: '7+ months',
      projects: 6,
      category: 'Programming'
    },
    {
      name: 'React',
      logo: SiReact,
      iconColor: 'text-red-400',
      about: 'React is a popular JavaScript library for building fast and scalable user interfaces using reusable components. It enables efficient rendering through a virtual DOM, supports state management, and facilitates the creation of complex single-page applications.',
      level: 75,
      gradient: 'from-red-500 to-purple-600',
      experience: '7+ months',
      projects: 5,
      category: 'Library'
    },
    {
      name: 'Tailwind CSS',
      logo: SiTailwindcss,
      iconColor: 'text-red-300',
      about: 'Tailwind CSS is a utility-first CSS framework that allows developers to rapidly build custom designs by composing small, reusable classes. It promotes consistency and speed, enabling responsive and modern designs without writing traditional CSS.',
      level: 70,
      gradient: 'from-red-400 to-teal-500',
      experience: '6+ months',
      projects: 4,
      category: 'Framework'
    },
    {
      name: 'Redux',
      logo: SiRedux,
      iconColor: 'text-red-500',
      about: 'Redux is a predictable state management library for JavaScript applications, often used with React. It centralizes application state, making it easier to debug, maintain, and test complex applications by following strict unidirectional data flow principles.',
      level: 65,
      gradient: 'from-purple-600 to-red-600',
      experience: '5+ months',
      projects: 3,
      category: 'State Management'
    }
  ],

  backend: [
    {
      name: 'Python',
      logo: SiPython,
      iconColor: 'text-red-400',
      about: "Python is a high-level, interpreted, general-purpose programming language known for its simplicity and readability. It supports multiple programming paradigms including procedural, object-oriented, and functional programming.",
      level: 85,
      gradient: 'from-yellow-500 to-red-500',
      experience: '3+ months',
      projects: 3,
      category: 'Programming'
    },
    {
      name: 'Django',
      logo: SiDjango,
      iconColor: 'text-red-600',
      about: "Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design. It follows the model-template-views architectural pattern and includes an ORM for database operations.",
      level: 80,
      gradient: 'from-green-600 to-red-600',
      experience: '3+ months',
      projects: 1,
      category: 'Framework'
    },
    {
      name: 'SQL',
      logo: SiMysql,
      iconColor: 'text-red-500',
      about: "Structured Query Language (SQL) is used to communicate with relational databases. It allows performing queries, updates, inserts, and management of data effectively.",
      level: 75,
      gradient: 'from-blue-600 to-red-500',
      experience: '3+ months',
      projects: 3,
      category: 'Database Query'
    },
    {
      name: 'PostgreSQL',
      logo: SiPostgresql,
      iconColor: 'text-red-400',
      about: "PostgreSQL is a powerful, open-source relational database system with advanced features like JSON support, indexing, transactions, and strong SQL compliance.",
      level: 70,
      gradient: 'from-blue-500 to-red-400',
      experience: '2+ months',
      projects: 3,
      category: 'Database'
    },
    {
      name: 'Django REST Framework',
      logo: SiDjango,
      iconColor: 'text-red-600',
      about: "Django REST Framework is a toolkit for building Web APIs. It provides features like serialization, authentication, permissions, and browsable APIs, making it easy to build RESTful services.",
      level: 60,
      gradient: 'from-red-600 to-orange-600',
      experience: '1+ month',
      projects: 2,
      category: 'API Framework'
    }
  ],

  tools: [
    {
      name: 'Git',
      logo: SiGit,
      iconColor: 'text-red-500',
      about: 'Git is a distributed version control system that tracks changes in source code during software development. It enables collaboration, branching, merging, and maintaining a complete history of project changes.',
      level: 80,
      gradient: 'from-red-500 to-orange-600',
      experience: '7+ months',
      projects: 8,
      category: 'Version Control'
    },
    {
      name: 'VS Code',
      logo: Code2,
      iconColor: 'text-red-400',
      about: 'Visual Studio Code is a lightweight but powerful source code editor with built-in support for debugging, task running, version control, and extensive customization through extensions.',
      level: 90,
      gradient: 'from-blue-500 to-red-500',
      experience: '8+ months',
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
const SkillModal = ({ skill, onClose }) => {
  const LogoComponent = skill.logo;

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
        className="relative max-w-2xl w-full bg-black/90 backdrop-blur-2xl border border-red-500/20 rounded-3xl p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <motion.button
          onClick={onClose}
          className="absolute -top-4 -right-4 p-3 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition-colors z-10"
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
              className="relative p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
            >
              <div className={`absolute -inset-2 bg-gradient-to-r ${skill.gradient} rounded-2xl opacity-20 blur-lg`} />
              <LogoComponent className={`${skill.iconColor} w-16 h-16 relative z-10`} />
            </motion.div>

            <div className="flex-1">
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-3xl font-black text-white mb-2"
              >
                {skill.name}
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block px-4 py-1 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full"
              >
                <span className="text-sm font-semibold text-red-400">
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
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 text-center">
              <TrendingUp className="w-6 h-6 text-red-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{skill.level}%</div>
              <div className="text-xs text-gray-400">Proficiency</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 text-center">
              <BookOpen className="w-6 h-6 text-red-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{skill.experience}</div>
              <div className="text-xs text-gray-400">Experience</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 text-center">
              <Award className="w-6 h-6 text-red-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{skill.projects}</div>
              <div className="text-xs text-gray-400">Projects</div>
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
              <span className="text-sm font-medium text-gray-400">Skill Level</span>
              <span className="text-sm font-bold text-red-400">{skill.level}%</span>
            </div>
            <div className="w-full bg-gray-800/50 backdrop-blur-sm rounded-full h-4 overflow-hidden border border-white/10">
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
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
          >
            <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              About
            </h3>
            <p className="text-gray-300 leading-relaxed text-sm">
              {skill.about}
            </p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Single Skill Card component
const SkillCard = ({ skill, onClick }) => {
  const LogoComponent = skill.logo;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

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

      <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl h-full flex flex-col hover:border-red-500/30 transition-colors">
        {/* Logo and Name */}
        <div className="flex items-center gap-4 mb-6">
          <motion.div
            className="relative p-3 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <div className={`absolute -inset-2 bg-gradient-to-r ${skill.gradient} rounded-2xl opacity-20 blur-lg`} />
            <LogoComponent className={`${skill.iconColor} w-10 h-10 relative z-10`} />
          </motion.div>

          <div className="flex-1">
            <h3 className="text-xl font-bold text-white">{skill.name}</h3>
            <p className="text-xs text-gray-400">{skill.category}</p>
          </div>

          <ExternalLink className="w-5 h-5 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Mini Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-2 text-center">
            <div className="text-sm font-bold text-white">{skill.experience}</div>
            <div className="text-xs text-gray-400">Experience</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-2 text-center">
            <div className="text-sm font-bold text-white">{skill.projects}</div>
            <div className="text-xs text-gray-400">Projects</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2 mt-auto">
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium text-gray-400">Proficiency</span>
            <span className="text-xs font-bold text-red-400">{skill.level}%</span>
          </div>
          <div
            ref={ref}
            className="w-full bg-gray-800/50 backdrop-blur-sm rounded-full h-2 overflow-hidden border border-white/10"
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
          className="mt-4 text-center text-gray-500 text-xs flex items-center justify-center gap-2"
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

  const tabs = Object.keys(skillData);

  // Filter skills
  const filteredSkills = skillData[tab].filter(skill =>
    skill.name.toLowerCase().includes(search.toLowerCase())
  );

  const tabIcons = {
    frontend: Code2,
    backend: Database,
    tools: Settings
  };

  return (
    <section
      id="skills"
      className="min-h-screen py-24 px-4 relative overflow-hidden bg-black"
    >
      {/* Floating Background Elements - Matching About */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-red-500/20"
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
            <Sparkles className="w-8 h-8 text-red-500" />
            <h1 className="text-5xl lg:text-6xl font-black tracking-tight text-white">
              My <span className="text-red-500">Skills</span>
            </h1>
            <Sparkles className="w-8 h-8 text-red-500" />
          </motion.div>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </motion.div>

        {/* Main Content Card */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl p-8 lg:p-12 relative overflow-hidden">
          {/* Search Bar */}
          <motion.div variants={itemVariant} className="mb-8">
            <div className="relative max-w-md mx-auto bg-black/30 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search skills..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-transparent text-white placeholder-gray-500 focus:outline-none"
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
                  className={`flex items-center gap-3 px-6 py-3 rounded-2xl text-base font-bold tracking-wide transition-all duration-300 backdrop-blur-sm border ${tab === category
                      ? 'bg-red-600 text-white border-red-500 shadow-lg shadow-red-900/30'
                      : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10'
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
                  />
                ))
              ) : (
                <motion.div
                  variants={itemVariant}
                  className="col-span-full text-center py-12"
                >
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-12 max-w-md mx-auto">
                    <Target className="w-16 h-16 text-gray-600 mx-auto mb-4 opacity-50" />
                    <p className="text-gray-400 text-xl mb-4">No skills found matching "{search}"</p>
                    <button
                      onClick={() => setSearch('')}
                      className="px-6 py-3 bg-white/5 text-gray-400 border border-white/10 rounded-xl hover:bg-white/10 transition-all"
                    >
                      Clear Search
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Skills Summary */}
          <motion.div variants={itemVariant} className="mt-16 text-center">
            <div className="inline-flex items-center gap-4 px-6 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
              <Target className="w-5 h-5 text-red-500" />
              <span className="text-gray-400 text-base">
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
          />
        )}
      </AnimatePresence>
    </section>
  );
}