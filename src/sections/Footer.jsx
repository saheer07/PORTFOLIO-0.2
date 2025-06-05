import React from "react";
import { Facebook, Instagram, Github, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

function Footer() {
  const socialLinks = [
    {
      href: "https://www.facebook.com/share/19BKcvb4Uj/?mibextid=wwXIfr",
      label: "Facebook",
      icon: <Facebook size={28} />,
    },
    {
      href: "https://www.instagram.com/saheerrr____?igsh=MW16MTE2eHV5emtydw==",
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

  return (
    <footer className="bg-gray-950 text-gray-300 px-8 py-14 select-none">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Logo & About */}
        <div className="flex flex-col space-y-5">
          <a
            href="#home"
            className="inline-flex items-center gap-3 text-red-500 font-extrabold text-3xl tracking-tight"
            aria-label="Saheer logo"
          >
            <div className="w-12 h-12 bg-gradient-to-tr from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white font-extrabold text-xl shadow-lg ring-2 ring-white/20">
              S
            </div>
            Saheer
          </a>
          <p className="text-gray-400 leading-relaxed md:text-lg max-w-md">
            Passionate developer building modern web experiences. Let's connect
            and collaborate.
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col space-y-3">
          <h2 className="text-lg font-semibold mb-3 text-white">Quick Links</h2>
          <ul className="flex flex-col space-y-2 text-sm md:text-base">
            {["home", "about", "skills", "projects", "contact"].map((section) => (
              <li key={section}>
                <a
                  href={`#${section}`}
                  className="hover:text-red-500 transition-colors duration-300 font-medium"
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Social Links */}
        <div className="flex flex-col space-y-5">
          <h2 className="text-lg font-semibold mb-3 text-white">Follow Me</h2>
          <div className="flex space-x-8">
            {socialLinks.map(({ href, label, icon }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-red-500 hover:text-red-400 transition-colors duration-300 shadow-lg rounded-full p-2 bg-gray-900/30 backdrop-blur-sm"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
              >
                {icon}
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="text-center text-xs md:text-sm text-gray-500 mt-16 border-t border-gray-800 pt-6 select-none">
        © {new Date().getFullYear()} Saheer. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
