import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Star, Sparkles, Shield, User, X, Eye } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ProfileHeader = () => {
  const { profileData, showToast } = useApp();
  const [copied, setCopied] = useState(false);
  const [isCardVisible, setIsCardVisible] = useState(true);

  const handleCopyId = (e) => {
    e?.stopPropagation?.();
    navigator.clipboard.writeText(profileData.id);
    setCopied(true);
    showToast(`ID ${profileData.id} copied to clipboard!`);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCloseCard = (e) => {
    e.stopPropagation();
    setIsCardVisible(false);
    showToast('Profile card closed');
  };

  const handleOpenCard = () => {
    setIsCardVisible(true);
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 pt-3 pb-2">
      <AnimatePresence mode="wait">
        {isCardVisible ? (
          /* ═══ LARGE CENTERED USER DETAILS CARD ═══ */
          <motion.div
            key="profile-details-card"
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -15 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* 1. Large DreamLive-Themed Profile Banner Background */}
            <div className="relative h-44 sm:h-52 rounded-3xl overflow-hidden shadow-2xl shadow-purple-950/40 border border-white/10 bg-gradient-to-tr from-[#1f0933] via-[#35104d] to-[#120824]">
              {/* Decorative Gradient Auras and Geometric Shapes */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(217,70,239,0.35),transparent_60%)]" />
              <div className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full bg-violet-600/25 blur-3xl" />
              
              {/* Center Verified Space Badge */}
              <div className="absolute left-1/2 top-4 -translate-x-1/2 flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] font-bold text-fuchsia-200 shadow-sm pointer-events-none">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>DreamLive Verified Space</span>
              </div>

              {/* ✕ Top-Right Circular Close / Cancel Button */}
              <button
                onClick={handleCloseCard}
                className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-30 w-8 h-8 rounded-full bg-black/60 hover:bg-violet-600/70 border border-white/20 hover:border-fuchsia-400/80 text-white/80 hover:text-white flex items-center justify-center backdrop-blur-md shadow-lg hover:shadow-fuchsia-600/40 transition-all duration-200 cursor-pointer hover:scale-110 active:scale-95 group"
                aria-label="Close user details card"
                title="Close Profile Details"
              >
                <X className="w-4 h-4 text-slate-200 group-hover:text-white transition-colors" />
              </button>

              {/* Ambient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e17] via-transparent to-black/20 pointer-events-none" />
            </div>

            {/* 2. Overlapping Profile Avatar and Gradient Card */}
            <div className="relative -mt-16 sm:-mt-20 px-2 sm:px-4">
              
              {/* Circular Avatar Overlapping Lower Portion of Banner */}
              <div className="flex justify-center mb-3">
                <div className="relative group cursor-pointer">
                  {/* Outer Glow Ring */}
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-fuchsia-500 via-pink-500 to-violet-500 blur-sm opacity-80 group-hover:opacity-100 transition-opacity animate-pulse" />
                  
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-gradient-to-tr from-violet-600 via-fuchsia-500 to-pink-500">
                    <img
                      src={profileData.avatar}
                      alt={profileData.username}
                      className="w-full h-full rounded-full object-cover border-2 border-[#0c0e17]"
                    />
                    
                    {/* Level Badge Overlay on Avatar */}
                    <span className="absolute bottom-0 inset-x-0 mx-auto w-max px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-[#0c0e17] font-black text-[10px] border border-amber-300 shadow-md">
                      {profileData.level}
                    </span>
                  </div>
                </div>
              </div>

              {/* 3. Purple/Pink Gradient Profile Information Card */}
              <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-b from-[#1b122c]/90 via-[#150e24]/90 to-[#0e091a]/95 border border-fuchsia-500/25 shadow-xl shadow-fuchsia-950/30 backdrop-blur-2xl text-center space-y-3">
                
                {/* Username */}
                <div className="space-y-1">
                  <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide">
                    {profileData.username}
                  </h1>

                  {/* ID with Copy Icon */}
                  <div className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-xs font-semibold text-slate-300">
                    <span>N/A ID: {profileData.id}</span>
                    <button
                      onClick={handleCopyId}
                      className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-fuchsia-300 transition-colors cursor-pointer"
                      title="Copy User ID"
                      aria-label="Copy User ID"
                    >
                      {copied ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Profile Information Badges */}
                <div className="flex items-center justify-center gap-2 flex-wrap pt-1">
                  {/* Female Gender Badge with Age */}
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-xs shadow-sm shadow-pink-500/30">
                    <span>♀</span>
                    <span>{profileData.age}</span>
                  </span>

                  {/* Star / VIP Badge */}
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-600 text-black font-black text-xs shadow-sm shadow-amber-500/30">
                    <Star className="w-3 h-3 fill-black text-black" />
                    <span>VIP 0</span>
                  </span>

                  {/* Level Badge */}
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-xs shadow-sm shadow-violet-500/30">
                    {profileData.level}
                  </span>

                  {/* "Any" Badge */}
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-white/10 border border-white/20 text-slate-200 font-semibold text-xs">
                    {profileData.badge}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          /* ═══ SLEEK GLASS PROFILE REOPEN TRIGGER BAR ═══ */
          <motion.div
            key="profile-reopen-trigger"
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.3 }}
            className="mb-4"
          >
            <button
              onClick={handleOpenCard}
              className="w-full p-4 rounded-3xl bg-slate-950/85 border border-fuchsia-500/30 hover:border-fuchsia-400/70 shadow-2xl shadow-fuchsia-950/30 backdrop-blur-2xl flex items-center justify-between transition-all duration-300 cursor-pointer group hover:scale-[1.01]"
              aria-label="Reopen profile details card"
              title="Click to reopen full profile card"
            >
              <div className="flex items-center gap-3.5">
                <div className="relative w-12 h-12 rounded-full p-0.5 bg-gradient-to-tr from-violet-600 via-fuchsia-500 to-pink-500 shadow-md">
                  <img
                    src={profileData.avatar}
                    alt={profileData.username}
                    className="w-full h-full rounded-full object-cover border border-slate-950"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border border-slate-950"></span>
                </div>

                <div className="text-left space-y-0.5">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-white group-hover:text-fuchsia-300 transition-colors">
                      {profileData.username}
                    </h3>
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                      {profileData.level}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 flex items-center gap-1.5">
                    <span>N/A ID: {profileData.id}</span>
                    <span className="text-slate-500">•</span>
                    <span className="text-fuchsia-300 font-medium">Tap to view full card</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-xs font-bold shadow-lg shadow-fuchsia-600/30 group-hover:from-violet-500 group-hover:to-fuchsia-500 transition-all flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Details</span>
                </span>
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileHeader;
