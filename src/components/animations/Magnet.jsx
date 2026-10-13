import React, { useRef } from 'react';
import { motion, useSpring } from 'framer-motion';

/**
 * Magnet — React Bits Component (High-Performance Edition)
 * Smooth spring-physics magnetic cursor pull on hover with zero React state re-renders.
 */
export const Magnet = ({
  children,
  className = '',
  strength = 20,
  active = true,
}) => {
  const ref = useRef(null);
  const springConfig = { damping: 15, stiffness: 180, mass: 0.1 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseMove = (e) => {
    if (!active || !ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    if (width === 0 || height === 0) return;
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    x.set((distanceX / (width / 2)) * strength);
    y.set((distanceY / (height / 2)) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default React.memo(Magnet);
