import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, UserPlus, Bell, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { HOME_CATEGORIES } from '../../data/mockUsers';
import Magnet from '../animations/Magnet';

export const HomeAppHeader = () => {
  const navigate = useNavigate();
  const {
    unreadCount,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
  } = useApp();

  return (
    <div className="relative z-20 w-full pt-2 pb-2">
      {/* Top Search & Actions Bar */}
      <div className="flex items-center gap-2.5 sm:gap-4 mb-3.5">
        
        {/* Rounded Translucent High-Contrast Search Bar */}
        <div className="relative flex-1 min-w-0">
          <div className="relative flex items-center w-full rounded-full bg-slate-950/80 hover:bg-slate-950/90 focus-within:bg-slate-950 border border-white/20 focus-within:border-fuchsia-500/80 backdrop-blur-2xl transition-all duration-200 px-3.5 py-2 sm:py-2.5 shadow-xl shadow-black/40">
            <Search className="w-4 h-4 text-slate-300 shrink-0 mr-2.5" />
            <input
              type="text"
              id="home-stream-search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search live streams, hosts, or categories..."
              className="w-full bg-transparent text-xs sm:text-sm text-white placeholder:text-slate-400 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="p-1 rounded-full text-slate-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Action Buttons: Friends & Notifications */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Friends Icon Button */}
          <Magnet strength={12}>
            <button
              onClick={() => navigate('/friends')}
              className="relative p-2.5 rounded-full bg-slate-950/80 hover:bg-slate-900 border border-white/20 text-slate-100 hover:text-fuchsia-300 backdrop-blur-xl transition-all duration-200 cursor-pointer shadow-xl hover:scale-105 active:scale-95"
              title="Friends & Following"
              aria-label="Friends Page"
            >
              <UserPlus className="w-4 h-4 sm:w-5 sm:h-5 text-fuchsia-400" />
            </button>
          </Magnet>

          {/* Notification Bell with Unread Badge */}
          <Magnet strength={12}>
            <button
              onClick={() => navigate('/notifications')}
              className="relative p-2.5 rounded-full bg-slate-950/80 hover:bg-slate-900 border border-white/20 text-slate-100 hover:text-amber-300 backdrop-blur-xl transition-all duration-200 cursor-pointer shadow-xl hover:scale-105 active:scale-95"
              title="Notifications"
              aria-label="Notifications Page"
            >
              <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-gradient-to-r from-rose-500 to-red-600 border-2 border-[#07080d] text-[10px] font-black text-white flex items-center justify-center shadow-lg shadow-rose-600/50 animate-pulse">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>
          </Magnet>
        </div>
      </div>

      {/* Category Navigation Bar with Local Contrast and High Legibility */}
      <div className="relative border-b border-white/15 pb-1">
        <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto no-scrollbar scroll-smooth py-1 px-1">
          {HOME_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer flex-shrink-0 backdrop-blur-md ${
                  isActive
                    ? 'bg-fuchsia-600/90 text-white shadow-lg shadow-fuchsia-600/40 border border-fuchsia-400/50'
                    : 'bg-black/40 hover:bg-black/60 text-slate-200 hover:text-white border border-white/10'
                }`}
              >
                <span className="relative z-10 text-shadow-subtle">{cat.label}</span>

                {/* Active Neon Indicator */}
                {isActive && (
                  <motion.div
                    layoutId="category-active-indicator"
                    className="absolute -bottom-1 inset-x-2 h-0.5 rounded-full bg-cyan-400 shadow-md shadow-cyan-400"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HomeAppHeader;
