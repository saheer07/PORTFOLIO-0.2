import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
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
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [focusedField, setFocusedField] = useState(null);
  const nameInputRef = useRef(null);

  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.body.classList.contains('bg-slate-900'));
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
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
      user_name: name,
      user_email: email,
      user_message: message,
    };

    setLoading(true);
    emailjs
      .send('service_1y1t1yi', 'template_p30ttl6', templateParams, 'KTj6GPbTAVS2JysnN')
      .then(() => {
        toast.success('Message sent successfully!');
        clearForm();
      })
      .catch(() => {
        toast.error('Failed to send message. Please try again.');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.key === 'Enter' && isFormValid) handleSubmit();
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
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section
      id="contact"
      className={`min-h-screen py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-10 relative overflow-hidden ${themeClasses.bg}`}
    >
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: isDarkMode ? '#1f2937' : '#ffffff',
            color: isDarkMode ? '#fff' : '#1f2937',
            borderRadius: '16px',
            padding: '14px 20px',
            fontSize: '14px',
          },
        }}
      />

      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 rounded-full ${
              isDarkMode ? 'bg-cyan-400/20' : 'bg-blue-400/20'
            }`}
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            animate={{ y: [0, -40, 0], opacity: [0.3, 0.8, 0.3], scale: [1, 1.4, 1] }}
            transition={{ duration: 4 + Math.random() * 2, repeat: Infinity }}
          />
        ))}
      </div>

      <motion.div
        variants={containerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-6xl mx-auto relative z-10"
      >
        {/* Heading */}
        <motion.div variants={itemVariant} className="text-center mb-12 sm:mb-16 md:mb-20">
          <span
            className={`inline-block mb-4 px-4 py-2 text-sm font-semibold tracking-wider uppercase rounded-full ${themeClasses.card} ${themeClasses.accent}`}
          >
            💬 Let's Connect
          </span>
          <h1 className={`text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 ${themeClasses.text}`}>
            Get In <span className={themeClasses.accent}>Touch</span>
          </h1>
          <p
            className={`text-base sm:text-lg md:text-xl ${themeClasses.textMuted} max-w-2xl mx-auto`}
          >
            Have a project in mind or just want to say hi? Drop me a message!
          </p>
        </motion.div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Left - Contact Info */}
          <motion.div variants={itemVariant} className="lg:col-span-2 space-y-6">
            <div
              className={`${themeClasses.card} border rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-xl`}
            >
              <h3 className={`text-2xl font-bold mb-6 ${themeClasses.text}`}>Contact Information</h3>

              <div className="space-y-6 text-sm sm:text-base">
                <div className="flex items-start gap-4">
                  <Mail className={`w-5 h-5 ${themeClasses.accent}`} />
                  <div>
                    <p className={`${themeClasses.textMuted}`}>Email</p>
                    <p className={`font-semibold ${themeClasses.text}`}>
                      saheerchungath07@email.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className={`w-5 h-5 ${themeClasses.accent}`} />
                  <div>
                    <p className={`${themeClasses.textMuted}`}>Phone</p>
                    <p className={`font-semibold ${themeClasses.text}`}>+91 7034449577</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className={`w-5 h-5 ${themeClasses.accent}`} />
                  <div>
                    <p className={`${themeClasses.textMuted}`}>Location</p>
                    <p className={`font-semibold ${themeClasses.text}`}>
                      Malappuram, Kerala
                    </p>
                  </div>
                </div>
              </div>

              <p className={`text-xs sm:text-sm mt-8 ${themeClasses.textMuted}`}>
                <Zap className={`inline w-4 h-4 ${themeClasses.accent} mr-1`} />
                Tip: Press <kbd className="px-2 py-1 rounded border text-xs">Ctrl+Enter</kbd> to send
              </p>
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div variants={itemVariant} className="lg:col-span-3">
            <div
              className={`${themeClasses.card} border rounded-3xl p-6 sm:p-8 lg:p-10 backdrop-blur-xl shadow-xl`}
            >
              {/* Name */}
              <div className="mb-6">
                <label
                  htmlFor="name"
                  className={`block mb-2 text-sm font-semibold ${themeClasses.label}`}
                >
                  <FiUser className="inline mr-2" />
                  Name
                </label>
                <input
                  ref={nameInputRef}
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full p-4 rounded-xl ${themeClasses.input} border focus:ring-2 ${
                    isDarkMode ? 'focus:ring-cyan-400' : 'focus:ring-blue-500'
                  }`}
                />
              </div>

              {/* Email */}
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className={`block mb-2 text-sm font-semibold ${themeClasses.label}`}
                >
                  <FiMail className="inline mr-2" />
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full p-4 rounded-xl ${themeClasses.input} border focus:ring-2 ${
                    isDarkMode ? 'focus:ring-cyan-400' : 'focus:ring-blue-500'
                  }`}
                />
              </div>

              {/* Message */}
              <div className="mb-6">
                <label
                  htmlFor="message"
                  className={`block mb-2 text-sm font-semibold ${themeClasses.label}`}
                >
                  <FiMessageSquare className="inline mr-2" />
                  Message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  placeholder="Tell me about your project..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={`w-full p-4 rounded-xl ${themeClasses.input} border resize-none focus:ring-2 ${
                    isDarkMode ? 'focus:ring-cyan-400' : 'focus:ring-blue-500'
                  }`}
                />
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  type="button"
                  onClick={clearForm}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold ${themeClasses.card} ${themeClasses.text} hover:scale-105 transition-all`}
                >
                  <FiX className="w-4 h-4" />
                  Clear
                </button>

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!isFormValid || loading}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all ${
                    loading || !isFormValid
                      ? 'bg-gray-400 cursor-not-allowed'
                      : `bg-gradient-to-r ${
                          isDarkMode
                            ? 'from-cyan-500 to-blue-600'
                            : 'from-blue-500 to-purple-600'
                        } hover:scale-105 shadow-lg`
                  }`}
                >
                  <FiSend className="w-4 h-4" />
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

export default Contact;
