import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import {
  Code2, Server, Bot, Gamepad2,
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
        className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight"
        style={{ fontFamily: 'Archivo, sans-serif' }}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed"
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
        className="text-lg font-bold text-white mb-2"
        style={{ fontFamily: 'Archivo, sans-serif' }}
      >
        {title}
      </h3>
      <p className="text-slate-400 text-sm leading-relaxed" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
        {description}
      </p>
    </motion.div>
  );
};

const TimelineItem = ({ year, title, subtitle, active, delay }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="relative flex gap-4 pb-8 last:pb-0"
    >
      {/* Line */}
      <div className="flex flex-col items-center">
        <div
          className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 transition-all duration-300 ${
            active ? 'bg-primary-400 shadow-[0_0_12px_rgba(59,130,246,0.6)]' : 'bg-slate-600'
          }`}
        />
        <div className="w-[1px] flex-1 mt-2" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.1), transparent)' }} />
      </div>
      {/* Content */}
      <div className="pb-2">
        <span
          className={`text-xs font-medium px-2 py-0.5 rounded-full mb-2 inline-block ${
            active ? 'bg-primary/20 text-primary-300 border border-primary/30' : 'bg-white/5 text-slate-500 border border-white/10'
          }`}
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          {year}
        </span>
        <h4 className="text-white font-semibold text-sm mt-1" style={{ fontFamily: 'Archivo, sans-serif' }}>{title}</h4>
        <p className="text-slate-500 text-xs mt-0.5" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{subtitle}</p>
      </div>
    </motion.div>
  );
};

const LanguageBar = ({ lang, level, color, delay }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{lang}</span>
        <span className="text-xs text-slate-500" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{level}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
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
    { year: '2019', title: 'Started Coding', subtitle: 'First HTML/CSS experiments', active: false },
    { year: '2021', title: 'JavaScript & Node.js', subtitle: 'Built first Discord bots', active: false },
    { year: '2022', title: 'Minecraft Development', subtitle: 'Java plugins & server management', active: false },
    { year: '2023', title: 'React & Modern Web', subtitle: 'Launched Portfolio v1.0', active: false },
    { year: '2024', title: 'MAN 1 Muara Enim', subtitle: 'Science Major, Informatics focus', active: true },
    { year: '2026', title: 'Portfolio 3.0', subtitle: 'Full-stack renovation ✨', active: true },
  ];

  const techStack = ['React', 'Node.js', 'JavaScript', 'Java', 'TailwindCSS', 'Discord.js', 'Express', 'Vite'];

  const infoCards = [
    { icon: MapPin,     label: 'Location',    value: 'Muara Enim, Indonesia' },
    { icon: Calendar,   label: 'Age',         value: '17 years old' },
    { icon: Briefcase,  label: 'Experience',  value: '5+ years' },
    { icon: Layers,     label: 'Projects',    value: '15+ completed' },
  ];

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

        {/* Bio + Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">

          {/* Bio text */}
          <div className="space-y-6">
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
              <p className="text-slate-300 leading-relaxed" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                I'm <strong className="text-white">Haikal Mabrur</strong>, a 17-year-old developer from South Sumatera, Indonesia.
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
              <p className="text-slate-300 leading-relaxed" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
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

          {/* Info card + Timeline */}
          <div className="space-y-6">
            {/* Quick info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card p-6"
            >
              <div className="flex items-center gap-3 mb-5">
                <img src={profileLogo} alt="Haikal" className="w-14 h-14 rounded-xl object-cover" />
                <div>
                  <h3 className="text-white font-bold text-lg" style={{ fontFamily: 'Archivo, sans-serif' }}>Haikal Mabrur</h3>
                  <p className="text-slate-400 text-sm" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Student Developer · Indonesia</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {infoCards.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-2 p-3 rounded-xl bg-white/5 border border-white/5">
                    <Icon size={14} className="text-primary-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-slate-500 text-xs" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{label}</p>
                      <p className="text-white text-sm font-medium" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Education */}
              <div className="mt-4 p-3 rounded-xl border border-primary/20 bg-primary/5">
                <div className="flex items-center gap-2 mb-1">
                  <GraduationCap size={14} className="text-primary-400" />
                  <span className="text-xs font-semibold text-primary-300 uppercase tracking-wider" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Education</span>
                </div>
                <p className="text-white text-sm font-semibold" style={{ fontFamily: 'Archivo, sans-serif' }}>MAN 1 Muara Enim</p>
                <p className="text-slate-400 text-xs mt-0.5" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Science Major · 2024–2027</p>
              </div>

              {/* Social links */}
              <div className="mt-4 flex gap-2">
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
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium text-slate-300 border border-white/10 hover:border-white/20 hover:bg-white/8 transition-all duration-200 cursor-pointer"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                  >
                    <Icon size={14} />
                    {label}
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="glass-card p-6"
            >
              <h3 className="text-base font-bold text-white mb-5" style={{ fontFamily: 'Archivo, sans-serif' }}>My Coding Journey</h3>
              {timeline.map((item, i) => (
                <TimelineItem key={i} {...item} delay={i * 0.07} />
              ))}
            </motion.div>
          </div>
        </div>

        {/* Skills grid */}
        <div className="mb-16">
          <h3
            className="text-2xl font-black text-center text-white mb-8"
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
            <h3 className="text-lg font-bold text-white mb-6" style={{ fontFamily: 'Archivo, sans-serif' }}>
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
            <h3 className="text-lg font-bold text-white mb-6" style={{ fontFamily: 'Archivo, sans-serif' }}>
              Human Languages
            </h3>
            <div className="space-y-4">
              <LanguageBar lang="Indonesian" level={100} color="linear-gradient(90deg, #10B981, #059669)" delay={0.2} />
              <LanguageBar lang="English"    level={85}  color="linear-gradient(90deg, #3B82F6, #60A5FA)" delay={0.3} />
            </div>

            <div className="mt-8 p-4 rounded-xl border border-white/5 bg-white/3">
              <p className="text-slate-300 text-sm italic leading-relaxed" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                "I believe every line of code is a small step toward building something meaningful.
                Learning never stops — and that's what makes this journey exciting."
              </p>
              <p className="text-slate-500 text-xs mt-3" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>— Haikal Mabrur</p>
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