import React, { useRef, useEffect, useState } from "react";
import { Facebook, Instagram, Github, Linkedin, Mail, Phone } from "lucide-react";
import { motion, useInView } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { TypeAnimation } from "react-type-animation";

function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Track mouse position for particle interaction
  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = ref.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const socialLinks = [
    {
      href: "https://www.facebook.com/share/19BKcvb4Uj/?mibextid=wwXIfr",
      label: "Facebook",
      icon: <Facebook size={28} />,
    },
    {
      href: "https://www.instagram.com/saheer07?igsh=MW16MTE2eHV5emtydw==",
      label: "Instagram",
      icon: <Instagram size={28} />,
    },
    {
      href: "https://github.com/saheer07",
      label: "GitHub",
      icon: <Github size={28} />,
    },
    {
      href: "https://www.linkedin.com/in/saheer-chungath-23b44434a",
      label: "LinkedIn",
      icon: <Linkedin size={28} />,
    },
  ];

  // Container animation for staggered fade-in
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  // Child animation for each section
  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  // Social icon hover animation with glow effect
  const socialIconVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    hover: {
      scale: 1.3,
      rotate: 10,
      boxShadow: "0 0 25px rgba(239, 68, 68, 0.7)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
      },
    },
    tap: { scale: 0.9 },
  };

  // Logo animation with holographic effect
  const logoVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.15,
      boxShadow: "0 0 30px rgba(239, 68, 68, 0.6)",
      transition: {
        type: "spring",
        stiffness: 200,
      },
    },
  };

  // Play subtle hover sound
  const playHoverSound = () => {
    const audio = new Audio(
      "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA="
    );
    audio.play().catch(() => {});
  };

  return (
    <motion.footer
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className="bg-gray-950 text-white py-16 px-4 sm:px-8 md:px-16 lg:px-24"
    >
      {/* Parallax Gradient Background */}
      <div
        className="absolute inset-0 bg-gradient-to-tr from-gray-950 via-gray-900 to-red-900/30 animate-gradient-bg"
        style={{
          transform: `translate(${mousePos.x * 0.02}px, ${mousePos.y * 0.02}px)`,
        }}
      />
      {/* Enhanced Particle Overlay with Mouse Interaction */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`particle particle-${i + 1}`}
            style={{
              transform: `translate(${(mousePos.x - 500) * 0.05}px, ${(mousePos.y - 300) * 0.05}px)`,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 z-10">
        {/* Logo & About */}
        <motion.div variants={childVariants} className="flex flex-col space-y-5 section-border">
          <Tilt options={{ max: 30, scale: 1.1, speed: 400 }}>
            <motion.a
              href="#home"
              className="inline-flex items-center gap-3 text-red-500 font-extrabold text-3xl tracking-tight holographic"
              aria-label="Saheer logo"
              variants={logoVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
            >
              <div className="w-14 h-14 bg-gradient-to-tr from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white font-extrabold text-xl shadow-lg ring-2 ring-white/20">
                S
              </div>
              Saheer
            </motion.a>
          </Tilt>
          <TypeAnimation
          sequence={[
  "Hi, I'm Saheer – a passionate Frontend Developer.",
  2000,
  "Crafting elegant websites with React & Tailwind CSS.",
  2000,
  "Turning UI ideas into beautiful experiences.",
  2000,
  "Let's build something amazing together.",
  2000,
]}
            wrapper="p"
            speed={50}
            repeat={Infinity}
            className="text-gray-400 leading-relaxed text-base max-w-sm"
          />
        </motion.div>

        {/* Quick Links */}
        <motion.nav variants={childVariants} className="flex flex-col space-y-3 section-border">
          <motion.h2
            className="text-lg font-semibold text-white mb-3 glow-pulse neon-text"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            Quick Links
          </motion.h2>
          <ul className="space-y-2 text-sm md:text-base">
            {["home", "about", "skills", "projects", "contact"].map((section) => (
              <motion.li
                key={section}
                whileHover={{ x: 10, color: "#ef4444", scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <a
                  href={`#${section}`}
                  className="hover:text-red-500 transition-colors duration-300 font-medium capitalize"
                  onMouseEnter={playHoverSound}
                >
                  {section}
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.nav>

        {/* Contact Info */}
        <motion.div variants={childVariants} className="flex flex-col space-y-3 section-border">
          <motion.h2
            className="text-lg font-semibold text-white mb-3 glow-pulse"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            Contact Info
          </motion.h2>
          <motion.p
            className="text-sm text-gray-400 flex items-center gap-2"
            whileHover={{ x: 10, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
            onMouseEnter={playHoverSound}
          >
            <Mail size={18} className="text-red-500" /> saheerchungarh07@gmail.com
          </motion.p>
          <motion.p
            className="text-sm text-gray-400 flex items-center gap-2"
            whileHover={{ x: 10, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
            onMouseEnter={playHoverSound}
          >
            <Phone size={18} className="text-red-500" /> +91 70344 49577
          </motion.p>
        </motion.div>

        {/* Social Links */}
        <motion.div variants={childVariants} className="flex flex-col space-y-5 section-border">
          <motion.h2
            className="text-lg font-semibold text-white mb-3 glow-pulse neon-text"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            Follow Me
          </motion.h2>
          <div className="flex flex-wrap gap-5">
            {socialLinks.map(({ href, label, icon }) => (
              <Tilt key={label} options={{ max: 25, scale: 1.15, speed: 300 }}>
                <motion.a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-red-500 hover:text-pink-400 transition-colors duration-300 shadow-lg rounded-full p-3 bg-gray-900/30 backdrop-blur-sm"
                  variants={socialIconVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  whileTap="tap"
                  onMouseEnter={playHoverSound}
                >
                  {icon}
                </motion.a>
              </Tilt>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Line */}
      <motion.div
        className="relative text-center text-xs md:text-sm text-gray-500 mt-16 pt-6 select-none border-t border-gray-800 z-10"
        variants={childVariants}
      >
        © {new Date().getFullYear()} Saheer. Crafted with ❤️ using React & Tailwind CSS.
      </motion.div>
    </motion.footer>
  );
}

export default Footer;