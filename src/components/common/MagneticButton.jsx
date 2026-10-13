import React, { useRef } from 'react';
import { motion, useSpring } from 'framer-motion';

export const MagneticButton = ({
  children,
  className = '',
  strength = 0.35,
  onClick,
  as = 'button',
  href,
  target,
  rel,
  ...props
}) => {
  const ref = useRef(null);

  const springConfig = { damping: 15, stiffness: 180, mass: 0.1 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * strength);
    y.set(middleY * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Component = motion[as] || motion.button;

  return (
    <Component
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      href={href}
      target={target}
      rel={rel}
      style={{ x, y }}
      className={`relative inline-flex items-center justify-center cursor-pointer will-change-transform ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

export default MagneticButton;
