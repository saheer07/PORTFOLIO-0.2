import React, { useState, useRef, useEffect } from 'react';
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaGitAlt,
  FaNodeJs,
} from 'react-icons/fa';
import { SiTailwindcss, SiRedux, SiExpress, SiPython } from 'react-icons/si';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import 'aos/dist/aos.css';
import AOS from 'aos';


// Skill data organized by category
const skillData = {
  frontend: [
    { 
      name: 'HTML', 
      icon: FaHtml5, 
      about: 'HyperText Markup Language (HTML) is the foundational language for creating web pages. It defines the structure and content of a webpage using semantic elements to improve accessibility and SEO, ensuring the page is properly understood by browsers and search engines.', 
      level: 90 
    },
    { 
      name: 'CSS', 
      icon: FaCss3Alt, 
      about: 'Cascading Style Sheets (CSS) is used to style and layout web pages. It controls the visual presentation including colors, fonts, spacing, and animations, making the web pages visually appealing and responsive across different devices.', 
      level: 85 
    },
    { 
      name: 'JavaScript', 
      icon: FaJs, 
      about: 'JavaScript is a versatile programming language that enables interactive features on websites, such as form validation, animations, dynamic content updates, and handling user events, transforming static pages into dynamic web applications.', 
      level: 80 
    },
    { 
      name: 'React', 
      icon: FaReact, 
      about: 'React is a popular JavaScript library for building fast and scalable user interfaces using reusable components. It enables efficient rendering through a virtual DOM, supports state management, and facilitates the creation of complex single-page applications.', 
      level: 75 
    },
    { 
      name: 'Tailwind CSS', 
      icon: SiTailwindcss, 
      about: 'Tailwind CSS is a utility-first CSS framework that allows developers to rapidly build custom designs by composing small, reusable classes. It promotes consistency and speed, enabling responsive and modern designs without writing traditional CSS.', 
      level: 70 
    },
    { 
      name: 'Redux', 
      icon: SiRedux, 
      about: 'Redux is a predictable state management library for JavaScript applications, often used with React. It centralizes application state, making it easier to debug, maintain, and test complex applications by following strict unidirectional data flow principles.', 
      level: 65 
    }
  ],
  backend: [
  {
     name: 'Python', 
      icon: SiPython, 
      about: "Python is a high-level, interpreted, general-purpose programming language known for its simplicity and readability. It supports multiple programming paradigms including procedural, object-oriented, and functional programming. Python's syntax allows developers to express concepts in fewer lines of code, making it ideal for beginners as well as professionals.", 
      level: 60 
  }
  ],
  tools: [
    { name: 'Git', icon: FaGitAlt, about: 'Version control system to manage and track code changes.', level: 80 },
  ],
};

// Single Skill Card component (memoized for performance)
const SkillCard = React.memo(function SkillCard({ skill, flippedCard, setFlippedCard }) {
  const { name, icon: Icon, about, level } = skill;
  const flipped = flippedCard === name;

  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative perspective-1000 cursor-pointer w-full max-w-xs mx-auto"
      onClick={() => setFlippedCard(flipped ? null : name)}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setFlippedCard(flipped ? null : name);
        }
      }}
      tabIndex={0}
      role="button"
      aria-pressed={flipped}
      aria-label={`Skill card for ${name}, press enter or space to flip`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
       data-aos="fade-down"
    >
      <motion.div
        className="relative w-full h-64 rounded-3xl shadow-lg bg-gradient-to-br from-black via-gray-900 to-red-900 text-white select-none"
        animate={{ rotateY: flipped ? 180 : 0 }}
        whileHover={{
          scale: 1.05,
          boxShadow: '0 0 20px rgba(220, 38, 38, 0.8)',
          transition: { type: 'spring', stiffness: 300, damping: 20 },
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front Side */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center p-6"
          style={{ backfaceVisibility: 'hidden' }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 200 }}
          title={name}
        >
          <motion.div
            className="text-red-500 mb-5 text-6xl"
            whileHover={{ y: [-5, 0, -5], transition: { repeat: Infinity, duration: 2 } }}
          >
            <Icon />
          </motion.div>
          <h3 className="text-2xl font-bold mb-3">{name}</h3>

          {/* Skill Progress Bar */}
          <div
            ref={ref}
            className="w-full bg-gray-800 rounded-full h-5 overflow-hidden relative"
            style={{ boxShadow: 'inset 0 0 5px #b91c1c' }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: inView ? `${level}%` : 0 }}
              transition={{ duration: 1.8, ease: 'easeOut' }}
              className="h-full rounded-full bg-gradient-to-r from-red-700 via-red-500 to-red-700"
              style={{
                boxShadow: '0 0 8px rgba(220, 38, 38, 0.7)',
                filter: 'drop-shadow(0 0 3px rgba(255, 0, 0, 0.9))',
              }}
            />
            <motion.span
              className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-semibold text-white"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: inView ? 1 : 0, x: 0 }}
              transition={{ delay: 1.8 }}
            >
              {level}%
            </motion.span>
          </div>
        </motion.div>

        {/* Back Side */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center p-6 bg-gray-900 rounded-3xl text-center text-gray-300 text-sm"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <p>{about}</p>
        </motion.div>
      </motion.div>

      {/* Tooltip removed, no popup on hover */}
    </motion.div>
  );
});

