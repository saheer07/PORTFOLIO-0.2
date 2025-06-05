import React, { useState, useEffect, useRef } from 'react';
import emailjs from 'emailjs-com';
import toast, { Toaster } from 'react-hot-toast';
import { FiCheckCircle } from 'react-icons/fi';
import AOS from 'aos';
import 'aos/dist/aos.css';



function Contact() {
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const nameInputRef = useRef(null);

  useEffect(() => {
    nameInputRef.current?.focus();
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

  const sendEmail = (e) => {
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
      if (e.ctrlKey && e.key === 'Enter') {
        sendEmail();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [name, email, message]);
   useEffect(() => {
      AOS.init({
        duration: 1200,
        easing: 'ease-in-out',
        once: true,
      });
    }, []);

  return (
    <section
    
      className="bg-gray-950 text-white py-16 px-4 sm:px-8 md:px-16 lg:px-24"
    >
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#1f2937', // gray-800 dark background
            color: '#fff',
            borderRadius: '10px',
            padding: '12px 18px',
            fontSize: '15px',
            border: '1px solid #ef4444',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)',
          },
          success: {
           icon: <FiCheckCircle color="#22c55e" size={24} />,
            style: {
            background: 'linear-gradient(to bottom right,rgb(204, 0, 0), #1f2937)', 

              color: '#fff',
              border: 'none',
            },
          },
          error: {
            icon: '🚫',
            style: {
              background: '#b91c1c', // red-700
              color: '#fff',
              border: 'none',
            },
          },
        }}
      />

   
      <div className="max-w-4xl mx-auto text-center">
        <h1
        className="text-5xl font-extrabold text-red-600 text-center mb-16 tracking-wide drop-shadow-[0_0_15px_rgba(255,0,0,0.7)]"
        data-aos="fade-down"
      >
        Contact Me
      </h1>

        <form
          onSubmit={sendEmail}
          className="bg-gradient-to-br from-black via-gray-900 to-red-900 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-8 max-w-3xl w-full mx-auto min-h-[600px]"
                data-aos="fade-down"
                id='contact'
        >
          <div className="text-left">
            <label
              className="block mb-2 text-red-400 font-semibold text-base"
              htmlFor="name"
            >
              Name:
            </label>
            <input
              // ref={nameInputRef}
              id="name"
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-4 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition text-base"
            />
          </div>

          <div className="text-left">
            <label
              className="block mb-2 text-red-400 font-semibold text-base"
              htmlFor="email"
            >
              Email:
            </label>
            <input
              id="email"
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-4 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition text-base"
            />
          </div>

          <div className="text-left">
            <label
              className="block mb-2 text-red-400 font-semibold text-base"
              htmlFor="message"
            >
              Message:
            </label>
            <textarea
              id="message"
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={6}
              className="w-full p-4 rounded-lg bg-gray-800 text-white border border-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-red-500 transition text-base"
            />
          </div>

          <div className="flex justify-between gap-4">
            <button
              type="button"
              onClick={clearForm}
              className="w-1/2 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-lg transition duration-300"
            >
              Clear All
            </button>
            <button
              type="submit"
              disabled={!isFormValid || loading}
              className={`w-1/2 flex justify-center items-center gap-2 ${
                loading || !isFormValid
                  ? 'bg-red-400 cursor-not-allowed'
                  : 'bg-red-600 hover:bg-red-700'
              } text-white font-bold py-3 rounded-lg transition duration-300`}
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Contact;
