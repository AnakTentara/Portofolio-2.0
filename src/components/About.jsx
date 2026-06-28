import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import {
  Code2, Server, Bot, Gamepad2, Cpu,
  GraduationCap, Mail, Github, Linkedin,
  MapPin, Calendar, Briefcase, Layers,
  ArrowRight
} from 'lucide-react';
import profileLogo from '../../images/icon.png';

gsap.registerPlugin(ScrollTrigger);

const SectionHeader = ({ title, subtitle, eyebrow }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div ref={ref} className="text-center mb-16">
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 mb-4"
        >
          <div className="status-badge">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            {eyebrow}
          </div>
        </motion.div>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight"
        style={{ fontFamily: 'Archivo, sans-serif' }}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-slate-600 dark:text-slate-400 text-lg max-w-xl mx-auto leading-relaxed"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          {subtitle}
        </motion.p>
      )}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="mx-auto mt-6 h-[2px] w-20 rounded-full origin-center"
        style={{ background: 'linear-gradient(90deg, #3B82F6, #8B5CF6, #EC4899)' }}
      />
    </div>
  );
};

const SkillCard = ({ icon: Icon, title, description, gradient, delay }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="glass-card p-6 cursor-default group"
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
        style={{ background: gradient }}
      >
        <Icon size={22} className="text-white" />
      </div>
      <h3
        className="text-lg font-bold text-slate-900 dark:text-white mb-2"
        style={{ fontFamily: 'Archivo, sans-serif' }}
      >
        {title}
      </h3>
      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
        {description}
      </p>
    </motion.div>
  );
};

const LanguageBar = ({ lang, level, color, delay }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-slate-800 dark:text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{lang}</span>
        <span className="text-xs text-slate-500" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{level}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-slate-100 dark:bg-white/5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : {}}
          transition={{ duration: 1, delay, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ background: color }}
        />
      </div>
    </div>
  );
};

