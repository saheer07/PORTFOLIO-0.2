import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Code2,
  Database,
  Settings,
  Target,
  Search,
  X,
  BookOpen,
  Award,
  TrendingUp,
  Cpu
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

// Skill data
const skillData = {
  frontend: [
    {
      name: 'HTML',
      logo: SiHtml5,
      iconColor: 'text-[#e74c3c]',
      about: 'HyperText Markup Language (HTML) is the foundational language for creating web pages. It defines the structure and content of a webpage using semantic elements to improve accessibility and SEO, ensuring the page is properly understood by browsers and search engines.',
      level: 90,
      experience: '8+ months',
      projects: 5,
      category: 'Markup Language'
    },
    {
      name: 'CSS',
      logo: SiCss3,
      iconColor: 'text-[#e74c3c]',
      about: 'Cascading Style Sheets (CSS) is used to style and layout web pages. It controls the visual presentation including colors, fonts, spacing, and animations, making the web pages visually appealing and responsive across different devices.',
      level: 85,
      experience: '8+ months',
      projects: 3,
      category: 'Styling'
    },
    {
      name: 'JavaScript',
      logo: SiJavascript,
      iconColor: 'text-[#e74c3c]',
      about: 'JavaScript is a versatile programming language that enables interactive features on websites, such as form validation, animations, dynamic content updates, and handling user events, transforming static pages into dynamic web applications.',
      level: 80,
      experience: '7+ months',
      projects: 6,
      category: 'Programming'
    },
    {
      name: 'React',
      logo: SiReact,
      iconColor: 'text-[#e74c3c]',
      about: 'React is a popular JavaScript library for building fast and scalable user interfaces using reusable components. It enables efficient rendering through a virtual DOM, supports state management, and facilitates the creation of complex single-page applications.',
      level: 75,
      experience: '7+ months',
      projects: 5,
      category: 'Library'
    },
    {
      name: 'Tailwind CSS',
      logo: SiTailwindcss,
      iconColor: 'text-[#e74c3c]',
      about: 'Tailwind CSS is a utility-first CSS framework that allows developers to rapidly build custom designs by composing small, reusable classes. It promotes consistency and speed, enabling responsive and modern designs without writing traditional CSS.',
      level: 70,
      experience: '6+ months',
      projects: 4,
      category: 'Framework'
    },
    {
      name: 'Redux',
      logo: SiRedux,
      iconColor: 'text-[#e74c3c]',
      about: 'Redux is a predictable state management library for JavaScript applications, often used with React. It centralizes application state, making it easier to debug, maintain, and test complex applications by following strict unidirectional data flow principles.',
      level: 65,
      experience: '5+ months',
      projects: 3,
      category: 'State Management'
    }
  ],

  backend: [
    {
      name: 'Python',
      logo: SiPython,
      iconColor: 'text-[#e74c3c]',
      about: "Python is a high-level, interpreted, general-purpose programming language known for its simplicity and readability. It supports multiple programming paradigms including procedural, object-oriented, and functional programming.",
      level: 85,
      experience: '3+ months',
      projects: 3,
      category: 'Programming'
    },
    {
      name: 'Django',
      logo: SiDjango,
      iconColor: 'text-[#e74c3c]',
      about: "Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design. It follows the model-template-views architectural pattern and includes an ORM for database operations.",
      level: 80,
      experience: '3+ months',
      projects: 1,
      category: 'Framework'
    },
    {
      name: 'SQL',
      logo: SiMysql,
      iconColor: 'text-[#e74c3c]',
      about: "Structured Query Language (SQL) is used to communicate with relational databases. It allows performing queries, updates, inserts, and management of data effectively.",
      level: 75,
      experience: '3+ months',
      projects: 3,
      category: 'Database Query'
    },
    {
      name: 'PostgreSQL',
      logo: SiPostgresql,
      iconColor: 'text-[#e74c3c]',
      about: "PostgreSQL is a powerful, open-source relational database system with advanced features like JSON support, indexing, transactions, and strong SQL compliance.",
      level: 70,
      experience: '2+ months',
      projects: 3,
      category: 'Database'
    },
    {
      name: 'Django REST',
      logo: SiDjango,
      iconColor: 'text-[#e74c3c]',
      about: "Django REST Framework is a toolkit for building Web APIs. It provides features like serialization, authentication, permissions, and browsable APIs, making it easy to build RESTful services.",
      level: 60,
      experience: '1+ month',
      projects: 2,
      category: 'API Framework'
    }
  ],

  tools: [
    {
      name: 'Git',
      logo: SiGit,
      iconColor: 'text-[#e74c3c]',
      about: 'Git is a distributed version control system that tracks changes in source code during software development. It enables collaboration, branching, merging, and maintaining a complete history of project changes.',
      level: 80,
      experience: '7+ months',
      projects: 8,
      category: 'Version Control'
    },
    {
      name: 'VS Code',
      logo: Code2,
      iconColor: 'text-[#e74c3c]',
      about: 'Visual Studio Code is a lightweight but powerful source code editor with built-in support for debugging, task running, version control, and extensive customization through extensions.',
      level: 90,
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

// Modal Component (HUD Alert Style)
const SkillModal = ({ skill, onClose }) => {
  const LogoComponent = skill.logo;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-[#050505]/95 backdrop-blur-sm flex items-center justify-center z-50 p-4 font-['Orbitron']"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: 'spring', damping: 25 }}
        className="relative max-w-2xl w-full bg-black border border-[#e74c3c] p-1 shadow-[0_0_50px_rgba(231,76,60,0.3)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-[#e74c3c]" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-[#e74c3c]" />

        <div className="bg-[#0a0a0a] border border-[#e74c3c]/20 p-8 relative overflow-hidden">
          {/* Close Button */}
          <motion.button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-[#e74c3c] hover:bg-[#e74c3c]/20 border border-transparent hover:border-[#e74c3c] transition-colors z-10"
            whileTap={{ scale: 0.95 }}
          >
            <X className="w-5 h-5" />
          </motion.button>

          {/* Alert Header */}
          <div className="text-[#e74c3c] text-[10px] tracking-[0.3em] uppercase mb-6 border-b border-[#e74c3c]/30 pb-2 flex items-center gap-2">
            <Cpu className="w-4 h-4" />
            SYSTEM DIAGNOSTICS: COMPONENT_SPECS
          </div>

          <div className="relative space-y-6">
            {/* Header with Logo */}
            <div className="flex items-center gap-6">
              <div
                className="relative p-6 bg-[#e74c3c]/5 border border-[#e74c3c]/30"
              >
                <LogoComponent className={`${skill.iconColor} w-16 h-16 relative z-10`} />
              </div>

              <div className="flex-1">
                <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-3xl font-black text-white mb-2 uppercase tracking-wider"
                >
                  {skill.name}
                </motion.h2>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-block px-3 py-1 bg-[#e74c3c]/10 border border-[#e74c3c] border-dashed"
                >
                  <span className="text-xs font-bold text-[#e74c3c] tracking-widest uppercase">
                    TYPE: {skill.category}
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
              <div className="bg-[#111] border border-[#e74c3c]/20 p-4 relative group">
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#e74c3c]/50" />
                <TrendingUp className="w-5 h-5 text-[#e74c3c] mb-2" />
                <div className="text-xl font-bold text-white tracking-widest">{skill.level}%</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest">Efficiency</div>
              </div>
              <div className="bg-[#111] border border-[#e74c3c]/20 p-4 relative group">
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#e74c3c]/50" />
                <BookOpen className="w-5 h-5 text-[#e74c3c] mb-2" />
                <div className="text-xl font-bold text-white tracking-widest">{skill.experience}</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest">Uptime</div>
              </div>
              <div className="bg-[#111] border border-[#e74c3c]/20 p-4 relative group">
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#e74c3c]/50" />
                <Award className="w-5 h-5 text-[#e74c3c] mb-2" />
                <div className="text-xl font-bold text-white tracking-widest">{skill.projects}</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest">Deployments</div>
              </div>
            </motion.div>

            {/* Progress Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-2 border border-[#e74c3c]/20 p-4 bg-[#111]"
            >
              <div className="flex justify-between items-center text-xs tracking-widest uppercase">
                <span className="font-bold text-gray-400">Power Output</span>
                <span className="font-bold text-[#e74c3c]">{skill.level}%</span>
              </div>
              <div className="w-full bg-[#050505] h-3 border border-[#e74c3c]/30 flex p-[1px]">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1.5, ease: 'easeOut', delay: 0.5 }}
                  className="h-full bg-[#e74c3c]"
                />
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-[#111] border border-[#e74c3c]/20 p-6"
            >
              <h3 className="text-xs tracking-[0.2em] font-bold text-[#e74c3c] uppercase mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-[#e74c3c]" />
                Technical Details
              </h3>
              <p className="text-gray-300 font-sans text-sm leading-relaxed">
                <span className="font-['Orbitron'] font-bold text-[#e74c3c]">{'>> '}</span>
                {skill.about}
              </p>
            </motion.div>
          </div>
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
      className="relative cursor-pointer w-full mx-auto group h-full focus:outline-none"
      onClick={onClick}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick();
        }
      }}
    >
      <div className="relative bg-[#0a0a0a] border border-[#e74c3c]/30 p-6 flex flex-col hover:border-[#e74c3c] hover:bg-[#111] transition-colors font-['Orbitron'] h-full shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]">
        {/* Corner Marks */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#e74c3c]" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#e74c3c]" />

        {/* Scanning Effect on Hover */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-full h-full bg-[linear-gradient(rgba(231,76,60,0.05)_1px,transparent_1px)] bg-[size:100%_4px]" />
        </div>

        {/* Logo and Name */}
        <div className="flex items-center gap-4 mb-6 relative z-10">
          <div
            className="relative p-3 bg-black border border-[#e74c3c]/50"
          >
            <LogoComponent className={`${skill.iconColor} w-8 h-8 relative z-10`} />
          </div>

          <div className="flex-1">
            <h3 className="text-lg font-black tracking-widest text-white uppercase">{skill.name}</h3>
            <p className="text-[9px] tracking-[0.2em] text-[#e74c3c] uppercase">{skill.category}</p>
          </div>
        </div>

        {/* Mini Stats Grid */}
        <div className="grid grid-cols-2 gap-2 mb-4 relative z-10">
          <div className="bg-black border border-[#e74c3c]/20 p-2 relative text-right">
            <div className="text-xs font-bold text-white tracking-widest">{skill.experience}</div>
            <div className="text-[8px] tracking-[0.2em] text-gray-500 uppercase">Uptime</div>
          </div>
          <div className="bg-black border border-[#e74c3c]/20 p-2 relative text-right">
            <div className="text-xs font-bold text-white tracking-widest">{skill.projects}</div>
            <div className="text-[8px] tracking-[0.2em] text-gray-500 uppercase">Missions</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2 mt-auto relative z-10 flex-1 flex flex-col justify-end">
          <div className="flex justify-between items-center bg-[#e74c3c]/10 border border-[#e74c3c]/20 px-2 py-1">
            <span className="text-[9px] font-bold text-gray-400 tracking-[0.2em] uppercase">PWR Output</span>
            <span className="text-[9px] font-bold text-[#e74c3c]">{skill.level}%</span>
          </div>
        </div>

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
      className="min-h-screen py-24 px-4 relative flex items-center bg-black/50"
    >
      <motion.div
        variants={containerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-7xl mx-auto relative z-10 w-full"
      >
        {/* Header - Matching Pilot Specs / Mission Logs */}
        <motion.div variants={itemVariant} className="mb-12 font-['Orbitron'] flex flex-col items-start border-l-4 border-[#e74c3c] pl-6 ml-4">
          <h1 className="text-4xl lg:text-5xl font-black tracking-widest text-white uppercase shadow-sm">
            System <span className="text-[#e74c3c]">Diagnostics</span>
          </h1>
          <p className="text-sm text-[#e74c3c] tracking-[0.3em] uppercase mt-2">
            Authorized Modules & Technology Stack
          </p>
        </motion.div>

        {/* Main Content Area */}
        <div className="relative font-['Orbitron']">
          <div className="grid lg:grid-cols-4 gap-8">
            
            {/* Sidebar Controls */}
            <motion.div variants={itemVariant} className="lg:col-span-1 border border-[#e74c3c]/30 bg-[#050505]/80 backdrop-blur-sm p-6 h-fit relative">
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#e74c3c]" />
              
              <div className="text-[10px] text-[#e74c3c] tracking-[0.2em] font-bold uppercase mb-4 border-b border-[#e74c3c]/30 pb-2">
                FILTER_MODULES
              </div>
              
              {/* Search Bar */}
              <div className="relative mb-8">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#e74c3c]" />
                <input
                  type="text"
                  placeholder="QUERY_DB..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 bg-black border border-[#e74c3c]/50 text-white text-xs tracking-widest uppercase placeholder-[#e74c3c]/50 focus:outline-none focus:border-[#e74c3c] transition-colors"
                />
              </div>

              <div className="text-[10px] text-[#e74c3c] tracking-[0.2em] font-bold uppercase mb-4 border-b border-[#e74c3c]/30 pb-2">
                SELECT_SUBSYSTEM
              </div>

              {/* Tabs vertically aligned */}
              <div className="flex flex-col gap-2">
                {tabs.map(category => {
                  const TabIcon = tabIcons[category];
                  return (
                    <motion.button
                      key={category}
                      onClick={() => {
                        setTab(category);
                        setSearch('');
                      }}
                      whileHover={{ x: 5 }}
                      className={`flex items-center gap-3 px-4 py-3 text-xs tracking-[0.2em] font-bold uppercase transition-all duration-300 border ${tab === category
                          ? 'bg-[#e74c3c]/20 text-white border-[#e74c3c] border-l-4'
                          : 'bg-black text-gray-500 border-[#e74c3c]/20 hover:border-[#e74c3c]/50 hover:text-white'
                        }`}
                    >
                      <TabIcon className="w-4 h-4" />
                      <span>{category}</span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>

            {/* Grid Area */}
            <motion.div variants={itemVariant} className="lg:col-span-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={tab}
                  variants={containerVariant}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
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
                      className="col-span-full border border-[#e74c3c]/30 bg-[#050505]/80 p-12 text-center"
                    >
                      <Target className="w-12 h-12 text-[#e74c3c]/50 mx-auto mb-4" />
                      <p className="text-[#e74c3c] text-xs font-bold tracking-[0.2em] uppercase mb-6">Error: Component "{search}" not found in database.</p>
                      <button
                        onClick={() => setSearch('')}
                        className="px-6 py-2 bg-black text-[#e74c3c] border border-[#e74c3c] hover:bg-[#e74c3c]/20 transition-all text-xs tracking-[0.2em] font-bold uppercase"
                      >
                        RESET_QUERY
                      </button>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.div>

          </div>
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