import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy, Sparkles, Zap, Award, CheckCircle2, ChevronRight, BarChart2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LevelModal = ({ isOpen, onClose }) => {
  const { profileData } = useApp();

  if (!isOpen) return null;

  const currentXp = 120;
  const targetXp = 500;
  const progressPercent = (currentXp / targetXp) * 100;

  const xpTasks = [
    { title: 'Daily Check-In', xp: '+20 XP', desc: 'Log in and claim your daily reward', completed: true },
    { title: 'Watch Live Streams (15 mins)', xp: '+50 XP', desc: 'Interact in any creator live broadcast', completed: false },
    { title: 'Send a Virtual Gift', xp: '+100 XP', desc: 'Send any gift to your favorite host', completed: false },
    { title: 'Chat in 3 Different Rooms', xp: '+30 XP', desc: 'Leave comments in public chatrooms', completed: true },
    { title: 'Go Live or Join Voice Seat', xp: '+150 XP', desc: 'Start streaming or speak in a 9-seat voice room', completed: false },
  ];

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
          className="relative w-full max-w-lg bg-[#0e0a1a] border border-orange-500/30 rounded-3xl overflow-hidden shadow-2xl shadow-orange-950/40 z-10 my-auto text-slate-100 max-h-[90vh] flex flex-col"
        >
          {/* Header Banner */}
          <div className="relative p-6 bg-gradient-to-r from-amber-600/30 via-orange-600/20 to-amber-900/30 border-b border-orange-500/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/30">
                <BarChart2 className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-black text-white">Level &amp; Experience</h2>
                <p className="text-xs text-orange-200">Current Level Status</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-black/50 hover:bg-black/80 text-white/80 hover:text-white border border-white/10 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Content Area */}
          <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
            
            {/* Level Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-tr from-[#1b122c] to-[#2a133d] border border-amber-500/30 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">Current Level</span>
                  <div className="text-3xl font-black text-white flex items-center gap-2">
                    <span>{profileData.level}</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      Rookie Broadcaster
                    </span>
                  </div>
                </div>
                <div className="w-14 h-14 rounded-full bg-amber-500/15 border-2 border-amber-400 flex items-center justify-center text-amber-300 font-black text-xl shadow-inner">
                  01
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Progress to Lv.02</span>
                  <span className="font-bold text-amber-300">{currentXp} / {targetXp} XP</span>
                </div>
                <div className="w-full h-3 rounded-full bg-black/60 overflow-hidden border border-white/10 p-0.5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="h-full rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-400 shadow-lg shadow-orange-500/50"
                  />
                </div>
                <p className="text-[11px] text-slate-400 text-right">380 XP needed for Next Level</p>
              </div>

              {/* Next Level Perks */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Next: <strong>Lv.02 Bronze Badge</strong> &amp; Custom Entry Glow</span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">Lv.02</span>
              </div>
            </div>

            {/* Daily XP Tasks */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Zap className="w-4 h-4 text-orange-400" />
                <span>Ways to Earn Experience (XP)</span>
              </h3>

              <div className="space-y-2">
                {xpTasks.map((task, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-white/[0.03] border border-white/8 hover:border-orange-500/30 transition-colors flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{task.title}</span>
                        <span className="text-[10px] font-extrabold px-1.5 py-0.2 rounded bg-orange-500/20 text-orange-300">
                          {task.xp}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 truncate">{task.desc}</p>
                    </div>

                    {task.completed ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 shrink-0">
                        <CheckCircle2 className="w-4 h-4" />
                        Done
                      </span>
                    ) : (
                      <button
                        onClick={onClose}
                        className="px-3 py-1 rounded-full bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 text-xs font-bold border border-orange-500/30 transition-colors cursor-pointer shrink-0"
                      >
                        Go
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default LevelModal;
