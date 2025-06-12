import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPython } from "react-icons/fa";
import AOS from 'aos';
import 'aos/dist/aos.css';
import saheerimg from "../assets/saheer.png";

const containerVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
      when: "beforeChildren",
      staggerChildren: 0.3,
    },
  },
};

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  return (
    <section className="min-h-screen py-20 px-4 bg-gray-950 text-white" id="home">
      <motion.div
        variants={containerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        className="min-h-[90vh] max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 bg-gradient-to-br from-black via-gray-900 to-red-900 p-6 sm:p-8 lg:p-12 rounded-2xl shadow-2xl"
        data-aos="fade-down"
      >
        {/* Image Section */}
        <motion.div
          variants={itemVariant}
          className="w-full lg:w-1/2 flex justify-center lg:justify-start"
        >
          <div className="p-4">
            <img
              src={saheerimg}
              alt="Profile"
              className="w-full max-w-md h-90 sm:max-w-lg lg:max-w-xl rounded-2xl object-cover border-4 border-red-600 shadow-2xl hover:scale-105 transition-transform duration-500 ease-in-out"
            />
          </div>
        </motion.div>

        {/* Text Section */}
        <motion.div
          variants={itemVariant}
          className="w-full lg:w-1/2 text-center lg:text-left space-y-6 max-w-2xl"
        >
          <motion.h1
            variants={itemVariant}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-wide leading-tight"
          >
            Hi, I'm <span className="text-red-500">Saheer</span>
          </motion.h1>

          <motion.p
            variants={itemVariant}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2 text-xl sm:text-2xl font-semibold tracking-tight text-red-400"
          >
            Python Full Stack Developer <FaPython />
          </motion.p>

          <motion.p
            variants={itemVariant}
            className="text-gray-300 text-base sm:text-lg leading-relaxed"
          >
            Passionate Python and React developer dedicated to building scalable, user-friendly web applications that solve real-world problems.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariant}
            className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-4"
          >
            <a
              href="#projects"
              className="bg-red-600 text-white px-7 py-3 rounded-full font-semibold hover:bg-red-700 shadow-lg hover:shadow-red-700 transition duration-300 text-center"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="border border-red-600 px-7 py-3 rounded-full font-semibold hover:bg-red-600 hover:text-white shadow-md transition duration-300 text-center"
            >
              Contact Me
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Home;
