import React, { useState, useEffect } from 'react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.querySelector('#about');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const values = [
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Excellence",
      description: "We maintain the highest standards in all our consulting services, ensuring exceptional results for our clients."
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      ),
      title: "Integrity",
      description: "We build lasting relationships through honest communication, transparency, and ethical business practices."
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Innovation",
      description: "We leverage cutting-edge strategies and technologies to deliver forward-thinking solutions for modern businesses."
    }
  ];

  const milestones = [
    { year: '2024', event: 'Company Founded', detail: 'Established as a boutique consulting firm' },
    { year: '2024', event: 'First Major Client', detail: 'Secured partnerships with leading businesses' },
    { year: '2025', event: 'Team Expansion', detail: 'Grew to a team of expert consultants' },
    { year: '2025', event: '50+ Projects', detail: 'Milestone of successful project completions' },
  ];

  return (
    <section id="about" className="section-padding-gc bg-transparent relative border-b border-slate-800/80">
      <div className="container-max relative z-10">
        {/* Logo & Branding */}
        <div className="text-center mb-16">
          <div style={{ minHeight: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img
              src={`${process.env.PUBLIC_URL}/images/logo/logo.jpeg`}
              alt="Elegant Capitals Logo"
              className="h-20 max-w-xs object-contain mb-4 rounded-lg"
              style={{ filter: 'drop-shadow(0 0 15px rgba(201, 169, 110, 0.2))' }}
              onLoad={() => console.log('Logo loaded successfully')}
              onError={(e) => {
                console.error('Logo failed to load from:', e.target.src);
                e.target.style.display = 'none';
              }}
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-display gradient-text-white mb-3">
            Elegant Capitals
          </h1>
          <p className="text-champagne-400 text-xl md:text-2xl font-medium mb-2 tracking-wide">
            (PVT) LTD — Business & Financial Consulting
          </p>
          <p className="shimmer-text text-lg md:text-xl font-medium italic mt-4 max-w-2xl mx-auto">
            Your Ambition, Our Precision.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <h2 className="text-3xl md:text-4xl font-bold font-display gradient-text-white mb-6">
              About Elegant Capitals
            </h2>
            <p className="text-lg text-midnight-200 mb-6 leading-relaxed">
              Founded in 2024, Elegant Capitals (PVT) LTD has been at the forefront of business
              and financial consulting, helping organizations navigate complex challenges and
              achieve sustainable growth.
            </p>
            <p className="text-lg text-midnight-200 mb-8 leading-relaxed">
              Our mission is to empower businesses with clarity and confidence through strategic
              guidance, innovative solutions, and unwavering commitment to our clients' success.
            </p>

            {/* Mission Statement */}
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold font-display text-champagne-300 mb-3">Our Mission</h3>
              <p className="text-midnight-200 leading-relaxed">
                To provide exceptional business and financial consulting services that drive
                measurable results and create lasting value for our clients across all industries.
              </p>
            </div>
          </div>

          {/* Timeline */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="relative">
              {/* Timeline Line */}
              <div
                className="absolute left-6 top-0 bottom-0 w-px"
                style={{ background: 'linear-gradient(180deg, rgba(201,169,110,0.5), rgba(201,169,110,0.1))' }}
              ></div>

              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <div
                    key={index}
                    className="relative flex items-start pl-16"
                    style={{
                      transitionDelay: `${index * 150}ms`,
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateX(0)' : 'translateX(20px)',
                      transition: 'all 0.6s ease-out',
                    }}
                  >
                    {/* Timeline Dot */}
                    <div
                      className="absolute left-4 w-5 h-5 rounded-full border-2 border-champagne-500 flex items-center justify-center"
                      style={{ background: '#0c1220', top: '4px' }}
                    >
                      <div className="w-2 h-2 rounded-full bg-champagne-400"></div>
                    </div>

                    <div className="glass-card p-5 w-full">
                      <span className="text-champagne-400 text-sm font-semibold tracking-widest uppercase">{milestone.year}</span>
                      <h4 className="text-white font-semibold font-display text-lg mt-1">{milestone.event}</h4>
                      <p className="text-midnight-300 text-sm mt-1">{milestone.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mt-24">
          <h3 className="text-2xl md:text-3xl font-bold font-display text-center gradient-text-white mb-14">
            Our Core Values
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className={`text-center glass-card p-8 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                style={{
                  transitionDelay: `${index * 200}ms`,
                  transition: 'all 0.6s ease-out',
                }}
              >
                <div className="mb-5 flex justify-center">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-champagne-400"
                    style={{
                      background: 'rgba(201, 169, 110, 0.1)',
                      border: '1px solid rgba(201, 169, 110, 0.2)',
                    }}
                  >
                    {value.icon}
                  </div>
                </div>
                <h4 className="text-xl font-semibold font-display text-white mb-3">
                  {value.title}
                </h4>
                <p className="text-midnight-200 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
