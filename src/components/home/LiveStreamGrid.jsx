import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Heart, Radio, Award, Eye, Sparkles } from 'lucide-react';
import { LIVE_CATEGORIES, MOCK_STREAMERS } from '../../data/dreamLiveContent';
import LiveBadge from '../common/LiveBadge';
import SplitText from '../animations/SplitText';
import BlurText from '../animations/BlurText';
import GradientText from '../animations/GradientText';
import ShinyText from '../animations/ShinyText';
import FadeContent from '../animations/FadeContent';
import ScrollReveal from '../animations/ScrollReveal';
import GlareHover from '../animations/GlareHover';
import Magnet from '../animations/Magnet';
import { assignUniqueVideosToCards } from '../../utils/videoPool';

// Stream Card with individual video preview observer & GlareHover (High-Performance Edition)
const StreamPreviewCard = React.memo(({ stream, onSelectStream }) => {
  const videoRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const video = videoRef.current;
    if (!card || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {});
          }
        } else {
          video.pause();
        }
      },
      { threshold: 0.15, rootMargin: '50px' }
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={cardRef} className="h-full">
      <GlareHover
        borderRadius="24px"
        glareColor="rgba(255, 255, 255, 0.18)"
        glareSize={280}
        className="h-full group rounded-3xl border border-white/20 hover:border-fuchsia-500/70 shadow-xl shadow-black/50 hover:shadow-2xl hover:shadow-fuchsia-950/40 transition-all duration-300 flex flex-col bg-slate-950/85 backdrop-blur-2xl"
      >
        {/* Stream Cover / Live Video Preview Screen */}
        <div className="relative aspect-[16/11] overflow-hidden bg-slate-900">
          
          {/* Looping HTML5 Live Video Preview (Plays strictly when visible in viewport) */}
          <video
            ref={videoRef}
            src={stream.video}
            muted
            loop
            playsInline
            preload="none"
            className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out pointer-events-none block"
          />

          {/* Local Contrast Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none" />

          {/* Top Bar */}
          <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10 pointer-events-none">
            <LiveBadge viewers={stream.viewers} />
            <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-[11px] font-black text-amber-300 text-shadow-subtle shadow-md">
              {stream.level}
            </span>
          </div>

          {/* Viewer Eyes on hover */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/75 backdrop-blur-md border border-white/15 opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <Eye className="w-3 h-3 text-cyan-400" />
            <span className="text-[10px] text-cyan-200 font-bold">{stream.viewers} watching</span>
          </div>

          {/* Play Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
            <button
              onClick={() => onSelectStream(stream)}
              className="w-14 h-14 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white flex items-center justify-center shadow-2xl shadow-fuchsia-600/60 transform scale-75 group-hover:scale-100 transition-all duration-300 cursor-pointer animate-live-pulse"
              aria-label={`Watch ${stream.name}`}
            >
              <Play className="w-6 h-6 fill-white ml-0.5" />
            </button>
          </div>
        </div>

        {/* Card Content with High Local Contrast */}
        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
          <div>
            {/* Broadcaster Profile */}
            <div className="flex items-center justify-between gap-3 mb-2.5">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="relative">
                  <img
                    src={stream.avatar}
                    alt={stream.name}
                    loading="lazy"
                    decoding="async"
                    className="w-10 h-10 rounded-full object-cover border-2 border-violet-400 shrink-0 shadow-md"
                  />
                  {stream.isVerified && (
                    <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-cyan-500 flex items-center justify-center border border-slate-950">
                      <Award className="w-2.5 h-2.5 text-white" />
                    </span>
                  )}
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-white truncate text-shadow-contrast">
                    {stream.name}
                  </h4>
                  <p className="text-xs text-slate-300 truncate text-shadow-subtle">{stream.handle}</p>
                </div>
              </div>

              <div className="flex items-center gap-1 text-xs text-rose-300 font-bold bg-rose-500/20 px-2.5 py-1 rounded-full border border-rose-500/30 shrink-0 shadow-sm">
                <Heart className="w-3 h-3 fill-rose-400" />
                <span>{stream.likes}</span>
              </div>
            </div>

            {/* Stream Title */}
            <h3 className="text-sm font-bold text-white line-clamp-2 leading-snug text-shadow-contrast group-hover:text-fuchsia-300 transition-colors">
              {stream.title}
            </h3>
          </div>

          {/* Tags & Action Button */}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 overflow-hidden flex-wrap">
              {stream.tags.slice(0, 2).map((tag, tIdx) => (
                <span
                  key={tIdx}
                  className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white/10 text-slate-200 border border-white/10 text-shadow-subtle"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <Magnet strength={10}>
              <button
                onClick={() => onSelectStream(stream)}
                className="px-4 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white shadow-md shadow-fuchsia-600/30 border border-fuchsia-400/40 transition-all cursor-pointer shrink-0"
              >
                <ShinyText>Join Live</ShinyText>
              </button>
            </Magnet>
          </div>
        </div>
      </GlareHover>
    </div>
  );
});

export const LiveStreamGrid = ({ onSelectStream }) => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredStreams = useMemo(() => {
    const matched =
      activeCategory === 'all'
        ? MOCK_STREAMERS
        : MOCK_STREAMERS.filter((s) => s.category === activeCategory);
    return assignUniqueVideosToCards(matched);
  }, [activeCategory]);

  return (
    <section id="streams" className="py-20 relative z-10 section-stable">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading with React Bits Animations */}
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-950/80 border border-violet-400/40 text-violet-200 text-xs font-bold uppercase tracking-wider backdrop-blur-xl shadow-lg">
            <Radio className="w-3.5 h-3.5 text-fuchsia-400 animate-pulse" />
            <span>Live Streaming Discovery</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            <span className="text-title-primary">
              <SplitText text="Explore Trending" />
            </span>{' '}
            <GradientText className="font-black drop-shadow-[0_2px_14px_rgba(168,85,247,0.4)]">
              Live Broadcasters
            </GradientText>
          </h2>

          <FadeContent blur={true} duration={0.8} delay={0.15}>
            <BlurText
              text="Discover talented vocalists, dancers, gamers, and voice hosts streaming in HD around the clock across 150+ countries."
              className="text-base sm:text-lg text-slate-200 font-medium leading-relaxed max-w-2xl mx-auto text-shadow-subtle"
              delay={0.1}
            />
          </FadeContent>
        </ScrollReveal>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {LIVE_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-300 cursor-pointer backdrop-blur-xl ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 text-white shadow-xl shadow-fuchsia-500/40 scale-105 border border-fuchsia-300/40'
                  : 'bg-slate-950/75 text-slate-200 hover:text-white hover:bg-slate-900 border border-white/15'
              }`}
            >
              <span className="text-shadow-subtle">{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Streamers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence>
            {filteredStreams.map((stream, idx) => (
              <motion.div
                key={stream.id}
                initial={{ opacity: 0.95, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -10 }}
                transition={{ duration: 0.25, delay: Math.min(idx * 0.03, 0.2) }}
              >
                <StreamPreviewCard
                  stream={stream}
                  onSelectStream={onSelectStream}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default React.memo(LiveStreamGrid);
