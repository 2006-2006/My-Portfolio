import React, { useState } from 'react';
import { ExternalLink, Github, Filter, Brain, BarChart, Globe, Sparkles, Zap } from 'lucide-react';
import { portfolioData } from './portfolioData';

// Map icons from strings/category to Lucide components
const categoryIcons: { [key: string]: React.ElementType } = {
  'Machine Learning': Brain,
  'Web App': Globe,
  'Data Analysis': BarChart,
  'Default': Sparkles
};

const categoryGradients: { [key: string]: string } = {
  'Machine Learning': 'from-blue-500 to-purple-600',
  'Web App': 'from-emerald-500 to-cyan-600',
  'Data Analysis': 'from-orange-500 to-amber-600',
  'Default': 'from-violet-500 to-fuchsia-600'
};

const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const projects = portfolioData.projects;
  const filters = ['All', 'Machine Learning', 'Data Analysis', 'Web App'];

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(project => 
        Array.isArray(project.category) 
          ? project.category.includes(activeFilter) 
          : project.category === activeFilter
      );

  return (
    <section id="projects" className="py-20 bg-slate-50 dark:bg-gray-900 relative overflow-hidden animate-section-pop">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-pop-in" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-flow">
              Projects
            </span>
          </h2>
          <p className="text-xl text-gray-500 dark:text-gray-200 max-w-3xl mx-auto mb-8 animate-pop-in-delay">
            Explore my latest projects that showcase my skills in AI and Data Science
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto animate-scale-in"></div>
        </div>

        {/* Enhanced Filter Buttons */}
        <div className="flex justify-center mb-12 animate-pop-in-delay-2">
          <div className="flex flex-wrap gap-3 bg-gray-100 dark:bg-gray-800 p-2 rounded-2xl shadow-lg">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 transform hover:scale-105 ${activeFilter === filter
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                  : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white dark:hover:bg-gray-700'
                  }`}
              >
                <Filter className="w-4 h-4" />
                {filter}
                {activeFilter === filter && <Sparkles className="w-4 h-4 animate-spin" />}
              </button>
            ))}
          </div>
        </div>

        {/* Enhanced Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => {
            const primaryCategory = Array.isArray(project.category) ? project.category[0] : project.category;
            const IconComponent = categoryIcons[primaryCategory] || categoryIcons['Default'];
            const projectGradient = categoryGradients[primaryCategory] || categoryGradients['Default'];
            const isHovered = hoveredProject === index;

            return (
              <div
                key={index}
                className="group bg-white dark:bg-gray-800 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:scale-[1.02] overflow-hidden animate-in fade-in slide-in-from-bottom-8 fill-mode-backwards"
                style={{
                  animationDelay: `${index * 150}ms`,
                  animationFillMode: 'both'
                }}
                onMouseEnter={() => setHoveredProject(index)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Enhanced Project Image */}
                <div className="relative overflow-hidden h-56">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${projectGradient} opacity-60`}></div>

                  {/* Floating Category Badge */}
                  <div className="absolute top-4 left-4 flex items-center animate-bounce-gentle">
                    <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-bold text-gray-700 dark:text-gray-100 flex items-center gap-2 shadow-lg">
                      <IconComponent className="w-4 h-4" />
                      {Array.isArray(project.category) ? project.category.join(' & ') : project.category}
                      <Zap className="w-3 h-3 text-yellow-500 animate-pulse" />
                    </div>
                  </div>

                  {/* Enhanced Action Buttons */}
                  <div className={`absolute bottom-4 right-4 flex gap-3 transition-all duration-300 ${isHovered ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
                    }`}>
                    {project.githubUrl && project.githubUrl !== '#' && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-full hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 transform hover:scale-110 shadow-lg"
                      >
                        <Github className="w-5 h-5 text-gray-700 dark:text-gray-100" />
                      </a>
                    )}
                    {project.liveUrl && project.liveUrl !== '#' && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-full hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 transform hover:scale-110 shadow-lg"
                      >
                        <ExternalLink className="w-5 h-5 text-gray-700 dark:text-gray-100" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Enhanced Project Content */}
                <div className="p-6">
                  <h3 className={`text-xl font-bold mb-3 bg-gradient-to-r ${projectGradient} bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300`}>
                    {project.title}
                  </h3>

                  <p className="text-gray-500 dark:text-gray-200 text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Key Features - Animated Popup */}
                  {isHovered && (
                    <div className="mb-4 animate-fade-in-up">
                      <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-2 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-yellow-500 animate-spin" />
                        Key Features
                      </h4>
                      <ul className="space-y-1">
                        {project.features.map((feature: string, featureIndex: number) => (
                          <li
                            key={featureIndex}
                            className="text-xs text-gray-500 dark:text-gray-300 flex items-start gap-2"
                            style={{ animationDelay: `${featureIndex * 0.1}s` }}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${projectGradient} mt-1.5 flex-shrink-0 animate-pulse`}></span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech: string, techIndex: number) => (
                      <span
                        key={techIndex}
                        className={`px-3 py-1 bg-gradient-to-r ${projectGradient} bg-opacity-10 text-gray-600 dark:text-gray-200 text-xs rounded-full font-medium border border-gray-200 dark:border-gray-600 hover:scale-105 transition-transform duration-200`}
                        style={{ animationDelay: `${techIndex * 0.05}s` }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Enhanced Project Footer */}
                <div className="px-6 pb-6">
                  <div className="flex flex-col gap-3">
                    {project.githubUrl && project.githubUrl !== '#' && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-xl hover:bg-gray-800 dark:hover:bg-gray-600 transition-all duration-300 text-sm font-medium transform hover:scale-105"
                      >
                        <Github className="w-4 h-4" />
                        View Code
                      </a>
                    )}
                    {project.liveUrl && project.liveUrl !== '#' && !project.underMaintenance && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r ${projectGradient} text-white rounded-xl hover:shadow-lg transition-all duration-300 text-sm font-medium transform hover:scale-105`}
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </a>
                    )}
                    {project.underMaintenance && (
                      <div className="flex-1 flex flex-col items-center justify-center gap-1 px-4 py-2 bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl text-gray-500 dark:text-gray-400 text-xs font-medium cursor-not-allowed">
                        <span className="flex items-center gap-1 text-orange-500 animate-pulse">
                          ⚠️ Under Maintenance
                        </span>
                        <span className="text-[10px] opacity-80">
                          Coming End of May
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12 animate-pop-in">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No projects found for the selected filter.
            </p>
          </div>
        )}
      </div>


    </section>
  );
};

export default Projects;