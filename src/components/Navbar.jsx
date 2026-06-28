import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Download, Sun, Moon, ChevronDown, User, Layers, ShieldAlert, FolderHeart, HeartHandshake } from 'lucide-react';
import { gsap } from 'gsap';
import $iconGR from '../../images/icon-bggradient.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [theme, setTheme] = useState('dark');
  
  // Mobile accordion expand state
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileProjectsOpen, setMobileProjectsOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const navRef = useRef(null);
  const progressRef = useRef(null);

  // Sync route path changes - reset mobile drawer
  useEffect(() => { 
    setIsOpen(false); 
    setMobileAboutOpen(false);
    setMobileProjectsOpen(false);
  }, [location]);

  // Load and apply theme from storage or default to dark
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    const root = document.documentElement;
    if (savedTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    const root = document.documentElement;
    if (newTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  };

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

  // Section active tracking spy
  useEffect(() => {
    if (location.pathname !== '/') return;
    const sections = ['home', 'about', 'projects', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { rootMargin: '-60px 0px -60px 0px', threshold: 0.15 }
    );
    sections.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => sections.forEach(id => { const el = document.getElementById(id); if (el) observer.unobserve(el); });
  }, [location.pathname]);

  const handleNavClick = (sectionId) => {
    setIsOpen(false);
    if (location.pathname !== '/') {
      navigate(`/#${sectionId}`);
      // Fallback scroll after navigation
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav ref={navRef} className="fixed w-full top-4 left-0 right-0 z-50 px-4 md:px-6">
      {/* Scroll progress bar */}
      <div
        ref={progressRef}
        className="fixed top-0 left-0 right-0 h-[2.5px] origin-left z-[60]"
        style={{
          background: 'linear-gradient(90deg, #3B82F6, #8B5CF6, #EC4899)',
          transform: 'scaleX(0)',
        }}
      />

      <div className="max-w-5xl mx-auto">
        <motion.div
          className={`relative rounded-2xl px-5 md:px-7 py-3 md:py-3 transition-all duration-500 bg-white/5 border border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.3)] ${
            scrolled ? 'backdrop-blur-2xl bg-white/10 dark:bg-[#070b13]/85 border-white/10 dark:border-white/8' : 'backdrop-blur-xl'
          }`}
          style={{ backdropFilter: 'blur(20px) saturate(180%)' }}
        >
          {/* Top light glow reflection */}
          <div
            className="absolute top-0 left-6 right-6 h-[1.5px] rounded-full opacity-60"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.6), rgba(139,92,246,0.6), transparent)' }}
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

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-1">
              {/* Home */}
              <button
                onClick={() => handleNavClick('home')}
                className={`relative px-4 py-2 text-sm font-medium transition-colors font-body cursor-pointer ${
                  location.pathname === '/' && activeSection === 'home' ? 'text-white' : 'text-slate-400 hover:text-white'
                }`}
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                Home
              </button>

              {/* About dropdown trigger */}
              <div className="relative group/dropdown">
                <button
                  onClick={() => handleNavClick('about')}
                  className={`flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors font-body cursor-pointer ${
                    location.pathname === '/' && activeSection === 'about' ? 'text-white' : 'text-slate-400 hover:text-white'
                  }`}
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  About
                  <ChevronDown size={14} className="group-hover/dropdown:rotate-180 transition-transform duration-300" />
                </button>
                {/* Dropdown Container */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 pointer-events-none group-hover/dropdown:opacity-100 group-hover/dropdown:pointer-events-auto transition-all duration-300 z-50">
                  <div className="glass-card p-2 w-48 bg-slate-950/85 backdrop-blur-2xl border border-white/10 rounded-xl shadow-2xl flex flex-col">
                    <button
                      onClick={() => handleNavClick('about')}
                      className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-all text-left"
                    >
                      <User size={13} />
                      About Overview
                    </button>
                    <Link
                      to="/more-about"
                      className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                    >
                      <HeartHandshake size={13} />
                      More About Me
                    </Link>
                  </div>
                </div>
              </div>

              {/* Projects dropdown trigger */}
              <div className="relative group/dropdown">
                <button
                  onClick={() => handleNavClick('projects')}
                  className={`flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors font-body cursor-pointer ${
                    location.pathname === '/' && activeSection === 'projects' ? 'text-white' : 'text-slate-400 hover:text-white'
                  }`}
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  Projects
                  <ChevronDown size={14} className="group-hover/dropdown:rotate-180 transition-transform duration-300" />
                </button>
                {/* Dropdown Container */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 pointer-events-none group-hover/dropdown:opacity-100 group-hover/dropdown:pointer-events-auto transition-all duration-300 z-50">
                  <div className="glass-card p-2 w-48 bg-slate-950/85 backdrop-blur-2xl border border-white/10 rounded-xl shadow-2xl flex flex-col">
                    <button
                      onClick={() => handleNavClick('projects')}
                      className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-all text-left"
                    >
                      <Layers size={13} />
                      Featured Projects
                    </button>
                    <Link
                      to="/more-projects"
                      className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                    >
                      <FolderHeart size={13} />
                      Projects Archive
                    </Link>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <button
                onClick={() => handleNavClick('contact')}
                className={`relative px-4 py-2 text-sm font-medium transition-colors font-body cursor-pointer ${
                  location.pathname === '/' && activeSection === 'contact' ? 'text-white' : 'text-slate-400 hover:text-white'
                }`}
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                Contact
              </button>
            </div>

            {/* Right side CTA & Theme Actions */}
            <div className="hidden md:flex items-center gap-4">
              {/* White/Dark Mode Toggle Button */}
              <motion.button
                onClick={toggleTheme}
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-slate-300 hover:text-white transition-all cursor-pointer"
                title="Change Theme Mode"
              >
                {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
              </motion.button>

              <Link to="/downloads">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white cursor-pointer"
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

            {/* Mobile Actions Drawer trigger */}
            <div className="md:hidden flex items-center gap-3">
              <motion.button
                onClick={toggleTheme}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-slate-300"
              >
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              </motion.button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Mobile menu Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="mt-2 rounded-2xl overflow-hidden border border-white/10 bg-slate-950/95 backdrop-blur-2xl"
            >
              <div className="p-3 space-y-1">
                {/* Home */}
                <button
                  onClick={() => handleNavClick('home')}
                  className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  Home
                </button>

                {/* About Accordion */}
                <div className="space-y-1">
                  <button
                    onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                  >
                    <span>About</span>
                    <ChevronDown size={14} className={`transform transition-transform ${mobileAboutOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileAboutOpen && (
                    <div className="pl-4 space-y-1">
                      <button
                        onClick={() => handleNavClick('about')}
                        className="w-full text-left px-4 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition-all"
                      >
                        About Overview
                      </button>
                      <Link
                        to="/more-about"
                        className="block px-4 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition-all"
                      >
                        More About Me
                      </Link>
                    </div>
                  )}
                </div>

                {/* Projects Accordion */}
                <div className="space-y-1">
                  <button
                    onClick={() => setMobileProjectsOpen(!mobileProjectsOpen)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                  >
                    <span>Projects</span>
                    <ChevronDown size={14} className={`transform transition-transform ${mobileProjectsOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileProjectsOpen && (
                    <div className="pl-4 space-y-1">
                      <button
                        onClick={() => handleNavClick('projects')}
                        className="w-full text-left px-4 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition-all"
                      >
                        Featured Projects
                      </button>
                      <Link
                        to="/more-projects"
                        className="block px-4 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition-all"
                      >
                        Projects Archive
                      </Link>
                    </div>
                  )}
                </div>

                {/* Contact */}
                <button
                  onClick={() => handleNavClick('contact')}
                  className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  Contact
                </button>

                {/* Downloads button */}
                <Link to="/downloads" onClick={() => setIsOpen(false)}>
                  <div 
                    className="mx-1 mt-3 px-4 py-3 rounded-xl text-sm font-semibold text-white text-center cursor-pointer"
                    style={{ background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)', fontFamily: 'Space Grotesk, sans-serif' }}
                  >
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