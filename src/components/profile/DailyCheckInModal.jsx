import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Gift, Check, Flame, Coins, Sparkles, Star } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DailyCheckInModal = ({ isOpen, onClose }) => {
  const { dailyCheckIn, claimDailyReward, showToast } = useApp();

  if (!isOpen) return null;

  const checkInDays = [
    { day: 1, reward: 50, label: '+50 Coins', icon: '🪙' },
    { day: 2, reward: 100, label: '+100 Coins', icon: '🎁' },
    { day: 3, reward: 150, label: '+150 Coins', icon: '🌹' },
    { day: 4, reward: 200, label: '+200 Coins', icon: '💎' },
    { day: 5, reward: 250, label: '+250 Coins', icon: '🚀' },
    { day: 6, reward: 300, label: '+300 Coins', icon: '👑' },
    { day: 7, reward: 500, label: '+500 Coins & VIP 1-Day Pass', icon: '🏆', special: true },
  ];

  const handleClaim = (day) => {
    const success = claimDailyReward(day.day, day.reward);
    if (success) {
      showToast(`Claimed Day ${day.day} reward: ${day.label}!`);
    } else {
      showToast(`Day ${day.day} already claimed!`);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          className="relative w-full max-w-lg bg-[#0d0f1c] border border-blue-500/30 rounded-3xl overflow-hidden shadow-2xl shadow-blue-950/50 z-10 my-auto text-slate-100 max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="relative p-6 bg-gradient-to-r from-blue-700/30 via-indigo-700/30 to-blue-900/30 border-b border-blue-500/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-blue-600/30">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-black text-white">Daily Check-In</h2>
                <p className="text-xs text-blue-200">7-Day Streak Rewards</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-black/50 hover:bg-black/80 text-white/80 hover:text-white border border-white/10 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
            
            {/* Streak Counter Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#171c38] via-[#212952] to-[#12162c] border border-blue-500/30 flex items-center justify-between shadow-lg">
              <div className="space-y-1">
                <div className="text-xs font-bold text-blue-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-orange-400 fill-orange-400" />
                  <span>Current Streak</span>
                </div>
                <div className="text-2xl font-black text-white">{dailyCheckIn.streak} Days Active</div>
                <p className="text-[11px] text-slate-400">Check in every day to earn the Day 7 grand reward!</p>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-2xl shadow-inner">
                🎁
              </div>
            </div>

            {/* 7-Day Grid */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">7-Day Reward Matrix</h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {checkInDays.map((day) => {
                  const isClaimed = dailyCheckIn.claimedDays.includes(day.day);
                  const isToday = !isClaimed && (dailyCheckIn.claimedDays.length + 1 === day.day || day.day === 2);

                  return (
                    <div
                      key={day.day}
                      className={`p-3 rounded-2xl border flex flex-col items-center justify-between text-center transition-all ${
                        day.special ? 'col-span-2 sm:col-span-2 bg-gradient-to-r from-amber-950/40 via-yellow-950/40 to-purple-950/40 border-amber-500/50' : ''
                      } ${
                        isClaimed
                          ? 'bg-emerald-950/30 border-emerald-500/40 text-slate-300'
                          : isToday
                          ? 'bg-blue-950/60 border-blue-400 shadow-lg shadow-blue-900/40 text-white animate-pulse'
                          : 'bg-white/[0.03] border-white/10 text-slate-400'
                      }`}
                    >
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                        Day {day.day}
                      </span>

                      <div className="text-3xl my-1">{day.icon}</div>

                      <div className="text-xs font-black text-amber-300 mb-2">
                        {day.label}
                      </div>

                      {isClaimed ? (
                        <div className="w-full py-1 rounded-xl bg-emerald-500/20 text-emerald-300 font-bold text-[10px] flex items-center justify-center gap-1 border border-emerald-500/30">
                          <Check className="w-3 h-3" /> Claimed
                        </div>
                      ) : isToday ? (
                        <button
                          onClick={() => handleClaim(day)}
                          className="w-full py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md cursor-pointer hover:scale-104 transition-all"
                        >
                          Claim Now
                        </button>
                      ) : (
                        <button
                          onClick={() => handleClaim(day)}
                          className="w-full py-1 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 font-bold text-[10px] cursor-pointer"
                        >
                          Claim
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default DailyCheckInModal;
