import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { 
  Home, Download, Github, ExternalLink, Code2, 
  Calendar, Film, Youtube, Play, ArrowLeft, Instagram 
} from 'lucide-react';

import projectPictPortov1 from '../../../images/1stportofolio.png';
import projectPictPortov2 from '../../../images/screenshot-portofolio.png';
import projectPictNaturalSMP from '../../../images/naturalsmp-screenshot.png';
import projectPictNaniKore from '../../../images/nanikoregroup.png';

const ProjectCard = ({ project, index, priority = false }) => {
  const cardRef = useRef(null);
  const isCardInView = useInView(cardRef, { once: true, amount: 0.15 });
  const [isHovered, setIsHovered] = useState(false);

  const cardVariants = {
    initial: {
      scale: 1,
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    },
    hover: {
      scale: 1.02,
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 300,
        damping: 18
      }
    },
    tap: {
      scale: 0.98,
      transition: {
        duration: 0.2
      }
    },
  };

  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;
    if (url.includes('youtube.com/embed/')) {
      return `${url}?showinfo=0&rel=0`;
    }
    return url;
  };

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      className={`w-full ${priority ? 'col-span-1 md:col-span-2' : ''} glass-card overflow-hidden hover:border-slate-300 dark:hover:border-white/12`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Project Visual / Video */}
      <div className="relative h-56 overflow-hidden">
        {project.isVideoEdit ? (
          <div className="w-full h-full bg-black relative">
            <iframe
              src={getYouTubeEmbedUrl(project.videoUrl)}
              className="w-full h-full border-none"
              title={project.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <>
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white dark:to-[#0d1222] z-10"
              animate={{ opacity: isHovered ? 0.3 : 0.5 }}
            />
            <motion.img
              src={project.image}
              alt={project.title}
              className="object-cover w-full h-full"
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.4 }}
            />

            {/* Hover actions buttons */}
            <motion.div
              className="absolute inset-0 z-20 flex items-center justify-center opacity-0 gap-4"
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {project.github && (
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-11 h-11 text-slate-700 dark:text-white bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-full border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github size={18} />
                </motion.a>
              )}

              {project.link && (
                <motion.a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-11 h-11 text-white bg-primary/80 backdrop-blur-md rounded-full border border-slate-200 dark:border-white/10 hover:bg-primary transition-all shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ExternalLink size={17} />
                </motion.a>
              )}
            </motion.div>
          </>
        )}
      </div>

      {/* Info Details */}
      <div className="p-6">
        <div className="flex justify-between items-start gap-3 mb-3">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight" style={{ fontFamily: 'Archivo, sans-serif' }}>
            {project.title}
          </h3>
          <div className="flex items-center gap-1.5 text-xs text-slate-550 dark:text-slate-500 whitespace-nowrap" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            <Calendar size={13} />
            <span>{project.date}</span>
          </div>
        </div>

        <p className="text-slate-650 dark:text-slate-400 text-sm leading-relaxed mb-5" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          {project.description}
        </p>

        {/* Tech Badges */}
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

        <div className="flex justify-between items-center border-t border-slate-200 dark:border-white/5 pt-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          <span className="text-xs text-slate-500 flex items-center gap-1.5">
            {project.isVideoEdit ? (
              <><Film size={14} className="text-rose-400" /> Video Edit</>
            ) : (
              <><Code2 size={14} className="text-primary-400" /> {project.type}</>
            )}
          </span>

          {project.status && (
            <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${
              project.status === 'Completed' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
              project.status === 'In Progress' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' :
              'bg-blue-500/10 border-blue-500/20 text-blue-400'
            }`}>
              {project.status}
            </span>
          )}
        </div>

        {/* Youtube link if applicable */}
        {project.isVideoEdit && project.youtubeLink && (
          <motion.a
            href={project.youtubeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 mt-4 py-2.5 px-4 rounded-xl bg-red-600/10 border border-red-600/20 hover:bg-red-600/25 text-red-300 text-sm font-semibold transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            <Youtube size={16} />
            Watch on YouTube
          </motion.a>
        )}
      </div>
    </motion.div>
  );
};

const MoreProjects = () => {
  const headerRef = useRef(null);
  const devSectionRef = useRef(null);
  const videoSectionRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.3 });
  const isDevSectionInView = useInView(devSectionRef, { once: true, amount: 0.1 });
  const isVideoSectionInView = useInView(videoSectionRef, { once: true, amount: 0.1 });

  const projects = [
    {
      id: 1,
      title: "Portfolio Website 2.0",
      description: "My personal portfolio website built with React and Tailwind CSS, featuring smooth animations and responsive design. It showcases my projects, skills, and experiences.",
      image: projectPictPortov2,
      technologies: ["React", "Tailwind CSS", "Framer Motion"],
      github: "https://github.com/AnakTentara/Portofolio-2.0",
      link: "https://haikaldev.my.id",
      date: "2025",
      type: "Web App",
      status: "In Progress"
    },
    {
      id: 2,
      title: "NaturalSMP Minecraft Server",
      description: "A custom Minecraft server network with unique gameplay features, custom plugins, and a dedicated community. Supports multiple game modes and events.",
      image: projectPictNaturalSMP,
      technologies: ["Java", "PaperMC", "Docker", "SQLite"],
      link: "https://web.naturalsmp.xyz",
      date: "2023",
      type: "Game Server",
      status: "In Progress"
    },
    {
      id: 3,
      title: "First Portfolio Website",
      description: "My first portfolio website, designed and built from scratch to showcase my early development skills and projects.",
      image: projectPictPortov1,
      technologies: ["HTML", "CSS", "JavaScript"],
      github: "https://github.com/AnakTentara/Portofolio",
      link: "https://v1.haikaldev.my.id",
      date: "2024",
      type: "Web App",
      status: "Completed"
    },
    {
      id: 4,
      title: "NaniKore Group Website",
      description: "A collaborative group website that features various projects and resources for the community.",
      image: projectPictNaniKore,
      technologies: ["React", "TailwindCSS", "Node.js"],
      github: "https://github.com/AnakTentara/NaniKore-Group",
      link: "https://group.haikaldev.my.id",
      date: "2025",
      type: "Web App",
      status: "Active"
    }
  ];

  const videoProjects = [
    {
      id: 11,
      title: "My First Big Project",
      description: "Learned about how to shoot with many actors, balancing complex shots and managing multiple on-screen performances.",
      image: projectPictNaniKore,
      technologies: ["Adobe Premiere Pro", "Multi-Camera Editing", "Directing"],
      youtubeLink: "https://www.youtube.com/watch?v=7ZLEr6J2Spc",
      videoUrl: "https://www.youtube.com/embed/7ZLEr6J2Spc",
      date: "2025",
      isVideoEdit: true,
      status: "Completed"
    },
    {
      id: 12,
      title: "Searching for Backsounds",
      description: "Learned about the magic of backsound selection and how audio choices dramatically impact the emotional tone of visual content.",
      image: projectPictNaturalSMP,
      technologies: ["Audio Editing", "Sound Design", "Music Selection"],
      youtubeLink: "https://www.youtube.com/watch?v=RTUjUz0EX7E",
      videoUrl: "https://www.youtube.com/embed/RTUjUz0EX7E",
      date: "2024",
      isVideoEdit: true,
      status: "Completed"
    },
    {
      id: 13,
      title: "Using Video Editing Techniques",
      description: "Learned advanced editing techniques using Adobe Premiere Pro, including transitions, effects, and dynamic pacing.",
      image: projectPictPortov1,
      technologies: ["Adobe Premiere Pro", "Transitions", "Visual Effects"],
      youtubeLink: "https://www.youtube.com/watch?v=fiwWnCcFbk0",
      videoUrl: "https://www.youtube.com/embed/fiwWnCcFbk0",
      date: "2024",
      isVideoEdit: true,
      status: "Completed"
    },
    {
      id: 14,
      title: "Color Grading and Correction",
      description: "Learned about color grading and correction techniques using Adobe Premiere Pro to enhance visual storytelling.",
      image: projectPictPortov2,
      technologies: ["Adobe Premiere Pro", "Color Grading", "Color Correction"],
      youtubeLink: "https://www.youtube.com/watch?v=eTjX_RZ-Aao",
      videoUrl: "https://www.youtube.com/embed/eTjX_RZ-Aao",
      date: "2023",
      isVideoEdit: true,
      status: "Completed"
    },
    {
      id: 15,
      title: "Video Editing Basics",
      description: "Learned the basics of video editing using Adobe Premiere Pro, establishing a foundation in non-linear editing techniques.",
      image: projectPictNaniKore,
      technologies: ["Adobe Premiere Pro", "Basic Editing"],
      youtubeLink: "https://www.youtube.com/watch?v=XWERBANyAY4",
      videoUrl: "https://www.youtube.com/embed/XWERBANyAY4",
      date: "2022",
      isVideoEdit: true,
      status: "Completed"
    }
  ];

  const archiveVideos = [
    { id: 21, videoUrl: "https://www.youtube.com/embed/IJTM3Y0ot2Y", isShort: true },
    { id: 22, videoUrl: "https://www.youtube.com/embed/F4UAHaXZAHQ", isShort: true },
    { id: 23, videoUrl: "https://www.youtube.com/embed/Ev7alPMQC4w", isShort: true },
    { id: 24, videoUrl: "https://www.youtube.com/embed/kr617AHlz_o", isShort: false },
    { id: 25, videoUrl: "https://www.youtube.com/embed/N1KZ_tRiwdc", isShort: false },
  ];

  return (
    <div className="min-h-screen bg-transparent text-slate-800 dark:text-white pt-24 md:pt-32 pb-16 relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="orb orb-blue w-[450px] h-[450px] -top-20 -left-20 opacity-15" />
        <div className="orb orb-purple w-[400px] h-[400px] bottom-10 right-10 opacity-20" />
      </div>

      <div className="container-portfolio relative z-10 max-w-5xl">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="status-badge">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
              Chronicle
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight" style={{ fontFamily: 'Archivo, sans-serif' }}>
            Project <span className="grad-text">Archive</span>
          </h1>
          <p className="text-slate-650 dark:text-slate-400 text-lg max-w-xl mx-auto leading-relaxed" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            A complete collection of things I've built, showing my progression across software development and video editing.
          </p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isHeaderInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto mt-6 h-[2px] w-20 rounded-full"
            style={{ background: 'linear-gradient(90deg, #3B82F6, #8B5CF6, #EC4899)' }}
          />
        </motion.div>

        {/* Development Projects Section */}
        <motion.section
          ref={devSectionRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isDevSectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2" style={{ fontFamily: 'Archivo, sans-serif' }}>
              Development Projects
            </h2>
            <div className="w-12 h-[2px] bg-primary/30 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                priority={index < 2}
              />
            ))}
          </div>
        </motion.section>

        {/* Video Editing Projects Section */}
        <motion.section
          ref={videoSectionRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isVideoSectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
          id="edit"
        >
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2" style={{ fontFamily: 'Archivo, sans-serif' }}>
              Video Editing Journey
            </h2>
            <div className="w-12 h-[2px] bg-primary/30 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {videoProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </div>

          {/* Minimal Gallery Sub-section */}
          <div className="mt-20">
            <div className="text-center mb-10">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2" style={{ fontFamily: 'Archivo, sans-serif' }}>
                Video Gallery & Shorts
              </h3>
              <div className="w-12 h-[2px] bg-primary/30 mx-auto" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto items-start">
              {archiveVideos.map((video) => (
                <motion.div
                  key={video.id}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="glass-card overflow-hidden border border-slate-200 dark:border-white/5 bg-slate-100/30 dark:bg-slate-950/20"
                >
                  <div className={`w-full relative ${video.isShort ? 'aspect-[9/16]' : 'aspect-video'} bg-black`}>
                    <iframe
                      src={video.videoUrl}
                      className="w-full h-full border-none absolute inset-0"
                      title="Archive Video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Social Channels CTA Buttons */}
          <div className="mt-20 flex flex-wrap justify-center gap-4">
            <motion.a
              href="https://youtube.com/@AnakTentaraIDN"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all shadow-lg text-sm cursor-pointer"
              style={{ background: 'linear-gradient(135deg, #FF0000, #CC0000)', fontFamily: 'Space Grotesk, sans-serif' }}
            >
              <Youtube size={16} />
              YouTube Channel
            </motion.a>

            <motion.a
              href="https://instagram.com/haikal_mabrur"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all shadow-lg text-sm cursor-pointer"
              style={{ background: 'linear-gradient(135deg, #C13584, #E1306C, #FD1D1D)', fontFamily: 'Space Grotesk, sans-serif' }}
            >
              <Instagram size={16} />
              Instagram Profile
            </motion.a>

            <motion.a
              href="https://www.tiktok.com/@shakaaru25"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all shadow-lg text-sm cursor-pointer"
              style={{ background: 'linear-gradient(135deg, #010101, #00f2fe, #fe0979)', fontFamily: 'Space Grotesk, sans-serif' }}
            >
              <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.92-1.88 2.63-5.23 3.73-8.24 2.82-3.14-.95-5.34-4.12-4.99-7.42.3-2.82 2.47-5.24 5.27-5.67.75-.11 1.51-.1 2.26.04v4.07c-.7-.24-1.48-.22-2.14.16-.92.51-1.42 1.59-1.2 2.64.22 1.05 1.22 1.78 2.27 1.64 1.12-.15 1.83-.98 1.83-2.07-.01-5.11-.01-10.22-.01-15.33z"/>
              </svg>
              TikTok Profile
            </motion.a>
          </div>
        </motion.section>

        {/* Navigation Actions */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-4 mt-16"
        >
          <Link to="/">
            <motion.div
              whileHover={{ scale: 1.03, x: -3 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 btn-outline"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              <ArrowLeft size={16} />
              Back to Home
            </motion.div>
          </Link>
          
          <Link to="/downloads">
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 btn-primary"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              <Download size={16} />
              Downloads
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default MoreProjects;