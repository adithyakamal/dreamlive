import React from 'react';
import { motion } from 'framer-motion';

export const BlurText = ({
  text = '',
  className = '',
  delay = 0,
  duration = 0.5,
}) => {
  if (!text) return null;

  return (
    <motion.span
      initial={{ opacity: 1, y: 4 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '600px 0px 200px 0px' }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`inline-block ${className}`}
    >
      {text}
    </motion.span>
  );
};

export default React.memo(BlurText);
