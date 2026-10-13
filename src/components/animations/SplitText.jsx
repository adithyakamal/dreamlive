import React from 'react';
import { motion } from 'framer-motion';

export const SplitText = ({
  text = '',
  className = '',
  delay = 0,
  stagger = 0.03,
  splitBy = 'words', // 'words' or 'characters'
  animation = {
    hidden: { opacity: 0.95, y: 6 },
    visible: { opacity: 1, y: 0 },
  },
}) => {
  if (!text) return null;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const itemVariants = {
    hidden: animation.hidden || { opacity: 1, y: 4 },
    visible: {
      ...(animation.visible || { opacity: 1, y: 0 }),
      transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const items = splitBy === 'characters' ? text.split('') : text.split(' ');

  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '600px 0px 200px 0px' }}
      variants={containerVariants}
      className={`inline-block ${className}`}
      style={{
        background: 'inherit',
        WebkitBackgroundClip: 'inherit',
        WebkitTextFillColor: 'inherit',
      }}
    >
      {items.map((item, index) => (
        <motion.span
          key={index}
          variants={itemVariants}
          className="inline-block mr-[0.25em]"
          style={{
            background: 'inherit',
            WebkitBackgroundClip: 'inherit',
            WebkitTextFillColor: 'inherit',
          }}
        >
          {item === ' ' ? '\u00A0' : item}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default React.memo(SplitText);
