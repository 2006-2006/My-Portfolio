import React, { useState, useRef, useEffect } from 'react';
import { ExternalLink, Github, Brain, BarChart, Globe, Sparkles, ArrowUpRight } from 'lucide-react';
import { portfolioData } from './portfolioData';

const categoryMeta: Record<string, { gradient: string; glow: string; badge: string }> = {
  'Machine Learning': {
    gradient: 'from-violet-500 to-purple-600',
    glow: 'rgba(139,92,246,0.35)',
    badge: 'bg-violet-500/20 text-violet-300 border-violet-500/30',
  },
  'Web App': {
    gradient: 'from-emerald-500 to-cyan-500',
    glow: 'rgba(16,185,129,0.35)',
    badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  },
  'Data Analysis': {
    gradient: 'from-orange-500 to-amber-500',
    glow: 'rgba(249,115,22,0.35)',
    badge: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  },
  'AI': {
    gradient: 'from-cyan-500 to-blue-500',
    glow: 'rgba(6,182,212,0.35)',
    badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
  },
};

const getCategoryMeta = (category: string | string[]) => {
  const key = Array.isArray(category) ? category[0] : category;
  return categoryMeta[key] ?? {
    gradient: 'from-pink-500 to-fuchsia-600',
    glow: 'rgba(236,72,153,0.35)',
    badge: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
  };
};

