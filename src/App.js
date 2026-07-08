import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Team from './components/Team';
import Careers from './components/Careers';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Seo from './components/Seo';
import WhatsAppButton from './components/WhatsAppButton';
import bgImage from './assets/R.jpg';

function App() {
  const [darkMode, setDarkMode] = useState(true); // Default to dark mode

  useEffect(() => {
    // Check for saved theme preference or default to dark mode
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme !== null) {
      setDarkMode(JSON.parse(savedTheme));
    } else {
      setDarkMode(true); // Default to dark mode for new users
    }
  }, []);

  useEffect(() => {
    // Apply dark mode class to document
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Save theme preference
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div 
      className={`min-h-screen ${darkMode ? 'dark' : ''}`}
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <Seo />
      <div className="bg-navy-900 dark:bg-gray-900 text-gray-100 dark:text-white transition-colors duration-300" style={{ backgroundColor: 'rgba(17, 24, 39, 0.3)' }}>
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <Hero />
        <About />
        <Services />
        <Team />
        <Careers />
        <Contact />
        <Footer />
        <WhatsAppButton />
      </div>
    </div>
  );
}

export default App;
