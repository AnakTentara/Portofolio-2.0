import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

const CustomCursor = () => {
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
  const [cursorState, setCursorState] = useState('hidden'); // 'hidden' | 'mouse' | 'touch' | 'fading'
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Mouse / touch position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for trailing effect (mouse only)
  const springConfig = { damping: 40, stiffness: 400, mass: 0.4 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // Touch ring position (no spring — instant for touch)
  const touchX = useMotionValue(-100);
  const touchY = useMotionValue(-100);

  // Fade-out timer ref for touch
  const touchFadeTimer = useRef(null);

  useEffect(() => {
    const hasTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    setIsTouchDevice(hasTouch);

    // ──────────── MOUSE HANDLERS ────────────
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setCursorState('mouse');
    };

    const handleMouseLeave = () => setCursorState('hidden');
    const handleMouseEnter = () => setCursorState('mouse');

    const handleMouseOver = (e) => {
      const target = e.target;
      const isClickable =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.cursor-pointer') ||
        window.getComputedStyle(target).cursor === 'pointer';
      setIsHoveringClickable(!!isClickable);
    };

    // ──────────── TOUCH HANDLERS ────────────
    const handleTouchStart = (e) => {
      clearTimeout(touchFadeTimer.current);
      const touch = e.touches[0];
      touchX.set(touch.clientX);
      touchY.set(touch.clientY);
      setCursorState('touch');
    };

    const handleTouchMove = (e) => {
      clearTimeout(touchFadeTimer.current);
      const touch = e.touches[0];
      touchX.set(touch.clientX);
      touchY.set(touch.clientY);
      setCursorState('touch');
    };

    const handleTouchEnd = () => {
      // Start fade-out after finger lifts
      setCursorState('fading');
      touchFadeTimer.current = setTimeout(() => {
        setCursorState('hidden');
      }, 600);
    };

    // Register all listeners
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('touchcancel', handleTouchEnd, { passive: true });

    return () => {
      clearTimeout(touchFadeTimer.current);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, [mouseX, mouseY, touchX, touchY]);

  // ──────────── MOUSE CURSOR ────────────
  const isMouseVisible = cursorState === 'mouse';

  // ──────────── TOUCH CURSOR ────────────
  const isTouchVisible = false; // Disabled touch cursor to prevent mobile lag
  const touchOpacity = cursorState === 'fading' ? 0 : 1;

  return (
    <>
      {/* ── Mouse: Sleek center dot ── */}
      <AnimatePresence>
        {isMouseVisible && (
          <motion.div
            key="mouse-dot"
            className="fixed top-0 left-0 w-2 h-2 rounded-full bg-white z-[9999] pointer-events-none mix-blend-difference"
            style={{
              x: mouseX,
              y: mouseY,
              translateX: '-50%',
              translateY: '-50%',
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.15 }}
          />
        )}
      </AnimatePresence>

      {/* ── Mouse: Outer glare ring ── */}
      <AnimatePresence>
        {isMouseVisible && (
          <motion.div
            key="mouse-ring"
            className="fixed top-0 left-0 rounded-full border border-white/30 z-[9998] pointer-events-none"
            style={{
              x: cursorX,
              y: cursorY,
              translateX: '-50%',
              translateY: '-50%',
              width: isHoveringClickable ? 44 : 24,
              height: isHoveringClickable ? 44 : 24,
              background: isHoveringClickable ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
              backdropFilter: isHoveringClickable ? 'blur(4px)' : 'none',
              borderColor: isHoveringClickable ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.25)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 25 }}
          />
        )}
      </AnimatePresence>

      {/* ── Touch: Ripple cursor dot ── */}
      <AnimatePresence>
        {isTouchVisible && (
          <motion.div
            key="touch-cursor"
            className="fixed top-0 left-0 pointer-events-none z-[9999]"
            style={{
              x: touchX,
              y: touchY,
              translateX: '-50%',
              translateY: '-50%',
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: touchOpacity, scale: 1 }}
            exit={{ opacity: 0, scale: 0.3 }}
            transition={{ duration: cursorState === 'fading' ? 0.5 : 0.15, ease: 'easeOut' }}
          >
            {/* Inner dot */}
            <div className="w-3 h-3 rounded-full bg-white/80 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            {/* Outer ring */}
            <motion.div
              className="w-10 h-10 rounded-full border border-white/30 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                background: 'rgba(59,130,246,0.08)',
                backdropFilter: 'blur(4px)',
              }}
              animate={cursorState === 'touch' ? { scale: [1, 1.2, 1] } : { scale: 0.8 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CustomCursor;
