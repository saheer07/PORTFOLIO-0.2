import React from "react";
import { Github, Linkedin, Mail, Zap, Terminal, Power } from "lucide-react";
import { motion } from "framer-motion";

function Footer() {
  const socialLinks = [
    {
      href: "https://github.com/saheer07",
      label: "GitHub",
      icon: <Github size={18} />,
    },
    {
      href: "https://www.linkedin.com/in/saheer-chungath-23b44434a",
      label: "LinkedIn",
      icon: <Linkedin size={18} />,
    },
    {
      href: "mailto:saheerchungath07@gmail.com",
      label: "Email",
      icon: <Mail size={18} />,
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] } },
  };

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
      className="relative py-12 px-6 overflow-hidden bg-black flex flex-col justify-center border-t-2 border-[#e74c3c] font-['Orbitron']"
    >
      <div className="relative max-w-7xl mx-auto z-10 w-full">
        {/* Main Grid Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mb-12">
          
          {/* Logo & Pilot Status */}
          <motion.div variants={childVariants} className="space-y-6 flex flex-col items-center md:items-start text-center md:text-left">
            <motion.a
              href="#home"
              className="inline-flex items-center gap-3 group"
              whileHover={{ scale: 1.05 }}
              onClick={(e) => {
                e.preventDefault();
                const element = document.querySelector('#home');
                element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            >
              <div className="relative group">
                <div className="absolute -inset-1 bg-[#e74c3c] blur opacity-25 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative w-10 h-10 bg-black border border-[#e74c3c] flex items-center justify-center text-[#e74c3c] shadow-[0_0_15px_rgba(231,76,60,0.4)]">
                  <Zap className="w-5 h-5 z-10" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl tracking-widest text-[#e74c3c] font-black uppercase">
                  Saheer<span className="text-white">_C</span>
                </span>
              </div>
            </motion.a>

            <div className="bg-[#0a0a0a] border border-[#e74c3c]/30 p-4 relative overflow-hidden w-full max-w-xs shadow-[inset_0_0_10px_rgba(231,76,60,0.1)]">
               {/* Corner marks */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#e74c3c]" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#e74c3c]" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#e74c3c]" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#e74c3c]" />

              <div className="flex items-center gap-2 text-[10px] text-[#e74c3c] tracking-[0.2em] font-bold uppercase mb-2 border-b border-[#e74c3c]/20 pb-2">
                <Power className="w-3 h-3" />
                PILOT_STATUS
              </div>
              <div className="flex justify-between items-center text-xs tracking-widest text-white mt-3">
                <span className="text-gray-500">SYS_LINK:</span>
                <span className="text-[#2ecc71] animate-pulse">ONLINE & READY</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Nav Terminal */}
          <motion.div variants={childVariants} className="space-y-4 flex flex-col items-center md:items-start w-full">
            <h3 className="text-[10px] tracking-[0.3em] font-bold text-[#e74c3c] flex items-center gap-2 uppercase mb-4">
              <Terminal className="w-4 h-4 text-[#e74c3c]" /> 
              SYSTEM_NAV_LINK
            </h3>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-3 w-full max-w-[250px]">
              {["Home", "About", "Skills", "Projects", "Contact"].map((section, index) => (
                <motion.li key={section} whileHover={{ x: 5 }}>
                  <a
                    href={`#${section.toLowerCase()}`}
                    className="text-xs text-gray-400 hover:text-[#e74c3c] transition-colors flex items-center gap-2 group uppercase tracking-widest"
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.querySelector(`#${section.toLowerCase()}`);
                      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                  >
                    <span className="text-[8px] text-[#e74c3c]/50">0{index + 1}.</span>
                    {section}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* External Links */}
          <motion.div variants={childVariants} className="space-y-4 flex flex-col items-center lg:items-end w-full text-center lg:text-right">
            <h3 className="text-[10px] tracking-[0.3em] font-bold text-[#e74c3c] flex items-center justify-center lg:justify-end gap-2 uppercase mb-4 w-full">
               EXTERNAL_ENDPOINTS <Power className="w-4 h-4 text-[#e74c3c]" />
            </h3>
            <div className="flex gap-4">
              {socialLinks.map(({ href, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-3 bg-black border border-[#e74c3c]/30 text-gray-400 hover:border-[#e74c3c] hover:bg-[#e74c3c]/10 hover:text-white transition-all hover:shadow-[0_0_15px_rgba(231,76,60,0.4)]"
                >
                  {icon}
                </a>
              ))}
            </div>
            <p className="text-[9px] text-[#e74c3c]/70 tracking-widest uppercase mt-4 max-w-[200px] leading-relaxed">
              Open channels for transmission and joint operations.
            </p>
          </motion.div>

        </div>

        {/* Divider Log */}
        <motion.div
          variants={childVariants}
          className="relative h-[1px] w-full bg-[#e74c3c]/20 mb-8"
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black px-4 text-[8px] text-[#e74c3c] tracking-[0.4em] uppercase">
            END_OF_TRANSMISSION
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div variants={childVariants} className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] tracking-[0.2em] text-gray-500 uppercase">
            © {new Date().getFullYear()} SAHEER_C. ALL RIGHTS SECURED.
          </p>
          <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-gray-500 uppercase">
            PWR_SRC: <span className="text-[#e74c3c] font-bold">REACT GUI</span>
          </div>
        </motion.div>

      </div>
    </motion.footer>
  );
}

export default Footer;
