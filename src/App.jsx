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
    // If refreshed with any hash (#about, #contact, etc) → go back to Home
    if (window.location.hash) {
      setTimeout(() => {
        const home = document.getElementById('home');
        if (home) {
          home.scrollIntoView({ behavior: 'smooth' });
          history.replaceState(null, null, ' '); // remove hash from URL
        }
      }, 100);
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
