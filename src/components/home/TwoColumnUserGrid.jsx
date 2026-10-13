import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radio, Heart, Award, Sparkles, Volume2, UserCheck, UserPlus, Play } from 'lucide-react';
import { MOCK_STREAM_USERS } from '../../data/mockUsers';
import { useApp } from '../../context/AppContext';
import UserProfileModal from '../profile/UserProfileModal';
import GlareHover from '../animations/GlareHover';
import { assignUniqueVideosToCards } from '../../utils/videoPool';

// Individual Streamer Card with Unique Video Asset and Hover Live Preview
const StreamUserCard = React.memo(({ user, idx, following, onSelectUser, onToggleFollow, showToast }) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (isHovered && videoRef.current && user.video) {
      videoRef.current.play().catch(() => {});
    } else if (!isHovered && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isHovered, user.video]);

  return (
    <motion.div
      initial={{ opacity: 0.95, scale: 0.96, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: -10 }}
      transition={{ duration: 0.25, delay: Math.min(idx * 0.02, 0.2) }}
      className="group relative aspect-[3/4.2] sm:aspect-[3/4.4] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/25 hover:border-fuchsia-400/90 shadow-xl shadow-black/60 hover:shadow-2xl hover:shadow-fuchsia-950/50 transition-all duration-300 cursor-pointer bg-[#0e1019]"
      onClick={() => onSelectUser(user)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <GlareHover
        borderRadius="24px"
        glareColor="rgba(255, 255, 255, 0.2)"
        glareSize={200}
        className="w-full h-full"
      >
        {/* Background Image / Dynamic Unique Video Preview */}
        <div className="absolute inset-0 bg-slate-900 overflow-hidden">
          <img
            src={user.cover}
            alt={user.name}
            loading="lazy"
            decoding="async"
            className={`w-full h-full object-cover group-hover:scale-108 transition-all duration-500 ease-out ${
              isHovered && user.video ? 'opacity-0' : 'opacity-100'
            }`}
          />
          {user.video && (
            <video
              ref={videoRef}
              src={user.video}
              muted
              loop
              playsInline
              preload="none"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 pointer-events-none ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
            />
          )}
          {/* Localized High-Contrast Gradient: Darker at bottom for crystal clear text */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#07080d]/95 via-[#07080d]/35 to-black/40 pointer-events-none" />
        </div>

        {/* Top Corner Badges */}
        <div className="absolute top-2 inset-x-2 flex items-center justify-between z-10 pointer-events-none">
          {/* Green Live Dot & Online Status */}
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-[10px] font-bold text-white shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-shadow-subtle">{user.viewers}</span>
          </div>

          {/* Level / VIP Badge */}
          <span className="px-1.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-600 backdrop-blur-md border border-amber-300/40 text-[10px] font-black text-white shadow-md text-shadow-subtle">
            {user.level || 'Lv.01'}
          </span>
        </div>

        {/* Center Sound Wave / Play Icon on Hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none bg-black/30 backdrop-blur-[1px]">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-violet-600 to-fuchsia-600 flex items-center justify-center text-white shadow-xl shadow-fuchsia-600/60 transform scale-75 group-hover:scale-100 transition-transform">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
        </div>

        {/* Bottom Card Information with High-Contrast Text Shadows */}
        <div className="absolute bottom-0 inset-x-0 p-2.5 sm:p-3 z-10 flex flex-col justify-end space-y-1">
          {/* Tags Pill */}
          <div className="flex items-center gap-1 overflow-hidden">
            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-fuchsia-500/40 border border-fuchsia-400/40 text-fuchsia-100 truncate shadow-sm">
              {user.tags?.[0] || 'Live'}
            </span>
            {user.vip && (
              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-500/40 border border-amber-400/40 text-amber-100 shadow-sm">
                {user.vip}
              </span>
            )}
          </div>

          {/* Username with emojis */}
          <div className="flex items-center justify-between gap-1">
            <h4 className="text-xs sm:text-sm font-bold text-white truncate text-shadow-contrast group-hover:text-fuchsia-300 transition-colors">
              {user.name}
            </h4>

            {/* Quick Follow Toggle Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFollow(user.id);
                showToast(following ? `Unfollowed ${user.name}` : `Followed ${user.name}!`);
              }}
              className={`p-1 rounded-full backdrop-blur-md transition-all duration-200 shrink-0 cursor-pointer shadow-md ${
                following
                  ? 'bg-fuchsia-600 text-white shadow-fuchsia-600/50'
                  : 'bg-black/70 hover:bg-fuchsia-600 text-slate-200 hover:text-white border border-white/20'
              }`}
              title={following ? 'Following' : 'Follow'}
              aria-label={following ? 'Following' : 'Follow'}
            >
              {following ? (
                <UserCheck className="w-3 h-3 text-white" />
              ) : (
                <UserPlus className="w-3 h-3" />
              )}
            </button>
          </div>

          {/* Live Room / Bio Snippet */}
          <div className="flex items-center justify-between text-[10px] text-slate-200 pt-0.5">
            <span className="truncate max-w-[85%] text-shadow-subtle">{user.bio?.slice(0, 22)}...</span>
            <Heart className="w-2.5 h-2.5 text-rose-400 shrink-0" />
          </div>
        </div>
      </GlareHover>
    </motion.div>
  );
});

