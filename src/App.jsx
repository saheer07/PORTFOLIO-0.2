import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './sections/Home';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

function App() {
  useEffect(() => {
    // On page load or refresh, scroll to Home
    const scrollToHome = () => {
      const home = document.getElementById('home');
      if (home) {
        home.scrollIntoView({ behavior: 'smooth' });
      }
    };

    // If user refreshed from a hash (#about, #contact, etc)
    if (window.location.hash) {
      setTimeout(() => {
        scrollToHome();
        // Remove hash from URL (so it looks clean)
        window.history.replaceState(null, '', window.location.pathname);
      }, 100);
    } else {
      // If no hash, just ensure Home is visible on first load
      setTimeout(scrollToHome, 100);
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="pt-16">
        <Home />
        <About />
        <Skills />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </>
  );
}

export default App;
