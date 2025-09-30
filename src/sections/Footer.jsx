import React, { useRef, useEffect, useState } from "react";
import { Facebook, Instagram, Github, Linkedin, Mail, Phone, MapPin, Heart, Sparkles } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.body.classList.contains('bg-slate-900'));
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const socialLinks = [
    {
      href: "https://www.facebook.com/share/19BKcvb4Uj/?mibextid=wwXIfr",
      label: "Facebook",
      icon: <Facebook size={22} />,
      color: "hover:bg-blue-600",
    },
    {
      href: "https://www.instagram.com/saheer07?igsh=MW16MTE2eHV5emtydw==",
      label: "Instagram",
      icon: <Instagram size={22} />,
      color: "hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600",
    },
    {
      href: "https://github.com/saheer07",
      label: "GitHub",
      icon: <Github size={22} />,
      color: "hover:bg-gray-700",
    },
    {
      href: "https://www.linkedin.com/in/saheer-chungath-23b44434a",
      label: "LinkedIn",
      icon: <Linkedin size={22} />,
      color: "hover:bg-blue-700",
    },
  ];

  const themeClasses = {
    bg: isDarkMode 
      ? 'bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800' 
      : 'bg-gradient-to-br from-gray-100 via-white to-blue-50',
    card: isDarkMode 
      ? 'bg-black/40 border-white/10' 
      : 'bg-white/60 border-black/10',
    text: isDarkMode ? 'text-white' : 'text-gray-900',
    textMuted: isDarkMode ? 'text-gray-400' : 'text-gray-600',
    accent: isDarkMode ? 'text-cyan-400' : 'text-blue-600',
    border: isDarkMode ? 'border-white/10' : 'border-black/10',
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const childVariants = {
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

  const socialIconVariants = {
    hover: {
      y: -5,
      scale: 1.1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: { scale: 0.95 },
  };

  return (
    <motion.footer
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className={`relative py-20 px-6 overflow-hidden ${themeClasses.bg}`}
    >
      {/* Animated Background */}
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
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        <motion.div 
          className={`absolute bottom-0 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl ${
            isDarkMode ? 'bg-gradient-to-r from-cyan-400 to-blue-600' : 'bg-gradient-to-r from-blue-400 to-purple-500'
          }`}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-16">
          {/* Logo & About */}
          <motion.div variants={childVariants} className="space-y-6">
            <motion.a
              href="#home"
              className="inline-flex items-center gap-3 group"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={(e) => {
                e.preventDefault();
                const element = document.querySelector('#home');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
            >
              <motion.div 
                className={`w-12 h-12 bg-gradient-to-br ${isDarkMode ? 'from-cyan-400 to-blue-600' : 'from-blue-500 to-purple-600'} rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg`}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                S
              </motion.div>
              <span className={`text-2xl font-black ${themeClasses.text}`}>
                Saheer
              </span>
            </motion.a>

            <TypeAnimation
              sequence={[
                "Frontend Developer passionate about creating beautiful experiences.",
                3000,
                "Turning ideas into elegant, responsive websites.",
                3000,
                "Building the future with React & modern technologies.",
                3000,
              ]}
              wrapper="p"
              speed={50}
              repeat={Infinity}
              className={`${themeClasses.textMuted} text-sm leading-relaxed`}
            />

            <div className="flex items-center gap-2">
              <MapPin className={`w-4 h-4 ${themeClasses.accent}`} />
              <span className={`text-sm ${themeClasses.textMuted}`}>Malappuram, Kerala</span>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.nav variants={childVariants} className="space-y-4">
            <h3 className={`text-lg font-bold ${themeClasses.text} flex items-center gap-2`}>
              <Sparkles className={`w-5 h-5 ${themeClasses.accent}`} />
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Home", href: "#home" },
                { name: "About", href: "#about" },
                { name: "Skills", href: "#skills" },
                { name: "Projects", href: "#projects" },
                { name: "Contact", href: "#contact" }
              ].map((section) => (
                <motion.li
                  key={section.name}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <a
                    href={section.href}
                    className={`text-sm ${themeClasses.textMuted} hover:${themeClasses.accent} transition-colors inline-flex items-center gap-2 group`}
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.querySelector(section.href);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                  >
                    <motion.span
                      className={`w-1 h-1 rounded-full ${isDarkMode ? 'bg-cyan-400' : 'bg-blue-600'}`}
                      whileHover={{ scale: 1.5 }}
                    />
                    {section.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.nav>

          {/* Contact Info */}
          <motion.div variants={childVariants} className="space-y-4">
            <h3 className={`text-lg font-bold ${themeClasses.text} flex items-center gap-2`}>
              <Mail className={`w-5 h-5 ${themeClasses.accent}`} />
              Contact Info
            </h3>
            <div className="space-y-4">
              <motion.a
                href="mailto:saheerchungarh07@gmail.com"
                className={`flex items-start gap-3 text-sm ${themeClasses.textMuted} hover:${themeClasses.accent} transition-colors group`}
                whileHover={{ x: 5 }}
              >
                <div className={`p-2 ${themeClasses.card} backdrop-blur-sm border rounded-lg mt-0.5 group-hover:scale-110 transition-transform`}>
                  <Mail className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className={`text-xs ${themeClasses.textMuted} mb-1`}>Email</p>
                  <p className="font-medium break-all">saheerchungarh07@gmail.com</p>
                </div>
              </motion.a>

              <motion.a
                href="tel:+917034449577"
                className={`flex items-start gap-3 text-sm ${themeClasses.textMuted} hover:${themeClasses.accent} transition-colors group`}
                whileHover={{ x: 5 }}
              >
                <div className={`p-2 ${themeClasses.card} backdrop-blur-sm border rounded-lg mt-0.5 group-hover:scale-110 transition-transform`}>
                  <Phone className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className={`text-xs ${themeClasses.textMuted} mb-1`}>Phone</p>
                  <p className="font-medium">+91 70344 49577</p>
                </div>
              </motion.a>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={childVariants} className="space-y-4">
            <h3 className={`text-lg font-bold ${themeClasses.text} flex items-center gap-2`}>
              <Heart className={`w-5 h-5 ${themeClasses.accent}`} />
              Follow Me
            </h3>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map(({ href, label, icon, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`p-3 ${themeClasses.card} backdrop-blur-sm border rounded-xl ${themeClasses.text} ${color} transition-all group relative overflow-hidden`}
                  variants={socialIconVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  {/* Hover glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                  {icon}
                </motion.a>
              ))}
            </div>

            <p className={`text-xs ${themeClasses.textMuted} mt-4`}>
              Let's connect and create something amazing together!
            </p>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          variants={childVariants}
          className={`h-px ${isDarkMode ? 'bg-gradient-to-r from-transparent via-white/20 to-transparent' : 'bg-gradient-to-r from-transparent via-black/20 to-transparent'} mb-8`}
        />

        {/* Bottom Section */}
        <motion.div
          variants={childVariants}
          className="flex flex-col md:flex-row items-center justify-between gap-4"
        >
        <p className={`text-sm ${themeClasses.textMuted} text-center`}>
  © {new Date().getFullYear()} Saheer. All rights reserved.
</p>

          

          
        </motion.div>
      </div>
    </motion.footer>
  );
}

export default Footer;