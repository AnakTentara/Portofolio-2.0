import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { Menu, X, Download } from 'lucide-react';
import { gsap } from 'gsap';
import $iconGR from '../../images/icon-bggradient.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();
  const navRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => { setIsOpen(false); }, [location]);

  // Scroll progress & glass intensity
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0;
      setScrollProgress(progress);
      setScrolled(scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll progress bar GSAP
  useEffect(() => {
    if (progressRef.current) {
      gsap.to(progressRef.current, {
        scaleX: scrollProgress / 100,
        duration: 0.1,
        ease: 'none',
      });
    }
  }, [scrollProgress]);

  // GSAP entrance
  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(navRef.current,
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
      );
    }
  }, []);

  // Section detection
  useEffect(() => {
    const sections = ['home', 'about', 'projects', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { rootMargin: '-50px 0px -50px 0px', threshold: 0.2 }
    );
    sections.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => sections.forEach(id => { const el = document.getElementById(id); if (el) observer.unobserve(el); });
  }, []);

  const navLinks = [
    { name: 'Home',     id: 'home' },
    { name: 'About',    id: 'about' },
    { name: 'Projects', id: 'projects' },
    { name: 'Contact',  id: 'contact' },
  ];

  return (
    <nav ref={navRef} className="fixed w-full top-4 left-0 right-0 z-50 px-4 md:px-6">
      {/* Scroll progress bar */}
      <div
        ref={progressRef}
        className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[60]"
        style={{
          background: 'linear-gradient(90deg, #3B82F6, #8B5CF6, #EC4899)',
          transform: 'scaleX(0)',
        }}
      />

      <div className="max-w-5xl mx-auto">
        <motion.div
          className={`relative rounded-2xl px-5 md:px-8 py-3 md:py-3.5 transition-all duration-500 ${
            scrolled
              ? 'bg-dark/80 backdrop-blur-2xl border border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.5)]'
              : 'bg-dark/40 backdrop-blur-xl border border-white/6 shadow-[0_4px_20px_rgba(0,0,0,0.3)]'
          }`}
          style={{ backdropFilter: 'blur(24px) saturate(180%)' }}
        >
          {/* Iridescent top border */}
          <div
            className="absolute top-0 left-6 right-6 h-[1px] rounded-full"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.6), rgba(139,92,246,0.6), rgba(236,72,153,0.4), transparent)' }}
          />

          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group cursor-pointer">
              <motion.div
                whileHover={{ rotate: 10, scale: 1.05 }}
                whileTap={{ scale: 0.92 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className="relative"
              >
                <div className="absolute inset-0 rounded-lg bg-primary/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <img src={$iconGR} alt="HaikalDev Logo" className="w-8 h-8 relative z-10" />
              </motion.div>
              <span
                className="font-heading font-bold text-base md:text-lg text-white tracking-tight"
                style={{ fontFamily: 'Archivo, sans-serif' }}
              >
                Haikal<span className="grad-text">Dev</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <ScrollLink
                  key={link.id}
                  to={link.id}
                  spy smooth offset={-80} duration={800}
                  className="relative px-4 py-2 cursor-pointer group"
                >
                  <span className={`text-sm font-medium transition-all duration-200 font-body ${
                    activeSection === link.id
                      ? 'text-white'
                      : 'text-slate-400 group-hover:text-white'
                  }`} style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    {link.name}
                  </span>

                  {activeSection === link.id && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-lg"
                      style={{ background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)' }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}

                  {/* Hover underline */}
                  <span className="absolute bottom-1.5 left-4 right-4 h-[1px] bg-gradient-to-r from-primary to-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </ScrollLink>
              ))}
            </div>

            {/* Downloads CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Link to="/downloads" className="cursor-pointer">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white cursor-pointer"
                  style={{
                    background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                    fontFamily: 'Space Grotesk, sans-serif'
                  }}
                >
                  <Download size={14} />
                  Downloads
                </motion.div>
              </Link>
            </div>

            {/* Mobile burger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-200 cursor-pointer"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </motion.div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="mt-2 rounded-2xl overflow-hidden border border-white/10"
              style={{
                background: 'rgba(8,12,24,0.92)',
                backdropFilter: 'blur(24px) saturate(180%)',
              }}
            >
              <div className="p-3 space-y-1">
                {navLinks.map((link, i) => (
                  <ScrollLink
                    key={link.id}
                    to={link.id}
                    spy smooth offset={-100} duration={500}
                    onClick={() => setIsOpen(false)}
                    className="block cursor-pointer"
                  >
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                        activeSection === link.id
                          ? 'text-white bg-primary/20 border border-primary/30'
                          : 'text-slate-400 hover:text-white hover:bg-white/8'
                      }`}
                      style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                    >
                      {link.name}
                    </motion.div>
                  </ScrollLink>
                ))}
                <Link to="/downloads" onClick={() => setIsOpen(false)}>
                  <div className="mx-1 mt-2 px-4 py-3 rounded-xl text-sm font-semibold text-white text-center cursor-pointer"
                    style={{ background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)', fontFamily: 'Space Grotesk, sans-serif' }}>
                    Downloads
                  </div>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;