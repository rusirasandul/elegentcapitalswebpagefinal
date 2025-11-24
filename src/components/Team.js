import React, { useState, useEffect } from 'react';
import { FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa';

const Team = () => {
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

    const element = document.querySelector('#team');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const teamMembers = [
    {
      name: "Tharushi Boteju",
      position: "CEO & Managing Partner",
      bio: "BBNS: MI& SC (Victoria University), AAT Passed Finalist, Part Qualified ICASL, DICA(ESOFT)",
      expertise: ["Strategic Planning", "Financial Advisory", "Leadership"],
      image: `${process.env.PUBLIC_URL}/images/team/tharushi.jpg`, // Local image path - add your photo to public/images/team/
      social: {
        linkedin: "https://linkedin.com/in/tharushi-boteju",
        instagram: "https://instagram.com/tharushi_boteju",
        email: "tharushi@elegantcapitals.com"
      }
    },
    {
      name: "Heshan Gajanayake",
      position: "Director & Managing Partner",
      bio: "LLB: Bachelor of Laws (UOL), AAT Passed Finalist, Certificate course in Computer Science(NIBM)",
      expertise: ["Financial Planning", "Risk Management", "Investment Analysis"],
      image: `${process.env.PUBLIC_URL}/images/team/0C8A6410.JPG`, // Local image path - add your photo to public/images/team/
      social: {
        linkedin: "http://www.linkedin.com/in/heshan-gajanayake-a8185338a",
        instagram: "https://www.instagram.com/heshan_gajanayake/",
        email: "elegantcapitals.heshan@gmail.com"
      }
    },
    /*{
      name: "Hirantha Weerasinghe",
      position: "Business Development Manager",
      bio: "BSc in BM Logistics Mgt. (Special),Dip. in Digital Mrkt. (SL)",
      expertise: ["Operations Management", "Process Improvement", "Efficiency Analysis"],
      image: `${process.env.PUBLIC_URL}/images/team/hirantha.jpg`, // Local image path - add your photo to public/images/team/
      social: {
        linkedin: "https://linkedin.com/in/emily-rodriguez-ops",
        instagram: "https://instagram.com/emilyrodriguez_ops",
        email: "emily@elegantcapitals.com"
      }
    },*/
    {
      name: "Rusira Sandul",
      position: "Brand Visibility Manager",
      bio: "Bsc(Hons) Computer Science (University of Westminster UK), Bsc Physical Science (University of Sri Jayewardenepura)",
      expertise: ["Web Development", "Backend Development", "Full Stack Development" ,"Degital Marketing"],
      image: `${process.env.PUBLIC_URL}/images/team/rusira.jpg`, // Local image path - add your photo to public/images/team/
      social: {
        linkedin: "www.linkedin.com/in/rusira-sandul-b6bb87292",
        instagram: "https://www.instagram.com/hwrs_2249?igsh=ZnI1ZzRuam92Y2xp&utm_source=qr",
        email: "elegantcapitals.rusiras@gmail.com"
      }
    },
    
  ];

  return (
    <section id="team" className="section-padding bg-black">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 
            className={`text-3xl md:text-4xl font-bold text-navy-800 dark:text-white mb-6 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            Meet Our Team
          </h2>
          <p 
            className={`text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            Our team of experienced professionals brings together diverse expertise and a shared 
            commitment to delivering exceptional results for our clients.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div 
              key={index}
              className={`bg-white dark:bg-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{transitionDelay: `${index * 100}ms`}}
            >
              {/* Image */}
              <div className="relative h-96 overflow-hidden bg-gray-200 dark:bg-gray-600">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-navy-800 dark:text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-gold-500 font-medium mb-3">
                  {member.position}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  {member.bio}
                </p>

                {/* Expertise Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {member.expertise.map((skill, skillIndex) => (
                    <span 
                      key={skillIndex}
                      className="px-3 py-1 bg-navy-100 dark:bg-navy-600 text-navy-800 dark:text-white text-xs rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Social Media Links */}
                <div className="flex justify-center space-x-4">
                  <a 
                    href={member.social.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-navy-600 dark:text-navy-400 hover:text-navy-800 dark:hover:text-white transition-colors duration-300"
                    aria-label={`${member.name} LinkedIn`}
                  >
                    <FaLinkedin size={20} />
                  </a>
                  <a 
                    href={member.social.instagram} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-navy-600 dark:text-navy-400 hover:text-navy-800 dark:hover:text-white transition-colors duration-300"
                    aria-label={`${member.name} Instagram`}
                  >
                    <FaInstagram size={20} />
                  </a>
                  <a 
                    href={`mailto:${member.social.email}`}
                    className="text-navy-600 dark:text-navy-400 hover:text-navy-800 dark:hover:text-white transition-colors duration-300"
                    aria-label={`Email ${member.name}`}
                  >
                    <FaEnvelope size={20} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Team Stats */}
        <div 
          className={`mt-16 grid grid-cols-1 md:grid-cols-4 gap-8 transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-navy-800 dark:text-white mb-2">25+</div>
            <div className="text-gray-600 dark:text-gray-300">Team Members</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-navy-800 dark:text-white mb-2">15+</div>
            <div className="text-gray-600 dark:text-gray-300">Years Average Experience</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-navy-800 dark:text-white mb-2">50+</div>
            <div className="text-gray-600 dark:text-gray-300">Certifications</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-navy-800 dark:text-white mb-2">100%</div>
            <div className="text-gray-600 dark:text-gray-300">Client Focused</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
