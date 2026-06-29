import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { 
  Mail, MessageSquare, Phone, Github, Instagram, 
  Linkedin, Youtube, Send, Check, AlertCircle, Copy 
} from 'lucide-react';
import axios from 'axios';

const API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:3001/api'
  : '/api';

const ContactCard = ({ icon: Icon, title, value, color, action }) => {
  const [copied, setCopied] = useState(false);

  const handleAction = () => {
    if (action) {
      window.open(action, '_blank', 'noopener,noreferrer');
    } else if (value) {
      navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleAction}
      className="glass-card relative overflow-hidden p-5 flex items-center gap-4 cursor-pointer hover:border-slate-350 dark:hover:border-white/15 transition-all"
    >
      {/* Decorative Blur Corner */}
      <div 
        className="absolute top-0 right-0 w-12 h-12 rounded-full blur-xl opacity-0 hover:opacity-40 transition-opacity duration-300" 
        style={{ background: color, transform: 'translate(20%, -20%)' }} 
      />

      <div 
        className="p-3 rounded-xl text-white flex items-center justify-center shadow-lg"
        style={{ background: `linear-gradient(135deg, ${color}, rgba(0,0,0,0.2))` }}
      >
        <Icon size={20} />
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          {title}
        </h4>
        <p className="text-slate-900 dark:text-white font-medium text-sm mt-0.5 truncate">
          {value}
        </p>
      </div>

      <div className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
        {action ? (
          <ExternalLinkIcon size={16} className="text-slate-500" />
        ) : (
          copied ? <Check size={16} className="text-emerald-400 animate-pulse" /> : <Copy size={16} className="text-slate-500" />
        )}
      </div>
    </motion.div>
  );
};

// Fallback if needed
const ExternalLinkIcon = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15 3 21 3 21 9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
);

