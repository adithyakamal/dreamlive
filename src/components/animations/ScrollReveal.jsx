import React from 'react';
import { motion } from 'framer-motion';

/**
 * ScrollReveal — React Bits Component (High-Performance Edition)
 * Hardware-accelerated scroll-triggered progressive reveal.
 */
export const ScrollReveal = ({
  children,
  className = '',
  delay = 0,
  duration = 0.6,
  direction = 'up', // 'up' | 'down' | 'left' | 'right'
  distance = 25,
  blur = false,
  scale = false,
  once = true,
}) => {
  const getInitialOffset = () => {
    switch (direction) {
      case 'down':
        return { y: -distance, x: 0 };
      case 'left':
        return { y: 0, x: distance };
      case 'right':
        return { y: 0, x: -distance };
      case 'up':
      default:
        return { y: distance, x: 0 };
    }
  };

  const offset = getInitialOffset();

  return (
    <motion.div
      initial={{
        opacity: 1,
        x: 0,
        y: offset.y !== 0 ? Math.sign(offset.y) * 8 : 0,
        scale: 1,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
      }}
      viewport={{ once, margin: '600px 0px 200px 0px' }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default React.memo(ScrollReveal);
