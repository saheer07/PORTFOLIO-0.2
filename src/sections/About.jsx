import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaDownload,
  FaCode,
  FaLaptopCode,
  FaHeart,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import {
  MapPin,
  Coffee,
  Sparkles,
  Zap,
  Target,
  BookOpen,
  Rocket,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import Swal from "sweetalert2";

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

const floatingVariant = {
  animate: {
    y: [0, -15, 0],
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// 🔹 Download Resume with Custom Modern Confirmation
const handleDownload = () => {
  Swal.fire({
    title: '<span style="background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-weight: 800; font-size: 2rem;">Download Resume?</span>',
    html: `
      <div style="margin: 1.5rem 0;">
        <div style="display: flex; align-items: center; justify-content: center; gap: 0.75rem; margin-bottom: 1rem;">
          <svg style="width: 3rem; height: 3rem; color: #06b6d4;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
          </svg>
        </div>
        <p style="color: #64748b; font-size: 1.1rem; margin-bottom: 1rem;">
          Get ready to download Saheer's professional resume
        </p>
        <div style="background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%); padding: 0.75rem 1rem; border-radius: 0.75rem; display: inline-block;">
          <span style="color: white; font-weight: 600; font-size: 0.9rem;">📄 Saheer_c_Resume.pdf</span>
        </div>
      </div>
    `,
    showCancelButton: true,
    confirmButtonText: '<span style="display: flex; align-items: center; gap: 0.5rem;"><svg style="width: 1.25rem; height: 1.25rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg> Yes, Download</span>',
    cancelButtonText: '<span style="display: flex; align-items: center; gap: 0.5rem;"><svg style="width: 1.25rem; height: 1.25rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg> Cancel</span>',
    confirmButtonColor: '#06b6d4',
    cancelButtonColor: '#64748b',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    backdrop: `
      rgba(0,0,0,0.8)
      left top
      no-repeat
    `,
    customClass: {
      popup: 'rounded-3xl shadow-2xl border border-cyan-400/20',
      title: 'text-3xl font-bold',
      confirmButton: 'rounded-xl px-6 py-3 font-bold shadow-lg hover:shadow-xl transition-all duration-300',
      cancelButton: 'rounded-xl px-6 py-3 font-bold shadow-lg hover:shadow-xl transition-all duration-300',
    },
    showClass: {
      popup: 'animate__animated animate__zoomIn animate__faster'
    },
    hideClass: {
      popup: 'animate__animated animate__zoomOut animate__faster'
    }
  }).then((result) => {
    if (result.isConfirmed) {
      // Show downloading animation
      Swal.fire({
        title: '<span style="background: linear-gradient(135deg, #10b981 0%, #06b6d4 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-weight: 800; font-size: 2rem;">Downloading...</span>',
        html: `
          <div style="margin: 2rem 0;">
            <div style="display: flex; justify-content: center; margin-bottom: 1.5rem;">
              <div style="width: 4rem; height: 4rem; border: 4px solid #06b6d4; border-top-color: transparent; border-radius: 50%; animation: spin 1s linear infinite;"></div>
            </div>
            <p style="color: #64748b; font-size: 1.1rem; margin-bottom: 1rem;">
              Your resume is being downloaded successfully!
            </p>
            <div style="background: linear-gradient(135deg, #10b981 0%, #06b6d4 100%); height: 0.5rem; border-radius: 1rem; overflow: hidden; margin: 1rem auto; max-width: 300px;">
              <div style="width: 100%; height: 100%; background: rgba(255,255,255,0.3); animation: progress 1.5s ease-in-out;"></div>
            </div>
            <div style="margin-top: 1.5rem;">
              <span style="font-size: 3rem;">✅</span>
            </div>
          </div>
          <style>
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
            @keyframes progress {
              from { transform: translateX(-100%); }
              to { transform: translateX(0); }
            }
          </style>
        `,
        timer: 2500,
        timerProgressBar: true,
        showConfirmButton: false,
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        backdrop: `
          rgba(0,0,0,0.8)
          left top
          no-repeat
        `,
        customClass: {
          popup: 'rounded-3xl shadow-2xl border border-emerald-400/20',
        },
        showClass: {
          popup: 'animate__animated animate__bounceIn animate__faster'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOut animate__faster'
        }
      });

      // Actual download
      const link = document.createElement("a");
      link.href = "/Saheer_c (1).pdf";
      link.download = "Saheer_c_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  });
};

function About() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const stats = [
    { icon: BookOpen, label: "Months Learning", value: "7+" },
    { icon: FaCode, label: "Projects Completed", value: "5+" },
    { icon: Coffee, label: "Cups of Coffee", value: "100+" },
    { icon: Target, label: "Skills Mastered", value: "8+" },
  ];

  // Detect theme
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.body.classList.contains("bg-slate-900"));
    });
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1200,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  const themeClasses = {
    bg: isDarkMode
      ? "bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800"
      : "bg-gradient-to-br from-gray-50 via-white to-blue-50",
    card: isDarkMode ? "bg-black/20 border-white/10" : "bg-white/30 border-black/10",
    text: isDarkMode ? "text-white" : "text-gray-900",
    textMuted: isDarkMode ? "text-gray-300" : "text-gray-600",
    accent: isDarkMode ? "text-cyan-400" : "text-blue-600",
    button: isDarkMode
      ? "bg-gradient-to-r from-cyan-500 to-blue-600"
      : "bg-gradient-to-r from-blue-500 to-purple-600",
  };

  return (
    <section
      id="about"
      className={`min-h-screen py-24 px-4 relative overflow-hidden ${themeClasses.bg}`}
    >
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 rounded-full ${
              isDarkMode ? "bg-cyan-400/20" : "bg-blue-400/20"
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main Container */}
      <motion.div
        variants={containerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-7xl mx-auto relative z-10"
        data-aos="fade-up"
      >
        {/* Header */}
        <motion.div variants={itemVariant} className="text-center mb-16">
          <motion.div className="inline-flex items-center gap-3 mb-6">
            <Sparkles className={`w-8 h-8 ${themeClasses.accent}`} />
            <h1
              className={`text-5xl lg:text-6xl font-black tracking-tight ${themeClasses.text}`}
            >
              About <span className={themeClasses.accent}>Me</span>
            </h1>
            <Sparkles className={`w-8 h-8 ${themeClasses.accent}`} />
          </motion.div>
          <p className={`text-xl ${themeClasses.textMuted} max-w-2xl mx-auto`}>
            Passionate developer crafting digital experiences with code and creativity
          </p>
        </motion.div>

        {/* Content */}
        <div
          className={`backdrop-blur-xl ${themeClasses.card} border rounded-3xl shadow-2xl p-8 lg:p-16 relative overflow-hidden`}
        >
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Profile Section */}
            <motion.div variants={itemVariant} className="space-y-8">
              <div className="flex flex-col items-center lg:items-start">
                <motion.div
                  variants={floatingVariant}
                  animate="animate"
                  className="relative group mb-8"
                >
                  <div
                    className={`relative w-48 h-48 sm:w-56 sm:h-56 rounded-3xl overflow-hidden border-4 ${
                      isDarkMode ? "border-cyan-400/30" : "border-blue-400/30"
                    } shadow-2xl group-hover:scale-105 transition-all duration-700`}
                  >
                    <img
                      src="https://blog.logrocket.com/wp-content/uploads/2022/01/python-developers-guide-react.png"
                      alt="Saheer Chungath"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>

                <div className="text-center lg:text-left space-y-4">
                  <motion.h2
                    variants={itemVariant}
                    className={`text-4xl sm:text-5xl font-black tracking-tight ${themeClasses.text}`}
                  >
                    Saheer <span className={themeClasses.accent}>Chungath</span>
                  </motion.h2>

                  <p
                    className={`text-xl font-bold ${themeClasses.accent} flex items-center justify-center lg:justify-start gap-2`}
                  >
                    <FaLaptopCode className="w-5 h-5" />
                    Full Stack Developer
                  </p>
                  <p
                    className={`${themeClasses.textMuted} flex items-center justify-center lg:justify-start gap-2`}
                  >
                    <MapPin className="w-4 h-4" />
                    Kerala, India
                  </p>

                  {/* Social Links */}
                  <div className="flex justify-center lg:justify-start gap-4 pt-4">
                    {[
                      { icon: FaGithub, href: "https://github.com/saheer07" },
                      {
                        icon: FaLinkedin,
                        href: "https://www.linkedin.com/in/saheer-chungath-23b44434a",
                      },
                    ].map(({ icon: Icon, href }) => (
                      <a
                        key={href}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-3 ${themeClasses.card} backdrop-blur-sm border rounded-xl ${themeClasses.text} hover:${themeClasses.accent} transition-all duration-300 group`}
                      >
                        <Icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* About Content */}
            <motion.div variants={itemVariant} className="space-y-8">
              <div className={`space-y-4 ${themeClasses.textMuted} text-lg leading-relaxed`}>
                <p>
                  <FaHeart className={`inline w-5 h-5 mr-2 ${themeClasses.accent}`} />
                  I'm a passionate student and aspiring full-stack developer, always exploring
                  new technologies and building innovative projects.
                </p>
                <p>
                  <BookOpen className={`inline w-5 h-5 mr-2 ${themeClasses.accent}`} />
                  Started my journey with Python and advanced to modern tools like React and
                  Django for creating seamless web experiences.
                </p>
                <p>
                  <Rocket className={`inline w-5 h-5 mr-2 ${themeClasses.accent}`} />
                  Completed 5+ projects that demonstrate my skills and dedication to
                  excellence.
                </p>
              </div>

              {/* Stats Section */}
              <div className="grid grid-cols-2 gap-4">
                {stats.map(({ icon: Icon, label, value }, index) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className={`${themeClasses.card} backdrop-blur-sm border rounded-2xl p-4 text-center`}
                  >
                    <Icon
                      className={`w-8 h-8 ${themeClasses.accent} mx-auto mb-2 transition-transform`}
                    />
                    <div className={`text-2xl font-bold ${themeClasses.text}`}>{value}</div>
                    <div className={`text-sm ${themeClasses.textMuted}`}>{label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Download Resume */}
              <motion.div variants={itemVariant} className="pt-4 text-center lg:text-left">
                <motion.button
                  onClick={handleDownload}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`inline-flex items-center gap-3 ${themeClasses.button} text-white px-8 py-4 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 group`}
                >
                  <FaDownload className="group-hover:translate-y-[-2px] transition-transform" />
                  Download Resume
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="ml-1"
                  >
                    ⚡
                  </motion.div>
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default About;