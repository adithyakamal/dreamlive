import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mic, Radio, Users2, Sparkles, Camera, CameraOff, Volume2, ShieldCheck, Flame } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const GoLiveModal = ({ isOpen, onClose }) => {
  const { showToast } = useApp();
  const [broadcastType, setBroadcastType] = useState('video'); // 'video' or 'audio'
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Music');
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isBroadcasting, setIsBroadcasting] = useState(false);

  if (!isOpen) return null;

  const handleStartBroadcast = (e) => {
    e.preventDefault();
    setIsBroadcasting(true);
    showToast('Starting DreamLive Broadcast Stream...');
    setTimeout(() => {
      setIsBroadcasting(false);
      showToast('You are now LIVE on DreamLive! 🔴');
      onClose();
    }, 1500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 25 }}
          className="relative w-full max-w-md bg-[#0c0d16] border border-fuchsia-500/30 rounded-3xl overflow-hidden shadow-2xl shadow-purple-950/60 z-10 my-auto text-slate-100"
        >
          {/* Header */}
          <div className="p-5 bg-gradient-to-r from-violet-900/40 via-fuchsia-900/40 to-pink-900/40 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-violet-600 via-fuchsia-600 to-pink-600 flex items-center justify-center text-white shadow-lg shadow-fuchsia-600/30 animate-pulse">
                <Radio className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-black text-white">Go Live Studio</h2>
                <p className="text-[11px] text-fuchsia-200">Start Your Stream</p>
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
          <div className="p-5 sm:p-6 space-y-5">
            
            {/* Stream Mode Selection */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setBroadcastType('video')}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                  broadcastType === 'video'
                    ? 'bg-gradient-to-tr from-violet-600/30 to-fuchsia-600/30 border-fuchsia-500 shadow-lg shadow-fuchsia-600/20 text-white'
                    : 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-fuchsia-500/20 flex items-center justify-center text-fuchsia-400">
                  <Camera className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Video Live</div>
                  <div className="text-[10px] text-slate-400">HD Camera Stream</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setBroadcastType('audio')}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                  broadcastType === 'audio'
                    ? 'bg-gradient-to-tr from-violet-600/30 to-fuchsia-600/30 border-fuchsia-500 shadow-lg shadow-fuchsia-600/20 text-white'
                    : 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center text-violet-400">
                  <Users2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Voice Party</div>
                  <div className="text-[10px] text-slate-400">9-Seat Audio Room</div>
                </div>
              </button>
            </div>

            {/* Stream Settings Form */}
            <form onSubmit={handleStartBroadcast} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Room Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Acoustic Vibes & Late Night Singing 🎸✨"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-fuchsia-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Broadcasting Category</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Music', 'Party', 'PK Duel', 'Chat', 'Gaming', 'Dance'].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={`py-1.5 px-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        category === cat
                          ? 'bg-fuchsia-600/30 border-fuchsia-500 text-fuchsia-200'
                          : 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Hardware Preview Toggle */}
              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/8 flex items-center justify-between text-xs">
                <span className="text-slate-300">Enable HD Camera Preview</span>
                <button
                  type="button"
                  onClick={() => setIsCameraOn(!isCameraOn)}
                  className={`p-1.5 rounded-full cursor-pointer transition-colors ${
                    isCameraOn ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-white/10 text-slate-400'
                  }`}
                >
                  {isCameraOn ? <Camera className="w-4 h-4" /> : <CameraOff className="w-4 h-4" />}
                </button>
              </div>

              {/* Go Live Action */}
              <button
                type="submit"
                disabled={isBroadcasting}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white font-black text-sm shadow-xl shadow-fuchsia-600/40 transition-all cursor-pointer hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <Radio className="w-4 h-4 animate-pulse" />
                <span>{isBroadcasting ? 'Connecting Stream...' : 'Start Live Broadcast'}</span>
              </button>
            </form>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default GoLiveModal;
