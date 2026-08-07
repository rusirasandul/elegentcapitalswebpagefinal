import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Team from './components/Team';
import Careers from './components/Careers';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Seo from './components/Seo';
import WhatsAppButton from './components/WhatsAppButton';

function App() {
  const [activeModal, setActiveModal] = useState(null);

  const openModal = (key) => {
    setActiveModal(key);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <div className="min-h-screen bg-[#07111f] text-slate-100 font-sans selection:bg-blue-500 selection:text-white relative">
      
      {/* Global Fixed Background Image & Overlays */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Colombo Skyline Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center filter blur-[1.5px] scale-105 opacity-65 transition-all duration-1000"
          style={{ 
            backgroundImage: `url(${process.env.PUBLIC_URL}/images/hero/colombo-sri-lanka.jpg)` 
          }}
        ></div>
        {/* Dark Ambient Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#07111f]/65 via-[#07111f]/50 to-[#07111f]/90"></div>
        {/* Ambient Glow Orbs */}
        <div className="decor-orb-1 opacity-25"></div>
        <div className="decor-orb-2 opacity-25"></div>
        <div className="decor-orb-3 opacity-25"></div>
        {/* Noise Overlay */}
        <div className="absolute inset-0 noise-overlay opacity-40"></div>
      </div>

      {/* Main Page Content Flow (Team & Careers removed from body flow) */}
      <div className="relative z-10">
        <Seo />
        <Navbar openModal={openModal} />
        <main>
          <Hero />
          <About />
          <Services />
          <Testimonials />
          <Contact />
        </main>
        <Footer openModal={openModal} />
        <WhatsAppButton />
      </div>

      {/* Full-Page Overlay Modals for Team & Careers */}
      {activeModal === 'team' && (
        <Team onClose={closeModal} />
      )}

      {activeModal === 'careers' && (
        <Careers onClose={closeModal} />
      )}

    </div>
  );
}

export default App;
