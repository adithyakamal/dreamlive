import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Swords, Flame, Timer, Zap, Crown, Users } from 'lucide-react';
import confetti from 'canvas-confetti';
import LiveBadge from '../common/LiveBadge';
import SplitText from '../animations/SplitText';
import BlurText from '../animations/BlurText';
import GradientText from '../animations/GradientText';
import FadeContent from '../animations/FadeContent';
import ScrollReveal from '../animations/ScrollReveal';
import Magnet from '../animations/Magnet';
import GlareHover from '../animations/GlareHover';

export const PKBattleShowcase = () => {
  const [blueScore, setBlueScore] = useState(142500);
  const [redScore, setRedScore] = useState(128900);
  const [lastVote, setLastVote] = useState(null);

  const total = blueScore + redScore;
  const bluePercent = Math.round((blueScore / total) * 100);
  const redPercent = 100 - bluePercent;

  const handleVote = (team) => {
    if (team === 'blue') {
      setBlueScore((prev) => prev + 5000);
    } else {
      setRedScore((prev) => prev + 5000);
    }

    setLastVote(team);
    setTimeout(() => setLastVote(null), 600);

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 },
      colors: team === 'blue' ? ['#06b6d4', '#3b82f6', '#ffffff'] : ['#f43f5e', '#fb7185', '#ffffff'],
    });
  };

  return (
    <section id="pk" className="py-20 relative z-10 section-stable">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading with React Bits Animations */}
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-950/80 border border-rose-400/40 text-rose-200 text-xs font-bold uppercase tracking-wider backdrop-blur-xl shadow-lg">
            <Swords className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
            <span>High-Stakes Live Showdown</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            <span className="text-title-primary">
              <SplitText text="Epic Broadcaster" />
            </span>{' '}
            <GradientText className="font-black drop-shadow-[0_2px_14px_rgba(168,85,247,0.4)]">
              PK Battle Duels
            </GradientText>
          </h2>

          <FadeContent blur={true} duration={0.8} delay={0.15}>
            <BlurText
              text="Two broadcasters, one live interactive split-screen stage, and an electric audience. Send gifts to push the dynamic duel gauge and propel your creator to victory!"
              className="text-base sm:text-lg text-slate-200 font-medium leading-relaxed max-w-2xl mx-auto text-shadow-subtle"
              delay={0.1}
            />
          </FadeContent>
        </ScrollReveal>

        {/* PK Battle Arena with Local Glass Contrast */}
        <ScrollReveal delay={0.15}>
          <div className="relative rounded-3xl glass-panel-glow p-4 sm:p-8 border border-white/25 shadow-2xl overflow-hidden bg-slate-950/85 backdrop-blur-2xl">

            {/* Top Battle Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/15">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-400 to-rose-600 flex items-center justify-center font-black text-slate-950 text-xl shadow-lg shadow-rose-600/40 animate-pulse-glow">
                  PK
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 text-shadow-contrast">
                    Grand Championship Battle
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-500/30 text-rose-200 border border-rose-500/50 font-bold animate-pulse shadow-sm">
                      Round 3/3
                    </span>
                  </h3>
                  <p className="text-xs text-slate-300 flex items-center gap-2 text-shadow-subtle">
                    <Users className="w-3 h-3 text-fuchsia-400" />
                    54K viewers watching this battle live
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/80 border border-white/20 text-xs font-bold text-amber-300 backdrop-blur-xl shadow-lg">
                <Timer className="w-4 h-4 animate-spin" style={{ animationDuration: '3s' }} />
                <span>Time Remaining: 02:45</span>
              </div>
            </div>

            {/* Animated VS Separator */}
            <div className="flex items-center justify-center py-4">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent" />
              <motion.div
                animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mx-4 w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 via-orange-500 to-rose-600 flex items-center justify-center text-xl font-black text-slate-950 shadow-2xl shadow-amber-500/50 border-2 border-white/40"
              >
                VS
              </motion.div>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-rose-500/60 to-transparent" />
            </div>

            {/* Score Display */}
            <div className="py-4 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-xs sm:text-sm font-black px-1">
                <span className="text-cyan-300 flex items-center gap-1.5 text-shadow-subtle">
                  <Zap className="w-4 h-4 text-cyan-400" /> TEAM BLUE: {blueScore.toLocaleString()} pts ({bluePercent}%)
                </span>
                <span className="text-rose-300 flex items-center gap-1.5 text-shadow-subtle">
                  TEAM RED: {redScore.toLocaleString()} pts ({redPercent}%) <Flame className="w-4 h-4 text-rose-400" />
                </span>
              </div>

              {/* Duel Progress Bar with Glow Edge */}
              <div className="relative h-8 sm:h-10 rounded-full bg-slate-900 overflow-hidden border border-white/20 flex p-0.5 shadow-inner">
                <motion.div
                  animate={{ width: `${bluePercent}%` }}
                  transition={{ type: 'spring', damping: 20 }}
                  className="h-full bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 rounded-l-full flex items-center justify-start pl-3 text-[10px] sm:text-xs font-black text-slate-950 shadow-md relative"
                >
                  TEAM BLUE
                  <div className="absolute right-0 top-0 bottom-0 w-3 bg-gradient-to-r from-transparent to-cyan-300/80 blur-sm" />
                </motion.div>
                <motion.div
                  animate={{ width: `${redPercent}%` }}
                  transition={{ type: 'spring', damping: 20 }}
                  className="h-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 rounded-r-full flex items-center justify-end pr-3 text-[10px] sm:text-xs font-black text-white shadow-md relative"
                >
                  TEAM RED
                  <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-l from-transparent to-rose-300/80 blur-sm" />
                </motion.div>
              </div>
            </div>

            {/* Split Screen Battle Stage with GlareHover */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">

              {/* Host Blue */}
              <GlareHover
                borderRadius="16px"
                glareColor="rgba(6, 182, 212, 0.25)"
                className="h-full"
              >
                <motion.div
                  animate={lastVote === 'blue' ? { scale: [1, 1.02, 1] } : {}}
                  className="relative rounded-2xl overflow-hidden glass-panel border-2 border-cyan-500/60 p-4 flex flex-col justify-between aspect-[16/11] sm:aspect-[16/10] bg-slate-950 group hover:border-cyan-400 transition-colors shadow-xl"
                >
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80"
                    alt="Pooja - Team Blue"
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-transparent to-slate-950/80" />

                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-2 p-1 px-3 rounded-full bg-black/80 border border-cyan-500/50 backdrop-blur-md shadow-md">
                      <Crown className="w-3 h-3 text-cyan-400" />
                      <span className="text-xs font-bold text-cyan-300 text-shadow-subtle">Pooja Sharma</span>
                      <span className="text-[10px] text-slate-300 font-semibold">Lv. 74</span>
                    </div>
                    <LiveBadge viewers="24.8K" pulseColor="bg-cyan-400" />
                  </div>

                  <div className="relative z-10 flex items-center justify-between pt-4">
                    <div className="text-xs font-bold text-slate-100 text-shadow-subtle flex items-center gap-1">
                      🚀 Top Gift: Galaxy Rocket
                    </div>
                    <Magnet strength={10}>
                      <button
                        onClick={() => handleVote('blue')}
                        className="px-4 py-2 rounded-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs shadow-xl shadow-cyan-500/40 active:scale-95 transition-all cursor-pointer"
                      >
                        ⚡ Vote Blue (+5K)
                      </button>
                    </Magnet>
                  </div>
                </motion.div>
              </GlareHover>

              {/* Host Red */}
              <GlareHover
                borderRadius="16px"
                glareColor="rgba(244, 63, 94, 0.25)"
                className="h-full"
              >
                <motion.div
                  animate={lastVote === 'red' ? { scale: [1, 1.02, 1] } : {}}
                  className="relative rounded-2xl overflow-hidden glass-panel border-2 border-rose-500/60 p-4 flex flex-col justify-between aspect-[16/11] sm:aspect-[16/10] bg-slate-950 group hover:border-rose-400 transition-colors shadow-xl"
                >
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80"
                    alt="Sneha - Team Red"
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-transparent to-slate-950/80" />

                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-2 p-1 px-3 rounded-full bg-black/80 border border-rose-500/50 backdrop-blur-md shadow-md">
                      <Crown className="w-3 h-3 text-rose-400" />
                      <span className="text-xs font-bold text-rose-300 text-shadow-subtle">Sneha Kapoor</span>
                      <span className="text-[10px] text-slate-300 font-semibold">Lv. 82</span>
                    </div>
                    <LiveBadge viewers="29.2K" pulseColor="bg-rose-400" />
                  </div>

                  <div className="relative z-10 flex items-center justify-between pt-4">
                    <div className="text-xs font-bold text-slate-100 text-shadow-subtle flex items-center gap-1">
                      🐉 Top Gift: Sovereign Dragon
                    </div>
                    <Magnet strength={10}>
                      <button
                        onClick={() => handleVote('red')}
                        className="px-4 py-2 rounded-full bg-rose-500 hover:bg-rose-400 text-white font-black text-xs shadow-xl shadow-rose-500/40 active:scale-95 transition-all cursor-pointer"
                      >
                        🔥 Vote Red (+5K)
                      </button>
                    </Magnet>
                  </div>
                </motion.div>
              </GlareHover>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default React.memo(PKBattleShowcase);
