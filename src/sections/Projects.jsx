import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import { SiReact, SiTailwindcss, SiDjango, SiPostgresql, SiRedis, SiDocker, SiVite } from 'react-icons/si';
import { Target, ExternalLink, ArrowUpRight, ShieldCheck } from 'lucide-react';
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
      status: 'OPERATIONAL',
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
      status: 'OPERATIONAL',
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
      className="min-h-screen py-24 px-4 relative flex items-center"
    >
      <motion.div
        variants={containerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-7xl mx-auto relative z-10 w-full"
        data-aos="fade-up"
      >
        {/* Section header */}
        <motion.div variants={itemVariant} className="mb-12 font-['Orbitron'] flex flex-col items-start border-l-4 border-[#e74c3c] pl-6 ml-4">
          <h1 className="text-4xl lg:text-5xl font-black tracking-widest text-white uppercase shadow-sm">
            Mission <span className="text-[#e74c3c]">Logs</span>
          </h1>
          <p className="text-sm text-[#e74c3c] tracking-[0.3em] uppercase mt-2">
            Archived Development Blueprints
          </p>
        </motion.div>

        {/* Project cards */}
        <motion.div
          variants={containerVariant}
          className="grid md:grid-cols-2 gap-8 lg:gap-12 px-4"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariant}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="group relative h-full"
            >
              <div
                className={`relative h-full bg-[#0a0a0a]/80 backdrop-blur-md border border-[#e74c3c]/30 p-8 flex flex-col transition-all duration-500 font-['Orbitron'] ${hoveredIndex === index
                    ? 'border-[#e74c3c] shadow-[0_0_30px_rgba(231,76,60,0.2)]'
                    : ''
                  }`}
              >
                {/* Corner details */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#e74c3c] transition-all" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#e74c3c] transition-all" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#e74c3c] transition-all" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#e74c3c] transition-all" />
                
                {/* Background scanning line on hover */}
                {hoveredIndex === index && (
                  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
                    <div className="w-full h-[2px] bg-[#e74c3c] animate-[scan_2s_linear_infinite]" />
                  </div>
                )}

                {/* Top row: tag + status */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#e74c3c]/20 relative z-10">
                  <span
                    className="text-[#e74c3c] text-xs font-bold tracking-[0.2em] uppercase"
                  >
                    [{project.tag}]
                  </span>
                  <div className="flex items-center gap-2 text-xs text-white uppercase tracking-widest">
                    <ShieldCheck className="w-4 h-4 text-[#e74c3c]" />
                    {project.status}
                  </div>
                </div>

                {/* Title & subtitle */}
                <div className="relative z-10 mb-6">
                  <h3 className="text-2xl lg:text-3xl font-black text-white mb-2 uppercase tracking-wide group-hover:text-[#e74c3c] transition-colors flex items-center justify-between">
                    {project.title}
                    <motion.div
                      animate={{ rotate: hoveredIndex === index ? 45 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-[#e74c3c]"
                    >
                      <ArrowUpRight className="w-6 h-6" />
                    </motion.div>
                  </h3>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{project.subtitle}</p>
                </div>

                <div className="relative z-10 mb-8 font-sans text-sm text-gray-300 leading-relaxed">
                  <span className="text-[#e74c3c] font-bold">{'// '}</span>{project.description}
                </div>

                {/* Tech stack */}
                <div className="relative z-10 flex flex-wrap gap-2 mb-8">
                  {project.tech.map((tech, idx) => (
                    <motion.span
                      key={idx}
                      className="flex items-center gap-1.5 px-2 py-1 bg-[#e74c3c]/5 border border-[#e74c3c]/30 text-[10px] uppercase font-bold text-gray-300 hover:text-white hover:border-[#e74c3c] transition-colors"
                    >
                      <span className="text-[#e74c3c]">{tech.icon}</span>
                      {tech.name}
                    </motion.span>
                  ))}
                </div>

                {/* Push links to bottom */}
                <div className="flex-1" />

                {/* GitHub repo links */}
                <div className="relative z-10 flex gap-3 pt-6 border-t border-[#e74c3c]/20">
                  {project.repos.map((repo, rIdx) => (
                    <motion.a
                      key={rIdx}
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#111] border border-[#e74c3c]/30 text-xs font-bold text-white hover:border-[#e74c3c] hover:bg-[#e74c3c]/10 transition-all uppercase tracking-widest"
                    >
                      <FaGithub className="w-4 h-4 text-[#e74c3c]" />
                      {repo.label}
                    </motion.a>
                  ))}
                </div>

              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div variants={itemVariant} className="text-center mt-12">
          <div className="inline-flex items-center gap-4 px-6 py-3 border border-[#e74c3c]/30 bg-black/50 backdrop-blur-md">
            <Target className="w-4 h-4 text-[#e74c3c]" />
            <span className="text-[#e74c3c] font-['Orbitron'] text-xs font-bold tracking-[0.2em] uppercase">
              {projects.length} System Blueprints Executed
            </span>
            <Target className="w-4 h-4 text-[#e74c3c]" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Projects;