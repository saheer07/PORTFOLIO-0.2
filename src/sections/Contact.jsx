import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from 'emailjs-com';
import toast, { Toaster } from 'react-hot-toast';
import { FiCheckCircle, FiMail, FiUser, FiMessageSquare, FiSend, FiX } from 'react-icons/fi';
import { Sparkles, Mail, Phone, MapPin, Zap } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Contact() {
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [focusedField, setFocusedField] = useState(null);

  const nameInputRef = useRef(null);

  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1200,
      easing: 'ease-in-out',
      once: true,
    });

    const observer = new MutationObserver(() => {
      setIsDarkMode(document.body.classList.contains('bg-slate-900'));
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const isFormValid = name && email && message && validateEmail(email);

  const clearForm = () => {
    setName('');
    setEmail('');
    setMessage('');
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();

    if (!validateEmail(email)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    const templateParams = {
      from_name: name,
      from_email: email,
      message: message,
    };

    setLoading(true);

    emailjs
      .send(
        'service_1y1t1yi',
        'template_p30ttl6',
        templateParams,
        'KTj6GPbTAVS2JysnN'
      )
      .then(() => {
        toast.success('Message sent successfully!');
        setSuccess(true);
        clearForm();
        setTimeout(() => setSuccess(false), 3000);
      })
      .catch(() => {
        toast.error('Failed to send message. Please try again.');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.key === 'Enter' && isFormValid) {
        handleSubmit();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [name, email, message, isFormValid]);

  const themeClasses = {
    bg: isDarkMode 
      ? 'bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800' 
      : 'bg-gradient-to-br from-gray-50 via-white to-blue-50',
    card: isDarkMode 
      ? 'bg-black/40 border-white/10' 
      : 'bg-white/60 border-black/10',
    input: isDarkMode 
      ? 'bg-black/30 border-white/10 text-white placeholder-gray-500' 
      : 'bg-white/50 border-black/10 text-gray-900 placeholder-gray-400',
    text: isDarkMode ? 'text-white' : 'text-gray-900',
    textMuted: isDarkMode ? 'text-gray-300' : 'text-gray-600',
    accent: isDarkMode ? 'text-cyan-400' : 'text-blue-600',
    label: isDarkMode ? 'text-cyan-400' : 'text-blue-600',
  };

  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
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
      id="contact"
      className={`min-h-screen py-24 px-6 relative overflow-hidden ${themeClasses.bg}`}
    >
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: isDarkMode ? '#1f2937' : '#ffffff',
            color: isDarkMode ? '#fff' : '#1f2937',
            borderRadius: '16px',
            padding: '16px 24px',
            fontSize: '15px',
            border: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(12px)',
          },
          success: {
            icon: <FiCheckCircle color="#22c55e" size={24} />,
            style: {
              background: isDarkMode 
                ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(0, 0, 0, 0.8))' 
                : 'linear-gradient(135deg, rgba(34, 197, 94, 0.1), #ffffff)',
            },
          },
          error: {
            icon: '🚫',
            style: {
              background: isDarkMode ? '#b91c1c' : '#fecaca',
              color: isDarkMode ? '#fff' : '#991b1b',
            },
          },
        }}
      />

      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 rounded-full ${isDarkMode ? 'bg-cyan-400/20' : 'bg-blue-400/20'}`}
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
            }}
          />
        ))}

        <motion.div 
          className={`absolute top-20 right-20 w-96 h-96 rounded-full opacity-10 blur-3xl ${
            isDarkMode ? 'bg-gradient-to-r from-cyan-400 to-purple-500' : 'bg-gradient-to-r from-blue-400 to-pink-500'
          }`}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
          }}
        />
      </div>

      <motion.div
        variants={containerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-6xl mx-auto relative z-10"
      >
        {/* Hero Introduction */}
        <motion.div
          variants={itemVariant}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`inline-block mb-6 px-6 py-3 ${themeClasses.card} backdrop-blur-xl border rounded-full`}
          >
            <span className={`text-sm font-semibold tracking-wider uppercase ${themeClasses.accent}`}>
              💬 Let's Connect
            </span>
          </motion.div>
          
          <motion.div
            className="inline-flex items-center gap-3 mb-6"
            whileHover={{ scale: 1.02 }}
          >
            <Sparkles className={`w-8 h-8 ${themeClasses.accent}`} />
            <h1 className={`text-5xl lg:text-6xl font-black tracking-tight ${themeClasses.text}`}>
              Get In <span className={themeClasses.accent}>Touch</span>
            </h1>
            <Sparkles className={`w-8 h-8 ${themeClasses.accent}`} />
          </motion.div>
          
          <motion.p
            variants={itemVariant}
            className={`text-lg md:text-xl ${themeClasses.textMuted} max-w-2xl mx-auto`}
          >
            Have a project in mind or just want to say hi? Drop me a message!
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className={`h-1 w-24 mx-auto mt-6 rounded-full bg-gradient-to-r ${isDarkMode ? 'from-cyan-400 to-blue-600' : 'from-blue-500 to-purple-600'}`}
          />
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact Info Sidebar */}
          <motion.div
            variants={itemVariant}
            className="lg:col-span-2 space-y-6"
          >
            <div className={`${themeClasses.card} backdrop-blur-xl border rounded-3xl p-8 shadow-2xl`}>
              <h3 className={`text-2xl font-bold ${themeClasses.text} mb-6`}>
                Contact Information
              </h3>
              
              <div className="space-y-6">
                <motion.div 
                  className="flex items-start gap-4 group"
                  whileHover={{ x: 5 }}
                >
                  <div className={`p-3 ${themeClasses.card} backdrop-blur-sm border rounded-xl group-hover:scale-110 transition-transform`}>
                    <Mail className={`w-5 h-5 ${themeClasses.accent}`} />
                  </div>
                  <div>
                    <p className={`text-sm ${themeClasses.textMuted} mb-1`}>Email</p>
                    <p className={`font-semibold ${themeClasses.text}`}>saheerchungath07@email.com</p>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-start gap-4 group"
                  whileHover={{ x: 5 }}
                >
                  <div className={`p-3 ${themeClasses.card} backdrop-blur-sm border rounded-xl group-hover:scale-110 transition-transform`}>
                    <Phone className={`w-5 h-5 ${themeClasses.accent}`} />
                  </div>
                  <div>
                    <p className={`text-sm ${themeClasses.textMuted} mb-1`}>Phone</p>
                    <p className={`font-semibold ${themeClasses.text}`}>+91 7034449577</p>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-start gap-4 group"
                  whileHover={{ x: 5 }}
                >
                  <div className={`p-3 ${themeClasses.card} backdrop-blur-sm border rounded-xl group-hover:scale-110 transition-transform`}>
                    <MapPin className={`w-5 h-5 ${themeClasses.accent}`} />
                  </div>
                  <div>
                    <p className={`text-sm ${themeClasses.textMuted} mb-1`}>Location</p>
                    <p className={`font-semibold ${themeClasses.text}`}>Malappuram, Kerala</p>
                  </div>
                </motion.div>
              </div>

              <div className={`mt-8 pt-8 border-t ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
                <p className={`text-sm ${themeClasses.textMuted} mb-3`}>
                  <Zap className={`inline w-4 h-4 ${themeClasses.accent} mr-2`} />
                  Quick tip: Press <kbd className={`px-2 py-1 rounded ${themeClasses.card} border text-xs font-mono`}>Ctrl+Enter</kbd> to send
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={itemVariant}
            className="lg:col-span-3"
          >
            <div
              className={`${themeClasses.card} backdrop-blur-xl border rounded-3xl p-8 lg:p-10 shadow-2xl space-y-6 relative overflow-hidden`}
            >
              {/* Decorative glow */}
              <div className={`absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r ${isDarkMode ? 'from-cyan-400/20 to-blue-600/20' : 'from-blue-400/20 to-purple-600/20'} rounded-full blur-3xl`} />

              {/* Name Field */}
              <motion.div
                variants={itemVariant}
                className="relative"
              >
                <label
                  className={`block mb-2 ${themeClasses.label} font-semibold text-sm flex items-center gap-2`}
                  htmlFor="name"
                >
                  <FiUser className="w-4 h-4" />
                  Name
                </label>
                <div className="relative">
                  <input
                    ref={nameInputRef}
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full p-4 rounded-xl ${themeClasses.input} backdrop-blur-sm border focus:outline-none focus:ring-2 ${
                      isDarkMode ? 'focus:ring-cyan-400' : 'focus:ring-blue-500'
                    } transition-all`}
                  />
                  <motion.div
                    className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r ${isDarkMode ? 'from-cyan-400 to-blue-600' : 'from-blue-500 to-purple-600'}`}
                    initial={{ width: 0 }}
                    animate={{ width: focusedField === 'name' ? '100%' : 0 }}
                  />
                </div>
              </motion.div>

              {/* Email Field */}
              <motion.div
                variants={itemVariant}
                className="relative"
              >
                <label
                  className={`block mb-2 ${themeClasses.label} font-semibold text-sm flex items-center gap-2`}
                  htmlFor="email"
                >
                  <FiMail className="w-4 h-4" />
                  Email
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full p-4 rounded-xl ${themeClasses.input} backdrop-blur-sm border focus:outline-none focus:ring-2 ${
                      isDarkMode ? 'focus:ring-cyan-400' : 'focus:ring-blue-500'
                    } transition-all`}
                  />
                  <motion.div
                    className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r ${isDarkMode ? 'from-cyan-400 to-blue-600' : 'from-blue-500 to-purple-600'}`}
                    initial={{ width: 0 }}
                    animate={{ width: focusedField === 'email' ? '100%' : 0 }}
                  />
                </div>
              </motion.div>

              {/* Message Field */}
              <motion.div
                variants={itemVariant}
                className="relative"
              >
                <label
                  className={`block mb-2 ${themeClasses.label} font-semibold text-sm flex items-center gap-2`}
                  htmlFor="message"
                >
                  <FiMessageSquare className="w-4 h-4" />
                  Message
                </label>
                <div className="relative">
                  <textarea
                    id="message"
                    placeholder="Tell me about your project..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    rows={6}
                    className={`w-full p-4 rounded-xl ${themeClasses.input} backdrop-blur-sm border resize-none focus:outline-none focus:ring-2 ${
                      isDarkMode ? 'focus:ring-cyan-400' : 'focus:ring-blue-500'
                    } transition-all`}
                  />
                  <motion.div
                    className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r ${isDarkMode ? 'from-cyan-400 to-blue-600' : 'from-blue-500 to-purple-600'}`}
                    initial={{ width: 0 }}
                    animate={{ width: focusedField === 'message' ? '100%' : 0 }}
                  />
                </div>
              </motion.div>

              {/* Buttons */}
              <motion.div
                variants={itemVariant}
                className="flex gap-4 pt-4"
              >
                <motion.button
                  type="button"
                  onClick={clearForm}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 ${themeClasses.card} backdrop-blur-sm border rounded-xl font-semibold ${themeClasses.text} hover:scale-105 transition-all`}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FiX className="w-4 h-4" />
                  Clear
                </motion.button>
                
                <motion.button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!isFormValid || loading}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-white transition-all ${
                    loading || !isFormValid
                      ? 'bg-gray-400 cursor-not-allowed'
                      : `bg-gradient-to-r ${isDarkMode ? 'from-cyan-500 to-blue-600' : 'from-blue-500 to-purple-600'} hover:scale-105 shadow-lg`
                  }`}
                  whileHover={isFormValid && !loading ? { y: -2 } : {}}
                  whileTap={isFormValid && !loading ? { scale: 0.98 } : {}}
                >
                  {loading ? (
                    <>
                      <motion.div
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <FiSend className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </motion.div>

              {/* Success Animation */}
              <AnimatePresence>
                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`absolute inset-0 flex items-center justify-center ${themeClasses.card} backdrop-blur-xl rounded-3xl`}
                  >
                    <div className="text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200 }}
                      >
                        <FiCheckCircle className={`w-20 h-20 ${isDarkMode ? 'text-green-400' : 'text-green-500'} mx-auto mb-4`} />
                      </motion.div>
                      <h3 className={`text-2xl font-bold ${themeClasses.text} mb-2`}>
                        Message Sent!
                      </h3>
                      <p className={themeClasses.textMuted}>
                        I'll get back to you soon
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

export default Contact;