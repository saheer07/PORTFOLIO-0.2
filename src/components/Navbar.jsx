import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronUp, Sun, Moon, Github, Linkedin, Twitter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('home');
  const [showNavbar, setShowNavbar] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    // Init theme from localStorage or system preference
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      if (stored) return stored === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(languages[0]);

  const navRef = useRef(null);
  const prevScrollY = useRef(0);
  const firstMenuItemRef = useRef(null);
  const lastMenuItemRef = useRef(null);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    {
      label: 'Projects',
      href: '#projects',
     
    },
    { label: 'Contact', href: '#contact' },
  ];

  // Theme toggle handler
  const toggleTheme = () => {
    setIsDark((prev) => {
      const newTheme = !prev;
      if (newTheme) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return newTheme;
    });
  };

  // Apply initial theme class on mount
  useEffect(() => {
    if (isDark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDark]);

  // Handle scroll for navbar show/hide, scrolled state & scrollTop button
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 10);
      setShowNavbar(prevScrollY.current > currentScrollY || currentScrollY < 10);
      prevScrollY.current = currentScrollY;
      setShowScrollTop(currentScrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menu on Escape key, trap focus in mobile menu
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        setLangDropdownOpen(false);
      }
      // Trap focus inside mobile menu when open
      if (isOpen) {
        if (e.key === 'Tab') {
          if (document.activeElement === lastMenuItemRef.current && !e.shiftKey) {
            e.preventDefault();
            firstMenuItemRef.current.focus();
          }
          if (document.activeElement === firstMenuItemRef.current && e.shiftKey) {
            e.preventDefault();
            lastMenuItemRef.current.focus();
          }
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Update active link on scroll
  useEffect(() => {
    const handleScroll = () => {
      navItems.forEach(({ href, submenu }) => {
        const checkSections = [{ href }];
        if (submenu) {
          submenu.forEach((sub) => checkSections.push(sub));
        }
        checkSections.forEach(({ href: sectionHref }) => {
          const section = document.querySelector(sectionHref);
          if (section) {
            const top = section.offsetTop - 100;
            const bottom = top + section.offsetHeight;
            const scrollPos = window.scrollY;
            if (scrollPos >= top && scrollPos < bottom) {
              setActiveLink(sectionHref.slice(1));
            }
          }
        });
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  // Smooth scroll to section & close menu with animation delay on mobile
  const handleLinkClick = (e, href) => {
    e.preventDefault();
    if (isOpen) {
      setIsOpen(false);
      setTimeout(() => {
        const target = document.querySelector(href);
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 80,
            behavior: 'smooth',
          });
        }
      }, 300);
    } else {
      const target = document.querySelector(href);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth',
        });
      }
    }
  };

  // Scroll to top button handler
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  // Language selector toggle & select
  const toggleLangDropdown = () => setLangDropdownOpen((prev) => !prev);
  const selectLanguage = (lang) => {
    setSelectedLang(lang);
    setLangDropdownOpen(false);
  };

  return (
    <>
      <motion.nav
        ref={navRef}
        role="navigation"
        aria-label="Primary navigation"
        initial={{ y: -100 }}
        animate={{ y: showNavbar ? 0 : -100 }}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-black/70 backdrop-blur-lg shadow-lg py-2'
            : 'bg-gray-950 shadow-none py-4'
        } ${isDark ? 'dark' : ''}`}
      >
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, '#home')}
            className="flex items-center gap-2 text-white font-bold text-xl select-none py-2"
          >
            <div className="w-10 h-10 bg-gradient-to-tr from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white font-extrabold text-lg shadow-inner ring-2 ring-white/10">
              S
            </div>
            <span className="text-red-500 text-2xl">Saheer</span>
          </a>

          {/* Desktop menu */}
          <ul className="hidden md:flex gap-8 text-sm font-medium items-center">
            {navItems.map(({ label, href, submenu }) => (
              <li key={href} className="relative group">
                <a
                  href={href}
                  onClick={(e) => handleLinkClick(e, href)}
                  aria-current={activeLink === href.slice(1) ? 'page' : undefined}
                  className={`relative inline-block px-1 pb-1 transition-colors ${
                    activeLink === href.slice(1)
                      ? 'text-red-500'
                      : 'text-white hover:text-red-400'
                  }`}
                  tabIndex={0}
                >
                  {label}
                  <motion.span
                    layoutId="underline"
                    className="absolute left-0 bottom-0 w-full h-[2px] bg-red-500"
                    initial={false}
                    animate={{
                      scaleX: activeLink === href.slice(1) ? 1 : 0,
                    }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    style={{ originX: 0 }}
                  />
                </a>
                {/* Submenu */}
                {submenu && (
                  <ul className="absolute top-full left-0 mt-1 bg-black rounded shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-opacity duration-200 min-w-[150px] z-10">
                    {submenu.map(({ label: subLabel, href: subHref }) => (
                      <li key={subHref}>
                        <a
                          href={subHref}
                          onClick={(e) => handleLinkClick(e, subHref)}
                          className="block px-4 py-2 text-white hover:bg-red-600"
                        >
                          {subLabel}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}

           

            {/* Dark mode toggle */}
           
          
            <li className="flex gap-4 text-white">
              <a
                href="https://github.com/saheer07"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/saheer-chungath-23b44434a"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
              >
                <Linkedin size={20} />
              </a>
             
            </li>
          </ul>

          {/* Mobile menu toggle */}
          <div className="md:hidden text-white">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              className="focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile menu - slide in from left */}
        <AnimatePresence>
          {isOpen && (
            <motion.nav
              id="mobile-menu"
              role="menu"
              aria-label="Mobile navigation"
              initial={{ x: '-100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '-100%', opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="fixed top-0 left-0 h-full w-64 bg-black bg-opacity-95 px-6 py-10 flex flex-col space-y-6 text-white shadow-xl z-50"
            >
              {navItems.map(({ label, href, submenu }, i) => (
                <div key={href} className="flex flex-col">
                  <a
                    href={href}
                    onClick={(e) => handleLinkClick(e, href)}
                    role="menuitem"
                    tabIndex={0}
                    ref={
                      i === 0
                        ? firstMenuItemRef
                        : i === navItems.length - 1
                        ? lastMenuItemRef
                        : null
                    }
                    className={`block text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-red-500 rounded ${
                      activeLink === href.slice(1)
                        ? 'text-red-500'
                        : 'hover:text-red-400'
                    }`}
                  >
                    {label}
                  </a>
                  {submenu && (
                    <div className="pl-4 mt-2 flex flex-col space-y-2">
                      {submenu.map(({ label: subLabel, href: subHref }) => (
                        <a
                          key={subHref}
                          href={subHref}
                          onClick={(e) => handleLinkClick(e, subHref)}
                          className="text-sm text-gray-300 hover:text-red-400 pl-2"
                          role="menuitem"
                          tabIndex={0}
                        >
                          {subLabel}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}

             

              {/* Dark mode toggle mobile */}
           
</motion.nav>
)}
</AnimatePresence>
</motion.nav>


  {/* Scroll to top button */}
  <AnimatePresence>
    {showScrollTop && (
      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed bottom-6 right-6 p-3 bg-red-500 text-white rounded-full shadow-xl z-50 hover:bg-red-600 transition"
        aria-label="Scroll to top"
      >
        <ChevronUp />
      </motion.button>
    )}
  </AnimatePresence>
</>
);
}

export default Navbar;