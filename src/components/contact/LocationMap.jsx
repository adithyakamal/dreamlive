import React from 'react';
import { MapPin, Navigation, Clock, Building } from 'lucide-react';
import { COMPANY_INFO } from '../../data/dreamLiveContent';

export const LocationMap = () => {
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    COMPANY_INFO.address
  )}`;

  return (
    <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-white/10 flex flex-col justify-between space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-xs font-bold uppercase tracking-wider">
            <Building className="w-3.5 h-3.5" />
            Corporate Headquarters
          </div>
          <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Active Operations
          </span>
        </div>

        <h3 className="text-xl font-bold text-white">
          {COMPANY_INFO.name}
        </h3>

        <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-3 text-xs sm:text-sm">
          <div className="flex items-start gap-2.5 text-slate-300">
            <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-1" />
            <span>{COMPANY_INFO.address}</span>
          </div>

          <div className="flex items-center gap-2.5 text-slate-400 pt-2 border-t border-white/5">
            <Clock className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              Visiting Hours: Mon–Fri {COMPANY_INFO.hours.weekday}
            </span>
          </div>
        </div>

        {/* Stylized Simulated Map Preview Box */}
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-white/15 bg-slate-900 flex items-center justify-center group">
          {/* Visual stylized city map grid */}
          <div 
            className="absolute inset-0 opacity-40 group-hover:scale-105 transition-transform duration-500" 
            style={{
              backgroundImage: 'radial-gradient(#8b5cf6 1.5px, transparent 1.5px), radial-gradient(#ec4899 1.5px, #0f111c 1.5px)',
              backgroundSize: '24px 24px',
              backgroundPosition: '0 0, 12px 12px'
            }}
          />

          <div className="relative z-10 flex flex-col items-center text-center p-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-fuchsia-600 to-violet-600 text-white flex items-center justify-center shadow-xl shadow-fuchsia-600/50 animate-bounce">
              <MapPin className="w-6 h-6" />
            </div>
            <span className="mt-2 text-xs font-bold text-white bg-slate-950/80 px-3 py-1 rounded-full border border-white/20">
              Vihav Supremus, Vadodara
            </span>
          </div>
        </div>
      </div>

      <a
        href={mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full inline-flex items-center justify-center font-medium rounded-full text-sm px-6 py-3 gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
      >
        <Navigation className="w-4 h-4" />
        Open Live Google Maps Navigation
      </a>
    </div>
  );
};
export default LocationMap;
