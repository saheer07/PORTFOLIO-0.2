import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

function About() {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  return (
    <section
      id="about"
      className="min-h-screen py-20 px-4 bg-gray-950 text-white"
    >
      {/* Section Heading */}
      <h1
        className="text-5xl font-extrabold text-red-600 text-center mb-16 tracking-wide drop-shadow-[0_0_15px_rgba(255,0,0,0.7)]"
        data-aos="fade-down"
      >
        About Me
      </h1>

      <div
        data-aos="fade-up"
        className="min-h-[90vh] max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 bg-gradient-to-br from-black via-gray-900 to-red-900 p-6 sm:p-8 lg:p-12 rounded-2xl shadow-2xl"
     
      >
        {/* Profile Image */}
        <div className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-full overflow-hidden border-4 border-red-600 shadow-[0_0_20px_rgba(220,38,38,0.9)] hover:shadow-[0_0_40px_rgba(255,0,0,1)] transition-shadow duration-500 ease-in-out">
          <img
            src="https://blog.logrocket.com/wp-content/uploads/2022/01/python-developers-guide-react.png"
            alt="Saheer Chungath"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {/* Neon ring glow effect */}
          <span className="absolute inset-0 rounded-full ring-2 ring-red-500 ring-offset-2 animate-pulse" />
        </div>

        {/* Info & Text */}
        <div className="flex-1 space-y-8">
          <div>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-wide text-red-400 drop-shadow-[0_0_10px_rgba(255,0,0,0.8)]">
              Saheer Chungath
            </h2>
            <p className="mt-1 text-lg sm:text-xl font-semibold text-gray-300 uppercase tracking-widest">
              Full Stack Developer
            </p>
            <p className="mt-2 text-gray-400 text-sm sm:text-base italic">
              Based in Kerala, India
            </p>
          </div>

          <div className="space-y-4 text-gray-300 text-base sm:text-lg leading-relaxed max-w-prose font-light tracking-wide">
            <p>
              I’m a passionate full-stack developer crafting lightning-fast, scalable, and user-centric web experiences. Always driven by curiosity and the thrill of solving complex problems.
            </p>
            <p>
              From my early days exploring Python, I evolved into mastering the modern web using React, Django, and cutting-edge frameworks — always pushing boundaries.
            </p>
            <p>
              Clean, maintainable code and continuous growth fuel my journey forward. Let’s build the future, one line of code at a time.
            </p>
          </div>

          {/* Resume Download */}
          <div>
            <a
              href="/your-resume.pdf"
              download
              className="inline-block bg-gradient-to-r from-red-600 via-red-700 to-red-800 shadow-lg shadow-red-700/70 hover:shadow-red-900/90 transition-all duration-300 text-white font-bold py-3 px-8 rounded-full tracking-wide uppercase select-none text-lg"
              aria-label="Download Resume"
            >
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
