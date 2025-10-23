import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaGithub, FaCheckSquare, FaExternalLinkAlt } from 'react-icons/fa';
import { SiReact, SiRedux, SiTailwindcss, SiFramer } from 'react-icons/si';
import { Sparkles, Code2, Rocket, X, ZoomIn, ArrowUpRight } from 'lucide-react';
import todoImage from '../assets/todo.png';
import pageImage from '../assets/page.png';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Projects() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const projects = [
    {
      title: 'Todo App',
      image: todoImage,
      icon: <FaCheckSquare className="text-red-500 text-4xl" />,
      description:
        'A simple todo list app built with React and Redux. It allows users to add, edit, delete, and mark tasks as completed.',
      tech: [
        { name: 'React', icon: <SiReact /> },
        { name: 'Redux', icon: <SiRedux /> },
        { name: 'CSS', icon: null },
      ],
      github: 'https://github.com/saheer07/Todo-List-',
      demo: 'https://todo-list-gamma-weld-13.vercel.app/',
      tag: 'Web App',
      gradient: 'from-red-500 to-pink-600',
      accentColor: 'red',
    },
    {
      title: 'Registration Page',
      image: pageImage,
      icon: <FaUser className="text-blue-500 text-4xl" />,
      description:
        'A responsive and animated portfolio site to showcase my skills, experience, and projects.',
      tech: [
        { name: 'React', icon: <SiReact /> },
        { name: 'Tailwind CSS', icon: <SiTailwindcss /> },
        { name: 'Framer Motion', icon: <SiFramer /> },
      ],
      github: 'https://github.com/saheer07/registration-page',
      demo: 'https://registration-page-green-seven.vercel.app/',
      tag: 'UI/UX',
      gradient: 'from-blue-500 to-purple-600',
      accentColor: 'blue',
    },
  ];

  const openModal = (img) => {
    setModalImage(img);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalImage('');
  };

  useEffect(() => {
    AOS.init({
      duration: 1200,
      easing: 'ease-in-out',
      once: true,
    });

    // Theme detection
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.body.classList.contains('bg-slate-900'));
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

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
  };

  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        when: "beforeChildren",
        staggerChildren: 0.2,
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
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  return (
    <section
      id="projects"
      className={`min-h-screen py-24 px-4 relative overflow-hidden ${themeClasses.bg}`}
    >
      {/* Floating Background Elements - Same as About */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 rounded-full ${
              isDarkMode ? 'bg-cyan-400/20' : 'bg-blue-400/20'
            }`}
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
              ease: "easeInOut",
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
        {/* Header - Same style as About */}
        <motion.div variants={itemVariant} className="text-center mb-16">
          <motion.div className="inline-flex items-center gap-3 mb-6">
            <Sparkles className={`w-8 h-8 ${themeClasses.accent}`} />
            <h1
              className={`text-5xl lg:text-6xl font-black tracking-tight ${themeClasses.text}`}
            >
              My <span className={themeClasses.accent}>Projects</span>
            </h1>
            <Sparkles className={`w-8 h-8 ${themeClasses.accent}`} />
          </motion.div>
          <p className={`text-xl ${themeClasses.textMuted} max-w-2xl mx-auto`}>
            Transforming ideas into interactive experiences with clean code and modern design
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariant}
          className="grid md:grid-cols-2 gap-8 lg:gap-12"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariant}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="group relative"
            >
              {/* Glow effect */}
              <motion.div
                className={`absolute -inset-1 bg-gradient-to-r ${project.gradient} rounded-3xl opacity-0 blur-xl transition-opacity duration-500 ${
                  hoveredIndex === index ? 'opacity-30' : ''
                }`}
              />

              {/* Main Card - Matching About section style */}
              <div className={`relative backdrop-blur-xl ${themeClasses.card} border rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 ${
                hoveredIndex === index ? 'transform -translate-y-2' : ''
              }`}>
                {/* Image Container */}
                <div className="relative overflow-hidden group/image">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-64 object-cover transition-transform duration-700"
                    style={{
                      transform: hoveredIndex === index ? 'scale(1.1)' : 'scale(1)',
                    }}
                  />
                  
                  {/* Image Overlay */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-t ${
                      isDarkMode ? 'from-black/80 via-black/40 to-transparent' : 'from-gray-900/80 via-gray-900/40 to-transparent'
                    }`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredIndex === index ? 1 : 0.3 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Zoom Icon */}
                  <motion.button
                    onClick={() => openModal(project.image)}
                    className={`absolute top-4 right-4 p-3 ${themeClasses.card} backdrop-blur-xl border rounded-full opacity-0 group-hover/image:opacity-100 transition-opacity`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ZoomIn className={`w-5 h-5 ${themeClasses.accent}`} />
                  </motion.button>

                  {/* Tag */}
                  <div className="absolute bottom-4 left-4">
                    <span className={`px-4 py-2 bg-gradient-to-r ${project.gradient} text-white text-sm font-bold rounded-full backdrop-blur-sm`}>
                      {project.tag}
                    </span>
                  </div>

                  {/* Project Icon */}
                  <motion.div
                    className="absolute top-4 left-4"
                    animate={{
                      rotate: hoveredIndex === index ? [0, -10, 10, -10, 0] : 0,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className={`p-3 ${themeClasses.card} backdrop-blur-xl border rounded-2xl`}>
                      {project.icon}
                    </div>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className={`text-2xl font-bold ${themeClasses.text}`}>
                      {project.title}
                    </h3>
                    <motion.div
                      animate={{ rotate: hoveredIndex === index ? 45 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ArrowUpRight className={`w-6 h-6 ${themeClasses.accent}`} />
                    </motion.div>
                  </div>

                  <p className={`${themeClasses.textMuted} text-base leading-relaxed mb-6`}>
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech, idx) => (
                      <motion.span
                        key={idx}
                        className={`flex items-center gap-2 px-3 py-2 ${themeClasses.card} backdrop-blur-sm border rounded-xl text-sm font-medium ${themeClasses.text}`}
                        whileHover={{ scale: 1.05, y: -2 }}
                      >
                        {tech.icon && <span className={themeClasses.accent}>{tech.icon}</span>}
                        {tech.name}
                      </motion.span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-4">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 px-5 py-3 ${themeClasses.card} backdrop-blur-sm border rounded-xl text-sm font-semibold ${themeClasses.text} transition-all`}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FaGithub className="w-4 h-4" />
                      Code
                    </motion.a>
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 px-5 py-3 bg-gradient-to-r ${project.gradient} text-white rounded-xl text-sm font-semibold transition-all shadow-lg`}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FaExternalLinkAlt className="w-4 h-4" />
                      Live Demo
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          variants={itemVariant}
          className="text-center mt-16"
        >
          <div className={`inline-flex items-center gap-4 px-6 py-4 ${themeClasses.card} backdrop-blur-xl border rounded-2xl`}>
            <Code2 className={`w-5 h-5 ${themeClasses.accent}`} />
            <span className={`${themeClasses.textMuted} text-base`}>
              {projects.length} projects built with passion and precision
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Enhanced Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center z-50 p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className="relative max-w-6xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={modalImage}
                alt="Full project"
                className="w-full rounded-2xl shadow-2xl"
              />
              <motion.button
                onClick={closeModal}
                className="absolute -top-4 -right-4 p-3 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-6 h-6" />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Projects;