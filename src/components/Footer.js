import React, { useState } from 'react';
import { FaLinkedin, FaInstagram, FaFacebook } from 'react-icons/fa';

const Footer = ({ openModal }) => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState('');

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribeStatus('success');
      setEmail('');
      setTimeout(() => setSubscribeStatus(''), 4000);
    }
  };

  return (
    <footer 
      className="relative text-slate-400 border-t border-slate-800"
      style={{
        background: 'rgba(7, 17, 31, 0.85)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <div className="container-gc px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-600 p-[1px] shadow-md">
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
                  <span className="font-mono font-bold text-white text-xs hidden">
                    EC
                  </span>
                </div>
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Elegant Capitals
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Integrated strategy, financial advisory, ISO 9001 compliance, and technology consulting for growing enterprises across Sri Lanka & APAC.
            </p>

            <div className="flex items-center space-x-3 pt-2">
              <a 
                href="https://www.linkedin.com/company/elegant-capitals"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={16} />
              </a>
              <a 
                href="https://www.instagram.com/elegant_capitals/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram size={16} />
              </a>
              <a 
                href="https://www.facebook.com/elegantcapitals"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook size={16} />
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-widest">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><button onClick={() => scrollToSection('#home')} className="hover:text-blue-400">Home</button></li>
              <li><button onClick={() => scrollToSection('#about')} className="hover:text-blue-400">About</button></li>
              <li><button onClick={() => scrollToSection('#services')} className="hover:text-blue-400">Services</button></li>
              <li><button onClick={() => openModal && openModal('team')} className="hover:text-blue-400">Our Team</button></li>
              <li><button onClick={() => openModal && openModal('careers')} className="hover:text-blue-400">Careers</button></li>
              <li><button onClick={() => scrollToSection('#contact')} className="hover:text-blue-400">Contact</button></li>
            </ul>
          </div>

          {/* Core Services Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-widest">
              Engagements
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><button onClick={() => scrollToSection('#services')} className="hover:text-blue-400">Business Strategy</button></li>
              <li><button onClick={() => scrollToSection('#services')} className="hover:text-blue-400">Financial Advisory</button></li>
              <li><button onClick={() => scrollToSection('#services')} className="hover:text-blue-400">Operations Optimization</button></li>
              <li><button onClick={() => scrollToSection('#services')} className="hover:text-blue-400">Risk Management</button></li>
              <li><button onClick={() => openModal && openModal('team')} className="hover:text-blue-400">Leadership Team</button></li>
            </ul>
          </div>

          {/* Newsletter Form */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-widest">
              Stay Updated
            </h4>
            <p className="text-xs text-slate-400">
              Receive strategic updates and market analysis from our senior partners.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                placeholder="Enter email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input-gc text-xs py-2 px-3"
              />
              <button
                type="submit"
                className="btn-gc-primary w-full text-xs py-2 justify-center"
              >
                Subscribe
              </button>
              {subscribeStatus === 'success' && (
                <span className="text-[10px] text-emerald-400 block font-semibold">✓ Subscribed successfully!</span>
              )}
            </form>
          </div>

        </div>

        {/* Bottom Copyright Strip */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 font-mono">
          <p>© {currentYear} Elegant Capitals (PVT) LTD. All rights reserved.</p>
          <div className="flex space-x-4 mt-2 sm:mt-0">
            <span className="hover:text-slate-200 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-slate-200 cursor-pointer">Terms of Engagement</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
