import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Sparkles, Coins, ArrowRight, Star, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import { VIRTUAL_GIFTS } from '../../data/dreamLiveContent';
import Button from '../common/Button';
import SplitText from '../animations/SplitText';
import BlurText from '../animations/BlurText';
import GradientText from '../animations/GradientText';
import FadeContent from '../animations/FadeContent';
import ScrollReveal from '../animations/ScrollReveal';
import TiltedCard from '../animations/TiltedCard';
import GlareHover from '../animations/GlareHover';
import Magnet from '../animations/Magnet';
import Floating3DObject from '../3d/Floating3DObject';

const RARITY_TIERS = {
  common: { label: 'Common', color: 'text-slate-200', bgColor: 'bg-slate-500/20', borderClass: 'gift-tier-common', threshold: 100 },
  rare: { label: 'Rare', color: 'text-blue-300', bgColor: 'bg-blue-500/20', borderClass: 'gift-tier-rare', threshold: 1000 },
  epic: { label: 'Epic', color: 'text-violet-300', bgColor: 'bg-violet-500/20', borderClass: 'gift-tier-epic', threshold: 5000 },
  legendary: { label: 'Legendary', color: 'text-amber-300', bgColor: 'bg-amber-500/20', borderClass: 'gift-tier-legendary', threshold: Infinity },
};

const getGiftRarity = (coins) => {
  if (coins <= RARITY_TIERS.common.threshold) return RARITY_TIERS.common;
  if (coins <= RARITY_TIERS.rare.threshold) return RARITY_TIERS.rare;
  if (coins <= RARITY_TIERS.epic.threshold) return RARITY_TIERS.epic;
  return RARITY_TIERS.legendary;
};

