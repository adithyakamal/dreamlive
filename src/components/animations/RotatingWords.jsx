import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const RotatingWords = ({
  words = [],
  interval = 2800,
  className = '',
  badgeClassName = 'bg-gradient-to-r from-violet-600/30 to-fuchsia-600/30 border border-fuchsia-500/40 text-fuchsia-300',
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!words.length) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [words, interval]);

  if (!words.length) return null;

  return (
    <span className={`inline-flex items-center relative overflow-hidden py-1 px-3.5 rounded-xl ${badgeClassName} ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: 24, opacity: 0, filter: 'blur(6px)', rotateX: -60 }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)', rotateX: 0 }}
          exit={{ y: -24, opacity: 0, filter: 'blur(6px)', rotateX: 60 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block font-extrabold whitespace-nowrap"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

export default RotatingWords;