export const TwoColumnUserGrid = ({ onSelectStream }) => {
  const { activeCategory, searchQuery, isFollowing, toggleFollow, showToast } = useApp();
  const [selectedUser, setSelectedUser] = useState(null);

  // Filter and dynamically distribute unique non-repeating videos across all stream cards
  const filteredUsers = useMemo(() => {
    const matched = MOCK_STREAM_USERS.filter((user) => {
      // 1. Search Query Filter
      const matchesSearch =
        !searchQuery ||
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        user.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.userId?.includes(searchQuery);

      if (!matchesSearch) return false;

      // 2. Category Filter
      if (activeCategory === 'Popular') return true;
      if (activeCategory === 'ELITE') return true; // Show top/elite broadcasters
      return user.category?.toLowerCase() === activeCategory.toLowerCase();
    });

    // Re-assign distinct unique videos across the filtered result set with zero duplicates
    return assignUniqueVideosToCards(matched);
  }, [activeCategory, searchQuery]);

  const handleSelectUser = useCallback((user) => {
    setSelectedUser(user);
  }, []);

  return (
    <div className="relative z-10 w-full py-3">
      {/* Grid of Two-Column Cards with React Bits Glare & Unique Video Assignment */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5 sm:gap-4">
        <AnimatePresence>
          {filteredUsers.map((user, idx) => (
            <StreamUserCard
              key={user.id}
              user={user}
              idx={idx}
              following={isFollowing(user.id)}
              onSelectUser={handleSelectUser}
              onToggleFollow={toggleFollow}
              showToast={showToast}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Empty Search / Category State */}
      {filteredUsers.length === 0 && (
        <div className="py-16 text-center space-y-3">
          <Radio className="w-10 h-10 text-fuchsia-400/50 mx-auto animate-pulse" />
          <h3 className="text-base font-bold text-white text-shadow-contrast">No Broadcasters Found</h3>
          <p className="text-xs text-slate-300 max-w-xs mx-auto text-shadow-subtle">
            No live rooms match &ldquo;{searchQuery || activeCategory}&rdquo;. Try another search or category.
          </p>
        </div>
      )}

      {/* Detailed User Profile Modal */}
      {selectedUser && (
        <UserProfileModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onJoinLive={(stream) => {
            setSelectedUser(null);
            if (onSelectStream) {
              onSelectStream(stream);
            }
          }}
        />
      )}
    </div>
  );
};

export default React.memo(TwoColumnUserGrid);
