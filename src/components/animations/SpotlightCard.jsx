import React, { useRef, useState } from 'react';

export const SpotlightCard = ({
  children,
  className = '',
  spotlightColor = 'rgba(168, 85, 247, 0.25)',
  spotlightSize = 350,
  onClick,
}) => {
  const divRef = useRef(null);
  const spotRef = useRef(null);
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    const div = divRef.current;
    const spot = spotRef.current;
    if (!div || !spot) return;
    const rect = div.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    spot.style.background = `radial-gradient(${spotlightSize}px circle at ${x}px ${y}px, ${spotlightColor}, transparent 80%)`;
  };

  const handleMouseEnter = (e) => {
    setOpacity(1);
    handleMouseMove(e);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        ref={spotRef}
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 rounded-[inherit]"
        style={{
          opacity,
          background: `radial-gradient(${spotlightSize}px circle at 50% 50%, ${spotlightColor}, transparent 80%)`,
        }}
      />
      {children}
    </div>
  );
};

export default React.memo(SpotlightCard);
