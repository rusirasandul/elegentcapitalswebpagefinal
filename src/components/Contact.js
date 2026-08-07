import React, { useState, useEffect } from 'react';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.querySelector('#contact');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Create mailto link with form data
    const recipient = 'elegantcapitals.tharushi@gmail.com';
    const subject = encodeURIComponent(`Contact Form: Message from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n\n` +
      `Message:\n${formData.message}`
    );

    // Open default email client
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;

    // Show success message
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });

      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus(''), 3000);
    }, 500);
  };

  const contactInfo = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Address",
      details: "60A Pagoda Road, Nugegoda."
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: "Phone",
      details: "+94 71 154 5460"
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Email",
      details: "elegantcapitals.tharushi@gmail.com"
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Business Hours",
      details: "Mon - Fri: 9:00 AM - 6:00 PM"
    }
  ];

  return (
    <section id="contact" className="section-padding-gc bg-transparent relative border-b border-slate-800/80">
      <div className="container-max relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span
            className={`text-champagne-500 text-sm font-semibold tracking-[0.2em] uppercase mb-4 block transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
          >
            Reach Out
          </span>
          <h2
            className={`text-3xl md:text-4xl lg:text-5xl font-bold font-display gradient-text-white mb-6 transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
          >
            Get In Touch
          </h2>
          <p
            className={`text-lg text-midnight-200 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
          >
            Ready to transform your business? Contact us today to discuss how our consulting
            services can help you achieve your goals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div
            className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
          >
            <div className="glass-card p-8">
              <h3 className="text-2xl font-semibold font-display text-white mb-6">
                Send us a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-medium text-midnight-200 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="premium-input"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-sm font-medium text-midnight-200 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="premium-input"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-sm font-medium text-midnight-200 mb-2">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="premium-input"
                    placeholder="Tell us about your business needs..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed py-4"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>

                {submitStatus === 'success' && (
                  <div
                    className="p-4 rounded-lg text-sm"
                    style={{
                      background: 'rgba(34, 197, 94, 0.1)',
                      border: '1px solid rgba(34, 197, 94, 0.2)',
                      color: '#86efac',
                    }}
                  >
                    Thank you! Your message has been sent successfully. We'll get back to you soon.
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div
            className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
          >
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold font-display text-white mb-4">
                  Contact Information
                </h3>
                <p className="text-midnight-200 mb-8 leading-relaxed">
                  We're here to help you succeed. Reach out to us through any of the following channels.
                </p>
              </div>

              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div
                    key={index}
                    className="glass-card flex items-start space-x-4 p-5 group"
                    style={{
                      transitionDelay: `${index * 100}ms`,
                    }}
                  >
                    <div
                      className="flex-shrink-0 mt-0.5 w-10 h-10 rounded-lg flex items-center justify-center text-champagne-400 transition-all duration-300 group-hover:scale-110"
                      style={{
                        background: 'rgba(201, 169, 110, 0.1)',
                        border: '1px solid rgba(201, 169, 110, 0.15)',
                      }}
                    >
                      {info.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold font-display text-white text-sm mb-1">
                        {info.title}
                      </h4>
                      <p className="text-midnight-200 text-sm">
                        {info.details}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Media Links */}
              <div className="pt-6">
                <h4 className="text-lg font-semibold font-display text-white mb-5">
                  Follow Us
                </h4>
                <div className="flex space-x-3">
                  {[
                    {
                      name: 'LinkedIn',
                      icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
                      url: 'https://www.linkedin.com/company/elegant-capitals'
                    },
                    {
                      name: 'Instagram',
                      icon: 'M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5zm8.75 2a1 1 0 110 2 1 1 0 010-2zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z',
                      url: 'https://www.instagram.com/elegant_capitals/'
                    },
                    {
                      name: 'Facebook',
                      icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
                      url: 'https://www.facebook.com/elegantcapitals'
                    }
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-midnight-300 transition-all duration-300 hover:text-champagne-300 hover:scale-110"
                      style={{
                        background: 'rgba(26, 35, 64, 0.6)',
                        border: '1px solid rgba(201, 169, 110, 0.12)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(201, 169, 110, 0.15)';
                        e.currentTarget.style.borderColor = 'rgba(201, 169, 110, 0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(26, 35, 64, 0.6)';
                        e.currentTarget.style.borderColor = 'rgba(201, 169, 110, 0.12)';
                      }}
                      aria-label={social.name}
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d={social.icon} />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
