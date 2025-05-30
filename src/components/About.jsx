import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaCode, FaServer, FaRobot, FaGraduationCap, FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';
import profileLogo from '../../images/icon.png';

const About = () => {
  const [titleHover, setTitleHover] = useState(false);
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  
  const isHeadingInView = useInView(headingRef, { once: false, amount: 0.8 });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);
  
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 });
  
  // Hover animation variant
  const cardVariants = {
    initial: {
      scale: 1,
      rotate: 0,
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
    },
    hover: {
      scale: 1.02,
      rotate: 0,
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
    },
    tap: {
      scale: 0.98,
      rotate: 0,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
  };

  // Skills data
  const skills = [
    { icon: FaCode, title: "Web Development", description: "Building modern responsive websites with React, Tailwind, and more" },
    { icon: FaServer, title: "Server Management", description: "Setting up and managing servers for various applications" },
    { icon: FaRobot, title: "Bot Development", description: "Creating automation bots for Discord, WhatsApp and other platforms" },
    { icon: FaGraduationCap, title: "Minecraft Plugin Maker", description: "Creating custom plugins for Minecraft servers using Java" },
  ];

  // Languages
  const languages = [
    { title: "Indonesia", subtitle: "Native", level: 100 },
    { title: "English", subtitle: "Fluent", level: 85 },
    { title: "JavaScript", subtitle: "Advanced", level: 90 },
    { title: "C++/C#", subtitle: "Normal", level: 70 },
    { title: "Java", subtitle: "Beginner", level: 60 }
  ];

  // Container animation variant
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Item animation variant
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.section
      ref={sectionRef}
      id="about"
      className="py-20 bg-transparent relative scroll-mt-10"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
          <motion.div
        className="container mx-auto px-4 max-w-6xl"
        style={{
          y: smoothY,
          scale: smoothScale,
          opacity
        }}
      >
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <div 
            ref={headingRef} 
            className="w-full max-w-3xl mx-auto px-4 flex flex-col items-center py-10 relative"
          >
            {/* Visual center guide - left */}
            <div className="hidden md:block absolute left-0 top-1/2 transform -translate-y-1/2 w-[5%] h-[1px] bg-gradient-to-r from-transparent to-blue-500/50"></div>
            
            {/* Content */}
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={isHeadingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold text-center w-full"
            >
              <strong className='font-bold bg-gradient-to-r from-blue-400 via-purple-600 to-pink-500 bg-clip-text text-transparent uppercase tracking-wider'>About Me</strong>
            </motion.h2>

            <motion.div 
              className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full my-6"
              initial={{ width: 0 }}
              animate={isHeadingInView ? { width: 96 } : { width: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            />

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={isHeadingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-gray-300 text-lg text-center max-w-2xl"
            >
              A passionate teenage developer exploring technology and creating digital solutions.
            </motion.p>
            
            {/* Visual center guide - right */}
            <div className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 w-[5%] h-[1px] bg-gradient-to-l from-transparent to-purple-500/50"></div>
          </div>
        </motion.div>

        {/* Main content: Bio + Photo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          {/* Bio Section */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-8 backdrop-blur-sm border border-white/5">
              <h3 className="text-3xl font-bold text-white mb-4">
                  <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    Who am I?
                  </span>
                </h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                  I'm Haikal, a passionate teenage developer from Indonesia. At 15 years old, 
                  I've already explored various aspects of technology and software development.
                </p>
            </div>
            
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl p-8 backdrop-blur-sm border border-white/5">
              <h3 className="text-3xl font-bold text-white mb-4">
                  <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                    My Journey
                  </span>
                </h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                  My coding journey started with simple HTML websites, but I quickly expanded my skills to include JavaScript, React, and backend technologies. I enjoy learning new technologies and frameworks, and I'm constantly working on personal projects to improve my skills.
                </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
                {["React", "JavaScript", "Node.js", "TailwindCSS", "Discord.js", "Java"].map((skill, index) => (
                  <motion.div
                    key={index}
                  variants={itemVariants}
                  className="bg-white/10 backdrop-blur-sm px-5 py-2.5 rounded-full text-white text-sm border border-white/5 hover:bg-white/20 transition-colors"
                  >
                    {skill}
                  </motion.div>
                ))}
            </div>
          </motion.div>
          
          {/* Card with glowing border */}
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              whileTap="tap"
            className="relative rounded-2xl overflow-hidden h-full"
            >
              {/* Glowing border effect */}
              <motion.div 
              className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-30"
                animate={{ 
                opacity: [0.2, 0.4, 0.2],
                rotate: [0, 2, 0],
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity,
                  repeatType: "reverse" 
                }}
              />
              
            <div className="p-1 relative z-10 rounded-2xl h-full">
              <div className="bg-gray-900/90 p-8 rounded-xl h-full backdrop-blur-sm">
                  <div className="flex flex-col space-y-8">
                  <motion.div className="flex items-start space-x-4" variants={itemVariants}>
                    <div className="p-4 rounded-xl bg-blue-500/20 text-blue-400 shrink-0">
                      <FaGraduationCap size={28} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">MAN 1 Muara Enim</h3>
                        <p className="text-gray-300">Islamic Senior High School Number 1 at Muara Enim, South Sumatera, Indonesia</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-blue-500/10 rounded-lg text-blue-300 text-sm">Science Major</span>
                        <span className="px-3 py-1 bg-purple-500/10 rounded-lg text-purple-300 text-sm">2024 - 2027</span>
                      </div>
                      </div>
                    </motion.div>
                    
                  <motion.div className="flex items-start space-x-4" variants={itemVariants}>
                    <div className="p-4 rounded-xl bg-purple-500/20 text-purple-400 shrink-0">
                      <FaEnvelope size={28} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">Contact</h3>
                      <p className="text-gray-300 mb-2">Want to connect? Feel free to reach out!</p>
                      <p className="font-bold text-xl bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-3">
                          me@haikaldev.my.id
                        </p>
                      <div className="flex items-center gap-4">
                        <a href="https://github.com/AnakTentara" target="_blank" rel="noopener noreferrer"
                           className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 transition-colors">
                          <FaGithub size={20} />
                          <span>GitHub</span>
                        </a>
                        <a href="https://linkedin.com/in/haikal-mabrur" target="_blank" rel="noopener noreferrer"
                           className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 transition-colors">
                          <FaLinkedin size={20} />
                          <span>LinkedIn</span>
                        </a>
                      </div>
                      </div>
                    </motion.div>
                    
                  <motion.div variants={itemVariants} className="pt-4">
                    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-6 border border-white/5">
                      <h3 className="text-lg font-semibold text-white mb-3">Quick Facts</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <p className="text-gray-400 text-sm">Location</p>
                          <p className="text-white">Muara Enim, ID</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-gray-400 text-sm">Age</p>
                          <p className="text-white">17 years old</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-gray-400 text-sm">Experience</p>
                          <p className="text-white">5+ years</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-gray-400 text-sm">Projects</p>
                          <p className="text-white">15+ completed</p>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-white/5">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <p className="text-gray-400 text-sm">Current Focus</p>
                            <p className="text-white">Academic School</p>
                          </div>
                          <div className="flex gap-2">
                            <span className="px-3 py-1 bg-blue-500/10 rounded-lg text-blue-300 text-sm">Science</span>
                            <span className="px-3 py-1 bg-purple-500/10 rounded-lg text-purple-300 text-sm">Informatics</span>
                          </div>
                        </div>
                      </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
        </div>

        {/* Skills Section */}
        <motion.div variants={itemVariants} className="mb-20">
          <h3 className="text-3xl font-bold text-white mb-10 text-center">
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                My Skills
              </span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover="hover"
                  whileTap="tap"
                className="group p-6 rounded-xl cursor-pointer bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-white/5 hover:border-white/10 transition-colors"
                >
                  <div className="flex flex-col items-center text-center">
                  <div className="p-4 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 mb-4 group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-colors">
                    <skill.icon className="text-2xl text-white" size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{skill.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{skill.description}</p>
                  </div>
                </motion.div>
              ))}
          </div>
        </motion.div>

        {/* Languages Section */}
        <motion.div variants={itemVariants} className="mb-16">
          <h3 className="text-3xl font-bold text-white mb-10 text-center">
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Languages & Skills
              </span>
            </h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {languages.map((lang, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                whileHover="hover"
                  whileTap="tap"
                className="p-6 rounded-xl bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-white/5 hover:border-white/10 transition-colors"
                >
                <h3 className="font-bold text-xl text-white mb-2">
                    {lang.title}
                  </h3>
                <p className="text-gray-400 mb-3">
                    {lang.subtitle}
                  </p>
                <div className="w-full bg-gray-700/30 rounded-full h-2">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${lang.level}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                </div>
                </motion.div>
              ))}
          </div>
        </motion.div>

        {/* More About Me Button */}
        <motion.div 
          variants={itemVariants}
          className="mt-12 flex justify-center md:justify-end"
        >
          <motion.div 
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            <Link 
              to="/more-about"
              className="group inline-flex items-center justify-center 
              bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl
              transition duration-300 transform hover:shadow-lg"
            >
              <span className="mr-2">More About Me</span>
              <motion.span
                animate={{
                  x: [0, 5, 0],
                  transition: {
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "easeInOut"
                  }
                }}
              >
                <FaArrowRight className="transition-transform group-hover:translate-x-1" />
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default About;