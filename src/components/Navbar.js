import React, { useState, useEffect } from 'react';

const Navbar = ({ openModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home', type: 'scroll' },
    { name: 'About', href: '#about', type: 'scroll' },
    { name: 'Services', href: '#services', type: 'scroll' },
    { name: 'Team', type: 'modal', modalKey: 'team' },
    { name: 'Careers', type: 'modal', modalKey: 'careers' },
    { name: 'Contact', href: '#contact', type: 'scroll' },
  ];

  const handleNavClick = (item) => {
    if (item.type === 'modal') {
      openModal(item.modalKey);
    } else {
      const element = document.querySelector(item.href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed w-full z-40 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-[#07111f]/85 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="container-gc px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          
          {/* Logo & Brand */}
          <div 
            className="flex items-center space-x-3 group cursor-pointer" 
            onClick={() => handleNavClick({ href: '#home', type: 'scroll' })}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-600 p-[1px] shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[#07111f] rounded-[11px] flex items-center justify-center overflow-hidden">
                <img 
                  src={`${process.env.PUBLIC_URL}/images/logo/logo.jpeg`} 
                  alt="Elegant Capitals Logo" 
                  className="w-full h-full object-cover rounded-[11px]"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
                <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300 text-base font-mono hidden">
                  EC
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors">
                Elegant Capitals
              </span>
              <span className="text-[10px] text-slate-400 tracking-widest uppercase font-medium -mt-1">
                Consulting Group
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1 bg-slate-900/60 backdrop-blur-lg border border-slate-800/80 rounded-full px-4 py-1.5 shadow-inner">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item)}
                className="text-slate-300 hover:text-white px-4 py-1.5 text-xs font-semibold transition-all rounded-full hover:bg-slate-800/60"
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Right CTA Button */}
          <div className="hidden lg:flex items-center">
            <button
              onClick={() => handleNavClick({ href: '#contact', type: 'scroll' })}
              className="btn-gc-primary group text-xs sm:text-sm px-6 py-2.5"
            >
              <span>Book a Free Call</span>
              <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-200 hover:text-white transition-colors"
            aria-label="Toggle Navigation"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-3 p-4 bg-[#0b172a]/95 backdrop-blur-2xl border border-slate-800/90 rounded-2xl space-y-2 shadow-2xl animate-in fade-in slide-in-from-top-2">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item)}
                className="block w-full text-left px-4 py-2.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-xl transition-colors"
              >
                {item.name}
              </button>
            ))}
            <div className="pt-2 border-t border-slate-800/80">
              <button
                onClick={() => handleNavClick({ href: '#contact', type: 'scroll' })}
                className="btn-gc-primary w-full text-sm py-3 justify-center"
              >
                <span>Book a Free Call</span>
                <span className="ml-2">→</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
