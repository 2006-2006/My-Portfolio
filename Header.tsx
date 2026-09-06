import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = ['home', 'about', 'skills', 'projects', 'education', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <>
      <header className={`fixed top-0 w-full z-40 transition-all duration-500 ${isScrolled
        ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg border-b border-gray-200/30 dark:border-gray-700/30'
        : 'bg-transparent'
        }`}>
        <nav className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Centered Logo - Rugged Premium Style */}
            <div className="flex-1 flex justify-start">
              <div
                className="flex items-center gap-4 cursor-pointer group"
                onClick={() => scrollToSection('home')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    scrollToSection('home');
                  }
                }}
              >
                {/* Rugged Container for Logo */}
                <div className="relative p-2 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-lg group-hover:bg-white/10 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    {/* YV Badge - Pill Shape */}
                    <div className="relative h-9 w-14 rounded-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 flex items-center justify-center p-[1px] shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-shadow duration-300">
                      <div className="absolute inset-0 bg-white/20 animate-shimmer rounded-full"></div>
                      <div className="h-full w-full rounded-full bg-black/10 backdrop-blur-sm flex items-center justify-center relative overflow-hidden">
                        <span className="font-black text-white text-sm tracking-wider z-10" style={{ fontFamily: '"Orbitron", sans-serif' }}>YV</span>
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent rotate-45 animate-shimmer-fast"></div>
                      </div>
                    </div>

                    {/* Name Text */}
                    <span
                      className="text-lg md:text-xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent group-hover:text-white transition-colors duration-300 animate-text-glow"
                      style={{ fontFamily: '"Orbitron", sans-serif', textShadow: '0 0 20px rgba(255,255,255,0.1)' }}
                    >
                      Yogeshwaran V
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Navigation - One UI 8 Style */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-4 py-2 rounded-full font-medium transition-all duration-300 ${activeSection === item.id
                    ? 'text-white bg-gradient-to-r from-cyan-500 to-purple-500 shadow-lg'
                    : 'text-gray-600 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-white/10 dark:hover:bg-gray-800/50 backdrop-blur-sm'
                    }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full animate-pulse"></div>
                  )}
                </button>
              ))}


            </div>

            {/* Mobile Menu Button - One UI 8 Style */}
            <div className="md:hidden flex items-center space-x-2">

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-full bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/50 text-gray-600 dark:text-gray-200 transition-all duration-300"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu - One UI 8 Style */}
          {isMenuOpen && (
            <div className="md:hidden mt-3 py-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/30 dark:border-gray-700/30 animate-slide-down">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left px-4 py-3 mx-2 my-1 rounded-xl transition-all duration-200 ${activeSection === item.id
                    ? 'text-white bg-gradient-to-r from-cyan-500 to-purple-500 shadow-lg'
                    : 'text-gray-600 dark:text-gray-200 hover:bg-white/20 dark:hover:bg-gray-800/50'
                    }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </nav>


      </header>
    </>
  );
};

export default Header;
