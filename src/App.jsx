import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Home from './sections/Home';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import Background from './components/Background';

function App() {
  const [launchMode, setLaunchMode] = useState(false);

  useEffect(() => {
    const scrollToHome = () => {
      const home = document.getElementById('home');
      if (home) {
        home.scrollIntoView({ behavior: 'smooth' });
      }
    };

    if (window.location.hash) {
      setTimeout(() => {
        scrollToHome();
        window.history.replaceState(null, '', window.location.pathname);
      }, 100);
    } else {
      setTimeout(scrollToHome, 100);
    }
  }, []);

  return (
    <div className="relative min-h-screen text-white font-['Orbitron',_sans-serif] selection:bg-[#e74c3c] selection:text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>
      <Background launchMode={launchMode} />
      <div className="relative z-10 font-sans">
        <Navbar />
        <Home launchMode={launchMode} setLaunchMode={setLaunchMode} />
        <About />
        <Skills />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}

export default App;
