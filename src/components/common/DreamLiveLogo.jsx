import React from 'react';

/**
 * Official DreamLive App Logo Component
 * Uses the exact official DreamLive Queen Crown "D" emblem asset from /public
 */
export const DreamLiveLogo = ({
  size = 42,
  showText = true,
  className = '',
}) => {
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Official Emblem Image from /public */}
      <div
        className="relative flex items-center justify-center rounded-2xl p-[2px] shadow-lg transition-transform duration-300 group-hover:scale-105 overflow-hidden"
        style={{
          width: size,
          height: size,
          background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #f59e0b 100%)',
          boxShadow: '0 0 25px rgba(168, 85, 247, 0.45)',
        }}
      >
        <img
          src="/dreamlive-logo.png"
          alt="DreamLive Official Logo"
          className="w-full h-full object-contain rounded-[14px]"
          style={{
            objectFit: 'cover',
          }}
          onError={(e) => {
            e.currentTarget.src = '/favicon.svg';
          }}
        />
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span className="text-xl sm:text-2xl font-black tracking-tight text-white leading-none font-outfit">
              Dream<span className="text-gradient-neon">Live</span>
            </span>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/40 uppercase tracking-wider">
              Live
            </span>
          </div>
          <span className="hidden 2xl:block text-[10px] text-slate-400 font-medium tracking-wide leading-tight mt-0.5 whitespace-nowrap">
            Top-Class Entertainment
          </span>
        </div>
      )}
    </div>
  );
};

export default DreamLiveLogo;
