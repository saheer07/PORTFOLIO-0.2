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

  const navRef = useRef(null);
  const prevScrollY = useRef(0);

  const navItems = [
    { label: '01. HOME', href: '#home', icon: Home },
    { label: '02. PILOT', href: '#about', icon: User },
    { label: '03. SPECS', href: '#skills', icon: Code },
    { label: '04. LOGS', href: '#projects', icon: FolderOpen },
    { label: '05. COMM', href: '#contact', icon: Mail },
  ];

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
      {/* Navbar */}
      <nav
        ref={navRef}
        className={`fixed top-0 w-full z-50 transition-all duration-500 transform font-['Orbitron'] ${showNavbar ? 'translate-y-0' : '-translate-y-full'
          } ${isScrolled
            ? 'bg-black/60 backdrop-blur-xl border-b border-[#e74c3c]/30 shadow-[0_4px_30px_rgba(231,76,60,0.1)] py-3'
            : 'bg-transparent py-5'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-3 font-bold select-none py-2 text-white">
            <div className="relative group">
              <div className="absolute -inset-1 bg-[#e74c3c] rounded-sm blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative w-12 h-12 bg-black border border-[#e74c3c]/50 rounded-sm flex items-center justify-center text-[#e74c3c] font-extrabold shadow-lg overflow-hidden group-hover:border-[#e74c3c] transition-all">
                <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(231,76,60,0.1)_2px,rgba(231,76,60,0.1)_4px)] z-0"></div>
                <Zap className="w-5 h-5 z-10" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-white text-xl tracking-widest group-hover:text-[#e74c3c] transition-colors drop-shadow-md">
                GTR<span className="text-[#e74c3c]">_</span>PORTFOLIO
              </span>
              <span className="text-[#e74c3c]/70 text-[10px] tracking-[0.3em] uppercase mt-1 border-t border-[#e74c3c]/30 pt-0.5 inline-block">
                Pilot: Saheer
              </span>
            </div>
          </div>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-6">
            <ul className="flex gap-2 bg-black/40 backdrop-blur-md rounded-sm px-2 py-2 border border-[#e74c3c]/20">
              {navItems.map(({ label, href, icon: Icon }) => (
                <li key={href}>
                  <a
                    href={href}
                    onClick={(e) => handleLinkClick(e, href)}
                    className={`relative flex items-center gap-2 px-3 py-1.5 rounded-sm text-[10px] uppercase tracking-widest transition-all duration-300 group ${activeLink === href.slice(1)
                        ? 'text-white bg-[#e74c3c]/80 shadow-[0_0_15px_rgba(231,76,60,0.5)] border border-[#e74c3c]'
                        : 'text-gray-400 border border-transparent hover:text-white hover:bg-[#e74c3c]/20 hover:border-[#e74c3c]/50'
                      }`}
                  >
                    <Icon size={14} className={activeLink === href.slice(1) ? "text-white" : "text-[#e74c3c]"} />
                    {label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Social */}
            <div className="flex items-center gap-2">
              <a
                href="https://github.com/saheer07"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-sm bg-black/40 border border-[#e74c3c]/30 text-gray-400 hover:text-white hover:border-[#e74c3c] hover:bg-[#e74c3c]/20 hover:shadow-[0_0_10px_rgba(231,76,60,0.5)] transition-all duration-300"
              >
                <Github size={16} />
              </a>
              <a
                href="https://www.linkedin.com/in/saheer-chungath-23b44434a"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-sm bg-black/40 border border-[#e74c3c]/30 text-gray-400 hover:text-white hover:border-[#e74c3c] hover:bg-[#e74c3c]/20 hover:shadow-[0_0_10px_rgba(231,76,60,0.5)] transition-all duration-300"
              >
                <Linkedin size={16} />
              </a>
            </div>
          </div>

          {/* Mobile buttons */}
          <div className="lg:hidden flex items-center gap-3">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-sm bg-black/50 border border-[#e74c3c]/30 text-[#e74c3c]"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* ✅ Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-[#050505]/95 border-l border-[#e74c3c]/30 backdrop-blur-xl shadow-[-10px_0_30px_rgba(231,76,60,0.1)] z-40 transform transition-transform duration-500 font-['Orbitron'] ${isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="absolute inset-0 bg-[repeating-linear-gradient(to_bottom,transparent_0px,transparent_2px,rgba(255,255,255,0.02)_2px,rgba(255,255,255,0.02)_4px)] pointer-events-none z-[-1]" />
        
        <div className="p-6 space-y-4 pt-24 relative z-10">
          {navItems.map(({ label, href, icon: Icon }) => (
            <a
              key={href}
              href={href}
              onClick={(e) => handleLinkClick(e, href)}
              className={`flex items-center gap-4 px-4 py-3 rounded-sm text-xs tracking-widest transition-all duration-300 uppercase ${activeLink === href.slice(1)
                  ? 'text-white bg-[#e74c3c]/30 border-l-4 border-[#e74c3c] shadow-[inset_10px_0_20px_rgba(231,76,60,0.2)]'
                  : 'text-gray-400 hover:text-white hover:bg-[#e74c3c]/10 border-l-4 border-transparent hover:border-[#e74c3c]/50'
                }`}
            >
              <Icon size={16} className="text-[#e74c3c]" />
              <span>{label}</span>
            </a>
          ))}
        </div>

        <div className="pt-6 border-t border-[#e74c3c]/20 flex gap-3 px-4 mt-auto mb-8 relative z-10">
          <a
            href="https://github.com/saheer07"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-sm bg-black/40 border border-[#e74c3c]/30 text-gray-400 text-xs tracking-wider hover:text-white hover:border-[#e74c3c] hover:bg-[#e74c3c]/20 transition-all uppercase"
          >
            <Github size={14} /> GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/saheer-chungath-23b44434a"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-sm bg-black/40 border border-[#e74c3c]/30 text-gray-400 text-xs tracking-wider hover:text-white hover:border-[#e74c3c] hover:bg-[#e74c3c]/20 transition-all uppercase"
          >
            <Linkedin size={14} /> LinkedIn
          </a>
        </div>
      </div>

      {/* Scroll to top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-[#e74c3c]/20 backdrop-blur-md border border-[#e74c3c] text-white rounded-sm shadow-[0_0_15px_rgba(231,76,60,0.5)] hover:bg-[#e74c3c]/50 transition-all duration-300 z-40 group"
        >
          <ChevronUp size={24} className="group-hover:-translate-y-1 transition-transform" />
        </button>
      )}
    </>
  );
};

export default Navbar;
