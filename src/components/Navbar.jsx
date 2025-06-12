import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronUp, Github, Linkedin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('home');
  const [showNavbar, setShowNavbar] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const navRef = useRef(null);
  const prevScrollY = useRef(0);
  const firstMenuItemRef = useRef(null);
  const lastMenuItemRef = useRef(null);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 10);
      setShowNavbar(prevScrollY.current > currentScrollY || currentScrollY < 10);
      prevScrollY.current = currentScrollY;
      setShowScrollTop(currentScrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
      if (isOpen && e.key === 'Tab') {
        if (document.activeElement === lastMenuItemRef.current && !e.shiftKey) {
          e.preventDefault();
          firstMenuItemRef.current.focus();
        }
        if (document.activeElement === firstMenuItemRef.current && e.shiftKey) {
          e.preventDefault();
          lastMenuItemRef.current.focus();
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      navItems.forEach(({ href }) => {
        const section = document.querySelector(href);
        if (section) {
          const top = section.offsetTop - 100;
          const bottom = top + section.offsetHeight;
          const scrollPos = window.scrollY;
          if (scrollPos >= top && scrollPos < bottom) {
            setActiveLink(href.slice(1));
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    setTimeout(() => {
      const target = document.querySelector(href);
      if (target) {
        window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
      }
    }, 300);
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      <motion.nav
        ref={navRef}
        initial={{ y: -100 }}
        animate={{ y: showNavbar ? 0 : -100 }}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-black/70 backdrop-blur-lg shadow-lg py-2'
            : 'bg-gray-950 shadow-none py-4'
        }`}
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
            {navItems.map(({ label, href }) => (
              <li key={href}>
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
              </li>
            ))}

            {/* Desktop Social Icons */}
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

          {/* Mobile Menu Toggle */}
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

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.nav
              id="mobile-menu"
              initial={{ x: '-100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '-100%', opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="fixed top-0 left-0 h-full w-64 bg-black bg-opacity-95 px-6 py-10 flex flex-col space-y-6 text-white shadow-xl z-50"
            >
              {navItems.map(({ label, href }, i) => (
                <a
                  key={href}
                  href={href}
                  onClick={(e) => handleLinkClick(e, href)}
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
              ))}

              {/* Mobile Social Icons */}
              <div className="mt-auto flex gap-4 pt-6 border-t border-gray-700">
                <a
                  href="https://github.com/saheer07"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="text-white hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
                >
                  <Github size={22} />
                </a>
                <a
                  href="https://www.linkedin.com/in/saheer-chungath-23b44434a"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="text-white hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
                >
                  <Linkedin size={22} />
                </a>
              </div>
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
};

export default Navbar;
