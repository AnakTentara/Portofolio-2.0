import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ExternalLink, ArrowRight, Github, Code2, Server, Bot } from 'lucide-react';
import { Link } from 'react-router-dom';

import projectPictPortov1 from '../../images/1stportofolio.png';
import projectPictPortov2 from '../../images/screenshot-portofolio.png';
import projectPictNaturalSMP from '../../images/naturalsmp-screenshot.png';
import projectPictNaniKore from '../../images/nanikoregroup.png';

const TiltCard = ({ children, className = '', isHovered, setIsHovered }) => {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glow, setGlow] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    
    // Smooth responsive tilt calculations
    const tiltX = -(y - yc) / 12;
    const tiltY = (x - xc) / 12;
    
    const glowX = (x / rect.width) * 100;
    const glowY = (y / rect.height) * 100;

    setTilt({ x: tiltX, y: tiltY });
    setGlow({ x: glowX, y: glowY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative transition-all duration-300 ease-out cursor-pointer ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovered ? 1.02 : 1})`,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Glossy Reflection Overlay */}
      <div
        className="absolute inset-0 pointer-events-none rounded-2xl z-20 transition-opacity duration-500"
        style={{
          background: isHovered 
            ? `radial-gradient(circle 220px at ${glow.x}% ${glow.y}%, rgba(255, 255, 255, 0.08), transparent 80%)`
            : 'none',
        }}
      />
      {children}
    </div>
  );
};

const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const isCardInView = useInView(cardRef, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isCardInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="w-full"
    >
      <TiltCard
        isHovered={isHovered}
        setIsHovered={setIsHovered}
        className="glass-card overflow-hidden h-full hover:border-slate-300 dark:hover:border-white/15"
      >
        <div className="flex flex-col h-full">
          {/* Project Image & Gradient Overlay */}
          <div className="relative h-52 overflow-hidden rounded-t-2xl">
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white dark:to-[#0d1222] z-10"
              animate={{ opacity: isHovered ? 0.3 : 0.5 }}
            />
            <motion.img
              src={project.image}
              alt={project.title}
              className="object-cover w-full h-full"
              animate={{ scale: isHovered ? 1.06 : 1 }}
              transition={{ duration: 0.5 }}
            />
            {/* Quick Action Links Overlay */}
            <motion.div
              className="absolute top-4 right-4 z-20 flex gap-2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.9 }}
              transition={{ duration: 0.2 }}
            >
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-9 h-9 text-slate-700 dark:text-slate-200 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-full border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-all shadow-md"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github size={16} />
                </a>
              )}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-9 h-9 text-white bg-primary/80 backdrop-blur-md rounded-full border border-slate-200 dark:border-white/10 hover:bg-primary transition-all shadow-md"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink size={15} />
                </a>
              )}
            </motion.div>
          </div>

          {/* Project Content */}
          <div className="p-6 flex-1 flex flex-col justify-between" style={{ transform: 'translateZ(20px)' }}>
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-primary/10 border border-primary/20 text-primary-600 dark:text-primary-400">
                  <project.icon size={18} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight" style={{ fontFamily: 'Archivo, sans-serif' }}>
                  {project.title}
                </h3>
              </div>
              <p className="text-slate-650 dark:text-slate-400 text-sm leading-relaxed mb-5" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                {project.description}
              </p>
            </div>

            <div>
              {/* Tech Tags */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-300 font-medium"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Primary action link */}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary-400 hover:text-primary-300 transition-colors cursor-pointer group"
                >
                  Visit live project
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </a>
              )}
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
};

const Projects = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const isHeadingInView = useInView(headingRef, { once: true, amount: 0.3 });
  
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Web', 'Minecraft', 'Bot'];

  const projects = [
    {
      id: 1,
      title: "Portfolio Website 2.0",
      description: "My personal portfolio website built with React and Tailwind CSS, featuring smooth animations and responsive design.",
      image: projectPictPortov2,
      technologies: ["React", "Tailwind CSS", "Framer Motion"],
      github: "https://github.com/AnakTentara/Portofolio-2.0",
      link: "https://haikaldev.my.id",
      icon: Code2,
      category: "Web"
    },
    {
      id: 2,
      title: "NaturalSMP Minecraft Server",
      description: "A custom Minecraft server network with unique gameplay features, custom plugins, and a dedicated community.",
      image: projectPictNaturalSMP,
      technologies: ["Java", "PaperMC", "Docker", "SQLite"],
      link: "https://web.naturalsmp.xyz",
      icon: Server,
      category: "Minecraft"
    },
    {
      id: 3,
      title: "First Portfolio Website",
      description: "My first portfolio website, designed and built from scratch to showcase my early development skills.",
      image: projectPictPortov1,
      technologies: ["HTML", "CSS", "JavaScript"],
      github: "https://github.com/AnakTentara/Portofolio",
      link: "https://v1.haikaldev.my.id",
      icon: Code2,
      category: "Web"
    },
    {
      id: 4,
      title: "NaniKore Group Website",
      description: "A collaborative group website that features various projects and resources for the community.",
      image: projectPictNaniKore,
      technologies: ["React", "TailwindCSS", "Node.js"],
      github: "https://github.com/AnakTentara/NaniKore-Group",
      link: "https://group.haikaldev.my.id",
      icon: Bot,
      category: "Bot"
    }
  ];

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  return (
    <section ref={sectionRef} id="projects" className="py-24 bg-transparent relative overflow-hidden">
      {/* Neon glowing backdrop orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="orb orb-blue w-[400px] h-[400px] -top-20 left-1/4 opacity-15" />
        <div className="orb orb-purple w-[300px] h-[300px] bottom-10 right-10 opacity-20" />
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
              <div className="w-1.5 h-1.5 rounded-full bg-primary-400 animate-ping" />
              My Creations
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight"
            style={{ fontFamily: 'Archivo, sans-serif' }}
          >
            Featured <span className="grad-text">Projects</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-650 dark:text-slate-400 text-lg max-w-xl mx-auto leading-relaxed"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            A curated selection of things I've built, reflecting my journey across web, Minecraft development, and automation.
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isHeadingInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mx-auto mt-6 h-[2px] w-20 rounded-full"
            style={{ background: 'linear-gradient(90deg, #3B82F6, #8B5CF6, #EC4899)' }}
          />
        </div>

        {/* Category Selector Tabs */}
        <div className="flex justify-center gap-2 mb-12">
          <div className="inline-flex p-1 rounded-full bg-slate-100/80 dark:bg-white/5 border border-slate-200 dark:border-white/5 backdrop-blur-md">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`relative px-6 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
                  selectedCategory === cat 
                    ? 'text-white bg-primary shadow-lg shadow-primary/20' 
                    : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
                }`}
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectCard project={project} index={idx} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View More Call to Action */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link to="/more-projects" className="cursor-pointer inline-block">
            <motion.div
              whileHover={{ scale: 1.03, x: 4 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 btn-primary"
            >
              Explore More Projects
              <ArrowRight size={16} />
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;