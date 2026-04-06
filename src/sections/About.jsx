import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaDownload,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import {
  MapPin,
  Activity,
  Crosshair,
  Clock,
  Settings,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import Swal from "sweetalert2";
import saheerCyberEdit from "../assets/saheer_cyber_edit.png";

// 🔹 Animation Variants
const containerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
};

const itemVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

// 🔹 Download Resume with Automotive/HUD Confirmation
const handleDownload = () => {
  Swal.fire({
    title: '<span style="font-family: \'Orbitron\', sans-serif; color: #e74c3c; font-weight: 900; font-size: 1.5rem; letter-spacing: 2px;">AUTHORIZE DOWNLOAD?</span>',
    html: `
      <div style="font-family: \'Orbitron\', sans-serif; text-align: left; padding: 10px; border: 1px solid #e74c3c; background: rgba(231,76,60,0.05);">
        <p style="color: #ccc; font-size: 0.9rem; margin-bottom: 0.5rem; text-transform: uppercase;">
          > Target File: <span style="color: white; font-weight: bold;">Pilot_Manifest.pdf</span>
        </p>
        <p style="color: #ccc; font-size: 0.9rem; margin-bottom: 1rem; text-transform: uppercase;">
          > Status: <span style="color: #2ecc71; font-weight: bold;">Ready for extraction</span>
        </p>
      </div>
    `,
    showCancelButton: true,
    confirmButtonText: '<span style="font-family: \'Orbitron\', sans-serif; font-weight: bold; letter-spacing: 1px;">INITIATE</span>',
    cancelButtonText: '<span style="font-family: \'Orbitron\', sans-serif; font-weight: bold; letter-spacing: 1px;">ABORT</span>',
    confirmButtonColor: '#e74c3c',
    cancelButtonColor: 'transparent',
    background: 'rgba(5,5,5,0.95)',
    backdrop: `rgba(0,0,0,0.85)`,
    customClass: {
      popup: 'border border-[#e74c3c] rounded-none shadow-[0_0_30px_rgba(231,76,60,0.4)] relative',
      confirmButton: 'border border-[#e74c3c] px-6 py-2 bg-[#e74c3c]/20 hover:bg-[#e74c3c]/40 rounded-none transition-all',
      cancelButton: 'border border-[#555] px-6 py-2 hover:bg-[#333] rounded-none text-gray-400 transition-all',
    }
  }).then((result) => {
    if (result.isConfirmed) {
      // Show downloading animation HUD style
      Swal.fire({
        title: '<span style="font-family: \'Orbitron\', sans-serif; color: #e74c3c; font-weight: 900; font-size: 1.5rem; letter-spacing: 2px;">EXTRACTING DATA...</span>',
        html: `
          <div style="margin: 2rem 0; font-family: \'Orbitron\', sans-serif;">
            <div style="width: 100%; height: 2px; background: #333; margin: 1rem 0; position: relative; overflow: hidden;">
              <div style="position: absolute; left: 0; top: 0; height: 100%; background: #e74c3c; width: 100%; animation: loadBar 2.5s ease-out forwards;"></div>
            </div>
          </div>
          <style>
            @keyframes loadBar {
              0% { transform: scaleX(0); transform-origin: left; }
              50% { transform: scaleX(0.6); transform-origin: left; }
              100% { transform: scaleX(1); transform-origin: left; }
            }
          </style>
        `,
        timer: 2500,
        showConfirmButton: false,
        background: 'rgba(5,5,5,0.95)',
        backdrop: `rgba(0,0,0,0.85)`,
        customClass: {
          popup: 'border border-[#e74c3c] rounded-none shadow-[0_0_30px_rgba(231,76,60,0.4)]',
        }
      });

      // Actual download
      setTimeout(() => {
        const link = document.createElement("a");
        link.href = "/Saheer_c (1).pdf";
        link.download = "Pilot_Manifest_Saheer.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, 2500);
    }
  });
};

function About() {
  const stats = [
    { icon: Clock, label: "Flight Time (Months)", value: "7+" },
    { icon: Crosshair, label: "Missions Completed", value: "5+" },
    { icon: Activity, label: "System Uptime (%)", value: "99.9" },
    { icon: Settings, label: "Modules Mastered", value: "8+" },
  ];

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1200,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <section
      id="about"
      className="min-h-screen py-24 px-4 relative flex items-center"
    >
      {/* Main Container */}
      <motion.div
        variants={containerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-7xl mx-auto relative z-10 w-full"
        data-aos="fade-up"
      >
        {/* Header */}
        <motion.div variants={itemVariant} className="mb-12 font-['Orbitron'] flex flex-col items-start border-l-4 border-[#e74c3c] pl-6 ml-4">
          <h1 className="text-4xl lg:text-5xl font-black tracking-widest text-white uppercase shadow-sm">
            Pilot <span className="text-[#e74c3c]">Specs</span>
          </h1>
          <p className="text-sm text-[#e74c3c] tracking-[0.3em] uppercase mt-2">
            Ident: Saheer Chungath // Level 1 Operator
          </p>
        </motion.div>

        {/* Content - HUD Style Panel */}
        <div
          className="bg-black/60 backdrop-blur-md border border-[#e74c3c]/30 p-8 lg:p-12 relative overflow-hidden font-['Orbitron'] shadow-[inset_0_0_50px_rgba(0,0,0,0.8)]"
        >
          {/* HUD Corner Accents */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#e74c3c]" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#e74c3c]" />
          
          {/* Subtle Grid backdrop */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center relative z-10">
            {/* Profile Frame Section */}
            <motion.div variants={itemVariant} className="lg:col-span-5 space-y-6">
              <div className="flex flex-col items-center">
                <div className="relative group w-full max-w-sm">
                  {/* Glitch/HUD Frame around image */}
                  <div className="absolute -inset-2 border border-[#e74c3c]/50 bg-[#e74c3c]/5 z-0" />
                  <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-[#e74c3c] z-20" />
                  <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-[#e74c3c] z-20" />
                  
                  <div className="relative aspect-[4/5] w-full overflow-hidden border border-[#e74c3c]/20 z-10 bg-black">
                    <img
                      src={saheerCyberEdit}
                      alt="Saheer Chungath Cyber Edit"
                      className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                    />
                    
                    {/* Scanning Line overlay */}
                    <div className="absolute inset-x-0 h-1 bg-[#e74c3c]/50 blur-[1px] animate-[scan_3s_ease-in-out_infinite]" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* About Content & Stats */}
            <motion.div variants={itemVariant} className="lg:col-span-7 space-y-10">
              
              {/* Identity Block */}
              <div className="space-y-2 border-b border-[#e74c3c]/20 pb-6 relative">
                <div className="absolute right-0 top-0 text-[10px] text-[#e74c3c] tracking-widest text-right">
                  STATUS: <span className="text-white">ACTIVE</span><br/>
                  LOC: <span className="text-white">KERALA_IN</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black tracking-widest text-white uppercase">
                  Saheer<br/><span className="text-[#e74c3c]">Chungath</span>
                </h2>
                <div className="flex items-center gap-3 text-xs tracking-[0.2em] text-gray-400 uppercase mt-2">
                  <div className="h-px w-8 bg-[#e74c3c]" />
                  Full Stack Engineer
                </div>
              </div>

              {/* Bio Summary */}
              <div className="space-y-4 font-sans text-gray-300 text-sm leading-relaxed max-w-xl">
                <p>
                  <span className="text-[#e74c3c] font-bold">{'>>> '}</span>
                  I'm a passionate full-stack developer operating at the intersection of performance and aesthetics. 
                  My objective is engineering high-speed, scalable digital applications that leave a lasting impact.
                </p>
                <p>
                  <span className="text-[#e74c3c] font-bold">{'>>> '}</span>
                  I initiated my structural foundation with Python, advancing into modern frameworks like React and Django to build robust systems designed for heavy payloads and intensive computing.
                </p>
              </div>

              {/* Telemetry Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                {stats.map(({ icon: Icon, label, value }, index) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + index * 0.1 }}
                    className="bg-[#0a0a0a] border border-[#e74c3c]/20 p-4 relative group hover:border-[#e74c3c]/60 transition-colors"
                  >
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#e74c3c]/50" />
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#e74c3c]/50" />
                    
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-[#e74c3c]/10 text-[#e74c3c]">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xl font-bold text-white tracking-widest">{value}</div>
                        <div className="text-[9px] text-[#e74c3c] uppercase tracking-widest">{label}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Action Buttons */}
              <motion.div variants={itemVariant} className="pt-4 flex flex-wrap gap-4">
                <motion.button
                  onClick={handleDownload}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex flex-1 min-w-[200px] items-center justify-center gap-3 bg-[#e74c3c]/10 border border-[#e74c3c] text-[#e74c3c] px-6 py-3 text-xs tracking-widest font-bold hover:bg-[#e74c3c] hover:text-white transition-all uppercase group"
                >
                  <FaDownload className="text-lg group-hover:-translate-y-1 transition-transform" />
                  Extract Manifest
                </motion.button>

                <div className="flex gap-4">
                  {[
                    { icon: FaGithub, href: "https://github.com/saheer07" },
                    { icon: FaLinkedin, href: "https://www.linkedin.com/in/saheer-chungath-23b44434a" },
                  ].map(({ icon: Icon, href }) => (
                    <a
                      key={href}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-12 h-12 bg-[#0a0a0a] border border-[#e74c3c]/30 text-gray-400 hover:text-[#e74c3c] hover:border-[#e74c3c] transition-all"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </motion.div>

            </motion.div>
          </div>
        </div>
      </motion.div>
      
      {/* Global CSS for scanning animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}} />
    </section>
  );
}

export default About;