import React, { useState } from 'react';
import { Brain, Target, Lightbulb, Users, Award, ChevronRight } from 'lucide-react';
import { portfolioData } from './portfolioData';

const About: React.FC = () => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const toggleCard = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  const bio = portfolioData.bio;
  // ... (focusAreas constant remains as it's more of a UI structure, but could be moved to data too if needed)
  const focusAreas = [
    {
      icon: Brain,
      title: 'Machine Learning & AI',
      description: 'Developing models and algorithms that can learn from data and make intelligent decisions.',
      details: 'Expertise in supervised and unsupervised learning, neural networks, and deep learning frameworks like TensorFlow and PyTorch.'
    },
    {
      icon: Target,
      title: 'Data Analysis & Visualization',
      description: 'Extracting insights from complex datasets and creating meaningful visualizations.',
      details: 'Proficient in Python libraries like Pandas, NumPy, Matplotlib, and Plotly for comprehensive data analysis and visualization.'
    },
    {
      icon: Lightbulb,
      title: 'Deep Learning',
      description: 'Building neural networks for image recognition, natural language processing, and more.',
      details: 'Experience with CNN, RNN, LSTM architectures for computer vision and NLP applications.'
    },
    {
      icon: Users,
      title: 'Big Data Technologies',
      description: 'Working with tools and frameworks to process and analyze large-scale data.',
      details: 'Knowledge of distributed computing, data warehousing, and big data processing frameworks.'
    }
  ];

  return (
    <section id="about" className="py-20 bg-slate-50 dark:bg-gray-900 animate-section-pop">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 animate-pop-in">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-flow">
              About Me
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8 animate-scale-in"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Personal Info */}
          <div className="space-y-8 animate-slide-in-left">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 animate-pop-in-delay">
              <div className="flex items-center mb-6">
                <Award className="w-8 h-8 text-blue-600 mr-3 animate-bounce-gentle" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-gradient-flow">
                    AI & Data Science Enthusiast
                  </span>
                </h3>
              </div>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                {bio.summary}
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white dark:bg-gray-700 p-4 rounded-lg animate-pop-in-card">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Name</div>
                  <div className="font-semibold text-gray-900 dark:text-white">{bio.name}</div>
                </div>
                <div className="bg-white dark:bg-gray-700 p-4 rounded-lg animate-pop-in-card-delay">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Degree</div>
                  <div className="font-semibold text-gray-900 dark:text-white">B.Tech AI & DS</div>
                </div>
                <div className="bg-white dark:bg-gray-700 p-4 rounded-lg animate-pop-in-card-delay-2">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Education</div>
                  <div className="font-semibold text-gray-900 dark:text-white text-xs">{bio.education.college}</div>
                </div>
                <div className="bg-white dark:bg-gray-700 p-4 rounded-lg animate-pop-in-card-delay-3">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Location</div>
                  <div className="font-semibold text-gray-900 dark:text-white">{bio.location}</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 animate-pop-in-delay-2">
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                <span className="bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent animate-gradient-flow">
                  Currently Learning
                </span>
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                Advanced Machine Learning Algorithms, Deep Neural Networks, and Computer Vision
              </p>
            </div>
          </div>

          {/* Right Column - Focus Areas */}
          <div className="space-y-4 animate-slide-in-right">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 animate-pop-in">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-flow">
                My Focus Areas
              </span>
            </h3>

            {focusAreas.map((area, index) => {
              const IconComponent = area.icon;
              const isExpanded = expandedCard === index;

              return (
                <div
                  key={index}
                  className={`bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer animate-pop-in-stagger ${isExpanded ? 'ring-2 ring-blue-500 transform scale-105' : 'hover:transform hover:scale-102'
                    }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => toggleCard(index)}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg animate-bounce-gentle">
                          <IconComponent className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                              {area.title}
                            </span>
                          </h4>
                          <p className="text-gray-600 dark:text-gray-300 text-sm">
                            {area.description}
                          </p>
                        </div>
                      </div>
                      <ChevronRight
                        className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''
                          }`}
                      />
                    </div>

                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 animate-fade-in-up">
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          {area.details}
                        </p>
                      </div>
                    )}
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

export default About;