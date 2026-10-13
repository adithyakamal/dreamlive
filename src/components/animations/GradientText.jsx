import React from 'react';

export const GradientText = ({
  children,
  className = '',
  colors = ['#ffffff', '#f5f3ff', '#e9d5ff', '#c084fc', '#a855f7', '#ffffff'],
  animationSpeed = 6,
  showBorder = false,
}) => {
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${colors.join(', ')})`,
    backgroundSize: '300% 100%',
    animation: `gradient-flow ${animationSpeed}s linear infinite`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    filter: 'drop-shadow(0 2px 12px rgba(0, 0, 0, 0.35))',
  };

  return (
    <span
      className={`relative inline-block ${
        showBorder ? 'p-[1px] rounded-2xl overflow-hidden' : ''
      }`}
      style={showBorder ? gradientStyle : undefined}
    >
      <style>{`
        @keyframes gradient-flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
      <span
        style={gradientStyle}
        className={`bg-clip-text text-transparent inline-block ${className}`}
      >
        {children}
      </span>
    </span>
  );
};

export default GradientText;
