import React from 'react';
import { motion } from 'framer-motion';

export const SectionReveal = ({
  children,
  className = '',
  delay = 0,
  duration = 0.7,
  yOffset = 35,
}) => {
  return (
    <motion.div
      initial={{ opacity: 1, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '250px 0px 100px 0px' }}
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

export default SectionReveal;
