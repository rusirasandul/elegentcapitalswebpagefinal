import React, { useState, useEffect } from 'react';

const Careers = ({ onClose }) => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    coverLetter: '',
    resume: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/careers');
      const data = await response.json();
      if (data.success) {
        setJobs(data.jobs.filter(job => job.status === 'active'));
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      resume: e.target.files[0]
    }));
  };

  const handleApply = (job) => {
    setSelectedJob(job);
    setShowApplicationForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      const applicationData = {
        jobId: selectedJob.id,
        jobTitle: selectedJob.title,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        coverLetter: formData.coverLetter,
        resumeName: formData.resume ? formData.resume.name : ''
      };

      const response = await fetch('http://localhost:5000/api/careers/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(applicationData),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', coverLetter: '', resume: null });
        setTimeout(() => {
          setShowApplicationForm(false);
          setSubmitStatus('');
        }, 3000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Application error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#07111f]/95 backdrop-blur-2xl p-4 sm:p-8 animate-in fade-in duration-300">
      
      {/* Top Bar */}
      <div className="container-gc flex items-center justify-between py-4 border-b border-slate-800 mb-8">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600/30 border border-blue-500/40 flex items-center justify-center font-mono font-bold text-white text-xs">
            EC
          </div>
          <span className="text-lg font-bold text-white tracking-tight">
            Careers & Opportunities
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
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="eyebrow-tag justify-center mx-auto">
            <span>Join Our Team</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Explore Career Opportunities at{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
              Elegant Capitals
            </span>
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg">
            Be part of a high-impact team shaping the future of management consulting, finance, and technology.
          </p>
        </div>

        {/* Job Listings / Empty State */}
        {jobs.length === 0 ? (
          <div className="text-center max-w-xl mx-auto">
            <div className="glass-card-gc p-10 border border-slate-800 text-center">
              <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-3xl text-blue-400">
                💼
              </div>
              <h3 className="text-xl font-bold text-white mb-3">No Active Openings Currently</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                We are always seeking talented strategy consultants, financial analysts, and full-stack software engineers. Submit your resume directly to our talent acquisition team.
              </p>
              <a
                href="mailto:tharushi@elegantcapitals.com"
                className="btn-gc-primary text-xs inline-flex py-3 px-8"
              >
                <span>Send Resume to tharushi@elegantcapitals.com</span>
                <span className="ml-2">→</span>
              </a>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {jobs.map((job) => (
              <div key={job.id} className="glass-card-gc p-7 flex flex-col justify-between border border-slate-800">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-white">{job.title}</h3>
                    <span className="px-3 py-1 text-[10px] font-mono font-semibold rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                      {job.type}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed mb-6">{job.description}</p>
                </div>
                <button
                  onClick={() => handleApply(job)}
                  className="btn-gc-primary text-xs py-3 justify-center w-full"
                >
                  Apply Now →
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Application Modal Inner */}
        {showApplicationForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
            <div className="glass-card-gc p-8 max-w-xl w-full border border-slate-700 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">Apply for {selectedJob?.title}</h3>
                <button 
                  onClick={() => setShowApplicationForm(false)}
                  className="text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="input-gc"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="input-gc"
                    placeholder="name@company.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="input-gc"
                    placeholder="+94 77 123 4567"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Resume / CV (PDF or DOCX)</label>
                  <input
                    type="file"
                    name="resume"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    className="input-gc text-xs text-slate-300 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-600/30 file:text-blue-300 hover:file:bg-blue-600/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Cover Letter *</label>
                  <textarea
                    name="coverLetter"
                    value={formData.coverLetter}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="input-gc"
                    placeholder="Brief introduction..."
                  />
                </div>

                {submitStatus === 'success' && (
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold text-center">
                    ✓ Application submitted successfully!
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold text-center">
                    ✕ Error submitting application. Please try emailing us directly.
                  </div>
                )}

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowApplicationForm(false)}
                    className="btn-gc-secondary text-xs flex-1 py-2.5 justify-center"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-gc-primary text-xs flex-1 py-2.5 justify-center"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Careers;
