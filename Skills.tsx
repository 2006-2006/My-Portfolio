import React, { useEffect, useRef, useState } from 'react';
import { Code2, Server, Database, GitBranch, Brain, Zap, BarChart3, ChevronRight } from 'lucide-react';
import { portfolioData } from './portfolioData';

const ICON_MAP: Record<string, React.ElementType> = {
  Code2, Server, Database, GitBranch, Brain, Zap, BarChart3
};

/* ─── Premium Spotlight Card ─── */
const SpotlightCard: React.FC<{ children: React.ReactNode; className?: string; accentColor?: string }> = ({ 
  children, 
  className = '',
  accentColor = 'rgba(255,255,255,0.1)'
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative overflow-hidden rounded-3xl border border-slate-800/60 bg-slate-900/40 backdrop-blur-md transition-all duration-500 hover:border-slate-700/80 ${className}`}
      style={{
        boxShadow: '0 4px 24px -8px rgba(0,0,0,0.5)'
      }}
    >
      {/* Spotlight effect matching the category color */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 ease-in-out"
        style={{
          opacity,
          background: `radial-gradient(800px circle at ${position.x}px ${position.y}px, ${accentColor}, transparent 40%)`,
        }}
      />
      <div className="relative z-10 h-full p-8 flex flex-col">
        {children}
      </div>
    </div>
  );
};

/* ─── Animated Skill Tag ─── */
const SkillTag: React.FC<{ name: string; delay: number }> = ({ name, delay }) => {
  return (
    <div 
      className="group relative flex items-center justify-center px-5 py-2.5 rounded-xl border border-slate-700/50 bg-slate-800/30 overflow-hidden cursor-default transition-all duration-300 hover:border-indigo-500/50 hover:bg-slate-800/80 hover:-translate-y-1"
      style={{ 
        animation: `fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms backwards`,
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)' 
      }}
    >
      {/* Glint/Shimmer effect on hover */}
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-[shimmer_1s_ease-out_forwards]" />
      
      {/* Soft underlying glow on hover */}
      <div className="absolute inset-0 bg-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <span className="relative z-10 text-[13.5px] font-medium text-slate-300 group-hover:text-white transition-colors duration-300 drop-shadow-sm">
        {name}
      </span>
    </div>
  );
};


/* ══════════════════════════════════════════════════════════════════ */
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

  // Helper to convert hex to rgba for the spotlight effect
  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  return (
    <section id="skills" ref={sectionRef} className="py-32 relative bg-[#030712] overflow-hidden">
      
      {/* ── Background Ambient Glows ── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/20 to-transparent blur-[100px] rounded-full mix-blend-screen" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* ── Section Header ── */}
        <div className={`flex flex-col items-center text-center mb-24 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700/50 mb-6 backdrop-blur-sm">
            <SparklesIcon className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">Technical Expertise</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">Arsenal</span>
          </h2>
          
          <p className="text-slate-400 text-lg max-w-2xl font-light">
            A comprehensive overview of the tools, languages, and frameworks I use to build intelligent data pipelines, machine learning models, and scalable applications.
          </p>
        </div>

        {/* ── Bento Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioData.skills.map((category, index) => {
            const Icon = ICON_MAP[category.icon] || Brain;
            const delay = index * 100;
            const accentRgba = hexToRgba(category.color, 0.15);

            return (
              <div 
                key={category.title}
                className="transition-all duration-700 ease-out fill-mode-both"
                style={{
                  animationName: isVisible ? 'fade-in-up' : 'none',
                  animationDelay: `${delay}ms`,
                  animationDuration: '0.8s',
                }}
              >
                <SpotlightCard className="h-full" accentColor={accentRgba}>
                  {/* Category Header */}
                  <div className="flex items-center gap-4 mb-8">
                    <div 
                      className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border"
                      style={{ 
                        backgroundColor: hexToRgba(category.color, 0.1),
                        borderColor: hexToRgba(category.color, 0.2),
                        color: category.color
                      }}
                    >
                      <Icon className="w-6 h-6" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white tracking-tight">{category.title}</h3>
                      <p className="text-sm text-slate-500 font-medium mt-0.5">{category.skills.length} skills</p>
                    </div>
                  </div>

                  {/* Skills Cloud */}
                  <div className="flex flex-wrap gap-2.5 mt-auto">
                    {category.skills.map((skill, skillIndex) => (
                      <SkillTag 
                        key={skill.name} 
                        name={skill.name} 
                        level={skill.level} 
                        delay={isVisible ? delay + 200 + (skillIndex * 50) : 0} 
                      />
                    ))}
                  </div>
                </SpotlightCard>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .fill-mode-both { animation-fill-mode: both; }
      `}</style>
    </section>
  );
};

// Mini icon component for the header
function SparklesIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  );
}

export default Skills;
