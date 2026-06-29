import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mouse, ArrowUp } from 'lucide-react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-[99] flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-white/10 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200/50 dark:border-white/10 text-slate-800 dark:text-white shadow-xl hover:bg-primary/20 dark:hover:bg-primary/20 hover:border-primary/50 transition-all cursor-pointer group"
          aria-label="Scroll to top"
        >
          <ArrowUp size={16} className="group-hover:-translate-y-0.5 transition-transform duration-200" />
          <Mouse size={14} className="text-slate-500 dark:text-slate-400" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
