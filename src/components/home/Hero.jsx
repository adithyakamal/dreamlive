import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Radio,
  Download,
  Sparkles,
  Flame,
  Eye,
  Volume2,
  VolumeX,
  Heart,
  ShieldCheck,
  Boxes,
  Compass,
  Tv,
  Crown,
  Gift,
  Zap,
} from 'lucide-react';
import { COMPANY_INFO } from '../../data/dreamLiveContent';
import Button from '../common/Button';
import LiveBadge from '../common/LiveBadge';
import SplitText from '../animations/SplitText';
import BlurText from '../animations/BlurText';
import RotatingWords from '../animations/RotatingWords';
import GradientText from '../animations/GradientText';
import DecryptedText from '../animations/DecryptedText';
import ShinyText from '../animations/ShinyText';
import TiltedCard from '../animations/TiltedCard';
import FadeContent from '../animations/FadeContent';
import Magnet from '../animations/Magnet';
import SplineScene from '../3d/SplineScene';
import Meshy3DViewer from '../3d/Meshy3DViewer';
import CountUpNumber from '../animations/CountUpNumber';
import CinematicParticles from '../animations/CinematicParticles';

const SAMPLE_COMMENTS = [
  { user: 'Kiran_K', text: 'Singing is mesmerising! 💖', time: 'Just now' },
  { user: 'Vikram99', text: 'Sent 10x Neon Roses 🌹🌹', highlight: true },
  { user: 'Sanya_Dance', text: 'Love the energy from Delhi! 🔥', time: '1s ago' },
  { user: 'Amit_R', text: 'Joined the audio room 🎧', time: '2s ago' },
  { user: 'Pooja_VIP', text: 'Sent Galaxy Rocket 🚀✨', highlight: true },
  { user: 'Deepika_Star', text: 'This voice is incredible!! 🎶', time: '3s ago' },
  { user: 'Raj_Gold', text: 'Sent Dragon Sovereign 🐉🔥', highlight: true },
];

const FLOATING_GIFT_EMOJIS = ['🌹', '💎', '👑', '🚀', '⭐', '🎁', '🔥', '💖'];

// Dedicated web-optimized live broadcaster stream video (720p @ 30 FPS, ~2.2MB H.264)
const HERO_STREAM_VIDEO = '/7914841-hd_1280_720_30fps.mp4';
const HERO_STREAM_POSTER = 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=80';

// Memoized live video player component with viewport-aware auto-pause (Performance Edition)
const HeroLiveVideoPlayer = React.memo(({ videoRef, src }) => {
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
    <div
      ref={containerRef}
      className="hero-live-player-container absolute inset-0 w-full h-full overflow-hidden"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'hidden' }}
    >
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        preload="metadata"
        className="hero-live-player-video absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 pointer-events-none block"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          minWidth: '100%',
          minHeight: '100%',
          maxWidth: '100%',
          maxHeight: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          display: 'block',
        }}
      />
    </div>
  );
});

// Self-contained rolling chat subcomponent (isolated from Hero re-renders)
const HeroRollingChat = React.memo(() => {
  const [commentIndex, setCommentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCommentIndex((prev) => (prev + 1) % SAMPLE_COMMENTS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-1.5 max-h-28 overflow-hidden flex flex-col justify-end">
      {SAMPLE_COMMENTS.slice(commentIndex, commentIndex + 3).map((comment, idx) => (
        <motion.div
          key={`${commentIndex}-${idx}`}
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.1 }}
          className={`text-xs px-2.5 py-1 rounded-lg backdrop-blur-md w-fit max-w-[90%] flex items-center gap-1.5 ${
            comment.highlight
              ? 'bg-gradient-to-r from-amber-500/30 to-fuchsia-500/30 border border-amber-400/40 text-amber-200 font-semibold'
              : 'bg-black/70 border border-white/10 text-slate-200'
          }`}
        >
          <span className="font-bold text-violet-300">{comment.user}:</span>
          <span>{comment.text}</span>
        </motion.div>
      ))}
    </div>
  );
});

