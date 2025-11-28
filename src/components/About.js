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
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Excellence",
      description: "We maintain the highest standards in all our consulting services, ensuring exceptional results for our clients."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      ),
      title: "Integrity",
      description: "We build lasting relationships through honest communication, transparency, and ethical business practices."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Innovation",
      description: "We leverage cutting-edge strategies and technologies to deliver forward-thinking solutions for modern businesses."
    }
  ];

  return (
    <section id="about" className="section-padding bg-black">
      <div className="container-max">
        {/* Logo at top */}
        <div className="text-center mb-12">
          <div style={{minHeight: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <img 
              src={`${process.env.PUBLIC_URL}/images/logo/logo.jpeg`}
              alt="Elegant Capitals Logo" 
              className="h-24 max-w-xs object-contain mb-4"
              onLoad={() => console.log('Logo loaded successfully')}
              onError={(e) => {
                console.error('Logo failed to load from:', e.target.src);
                e.target.style.display = 'none';
              }}
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Elegant Capitals
          </h1>
          <p className="text-gold-400 text-xl md:text-2xl font-semibold mb-3">
            (PVT) LTD - Business & Financial Consulting
          </p>
          <p className="text-gold-300 text-lg md:text-xl font-medium italic mt-4 max-w-2xl mx-auto">
            Your Ambition, Our Precition.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-white dark:text-white mb-6">
              About Elegant Capitals
            </h2>
            <p className="text-lg text-gray-200 dark:text-gray-300 mb-6">
              Founded in 2024, Elegant Capitals (PVT) LTD has been at the forefront of business 
              and financial consulting, helping organizations navigate complex challenges and 
              achieve sustainable growth.
            </p>
            <p className="text-lg text-gray-200 dark:text-gray-300 mb-8">
              Our mission is to empower businesses with clarity and confidence through strategic 
              guidance, innovative solutions, and unwavering commitment to our clients' success.
            </p>
            
            {/* Mission Statement */}
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-3">Our Mission</h3>
              <p className="text-gray-200">
                To provide exceptional business and financial consulting services that drive 
                measurable results and create lasting value for our clients across all industries.
              </p>
            </div>
          </div>

          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="relative">
              <div className="bg-gradient-to-br from-black to-gray-800 rounded-lg p-8 text-white border border-gray-700">
                <h3 className="text-2xl font-bold mb-4 text-gold-400">Years of Excellence</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-gold-400 rounded-full mr-3"></div>
                    <span>Strategic Business Planning</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-gold-400 rounded-full mr-3"></div>
                    <span>Financial Advisory Services</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-gold-400 rounded-full mr-3"></div>
                    <span>Operations Optimization</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-gold-400 rounded-full mr-3"></div>
                    <span>Risk Management</span>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gold-400 rounded-full flex items-center justify-center animate-pulse">
                <span className="text-navy-800 font-bold text-xl">50+</span>
              </div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-black border-2 border-gold-400 rounded-full flex items-center justify-center animate-pulse" style={{animationDelay: '1s'}}>
                <span className="text-white font-bold text-xs">100%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mt-16">
          <h3 className="text-2xl md:text-3xl font-bold text-center text-white mb-12">
            Our Core Values
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className={`text-center p-6 bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{transitionDelay: `${index * 200}ms`}}
              >
                <div className="text-gold-400 mb-4 flex justify-center">
                  {value.icon}
                </div>
                <h4 className="text-xl font-semibold text-white mb-3">
                  {value.title}
                </h4>
                <p className="text-gray-200">
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
