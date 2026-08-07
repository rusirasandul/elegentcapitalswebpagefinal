import React, { useState, useEffect, useRef } from 'react';

const AnimatedCounter = ({ target, suffix = '', duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const startTime = Date.now();
          const numericTarget = parseInt(target);

          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(easedProgress * numericTarget));

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration, hasAnimated]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToSection = (id) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header id="home" className="relative min-h-screen pt-32 pb-20 flex flex-col justify-center overflow-hidden bg-transparent">
      
      <div className="container-gc px-4 sm:px-6 lg:px-8 relative z-10 my-auto text-center">
        
        {/* Main Content Container */}
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Hero Main Heading */}
          <h1 className={`text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.12] text-white transition-all duration-1000 drop-shadow-2xl ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            Business Consulting That Turns Ideas Into{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">
              Sustainable Success.
            </span>
          </h1>

          {/* Hero Subtitle */}
          <p className={`text-lg sm:text-xl text-slate-200 max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-200 drop-shadow-lg font-medium ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            Integrated management consulting, financial advisory, tax, ISO compliance, and technology solutions — helping businesses grow with confidence.
          </p>

          {/* Hero Actions */}
          <div className={`flex flex-wrap items-center justify-center gap-4 pt-4 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <button
              onClick={() => scrollToSection('#contact')}
              className="btn-gc-primary group shadow-2xl px-8 py-4 text-base font-bold"
            >
              <span>Book a Free Call</span>
              <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </button>

            <button
              onClick={() => scrollToSection('#services')}
              className="btn-gc-secondary shadow-xl bg-[#0b172a]/70 backdrop-blur-md px-8 py-4 text-base"
            >
              Explore Services
            </button>
          </div>

        </div>

        {/* Hero Bottom Stats Bar */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 mt-24 pt-8 border-t border-slate-800/80 max-w-5xl mx-auto transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {[
            { value: '12', suffix: '+', label: 'Integrated Services', icon: '⚡' },
            { value: '5', suffix: '+', label: 'Lead Consultants', icon: '👥' },
            { value: '100', suffix: '%', label: 'Custom Engagements', icon: '🎯' },
            { value: '4', suffix: '-Step', label: 'Proven Methodology', icon: '⚙️' },
          ].map((stat, idx) => (
            <div key={idx} className="glass-card-gc p-4 sm:p-5 flex items-center justify-center space-x-4 backdrop-blur-2xl bg-[#0b172a]/80 border border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-center text-lg flex-shrink-0">
                {stat.icon}
              </div>
              <div className="text-left">
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xs text-slate-300 font-medium">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </header>
  );
};

export default Hero;
