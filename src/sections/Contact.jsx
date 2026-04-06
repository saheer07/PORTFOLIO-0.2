import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from 'emailjs-com';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { FiUser, FiMail, FiMessageSquare, FiSend, FiX } from 'react-icons/fi';
import { Mail, Phone, MapPin, Zap, Send } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'sweetalert2/src/sweetalert2.scss';

const MySwal = withReactContent(Swal);

function Contact() {
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const nameInputRef = useRef(null);

  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const isFormValid = name && email && message && validateEmail(email);
  const clearForm = () => {
    setName('');
    setEmail('');
    setMessage('');
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!validateEmail(email)) {
      MySwal.fire({
        icon: 'error',
        title: 'Invalid Email',
        text: 'Please enter a valid email address.',
        background: '#0a0a0a',
        color: '#fff',
        confirmButtonColor: '#ef4444',
      });
      return;
    }

    const templateParams = {
      user_name: name,
      user_email: email,
      user_message: message,
    };

    setLoading(true);
    try {
      await emailjs.send(
        'service_bhtdh5m',
        'template_p30ttl6',
        templateParams,
        'KTj6GPbTAVS2JysnN'
      );
      MySwal.fire({
        icon: 'success',
        title: 'Message Sent!',
        text: 'Your message has been sent successfully.',
        background: '#0a0a0a',
        color: '#fff',
        confirmButtonColor: '#ef4444',
      });
      clearForm();
    } catch (error) {
      MySwal.fire({
        icon: 'error',
        title: 'Send Failed',
        text: 'Failed to send message. Please try again.',
        background: '#0a0a0a',
        color: '#fff',
        confirmButtonColor: '#ef4444',
      });
    } finally {
      setLoading(false);
    }
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
    <section id='contact' className="min-h-screen py-24 px-4 sm:px-6 md:px-10 relative bg-black overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-red-900/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
      </div>

      <motion.div
        variants={containerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto relative z-10"
      >
        {/* Heading */}
        <motion.div variants={itemVariant} className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold tracking-wider uppercase rounded-full bg-white/5 border border-white/10 text-red-500 mb-6">
            <Zap className="w-4 h-4" /> Let's Connect
          </span>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
            Get In <span className="text-red-500">Touch</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Have a project in mind or just want to say hi? I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
          </p>
        </motion.div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Left - Contact Info */}
          <motion.div variants={itemVariant} className="lg:col-span-2 space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl h-full relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <h3 className="text-2xl font-bold mb-8 text-white relative z-10">Contact Information</h3>
              <div className="space-y-8 relative z-10">
                <a href="mailto:saheerchungath07@gmail.com" className="flex items-start gap-5 group/item bg-white/5 p-4 rounded-2xl border border-white/5 hover:border-red-500/30 transition-all hover:bg-white/10">
                  <div className="p-3 bg-red-500/10 rounded-xl text-red-500 group-hover/item:scale-110 transition-transform">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Email</p>
                    <p className="text-white font-medium group-hover/item:text-red-400 transition-colors">saheerchungath07@gmail.com</p>
                  </div>
                </a>

                <a href="tel:+917034449577" className="flex items-start gap-5 group/item bg-white/5 p-4 rounded-2xl border border-white/5 hover:border-red-500/30 transition-all hover:bg-white/10">
                  <div className="p-3 bg-red-500/10 rounded-xl text-red-500 group-hover/item:scale-110 transition-transform">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Phone</p>
                    <p className="text-white font-medium group-hover/item:text-red-400 transition-colors">+91 7034449577</p>
                  </div>
                </a>

                <div className="flex items-start gap-5 group/item bg-white/5 p-4 rounded-2xl border border-white/5 hover:border-red-500/30 transition-all hover:bg-white/10">
                  <div className="p-3 bg-red-500/10 rounded-xl text-red-500 group-hover/item:scale-110 transition-transform">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Location</p>
                    <p className="text-white font-medium group-hover/item:text-red-400 transition-colors">Malappuram, Kerala</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-white/10">
                <div className="bg-red-500/10 rounded-2xl p-6 border border-red-500/20">
                  <div className="flex items-center gap-3 text-red-400 mb-2">
                    <Zap className="w-5 h-5 fill-current" />
                    <span className="font-semibold">Quick Tip</span>
                  </div>
                  <p className="text-sm text-gray-400">
                    Fill out the form and I'll get back to you within 24 hours.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div variants={itemVariant} className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-3xl p-8 lg:p-10 backdrop-blur-xl relative overflow-hidden">

              <div className="space-y-6 relative z-10">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-300 ml-1">
                      Your Name
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-red-500 transition-colors">
                        <FiUser className="w-5 h-5" />
                      </div>
                      <input
                        ref={nameInputRef}
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-300 ml-1">
                      Your Email
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-red-500 transition-colors">
                        <FiMail className="w-5 h-5" />
                      </div>
                      <input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-gray-300 ml-1">
                    Your Message
                  </label>
                  <div className="relative group">
                    <div className="absolute top-4 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-red-500 transition-colors">
                      <FiMessageSquare className="w-5 h-5" />
                    </div>
                    <textarea
                      id="message"
                      rows={6}
                      placeholder="Tell me about your project..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all resize-none"
                    />
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    type="button"
                    onClick={clearForm}
                    className="px-8 py-4 rounded-xl font-semibold bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white transition-all flex items-center justify-center gap-2 border border-white/10"
                  >
                    <FiX className="w-5 h-5" /> Clear
                  </button>

                  <button
                    type="submit"
                    disabled={!isFormValid || loading}
                    className={`flex-1 flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white transition-all transform hover:scale-[1.02] active:scale-[0.98] ${loading || !isFormValid
                        ? 'bg-gray-800 cursor-not-allowed opacity-50'
                        : 'bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 shadow-lg shadow-red-900/20'
                      }`}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-5 h-5" />
                        Send Message
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

export default Contact;
