import { useState, useEffect, useRef } from 'react';
import {
  Menu,
  X,
  ChevronUp,
  Github,
  Linkedin,
  Moon,
  Sun,
  Zap,
  Home,
  User,
  Code,
  FolderOpen,
  Mail,
} from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('home');
  const [showNavbar, setShowNavbar] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const navRef = useRef(null);
  const prevScrollY = useRef(0);

  const navItems = [
    { label: 'Home', href: '#home', icon: Home },
    { label: 'About', href: '#about', icon: User },
    { label: 'Skills', href: '#skills', icon: Code },
    { label: 'Projects', href: '#projects', icon: FolderOpen },
    { label: 'Contact', href: '#contact', icon: Mail },
  ];

  // Custom cursor
  useEffect(() => {
    const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll detection + active section
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 10);
      setShowNavbar(prevScrollY.current > currentScrollY || currentScrollY < 100);
      prevScrollY.current = currentScrollY;
      setShowScrollTop(currentScrollY > 300);

      // Active section
      const sections = document.querySelectorAll('section[id]');
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;
        if (currentScrollY >= sectionTop && currentScrollY < sectionTop + sectionHeight) {
          setActiveLink(section.getAttribute('id'));
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Dark mode
  useEffect(() => {
    document.body.className = isDarkMode ? 'bg-slate-900' : 'bg-gray-50';
  }, [isDarkMode]);

  const handleLinkClick = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      setIsOpen(false);
      const section = document.getElementById(href.slice(1));
      if (section) section.scrollIntoView({ behavior: 'smooth' });
      setActiveLink(href.slice(1));
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveLink('home');
  };

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const themeClasses = {
    navbar: isDarkMode ? 'bg-black/20 border-white/10' : 'bg-white/20 border-black/10',
    text: isDarkMode ? 'text-white' : 'text-gray-900',
    textMuted: isDarkMode ? 'text-gray-300' : 'text-gray-600',
    accent: isDarkMode ? 'text-cyan-400' : 'text-blue-600',
    hover: isDarkMode ? 'hover:text-cyan-300' : 'hover:text-blue-500',
    mobile: isDarkMode ? 'bg-black/90 border-white/20' : 'bg-white/90 border-black/20',
    button: isDarkMode
      ? 'bg-cyan-500/20 border-cyan-400/30 text-cyan-300'
      : 'bg-blue-500/20 border-blue-400/30 text-blue-600',
  };

  return (
    <>
      {/* Custom cursor */}
      <div
        className="fixed pointer-events-none z-40 w-6 h-6 rounded-full transition-all duration-300 mix-blend-difference hidden lg:block"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          background: isDarkMode ? 'rgba(34, 211, 238, 0.3)' : 'rgba(59, 130, 246, 0.3)',
          boxShadow: isDarkMode
            ? '0 0 20px rgba(34, 211, 238, 0.5)'
            : '0 0 20px rgba(59, 130, 246, 0.5)',
        }}
      />

      {/* Navbar */}
      <nav
        ref={navRef}
        className={`fixed top-0 w-full z-50 transition-all duration-500 transform ${
          showNavbar ? 'translate-y-0' : '-translate-y-full'
        } ${
          isScrolled
            ? `${themeClasses.navbar} backdrop-blur-xl border-b shadow-2xl py-3`
            : `${themeClasses.navbar} backdrop-blur-md py-5`
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <div
            className={`flex items-center gap-3 ${themeClasses.text} font-bold text-xl select-none py-2`}
          >
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-extrabold text-lg shadow-2xl ring-2 ring-white/20">
                <Zap className="w-6 h-6 animate-pulse" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className={`${themeClasses.accent} text-2xl font-black tracking-tight`}>
                Saheer
              </span>
              <span
                className={`${themeClasses.textMuted} text-xs font-medium tracking-widest uppercase`}
              >
                Developer
              </span>
            </div>
          </div>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-8">
            <ul className="flex gap-1 bg-black/10 backdrop-blur-sm rounded-full px-2 py-2 border border-white/10">
              {navItems.map(({ label, href, icon: Icon }) => (
                <li key={href}>
                  <a
                    href={href}
                    onClick={(e) => handleLinkClick(e, href)}
                    className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 group ${
                      activeLink === href.slice(1)
                        ? `${themeClasses.accent} bg-white/20 shadow-lg`
                        : `${themeClasses.text} ${themeClasses.hover} hover:bg-white/10`
                    }`}
                  >
                    <Icon size={16} />
                    {label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Theme + social */}
            <div className="flex items-center gap-3">
              <button
                onClick={toggleTheme}
                className={`p-3 rounded-xl ${themeClasses.button}`}
                aria-label="Toggle theme"
              >
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <div className="flex gap-2">
                <a
                  href="https://github.com/saheer07"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-xl ${themeClasses.button} border`}
                >
                  <Github size={18} />
                </a>
                <a
                  href="https://www.linkedin.com/in/saheer-chungath-23b44434a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-xl ${themeClasses.button} border`}
                >
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Mobile buttons */}
          <div className="lg:hidden flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${themeClasses.button}`}
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-lg ${themeClasses.button}`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* ✅ Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-72 ${themeClasses.mobile} backdrop-blur-xl border-l shadow-2xl z-50 transform transition-transform duration-500 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 space-y-4">
          {navItems.map(({ label, href, icon: Icon }) => (
            <a
              key={href}
              href={href}
              onClick={(e) => handleLinkClick(e, href)}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeLink === href.slice(1)
                  ? `${themeClasses.accent} bg-white/10 shadow-lg`
                  : `${themeClasses.text} ${themeClasses.hover} hover:bg-white/5`
              }`}
            >
              <Icon size={20} />
              <span>{label}</span>
            </a>
          ))}
        </div>

        <div className="pt-6 border-t border-white/10 flex gap-3 px-4">
          <a
            href="https://github.com/saheer07"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl ${themeClasses.button} border`}
          >
            <Github size={18} /> GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/saheer-chungath-23b44434a"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl ${themeClasses.button} border`}
          >
            <Linkedin size={18} /> LinkedIn
          </a>
        </div>
      </div>

      {/* Scroll to top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-8 right-8 p-4 ${themeClasses.button} border rounded-2xl shadow-2xl`}
        >
          <ChevronUp size={20} />
        </button>
      )}
    </>
  );
};

export default Navbar;