// Self-contained viewer badge subcomponent (isolated from Hero re-renders)
const HeroViewerBadge = React.memo(() => {
  const [viewerCount, setViewerCount] = useState(18400);

  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount((prev) => prev + Math.floor(Math.random() * 30) - 10);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return <LiveBadge viewers={`${(viewerCount / 1000).toFixed(1)}K`} />;
});

export const Hero = ({ onOpenDownload, onOpenCreatorModal, onSelectStream }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [heartsCount, setHeartsCount] = useState(14820);
  const [floatingHearts, setFloatingHearts] = useState([]);
  const [activeHeroTab, setActiveHeroTab] = useState('stream'); // Stream is the primary product focus
  const videoRef = useRef(null);

  // Toggle video mute & ensure video playback
  const handleToggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  // Ensure hero video playback with error catching on initial mount
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.play().catch(() => {});
          }
        });
      }
    }
  }, []);

  const handleHeartClick = useCallback(() => {
    setHeartsCount((prev) => prev + 1);
    const newHeart = {
      id: Date.now() + Math.random(),
      left: Math.floor(Math.random() * 60) + 20,
      drift: (Math.random() - 0.5) * 40,
      emoji: FLOATING_GIFT_EMOJIS[Math.floor(Math.random() * FLOATING_GIFT_EMOJIS.length)],
    };
    setFloatingHearts((prev) => [...prev.slice(-12), newHeart]);
  }, []);

  return (
    <section id="hero-platform" className="relative min-h-[100vh] pt-24 sm:pt-28 lg:pt-32 pb-16 flex flex-col justify-center overflow-hidden w-full box-border">
      {/* Cinematic particles background */}
      <CinematicParticles count={15} className="z-0 pointer-events-none" />

      {/* Glow radial highlights & background mesh grid */}
      <div className="absolute inset-0 bg-cyber-grid pointer-events-none opacity-30" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[min(800px,100%)] h-[min(800px,100%)] bg-gradient-to-tr from-violet-600/25 via-fuchsia-600/15 to-amber-500/10 blur-[120px] sm:blur-[160px] pointer-events-none animate-pulse-glow" />

      {/* Top cinematic gradient sweep */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-violet-500/60 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full min-w-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-12 items-center w-full min-w-0">

          {/* ═══ LEFT COLUMN: Headline, CTAs ═══ */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 text-center lg:text-left space-y-5 sm:space-y-6 lg:space-y-8 min-w-0 w-full"
          >
            {/* Live Status Pill */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-violet-950/70 border border-violet-400/35 backdrop-blur-xl shadow-lg shadow-violet-950/50"
            >
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-violet-200 flex items-center gap-1.5">
                <DecryptedText text="LIVE STREAMING PLATFORM" speed={25} />
                <span className="text-violet-400">|</span>
                <span className="text-fuchsia-300 font-extrabold tracking-widest">DREAMLIVE</span>
              </span>
            </motion.div>

            {/* ═══ CINEMATIC HEADLINE ═══ */}
            <div className="space-y-3 min-w-0 w-full">
              <h1 className="text-3xl sm:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black tracking-tight leading-[1.08] break-words">
                <span className="block mb-2 font-black tracking-wider uppercase flex flex-wrap items-center justify-center lg:justify-start">
                  <span className="inline-block text-title-primary">
                    <SplitText text="DREAM" stagger={0.04} className="inline-block" />
                  </span>
                  <span className="inline-block bg-gradient-to-r from-pink-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_4px_30px_rgba(217,70,239,0.7)] ml-1.5">
                    <SplitText text="LIVE" stagger={0.04} className="inline-block" />
                  </span>
                </span>
                <span className="block text-2xl sm:text-4xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-black break-words text-title-primary">
                  <SplitText
                    text="Go Live. Get Loved."
                    stagger={0.025}
                    className="inline-block"
                  />
                </span>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="block mt-1 text-xl sm:text-3xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-extrabold"
                >
                  <GradientText className="font-black drop-shadow-[0_2px_20px_rgba(168,85,247,0.5)]">
                    Shine Worldwide.
                  </GradientText>
                </motion.span>
              </h1>

              {/* Dynamic Keywords Strip */}
              <div className="pt-1 flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs sm:text-sm text-slate-300 font-medium">
                <span className="text-slate-400 text-shadow-subtle">Powering next-gen:</span>
                <RotatingWords
                  words={[
                    'Live Social Entertainment',
                    'Interactive 3D Virtual Gifts',
                    'High-Stakes PK Duels',
                    'Multi-Guest Voice Rooms',
                    'Creator Monetization',
                  ]}
                  interval={2600}
                />
              </div>
            </div>

            {/* Supporting Description */}
            <FadeContent blur={true} duration={0.8} delay={0.2} className="text-base sm:text-lg lg:text-xl text-slate-200 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0 space-y-2">
              <BlurText
                text="Broadcast your passion. Build your fandom. Earn real income."
                className="font-bold text-white text-shadow-contrast"
                delay={0.15}
              />
              <p className="text-sm sm:text-base text-slate-200 font-normal text-shadow-subtle">
                {COMPANY_INFO.shortDescription} Connect with audiences in 150+ countries and monetize your talent with real-time 3D virtual gifts.
              </p>
            </FadeContent>

            {/* ═══ CTA BUTTONS ═══ */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Magnet strength={15}>
                <Button
                  variant="primary"
                  size="lg"
                  icon={Download}
                  onClick={onOpenDownload}
                  className="w-full sm:w-auto shadow-2xl shadow-fuchsia-600/40 font-bold hover:scale-105 transition-all"
                >
                  Download App Free
                </Button>
              </Magnet>

              <Magnet strength={15}>
                <Button
                  as="a"
                  href="#streams"
                  variant="secondary"
                  size="lg"
                  icon={Flame}
                  className="w-full sm:w-auto shadow-xl bg-slate-950/80 backdrop-blur-xl border-white/20 hover:scale-105 transition-all"
                >
                  <ShinyText>Explore Live Streams</ShinyText>
                </Button>
              </Magnet>

              <button
                onClick={onOpenCreatorModal}
                className="text-xs sm:text-sm font-bold text-violet-200 hover:text-white underline-offset-4 hover:underline py-2 cursor-pointer transition-colors flex items-center gap-1.5 text-shadow-glow hover-text-glow"
              >
                <Sparkles className="w-4 h-4 text-fuchsia-400" />
                <span>Become a Host / Partner →</span>
              </button>
            </div>

            {/* ═══ TRUST HIGHLIGHTS ═══ */}
            <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-400">
              {[
                { icon: ShieldCheck, color: 'text-emerald-400', text: 'Verified Broadcasters' },
                { icon: Gift, color: 'text-amber-400', text: '200+ Animated 3D Gifts' },
                { icon: Zap, color: 'text-cyan-400', text: 'Ultra Low-Latency Video' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  className="flex items-center gap-1.5 p-1.5 px-3 rounded-full bg-white/[0.04] border border-white/8 hover-glow transition-all"
                >
                  <item.icon className={`w-3.5 h-3.5 ${item.color}`} />
                  <span className="font-semibold text-slate-300">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ═══ RIGHT COLUMN: 3D / Stream Showcase ═══ */}
          {/* ═══ RIGHT COLUMN: Interactive 3D Spline / Real Live Stream Visual ═══ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative min-w-0 w-full flex flex-col items-center lg:items-end"
          >
            {/* Visual Arena Mode Selector Tabs */}
            <div className="mb-3 sm:mb-4 flex items-center justify-center lg:justify-end gap-1.5 w-full max-w-sm sm:max-w-md">
              {[
                { id: 'stream', icon: Tv, label: 'Live Broadcast Video' },
                { id: 'spline', icon: Compass, label: '3D Scene' },
                { id: 'meshy', icon: Boxes, label: '3D Assets' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveHeroTab(tab.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeHeroTab === tab.id
                      ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/30'
                      : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/10'
                  }`}
                >
                  <tab.icon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* ═══ DYNAMIC VISUAL CONTENT ═══ */}
            <AnimatePresence mode="wait">
              {activeHeroTab === 'spline' && (
                <motion.div
                  key="spline-tab"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="w-full max-w-sm sm:max-w-md rounded-[32px] overflow-hidden glass-panel-glow border border-white/20 shadow-2xl p-2 sm:p-3 relative"
                >
                  <SplineScene
                    sceneUrl="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                    className="min-h-[460px] sm:min-h-[520px] rounded-2xl"
                  />

                  {/* Overlay Badge */}
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-slate-950/85 backdrop-blur-xl border border-white/15 flex items-center justify-between z-10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-400 flex items-center justify-center text-white shadow-lg">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white">Interactive 3D Stage</h4>
                        <p className="text-[11px] text-slate-400">Move your cursor to navigate</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveHeroTab('stream')}
                      className="px-3 py-1.5 rounded-full bg-fuchsia-500/20 text-fuchsia-300 hover:bg-fuchsia-500/30 border border-fuchsia-500/40 text-xs font-bold cursor-pointer transition-colors"
                    >
                      View Live Stream
                    </button>
                  </div>
                </motion.div>
              )}

              {activeHeroTab === 'meshy' && (
                <motion.div
                  key="meshy-tab"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="w-full max-w-sm sm:max-w-md"
                >
                  <Meshy3DViewer
                    initialPreset="device"
                    allowPresetSwitch={true}
                    height="490px"
                  />
                </motion.div>
              )}

              {activeHeroTab === 'stream' && (
                <motion.div
                  key="stream-tab"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="w-full max-w-sm sm:max-w-md flex justify-center lg:justify-end"
                >
                  <TiltedCard maxTilt={8} glareOpacity={0.3}>
                    {/* ═══ LIVE STREAM PHONE FRAME WITH REAL VIDEO ═══ */}
                    <div className="relative mx-auto lg:mr-0 w-full max-w-[320px] sm:max-w-[360px] xl:max-w-[400px] 2xl:max-w-md rounded-[28px] sm:rounded-[32px] p-2.5 sm:p-3.5 glass-panel-glow border border-white/20 shadow-2xl shadow-violet-950/60 overflow-hidden">

                      {/* Stream Video Screen (PlayerContainer) */}
                      <div
                        className="relative w-full aspect-[9/14] sm:aspect-[9/13] rounded-2xl overflow-hidden bg-slate-900 group bg-scanlines"
                        style={{ position: 'relative', width: '100%', overflow: 'hidden' }}
                      >
                        
                        {/* Real Looping HTML5 Live Video (Memoized for Butter Smooth Playback) */}
                        <HeroLiveVideoPlayer videoRef={videoRef} src={HERO_STREAM_VIDEO} />

                        {/* Dark Vignette Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-slate-950/50 pointer-events-none z-[1]" />

                        {/* ═══ TOP BAR ═══ */}
                        <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
                          {/* Broadcaster Profile */}
                          <div className="flex items-center gap-2 p-1 pr-3 rounded-full bg-slate-950/75 border border-white/10 backdrop-blur-md">
                            <div className="relative">
                              <img
                                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
                                alt="Riya Sharma"
                                className="w-7 h-7 rounded-full object-cover border-2 border-fuchsia-400"
                              />
                              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-slate-950"></span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-xs font-bold text-white flex items-center gap-1">
                                Riya Sharma
                                <Crown className="w-3 h-3 text-amber-400" />
                              </span>
                              <span className="text-[10px] text-fuchsia-300 font-semibold">Lv. 64</span>
                            </div>
                          </div>

                          {/* Live + Viewers + Mute */}
                          <div className="flex items-center gap-1.5">
                            <HeroViewerBadge />
                            <button
                              onClick={handleToggleSound}
                              className="p-1.5 rounded-full bg-slate-950/70 text-white/90 hover:text-white border border-white/15 backdrop-blur-md cursor-pointer transition-colors"
                              aria-label="Toggle Sound"
                              title={isMuted ? 'Unmute Live Video' : 'Mute Live Video'}
                            >
                              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />}
                            </button>
                          </div>
                        </div>

                        {/* Audio Visualizer */}
                        <div className="absolute top-16 right-3 flex items-end gap-1 h-5 px-2 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
                          <span className="w-1 bg-fuchsia-400 rounded-full eq-bar-1" />
                          <span className="w-1 bg-violet-400 rounded-full eq-bar-2" />
                          <span className="w-1 bg-cyan-400 rounded-full eq-bar-3" />
                          <span className="w-1 bg-pink-400 rounded-full eq-bar-4" />
                        </div>

                        {/* ═══ FLOATING HEARTS / GIFTS ═══ */}
                        <div className="absolute inset-0 pointer-events-none overflow-hidden">
                          {floatingHearts.map((heart) => (
                            <motion.div
                              key={heart.id}
                              initial={{ opacity: 1, y: 0, scale: 0.6 }}
                              animate={{ opacity: 0, y: -200, scale: 1.6, x: heart.drift || 0 }}
                              transition={{ duration: 2, ease: 'easeOut' }}
                              style={{ left: `${heart.left}%`, bottom: '20%' }}
                              className="absolute text-2xl"
                            >
                              {heart.emoji}
                            </motion.div>
                          ))}
                        </div>

                        {/* ═══ BOTTOM STREAM CONTENT ═══ */}
                        <div className="absolute bottom-3 inset-x-3 space-y-2 z-10">
                          {/* Stream Title */}
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded-md bg-fuchsia-500/30 border border-fuchsia-500/40 text-[10px] font-bold text-fuchsia-200">
                              MUSIC LIVE
                            </span>
                            <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-xs font-medium text-slate-200 line-clamp-1 border border-white/5 flex-1">
                              🎸 Bollywood Acoustic Concert &amp; Requests ✨
                            </span>
                          </div>

                          {/* Simulated Rolling Chat (Self-contained, zero parent re-renders) */}
                          <HeroRollingChat />

                          {/* Interactive Action Bar */}
                          <div className="flex items-center gap-2 pt-1">
                            <button
                              onClick={() =>
                                onSelectStream({
                                  id: 'stream-1',
                                  name: 'Riya Sharma',
                                  title: 'Acoustic Bollywood Nights & Live Song Requests 🎸✨',
                                  viewers: '18.4K',
                                  likes: '245K',
                                  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
                                  cover: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=80',
                                  level: 'Lv. 64',
                                })
                              }
                              className="flex-1 py-2 px-3 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-lg shadow-violet-500/30 cursor-pointer transition-transform active:scale-95"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              Watch Full Stream
                            </button>

                            <button
                              onClick={handleHeartClick}
                              className="p-2 rounded-full bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-400 hover:text-rose-300 flex items-center gap-1 text-xs font-bold cursor-pointer transition-all active:scale-90"
                              title="Send Hearts"
                            >
                              <Heart className="w-4 h-4 fill-rose-500 text-rose-500 animate-pulse" />
                              <span className="text-[10px]">{heartsCount.toLocaleString()}</span>
                            </button>

                            <button
                              onClick={handleHeartClick}
                              className="p-2 rounded-full bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-400 hover:text-amber-300 cursor-pointer transition-all active:scale-90"
                              title="Send Gift"
                            >
                              <Gift className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* ═══ FLOATING PK BATTLE BADGE ═══ */}
                      <motion.div
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute -bottom-3 -left-3 p-3 rounded-2xl bg-gradient-to-r from-violet-900/95 to-purple-900/95 border border-white/20 backdrop-blur-xl shadow-xl flex items-center gap-3"
                      >
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-lg font-black text-slate-950">
                          PK
                        </div>
                        <div className="flex flex-col pr-1">
                          <span className="text-xs font-bold text-white">Live PK Battles</span>
                          <span className="text-[10px] text-amber-300 font-semibold">184.5K Coins in Play</span>
                        </div>
                      </motion.div>

                      {/* ═══ FLOATING GIFT STREAK BADGE ═══ */}
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                        className="absolute -top-2 -right-2 p-2.5 rounded-xl bg-gradient-to-r from-amber-500/90 to-orange-500/90 border border-white/30 shadow-xl flex items-center gap-2"
                      >
                        <span className="text-lg">🔥</span>
                        <div className="flex flex-col">
                          <span className="text-[10px] font-black text-white">GIFT STREAK</span>
                          <span className="text-[9px] text-amber-100 font-semibold">x42 Combo!</span>
                        </div>
                      </motion.div>
                    </div>
                  </TiltedCard>
                </motion.div>
              )}

              {/* ═══ TAB 2: PK BATTLES TAB ═══ */}
              {activeHeroTab === 'pk' && (
                <div className="p-5 rounded-3xl glass-card border border-white/20 shadow-2xl relative overflow-hidden bg-slate-950/90 backdrop-blur-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold">
                      <Swords className="w-3.5 h-3.5 animate-bounce" />
                      <span>PK BATTLE ROYALE</span>
                    </div>
                    <span className="text-xs font-mono text-amber-300 font-bold">02:45 REMAINING</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 items-center">
                    <div className="relative rounded-2xl overflow-hidden aspect-[3/4] border-2 border-violet-500">
                      <img
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80"
                        alt="Host 1"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-2 inset-x-2 p-1.5 rounded-lg bg-black/60 backdrop-blur-md text-[10px] text-center text-white font-bold">
                        Riya (Team A)
                      </div>
                    </div>

                    <div className="relative rounded-2xl overflow-hidden aspect-[3/4] border-2 border-fuchsia-500">
                      <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80"
                        alt="Host 2"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-2 inset-x-2 p-1.5 rounded-lg bg-black/60 backdrop-blur-md text-[10px] text-center text-white font-bold">
                        Kabir (Team B)
                      </div>
                    </div>
                  </div>

                  {/* Battle score bar */}
                  <div className="mt-4 space-y-1">
                    <div className="flex justify-between text-xs font-black">
                      <span className="text-violet-400">142,500 pts</span>
                      <span className="text-fuchsia-400">128,900 pts</span>
                    </div>
                    <div className="h-2.5 rounded-full bg-slate-800 overflow-hidden flex">
                      <div className="h-full bg-gradient-to-r from-violet-600 to-indigo-600" style={{ width: '53%' }} />
                      <div className="h-full bg-gradient-to-r from-pink-600 to-fuchsia-600" style={{ width: '47%' }} />
                    </div>
                  </div>
                </div>
              )}

              {/* ═══ TAB 3: 3D INTERACTIVE AVATAR STUDIO ═══ */}
              {activeHeroTab === '3d' && (
                <div className="rounded-3xl glass-card border border-white/20 shadow-2xl p-4 sm:p-5 relative bg-slate-950/90 backdrop-blur-2xl">
                  <div className="flex items-center justify-between mb-3">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Interactive 3D Stage</span>
                    </div>
                    <span className="text-[11px] text-slate-400 font-medium">WebGL Hardware Render</span>
                  </div>

                  <div className="rounded-2xl overflow-hidden border border-white/10 bg-slate-950">
                    <Meshy3DViewer
                      initialPreset="gem"
                      height="380px"
                      showControls={true}
                      autoRotate={true}
                    />
                  </div>
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* ═══ ANIMATED STATISTICS STRIP ═══ */}
        <motion.div
          initial={{ opacity: 1, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '600px 0px 200px 0px' }}
          transition={{ duration: 0.6 }}
          className="mt-16 sm:mt-20 pt-10 border-t border-white/10"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              { value: 10, suffix: 'M+', label: 'Global Downloads', subtext: 'Across iOS & Android', color: 'from-violet-500 to-fuchsia-500' },
              { value: 500, suffix: 'K+', label: 'Active Broadcasters', subtext: 'Live every day', color: 'from-fuchsia-500 to-pink-500' },
              { value: 150, suffix: '+', label: 'Countries Reached', subtext: 'Worldwide community', color: 'from-cyan-500 to-blue-500' },
              { value: 25, prefix: '$', suffix: 'M+', label: 'Creator Payouts', subtext: 'Earned by hosts', color: 'from-amber-500 to-orange-500' },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 1, y: 4 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '600px 0px 200px 0px' }}
                transition={{ delay: idx * 0.1 }}
                className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md text-center hover-glow hover-lift transition-all group"
              >
                <div className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  <CountUpNumber
                    end={stat.value}
                    prefix={stat.prefix || ''}
                    suffix={stat.suffix}
                    duration={2000 + idx * 300}
                  />
                </div>
                <div className="text-sm font-semibold text-white mt-1">
                  {stat.label}
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  {stat.subtext}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default React.memo(Hero);
