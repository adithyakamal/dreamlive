import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Compass, Flame, Sparkles, Swords, Users2, Radio } from 'lucide-react';
import PageTransition from '../components/common/PageTransition';
import TwoColumnUserGrid from '../components/home/TwoColumnUserGrid';
import { HOME_CATEGORIES } from '../data/mockUsers';
import { useApp } from '../context/AppContext';

export const DiscoverPage = () => {
  const navigate = useNavigate();
  const { activeCategory, setActiveCategory } = useApp();

  return (
    <PageTransition>
      <div className="relative min-h-screen bg-transparent text-slate-100 pb-24 pt-16 sm:pt-20">
        
        {/* Top Header */}
        <div className="sticky top-0 z-30 bg-[#07080d]/90 backdrop-blur-xl border-b border-white/10 px-4 sm:px-6 py-3.5">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/')}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
                aria-label="Back to Home"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-fuchsia-400" />
                <h1 className="text-lg sm:text-xl font-black text-white">Discover Broadcasters</h1>
              </div>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              <span>Trending Worldwide</span>
            </div>
          </div>
        </div>

        {/* Category Selector */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 pb-2">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
            {HOME_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 text-white shadow-lg shadow-fuchsia-600/30 scale-105'
                    : 'bg-white/[0.04] text-slate-400 hover:text-white border border-white/8'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Live Card Grid */}
        <TwoColumnUserGrid />
      </div>
    </PageTransition>
  );
};

export default DiscoverPage;
