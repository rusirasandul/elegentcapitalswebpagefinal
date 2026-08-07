import React, { useState, useEffect, useCallback } from 'react';

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      quote: "Elegant Capitals transformed our financial strategy completely. Their team provided insights that helped us secure critical funding and streamline operations. The ROI has been exceptional.",
      rating: 5,
    },
    {
      quote: "Working with Elegant Capitals was a game-changer for our export business. Their strategic planning and market analysis opened doors to international opportunities we hadn't considered.",
      rating: 5,
    },
    {
      quote: "The team's expertise in risk management and compliance gave us the confidence to scale rapidly. Their personalized approach made all the difference in navigating complex regulations.",
      rating: 5,
    },
    {
      quote: "From financial restructuring to operational efficiency, Elegant Capitals delivered outstanding results. Their data-driven approach and commitment to our success sets them apart.",
      rating: 5,
    },
  ];

  const nextTestimonial = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(nextTestimonial, 6000);
    return () => clearInterval(timer);
  }, [nextTestimonial]);

  const StarRating = ({ rating }) => (
    <div className="flex justify-center gap-1.5 mb-6">
      {[...Array(5)].map((_, i) => (
        <span key={i} className="text-amber-400 text-xl">★</span>
      ))}
    </div>
  );

  return (
    <section id="testimonials" className="section-padding-gc bg-transparent relative border-b border-slate-800/80">
      <div className="container-gc">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="eyebrow-tag justify-center mx-auto">
            <span>Client Feedback</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            What Our{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
              Clients Say
            </span>
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg">
            Read direct feedback from organizations we've partnered with.
          </p>
        </div>

        {/* Testimonial Card (Comments Only) */}
        <div className="max-w-3xl mx-auto">
          <div className="glass-card-gc p-8 sm:p-14 relative overflow-hidden border border-slate-800 shadow-2xl text-center">
            
            {/* Quote Mark Decorative */}
            <div className="text-5xl text-blue-400/20 font-serif leading-none mb-4">
              “
            </div>

            {/* Star Rating */}
            <StarRating rating={testimonials[activeIndex].rating} />

            {/* Quote Comment Only */}
            <p className="text-lg sm:text-2xl text-slate-100 leading-relaxed italic font-medium">
              "{testimonials[activeIndex].quote}"
            </p>

          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center mt-8 space-x-6">
            <button
              onClick={prevTestimonial}
              className="p-3 rounded-full bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-all"
              aria-label="Previous Comment"
            >
              ←
            </button>

            <div className="flex space-x-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === activeIndex ? 'w-8 bg-blue-500' : 'w-2 bg-slate-800'
                  }`}
                  aria-label={`Go to comment ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="p-3 rounded-full bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-all"
              aria-label="Next Comment"
            >
              →
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
