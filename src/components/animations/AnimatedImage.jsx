import React from 'react';
import { motion } from 'framer-motion';

/**
 * AnimatedImage — React Bits Component (High-Performance Edition)
 * Smooth scroll-triggered reveal with hardware-accelerated scale, opacity and hover zoom.
 */
export const AnimatedImage = ({
  src,
  alt = '',
  className = '',
  containerClassName = '',
  zoomOnHover = true,
  overlay = false,
  overlayGradient = 'from-slate-950/80 via-transparent to-transparent',
  delay = 0,
  duration = 0.6,
}) => {
  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        initial={{
          opacity: 1,
          scale: 1.01,
          y: 2,
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        viewport={{ once: true, margin: '600px 0px 200px 0px' }}
        transition={{
          duration,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
        whileHover={zoomOnHover ? { scale: 1.06 } : undefined}
        className={`w-full h-full object-cover transition-transform duration-500 ease-out ${className}`}
      />
      {overlay && (
        <div
          className={`absolute inset-0 bg-gradient-to-t ${overlayGradient} pointer-events-none z-10`}
        />
      )}
    </div>
  );
};

export default React.memo(AnimatedImage);
