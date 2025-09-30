import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaPython, FaReact, FaJs, FaGithub, FaLinkedin, FaDownload, FaCode, FaRocket, FaHeart } from "react-icons/fa";
import { SiDjango, SiPostgresql, SiMongodb } from "react-icons/si";
import { ChevronDown, Sparkles, Zap, Coffee, MousePointer } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import saheerimg from "../assets/saheer.png";

// Enhanced Framer Motion Variants
const containerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
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
      ease: [0.6, -0.05, 0.01, 0.99] 
    },
  },
};

const floatingVariant = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const sparkleVariant = {
  animate: {
    scale: [1, 1.2, 1],
    opacity: [0.5, 1, 0.5],
    rotate: [0, 180, 360],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const pulseVariant = {
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

function Home() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isTyping, setIsTyping] = useState(true);

  const techStack = [
    { icon: FaPython, name: "Python", color: "from-yellow-400 to-blue-500" },
    { icon: FaReact, name: "React", color: "from-blue-400 to-cyan-500" },
    { icon: SiDjango, name: "Django", color: "from-green-500 to-green-600" },
    { icon: FaJs, name: "JavaScript", color: "from-yellow-300 to-yellow-500" },
    { icon: SiPostgresql, name: "PostgreSQL", color: "from-blue-600 to-blue-700" },
   
  ];

  // Mouse tracking for interactive elements
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Theme detection from body class
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.body.classList.contains('bg-slate-900'));
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // AOS initialization
  useEffect(() => {
    AOS.init({
      duration: 1200,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  // Typing effect
  useEffect(() => {
    const timer = setInterval(() => {
      setIsTyping(prev => !prev);
    }, 2000);
    return () => clearInterval(timer);
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
    button: isDarkMode 
      ? 'bg-gradient-to-r from-cyan-500 to-blue-600' 
      : 'bg-gradient-to-r from-blue-500 to-purple-600',
    buttonSecondary: isDarkMode 
      ? 'border-cyan-400/50 text-cyan-300 hover:bg-cyan-500/10' 
      : 'border-blue-500/50 text-blue-600 hover:bg-blue-500/10',
  };

  return (
    <section className={`min-h-screen py-24 px-4 relative overflow-hidden ${themeClasses.bg}`}id="home">
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
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Gradient Orbs */}
        <motion.div 
          className={`absolute top-20 right-20 w-96 h-96 rounded-full opacity-10 blur-3xl ${
            isDarkMode ? 'bg-gradient-to-r from-cyan-400 to-blue-500' : 'bg-gradient-to-r from-blue-400 to-purple-500'
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
        <motion.div 
          className={`absolute bottom-20 left-20 w-80 h-80 rounded-full opacity-10 blur-3xl ${
            isDarkMode ? 'bg-gradient-to-r from-purple-400 to-pink-500' : 'bg-gradient-to-r from-pink-400 to-orange-500'
          }`}
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Interactive Cursor Effect */}
      <motion.div
        className={`fixed pointer-events-none z-30 w-8 h-8 rounded-full mix-blend-difference ${
          isDarkMode ? 'bg-cyan-300/30' : 'bg-blue-500/30'
        }`}
        style={{
          left: mousePosition.x - 16,
          top: mousePosition.y - 16,
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 0.3,
          ease: "easeOut"
        }}
      />

      <motion.div
        variants={containerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="min-h-[90vh] max-w-7xl mx-auto relative z-10"
        data-aos="fade-up"
      >
        <div className={`backdrop-blur-xl ${themeClasses.card} border rounded-3xl shadow-2xl p-8 lg:p-16 relative overflow-hidden`}>
          {/* Decorative Elements */}
          <motion.div
            variants={sparkleVariant}
            animate="animate"
            className="absolute top-6 right-6"
          >
            <Sparkles className={`w-6 h-6 ${themeClasses.accent}`} />
          </motion.div>
          <motion.div
            variants={sparkleVariant}
            animate="animate"
            className="absolute bottom-6 left-6"
            style={{ animationDelay: '1s' }}
          >
            <Zap className={`w-5 h-5 ${themeClasses.accent}`} />
          </motion.div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
            {/* Enhanced Image Section */}
            <motion.div
              variants={itemVariant}
              className="w-full lg:w-1/2 flex justify-center lg:justify-start"
            >
              <div className="relative group">
                {/* Glowing Ring Effect */}
                <motion.div
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className={`absolute -inset-4 rounded-3xl opacity-20 blur-lg ${
                    isDarkMode ? 'bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600' : 'bg-gradient-to-r from-blue-400 via-purple-500 to-pink-600'
                  }`}
                />
                
                {/* Image Container */}
                <motion.div
                  variants={floatingVariant}
                  animate="animate"
                  className="relative"
                >
                  <img
                    src={saheerimg}
                    alt="Saheer - Python Full Stack Developer"
                    className={`w-full max-w-md sm:max-w-lg lg:max-w-xl h-96 rounded-3xl object-cover border-2 ${
                      isDarkMode ? 'border-cyan-400/30' : 'border-blue-400/30'
                    } shadow-2xl group-hover:scale-105 transition-all duration-700 ease-out`}
                  />
                  
                  {/* Status Badge */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1, type: "spring" }}
                    className={`absolute -bottom-4 -right-4 px-4 py-2 ${themeClasses.card} backdrop-blur-xl border rounded-2xl flex items-center gap-2 shadow-xl`}
                  >
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                      className="w-3 h-3 bg-green-500 rounded-full"
                    />
                    <span className={`text-sm font-medium ${themeClasses.text}`}>Available for work</span>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>

            {/* Enhanced Text Section */}
            <motion.div
              variants={itemVariant}
              className="w-full lg:w-1/2 text-center lg:text-left space-y-8 max-w-2xl"
            >
              {/* Greeting */}
              <motion.div
                variants={itemVariant}
                className="space-y-2"
              >
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className={`text-lg font-medium ${themeClasses.textMuted} flex items-center justify-center lg:justify-start gap-2`}
                >
                  <Coffee className="w-5 h-5" />
                  Hello, I'm
                </motion.p>
                
                <motion.h1
                  variants={itemVariant}
                  className={`text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-tight ${themeClasses.text}`}
                >
                  <span className={themeClasses.accent}>Saheer</span>
                  <motion.span
                    animate={{ opacity: isTyping ? 1 : 0 }}
                    className={themeClasses.accent}
                  >
                    |
                  </motion.span>
                </motion.h1>
              </motion.div>

              {/* Enhanced Role */}
              <motion.div
                variants={itemVariant}
                className="space-y-4"
              >
                <motion.div
                  className={`inline-flex items-center gap-3 px-6 py-3 ${themeClasses.card} backdrop-blur-sm border rounded-2xl ${themeClasses.text}`}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <FaPython className="text-2xl text-yellow-500" />
                  <span className="text-xl font-bold">Full Stack Developer</span>
                  <FaReact className="text-2xl text-blue-400" />
                </motion.div>

                <motion.p
                  variants={itemVariant}
                  className={`text-lg leading-relaxed ${themeClasses.textMuted} max-w-xl`}
                >
                  Crafting exceptional digital experiences with{' '}
                  <span className={`font-semibold ${themeClasses.accent}`}>Python</span> and{' '}
                  <span className={`font-semibold ${themeClasses.accent}`}>React</span>. 
                  Passionate about building scalable applications that make a difference.
                </motion.p>
              </motion.div>

              {/* Tech Stack Pills */}
              <motion.div
                variants={itemVariant}
                className="flex flex-wrap justify-center lg:justify-start gap-3"
              >
                {techStack.map(({ icon: Icon, name, color }, index) => (
                  <motion.div
                    key={name}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + index * 0.1 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className={`flex items-center gap-2 px-4 py-2 ${themeClasses.card} backdrop-blur-sm border rounded-xl cursor-pointer group`}
                  >
                    <div className={`p-1 rounded-lg bg-gradient-to-r ${color}`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <span className={`text-sm font-medium ${themeClasses.text} group-hover:${themeClasses.accent} transition-colors`}>
                      {name}
                    </span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Enhanced CTA Buttons */}
              <motion.div
                variants={itemVariant}
                className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-6"
              >
                <motion.a
                  href="#projects"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`inline-flex items-center gap-2 ${themeClasses.button} text-white px-8 py-4 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 text-center group`}
                >
                  <FaRocket className="group-hover:translate-y-[-2px] transition-transform" />
                  Explore Projects
                  <ChevronDown className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.a>

                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`inline-flex items-center gap-2 border-2 ${themeClasses.buttonSecondary} backdrop-blur-sm px-8 py-4 rounded-2xl font-bold shadow-lg transition-all duration-300 text-center group`}
                >
                  <MousePointer className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  Let's Connect
                </motion.a>
              </motion.div>

              {/* Social Links */}
              <motion.div
                variants={itemVariant}
                className="flex justify-center lg:justify-start gap-4 pt-4"
              >
                {[
                  { icon: FaGithub, href: "https://github.com/saheer07", label: "GitHub" },
                  { icon: FaLinkedin, href: "https://www.linkedin.com/in/saheer-chungath-23b44434a", label: "LinkedIn" },
                ].map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-3 ${themeClasses.card} backdrop-blur-sm border rounded-xl ${themeClasses.text} hover:${themeClasses.accent} transition-all duration-300 group`}
                    aria-label={label}
                  >
                    <Icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Bottom Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center gap-2"
            >
              <span className={`text-sm ${themeClasses.textMuted}`}>Scroll to explore</span>
              <ChevronDown className={`w-5 h-5 ${themeClasses.accent}`} />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

export default Home;