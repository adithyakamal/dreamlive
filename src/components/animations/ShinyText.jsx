import React from 'react';

export const ShinyText = ({
  children,
  className = '',
  _shimmerWidth = 100,
  speed = 3,
}) => {
  return (
    <span
      className={`relative inline-block overflow-hidden ${className}`}
      style={{
        maskImage: 'linear-gradient(60deg, black 25%, rgba(0,0,0,0.2) 50%, black 75%)',
        maskSize: '400% 100%',
        WebkitMaskImage: 'linear-gradient(60deg, black 25%, rgba(0,0,0,0.2) 50%, black 75%)',
        WebkitMaskSize: '400% 100%',
        animation: `shimmer-slide ${speed}s infinite linear`,
      }}
    >
      <style>{`
        @keyframes shimmer-slide {
          0% {
            -webkit-mask-position: 100% 0;
            mask-position: 100% 0;
          }
          100% {
            -webkit-mask-position: 0 0;
            mask-position: 0 0;
          }
        }
      `}</style>
      {children}
    </span>
  );
};

export default ShinyText;
