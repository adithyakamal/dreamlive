import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, MessageSquare, Mic, Compass, User, Radio } from 'lucide-react';
import GoLiveModal from './GoLiveModal';
import { useApp } from '../../context/AppContext';

export const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { unreadCount } = useApp();
  const [isGoLiveModalOpen, setIsGoLiveModalOpen] = useState(false);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/' || location.pathname === '/home';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <nav
        aria-label="Mobile Navigation"
        className="fixed bottom-0 left-0 right-0 z-40 w-full max-w-full bg-[#0a0c16]/95 backdrop-blur-2xl border-t border-white/10 shadow-2xl shadow-black/80 px-2 sm:px-6 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom,0.5rem))] box-border"
      >
        {/* Subtle Top Glow Line */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-fuchsia-500/40 to-transparent pointer-events-none" />

        <div className="w-full max-w-md mx-auto flex items-center justify-between relative">
          
          {/* 1. Home Tab */}
          <NavLink
            to="/"
            className={`flex-1 flex flex-col items-center justify-center py-1 rounded-xl transition-all ${
              isActive('/')
                ? 'text-fuchsia-400 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Home className={`w-5 h-5 transition-transform ${isActive('/') ? 'scale-110' : ''}`} />
            <span className="text-[10px] sm:text-xs mt-1">Home</span>
          </NavLink>

          {/* 2. Messages Tab */}
          <NavLink
            to="/messages"
            className={`flex-1 flex flex-col items-center justify-center py-1 rounded-xl transition-all relative ${
              isActive('/messages')
                ? 'text-fuchsia-400 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <div className="relative">
              <MessageSquare className={`w-5 h-5 transition-transform ${isActive('/messages') ? 'scale-110' : ''}`} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-[#0a0c16]" />
              )}
            </div>
            <span className="text-[10px] sm:text-xs mt-1">Messages</span>
          </NavLink>

          {/* 3. CENTER FLOATING LIVE / MICROPHONE BUTTON */}
          <div className="flex-1 flex justify-center -mt-6 sm:-mt-7 z-20">
            <button
              onClick={() => setIsGoLiveModalOpen(true)}
              className="group relative w-13 h-13 sm:w-14 sm:h-14 rounded-full p-1 bg-gradient-to-tr from-violet-600 via-fuchsia-500 to-pink-500 shadow-xl shadow-fuchsia-600/40 hover:shadow-2xl hover:shadow-fuchsia-500/60 transition-all duration-300 hover:scale-108 active:scale-95 cursor-pointer flex items-center justify-center"
              aria-label="Go Live Studio"
              title="Start Live Stream"
            >
              {/* Outer Pulse Ring */}
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 opacity-70 blur-xs group-hover:opacity-100 animate-pulse pointer-events-none" />

              {/* Inner Glowing Center */}
              <div className="relative w-full h-full rounded-full bg-gradient-to-tr from-[#1b082e] via-[#2d0f4d] to-[#160626] border-2 border-white/40 flex items-center justify-center text-white">
                <Mic className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
              </div>
            </button>
          </div>

          {/* 4. Discover Tab */}
          <NavLink
            to="/discover"
            className={`flex-1 flex flex-col items-center justify-center py-1 rounded-xl transition-all ${
              isActive('/discover')
                ? 'text-fuchsia-400 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Compass className={`w-5 h-5 transition-transform ${isActive('/discover') ? 'scale-110' : ''}`} />
            <span className="text-[10px] sm:text-xs mt-1">Discover</span>
          </NavLink>

          {/* 5. Profile Tab */}
          <NavLink
            to="/profile"
            className={`flex-1 flex flex-col items-center justify-center py-1 rounded-xl transition-all ${
              isActive('/profile')
                ? 'text-fuchsia-400 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <User className={`w-5 h-5 transition-transform ${isActive('/profile') ? 'scale-110' : ''}`} />
            <span className="text-[10px] sm:text-xs mt-1">Profile</span>
          </NavLink>

        </div>
      </nav>

      {/* Center Go Live Broadcast Modal */}
      <GoLiveModal
        isOpen={isGoLiveModalOpen}
        onClose={() => setIsGoLiveModalOpen(false)}
      />
    </>
  );
};

export default React.memo(BottomNav);
