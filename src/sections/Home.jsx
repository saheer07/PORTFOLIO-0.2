import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

function Home({ launchMode, setLaunchMode }) {
  const [loaded, setLoaded] = useState(false);
  const audioCtxRef = useRef(null);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const playEngineSound = () => {
    // Initialize Web Audio API
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    const ctx = audioCtxRef.current;
    
    // Synthesize engine rumble using oscillators and a lowpass filter
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc1.type = 'sawtooth';
    osc2.type = 'square';
    
    // Sweep frequency up for "revving" sound
    osc1.frequency.setValueAtTime(40, ctx.currentTime);
    osc1.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 1.5);
    osc1.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 2.5);

    osc2.frequency.setValueAtTime(41, ctx.currentTime);
    osc2.frequency.exponentialRampToValueAtTime(152, ctx.currentTime + 1.5);
    osc2.frequency.exponentialRampToValueAtTime(62, ctx.currentTime + 2.5);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(300, ctx.currentTime);
    filter.frequency.linearRampToValueAtTime(1500, ctx.currentTime + 1.5);
    filter.frequency.linearRampToValueAtTime(400, ctx.currentTime + 2.5);

    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(1, ctx.currentTime + 0.2);
    gainNode.gain.linearRampToValueAtTime(0.8, ctx.currentTime + 2);
    gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 3.5);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc1.start();
    osc2.start();
    osc1.stop(ctx.currentTime + 3.5);
    osc2.stop(ctx.currentTime + 3.5);
  };

  const handleLaunch = () => {
    setLaunchMode(true);
    playEngineSound();
    
    // Reset after some time
    setTimeout(() => {
      setLaunchMode(false);
    }, 4000);
  };

  return (
    <section 
      className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center pt-24" 
      id="home"
    >
      {/* Corner Brackets */}
      <div className="pointer-events-none absolute inset-8 z-40 border-[#e74c3c]/30">
        <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-[#e74c3c]" />
        <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-[#e74c3c]" />
        <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-[#e74c3c]" />
        <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-[#e74c3c]" />
      </div>

      {/* Animated Badge */}
      <motion.div 
        className="absolute top-24 left-12 z-30 flex items-center gap-3 backdrop-blur-sm bg-black/40 border border-[#e74c3c]/30 px-4 py-2 rounded-sm"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div 
          className="w-2.5 h-2.5 rounded-full bg-[#e74c3c]"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <span className="text-xs tracking-[0.2em] text-[#e74c3c] uppercase font-['Orbitron']">Sys. Online</span>
      </motion.div>

      {/* Main Content Container */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 h-full flex flex-col justify-center items-center font-['Orbitron']">
        
        {/* HUD Stats Left */}
        <motion.div 
          className="absolute left-6 md:left-12 top-1/3 flex flex-col gap-6 hidden md:flex"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: loaded ? 1 : 0, x: loaded ? 0 : -30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="flex flex-col">
            <span className="text-[#e74c3c] text-sm tracking-widest uppercase mb-1 border-b border-[#e74c3c]/30 pb-1 w-24">Power</span>
            <span className="text-3xl font-bold tracking-wider">565 <span className="text-sm text-gray-400">PS</span></span>
          </div>
          <div className="flex flex-col">
            <span className="text-[#e74c3c] text-sm tracking-widest uppercase mb-1 border-b border-[#e74c3c]/30 pb-1 w-24">0-100</span>
            <span className="text-3xl font-bold tracking-wider">2.7<span className="text-sm text-gray-400">S</span></span>
          </div>
        </motion.div>

        {/* HUD Stats Right */}
        <motion.div 
          className="absolute right-6 md:right-12 top-1/3 flex flex-col gap-6 hidden md:flex items-end text-right"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: loaded ? 1 : 0, x: loaded ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="flex flex-col items-end">
            <span className="text-[#e74c3c] text-sm tracking-widest uppercase mb-1 border-b border-[#e74c3c]/30 pb-1 w-24 text-right">Top Spd</span>
            <span className="text-3xl font-bold tracking-wider">315 <span className="text-sm text-gray-400">KM/H</span></span>
          </div>

          <div className="relative flex flex-col items-end w-32 h-32 mt-4">
            <span className="text-[#e74c3c] text-sm tracking-widest uppercase absolute -top-6 right-0">RPM x1000</span>
            {/* RPM Gauge */}
            <svg viewBox="0 0 100 100" className="w-full h-full rotate-[135deg]">
              <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4" strokeDasharray="188.5" className="stroke-dashoffset-0" />
              {/* Redline section */}
              <circle cx="50" cy="50" r="40" fill="none" stroke="#e74c3c" strokeWidth="4" strokeDasharray="188.5" strokeDashoffset="140" className="stroke-[#e74c3c] drop-shadow-[0_0_5px_#e74c3c]" />
              {/* Animated Needle/Arc */}
              <motion.circle 
                cx="50" 
                cy="50" 
                r="40" 
                fill="none" 
                stroke="white" 
                strokeWidth="4" 
                strokeDasharray="188.5"
                initial={{ strokeDashoffset: 188.5 }}
                animate={{ strokeDashoffset: loaded ? (launchMode ? 0 : 50) : 188.5 }} 
                transition={{ type: "spring", stiffness: 50, delay: launchMode ? 0 : 1.2, duration: launchMode ? 0.3 : 2 }}
                className="drop-shadow-[0_0_8px_white]"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center -rotate-0 text-2xl font-bold">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                {launchMode ? "MAX" : "7.1"}
              </motion.span>
            </div>
          </div>
        </motion.div>

        <div className="text-center z-20 mt-[-15vh] max-w-4xl mx-auto flex flex-col items-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 20, filter: loaded ? 'blur(0px)' : 'blur(10px)' }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-500 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
          >
            My Portfolio
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, letterSpacing: "0px" }}
            animate={{ opacity: loaded ? 1 : 0, letterSpacing: "12px" }}
            transition={{ duration: 1.5, delay: 0.6 }}
            className="text-[#e74c3c] text-sm md:text-base font-medium uppercase drop-shadow-[0_0_8px_rgba(231,76,60,0.8)] mb-12"
          >
            Born on the Nürburgring · Feared on Every Road
          </motion.p>
          
          <motion.button
            onClick={handleLaunch}
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(231,76,60,0.6)" }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-[#e74c3c]/10 border border-[#e74c3c] text-[#e74c3c] font-bold text-xl uppercase tracking-widest backdrop-blur-md rounded-md cursor-pointer hover:bg-[#e74c3c]/30 transition-all z-50 mt-10"
          >
            LAUNCH CONTROL
          </motion.button>
        </div>

        {/* Space for the background car */}
        <div className="h-[250px] md:h-[400px]"></div>
      </div>
    </section>
  );
}

export default Home;