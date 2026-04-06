import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from 'emailjs-com';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { FiX } from 'react-icons/fi';
import { Mail, Phone, MapPin, Zap, Send, Terminal, AlertCircle } from 'lucide-react';
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
    AOS.init({ duration: 1200, once: true });
  }, []);

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const isFormValid = name && email && message && validateEmail(email);
  const clearForm = () => {
    setName('');
    setEmail('');
    setMessage('');
  };

  const showSystemAlert = (title, text, type = 'error') => {
    const color = type === 'error' ? '#e74c3c' : '#2ecc71';
    MySwal.fire({
      title: `<span style="font-family: 'Orbitron', sans-serif; color: ${color}; font-weight: 900; font-size: 1.5rem; letter-spacing: 2px;">SYS_${type.toUpperCase()}</span>`,
      html: `
        <div style="font-family: 'Orbitron', sans-serif; text-align: left; padding: 10px; border: 1px solid ${color}; background: rgba(${type === 'error' ? '231,76,60' : '46,204,113'},0.05);">
          <p style="color: #ccc; font-size: 0.9rem; margin-bottom: 0.5rem; text-transform: uppercase;">
            > DETAILS: <span style="color: white; font-weight: bold;">${text}</span>
          </p>
        </div>
      `,
      confirmButtonText: '<span style="font-family: \'Orbitron\', sans-serif; font-weight: bold; letter-spacing: 1px;">ACKNOWLEDGE</span>',
      confirmButtonColor: color,
      background: 'rgba(5,5,5,0.95)',
      backdrop: `rgba(0,0,0,0.85)`,
      customClass: {
        popup: `border border-[${color}] rounded-none shadow-[0_0_30px_rgba(${type === 'error' ? '231,76,60' : '46,204,113'},0.4)] relative`,
        confirmButton: `border border-[${color}] px-6 py-2 bg-[${color}]/20 hover:bg-[${color}]/40 rounded-none transition-all`,
      }
    });
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!validateEmail(email)) {
      showSystemAlert('INVALID_INPUT', 'Please enter a valid email address sequence.', 'error');
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
      showSystemAlert('TRANSMIT_SUCCESS', 'Message sequence transmitted successfully.', 'success');
      clearForm();
    } catch (error) {
      showSystemAlert('TRANSMIT_FAILED', 'Failed to transmit message sequence.', 'error');
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
    <section id='contact' className="min-h-screen py-24 px-4 sm:px-6 md:px-10 relative bg-black/50 flex items-center font-['Orbitron']">
      <motion.div
        variants={containerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto relative z-10 w-full"
      >
        {/* Heading */}
        <motion.div variants={itemVariant} className="mb-12 flex flex-col items-start border-l-4 border-[#e74c3c] pl-6 ml-4">
          <h1 className="text-4xl lg:text-5xl font-black tracking-widest text-white uppercase shadow-sm">
            Comm<span className="text-[#e74c3c]">-Link</span>
          </h1>
          <p className="text-sm text-[#e74c3c] tracking-[0.3em] uppercase mt-2">
            Establish Secure Transmission
          </p>
        </motion.div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Left - Contact Info Panel */}
          <motion.div variants={itemVariant} className="lg:col-span-2 space-y-6">
            <div className="bg-[#050505]/80 border border-[#e74c3c]/30 p-8 h-full relative overflow-hidden group shadow-[inset_0_0_20px_rgba(231,76,60,0.1)]">
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#e74c3c]" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#e74c3c]" />
              
              <div className="text-[10px] text-[#e74c3c] tracking-[0.2em] font-bold uppercase mb-8 border-b border-[#e74c3c]/30 pb-2 flex items-center gap-2">
                <Terminal className="w-4 h-4" />
                PRIMARY_NODE_INFO
              </div>

              <div className="space-y-6 relative z-10">
                <a href="mailto:saheerchungath07@gmail.com" className="flex items-start gap-4 group/item p-4 bg-black border border-[#e74c3c]/20 hover:border-[#e74c3c] transition-all">
                  <div className="text-[#e74c3c] group-hover/item:animate-pulse">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[9px] text-gray-500 tracking-[0.2em] mb-1 uppercase">Protocol: Email</p>
                    <p className="text-sm font-bold text-white group-hover/item:text-[#e74c3c] transition-colors tracking-wider">saheerchungath07@gmail.com</p>
                  </div>
                </a>

                <a href="tel:+917034449577" className="flex items-start gap-4 group/item p-4 bg-black border border-[#e74c3c]/20 hover:border-[#e74c3c] transition-all">
                  <div className="text-[#e74c3c] group-hover/item:animate-pulse">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[9px] text-gray-500 tracking-[0.2em] mb-1 uppercase">Protocol: Voice</p>
                    <p className="text-sm font-bold text-white group-hover/item:text-[#e74c3c] transition-colors tracking-wider">+91 7034449577</p>
                  </div>
                </a>

                <div className="flex items-start gap-4 group/item p-4 bg-black border border-[#e74c3c]/20 hover:border-[#e74c3c] transition-all">
                  <div className="text-[#e74c3c] group-hover/item:animate-pulse">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[9px] text-gray-500 tracking-[0.2em] mb-1 uppercase">Protocol: Location</p>
                    <p className="text-sm font-bold text-white group-hover/item:text-[#e74c3c] transition-colors tracking-wider">Malappuram, Kerala</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-6 border-t border-[#e74c3c]/20">
                <div className="bg-[#e74c3c]/5 p-4 border border-[#e74c3c]/20">
                  <div className="flex items-center gap-2 text-[#e74c3c] mb-2 text-xs font-bold tracking-widest uppercase">
                    <AlertCircle className="w-4 h-4" />
                    SYSTEM_NOTICE
                  </div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest font-sans leading-relaxed">
                    <span className="font-['Orbitron'] font-bold text-[#e74c3c]">{'>> '}</span>
                    Fill out the transmission form. Response time estimated at T-minus 24 hrs.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Form Terminal */}
          <motion.div variants={itemVariant} className="lg:col-span-3 h-full">
            <form onSubmit={handleSubmit} className="bg-[#0a0a0a] border border-[#e74c3c]/50 p-8 lg:p-10 relative overflow-hidden h-full flex flex-col shadow-[0_0_30px_rgba(231,76,60,0.1)]">
              {/* Corner Accents */}
              <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#e74c3c]" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[#e74c3c]" />

              <div className="text-[10px] text-[#e74c3c] tracking-[0.2em] font-bold uppercase mb-8 border-b border-[#e74c3c]/30 pb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4" />
                  TRANSMISSION_TERMINAL
                </div>
                <div className="text-gray-600">INPUT_{isFormValid ? 'READY' : 'REQUIRED'}</div>
              </div>

              <div className="space-y-6 flex-1 flex flex-col justify-center">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-[10px] tracking-widest font-bold text-gray-400 uppercase">
                      ID_INPUT (Name)
                    </label>
                    <div className="relative group">
                      <input
                        ref={nameInputRef}
                        id="name"
                        type="text"
                        placeholder="ENTER_IDENTIFIER..."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-[#111] border border-[#e74c3c]/30 p-4 text-xs text-white placeholder-gray-700 tracking-widest uppercase focus:outline-none focus:border-[#e74c3c] focus:bg-[#e74c3c]/5 transition-all"
                      />
                      {/* Active indicator */}
                      <div className="absolute right-0 bottom-0 top-0 w-1 bg-[#e74c3c] opacity-0 group-focus-within:opacity-100 transition-opacity" />
                    </div>
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-[10px] tracking-widest font-bold text-gray-400 uppercase">
                      LINK_INPUT (Email)
                    </label>
                    <div className="relative group">
                      <input
                        id="email"
                        type="email"
                        placeholder="ENTER_ADDRESS..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[#111] border border-[#e74c3c]/30 p-4 text-xs text-white placeholder-gray-700 tracking-widest uppercase focus:outline-none focus:border-[#e74c3c] focus:bg-[#e74c3c]/5 transition-all"
                      />
                      {/* Active indicator */}
                      <div className="absolute right-0 bottom-0 top-0 w-1 bg-[#e74c3c] opacity-0 group-focus-within:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </div>

                {/* Message Input */}
                <div className="space-y-2">
                  <label htmlFor="message" className="text-[10px] tracking-widest font-bold text-gray-400 uppercase">
                    DATA_PAYLOAD (Message)
                  </label>
                  <div className="relative group">
                    <textarea
                      id="message"
                      rows={5}
                      placeholder="ENTER_DATA_SEQUENCE..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-[#111] border border-[#e74c3c]/30 p-4 text-xs font-sans text-white placeholder-gray-700 tracking-widest focus:outline-none focus:border-[#e74c3c] focus:bg-[#e74c3c]/5 transition-all resize-none"
                    />
                    {/* Active indicator */}
                    <div className="absolute right-0 bottom-1 top-0 w-1 bg-[#e74c3c] opacity-0 group-focus-within:opacity-100 transition-opacity" />
                  </div>
                </div>

                {/* Controls */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4 mt-auto">
                  <button
                    type="button"
                    onClick={clearForm}
                    className="px-6 py-4 bg-[#111] text-gray-400 border border-[#e74c3c]/30 hover:border-[#e74c3c] hover:bg-[#e74c3c]/10 hover:text-white transition-all flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest"
                  >
                    <FiX className="w-4 h-4" /> PURGE
                  </button>

                  <button
                    type="submit"
                    disabled={!isFormValid || loading}
                    className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 text-xs font-bold uppercase tracking-widest transition-all ${
                      loading || !isFormValid
                        ? 'bg-[#111] border border-gray-800 text-gray-600 cursor-not-allowed'
                        : 'bg-[#e74c3c]/10 border border-[#e74c3c] text-[#e74c3c] hover:bg-[#e74c3c] hover:text-white shadow-[0_0_15px_rgba(231,76,60,0.3)] hover:shadow-[0_0_25px_rgba(231,76,60,0.6)]'
                    }`}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border border-[#e74c3c] border-t-transparent animate-spin" />
                        TRANSMITTING...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Zap className="w-4 h-4" />
                        INITIATE TRANSMISSION
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
