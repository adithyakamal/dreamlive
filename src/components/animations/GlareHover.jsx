import React, { useRef, useState } from 'react';

/**
 * GlareHover — React Bits Component (High-Performance Edition)
 * Interactive glass shine/glare that follows cursor across cards/images
 * with ZERO React component re-renders during mouse movement.
 */
export const GlareHover = ({
  children,
  className = '',
  glareColor = 'rgba(255, 255, 255, 0.25)',
  glareSize = 250,
  borderRadius = '24px',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);
  const glareRef = useRef(null);

  const handleMouseMove = (e) => {
    const container = containerRef.current;
    const glare = glareRef.current;
    if (!container || !glare) return;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glare.style.background = `radial-gradient(${glareSize}px circle at ${x}px ${y}px, ${glareColor}, transparent 70%)`;
  };

  const handleMouseEnter = (e) => {
    setIsHovered(true);
    handleMouseMove(e);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
      style={{ borderRadius }}
    >
      {/* Glare spotlight layer (zero re-render) */}
      <div
        ref={glareRef}
        className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(${glareSize}px circle at 50% 50%, ${glareColor}, transparent 70%)`,
        }}
      />
      {children}
    </div>
  );
};

export default React.memo(GlareHover);
