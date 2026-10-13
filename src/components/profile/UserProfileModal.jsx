import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Copy,
  Check,
  Heart,
  MessageSquare,
  PhoneCall,
  Radio,
  Sparkles,
  ShieldCheck,
  UserCheck,
  UserPlus,
  Flame,
  Award,
  Share2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const UserProfileModal = ({ user, onClose, onJoinLive }) => {
  const { isFollowing, toggleFollow, showToast } = useApp();
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('about');
  const [messageInput, setMessageInput] = useState('');
  const [sentMessages, setSentMessages] = useState([]);

  if (!user) return null;

  const following = isFollowing(user.id);

  const handleCopyId = () => {
    navigator.clipboard.writeText(user.userId || '894120');
    setCopied(true);
    showToast(`User ID ${user.userId || '894120'} copied to clipboard!`);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (messageInput.trim()) {
      setSentMessages((prev) => [
        ...prev,
        { text: messageInput.trim(), time: 'Just now' },
      ]);
      setMessageInput('');
      showToast(`Message sent to ${user.name}!`);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-md bg-[#0c0d16] border border-white/15 rounded-3xl overflow-hidden shadow-2xl shadow-purple-950/50 z-10 my-auto text-slate-100"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 z-20 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white/80 hover:text-white border border-white/10 backdrop-blur-md transition-colors cursor-pointer"
            aria-label="Close user modal"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Banner & Cover Media */}
          <div className="relative h-44 sm:h-52 w-full bg-slate-900 overflow-hidden">
            {user.video ? (
              <video
                src={user.video}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={user.cover}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d16] via-[#0c0d16]/30 to-transparent" />

            {/* Live Indicator on Top */}
            <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-600/90 text-white text-[11px] font-bold border border-rose-400/40 shadow-lg shadow-rose-600/40">
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              <span>LIVE NOW</span>
            </div>
          </div>

          {/* Avatar & User Details */}
          <div className="px-5 sm:px-6 pb-6 -mt-12 relative z-10 space-y-4">
            <div className="flex items-end justify-between gap-3">
              {/* Avatar with glow */}
              <div className="relative">
                <img
                  src={user.cover}
                  alt={user.name}
                  className="w-20 h-20 sm:w-22 sm:h-22 rounded-full object-cover border-3 border-fuchsia-500 shadow-xl shadow-fuchsia-600/30"
                />
                {user.isOnline && (
                  <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#0c0d16] flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pb-1">
                <button
                  onClick={() => {
                    toggleFollow(user.id);
                    showToast(following ? `Unfollowed ${user.name}` : `Followed ${user.name}!`);
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer flex items-center gap-1.5 shadow-md ${
                    following
                      ? 'bg-white/10 hover:bg-white/15 text-slate-300 border border-white/15'
                      : 'bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white shadow-fuchsia-600/30'
                  }`}
                >
                  {following ? (
                    <>
                      <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Following</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-3.5 h-3.5" />
                      <span>+ Follow</span>
                    </>
                  )}
                </button>

                {onJoinLive && (
                  <button
                    onClick={() => {
                      onClose();
                      onJoinLive(user);
                    }}
                    className="p-2 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-400 hover:to-pink-500 text-white shadow-lg shadow-rose-600/30 cursor-pointer"
                    title="Watch Live Stream"
                  >
                    <Radio className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Name, Badges & ID */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-1.5">
                  {user.name}
                  {user.isVerified && (
                    <span className="inline-flex p-0.5 rounded-full bg-cyan-500 text-white" title="Verified Creator">
                      <Award className="w-3 h-3" />
                    </span>
                  )}
                </h3>
              </div>

              {/* ID & Copy */}
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span>ID: {user.userId || '894120'}</span>
                <button
                  onClick={handleCopyId}
                  className="p-1 rounded text-slate-400 hover:text-fuchsia-300 transition-colors cursor-pointer"
                  title="Copy User ID"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>

                <span className="text-white/20">•</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Online
                </span>
              </div>

              {/* Information Badges */}
              <div className="flex items-center gap-1.5 flex-wrap pt-1">
                <span className="px-2 py-0.5 rounded-full bg-pink-500/20 border border-pink-500/30 text-pink-300 text-[11px] font-bold">
                  ♀ {user.age || 18}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-[11px] font-bold">
                  ★ {user.vip || 'VIP 1'}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-violet-500/20 border border-violet-500/30 text-violet-300 text-[11px] font-bold">
                  {user.level || 'Lv.14'}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-[11px] font-bold">
                  {user.category || 'ELITE'}
                </span>
              </div>
            </div>

            {/* Profile Statistics Grid */}
            <div className="grid grid-cols-3 gap-2 py-3 px-4 rounded-2xl bg-white/[0.04] border border-white/8 text-center">
              <div>
                <div className="text-base font-black text-white">{user.following || 24}</div>
                <div className="text-[10px] text-fuchsia-300/80 uppercase font-bold tracking-wider">Following</div>
              </div>
              <div className="border-x border-white/8">
                <div className="text-base font-black text-white">{user.fans || '18.9K'}</div>
                <div className="text-[10px] text-fuchsia-300/80 uppercase font-bold tracking-wider">Fans</div>
              </div>
              <div>
                <div className="text-base font-black text-white">{user.diamonds || '124K'}</div>
                <div className="text-[10px] text-fuchsia-300/80 uppercase font-bold tracking-wider">Diamonds</div>
              </div>
            </div>

            {/* Bio */}
            <div className="text-xs text-slate-300 leading-relaxed bg-white/[0.02] p-3 rounded-xl border border-white/5">
              <p>{user.bio || 'DreamLive broadcaster & entertainer. Join my live room to chat and send gifts!'}</p>
            </div>

            {/* Quick Chat / Interaction Box */}
            <div className="space-y-2 pt-1">
              <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder={`Say hi to ${user.name}...`}
                  className="flex-1 px-3.5 py-2 rounded-full bg-white/[0.06] border border-white/12 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-fuchsia-500/50"
                />
                <button
                  type="submit"
                  disabled={!messageInput.trim()}
                  className="p-2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white disabled:opacity-40 cursor-pointer shadow-md"
                >
                  <MessageSquare className="w-4 h-4" />
                </button>
              </form>

              {sentMessages.length > 0 && (
                <div className="space-y-1 max-h-24 overflow-y-auto text-xs">
                  {sentMessages.map((msg, i) => (
                    <div key={i} className="flex items-center justify-between px-3 py-1 rounded-lg bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-200">
                      <span>{msg.text}</span>
                      <span className="text-[10px] text-slate-400">{msg.time}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Room Title / Join CTA */}
            <div className="pt-2">
              <button
                onClick={() => {
                  onClose();
                  if (onJoinLive) onJoinLive(user);
                }}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-fuchsia-600/30 transition-all cursor-pointer hover:scale-[1.02]"
              >
                <Radio className="w-4 h-4 animate-pulse" />
                <span>Join {user.name}&apos;s Live Room</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default UserProfileModal;
