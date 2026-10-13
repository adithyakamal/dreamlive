import React from 'react';
import PageTransition from '../components/common/PageTransition';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileStats from '../components/profile/ProfileStats';
import ProfileFeatureGrid from '../components/profile/ProfileFeatureGrid';

export const ProfilePage = () => {
  return (
    <PageTransition>
      <div className="relative min-h-screen bg-transparent text-slate-100 pb-20 pt-16 sm:pt-20">
        {/* Background glow atmosphere */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-b from-purple-600/15 via-fuchsia-600/8 to-transparent blur-[120px] pointer-events-none" />

        <div className="relative z-10">
          {/* 1. Profile Header with Banner, Avatar, Info Card & Badges */}
          <ProfileHeader />

          {/* 2. Profile Statistics: FRIENDS 0, FOLLOWING 10, FANS 0 & Divider */}
          <ProfileStats />

          {/* 3. Profile Feature Menu (Row 1 & Row 2 grids) */}
          <ProfileFeatureGrid />
        </div>
      </div>
    </PageTransition>
  );
};

export default ProfilePage;
