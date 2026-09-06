import React, { useState, useEffect } from 'react';
import { Brain, Zap, Network, Sparkles } from 'lucide-react';

// Complete language configuration with exactly 5 languages as specified
const greetings = [
  { lang: 'English', text: 'Welcome to My Portfolio', color: 'text-cyan-300' },
  { lang: 'German', text: 'Willkommen zu meinem Portfolio', color: 'text-purple-300' },
  { lang: 'Korean', text: '내 포트폴리오에 오신 것을 환영합니다', color: 'text-green-300' },
  { lang: 'Telugu', text: 'నా పోర్ట్‌ఫోలియోకు స్వాగతం', color: 'text-yellow-300' },
  { lang: 'Tamil', text: 'என் போர்ட்ஃபோலியோவிற்கு வரவேற்கிறேன்', color: 'text-pink-300' },
];

const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [currentGreeting, setCurrentGreeting] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const [greetingStarted, setGreetingStarted] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  // Eliminate loading glitches with proper initialization
  useEffect(() => {
    const initializeComponent = () => {
      // Small delay to ensure CSS is ready
      setTimeout(() => {
        setIsInitialized(true);
      }, 100);
    };
    requestAnimationFrame(initializeComponent);
  }, []);

  // One simplified effect for all timing to ensure perfect synchronization
  useEffect(() => {
    if (!isInitialized) return;

    // Start greetings slightly after init
    const startTimeout = setTimeout(() => {
      setGreetingStarted(true);
    }, 300);

    return () => clearTimeout(startTimeout);
  }, [isInitialized]);

  // Main animation loop driving both progress and greetings
  useEffect(() => {
    if (!isInitialized || !greetingStarted) return;

    const totalDuration = 12500; // Duration tailored to 5 greetings * 2.5s
    const startTime = Date.now();
    let animationFrameId: number;

    const updateState = () => {
      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min((elapsed / totalDuration) * 100, 100);

      setProgress(rawProgress);

      // Synchronize greeting index with progress directly
      const greetingIndex = Math.min(
        Math.floor((rawProgress / 100) * greetings.length),
        greetings.length - 1
      );

      setCurrentGreeting(greetingIndex);

      if (rawProgress < 100) {
        animationFrameId = requestAnimationFrame(updateState);
      } else {
        setLoadingComplete(true);
        // Start exit animation after a brief "Ready" state
        setTimeout(() => {
          setIsExiting(true);
          // Call parent onComplete after exit animation finishes
          setTimeout(onComplete, 800);
        }, 800);
      }
    };

    animationFrameId = requestAnimationFrame(updateState);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isInitialized, greetingStarted, onComplete]);

  // Prevent rendering until properly initialized
  if (!isInitialized) {
    return (
      <div className="fixed inset-0 w-screen h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 flex items-center justify-center z-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
      </div>
    );
  }

  return (
    <div
      className={`fixed inset-0 w-screen h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 flex items-center justify-center z-50 overflow-hidden transition-opacity duration-700 ease-out ${isExiting ? 'opacity-0 scale-105' : 'opacity-100'}`}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-24 h-24 bg-cyan-400/10 rounded-full animate-float-gentle">
          <Brain className="w-6 h-6 text-cyan-400/40 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse-soft" />
        </div>
        <div className="absolute bottom-20 right-20 w-20 h-20 bg-purple-400/10 rounded-full animate-float-gentle-delay">
          <Network className="w-5 h-5 text-purple-400/40 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-spin-gentle" />
        </div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-pink-400/10 rounded-full animate-bounce-gentle">
          <Zap className="w-4 h-4 text-pink-400/40 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse-soft" />
        </div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-lg mx-auto flex flex-col items-center justify-center px-8 space-y-8">

        {/* Logo Section - Original Design */}
        <div className="text-center animate-fade-in-smooth">
          <div className="w-20 h-20 mx-auto mb-6 relative">
            <div className="absolute inset-0 border-2 border-cyan-400/30 rounded-full animate-spin-slow"></div>
            <div className="absolute inset-2 border-2 border-purple-400/30 rounded-full animate-spin-reverse"></div>

            <div className="absolute inset-3 bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center animate-glow-soft relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/10 animate-shimmer-gentle"></div>
              <span className="text-lg font-black text-white animate-text-glow-soft relative z-10">YV</span>
            </div>

            <div className="absolute inset-0 animate-orbit-gentle">
              <Sparkles className="w-3 h-3 text-yellow-400 absolute -top-1 left-1/2 transform -translate-x-1/2 animate-twinkle-soft" />
            </div>
          </div>

          <h1 className="text-2xl font-bold mb-2 animate-slide-up-smooth" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-flow-smooth">
              Yogeshwaran V
            </span>
          </h1>

          <p className="text-sm text-cyan-200 opacity-80 animate-fade-in-delay-smooth">
            AI & Data Science Portfolio
          </p>
        </div>

        {/* Language Display - Original Design */}
        <div className={`w-full transition-all duration-500 ${greetingStarted ? 'animate-slide-in-smooth' : 'opacity-50'}`}>
          <div className="bg-gradient-to-br from-slate-800/90 via-blue-900/90 to-purple-900/90 backdrop-blur-xl rounded-2xl p-6 border border-cyan-400/30 shadow-2xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden">

            {/* Language Progress Indicators - Original Dots */}
            <div className="absolute top-2 right-2 flex space-x-1">
              {greetings.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-500 ${index === currentGreeting
                    ? 'bg-cyan-400 scale-125 shadow-lg shadow-cyan-400/50 animate-pulse-indicator'
                    : index < currentGreeting
                      ? 'bg-cyan-400/50'
                      : 'bg-gray-600'
                    }`}
                />
              ))}
            </div>

            <div className="text-center">
              {/* Greeting Text Display */}
              <div className="h-20 flex items-center justify-center mb-3">
                <div
                  className={`text-lg font-bold ${greetings[currentGreeting].color} text-center transition-all duration-700 transform animate-text-transition px-2`}
                  key={`greeting-${currentGreeting}`}
                  style={{
                    minHeight: '5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    lineHeight: '1.3',
                    wordBreak: 'keep-all',
                    overflowWrap: 'break-word'
                  }}
                >
                  {greetings[currentGreeting].text}
                </div>
              </div>

              {/* Language Information - Original Style */}
              <div className="flex items-center justify-center space-x-2 animate-fade-in-smooth flex-wrap">
                <div className={`w-3 h-3 rounded-full ${greetings[currentGreeting].color.replace('text-', 'bg-')} animate-pulse-soft`}></div>
                <div className="text-sm text-cyan-200 opacity-80 font-medium">
                  {greetings[currentGreeting].lang}
                </div>
                <div className="text-xs text-gray-400">
                  ({currentGreeting + 1}/{greetings.length})
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Section - Original Design */}
        <div className={`w-full space-y-6 transition-all duration-500 ${isInitialized ? 'animate-slide-in-right-smooth' : 'opacity-50'}`}>
          {/* Progress Bar with Floating Bubble */}
          <div className="relative">
            <div className="bg-slate-800/80 rounded-full h-5 overflow-hidden border border-cyan-400/30 shadow-inner">
              <div
                className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-full h-5 relative overflow-hidden animate-progress-flow-smooth"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-transparent to-white/40 animate-shimmer-progress"></div>
                <div className="absolute top-0.5 left-1 w-2 h-2 bg-white/80 rounded-full animate-progress-dot-smooth"></div>
              </div>
            </div>

            {/* Progress Percentage Bubble */}
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 animate-bounce-soft">
              <div className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                {Math.round(progress)}%
              </div>
            </div>
          </div>

          {/* Loading Status Text */}
          <div className="text-center animate-pulse-text-soft">
            <div className="text-xl font-bold text-cyan-200 mb-2">
              {loadingComplete ? 'Ready to Launch!' : 'Loading Portfolio...'}
            </div>
            <div className="text-sm text-purple-300 opacity-80 transition-all duration-500">
              {loadingComplete
                ? 'Welcome to Yogeshwaran V\'s AI & Data Science Portfolio'
                : `Preparing amazing content for you... (${currentGreeting + 1}/${greetings.length} languages)`
              }
            </div>
          </div>
        </div>

        {/* Animated Loading Dots */}
        {/* Internal Style for Smoother Dot Animation */}
        <style>
          {`
            @keyframes bounce-dot {
              0%, 100% { transform: translateY(0); opacity: 0.8; }
              50% { transform: translateY(-8px); opacity: 1; }
            }
          `}
        </style>

        {/* Animated Loading Dots */}
        <div className="flex justify-center space-x-3 animate-fade-in-up-smooth">
          <div
            className="w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full shadow-lg"
            style={{ animation: 'bounce-dot 1.2s infinite ease-in-out', animationDelay: '0s' }}
          >
            <div className="w-2 h-2 bg-white/80 rounded-full animate-pulse-soft m-1"></div>
          </div>
          <div
            className="w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full shadow-lg"
            style={{ animation: 'bounce-dot 1.2s infinite ease-in-out', animationDelay: '0.2s' }}
          >
            <div className="w-2 h-2 bg-white/80 rounded-full animate-pulse-soft m-1"></div>
          </div>
          <div
            className="w-4 h-4 bg-gradient-to-r from-pink-400 to-red-400 rounded-full shadow-lg"
            style={{ animation: 'bounce-dot 1.2s infinite ease-in-out', animationDelay: '0.4s' }}
          >
            <div className="w-2 h-2 bg-white/80 rounded-full animate-pulse-soft m-1"></div>
          </div>
        </div>

        {/* Status Indicators - Original Design */}
        <div className="grid grid-cols-3 gap-4 w-full animate-fade-in-up-delay-smooth">
          <div className="bg-slate-800/70 backdrop-blur-sm rounded-xl p-4 border border-cyan-400/30 transform hover:scale-105 transition-all duration-300 animate-card-float-smooth">
            <div className="text-center">
              <div className="text-sm text-cyan-200 mb-2">Neural Networks</div>
              <div className={`text-2xl transition-all duration-500 ${progress > 25 ? 'text-green-400 scale-110' : 'text-slate-600 scale-90'}`}>✓</div>
            </div>
          </div>
          <div className="bg-slate-800/70 backdrop-blur-sm rounded-xl p-4 border border-purple-400/30 transform hover:scale-105 transition-all duration-300 animate-card-float-delay-smooth">
            <div className="text-center">
              <div className="text-sm text-purple-200 mb-2">Data Science</div>
              <div className={`text-2xl transition-all duration-500 ${progress > 50 ? 'text-green-400 scale-110' : 'text-slate-600 scale-90'}`}>✓</div>
            </div>
          </div>
          <div className="bg-slate-800/70 backdrop-blur-sm rounded-xl p-4 border border-pink-400/30 transform hover:scale-105 transition-all duration-300 animate-card-float-delay-2-smooth">
            <div className="text-center">
              <div className="text-sm text-pink-200 mb-2">Machine Learning</div>
              <div className={`text-2xl transition-all duration-500 ${progress > 75 ? 'text-green-400 scale-110' : 'text-slate-600 scale-90'}`}>✓</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default LoadingScreen;