const About = () => {
  const timelineRef = useRef(null);
  const lineRef = useRef(null);
  const dotRefs = useRef([]);
  const cardRefs = useRef([]);

  const skills = [
    { icon: Code2,    title: 'Web Development',  description: 'Building modern, responsive interfaces with React, Vite, and Tailwind CSS.', gradient: 'linear-gradient(135deg, #3B82F6, #2563EB)', delay: 0 },
    { icon: Server,   title: 'Server Management', description: 'Setting up and managing VPS, reverse proxies, and Docker environments.', gradient: 'linear-gradient(135deg, #8B5CF6, #7C3AED)', delay: 0.08 },
    { icon: Bot,      title: 'Bot Development',   description: 'Building automation bots for Discord, WhatsApp, and other platforms.', gradient: 'linear-gradient(135deg, #06B6D4, #0891B2)', delay: 0.16 },
    { icon: Gamepad2, title: 'Minecraft Plugins', description: 'Creating custom Java plugins and managing Minecraft server networks.', gradient: 'linear-gradient(135deg, #10B981, #059669)', delay: 0.24 },
  ];

  const languages = [
    { lang: 'JavaScript', level: 90, color: 'linear-gradient(90deg, #F7DF1E, #F59E0B)' },
    { lang: 'Java',       level: 60, color: 'linear-gradient(90deg, #ED8B00, #E53E3E)' },
    { lang: 'TypeScript', level: 70, color: 'linear-gradient(90deg, #3178C6, #60A5FA)' },
    { lang: 'C++/C#',     level: 55, color: 'linear-gradient(90deg, #9B59B6, #8B5CF6)' },
    { lang: 'Python',     level: 50, color: 'linear-gradient(90deg, #306998, #06B6D4)' },
  ];

  const timeline = [
    { year: '2019', title: 'Started Coding', subtitle: 'First HTML/CSS experiments', active: false, icon: Code2 },
    { year: '2021', title: 'JS & Node.js', subtitle: 'Built first Discord bots', active: false, icon: Bot },
    { year: '2022', title: 'Minecraft Dev', subtitle: 'Java plugins & server setup', active: false, icon: Gamepad2 },
    { year: '2023', title: 'React & Modern Web', subtitle: 'Launched Portfolio 1.0', active: false, icon: Code2 },
    { year: '2024', title: 'Robotics & IoT', subtitle: 'Smart devices & hardware automation', active: true, icon: Cpu },
  ];

  const techStack = ['React', 'Node.js', 'JavaScript', 'Java', 'TailwindCSS', 'Discord.js', 'Express', 'Vite'];

  const infoCards = [
    { icon: MapPin,     label: 'Location',    value: 'Muara Enim, Indonesia' },
    { icon: Calendar,   label: 'Age',         value: '17 years old' },
    { icon: Briefcase,  label: 'Experience',  value: '5+ years' },
    { icon: Layers,     label: 'Projects',    value: '15+ completed' },
  ];

  // Staggered GSAP Entry Animations for Horizontal Timeline
  useEffect(() => {
    const el = timelineRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        }
      });

      // 1. Animate horizontal track line
      if (lineRef.current) {
        tl.fromTo(lineRef.current, 
          { scaleX: 0 }, 
          { scaleX: 1, duration: 0.8, ease: 'power2.out', transformOrigin: 'left center' }
        );
      }

      // 2. Animate timeline dots/nodes
      if (dotRefs.current.length > 0) {
        tl.fromTo(dotRefs.current.filter(Boolean), 
          { scale: 0, opacity: 0 }, 
          { scale: 1, opacity: 1, duration: 0.4, stagger: 0.1, ease: 'back.out(1.8)' },
          '-=0.4'
        );
      }

      // 3. Staggered reveal cards
      if (cardRefs.current.length > 0) {
        tl.fromTo(cardRefs.current.filter(Boolean), 
          { y: 20, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power2.out' },
          '-=0.3'
        );
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="py-24 bg-transparent relative">
      {/* Subtle bg orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="orb orb-purple w-[350px] h-[350px] top-0 right-0 opacity-30" style={{ filter: 'blur(80px)' }} />
        <div className="orb orb-teal w-[250px] h-[250px] bottom-0 left-0 opacity-20" style={{ filter: 'blur(70px)' }} />
      </div>

      <div className="container-portfolio relative z-10">
        <SectionHeader
          eyebrow="Who I am"
          title={<>About <span className="grad-text">Me</span></>}
          subtitle="A passionate teenage developer from Indonesia, exploring the world of technology and building things that matter."
        />

        {/* Bio + Info Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Bio text column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card p-7"
            >
              <h3 className="text-xl font-bold mb-3 grad-text" style={{ fontFamily: 'Archivo, sans-serif' }}>
                Who am I?
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                I'm <strong className="text-slate-900 dark:text-white">Haikal Mabrur</strong>, a 17-year-old developer from South Sumatera, Indonesia.
                Since I was 12, I've been diving deep into technology — from building HTML websites to
                managing Minecraft servers with custom Java plugins.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="glass-card p-7"
            >
              <h3 className="text-xl font-bold mb-3 grad-text-teal" style={{ fontFamily: 'Archivo, sans-serif' }}>
                My Journey
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                What started as curiosity about how websites work grew into a full-blown passion for
                software development. I love learning new frameworks, building communities around
                Minecraft, and shipping projects that solve real problems.
              </p>
            </motion.div>

            {/* Tech badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap gap-2"
            >
              {techStack.map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 + 0.3 }}
                  className="tech-badge"
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* Info Card column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card p-6 flex flex-col gap-6"
            >
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <img src={profileLogo} alt="Haikal" className="w-14 h-14 rounded-xl object-cover border border-white/5" />
                  <div>
                    <h3 className="text-white font-bold text-lg" style={{ fontFamily: 'Archivo, sans-serif' }}>Haikal Mabrur</h3>
                    <p className="text-slate-400 text-sm" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Student Developer · Indonesia</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {infoCards.map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5 border border-white/5">
                      <Icon size={14} className="text-primary-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-slate-500 text-xs" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{label}</p>
                        <p className="text-white text-sm font-semibold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social links row */}
              <div className="mt-6 flex gap-2">
                {[
                  { icon: Github,   href: 'https://github.com/AnakTentara',          label: 'GitHub' },
                  { icon: Linkedin, href: 'https://linkedin.com/in/haikal-mabrur',    label: 'LinkedIn' },
                  { icon: Mail,     href: 'mailto:me@haikaldev.my.id',               label: 'Email' },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 border border-white/10 hover:border-white/20 hover:bg-white/8 hover:text-white transition-all duration-200 cursor-pointer"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                  >
                    <Icon size={14} />
                    {label}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Horizontal Coding Journey Timeline Showcase */}
        <div ref={timelineRef} className="mb-24 relative">
          <h3
            className="text-2xl font-black text-center text-white mb-12"
            style={{ fontFamily: 'Archivo, sans-serif' }}
          >
            My Coding <span className="grad-text">Journey</span>
          </h3>

          {/* Desktop Timeline Track Line */}
          <div className="hidden md:block absolute left-10 right-10 top-1/2 -translate-y-4 h-[2px] bg-white/5 z-0">
            <div 
              ref={lineRef}
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 origin-left"
              style={{ transform: 'scaleX(0)' }}
            />
          </div>

          {/* Horizontal Track Grid */}
          <div className="flex md:grid md:grid-cols-5 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory gap-5 pb-6 md:pb-0 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 relative z-10">
            {timeline.map((item, idx) => (
              <div 
                key={idx} 
                ref={el => cardRefs.current[idx] = el}
                className="min-w-[260px] md:min-w-0 flex-1 snap-center flex flex-col items-center text-center opacity-0"
              >
                {/* Connecting Dot/Node */}
                <div className="relative mb-6 flex items-center justify-center">
                  <div 
                    ref={el => dotRefs.current[idx] = el}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 relative z-10 ${
                      item.active 
                        ? 'bg-primary text-white shadow-[0_0_20px_rgba(59,130,246,0.6)] border border-primary-200' 
                        : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    <item.icon size={16} />
                  </div>
                  {/* Decorative pulse ring for active state */}
                  {item.active && (
                    <div className="absolute w-12 h-12 rounded-full border border-primary/40 animate-ping opacity-75" />
                  )}
                </div>

                {/* Timeline Card */}
                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  className={`glass-card p-5 w-full border ${
                    item.active 
                      ? 'border-primary/20 dark:border-primary/25 bg-primary/5 dark:bg-slate-950/50' 
                      : 'border-slate-200 dark:border-white/5 bg-white/40 dark:bg-slate-950/20'
                  }`}
                >
                  <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full inline-block mb-3 ${
                    item.active 
                      ? 'bg-primary/10 dark:bg-primary/20 text-primary-600 dark:text-primary-300' 
                      : 'bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400'
                  }`} style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    {item.year}
                  </span>
                  <h4 className="text-slate-900 dark:text-white font-bold text-base mb-1" style={{ fontFamily: 'Archivo, sans-serif' }}>
                    {item.title}
                  </h4>
                  <p className="text-slate-555 dark:text-slate-400 text-xs leading-relaxed" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    {item.subtitle}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills grid */}
        <div className="mb-20">
          <h3
            className="text-2xl font-black text-center text-slate-900 dark:text-white mb-8"
            style={{ fontFamily: 'Archivo, sans-serif' }}
          >
            What I <span className="grad-text">Do</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {skills.map((skill) => (
              <SkillCard key={skill.title} {...skill} />
            ))}
          </div>
        </div>

        {/* Language proficiency */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-7"
          >
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6" style={{ fontFamily: 'Archivo, sans-serif' }}>
              Programming Languages
            </h3>
            <div className="space-y-4">
              {languages.map((item, i) => (
                <LanguageBar key={item.lang} {...item} delay={i * 0.1 + 0.2} />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-card p-7"
          >
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6" style={{ fontFamily: 'Archivo, sans-serif' }}>
              Human Languages
            </h3>
            <div className="space-y-4">
              <LanguageBar lang="Indonesian" level={100} color="linear-gradient(90deg, #10B981, #059669)" delay={0.2} />
              <LanguageBar lang="English"    level={85}  color="linear-gradient(90deg, #3B82F6, #60A5FA)" delay={0.3} />
            </div>

            <div className="mt-8 p-4 rounded-xl border border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-white/3">
              <p className="text-slate-600 dark:text-slate-300 text-sm italic leading-relaxed" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                "I believe every line of code is a small step toward building something meaningful.
                Learning never stops — and that's what makes this journey exciting."
              </p>
              <p className="text-slate-400 dark:text-slate-500 text-xs mt-3" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>— Haikal Mabrur</p>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <div className="flex justify-end">
          <Link to="/more-about" className="cursor-pointer">
            <motion.div
              whileHover={{ scale: 1.03, x: 4 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 btn-primary"
            >
              More About Me
              <ArrowRight size={16} />
            </motion.div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default About;