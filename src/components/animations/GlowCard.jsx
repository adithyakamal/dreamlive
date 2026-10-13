import React, { useRef, useState } from 'react';

/**
 * GlowCard — Premium card wrapper with animated border glow that follows the mouse cursor.
 * (High-Performance Edition: Zero React state updates on mousemove)
 */
export const GlowCard = ({
  children,
  className = '',
  glowColor = 'rgba(139, 92, 246, 0.4)',
  glowSize = 200,
  borderRadius = '24px',
  ...props
}) => {
  const cardRef = useRef(null);
  const glowRef = useRef(null);
  const borderGlowRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (glowRef.current) {
      glowRef.current.style.background = `radial-gradient(${glowSize}px circle at ${x}px ${y}px, ${glowColor}, transparent 60%)`;
    }
    if (borderGlowRef.current) {
      borderGlowRef.current.style.background = `radial-gradient(${glowSize * 0.8}px circle at ${x}px ${y}px, ${glowColor}, transparent 50%)`;
    }
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
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
      style={{ borderRadius }}
      {...props}
    >
      {/* Glow overlay that follows cursor */}
      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(${glowSize}px circle at 50% 50%, ${glowColor}, transparent 60%)`,
        }}
      />

      {/* Border glow overlay */}
      <div
        ref={borderGlowRef}
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          borderRadius,
          border: `1px solid transparent`,
          background: `radial-gradient(${glowSize * 0.8}px circle at 50% 50%, ${glowColor}, transparent 50%)`,
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'xor',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          padding: '1px',
        }}
      />

      {/* Card content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default React.memo(GlowCard);
