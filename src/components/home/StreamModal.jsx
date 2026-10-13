import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Send, Volume2, VolumeX, Sparkles, Gift, Users, ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';
import LiveBadge from '../common/LiveBadge';
import { VIRTUAL_GIFTS } from '../../data/dreamLiveContent';

// Fallback gifts array in case of module export edge-cases
const DEFAULT_FALLBACK_GIFTS = [
  { id: 'gift-rose', name: 'Neon Rose', icon: '🌹', coins: 10 },
  { id: 'gift-heart', name: 'Diamond Heart', icon: '💎', coins: 50 },
  { id: 'gift-crown', name: 'Imperial Crown', icon: '👑', coins: 200 },
  { id: 'gift-rocket', name: 'Galaxy Rocket', icon: '🚀', coins: 500 },
  { id: 'gift-dragon', name: 'Dragon Sovereign', icon: '🐉', coins: 2000 },
];

// Memoized video element to isolate playback from modal comments/hearts state
const ModalStreamVideoPlayer = React.memo(({ videoRef, src }) => {
  return (
    <video
      ref={videoRef}
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      controls={false}
      className="absolute inset-0 w-full h-full object-cover object-center block"
    />
  );
});

export const StreamModal = ({ stream, onClose }) => {
  const videoRef = useRef(null);
  const [comments, setComments] = useState([
    { id: 1, user: 'Pooja_Mumbai', text: 'Welcome everyone! Tap hearts on screen ❤️', time: '12s ago' },
    { id: 2, user: 'Rahul_Dance', text: 'Insane talent!! 🔥🔥', time: '8s ago' },
    { id: 3, user: 'VIP_Karan', text: 'Sent 5x Imperial Crowns 👑', isGift: true },
    { id: 4, user: 'Sneha_Goa', text: 'Which city are you broadcasting from?', time: '2s ago' },
  ]);
  const [inputText, setInputText] = useState('');
  const [isMuted, setIsMuted] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [heartsCount, setHeartsCount] = useState(24500);
  const [activeGiftBanner, setActiveGiftBanner] = useState(null);
  const [floatingHearts, setFloatingHearts] = useState([]);

  const availableGifts = (Array.isArray(VIRTUAL_GIFTS) && VIRTUAL_GIFTS.length > 0)
    ? VIRTUAL_GIFTS
    : DEFAULT_FALLBACK_GIFTS;

  // Auto-scroll simulation for live comments
  useEffect(() => {
    const timer = setInterval(() => {
      const randomComments = [
        'Awesome energy! ✨',
        'Sent Supercar 🏎️💨',
        'Top broadcaster on DreamLive! 🏆',
        'Keep going Riya! 💖',
        'Greetings from Bengaluru! 👋',
      ];
      const randomText = randomComments[Math.floor(Math.random() * randomComments.length)];
      setComments((prev) => [
        ...prev.slice(-15),
        {
          id: Date.now(),
          user: `User_${Math.floor(Math.random() * 899 + 100)}`,
          text: randomText,
          isGift: randomText.includes('Supercar'),
        },
      ]);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Pause background video while modal is active; resume on modal close
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('dreamlive-pause-bg-video'));
    return () => {
      window.dispatchEvent(new CustomEvent('dreamlive-resume-bg-video'));
    };
  }, []);

  // Ensure immediate video playback on modal opening
  useEffect(() => {
    if (videoRef.current && stream) {
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
  }, [stream, isMuted]);

  const handleToggleSound = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (videoRef.current) {
      videoRef.current.muted = nextMuted;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleSendComment = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    setComments((prev) => [
      ...prev,
      {
        id: Date.now(),
        user: 'You (Viewer)',
        text: inputText.trim(),
        isOwn: true,
      },
    ]);
    setInputText('');
  };

  const handleSendHeart = () => {
    setHeartsCount((prev) => prev + 1);
    const newHeart = {
      id: Date.now() + Math.random(),
      left: Math.floor(Math.random() * 60) + 20,
      drift: (Math.random() - 0.5) * 60,
    };
    setFloatingHearts((prev) => [...prev.slice(-12), newHeart]);
  };

  const handleSendGift = (gift) => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
    setActiveGiftBanner(`Sent ${gift.name} ${gift.icon}`);
    setComments((prev) => [
      ...prev,
      {
        id: Date.now(),
        user: 'You (Viewer)',
        text: `Sent ${gift.name} (${gift.coins} Coins) ${gift.icon}`,
        isGift: true,
      },
    ]);

    setTimeout(() => {
      setActiveGiftBanner(null);
    }, 3500);
  };

  if (!stream) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/90 backdrop-blur-xl"
      />

      {/* Main Theater Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative w-full max-w-5xl h-[92vh] max-h-[820px] rounded-3xl glass-panel-glow border border-white/20 overflow-hidden shadow-2xl z-10 flex flex-col lg:flex-row"
      >
        {/* Prominent Global Close Button (Top Right) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-40 p-2.5 rounded-full bg-black/85 hover:bg-rose-600 text-white/90 hover:text-white border border-white/20 hover:border-rose-400 transition-all cursor-pointer shadow-xl hover:scale-110 active:scale-95"
          aria-label="Close Stream"
          title="Close Live Stream"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Real Video Broadcast Stage */}
        <div className="relative flex-1 bg-slate-950 flex items-center justify-center overflow-hidden min-h-[240px] sm:min-h-[300px] lg:min-h-full">
          {/* Memoized Real Video Broadcast Stage */}
          <ModalStreamVideoPlayer videoRef={videoRef} src={stream?.video || '/7914841-hd_1280_720_30fps.mp4'} />

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/70 pointer-events-none" />

          {/* Top Live Bar inside Video Stage */}
          <div className="absolute top-4 left-4 right-16 flex items-center justify-between z-20">
            {/* Host Pill & Mobile Close */}
            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="lg:hidden p-2 rounded-full bg-black/70 hover:bg-black text-white border border-white/15 backdrop-blur-md cursor-pointer transition-colors shadow-md"
                aria-label="Back"
                title="Back to Streams"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2.5 p-1.5 pr-4 rounded-full bg-black/70 border border-white/15 backdrop-blur-md">
                <img
                  src={stream.avatar}
                  alt={stream.name}
                  className="w-9 h-9 rounded-full object-cover border-2 border-fuchsia-400"
                />
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-white truncate max-w-[120px]">
                      {stream.name}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                      {stream.level || 'Lv. 64'}
                    </span>
                  </div>
                  <span className="text-[10px] text-fuchsia-300 font-medium">
                    {stream.viewers || '18.4K'} viewers
                  </span>
                </div>

                <button
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={`ml-2 px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                    isFollowing
                      ? 'bg-white/10 text-slate-300 border border-white/20'
                      : 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-md'
                  }`}
                >
                  {isFollowing ? 'Following' : '+ Follow'}
                </button>
              </div>
            </div>

            {/* Right Controls: Live Badge + Sound Toggle */}
            <div className="flex items-center gap-2">
              <LiveBadge viewers={stream.viewers} />
              <button
                onClick={handleToggleSound}
                className="p-2 rounded-full bg-black/70 hover:bg-black text-white border border-white/15 backdrop-blur-md cursor-pointer transition-colors shadow-md"
                aria-label="Toggle Sound"
                title={isMuted ? 'Unmute Live Audio' : 'Mute Live Audio'}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" />}
              </button>
            </div>
          </div>

          {/* Active Gift Banner Animation */}
          <AnimatePresence>
            {activeGiftBanner && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                className="absolute top-20 inset-x-0 mx-auto w-max max-w-[90%] px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500/90 via-fuchsia-600/90 to-purple-600/90 text-white font-extrabold text-xs sm:text-sm shadow-2xl border border-amber-300/50 backdrop-blur-md z-30 flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-yellow-300 animate-spin" />
                <span>{activeGiftBanner}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating Tap Hearts Overlay */}
          <div
            onClick={handleSendHeart}
            className="absolute inset-0 z-10 cursor-pointer overflow-hidden"
          >
            <AnimatePresence>
              {floatingHearts.map((heart) => (
                <motion.div
                  key={heart.id}
                  initial={{ opacity: 1, y: 0, x: 0, scale: 0.8 }}
                  animate={{
                    opacity: 0,
                    y: -220,
                    x: heart.drift,
                    scale: 1.4,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.8, ease: 'easeOut' }}
                  style={{ left: `${heart.left}%`, bottom: '20%' }}
                  className="absolute pointer-events-none text-2xl text-rose-500 select-none drop-shadow-lg"
                >
                  ❤️
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Bottom Left Quick Actions (Tap Hearts Counter) */}
          <div className="absolute bottom-4 left-4 z-20 flex items-center gap-3">
            <button
              onClick={handleSendHeart}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 hover:bg-rose-500/30 border border-white/20 text-xs font-bold text-white backdrop-blur-md transition-all cursor-pointer active:scale-90 shadow-lg"
            >
              <Heart className="w-4 h-4 fill-rose-500 text-rose-500 animate-pulse" />
              <span>{(heartsCount / 1000).toFixed(1)}K</span>
            </button>
          </div>
        </div>

        {/* Right Side: Interactive Live Chat & Virtual Gifts Sidebar */}
        <div className="w-full lg:w-80 xl:w-96 bg-[#0c0d18]/95 border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col justify-between h-64 sm:h-72 lg:h-full z-20 shrink-0">
          {/* Chat Header */}
          <div className="p-3.5 border-b border-white/10 flex items-center justify-between bg-black/40">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-fuchsia-400" />
              <span className="text-xs font-bold text-white">Live Audience Chat</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
              Low Latency
            </span>
          </div>

          {/* Live Comment Stream */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2 text-xs scrollbar-thin">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className={`p-2 rounded-xl border transition-all ${
                  comment.isGift
                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-200'
                    : comment.isOwn
                    ? 'bg-fuchsia-600/20 border-fuchsia-500/40 text-fuchsia-100 ml-2'
                    : 'bg-white/5 border-white/5 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] mb-0.5">
                  <span className="font-bold text-violet-300">{comment.user}</span>
                  {comment.time && (
                    <span className="text-[9px] text-slate-500">{comment.time}</span>
                  )}
                </div>
                <p className="font-medium leading-relaxed">{comment.text}</p>
              </div>
            ))}
          </div>

          {/* Virtual Gifts Quick Bar */}
          <div className="p-3 border-t border-white/10 bg-black/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                <Gift className="w-3.5 h-3.5 text-amber-400" /> Send Virtual Gift
              </span>
              <span className="text-[10px] text-amber-300 font-extrabold">
                Balance: 2,450 Coins 💎
              </span>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {availableGifts.slice(0, 5).map((gift) => (
                <button
                  key={gift.id}
                  onClick={() => handleSendGift(gift)}
                  className="flex flex-col items-center p-1.5 rounded-xl bg-white/5 hover:bg-violet-500/20 border border-white/10 hover:border-violet-500/40 transition-all shrink-0 cursor-pointer min-w-[56px] group"
                >
                  <span className="text-xl group-hover:scale-125 transition-transform">
                    {gift.icon}
                  </span>
                  <span className="text-[9px] text-slate-300 font-bold mt-0.5">
                    {gift.coins}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Comment Input Form */}
          <form
            onSubmit={handleSendComment}
            className="p-3 bg-black/60 border-t border-white/10 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Send a supportive message..."
              className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors"
            />
            <button
              type="submit"
              className="p-2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-md hover:scale-105 transition-transform cursor-pointer"
              aria-label="Send Message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default StreamModal;
