import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import { SiReact, SiTailwindcss, SiDjango, SiPostgresql, SiRedis, SiDocker, SiVite } from 'react-icons/si';
import { Sparkles, Code2, ExternalLink, ArrowUpRight } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Projects() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const projects = [
    {
      title: 'TenantIQ',
      subtitle: 'Enterprise Multi-Tenant AI SaaS Platform',
      description: 'A robust multi-tenant architecture completely decoupling core tenant management from user schemas. Features custom subdomain routing, absolute data isolation, and an advanced AI document processing pipeline with dynamic chatbot integration.',
      tag: 'AI · SaaS',
      gradient: 'from-red-600 to-red-900',
      repos: [
        { label: 'Frontend', url: 'https://github.com/saheer07/TenantIq-Frontend' },
        { label: 'Backend', url: 'https://github.com/saheer07/TenantIq-Backend' },
      ],
      tech: [
        { name: 'Django', icon: <SiDjango /> },
        { name: 'React', icon: <SiReact /> },
        { name: 'PostgreSQL', icon: <SiPostgresql /> },
        { name: 'Redis', icon: <SiRedis /> },
        { name: 'Docker', icon: <SiDocker /> },
      ],
    },
    {
      title: 'E-Commerce',
      subtitle: 'Full-Stack E-Commerce Platform',
      description: 'A scalable storefront featuring dynamic product catalogs, an integrated shopping cart, and secure checkout processes. Built using Vite for a lightning-fast frontend and a custom backend API to seamlessly handle transactions and inventory.',
      tag: 'Full-Stack',
      gradient: 'from-red-500 to-orange-600',
      repos: [
        { label: 'Frontend', url: 'https://github.com/saheer07/e-commerce-Frontend' },
        { label: 'Backend', url: 'https://github.com/saheer07/e-commerce-Backend' },
      ],
      tech: [
        { name: 'Django', icon: <SiDjango /> },
        { name: 'React', icon: <SiReact /> },
        { name: 'Tailwind CSS', icon: <SiTailwindcss /> },
        { name: 'Vite', icon: <SiVite /> },
        { name: 'PostgreSQL', icon: <SiPostgresql /> },
      ],
    },
  ];

  useEffect(() => {
    AOS.init({ duration: 1200, easing: 'ease-in-out', once: true });
  }, []);

  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, when: 'beforeChildren', staggerChildren: 0.2 },
    },
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] },
    },
  };

  return (
    <section
      id="projects"
      className="min-h-screen py-24 px-4 relative overflow-hidden bg-black"
    >
      {/* Floating background dots — same as About section */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-red-500/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{ y: [0, -40, 0], opacity: [0.2, 0.8, 0.2], scale: [1, 1.5, 1] }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <motion.div
        variants={containerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-7xl mx-auto relative z-10"
        data-aos="fade-up"
      >
        {/* Section header */}
        <motion.div variants={itemVariant} className="text-center mb-16">
          <motion.div className="inline-flex items-center gap-3 mb-6">
            <Sparkles className="w-8 h-8 text-red-500" />
            <h1 className="text-5xl lg:text-6xl font-black tracking-tight text-white">
              My <span className="text-red-500">Projects</span>
            </h1>
            <Sparkles className="w-8 h-8 text-red-500" />
          </motion.div>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Transforming ideas into interactive experiences with clean code and modern design
          </p>
        </motion.div>

        {/* Project cards */}
        <motion.div
          variants={containerVariant}
          className="grid md:grid-cols-2 gap-8 lg:gap-12"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariant}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="group relative"
            >
              {/* Glow effect */}
              <motion.div
                className={`absolute -inset-1 bg-gradient-to-r ${project.gradient} rounded-3xl blur-xl transition-opacity duration-500`}
                animate={{ opacity: hoveredIndex === index ? 0.3 : 0 }}
              />

              {/* Card */}
              <div
                className={`relative h-full backdrop-blur-xl bg-white/5 border rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 ${hoveredIndex === index
                    ? '-translate-y-2 border-red-500/30'
                    : 'border-white/10'
                  }`}
              >
                <div className="p-8 flex flex-col h-full">

                  {/* Top row: tag + arrow */}
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className={`px-4 py-1.5 bg-gradient-to-r ${project.gradient} text-white text-xs font-bold rounded-full`}
                    >
                      {project.tag}
                    </span>
                    <motion.div
                      animate={{ rotate: hoveredIndex === index ? 45 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ArrowUpRight className="w-5 h-5 text-red-500" />
                    </motion.div>
                  </div>

                  {/* Title & subtitle */}
                  <h3 className="text-3xl font-black text-white mb-1 group-hover:text-red-400 transition-colors">
                    {project.title}
                  </h3>
                  <div className="mb-8">
                    <p className="text-base font-medium text-gray-300 mb-2">{project.subtitle}</p>
                    <p className="text-sm text-gray-400 leading-relaxed">{project.description}</p>
                  </div>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tech.map((tech, idx) => (
                      <motion.span
                        key={idx}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:border-red-500/30 transition-colors"
                      >
                        <span className="text-red-400 text-sm">{tech.icon}</span>
                        {tech.name}
                      </motion.span>
                    ))}
                  </div>

                  {/* Push links to bottom */}
                  <div className="flex-1" />

                  {/* GitHub repo links */}
                  <div className="flex gap-3">
                    {project.repos.map((repo, rIdx) => (
                      <motion.a
                        key={rIdx}
                        href={repo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm font-semibold text-white hover:bg-white/10 hover:border-red-500/40 transition-all"
                      >
                        <FaGithub className="w-4 h-4" />
                        {repo.label}
                        <ExternalLink className="w-3 h-3 text-gray-500" />
                      </motion.a>
                    ))}
                  </div>

                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div variants={itemVariant} className="text-center mt-16">
          <div className="inline-flex items-center gap-4 px-6 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
            <Code2 className="w-5 h-5 text-red-500" />
            <span className="text-gray-400 text-base">
              {projects.length} projects built with passion and precision
            </span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Projects;