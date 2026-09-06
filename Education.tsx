import React, { useState, useEffect, useRef } from 'react';
import { GraduationCap, Briefcase, Calendar, MapPin, Award, ChevronDown, ChevronUp, Star, Trophy, BookOpen } from 'lucide-react';

const Education: React.FC = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  const educationData = [
    {
      type: 'education',
      title: 'B.Tech in Artificial Intelligence & Data Science',
      institution: 'RMKCET (R.M.K. College of Engineering and Technology)',
      location: 'Chennai, Tamil Nadu',
      period: '2023 - 2027',
      status: 'Final Year',
      shortDescription: 'Specialized in Machine Learning, Deep Learning, Data Analytics, and AI applications.',
      fullDescription: 'Comprehensive program covering advanced topics in Artificial Intelligence and Data Science with hands-on experience in cutting-edge technologies. The curriculum includes theoretical foundations and practical applications in real-world scenarios.',
      achievements: [
        'Maintaining excellent academic performance with consistent high grades',
        'Active participation in AI/ML workshops, seminars, and technical conferences',
        'Working on innovative projects in Computer Vision and Natural Language Processing',
        'Member of technical clubs and coding communities within the college',
        'Completed multiple certification courses in Machine Learning and Data Science',
        'Participated in hackathons and coding competitions at state and national levels'
      ],
      skills: ['Python', 'Machine Learning', 'Deep Learning', 'Data Analysis', 'Computer Vision', 'NLP'],
      gradient: 'from-teal-700 via-cyan-700 to-sky-700',
      icon: GraduationCap
    },
    {
      type: 'experience',
      title: 'Data Engineering & Analytics Intern',
      institution: 'Sify Technologies',
      location: 'Chennai, Tamil Nadu',
      period: 'June – July 2026 · 1 Month',
      status: 'Completed Successfully',
      shortDescription: 'Automated 80% of ETL pipelines using Python, Airflow & Airbyte — eliminating ~10 hrs/week of manual data-handling effort.',
      fullDescription: 'Led data engineering and analytics initiatives at Sify Technologies, building production-grade ETL pipelines, optimizing SQL telemetry queries, architecting data models, and delivering Apache Superset dashboards for AI Gateway performance monitoring.',
      achievements: [
        'Automated 80% of ETL pipelines using Python, Airflow, and Airbyte — eliminating ~10 hours/week of manual data-handling effort',
        'Optimized SQL-based telemetry queries, reducing execution runtime by 45% and accelerating 12 daily & weekly operational reports',
        'Architected relational schemas and data models supporting 8+ analytics workloads, improving data accessibility and ad-hoc querying for operational KPIs',
        'Built 5 Apache Superset dashboards to monitor API traffic, latency, and RBAC metrics — providing engineering leadership with real-time AI Gateway visibility',
        'Collaborated with senior data engineers and learned industry-grade data pipeline best practices',
        'Delivered measurable impact: faster reports, cleaner data, and real-time operational intelligence'
      ],
      skills: ['Python', 'Apache Airflow', 'Airbyte', 'SQL', 'ETL Pipelines', 'Apache Superset', 'Data Modeling', 'Data Engineering'],
      gradient: 'from-teal-700 via-cyan-700 to-sky-700',
      icon: Briefcase
    },
    {
      type: 'education',
      title: 'Higher Secondary Education (12th)',
      institution: 'Sethu Bhaskara Matric.Hr.Sec.School',
      location: 'Tamil Nadu',
      period: '2020 - 2022',
      status: 'Completed with Excellence',
      shortDescription: 'Science stream with exceptional performance in Computer Science and Physics.',
      fullDescription: 'Completed higher secondary education with outstanding academic performance, particularly excelling in Computer Science and Physics. Built strong foundation in mathematics, science, and computer programming that prepared me for engineering studies.',
      achievements: [
        'Achieved exceptional 98% marks in Computer Science',
        'Scored outstanding 95% marks in Physics',
        'Maintained consistent high performance across all subjects',
        'Participated in science exhibitions and inter-school competitions',
        'Developed strong analytical and problem-solving skills',
        'Received recognition for academic excellence and leadership qualities'
      ],
      skills: ['Computer Science Fundamentals', 'Physics', 'Mathematics', 'Programming Basics'],
      gradient: 'from-teal-700 via-cyan-700 to-sky-700',
      icon: BookOpen
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleItems(prev => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    const elements = document.querySelectorAll('.education-item');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const toggleExpanded = (index: number) => {
    setExpandedItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section id="education" className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 relative overflow-hidden" ref={sectionRef}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-full animate-float-gentle"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-r from-purple-400/5 to-pink-400/5 rounded-full animate-float-gentle-delay"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-r from-cyan-400/5 to-blue-400/5 rounded-full animate-bounce-gentle"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient-flow">
              Education & Experience
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
            My academic journey and professional experience in technology and innovation
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto animate-scale-in"></div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-cyan-400 via-purple-400 to-pink-400 rounded-full opacity-30"></div>

          <div className="space-y-12">
            {educationData.map((item, index) => {
              const IconComponent = item.icon;
              const isVisible = visibleItems.includes(index);
              const isExpanded = expandedItems.includes(index);
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={index}
                  data-index={index}
                  className={`education-item relative transition-all duration-500 ${isVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-10'
                    }`}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-1/2 z-20">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${item.gradient} flex items-center justify-center shadow-2xl border-4 border-slate-900 animate-pulse-glow hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className={`flex ${isLeft ? 'justify-start' : 'justify-end'}`}>
                    <div className={`w-full md:w-5/12 ${isLeft ? 'md:pr-16' : 'md:pl-16'}`}>
                      <div className={`group bg-slate-800/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-700/50 hover:border-purple-400/50 transition-all duration-500 transform hover:scale-105 animate-card-pop overflow-hidden ${isExpanded ? 'scale-110 shadow-3xl' : ''
                        }`}>
                        {/* Card Header */}
                        <div className={`p-8 transition-all duration-500 ${isExpanded ? 'pb-4' : ''}`}>
                          <div className="flex items-start justify-between mb-6">
                            <div className="flex-1">
                              <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold text-white bg-gradient-to-r ${item.gradient} mb-4 shadow-lg animate-badge-glow`}>
                                {item.type === 'education' ? (
                                  <>
                                    <GraduationCap className="w-4 h-4 mr-2" />
                                    Education
                                  </>
                                ) : (
                                  <>
                                    <Briefcase className="w-4 h-4 mr-2" />
                                    Experience
                                  </>
                                )}
                              </div>

                              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors duration-300">
                                {item.title}
                              </h3>

                              <div className="flex items-center text-cyan-300 mb-2">
                                <Award className="w-5 h-5 mr-2" />
                                <span className="font-semibold bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent animate-text-flow">{item.institution}</span>
                              </div>

                              <div className="flex items-center text-slate-400 mb-4">
                                <MapPin className="w-4 h-4 mr-2" />
                                <span className="bg-gradient-to-r from-slate-300 via-slate-200 to-slate-300 bg-clip-text text-transparent animate-text-flow-slow">{item.location}</span>
                                <Calendar className="w-4 h-4 ml-4 mr-2" />
                                <span className="bg-gradient-to-r from-white via-pink-50 to-pink-100 bg-clip-text text-transparent animate-text-flow-slow">{item.period}</span>
                              </div>

                              <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${item.gradient} bg-opacity-20 text-cyan-300 border border-cyan-400/30 mb-4`}>
                                <Star className="w-3 h-3 mr-1" />
                                <span className="bg-gradient-to-r from-cyan-200 via-blue-200 to-purple-200 bg-clip-text text-transparent animate-text-flow">{item.status}</span>
                              </div>
                            </div>
                          </div>

                          {/* Description */}
                          <p className="text-slate-300 leading-relaxed mb-6 bg-gradient-to-r from-slate-300 via-slate-200 to-slate-300 bg-clip-text text-transparent animate-text-flow-gentle">
                            {isExpanded ? item.fullDescription : item.shortDescription}
                          </p>

                          {/* Skills Tags */}
                          <div className="flex flex-wrap gap-2 mb-6">
                            {item.skills.map((skill, skillIndex) => (
                              <span
                                key={skillIndex}
                                className={`px-3 py-1 bg-gradient-to-r ${item.gradient} bg-opacity-10 text-slate-300 text-xs rounded-full font-medium border border-slate-600 hover:scale-105 transition-transform duration-200`}
                              >
                                {skill}
                              </span>
                            ))}
                          </div>

                          {/* Achievements - Show only when expanded */}
                          {isExpanded && (
                            <div className="space-y-3 animate-fade-in-up bg-slate-900/50 rounded-2xl p-6 mt-6 border border-slate-700/30">
                              <h4 className="text-lg font-bold text-white mb-4 flex items-center">
                                <Trophy className="w-5 h-5 mr-2 text-yellow-400" />
                                <span className="bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 bg-clip-text text-transparent animate-text-flow">Key Achievements</span>
                              </h4>

                              <div className="grid gap-3">
                                {item.achievements.map((achievement, achievementIndex) => (
                                  <div
                                    key={achievementIndex}
                                    className="flex items-start text-slate-300 hover:text-cyan-300 transition-colors duration-200 group/achievement animate-slide-in-left"
                                    style={{ animationDelay: `${achievementIndex * 0.1}s` }}
                                  >
                                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${item.gradient} mt-2 mr-3 flex-shrink-0 animate-pulse`}></div>
                                    <span className="text-sm leading-relaxed bg-gradient-to-r from-slate-300 via-slate-200 to-slate-300 bg-clip-text text-transparent animate-text-flow-gentle">{achievement}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Expand/Collapse Button */}
                          <button
                            onClick={() => toggleExpanded(index)}
                            className={`w-full mt-6 py-3 px-6 bg-gradient-to-r ${item.gradient} text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2`}
                          >
                            {isExpanded ? (
                              <>
                                <ChevronUp className="w-5 h-5" />
                                Show Less
                              </>
                            ) : (
                              <>
                                <ChevronDown className="w-5 h-5" />
                                Show More Details
                              </>
                            )}
                          </button>
                        </div>

                        {/* Hover Effect Overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl pointer-events-none`}></div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>


    </section>
  );
};

export default Education;