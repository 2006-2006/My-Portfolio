import React, { useEffect, useRef, useState } from 'react';
import { Code2, Server, Database, GitBranch, Brain, Zap, BarChart3 } from 'lucide-react';
import { portfolioData } from './portfolioData';

const ICON_MAP: Record<string, React.ElementType> = {
  Code2, Server, Database, GitBranch, Brain, Zap, BarChart3
};

const Skills: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setIsVisible(true);
        io.disconnect();
      }
    }, { threshold: 0.1 });
    if (sectionRef.current) io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 relative overflow-hidden"
    >
      {/* Animated Background Elements — matches Education & Footer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-full animate-float-gentle" />
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-r from-purple-400/5 to-pink-400/5 rounded-full animate-float-gentle-delay" />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-r from-cyan-400/5 to-blue-400/5 rounded-full animate-bounce-gentle" />
        <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-gradient-to-r from-pink-400/5 to-cyan-400/5 rounded-full animate-float-gentle" />
      </div>

      <div className="container mx-auto px-6 relative z-10">

        {/* ── Section Header — matches Education style ── */}
        <div className={`text-center mb-16 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient-flow">
              My Arsenal
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
            A comprehensive overview of the tools, languages, and frameworks I use to build intelligent systems.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto animate-scale-in" />
        </div>

        {/* ── Bento Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioData.skills.map((category, index) => {
            const Icon = ICON_MAP[category.icon] || Brain;
            const delay = index * 120;

            return (
              <div
                key={category.title}
                className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${delay}ms` }}
              >
                {/* Card — matches Education card style */}
                <div className="group bg-slate-800/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-700/50 hover:border-purple-400/50 transition-all duration-500 transform hover:scale-105 overflow-hidden h-full">

                  {/* Top gradient strip using category color */}
                  <div
                    className="h-1 w-full"
                    style={{ background: `linear-gradient(to right, ${category.color}, ${category.glow})` }}
                  />

                  <div className="p-7 flex flex-col h-full">
                    {/* Category Header */}
                    <div className="flex items-center gap-4 mb-6">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border shadow-lg"
                        style={{
                          backgroundColor: `${category.color}18`,
                          borderColor: `${category.color}35`,
                          color: category.color,
                          boxShadow: `0 4px 20px ${category.color}25`
                        }}
                      >
                        <Icon className="w-6 h-6" strokeWidth={1.5} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors duration-300">
                          {category.title}
                        </h3>
                        <p className="text-xs text-slate-400 font-medium mt-0.5">
                          {category.skills.length} skills
                        </p>
                      </div>
                    </div>

                    {/* Skills Tags Cloud */}
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {category.skills.map((skill, skillIndex) => (
                        <span
                          key={skill.name}
                          className="px-3 py-1.5 text-xs font-medium text-slate-300 rounded-full border border-slate-600 bg-slate-900/50 hover:scale-105 hover:text-white hover:border-slate-400 transition-all duration-200 cursor-default"
                          style={{
                            transitionDelay: `${skillIndex * 30}ms`,
                          }}
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Hover overlay glow — matches Education card */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl pointer-events-none"
                    style={{ background: `linear-gradient(135deg, ${category.color}, ${category.glow})` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
