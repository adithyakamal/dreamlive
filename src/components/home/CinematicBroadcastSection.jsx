import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Tv, Volume2, VolumeX, Eye, Sparkles, Heart, Flame, Radio, Zap, Crown } from 'lucide-react';
import LiveBadge from '../common/LiveBadge';
import SplitText from '../animations/SplitText';
import BlurText from '../animations/BlurText';
import GradientText from '../animations/GradientText';
import FadeContent from '../animations/FadeContent';
import ScrollReveal from '../animations/ScrollReveal';
import GlareHover from '../animations/GlareHover';
import Magnet from '../animations/Magnet';

// Web-optimized 720p/30fps high-energy live performance video
const BROADCAST_VIDEO_URL = '/313955_small.mp4';
const BROADCAST_POSTER = 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1000&auto=format&fit=crop&q=80';

// Memoized video element with viewport-aware auto-pause (Performance Edition)
const CinematicLiveVideoPlayer = React.memo(({ videoRef, src, poster }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

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
      { threshold: 0.1 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [videoRef]);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 block"
      />
    </div>
  );
});

export const CinematicBroadcastSection = () => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [viewers, setViewers] = useState(38420);
  const [likes, setLikes] = useState(142800);

  // Play video smoothly on initial mount with automatic error catching
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = isMuted;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        if (video) {
          video.muted = true;
          video.play().catch(() => {});
        }
      });
    }
  }, []);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  const handleLike = () => {
    setLikes((prev) => prev + 1);
  };

  return (
    <section className="py-20 relative z-10 overflow-hidden section-stable">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Heading with React Bits Animations */}
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-fuchsia-950/80 border border-fuchsia-400/40 text-fuchsia-200 text-xs font-bold uppercase tracking-wider backdrop-blur-xl shadow-lg">
            <Tv className="w-3.5 h-3.5 text-fuchsia-400 animate-pulse" />
            <span>10-Second Live Showcase</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            <span className="text-title-primary">
              <SplitText text="Experience Pure High-Energy" />
            </span>{' '}
            <GradientText className="font-black drop-shadow-[0_2px_14px_rgba(168,85,247,0.4)]">
              Live Entertainment
            </GradientText>
          </h2>

          <FadeContent blur={true} duration={0.8} delay={0.15}>
            <BlurText
              text="Ultra-low latency streaming delivers instant fan reactions, musical performances, and creator duels with zero buffer lag."
              className="text-base sm:text-lg text-slate-200 font-medium leading-relaxed max-w-2xl mx-auto text-shadow-subtle"
              delay={0.1}
            />
          </FadeContent>
        </ScrollReveal>

        {/* 10-Second Cinema Video Container with React Bits Glare & Local Glass Contrast */}
        <ScrollReveal delay={0.15}>
          <GlareHover
            glareColor="rgba(217, 70, 239, 0.25)"
            glareSize={450}
            borderRadius="32px"
          >
            <div className="relative rounded-[32px] overflow-hidden glass-panel-glow border border-white/25 shadow-2xl p-3 sm:p-4 bg-slate-950/90 backdrop-blur-2xl">
              
              {/* Aspect Ratio Cinema Screen */}
              <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden bg-slate-900 group">
                
                {/* 10-Second Looping Video (Memoized for Continuous Butter Smooth Playback) */}
                <CinematicLiveVideoPlayer
                  videoRef={videoRef}
                  src={BROADCAST_VIDEO_URL}
                  poster={BROADCAST_POSTER}
                />

                {/* Local Contrast Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/20 to-slate-950/70 pointer-events-none" />

                {/* Top Overlay Bar */}
                <div className="absolute top-4 inset-x-4 flex items-center justify-between z-20">
                  {/* Broadcaster Badge */}
                  <div className="flex items-center gap-2.5 p-1.5 pr-4 rounded-full bg-slate-950/85 border border-white/20 backdrop-blur-xl shadow-lg">
                    <img
                      src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80"
                      alt="DJ Aryan"
                      className="w-8 h-8 rounded-full object-cover border-2 border-amber-400"
                    />
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-white flex items-center gap-1 text-shadow-subtle">
                        DJ Aryan &amp; Pulse Crew
                        <Crown className="w-3 h-3 text-amber-400" />
                      </span>
                      <span className="text-[10px] text-fuchsia-300 font-semibold">Festival Stage Live • Lv. 88</span>
                    </div>
                  </div>

                  {/* Live Viewers + Sound Toggle */}
                  <div className="flex items-center gap-2">
                    <LiveBadge viewers={`${(viewers / 1000).toFixed(1)}K`} />
                    <Magnet strength={10}>
                      <button
                        onClick={toggleSound}
                        className="p-2 rounded-full bg-black/80 hover:bg-black text-white border border-white/25 transition-all cursor-pointer shadow-xl backdrop-blur-md"
                        aria-label="Toggle sound"
                      >
                        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" />}
                      </button>
                    </Magnet>
                  </div>
                </div>

                {/* Bottom Overlay Info with High Local Contrast */}
                <div className="absolute bottom-4 inset-x-4 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 z-20">
                  <div className="space-y-1 max-w-lg">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-fuchsia-500/40 border border-fuchsia-500/60 text-[10px] font-bold text-fuchsia-100 uppercase tracking-wider shadow-md">
                      <Flame className="w-3 h-3 text-amber-300" />
                      Grand Arena Live Performance
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white text-shadow-contrast">
                      ⚡ Electronic Night Beats &amp; Crowd Laser Symphony
                    </h3>
                    <p className="text-xs text-slate-200 text-shadow-subtle line-clamp-1">
                      Broadcasting live to 38,000+ viewers across India, SE Asia &amp; UAE.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Magnet strength={10}>
                      <button
                        onClick={handleLike}
                        className="px-4 py-2 rounded-full bg-rose-500/30 hover:bg-rose-500/50 border border-rose-400/50 text-rose-200 font-bold text-xs flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all shadow-lg backdrop-blur-md"
                      >
                        <Heart className="w-4 h-4 fill-rose-500 text-rose-400" />
                        <span>{likes.toLocaleString()}</span>
                      </button>
                    </Magnet>
                    <span className="px-3 py-2 rounded-full bg-black/80 text-slate-200 border border-white/20 text-xs font-semibold backdrop-blur-md shadow-md">
                      Live Showcase
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </GlareHover>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default React.memo(CinematicBroadcastSection);