const Contact = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const isHeadingInView = useInView(headingRef, { once: true, amount: 0.3 });

  // Form States
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState({ type: null, message: '' });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { name, email, subject, message } = formData;

    if (!name || !email || !subject || !message) {
      setStatus({ type: 'error', message: 'All fields are required.' });
      return;
    }

    setLoading(true);
    setStatus({ type: null, message: '' });

    try {
      const res = await axios.post(`${API_BASE}/contact`, formData);
      if (res.data && res.data.success) {
        setStatus({ type: 'success', message: 'Your message has been sent successfully!' });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error(res.data.message || 'Failed to send message.');
      }
    } catch (err) {
      console.error('[Contact] Form submit error:', err);
      setStatus({ 
        type: 'error', 
        message: err.response?.data?.message || 'Failed to send email. Please try again later.' 
      });
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "me@haikaldev.my.id",
      color: "#EF4444",
    },
    {
      icon: MessageSquare,
      title: "Discord",
      value: "haikalmabrur",
      action: "https://discord.com/users/804720825109315605",
      color: "#5865F2",
    },
    {
      icon: Phone,
      title: "WhatsApp",
      value: "(+62) 896-7573-2001",
      action: "https://wa.me/6289675732001",
      color: "#25D366",
    },
  ];

  const socialLinks = [
    { icon: Github, href: "https://github.com/AnakTentara", color: "rgba(255,255,255,0.08)", hoverColor: "#fff" },
    { icon: Instagram, href: "https://instagram.com/haikal_mabrur", color: "rgba(255,255,255,0.08)", hoverColor: "#E1306C" },
    { icon: Linkedin, href: "https://linkedin.com/in/haikal-mabrur/", color: "rgba(255,255,255,0.08)", hoverColor: "#0077B5" },
    { icon: Youtube, href: "https://youtube.com/@AnakTentaraIDN", color: "rgba(255,255,255,0.08)", hoverColor: "#FF0000" },
  ];

  return (
    <section ref={sectionRef} id="contact" className="py-24 bg-transparent relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="orb orb-purple w-[400px] h-[400px] -bottom-20 -left-20 opacity-15" />
        <div className="orb orb-blue w-[350px] h-[350px] top-1/3 right-0 opacity-10" />
      </div>

      <div className="container-portfolio relative z-10">
        {/* Section Header */}
        <div ref={headingRef} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-4"
          >
            <div className="status-badge">
              <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Get In Touch
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight"
            style={{ fontFamily: 'Archivo, sans-serif' }}
          >
            Let's <span className="grad-text">Connect</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-600 dark:text-slate-400 text-lg max-w-xl mx-auto leading-relaxed"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Have a project in mind, want to collaborate, or just want to chat? Fill out the form or reach out directly.
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isHeadingInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mx-auto mt-6 h-[2px] w-20 rounded-full"
            style={{ background: 'linear-gradient(90deg, #3B82F6, #8B5CF6, #EC4899)' }}
          />
        </div>

        {/* Two Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto items-start">
          
          {/* Left Column: Direct Info & Socials */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2" style={{ fontFamily: 'Archivo, sans-serif' }}>
                Contact Info
              </h3>
              {contactInfo.map((info, idx) => (
                <ContactCard key={idx} {...info} />
              ))}
            </div>

            {/* Social Links Row */}
            <div className="pt-6">
              <h4 className="text-slate-900 dark:text-white font-bold text-sm mb-4" style={{ fontFamily: 'Archivo, sans-serif' }}>
                Find Me On
              </h4>
              <div className="flex gap-3">
                {socialLinks.map((social, idx) => (
                  <motion.a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.15, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex items-center justify-center w-11 h-11 rounded-full border border-slate-200 dark:border-white/5 text-slate-500 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all shadow-md relative group overflow-hidden"
                    style={{ background: social.color }}
                  >
                    <div 
                      className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: `radial-gradient(circle, ${social.hoverColor}40 0%, transparent 70%)` }}
                    />
                    <social.icon size={18} className="relative z-10 transition-colors duration-300" style={{ '--hover-color': social.hoverColor }} />
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-white/5 bg-slate-100/50 dark:bg-slate-950/20 text-slate-500 text-xs">
              <p className="leading-relaxed" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Response Time: <span className="text-emerald-400 font-semibold">Usually within 24 hours</span>. I prioritize client requests and active development updates.
              </p>
            </div>
          </div>

          {/* Right Column: Premium Form */}
          <div className="lg:col-span-7">
            <div className="glass-card p-6 md:p-8 hover:border-[var(--glass-card-border)]">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6" style={{ fontFamily: 'Archivo, sans-serif' }}>
                Send Message
              </h3>

              <form onSubmit={handleFormSubmit} className="space-y-5">
                {/* Name Input */}
                <div className="relative group">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-slate-100/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm"
                    placeholder="Your Name"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                  />
                </div>

                {/* Email Input */}
                <div className="relative group">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-slate-100/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm"
                    placeholder="Email Address"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                  />
                </div>

                {/* Subject Input */}
                <div className="relative group">
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-slate-100/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm"
                    placeholder="Subject"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                  />
                </div>

                {/* Message Textarea */}
                <div className="relative group">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="4"
                    className="w-full bg-slate-100/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm resize-none"
                    placeholder="Message Details..."
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                  />
                </div>

                {/* Status Alerts */}
                <AnimatePresence mode="wait">
                  {status.type && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`flex items-start gap-2.5 p-3.5 rounded-xl border text-sm ${
                        status.type === 'success'
                          ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400'
                          : 'bg-rose-500/10 border-rose-500/25 text-rose-400'
                      }`}
                      style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                    >
                      {status.type === 'success' ? <Check size={18} className="mt-0.5" /> : <AlertCircle size={18} className="mt-0.5" />}
                      <span>{status.message}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit button */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02, boxShadow: '0 8px 30px rgba(59,130,246,0.35)' }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer shadow-lg"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  {loading ? (
                    <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;