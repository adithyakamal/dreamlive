import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export const ProfileStats = () => {
  const navigate = useNavigate();
  const { profileData } = useApp();

  return (
    <div className="relative w-full max-w-2xl mx-auto px-4 sm:px-6 py-4">
      {/* Statistics Section */}
      <div className="grid grid-cols-3 gap-2 text-center py-2">
        {/* FRIENDS */}
        <button
          onClick={() => navigate('/friends?tab=friends')}
          className="group flex flex-col items-center justify-center p-2 rounded-2xl hover:bg-white/[0.04] transition-all cursor-pointer"
        >
          <span className="text-2xl sm:text-3xl font-black text-white group-hover:text-fuchsia-300 transition-colors">
            {profileData.stats.friends}
          </span>
          <span className="text-xs sm:text-sm font-bold text-fuchsia-400 tracking-wider mt-1">
            FRIENDS
          </span>
        </button>

        {/* FOLLOWING */}
        <button
          onClick={() => navigate('/friends?tab=following')}
          className="group flex flex-col items-center justify-center p-2 rounded-2xl hover:bg-white/[0.04] transition-all cursor-pointer border-x border-white/10"
        >
          <span className="text-2xl sm:text-3xl font-black text-white group-hover:text-fuchsia-300 transition-colors">
            {profileData.stats.following}
          </span>
          <span className="text-xs sm:text-sm font-bold text-fuchsia-400 tracking-wider mt-1">
            FOLLOWING
          </span>
        </button>

        {/* FANS */}
        <button
          onClick={() => navigate('/friends?tab=fans')}
          className="group flex flex-col items-center justify-center p-2 rounded-2xl hover:bg-white/[0.04] transition-all cursor-pointer"
        >
          <span className="text-2xl sm:text-3xl font-black text-white group-hover:text-fuchsia-300 transition-colors">
            {profileData.stats.fans}
          </span>
          <span className="text-xs sm:text-sm font-bold text-fuchsia-400 tracking-wider mt-1">
            FANS
          </span>
        </button>
      </div>

      {/* Horizontal Divider Below Statistics */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-fuchsia-500/30 to-transparent mt-3" />
    </div>
  );
};

export default ProfileStats;
