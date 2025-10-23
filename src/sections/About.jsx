import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaDownload, 
  FaCode, 
  FaLaptopCode, 
  FaRocket, 
  FaHeart,
  FaGithub,
  FaLinkedin 
} from "react-icons/fa";

import { 
  MapPin, 
  Calendar, 
  Coffee, 
  Sparkles, 
  Zap, 
  Target,
  Award,
  BookOpen,
  Users,
  Rocket
} from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Enhanced Animation Variants
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
      ease: [0.6, -0.05, 0.01, 0.99] 
    },
  },
};

const floatingVariant = {
  animate: {
    y: [0, -15, 0],
    rotate: [0, 5, -5, 0],
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
    opacity: [0.8, 1, 0.8],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

function About() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const stats = [
    { icon: BookOpen, label: "Months Learning", value: "7+" },
    { icon: FaCode, label: "Projects Completed", value: "5+" },
    { icon: Coffee, label: "Cups of Coffee", value: "100+" },
    { icon: Target, label: "Skills Mastered", value: "8+" },
  ];

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Theme detection
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
  };

  return (
    <section
      id="about"
      className={`min-h-screen py-24 px-4 relative overflow-hidden ${themeClasses.bg}`}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Particles */}
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

        {/* Gradient Orbs */}
        <motion.div 
          className={`absolute top-32 right-32 w-80 h-80 rounded-full opacity-10 blur-3xl ${
            isDarkMode ? 'bg-gradient-to-r from-cyan-400 to-purple-500' : 'bg-gradient-to-r from-blue-400 to-pink-500'
          }`}
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 25,
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
        data-aos="fade-up"
      >
        {/* Section Header */}
        <motion.div
          variants={itemVariant}
          className="text-center mb-16"
          data-aos="fade-down"
        >
          <motion.div
            className="inline-flex items-center gap-3 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className={`w-8 h-8 ${themeClasses.accent}`} />
            <h1 className={`text-5xl lg:text-6xl font-black tracking-tight ${themeClasses.text}`}>
              About <span className={themeClasses.accent}>Me</span>
            </h1>
            <Sparkles className={`w-8 h-8 ${themeClasses.accent}`} />
          </motion.div>
          <p className={`text-xl ${themeClasses.textMuted} max-w-2xl mx-auto`}>
            Passionate developer crafting digital experiences with code and creativity
          </p>
        </motion.div>

        {/* Main Content */}
        <div className={`backdrop-blur-xl ${themeClasses.card} border rounded-3xl shadow-2xl p-8 lg:p-16 relative overflow-hidden`}>
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

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Profile Section */}
            <motion.div
              variants={itemVariant}
              className="space-y-8"
            >
              {/* Enhanced Profile Image */}
              <div className="flex flex-col items-center lg:items-start">
                <motion.div
                  variants={floatingVariant}
                  animate="animate"
                  className="relative group mb-8"
                >
                  {/* Glowing Ring Effect */}
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className={`absolute -inset-6 rounded-full opacity-30 blur-lg ${
                      isDarkMode ? 'bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600' : 'bg-gradient-to-r from-blue-400 via-purple-500 to-pink-600'
                    }`}
                  />
                  
                  <div className={`relative w-48 h-48 sm:w-56 sm:h-56 rounded-3xl overflow-hidden border-4 ${
                    isDarkMode ? 'border-cyan-400/30' : 'border-blue-400/30'
                  } shadow-2xl group-hover:scale-105 transition-all duration-700`}>
                    <img
                      src="https://blog.logrocket.com/wp-content/uploads/2022/01/python-developers-guide-react.png"
                      alt="Saheer Chungath - Full Stack Developer"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    
                    {/* Status Overlay */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`absolute inset-0 ${themeClasses.card} backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center`}
                    >
                      <div className="text-center">
                        <Target className={`w-8 h-8 ${themeClasses.accent} mx-auto mb-2`} />
                        <p className={`font-bold ${themeClasses.text}`}>Ready to Code!</p>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Personal Info */}
                <div className="text-center lg:text-left space-y-4">
                  <motion.h2
                    variants={itemVariant}
                    className={`text-4xl sm:text-5xl font-black tracking-tight ${themeClasses.text}`}
                  >
                    Saheer <span className={themeClasses.accent}>Chungath</span>
                  </motion.h2>
                  
                  <motion.div
                    variants={itemVariant}
                    className="space-y-2"
                  >
                    <p className={`text-xl font-bold ${themeClasses.accent} flex items-center justify-center lg:justify-start gap-2`}>
                      <FaLaptopCode className="w-5 h-5" />
                      Full Stack Developer
                    </p>
                    <p className={`${themeClasses.textMuted} flex items-center justify-center lg:justify-start gap-2`}>
                      <MapPin className="w-4 h-4" />
                      Kerala, India
                    </p>
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
                </div>
              </div>
            </motion.div>

            {/* Content Section */}
            <motion.div
              variants={itemVariant}
              className="space-y-8"
            >
              {/* About Text */}
              <div className="space-y-6">
                <motion.div
                  variants={itemVariant}
                  className={`space-y-4 ${themeClasses.textMuted} text-lg leading-relaxed`}
                >
                  <p className="flex items-start gap-3">
                    <FaHeart className={`w-5 h-5 mt-1 ${themeClasses.accent} flex-shrink-0`} />
                    I'm a passionate student and aspiring full-stack developer, currently pursuing my studies while building scalable, user-centric web experiences. Always driven by curiosity and the thrill of solving complex problems.
                  </p>
                  <p className="flex items-start gap-3">
                    <BookOpen className={`w-5 h-5 mt-1 ${themeClasses.accent} flex-shrink-0`} />
                    From my early days exploring Python during my studies, I've been mastering modern web technologies using React, Django, and cutting-edge frameworks — constantly learning and growing.
                  </p>
                  <p className="flex items-start gap-3">
                    <Rocket className={`w-5 h-5 mt-1 ${themeClasses.accent} flex-shrink-0`} />
                    I've successfully completed 5+ projects that showcase my skills and dedication to clean, maintainable code. Let's build the future together, one line of code at a time.
                  </p>
                </motion.div>

                {/* Stats */}
                <motion.div
                  variants={itemVariant}
                  className="grid grid-cols-2 gap-4"
                >
                  {stats.map(({ icon: Icon, label, value }, index) => (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1 + index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className={`${themeClasses.card} backdrop-blur-sm border rounded-2xl p-4 text-center group cursor-pointer`}
                    >
                      <Icon className={`w-8 h-8 ${themeClasses.accent} mx-auto mb-2 group-hover:scale-110 transition-transform`} />
                      <div className={`text-2xl font-bold ${themeClasses.text} mb-1`}>{value}</div>
                      <div className={`text-sm ${themeClasses.textMuted}`}>{label}</div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>



              {/* Download Resume */}
              <motion.div
                variants={itemVariant}
                className="pt-4"
              >
                <motion.a
                  href="file:///C:/Users/CHUNGATH/Downloads/Saheer_c%20(1).pdf"
                  download
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`inline-flex items-center gap-3 ${themeClasses.button} text-white px-8 py-4 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 group`}
                  aria-label="Download Resume"
                >
                  <FaDownload className="group-hover:translate-y-[-2px] transition-transform" />
                  Download Resume
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="ml-1"
                  >
                    ⚡
                  </motion.div>
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default About;