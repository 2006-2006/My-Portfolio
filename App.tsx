import { useState } from 'react';
import LoadingScreen from './LoadingScreen';
import Header from './Header';
import Hero from './Hero';
import About from './About';
import Skills from './Skills';
import Projects from './Projects';
import Education from './Education';
import Contact from './Contact';
import PortfolioStats from './PortfolioStats';
import Footer from './Footer';
import Copyright from './Copyright';
import AIChat from './AIChat';



import { ThemeProvider } from './ThemeContext';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-slate-50 dark:bg-gray-900 transition-colors duration-300">
        <Header />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Education />
          <Contact />
        </main>
        <Footer />
        <PortfolioStats />
        <Copyright />
        <AIChat />
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </div>
    </ThemeProvider>
  );
}

export default App;