/* ── Spotlight Card ── */
const ProjectCard: React.FC<{ project: typeof portfolioData.projects[0]; index: number; visible: boolean }> = ({
  project, index, visible
}) => {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const meta = getCategoryMeta(project.category);
  const categories = Array.isArray(project.category) ? project.category : [project.category];

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!innerRef.current) return;
    const r = innerRef.current.getBoundingClientRect();
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  return (
    <div
      ref={outerRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={onMouseMove}
      className="relative"
      style={{
        opacity: visible ? 1 : 0,
        transition: `opacity 0.6s ease ${index * 120}ms`,
      }}
    >
      {/* Inner div: animates freely without affecting hover detection */}
      <div
        ref={innerRef}
        className="relative overflow-hidden rounded-3xl flex flex-col"
        style={{
          background: 'rgba(15,23,42,0.85)',
          backdropFilter: 'blur(20px)',
          border: `1px solid ${hovered ? meta.glow.replace('0.35', '0.7') : 'rgba(71,85,105,0.35)'}`,
          boxShadow: hovered
            ? `0 0 40px -10px ${meta.glow}, 0 25px 60px -20px rgba(0,0,0,0.7)`
            : '0 4px 30px -8px rgba(0,0,0,0.5)',
          transform: visible
            ? hovered ? 'translateY(-8px)' : 'translateY(0)'
            : 'translateY(32px)',
          transition: `transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease, border-color 0.3s ease`,
        }}
      >
      {/* Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(500px circle at ${pos.x}px ${pos.y}px, ${meta.glow.replace('0.35', '0.12')}, transparent 60%)`,
        }}
      />

      {/* Top shimmer line */}
      <div
        className="absolute top-0 left-0 right-0 h-px z-20 transition-opacity duration-500"
        style={{
          opacity: hovered ? 1 : 0,
          background: `linear-gradient(90deg, transparent 0%, ${meta.glow.replace('0.35', '0.9')} 50%, transparent 100%)`,
        }}
      />

      {/* Image */}
      <div className="relative h-52 overflow-hidden flex-shrink-0">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700"
          style={{ transform: hovered ? 'scale(1.08)' : 'scale(1)' }}
        />
        {/* gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t ${meta.gradient} opacity-50`} />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent" />

        {/* Category badges */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-20">
          {categories.slice(0, 2).map((cat) => (
            <span
              key={cat}
              className={`px-3 py-1 rounded-full text-[11px] font-bold border backdrop-blur-sm ${getCategoryMeta(cat).badge}`}
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Action icons top-right */}
        <div
          className="absolute top-4 right-4 flex gap-2 z-20 transition-all duration-300"
          style={{ opacity: hovered ? 1 : 0, transform: hovered ? 'translateY(0)' : 'translateY(-8px)' }}
        >
          {project.githubUrl && project.githubUrl !== '#' && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-black/50 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors duration-200"
            >
              <Github className="w-4 h-4 text-white" />
            </a>
          )}
          {project.liveUrl && project.liveUrl !== '#' && !project.underMaintenance && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-black/50 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors duration-200"
            >
              <ArrowUpRight className="w-4 h-4 text-white" />
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col gap-4 relative z-10">
        {/* Title */}
        <h3
          className={`text-xl font-bold bg-gradient-to-r ${meta.gradient} bg-clip-text text-transparent leading-tight`}
        >
          {project.title}
        </h3>

        {/* Description — clamped to 3 lines */}
        <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
          {project.description}
        </p>

        {/* Key Features */}
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3" /> Key Features
          </p>
          <ul className="space-y-1.5">
            {project.features.slice(0, 3).map((f: string, i: number) => (
              <li key={i} className="flex items-start gap-2 text-xs text-slate-400">
                <span
                  className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${meta.glow.replace('0.35', '1')}, transparent)` }}
                />
                <span className="line-clamp-1">{f}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 5).map((tech: string) => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded-lg text-[11px] font-medium text-slate-400 border border-slate-700/60 bg-slate-800/50"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 5 && (
            <span className="px-2.5 py-1 rounded-lg text-[11px] font-medium text-slate-500 border border-slate-700/40">
              +{project.technologies.length - 5}
            </span>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-1">
          {project.githubUrl && project.githubUrl !== '#' && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-300 border border-slate-700/60 bg-slate-800/50 hover:bg-slate-700/60 hover:text-white hover:border-slate-600 transition-all duration-200"
            >
              <Github className="w-4 h-4" /> View Code
            </a>
          )}
          {project.liveUrl && project.liveUrl !== '#' && !project.underMaintenance && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r ${meta.gradient} hover:opacity-90 hover:shadow-lg transition-all duration-200`}
              style={{ boxShadow: hovered ? `0 4px 20px ${meta.glow}` : 'none' }}
            >
              <ArrowUpRight className="w-4 h-4" /> Live Demo
            </a>
          )}
          {project.underMaintenance && (
            <div className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium text-orange-400 border border-orange-500/30 bg-orange-500/10">
              ⚠️ Under Maintenance
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════════ */
const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setIsVisible(true); io.disconnect(); }
    }, { threshold: 0.08 });
    if (sectionRef.current) io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);

  const projects = portfolioData.projects;
  const filters = ['All', 'Machine Learning', 'Data Analysis', 'Web App'];

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(p =>
        Array.isArray(p.category) ? p.category.includes(activeFilter) : p.category === activeFilter
      );

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)' }}
    >
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-1/3 w-96 h-96 rounded-full opacity-15 blur-[100px]"
          style={{ background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full opacity-15 blur-[100px]"
          style={{ background: 'radial-gradient(circle, #0891b2 0%, transparent 70%)' }} />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'linear-gradient(rgba(148,163,184,1) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">

        {/* Header */}
        <div className={`text-center mb-14 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-700/60 bg-slate-800/40 backdrop-blur-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-slate-300">Portfolio</span>
          </div>
          <h2
            className="text-5xl md:text-6xl font-extrabold tracking-tight mb-5"
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
          >
            <span className="text-white">Featured </span>
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(90deg, #a78bfa, #60a5fa, #34d399)' }}
            >
              Projects
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto font-light">
            Real-world AI, data engineering, and full-stack projects I've built from scratch.
          </p>
        </div>

        {/* Filter pills */}
        <div className={`flex justify-center mb-12 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-slate-800/50 border border-slate-700/40 backdrop-blur-sm">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  activeFilter === f
                    ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-purple-500/25'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} visible={isVisible} />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-slate-500 text-lg">No projects found for this filter.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;