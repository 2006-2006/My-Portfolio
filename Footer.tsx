import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, MapPin, Send, User } from 'lucide-react';
import { portfolioData } from './portfolioData';

const Footer: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);
  const form = useRef<HTMLFormElement>(null);

  const bio = portfolioData.bio;

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.current) return;

    const formData = new FormData(form.current);
    const name = formData.get('user_name') as string;
    const email = formData.get('user_email') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;

    const whatsappMessage = `*New Message from Portfolio*\n\n*Name:* ${name}\n*Email:* ${email}\n*Subject:* ${subject}\n*Message:* ${message}`;

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);

    // Redirect to WhatsApp
    window.open(`https://wa.me/${bio.phone.replace(/[^0-9]/g, '')}?text=${encodedMessage}`, '_blank');

    // Optional: Reset form
    form.current.reset();
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: bio.github,
      color: 'from-gray-700 to-gray-900',
      hoverColor: 'hover:from-gray-600 hover:to-gray-800',
      description: 'View my code repositories',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: bio.linkedin,
      color: 'from-blue-600 to-blue-800',
      hoverColor: 'hover:from-blue-500 hover:to-blue-700',
      description: 'Connect professionally',
    },
  ];

  return (
    <footer
      id="contact"
      ref={footerRef}
      className="bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-full animate-float-slow"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-r from-purple-400/5 to-pink-400/5 rounded-full animate-float-reverse"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-gradient-to-r from-cyan-400/5 to-blue-400/5 rounded-full animate-float-diagonal"></div>

        {/* Floating particles */}
        <div className="absolute top-20 left-1/3 w-2 h-2 bg-cyan-400/40 rounded-full animate-particle-float"></div>
        <div className="absolute bottom-32 left-1/4 w-1 h-1 bg-purple-400/40 rounded-full animate-particle-float-delay"></div>
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-pink-400/40 rounded-full animate-particle-float-reverse"></div>
      </div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        {/* Main Footer Content - Get In Touch */}
        <div className="mb-20">
          <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'}`}>
            <h4 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-section-title">
              Get In Touch
            </h4>
            <p className="text-blue-200 text-lg">
              Feel free to reach out for collaborations, questions, or just to say hello!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Left Column - Contact Info */}
            <div className={`space-y-8 transition-all duration-1000 delay-200 ${isVisible ? 'animate-slide-in-left' : 'opacity-0 -translate-x-8'}`}>
              <div>
                <h5
                  className="text-2xl font-bold mb-6 flex items-center gap-3 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-flow"
                  style={{ fontFamily: '"Orbitron", sans-serif' }}
                >
                  Contact Information
                  <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                </h5>

                <div className="space-y-5">
                  {/* Email Card */}
                  <div className="group flex items-center gap-5 p-5 bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl hover:border-slate-700 hover:bg-slate-900 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/10 hover:-translate-y-1">
                    <div className="w-14 h-14 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-pink-500/20 group-hover:scale-110 transition-transform duration-300">
                      <Mail className="w-7 h-7 text-white" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-sm text-slate-400 font-medium mb-1 tracking-wide">Email</p>
                      <a href={`mailto:${bio.email}`} className="text-lg text-white font-bold hover:text-pink-400 transition-colors truncate block">
                        {bio.email}
                      </a>
                    </div>
                  </div>

                  {/* Location Card */}
                  <div className="group flex items-center gap-5 p-5 bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl hover:border-slate-700 hover:bg-slate-900 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10 hover:-translate-y-1">
                    <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform duration-300">
                      <MapPin className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-400 font-medium mb-1 tracking-wide">Location</p>
                      <p className="text-lg text-white font-bold leading-tight">{bio.location}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links Footer */}
              <div>
                <h5 className="text-xl font-bold mb-6 flex items-center gap-3 text-blue-300">
                  Connect Online
                </h5>
                <div className="flex flex-wrap gap-4">
                  {socialLinks.map((social, sid) => {
                    const SocialIcon = social.icon;
                    return (
                      <a
                        key={sid}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group relative p-4 bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/50 shadow-lg`}
                      >
                        <div className={`absolute inset-0 bg-gradient-to-br ${social.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
                        <SocialIcon className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />

                        {/* Social Tooltip */}
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1 bg-slate-800 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap border border-slate-700">
                          {social.label}
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column - Message Form */}
            <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'animate-slide-in-right' : 'opacity-0 translate-x-8'}`}>
              <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                {/* Form Background Highlight */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-colors duration-700"></div>

                <h5 className="text-2xl font-bold mb-8 flex items-center gap-3">
                  <Send className="w-6 h-6 text-blue-400 animate-pulse" />
                  Direct Message
                </h5>

                <form ref={form} onSubmit={sendMessage} className="space-y-5 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-400 ml-1">Your Name</label>
                      <div className="relative group/input">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within/input:text-blue-400 transition-colors" />
                        <input
                          type="text"
                          name="user_name"
                          required
                          placeholder="John Doe"
                          className="w-full pl-12 pr-4 py-4 bg-slate-950/50 border border-slate-800 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-slate-600"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-400 ml-1">Email Address</label>
                      <div className="relative group/input">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within/input:text-pink-400 transition-colors" />
                        <input
                          type="email"
                          name="user_email"
                          required
                          placeholder="john@example.com"
                          className="w-full pl-12 pr-4 py-4 bg-slate-950/50 border border-slate-800 rounded-2xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all placeholder:text-slate-600"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400 ml-1">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      required
                      placeholder="Project Collaboration"
                      className="w-full px-4 py-4 bg-slate-950/50 border border-slate-800 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all placeholder:text-slate-600"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400 ml-1">Message</label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      placeholder="Your message here..."
                      className="w-full px-4 py-4 bg-slate-950/50 border border-slate-800 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none placeholder:text-slate-600"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-purple-500/20 hover:shadow-purple-500/40 hover:-translate-y-1 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden group/btn"
                  >
                    Send Message
                    <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
