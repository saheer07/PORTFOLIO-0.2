import React from 'react';
import { motion } from 'framer-motion';
import gtrBg from '../assets/nissan_gtr_bg.png';

export default function Background({ launchMode }) {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#050505] pointer-events-none">
      
      {/* Scanline Overlay */}
      <div 
        className="absolute inset-0 z-50 opacity-[0.03]"
        style={{
          background: 'repeating-linear-gradient(to bottom, transparent 0px, transparent 2px, #fff 2px, #fff 4px)'
        }}
      />
      
      {/* Vignette */}
      <div className="absolute inset-0 z-40 shadow-[inset_0_0_150px_rgba(0,0,0,0.9)]" />
      
      {/* Star Field */}
      <div className="absolute inset-0 z-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 'px',
              height: Math.random() * 2 + 'px',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.1
            }}
            animate={{ opacity: [0.1, 0.6, 0.1] }}
            transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* Horizon Glow Effect */}
      <div className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[600px] z-10 opacity-40 mix-blend-screen"
           style={{
             background: 'radial-gradient(ellipse at center, rgba(231, 76, 60, 0.5) 0%, rgba(5, 5, 5, 0) 70%)'
           }}
      />

      {/* Perspective Road Lines Grid */}
      <div className="absolute inset-0 z-10 overflow-hidden perspective-[1000px] top-[55%] h-[45%] w-full">
        <motion.div 
          className="absolute inset-x-[-50%] top-0 h-[300%] origin-top border-t border-[#e74c3c]/20"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(231, 76, 60, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(231, 76, 60, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
            transform: 'rotateX(80deg)'
          }}
          animate={{ backgroundPosition: ['0px 0px', launchMode ? '0px 300px' : '0px 100px'] }}
          transition={{ duration: launchMode ? 0.2 : 0.5, repeat: Infinity, ease: "linear" }}
        />
        {/* Center Road Line */}
        <motion.div 
          className="absolute left-1/2 top-0 h-[300%] w-[-2px] origin-top border-l-2 border-dashed border-[#e74c3c]/40"
          style={{ transform: 'rotateX(80deg) translateX(-50%)' }}
        />
      </div>

      {/* GT-R Image (Rises on Launch) */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[80%] z-20 flex justify-center items-end"
        initial={{ y: 150, scale: 1 }}
        animate={{ 
          y: launchMode ? [-10, 10, -10] : [20, 0, 20], 
          scale: launchMode ? 1.05 : 1,
          filter: launchMode ? "brightness(1.5) contrast(1.2)" : "brightness(1) contrast(1)"
        }}
        transition={{ 
          duration: launchMode ? 0.05 : 4, // Fast shake if launched, smooth float if idle
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <img 
          src={gtrBg} 
          alt="Nissan GT-R Background" 
          className="max-h-full max-w-full lg:max-w-[70%] object-cover object-bottom drop-shadow-[0_-20px_50px_rgba(231,76,60,0.3)]" 
          style={{ 
            maskImage: 'linear-gradient(to top, black 80%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to top, black 80%, transparent 100%)'
          }} 
        />
      </motion.div>
    </div>
  );
}
