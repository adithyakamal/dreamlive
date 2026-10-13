import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring } from 'framer-motion';

export const CustomCursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouch] = useState(() => typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0));

  const isPointerRef = useRef(false);
  const isVisibleRef = useRef(false);

  const springConfig = { damping: 28, stiffness: 450, mass: 0.2 };
  const cursorX = useSpring(-100, springConfig);
  const cursorY = useSpring(-100, springConfig);

  const trailingConfig = { damping: 20, stiffness: 200, mass: 0.6 };
  const trailX = useSpring(-100, trailingConfig);
  const trailY = useSpring(-100, trailingConfig);

  useEffect(() => {
    if (isTouch) return;

    const handleMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      trailX.set(e.clientX);
      trailY.set(e.clientY);

      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        setIsVisible(true);
      }

      // Safe target element inspection without unnecessary re-renders
      try {
        const target = e.target;
        if (!target || !target.tagName) return;

        const isClickable =
          target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          (typeof target.closest === 'function' && (target.closest('button') || target.closest('a') || target.closest('.cursor-pointer'))) ||
          (typeof target.getAttribute === 'function' && target.getAttribute('role') === 'button') ||
          (target.classList && target.classList.contains && target.classList.contains('cursor-pointer'));

        const clickableBool = !!isClickable;
        if (clickableBool !== isPointerRef.current) {
          isPointerRef.current = clickableBool;
          setIsPointer(clickableBool);
        }
      } catch (err) {
        // Suppress any non-critical cursor check error
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => {
      isVisibleRef.current = false;
      setIsVisible(false);
    };
    const handleMouseEnter = () => {
      isVisibleRef.current = true;
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.body.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    document.body.addEventListener('mouseenter', handleMouseEnter, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY, trailX, trailY, isTouch]);

  if (isTouch || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Outer ambient trailing halo */}
      <motion.div
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isClicking ? 0.75 : isPointer ? 1.8 : 1,
          opacity: isPointer ? 0.85 : 0.4,
          borderColor: isPointer ? 'rgba(236, 72, 153, 0.7)' : 'rgba(168, 85, 247, 0.4)',
        }}
        transition={{ duration: 0.2 }}
        className="w-8 h-8 rounded-full border border-violet-400/40 bg-gradient-to-tr from-violet-600/10 to-fuchsia-600/10 shadow-[0_0_15px_rgba(168,85,247,0.3)]"
      />

      {/* Center sharp dot */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isClicking ? 0.5 : isPointer ? 1.4 : 1,
          backgroundColor: isPointer ? '#f472b6' : '#c084fc',
        }}
        transition={{ duration: 0.15 }}
        className="w-2 h-2 rounded-full shadow-[0_0_8px_#c084fc]"
      />
    </div>
  );
};

export default React.memo(CustomCursor);
