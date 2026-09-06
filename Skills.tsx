import React, { useEffect, useRef, useState } from 'react';
import { Code2, Server, Database, GitBranch, Brain, Zap, BarChart3 } from 'lucide-react';
import { portfolioData } from './portfolioData';

const ICON_MAP: Record<string, React.ElementType> = {
  Code2, Server, Database, GitBranch, Brain, Zap, BarChart3
};

/* ─────────────────────────────────────────
   Mouse-tracking Spotlight Card
───────────────────────────────────────── */
const SpotlightCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  glowColor: string;
  borderColor: string;
}> = ({ children, className = '', glowColor, borderColor }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative overflow-hidden rounded-3xl transition-all duration-500 group cursor-default ${className}`}
      style={{
        background: 'rgba(15, 23, 42, 0.85)',
        backdropFilter: 'blur(20px)',
        border: `1px solid ${hovered ? borderColor : 'rgba(71,85,105,0.4)'}`,
        boxShadow: hovered
          ? `0 0 40px -10px ${glowColor}, 0 20px 60px -20px rgba(0,0,0,0.6)`
          : '0 4px 30px -8px rgba(0,0,0,0.5)',
        transform: hovered ? 'translateY(-6px) scale(1.015)' : 'translateY(0) scale(1)',
      }}
    >
      {/* Spotlight radial gradient */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(600px circle at ${pos.x}px ${pos.y}px, ${glowColor}22, transparent 50%)`,
        }}
      />
      {/* Top edge shimmer on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-px transition-opacity duration-500"
        style={{
          opacity: hovered ? 1 : 0,
          background: `linear-gradient(90deg, transparent, ${borderColor}, transparent)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

/* ─────────────────────────────────────────
   Skill Tag
───────────────────────────────────────── */
const SkillTag: React.FC<{ name: string; color: string; visible: boolean; delay: number }> = ({
  name, color, visible, delay
}) => {
  return (
    <span
      className="inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-300 cursor-default select-none"
      style={{
        background: `${color}15`,
        color: `${color}dd`,
        border: `1px solid ${color}30`,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(8px)',
        transitionDelay: `${delay}ms`,
        boxShadow: `0 2px 8px ${color}15`,
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.background = `${color}28`;
        (e.currentTarget as HTMLElement).style.borderColor = `${color}60`;
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px) scale(1.05)';
        (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 16px ${color}30`;
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.background = `${color}15`;
        (e.currentTarget as HTMLElement).style.borderColor = `${color}30`;
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0) scale(1)';
        (e.currentTarget as HTMLElement).style.boxShadow = `0 2px 8px ${color}15`;
      }}
    >
      {name}
    </span>
  );
};

/* ══════════════════════════════════════════════════════════════════ */
const Skills: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setIsVisible(true); io.disconnect(); }
    }, { threshold: 0.08 });
    if (sectionRef.current) io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);

  const totalSkills = portfolioData.skills.reduce((acc, c) => acc + c.skills.length, 0);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 40%, #0f172a 70%, #1a0533 100%)',
      }}
    >
      {/* ── Ambient background glows ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-20 blur-[100px]"
          style={{ background: 'radial-gradient(circle, #818cf8 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full opacity-20 blur-[100px]"
          style={{ background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)' }} />
        <div className="absolute top-1/2 left-0 w-64 h-64 rounded-full opacity-10 blur-[80px]"
          style={{ background: 'radial-gradient(circle, #ec4899 0%, transparent 70%)' }} />
        {/* Floating orbs */}
        <div className="absolute top-20 right-32 w-3 h-3 bg-cyan-400/40 rounded-full animate-bounce-gentle" />
        <div className="absolute bottom-32 left-24 w-2 h-2 bg-purple-400/40 rounded-full animate-float-gentle" />
        <div className="absolute top-1/2 right-16 w-1.5 h-1.5 bg-pink-400/40 rounded-full animate-float-gentle-delay" />
        <div className="absolute top-1/3 left-12 w-2 h-2 bg-indigo-400/40 rounded-full animate-bounce-gentle" />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'linear-gradient(rgba(148,163,184,1) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">

        {/* ── Section Header ── */}
        <div className={`text-center mb-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-700/60 bg-slate-800/40 backdrop-blur-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-slate-300">Technical Expertise</span>
          </div>

          <h2
            className="text-5xl md:text-6xl font-extrabold tracking-tight mb-5"
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
          >
            <span className="text-white">My </span>
            <span
              className="bg-clip-text text-transparent animate-gradient-flow"
              style={{ backgroundImage: 'linear-gradient(90deg, #22d3ee, #818cf8, #ec4899, #22d3ee)', backgroundSize: '200%' }}
            >
              Arsenal
            </span>
          </h2>

          <p className="text-slate-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Tools, languages, and frameworks I wield to build intelligent pipelines, scalable apps, and AI-powered systems.
          </p>

          {/* Stats row */}
          <div className={`flex items-center justify-center gap-8 mt-10 mb-12 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {[
              { value: totalSkills + '+', label: 'Technologies' },
              { value: portfolioData.skills.length, label: 'Categories' },
              { value: '3+', label: 'Years Learning' },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <span
                  className="text-3xl font-black bg-clip-text text-transparent"
                  style={{ backgroundImage: 'linear-gradient(135deg, #22d3ee, #818cf8)' }}
                >
                  {stat.value}
                </span>
                <span className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-1">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="flex items-center justify-center gap-4 mb-16">
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-cyan-500/50" />
            <div className="w-2 h-2 rounded-full bg-cyan-400/60" />
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-purple-500/50" />
          </div>
        </div>

        {/* ── Bento Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {portfolioData.skills.map((category, index) => {
            const Icon = ICON_MAP[category.icon] || Brain;
            const delay = index * 100;
            const cardVisible = isVisible;

            return (
              <div
                key={category.title}
                className="transition-all duration-700 ease-out"
                style={{
                  opacity: cardVisible ? 1 : 0,
                  transform: cardVisible ? 'translateY(0)' : 'translateY(24px)',
                  transitionDelay: `${delay + 300}ms`,
                }}
              >
                <SpotlightCard
                  className="h-full"
                  glowColor={category.color}
                  borderColor={`${category.color}80`}
                >
                  <div className="p-7 flex flex-col h-full min-h-[240px]">

                    {/* Header */}
                    <div className="flex items-center gap-4 mb-6">
                      {/* Icon bubble with pulse ring */}
                      <div className="relative shrink-0">
                        <div
                          className="absolute inset-0 rounded-2xl animate-pulse opacity-40 blur-sm"
                          style={{ background: category.color }}
                        />
                        <div
                          className="relative w-13 h-13 w-12 h-12 rounded-2xl flex items-center justify-center border"
                          style={{
                            background: `linear-gradient(135deg, ${category.color}25, ${category.color}10)`,
                            borderColor: `${category.color}50`,
                            color: category.color,
                          }}
                        >
                          <Icon className="w-6 h-6" strokeWidth={1.5} />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3
                          className="text-base font-bold tracking-tight truncate"
                          style={{ color: category.color }}
                        >
                          {category.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <div
                            className="h-0.5 flex-1 rounded-full max-w-[80px]"
                            style={{ background: `linear-gradient(90deg, ${category.color}, transparent)` }}
                          />
                          <span className="text-xs text-slate-500 font-medium">
                            {category.skills.length} skills
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Skill tags */}
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {category.skills.map((skill, si) => (
                        <SkillTag
                          key={skill.name}
                          name={skill.name}
                          color={category.color}
                          visible={cardVisible}
                          delay={delay + 400 + si * 40}
                        />
                      ))}
                    </div>
                  </div>
                </SpotlightCard>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Skills;
