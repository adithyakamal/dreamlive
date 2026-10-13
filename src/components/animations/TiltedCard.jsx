import React, { useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export const TiltedCard = ({
  children,
  className = '',
  containerClassName = '',
  maxTilt = 12,
  glareOpacity = 0.25,
  scale = 1.02,
  perspective = 1000,
  onClick,
}) => {
  const cardRef = useRef(null);
  const glareRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);
  const scaleSpring = useSpring(1, springConfig);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    if (width === 0 || height === 0) return;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = (mouseX / width - 0.5) * 2;
    const yPct = (mouseY / height - 0.5) * 2;

    rotateX.set(-yPct * maxTilt);
    rotateY.set(xPct * maxTilt);

    if (glareRef.current) {
      const gx = (mouseX / width) * 100;
      const gy = (mouseY / height) * 100;
      glareRef.current.style.background = `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 65%)`;
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    scaleSpring.set(scale);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
    scaleSpring.set(1);
  };

  return (
    <div
      style={{ perspective: `${perspective}px` }}
      className={`relative ${containerClassName}`}
      onClick={onClick}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          scale: scaleSpring,
          transformStyle: 'preserve-3d',
        }}
        className={`relative overflow-hidden transition-shadow duration-300 will-change-transform ${className}`}
      >
        {children}

        {/* Dynamic glare highlight overlay (zero React re-render) */}
        <div
          ref={glareRef}
          className="pointer-events-none absolute inset-0 transition-opacity duration-300 rounded-[inherit]"
          style={{
            opacity: isHovered ? glareOpacity : 0,
            background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 65%)',
          }}
        />
      </motion.div>
    </div>
  );
};

export default React.memo(TiltedCard);
