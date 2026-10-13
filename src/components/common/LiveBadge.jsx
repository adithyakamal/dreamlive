import React from 'react';

export const LiveBadge = ({ viewers, className = '', pulseColor = 'bg-rose-500' }) => {
  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 backdrop-blur-md text-xs font-semibold text-rose-300 tracking-wide select-none ${className}`}
    >
      <span className="relative flex h-2 w-2">
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${pulseColor} opacity-75`}></span>
        <span className={`relative inline-flex rounded-full h-2 w-2 ${pulseColor}`}></span>
      </span>
      <span className="font-bold uppercase text-[10px] text-white">LIVE</span>
      {viewers && (
        <>
          <span className="w-1 h-1 rounded-full bg-rose-400/50"></span>
          <span className="text-[11px] font-medium text-rose-100">{viewers}</span>
        </>
      )}
    </div>
  );
};
export default LiveBadge;
