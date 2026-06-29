import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scrollToSection } from '../utils/scrollToSection';
import { useTypingText } from '../utils/typingAnimation';
import { ArrowDown, Code2, Server, Bot, Gamepad2, ChevronRight, Github, Mail } from 'lucide-react';
import $icon from '../../images/icon.png';

gsap.registerPlugin(ScrollTrigger);

// Auto-calculate years of experience from start year
const CODING_START_YEAR = 2019;
const getYearsExperience = () => {
  const currentYear = new Date().getFullYear();
  return currentYear - CODING_START_YEAR;
};

// Optimized particle canvas — O(n log n) approach via spatial grid + FPS throttle
const ParticleCanvas = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const animIdRef = useRef(null);
  const lastTimeRef = useRef(0);
  const TARGET_FPS = 60;
  const FRAME_INTERVAL = 1000 / TARGET_FPS;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let resizeTimeout = null;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resize, 200);
    };

    const initParticles = () => {
      particles = [];
      // Reduced density for better performance
      const count = Math.min(Math.floor((canvas.width * canvas.height) / 16000), 80);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.5 + 0.1,
          hue: Math.floor(Math.random() * 60 + 210),
        });
      }
    };

    const handleMouse = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    resize();
    window.addEventListener('resize', debouncedResize, { passive: true });
    window.addEventListener('mousemove', handleMouse, { passive: true });

    const CONNECT_DIST = 90; // Reduced from 100
    const CONNECT_DIST_SQ = CONNECT_DIST * CONNECT_DIST;

    const draw = (timestamp) => {
      animIdRef.current = requestAnimationFrame(draw);

      // FPS throttle
      if (timestamp - lastTimeRef.current < FRAME_INTERVAL) return;
      lastTimeRef.current = timestamp;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      particles.forEach((p, i) => {
        // Mouse repel
        const dx = p.x - mx;
        const dy = p.y - my;
        const distSq = dx * dx + dy * dy;
        if (distSq < 14400) { // 120^2
          const dist = Math.sqrt(distSq);
          const force = (120 - dist) / 120;
          p.vx += (dx / dist) * force * 0.08;
          p.vy += (dy / dist) * force * 0.08;
        }

        p.vx *= 0.98;
        p.vy *= 0.98;
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 80%, 70%, ${p.opacity})`;
        ctx.fill();

        // Connect nearby particles — only compare with NEXT particles (half comparisons)
        // Further optimized by skipping every other particle for connections
        for (let j = i + 1; j < particles.length; j++) {
          const op = particles[j];
          const ddx = p.x - op.x;
          const ddy = p.y - op.y;
          const dSq = ddx * ddx + ddy * ddy;
          if (dSq < CONNECT_DIST_SQ) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(147,197,253,${0.1 * (1 - dSq / CONNECT_DIST_SQ)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(op.x, op.y);
            ctx.stroke();
          }
        }
      });
    };

    animIdRef.current = requestAnimationFrame(draw);

    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', debouncedResize);
      window.removeEventListener('mousemove', handleMouse);
      if (animIdRef.current) cancelAnimationFrame(animIdRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.7 }}
    />
  );
};

// Rotating text roles
const roles = ['Web Developer', 'Server Manager', 'Plugin Creator', 'Bot Developer', 'Student & Creator'];

const RoleRotator = () => {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx(i => (i + 1) % roles.length);
        setVisible(true);
      }, 400);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <span
      className="inline-block grad-text-hero min-w-[220px]"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(-8px)',
        transition: 'opacity 0.4s ease, transform 0.4s ease',
      }}
    >
      {roles[idx]}
    </span>
  );
};

const Hero = () => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const skillsRef = useRef(null);
  const ctaRef = useRef(null);

  const yearsExp = getYearsExperience();

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  const y       = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale   = useTransform(scrollYProgress, [0, 0.5], [1, 0.92]);

  const smoothY     = useSpring(y,       { stiffness: 80, damping: 20 });
  const smoothScale = useSpring(scale,   { stiffness: 80, damping: 20 });

  // GSAP stagger entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(badgeRef.current,
        { opacity: 0, y: 20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, delay: 0.5 }
      )
      .fromTo(titleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8 }, '-=0.2'
      )
      .fromTo(descRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7 }, '-=0.4'
      )
      .fromTo(skillsRef.current?.children || [],
        { opacity: 0, y: 20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.08 }, '-=0.3'
      )
      .fromTo(ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 }, '-=0.2'
      )
      .fromTo(imageRef.current,
        { opacity: 0, x: 40, scale: 0.9 },
        { opacity: 1, x: 0, scale: 1, duration: 1, ease: 'power2.out' }, 0.3
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const skills = [
    { icon: Code2,    label: 'Web Dev' },
    { icon: Server,   label: 'Server' },
    { icon: Bot,      label: 'Bot Dev' },
    { icon: Gamepad2, label: 'Minecraft' },
  ];

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen overflow-hidden pt-20 md:pt-24 flex items-center"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[var(--color-bg)] transition-colors duration-500" />
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Orbs */}
      <div className="orb orb-blue w-[500px] h-[500px] -top-40 -left-40 animate-morph" style={{ animationDelay: '0s' }} />
      <div className="orb orb-purple w-[400px] h-[400px] top-1/2 -right-32 animate-morph" style={{ animationDelay: '-3s' }} />
      <div className="orb orb-teal w-[300px] h-[300px] bottom-20 left-1/4 animate-morph" style={{ animationDelay: '-6s' }} />

      <ParticleCanvas />

      <motion.div
        className="relative z-10 w-full"
        style={{ y: smoothY, opacity, scale: smoothScale }}
      >
        <div className="container-portfolio py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left: Text Content */}
            <div className="space-y-6 text-center lg:text-left order-2 lg:order-1">

              {/* Status badge */}
              <div ref={badgeRef} className="flex justify-center lg:justify-start" style={{ opacity: 0 }}>
                <div className="status-badge inline-flex">
                  <span className="status-dot" />
                  Available for projects
                </div>
              </div>

              {/* Heading */}
              <div ref={titleRef} style={{ opacity: 0 }}>
                <h1
                  className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white leading-tight tracking-tight"
                  style={{ fontFamily: 'Archivo, sans-serif' }}
                >
                  Hi, I'm{' '}
                  <span
                    className="relative inline-block"
                  >
                    <span className="grad-text-hero">Haikal</span>
                    {/* underline */}
                    <motion.span
                      className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full"
                      style={{ background: 'linear-gradient(90deg, #3B82F6, #8B5CF6, #EC4899)' }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.8, delay: 1.2, ease: 'easeOut' }}
                    />
                  </span>
                </h1>
                <div
                  className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold text-slate-700 dark:text-slate-300 leading-tight"
                  style={{ fontFamily: 'Archivo, sans-serif' }}
                >
                  a <RoleRotator />
                </div>
              </div>

              {/* Description */}
              <p
                ref={descRef}
                className="text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-md mx-auto lg:mx-0 leading-relaxed"
                style={{ opacity: 0, fontFamily: 'Space Grotesk, sans-serif' }}
              >
                A passionate teenager from Indonesia, exploring tech, building projects, and creating
                digital experiences that actually matter.
              </p>

              {/* Skill chips */}
              <div
                ref={skillsRef}
                className="flex flex-wrap gap-2 justify-center lg:justify-start"
              >
                {skills.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium text-slate-700 dark:text-slate-300 border border-slate-200/50 dark:border-white/10 cursor-default"
                    style={{
                      background: 'var(--glass-bg-light)',
                      backdropFilter: 'blur(10px)',
                      fontFamily: 'Space Grotesk, sans-serif',
                      opacity: 0
                    }}
                  >
                    <Icon size={14} className="text-primary-400" />
                    {label}
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div ref={ctaRef} className="flex flex-wrap gap-3 justify-center lg:justify-start" style={{ opacity: 0 }}>
                <motion.button
                  whileHover={{ scale: 1.04, boxShadow: '0 8px 30px rgba(59,130,246,0.4)' }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => scrollToSection('contact')}
                  className="btn-primary cursor-pointer"
                >
                  <Mail size={16} />
                  Get in Touch
                </motion.button>
                <motion.a
                  href="https://github.com/AnakTentara"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="btn-outline inline-flex items-center gap-2"
                >
                  <Github size={16} />
                  GitHub
                </motion.a>
              </div>
            </div>

            {/* Right: Profile image */}
            <div
              ref={imageRef}
              className="flex justify-center lg:justify-end items-center order-1 lg:order-2"
              style={{ opacity: 0 }}
            >
              <div className="relative">
                {/* Outer morphing glow */}
                <motion.div
                  className="absolute -inset-8 rounded-full morph-blob"
                  style={{
                    background: 'linear-gradient(135deg, rgba(59,130,246,0.3), rgba(139,92,246,0.25), rgba(6,182,212,0.2))',
                    filter: 'blur(30px)',
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                />

                {/* Card container */}
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  className="relative w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72 glass-card p-1.5 float-anim"
                >
                  {/* Inner glow */}
                  <div
                    className="absolute inset-0 rounded-[18px] opacity-50"
                    style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.2), transparent, rgba(139,92,246,0.2))' }}
                  />

                  <img
                    src={$icon}
                    alt="Haikal Mabrur"
                    className="w-full h-full object-cover rounded-[16px] relative z-10"
                    loading="eager"
                  />

                  {/* Shimmer border */}
                  <div
                    className="absolute inset-0 rounded-[20px] pointer-events-none"
                    style={{
                      background: 'linear-gradient(135deg, rgba(59,130,246,0.5), rgba(139,92,246,0.3), rgba(6,182,212,0.4), rgba(236,72,153,0.2))',
                      padding: '1px',
                      mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      maskComposite: 'exclude',
                    }}
                  />
                </motion.div>

                {/* Floating badge cards */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.5, duration: 0.6 }}
                  className="absolute -left-6 top-1/4 glass rounded-xl px-3 py-2 border border-slate-200/50 dark:border-white/10"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-medium text-slate-800 dark:text-white whitespace-nowrap" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                      {yearsExp}+ years exp
                    </span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.8, duration: 0.6 }}
                  className="absolute -right-6 bottom-1/4 glass rounded-xl px-3 py-2 border border-slate-200/50 dark:border-white/10"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-slate-800 dark:text-white whitespace-nowrap" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                      15+ Projects
                    </span>
                    <ChevronRight size={12} className="text-primary-400" />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 cursor-pointer"
        style={{ opacity }}
        onClick={() => scrollToSection('about')}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-slate-500 tracking-widest uppercase" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Scroll</span>
          <div
            className="w-8 h-12 rounded-full border border-slate-300 dark:border-white/20 flex justify-center items-start pt-2"
            style={{ background: 'var(--glass-bg-light)' }}
          >
            <motion.div
              className="w-1 h-2 rounded-full bg-primary-400"
              animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;