// Main Skills component
export default function Skills() {
  const [tab, setTab] = useState('frontend');
  const [search, setSearch] = useState('');
  const [flippedCard, setFlippedCard] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const tabs = Object.keys(skillData);

  // Filter skills by search query (case-insensitive)
  let filteredSkills;
  if (showAll) {
    filteredSkills = tabs
      .flatMap(category => skillData[category])
      .filter(skill => skill.name.toLowerCase().includes(search.toLowerCase()));
  } else {
    filteredSkills = skillData[tab].filter(skill =>
      skill.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Underline style for active tab
  const [underlineStyle, setUnderlineStyle] = useState({});
  const tabRefs = useRef({});

  useEffect(() => {
    if (showAll) {
      setUnderlineStyle({ width: 0, left: 0 });
      return;
    }
    const currentRef = tabRefs.current[tab];
    if (currentRef) {
      setUnderlineStyle({
        width: currentRef.offsetWidth,
        left: currentRef.offsetLeft,
      });
    }
    function handleResize() {
      const currentRef = tabRefs.current[tab];
      if (currentRef) {
        setUnderlineStyle({
          width: currentRef.offsetWidth,
          left: currentRef.offsetLeft,
        });
      }
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [tab, showAll]);

  // Animation variants for tab content grid
  const tabVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
    exit: { opacity: 0, y: -20 },
  };
   useEffect(() => {
      AOS.init({
        duration: 1200,
        easing: 'ease-in-out',
        once: true,
      });
    }, []);

  return (
    <section
      id="skills"
      className="min-h-screen py-20 px-6 bg-gray-950 text-white relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <h1
        className="text-5xl font-extrabold text-red-600 text-center mb-16 tracking-wide drop-shadow-[0_0_15px_rgba(255,0,0,0.7)]"
        data-aos="fade-down"
      >
        Skills
      </h1>

        {/* Show All Toggle */}
        <div className="mb-8 flex justify-center gap-4 flex-wrap"  data-aos="fade-down"> 
          {!showAll ? (
            <button
              onClick={() => {
                setShowAll(true);
                setFlippedCard(null);
              }}
              className="px-6 py-3 rounded-full bg-red-600 hover:bg-red-700 transition-colors text-white font-semibold"
              aria-pressed={showAll}
            >
              Show All Skills
            </button>
          ) : (
            <button
              onClick={() => {
                setShowAll(false);
                setFlippedCard(null);
              }}
              className="px-6 py-3 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors text-white font-semibold"
              aria-pressed={showAll}
            >
              Show Categories
            </button>
          )}
        </div>

        {/* Tabs */}
        <div className="relative flex justify-center gap-8 mb-10 flex-wrap"  data-aos="fade-down">
          {tabs.map(category => (
            <button
              key={category}
              ref={el => (tabRefs.current[category] = el)}
              onClick={() => {
                setTab(category);
                setFlippedCard(null);
              }}
              className={`relative px-7 py-2 rounded-full text-lg font-semibold tracking-wider transition-all duration-300
                ${
                  tab === category
                    ? 'bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white shadow-lg shadow-red-700/60'
                    : 'bg-gray-800 text-gray-400 hover:bg-red-600 hover:text-white hover:shadow-md hover:shadow-red-500/40'
                }
                focus:outline-none focus:ring-4 focus:ring-red-600 focus:ring-opacity-50`}
              id={`tab-${category}`}
              role="tab"
              aria-selected={tab === category}
              tabIndex={tab === category ? 0 : -1}
              aria-controls={`panel-${category}`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={(showAll ? 'all-' : tab) + search}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={tabVariants}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10"
            role="tabpanel"
            id={`panel-${tab}`}
            aria-labelledby={`tab-${tab}`}
          >
            {filteredSkills.length > 0 ? (
              filteredSkills.map(skill => (
                <SkillCard
                  key={skill.name}
                  skill={skill}
                  flippedCard={flippedCard}
                  setFlippedCard={setFlippedCard}
                />
              ))
            ) : (
              <p className="text-gray-400 col-span-full text-xl">No skills found.</p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
