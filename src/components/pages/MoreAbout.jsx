import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { FaHome, FaDownload, FaCode, FaGamepad, FaServer, FaLaptopCode, FaUserGraduate } from 'react-icons/fa';

const MoreAbout = () => {
  const [titleHover, setTitleHover] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  // Card variants with subtle animations
  const cardVariants = {
    initial: {
      scale: 1,
      rotate: 0,
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
    },
    hover: {
      scale: 1.03,
      rotate: 0.5,
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
    },
    tap: {
      scale: 0.98,
      rotate: -1,
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    },
  }

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // Skills data with icons and categories
  const skills = [
    { 
      category: "Web Development",
      icon: FaCode,
      items: ["React", "JavaScript", "HTML/CSS", "TailwindCSS"]
    },
    {
      category: "Programming",
      icon: FaLaptopCode,
      items: ["C++", "C#", "Python", "NodeJS", "JavaScript", "Java"]
    },
    {
      category: "Other Skills",
      icon: FaServer,
      items: ["Music Production", "Video Editing", "Gaming", "Designing", "Photography", "Videography"]
    }
  ];

  // PC Specs with better categorization
  const pcSpecs = [
    { title: "Intel Core i5 760", subtitle: "CPU", icon: "🔥" },
    { title: "16GB DDR3", subtitle: "RAM", icon: "⚡" },
    { title: "GT 220", subtitle: "GPU/VGA", icon: "🎮" },
    { title: "GA-H55M-UDH2", subtitle: "Motherboard", icon: "🔌" },
    { title: "1.5TB", subtitle: "Storage", icon: "💾" },
    { title: "Windows 10", subtitle: "OS", icon: "🖥️" },
  ];
  
/*  // Education/Experience timeline data
  const timeline = [
    {
      year: "2020",
      title: "Started Coding",
      description: "Built my first website using HTML and CSS"
    },
    {
      year: "2021",
      title: "First JavaScript Project",
      description: "Created interactive web applications with vanilla JS"
    },
    {
      year: "2022",
      title: "React Development",
      description: "Learned React and built several portfolio projects"
    },
    {
      year: "Present",
      title: "Full Stack Development",
      description: "Working on full-stack applications with React and Node.js"
    }
  ];
*/
  return (
    <div 
      id="more-about" 
      ref={sectionRef}
      className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-[#060814] dark:to-[#090d1a] text-slate-800 dark:text-white overflow-hidden transition-colors duration-500"
    >
      {/* Animated background particles */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-20 -left-20 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl"></div>
        <div className="absolute bottom-40 -right-20 w-96 h-96 rounded-full bg-purple-500/10 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-b from-transparent to-slate-50/20 dark:to-black/80 z-0"></div>
      </div>

      <div className="relative z-10 pt-24 pb-16 container mx-auto px-4">
        {/* Hero header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <motion.h1 
            whileHover={{ scale: 1.03 }}
            className="text-5xl md:text-6xl font-bold mb-6 relative inline-block"
          >
            <span className="bg-gradient-to-r from-blue-400 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              About Haikal Mabrur
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            A teenage developer with a passion for creating digital experiences
          </motion.p>
        </motion.div>

        {/* Background section */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-20"
        >
          <div className="max-w-4xl mx-auto">
            <div className="glass-card p-8 hover:border-[var(--glass-card-border)]">
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 text-blue-400 mr-4">
                  <FaUserGraduate size={24} />
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent">Background</h2>
              </div>
              
              <div className="text-slate-600 dark:text-slate-350 space-y-4">
                <p>
                  I'm a passionate technology enthusiast from Indonesia, born in 2008.
                  My journey in tech started with gaming and gradually evolved into software development.
                </p>
                <p>
                  What started as curiosity has become a passion for building websites, 
                  applications, and solving problems through code. I'm constantly learning 
                  new technologies and improving my skills.
                </p>
                <p>
                  When I'm not coding, you can find me exploring new technologies, playing video games,
                  or collaborating with other developers on interesting projects.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Skills section */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delay: 0.2 }}
          className="mb-20"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold inline-block relative">
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Skills & Expertise
              </span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {skills.map((skillGroup, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                className="glass-card overflow-hidden hover:border-[var(--glass-card-border)]"
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 text-blue-400 mr-3">
                      <skillGroup.icon size={20} />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{skillGroup.category}</h3>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    {skillGroup.items.map((skill, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1 bg-slate-100 dark:bg-white/10 border border-slate-200/50 dark:border-none rounded-full text-sm text-slate-600 dark:text-gray-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* PC Specs Section */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delay: 0.4 }}
          className="mb-20"
        >
          <div className="text-center mb-10">
            <motion.h2
              onMouseEnter={() => setTitleHover(true)}
              onMouseLeave={() => setTitleHover(false)}
              className="text-3xl font-bold inline-block relative"
            >
              <strong className='font-bold bg-gradient-to-r from-blue-400 via-purple-600 to-pink-500 bg-clip-text text-transparent'>
                PC Specification
              </strong>
              
              <AnimatePresence>
                {titleHover && (
                  <motion.span
                    key="emoji"
                    initial={{ opacity: 0, x: 10, scale: 0.5 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 10, scale: 0.5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="absolute inline-block ml-2"
                  >
                    🖥️
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pcSpecs.map((spec, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                className="glass-card overflow-hidden hover:border-[var(--glass-card-border)]"
              >
                <div className="relative overflow-hidden p-6">
                  {/* Background glow effect */}
                  <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-blue-500/10 blur-xl"></div>
                  
                  <div className="flex items-center">
                    <div className="text-3xl mr-3">{spec.icon}</div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">{spec.title}</h3>
                      <p className="text-primary-650 dark:text-primary-300">{spec.subtitle}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Action buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-6 mt-16"
        >
          <Link to="/">
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="btn-outline flex items-center px-8 py-3 cursor-pointer shadow-sm"
            >
              <FaHome className="mr-2" />
              Back to Home
            </motion.div>
          </Link>
          
          <Link to="/downloads">
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary flex items-center px-8 py-3 cursor-pointer shadow-lg"
            >
              <FaDownload className="mr-2" />
              Downloads
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default MoreAbout;

/*
        {// Timeline Section }
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delay: 0.3 }}
          className="mb-20"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold inline-block relative">
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                My Journey
              </span>
            </h2>
          </div>
          
          <div className="max-w-3xl mx-auto relative">
            {// Timeline line }
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-pink-500/50 rounded-full"></div>
            
            {timeline.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className={`flex items-center mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <div 
                    className={`bg-gradient-to-br from-gray-800/70 to-gray-900/70 backdrop-blur-md rounded-xl p-6 border border-gray-700/30 shadow-lg`}
                  >
                    <h3 className="text-xl font-bold text-blue-400">{item.title}</h3>
                    <p className="text-sm text-gray-400 mb-2">{item.year}</p>
                    <p className="text-gray-300">{item.description}</p>
                  </div>
                </div>
                
                <div className="z-10 flex items-center justify-center">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ delay: 0.4 + index * 0.1, type: "spring" }}
                    className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center shadow-lg border-2 border-gray-900"
                  >
                    <span className="text-white font-bold">{index + 1}</span>
                  </motion.div>
                </div>
                
                <div className={`w-1/2 ${index % 2 === 0 ? 'pl-8 text-left' : 'pr-8 text-right'}`}></div>
              </motion.div>
            ))}
          </div>
        </motion.section>
        */