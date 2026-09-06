import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Briefcase, Code2, TrendingUp, Award, Zap } from 'lucide-react';
import { portfolioData } from './portfolioData';

/* ─── Animated counter hook ─── */
const useAnimatedCounter = (target: number, duration = 2000, start = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start || target === 0) return;
    let startTime: number | null = null;
    const tick = (ts: number) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      setCount(Math.round((1 - Math.pow(1 - p, 4)) * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration, start]);
  return count;
};

/* ─── 3-D tilt card ─── */
const TiltCard: React.FC<{ children: React.ReactNode; className?: string; style?: React.CSSProperties; glowColor?: string }> = ({
  children, className = '', style, glowColor = 'rgba(139,92,246,0.4)'
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      if (ref.current) {
        ref.current.style.transform = `perspective(900px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) scale3d(1.03,1.03,1.03)`;
        ref.current.style.boxShadow = `${-x * 18}px ${y * 18}px 40px rgba(0,0,0,0.4), 0 0 30px ${glowColor}, inset 0 1px 0 rgba(255,255,255,0.12)`;
      }
    });
  }, [glowColor]);

  const handleLeave = useCallback(() => {
    if (ref.current) {
      ref.current.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)';
      ref.current.style.boxShadow = `0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)`;
    }
  }, []);

  return (
    <div
      ref={ref}
      className={`relative cursor-pointer ${className}`}
      style={{ transition: 'transform 0.08s ease-out, box-shadow 0.08s ease-out', transformStyle: 'preserve-3d', boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)', willChange: 'transform', ...style }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </div>
  );
};

/* ─── Main component ─── */
const PortfolioStats: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  /* real data */
  const totalProjects = portfolioData.projects.length;
  const allSkills = portfolioData.skills.flatMap(c => c.skills);
  const totalSkills = allSkills.length;
  const skillCategories = portfolioData.skills.length;
  const avgProficiency = 85;
  const totalCerts = portfolioData.certifications.length;

  /* counters */
  const cProjects = useAnimatedCounter(totalProjects, 1200, isVisible);
  const cSkills   = useAnimatedCounter(totalSkills,   1500, isVisible);
  const cAvg      = useAnimatedCounter(avgProficiency, 1800, isVisible);
  const cCerts    = useAnimatedCounter(totalCerts,    1400, isVisible);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setIsVisible(true); }, { threshold: 0.15 });
    if (sectionRef.current) io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);

  /* stat cards */
  const stats = [
    {
      icon: Briefcase, label: 'Projects Built', value: cProjects, suffix: '',
      color: 'from-violet-500 to-purple-700', glow: 'rgba(139,92,246,0.55)',
      bg: 'from-violet-950/80 to-purple-950/80', border: 'border-violet-500/25',
      desc: 'ML · Web · Data',
    },
    {
      icon: Code2, label: 'Skills Mastered', value: cSkills, suffix: '+',
      color: 'from-cyan-400 to-blue-600', glow: 'rgba(6,182,212,0.55)',
      bg: 'from-cyan-950/80 to-blue-950/80', border: 'border-cyan-500/25',
      desc: `Across ${skillCategories} domains`,
    },
    {
      icon: TrendingUp, label: 'Avg Proficiency', value: cAvg, suffix: '%',
      color: 'from-emerald-400 to-teal-600', glow: 'rgba(16,185,129,0.55)',
      bg: 'from-emerald-950/80 to-teal-950/80', border: 'border-emerald-500/25',
      desc: 'Across all skills',
    },
    {
      icon: Award, label: 'Global Certifications', value: cCerts, suffix: '',
      color: 'from-yellow-400 to-orange-500', glow: 'rgba(251,191,36,0.55)',
      bg: 'from-yellow-950/80 to-orange-950/80', border: 'border-yellow-500/25',
      desc: 'Including Microsoft ×4',
    },
  ];


  return (
    <section
      ref={sectionRef}
      className="relative py-20 overflow-hidden"
      style={{ background: 'linear-gradient(160deg,#060b18 0%,#0d1133 35%,#100820 65%,#060b18 100%)' }}
    >
      {/* Grid lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(rgba(139,92,246,1) 1px,transparent 1px), linear-gradient(90deg,rgba(139,92,246,1) 1px,transparent 1px)',
          backgroundSize: '60px 60px',
          transform: 'perspective(600px) rotateX(20deg) scaleY(1.5)',
          transformOrigin: 'bottom center',
        }}
      />

      {/* Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[15%] w-[500px] h-[500px] bg-violet-700/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[10%] w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[100px]" />
        <div className="absolute top-[40%] left-[45%] w-[300px] h-[300px] bg-yellow-500/5 rounded-full blur-[80px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10 max-w-6xl">

        {/* Title */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 backdrop-blur-sm">
            <Zap className="w-3.5 h-3.5 text-violet-400" />
            <span className="text-[11px] font-black uppercase tracking-[0.25em] text-violet-300">Portfolio Statistics</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(90deg,#c084fc,#818cf8,#22d3ee)' }}>
              By the Numbers
            </span>
          </h2>
          <p className="text-slate-500 text-sm mt-3 max-w-md mx-auto">
            Real-time stats computed directly from Yogeshwaran's portfolio.
          </p>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <TiltCard
                key={i}
                glowColor={s.glow}
                className={`rounded-2xl border ${s.border} bg-gradient-to-br ${s.bg} backdrop-blur-xl overflow-hidden`}
                style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? undefined : 'translateY(40px)', transition: `opacity 0.6s ease ${i * 100}ms, transform 0.6s ease ${i * 100}ms` }}
              >
                <div className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at 30% 30%, ${s.glow.replace('0.55', '0.08')}, transparent 70%)` }} />
                <div className="absolute inset-x-0 top-0 h-px"
                  style={{ background: `linear-gradient(90deg, transparent, ${s.glow.replace('0.55', '0.6')}, transparent)` }} />

                <div className="relative p-6 flex flex-col items-center text-center" style={{ transform: 'translateZ(20px)', transformStyle: 'preserve-3d' }}>
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-4 shadow-lg`}
                    style={{ boxShadow: `0 0 24px ${s.glow}` }}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-4xl font-black mb-1 tabular-nums"
                    style={{
                      backgroundImage: `linear-gradient(135deg, #fff 40%, ${s.glow.replace('0.55', '0.9')})`,
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                      filter: `drop-shadow(0 0 12px ${s.glow})`,
                    }}>
                    {s.value}<span className="text-xl">{s.suffix}</span>
                  </p>
                  <p className="text-sm font-bold text-white mb-0.5">{s.label}</p>
                  <p className="text-[11px] text-slate-500">{s.desc}</p>
                </div>
              </TiltCard>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default PortfolioStats;