export const VirtualGifts = ({ onOpenDownload }) => {
  const [selectedGift, setSelectedGift] = useState(VIRTUAL_GIFTS[1]);
  const [lastSent, setLastSent] = useState(null);

  const triggerGiftEffect = (gift) => {
    setSelectedGift(gift);
    setLastSent(gift);

    const count = gift.coins > 5000 ? 150 : gift.coins > 1000 ? 90 : 45;
    confetti({
      particleCount: count,
      spread: 80,
      origin: { y: 0.65 },
      colors: ['#a855f7', '#ec4899', '#38bdf8', '#f59e0b'],
    });

    setTimeout(() => {
      setLastSent(null);
    }, 2500);
  };

  return (
    <section id="gifts" className="py-20 relative z-10 overflow-hidden section-stable">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading with React Bits Animations */}
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-950/80 border border-amber-400/40 text-amber-200 text-xs font-bold uppercase tracking-wider backdrop-blur-xl shadow-lg">
            <Gift className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
            <span>Virtual Gifting Economy</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            <span className="text-title-primary">
              <SplitText text="Send Spectacular 3D Gifts &" />
            </span>{' '}
            <GradientText className="font-black drop-shadow-[0_2px_14px_rgba(168,85,247,0.4)]">
              Empower Creators
            </GradientText>
          </h2>

          <FadeContent blur={true} duration={0.8} delay={0.15}>
            <BlurText
              text="Express your fandom and appreciation in real time with over 200+ interactive animated 3D gifts that convert directly into creator earnings."
              className="text-base sm:text-lg text-slate-200 font-medium leading-relaxed max-w-2xl mx-auto text-shadow-subtle"
              delay={0.1}
            />
          </FadeContent>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

          {/* Left: Gift Grid with GlareHover */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
              {VIRTUAL_GIFTS.map((gift) => {
                const rarity = getGiftRarity(gift.coins);
                const isSelected = selectedGift.id === gift.id;

                return (
                  <GlareHover
                    key={gift.id}
                    glareColor="rgba(255, 255, 255, 0.2)"
                    glareSize={200}
                    borderRadius="24px"
                    className="h-full"
                  >
                    <motion.div
                      whileHover={{ scale: 1.03, y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => triggerGiftEffect(gift)}
                      className={`relative p-5 rounded-3xl cursor-pointer transition-all duration-300 flex flex-col items-center text-center h-full ${
                        isSelected
                          ? 'bg-slate-950/90 border-2 border-amber-400 shadow-2xl shadow-amber-500/30 backdrop-blur-2xl'
                          : 'bg-slate-950/80 border border-white/20 hover:border-amber-400/50 backdrop-blur-xl shadow-xl'
                      }`}
                    >
                      {/* Rarity Badge */}
                      <div className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${rarity.bgColor} ${rarity.color} border border-current/30 shadow-sm`}>
                        {rarity.label}
                      </div>

                      {/* Gift Icon */}
                      <motion.div
                        animate={isSelected ? { rotate: [0, -10, 10, 0], scale: [1, 1.2, 1] } : {}}
                        transition={{ duration: 0.5 }}
                        className="text-4xl sm:text-5xl my-2 drop-shadow-md"
                      >
                        {gift.icon}
                      </motion.div>

                      <h4 className="text-sm sm:text-base font-bold text-white mt-1 text-shadow-contrast">
                        {gift.name}
                      </h4>

                      {/* Coin Price with animated icon */}
                      <div className="inline-flex items-center gap-1 mt-1 text-xs font-bold text-amber-300 text-shadow-subtle">
                        <Coins className="w-3.5 h-3.5 animate-pulse" />
                        <span>{gift.coins.toLocaleString()} Coins</span>
                      </div>

                      {/* Visual Effect */}
                      <span className="text-[10px] text-slate-300 mt-2 font-medium text-shadow-subtle">
                        {gift.effect}
                      </span>

                      {/* CTA pill */}
                      <span className="mt-3 px-2.5 py-0.5 rounded-full bg-violet-600/30 text-violet-200 text-[10px] font-bold border border-violet-400/40 flex items-center gap-1 shadow-sm">
                        <Zap className="w-2.5 h-2.5" />
                        Tap to Send
                      </span>
                    </motion.div>
                  </GlareHover>
                );
              })}
            </div>
          </div>

          {/* Right: Gift Preview Panel with High Local Contrast */}
          <div className="lg:col-span-5">
            <div className="p-6 sm:p-8 rounded-3xl glass-panel-glow border border-white/25 space-y-6 bg-slate-950/85 backdrop-blur-2xl shadow-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider text-shadow-subtle">
                  <Sparkles className="w-4 h-4 animate-pulse text-amber-400" />
                  Live Effect Simulation
                </div>
                <span className="text-xs text-slate-300 text-shadow-subtle">Tap any gift on left</span>
              </div>

              {/* Showcase Box */}
              <div className="relative aspect-[4/3] rounded-2xl bg-slate-950/95 border border-white/15 flex flex-col items-center justify-center p-6 text-center overflow-hidden shadow-inner">
                {/* 3D floating shape */}
                <div className="absolute -top-4 -right-4 opacity-30 pointer-events-none">
                  <Floating3DObject shape="octahedron" color="#f59e0b" size={100} wireframe={true} />
                </div>

                <motion.div
                  key={selectedGift.id}
                  initial={{ scale: 0.5, opacity: 0, rotate: -20 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  transition={{ type: 'spring', damping: 12 }}
                  className="text-6xl sm:text-7xl mb-3 drop-shadow-[0_0_30px_rgba(245,158,11,0.6)]"
                >
                  {selectedGift.icon}
                </motion.div>
                <h3 className="text-2xl font-black text-white text-shadow-contrast">
                  {selectedGift.name}
                </h3>
                <p className="text-xs text-amber-300 font-bold mt-1 flex items-center gap-1 text-shadow-subtle">
                  <Coins className="w-3.5 h-3.5" />
                  Cost: {selectedGift.coins.toLocaleString()} DreamLive Coins
                </p>
                <div className="mt-2 flex items-center gap-1.5">
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${getGiftRarity(selectedGift.coins).bgColor} ${getGiftRarity(selectedGift.coins).color} border border-current/30`}>
                    {getGiftRarity(selectedGift.coins).label}
                  </span>
                  <span className="text-xs text-slate-200 font-medium text-shadow-subtle">{selectedGift.effect}</span>
                </div>

                {/* Sent notification overlay */}
                <AnimatePresence>
                  {lastSent && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      className="absolute inset-0 bg-slate-950/98 backdrop-blur-xl flex flex-col items-center justify-center p-4 z-20"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 0.4 }}
                        className="text-5xl mb-2"
                      >
                        {lastSent.icon}
                      </motion.div>
                      <span className="text-lg font-black text-amber-300 flex items-center gap-2 text-shadow-contrast">
                        <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                        {lastSent.name} Sent!
                      </span>
                      <span className="text-xs text-slate-200 mt-1 text-shadow-subtle">
                        Creator receives {Math.floor(lastSent.coins * 0.7).toLocaleString()} Diamonds
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Feature bullets with high contrast */}
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                  <div className="w-5 h-5 rounded-full bg-violet-500/30 text-violet-200 flex items-center justify-center shrink-0 mt-0.5 font-bold border border-violet-400/40">
                    ✓
                  </div>
                  <span className="text-shadow-subtle">
                    <strong className="text-white font-bold">Instant Host Conversion:</strong> Coins convert to withdrawable Beans/Diamonds with direct bank payouts.
                  </span>
                </div>
                <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                  <div className="w-5 h-5 rounded-full bg-fuchsia-500/30 text-fuchsia-200 flex items-center justify-center shrink-0 mt-0.5 font-bold border border-fuchsia-400/40">
                    ✓
                  </div>
                  <span className="text-shadow-subtle">
                    <strong className="text-white font-bold">VIP Badges & Leaderboards:</strong> Top gifters gain exclusive avatar rings, chat colors, and room entry fireworks.
                  </span>
                </div>
              </div>

              <Magnet strength={12}>
                <Button
                  variant="gold"
                  size="md"
                  className="w-full font-bold shadow-xl shadow-amber-600/30"
                  onClick={onOpenDownload}
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  Recharge Coins in App
                </Button>
              </Magnet>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(VirtualGifts);
