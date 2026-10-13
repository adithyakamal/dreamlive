import React from 'react';
import { motion } from 'framer-motion';

/**
 * FadeContent — React Bits Component (High-Performance Edition)
 * Hardware-accelerated in-view content fade and vertical drift.
 */
export const FadeContent = ({
  children,
  blur = false,
  duration = 0.6,
  delay = 0,
  distance = 18,
  className = '',
  threshold = 0.1,
}) => {
  return (
    <motion.div
      initial={{
        opacity: 1,
        y: 6,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{ once: true, margin: '600px 0px 200px 0px' }}
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

export default React.memo(FadeContent);
