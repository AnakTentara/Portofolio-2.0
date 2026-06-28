import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu } from 'lucide-react';

const LoadingPage = ({ progress = 0 }) => {
  // Dynamic status text based on actual loading progress
  const loadingText = progress < 25 
    ? 'Initializing Ground Station...' 
    : progress < 55 
      ? 'Downloading Asset Manifests...' 
      : progress < 85 
        ? 'Compiling Liquid Glass Textures...' 
        : 'Injecting Quantum Interfaces...';

  // Floating ambient space dust
  const ParticleEffect = () => {
    return (
      <>
        {[...Array(20)].map((_, index) => (
          <motion.div
            key={index}
            initial={{ 
              opacity: 0, 
              scale: 0,
              x: Math.random() * window.innerWidth - window.innerWidth / 2,
              y: Math.random() * window.innerHeight - window.innerHeight / 2
            }}
            animate={{
              opacity: [0, 0.4, 0],
              scale: [0, 1.2, 0],
              x: [
                Math.random() * window.innerWidth - window.innerWidth / 2, 
                Math.random() * window.innerWidth - window.innerWidth / 2,
                Math.random() * window.innerWidth - window.innerWidth / 2
              ],
              y: [
                Math.random() * window.innerHeight - window.innerHeight / 2,
                Math.random() * window.innerHeight - window.innerHeight / 2,
                Math.random() * window.innerHeight - window.innerHeight / 2
              ]
            }}
            transition={{
              duration: Math.random() * 5 + 4,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'easeInOut'
            }}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: Math.random() * 3 + 1.5 + 'px',
              height: Math.random() * 3 + 1.5 + 'px',
              background: `rgba(255, 255, 255, ${Math.random() * 0.2 + 0.05})`,
              filter: 'blur(0.5px)'
            }}
          />
        ))}
      </>
    );
  };

  return (
    <motion.div 
      className="fixed inset-0 z-[9999] bg-[#070b13] overflow-hidden flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Space Particles */}
      <div className="absolute inset-0 pointer-events-none">
        <ParticleEffect />
      </div>

      {/* Dynamic Background Blurs */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />

      {/* Loading Widget */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-sm px-6">
        {/* Animated Central Node */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="relative mb-10"
        >
          <motion.div
            animate={{
              boxShadow: [
                "0 0 25px rgba(59, 130, 246, 0.2)",
                "0 0 50px rgba(139, 92, 246, 0.3)",
                "0 0 25px rgba(59, 130, 246, 0.2)"
              ]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 p-[1.5px] relative z-10"
          >
            <div className="w-full h-full rounded-2xl bg-[#080d1a] flex items-center justify-center">
              <motion.div
                animate={{
                  scale: [1, 1.06, 1],
                  rotate: [0, 3, -3, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-primary-400"
              >
                <Cpu size={32} />
              </motion.div>
            </div>
          </motion.div>

          {/* Orbiting Border Glow */}
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              border: '2px dashed rgba(255,255,255,0.05)',
            }}
            animate={{
              rotate: 360
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </motion.div>

        {/* Status Indicators */}
        <div className="text-center w-full mb-8">
          <AnimatePresence mode="wait">
            <motion.h2
              key={loadingText}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="text-base font-bold text-white tracking-wide"
              style={{ fontFamily: 'Archivo, sans-serif' }}
            >
              {loadingText}
            </motion.h2>
          </AnimatePresence>
          <p className="text-xs text-slate-500 mt-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Syncing core stylesheets and graphical textures
          </p>
        </div>

        {/* Glass Progress Bar */}
        <div className="w-full h-[3px] bg-white/5 border border-white/5 rounded-full overflow-hidden relative">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        {/* Numeric Progress display */}
        <p className="mt-3 text-xs font-semibold text-slate-400 font-body tracking-wider" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          {progress}%
        </p>
      </div>
    </motion.div>
  );
};

export default LoadingPage;