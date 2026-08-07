import React from 'react';
import { FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa';

const Team = ({ onClose }) => {
  const teamMembers = [
    {
      name: "Tharushi Boteju",
      position: "CEO & Managing Partner",
      bio: "BBNS: MI & SC (Victoria University), AAT Passed Finalist, Part Qualified ICASL, DICA(ESOFT)",
      expertise: ["Strategic Planning", "Financial Advisory", "Leadership"],
      image: `${process.env.PUBLIC_URL}/images/team/tharushi.jpg`,
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
      image: `${process.env.PUBLIC_URL}/images/team/0C8A6410.JPG`,
      social: {
        linkedin: "http://www.linkedin.com/in/heshan-gajanayake-a8185338a",
        instagram: "https://www.instagram.com/heshan_gajanayake/",
        email: "elegantcapitals.heshan@gmail.com"
      }
    },
    {
      name: "Rusira Sandul",
      position: "Brand Visibility Manager",
      bio: "BSc (Hons) Computer Science (University of Westminster UK), BSc Physical Science (University of Sri Jayewardenepura)",
      expertise: ["Web Development", "Backend Development", "Full Stack Development", "Digital Marketing"],
      image: `${process.env.PUBLIC_URL}/images/team/rusira.jpg`,
      social: {
        linkedin: "https://www.linkedin.com/in/rusira-sandul-b6bb87292",
        instagram: "https://www.instagram.com/hwrs_2249",
        email: "elegantcapitals.rusiras@gmail.com"
      }
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#07111f]/95 backdrop-blur-2xl p-4 sm:p-8 animate-in fade-in duration-300">
      
      {/* Top Navigation / Close Bar */}
      <div className="container-gc flex items-center justify-between py-4 border-b border-slate-800 mb-8">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600/30 border border-blue-500/40 flex items-center justify-center font-mono font-bold text-white text-xs">
            EC
          </div>
          <span className="text-lg font-bold text-white tracking-tight">
            Our Leadership & Team
          </span>
        </div>

        <button
          onClick={onClose}
          className="p-2.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-all group flex items-center space-x-2"
          aria-label="Close modal"
        >
          <span className="text-xs font-semibold px-1">Close Page</span>
          <span className="text-sm font-bold group-hover:rotate-90 transition-transform">✕</span>
        </button>
      </div>

      <div className="container-gc py-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="eyebrow-tag justify-center mx-auto">
            <span>Our People</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Meet the Experts Behind{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
              Elegant Capitals
            </span>
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg">
            Our team of experienced professionals brings together diverse expertise and a shared commitment to delivering exceptional results for our clients.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="glass-card-gc overflow-hidden border border-slate-800 hover:border-blue-500/40 transition-all flex flex-col justify-between"
            >
              {/* Image */}
              <div className="relative h-80 overflow-hidden bg-slate-900">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07111f] via-transparent to-transparent"></div>

                <div className="absolute bottom-4 left-6 right-6">
                  <h3 className="text-xl font-bold text-white mb-0.5">
                    {member.name}
                  </h3>
                  <p className="text-xs font-semibold text-blue-400 font-mono">
                    {member.position}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <p className="text-slate-300 text-xs leading-relaxed">
                  {member.bio}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {member.expertise.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-2.5 py-1 text-[10px] rounded-full font-medium bg-slate-800/80 text-blue-300 border border-slate-700/80"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="px-6 py-4 border-t border-slate-800/80 flex items-center justify-center space-x-6">
                <a
                  href={member.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-blue-400 transition-colors"
                  aria-label={`${member.name} LinkedIn`}
                >
                  <FaLinkedin size={18} />
                </a>
                <a
                  href={member.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-blue-400 transition-colors"
                  aria-label={`${member.name} Instagram`}
                >
                  <FaInstagram size={18} />
                </a>
                <a
                  href={`mailto:${member.social.email}`}
                  className="text-slate-400 hover:text-blue-400 transition-colors"
                  aria-label={`Email ${member.name}`}
                >
                  <FaEnvelope size={18} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Team Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            { value: '25+', label: 'Team Members' },
            { value: '15+', label: 'Years Avg. Experience' },
            { value: '50+', label: 'Certifications' },
            { value: '100%', label: 'Client Focused' },
          ].map((stat, index) => (
            <div key={index} className="text-center glass-card-gc py-6 px-4 border border-slate-800">
              <div className="text-2xl md:text-3xl font-extrabold font-mono text-white mb-1">{stat.value}</div>
              <div className="text-slate-400 text-xs uppercase tracking-wider font-semibold">{stat.label}</div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Team;
