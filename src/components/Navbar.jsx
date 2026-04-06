import { useState, useEffect, useRef } from 'react';
import {
  Menu,
  X,
  ChevronUp,
  Github,
  Linkedin,
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

  return (
    <>
      {/* Custom cursor handled globally or here if specific */}
      <div
        className="fixed pointer-events-none z-40 w-6 h-6 rounded-full transition-all duration-300 mix-blend-screen hidden lg:block"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          background: 'rgba(239, 68, 68, 0.3)',
          boxShadow: '0 0 20px rgba(239, 68, 68, 0.5)',
          border: '1px solid rgba(239, 68, 68, 0.5)'
        }}
      />

      {/* Navbar */}
      <nav
        ref={navRef}
        className={`fixed top-0 w-full z-50 transition-all duration-500 transform ${showNavbar ? 'translate-y-0' : '-translate-y-full'
          } ${isScrolled
            ? 'bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3'
            : 'bg-transparent py-5'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-3 font-bold text-xl select-none py-2 text-white">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-900 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative w-12 h-12 bg-black border border-white/10 rounded-2xl flex items-center justify-center text-red-500 font-extrabold text-lg shadow-2xl ring-1 ring-white/10 group-hover:ring-red-500/50 transition-all">
                <Zap className="w-6 h-6 animate-pulse" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-white text-2xl font-black tracking-tight group-hover:text-red-500 transition-colors">
                Saheer<span className="text-red-500">.</span>
              </span>
              <span className="text-gray-400 text-xs font-medium tracking-widest uppercase">
                Developer
              </span>
            </div>
          </div>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-8">
            <ul className="flex gap-1 bg-white/5 backdrop-blur-sm rounded-full px-2 py-2 border border-white/10">
              {navItems.map(({ label, href, icon: Icon }) => (
                <li key={href}>
                  <a
                    href={href}
                    onClick={(e) => handleLinkClick(e, href)}
                    className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 group ${activeLink === href.slice(1)
                        ? 'text-white bg-red-600/90 shadow-lg shadow-red-900/20'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                  >
                    <Icon size={16} />
                    {label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Social */}
            <div className="flex items-center gap-3">
              <div className="flex gap-2">
                <a
                  href="https://github.com/saheer07"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-red-500/50 hover:bg-red-500/10 transition-all duration-300"
                >
                  <Github size={18} />
                </a>
                <a
                  href="https://www.linkedin.com/in/saheer-chungath-23b44434a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-red-500/50 hover:bg-red-500/10 transition-all duration-300"
                >
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Mobile buttons */}
          <div className="lg:hidden flex items-center gap-3">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-white"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* ✅ Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-black/95 border-l border-white/10 backdrop-blur-xl shadow-2xl z-50 transform transition-transform duration-500 ${isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="p-6 space-y-4 pt-24">
          {navItems.map(({ label, href, icon: Icon }) => (
            <a
              key={href}
              href={href}
              onClick={(e) => handleLinkClick(e, href)}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${activeLink === href.slice(1)
                  ? 'text-white bg-red-600/20 border border-red-500/30'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
            >
              <Icon size={20} />
              <span>{label}</span>
            </a>
          ))}
        </div>

        <div className="pt-6 border-t border-white/10 flex gap-3 px-4 mt-auto mb-8">
          <a
            href="https://github.com/saheer07"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-red-500 hover:bg-red-500/10 transition-all"
          >
            <Github size={18} /> GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/saheer-chungath-23b44434a"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-red-500 hover:bg-red-500/10 transition-all"
          >
            <Linkedin size={18} /> LinkedIn
          </a>
        </div>
      </div>

      {/* Scroll to top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-4 bg-red-600 text-white rounded-2xl shadow-lg shadow-red-900/50 hover:bg-red-700 transition-all duration-300 z-40"
        >
          <ChevronUp size={20} />
        </button>
      )}
    </>
  );
};

export default Navbar;
