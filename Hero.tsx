import React, { useEffect, useState } from 'react';
import { ChevronDown, Download, ExternalLink, Brain, Cpu, Network } from 'lucide-react';
import { portfolioData } from './portfolioData';

const Hero: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-slate-50 to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 relative overflow-hidden animate-section-pop">
      {/* AI Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating AI Elements */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-pink-400/5 to-purple-400/5 rounded-full animate-float">
          <Brain className="w-8 h-8 text-purple-400/30 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse-brain" />
        </div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gradient-to-r from-blue-400/5 to-teal-400/5 rounded-full animate-float-delay">
          <Cpu className="w-6 h-6 text-cyan-400/30 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-spin-slow" />
        </div>
        <div className="absolute top-1/2 right-1/6 w-16 h-16 bg-gradient-to-r from-green-400/5 to-cyan-400/5 rounded-full animate-float-reverse">
          <Network className="w-4 h-4 text-teal-400/30 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
        </div>

        {/* Interactive Mouse Follower */}
        <div
          className="absolute w-24 h-24 bg-gradient-to-r from-cyan-400/5 to-purple-400/5 rounded-full pointer-events-none transition-all duration-300 ease-out"
          style={{
            left: mousePosition.x - 48,
            top: mousePosition.y - 48,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div className="w-full h-full bg-gradient-to-r from-purple-400/5 to-pink-400/5 rounded-full animate-pulse"></div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="text-center">
          {/* Profile Orb */}
          <div className="mb-8 relative animate-pop-in">
            <div className="w-48 h-48 mx-auto rounded-full relative">
              {/* Animated rings */}
              <div className="absolute inset-0 border-3 border-cyan-400/30 rounded-full animate-spin-slow"></div>
              <div className="absolute inset-2 border-3 border-purple-400/30 rounded-full animate-spin-reverse"></div>
              <div className="absolute inset-4 border-2 border-pink-400/30 rounded-full animate-spin-slow"></div>

              {/* Enhanced rugged profile container */}
              <div className="absolute inset-6 rounded-full bg-gradient-to-br from-cyan-600 via-purple-600 to-pink-600 p-1 animate-pulse-glow relative overflow-hidden">
                {/* Rugged texture layers */}
                <div className="absolute inset-0 bg-gradient-to-tl from-cyan-400/30 via-transparent to-yellow-400/30 rounded-full animate-rotate-slow"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/5 rounded-full animate-shimmer"></div>

                {/* Enhanced YV Text */}
                <div className="w-full h-full rounded-full bg-slate-100/50 dark:bg-gray-800/50 backdrop-blur-md flex items-center justify-center relative z-10 box-border">
                  <span className="text-5xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent animate-text-glow drop-shadow-[0_0_25px_rgba(168,85,247,0.8)] tracking-widest">
                    YV
                  </span>
                </div>
              </div>

              {/* Orbiting planets */}
              <div className="absolute inset-0 pointer-events-none" style={{ perspective: '1000px' }}>
                {[
                  { color: 'bg-cyan-400', shadow: 'rgba(34,211,238,0.8)', border: 'border-cyan-400/30', rotateZ: '0deg', speed: '8s', size: 'w-4 h-4' },
                  { color: 'bg-purple-500', shadow: 'rgba(168,85,247,0.8)', border: 'border-purple-500/30', rotateZ: '45deg', speed: '12s', size: 'w-3 h-3' },
                  { color: 'bg-fuchsia-400', shadow: 'rgba(232,121,249,0.8)', border: 'border-fuchsia-400/30', rotateZ: '90deg', speed: '15s', size: 'w-5 h-5' },
                  { color: 'bg-blue-500', shadow: 'rgba(59,130,246,0.8)', border: 'border-blue-500/30', rotateZ: '135deg', speed: '10s', size: 'w-4 h-4' },
                  { color: 'bg-emerald-400', shadow: 'rgba(52,211,153,0.8)', border: 'border-emerald-400/30', rotateZ: '180deg', speed: '18s', size: 'w-3 h-3' },
                  { color: 'bg-amber-400', shadow: 'rgba(251,191,36,0.8)', border: 'border-amber-400/30', rotateZ: '225deg', speed: '14s', size: 'w-5 h-5' },
                  { color: 'bg-rose-500', shadow: 'rgba(244,63,94,0.8)', border: 'border-rose-500/30', rotateZ: '270deg', speed: '20s', size: 'w-4 h-4' },
                  { color: 'bg-violet-500', shadow: 'rgba(139,92,246,0.8)', border: 'border-violet-500/30', rotateZ: '315deg', speed: '11s', size: 'w-3 h-3' },
                ].map((planet, i) => (
                  <div key={i} className="absolute inset-0 rounded-full" style={{ transform: `rotateZ(${planet.rotateZ}) rotateX(65deg)` }}>
                    <div className={`absolute inset-0 border ${planet.border} rounded-full animate-pulse-soft`} style={{ animationDelay: `${i * 0.5}s` }}></div>
                    <div className="absolute inset-0" style={{ animation: `spin ${planet.speed} linear infinite` }}>
                      <div
                        className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 ${planet.size} ${planet.color} rounded-full`}
                        style={{
                          boxShadow: `0 0 15px ${planet.shadow}`,
                          transform: `rotateX(-65deg) rotateZ(-${planet.rotateZ})`
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Status indicator */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-green-400 w-8 h-8 rounded-full border-3 border-white dark:border-gray-800 animate-pulse-status flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12 animate-fade-in-up-delay-3">
            <a
              href="https://mail.google.com/mail/?view=cm&to=yvijayakumar2006@gmail.com&su=&body=Hi"
              target="_blank"
              rel="noopener noreferrer"
              className="group px-10 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-full font-bold shadow-lg hover:shadow-[0_0_20px_rgba(192,38,211,0.5)] transform hover:scale-110 transition-all duration-300 flex items-center gap-3 relative overflow-hidden"
            >
              <span className="relative z-10">Contact Me</span>
              <ExternalLink className="w-5 h-5 relative z-10 group-hover:rotate-12 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-white/20 animate-shimmer"></div>
            </a>

            <a
              href={portfolioData.certificationsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full font-bold shadow-lg hover:shadow-[0_0_20px_rgba(8,145,178,0.5)] transition-all duration-300 flex items-center gap-3 transform hover:scale-110 relative overflow-hidden"
            >
              <span className="relative z-10">View Certifications</span>
              <Download className="w-5 h-5 group-hover:animate-bounce relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>

            <a
              href={portfolioData.resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group px-10 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full font-bold shadow-lg hover:shadow-[0_0_20px_rgba(16,185,129,0.5)] transition-all duration-300 flex items-center gap-3 transform hover:scale-110 relative overflow-hidden"
            >
              <span className="relative z-10">View Resume</span>
              <ExternalLink className="w-5 h-5 relative z-10 group-hover:rotate-12 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-white/10 animate-shimmer"></div>
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12 animate-fade-in-up-delay-4 animate-stats-container">
            <div className="text-center group cursor-pointer bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 hover:shadow-lg transition-all duration-300 animate-pop-in">
              <div className="text-3xl font-bold bg-gradient-to-r from-pink-300 to-pink-200 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300 mb-2 animate-number-pulse">Final</div>
              <div className="text-gray-400 dark:text-gray-300 group-hover:text-pink-300 dark:group-hover:text-pink-200 transition-colors font-medium">Year Student</div>
            </div>
            <div className="text-center group cursor-pointer bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 hover:shadow-lg transition-all duration-300 animate-pop-in-delay">
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-300 to-purple-200 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300 mb-2 animate-text-wave">AI & DS</div>
              <div className="text-gray-400 dark:text-gray-300 group-hover:text-purple-300 dark:group-hover:text-purple-200 transition-colors font-medium">Specialization</div>
            </div>
            <div className="text-center group cursor-pointer bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 hover:shadow-lg transition-all duration-300 animate-pop-in-delay-2">
              <div className="text-3xl font-bold bg-gradient-to-r from-emerald-300 to-emerald-200 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300 mb-2 animate-college-glow">RMKCET</div>
              <div className="text-gray-400 dark:text-gray-300 group-hover:text-emerald-300 dark:group-hover:text-emerald-200 transition-colors font-medium">College</div>
            </div>
            <div className="text-center group cursor-pointer bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 hover:shadow-lg transition-all duration-300 animate-pop-in-delay-3">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300 mb-2 drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]">4x</div>
              <div className="text-gray-400 dark:text-gray-300 group-hover:text-blue-400 dark:group-hover:text-cyan-300 transition-colors font-medium">Microsoft Certified</div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center w-full">
          <button
            onClick={() => scrollToSection('about')}
            className="animate-bounce hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors duration-200 group relative animate-scroll-indicator-pulse"
          >
            <ChevronDown className="w-10 h-10 text-gray-500 dark:text-gray-300 group-hover:scale-125 transition-transform animate-chevron-float" />
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
