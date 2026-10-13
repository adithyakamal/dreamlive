import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Crown, Star, Sparkles, Shield, Gift, ChevronRight, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const VIPModal = ({ isOpen, onClose }) => {
  const { showToast } = useApp();
  const [selectedTier, setSelectedTier] = useState(1);

  if (!isOpen) return null;

  const vipTiers = [
    { level: 1, title: 'VIP 1 — Noble', price: '1,000 Coins / Mo', perks: ['Bronze VIP Badge', '5% Gift Discount', 'Custom Entry Toast'] },
    { level: 2, title: 'VIP 2 — Baron', price: '3,000 Coins / Mo', perks: ['Silver VIP Badge', '10% Gift Discount', 'Animated Neon Frame'] },
    { level: 3, title: 'VIP 3 — Duke', price: '8,000 Coins / Mo', perks: ['Gold VIP Badge', 'Special Audio Room Mic Aura', 'Bubble Chat Skin'] },
    { level: 4, title: 'VIP 4 — Monarch', price: '20,000 Coins / Mo', perks: ['Platinum VIP Badge', 'Supercar Broadcast Entry', 'Dedicated Concierge'] },
    { level: 5, title: 'VIP 5 — Sovereign', price: '50,000 Coins / Mo', perks: ['Diamond VIP Badge', 'Global Server Broadcast Notice', 'Exclusive Ride Mount'] },
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
          className="relative w-full max-w-lg bg-[#0e0a1a] border border-purple-500/30 rounded-3xl overflow-hidden shadow-2xl shadow-purple-950/50 z-10 my-auto text-slate-100 max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="relative p-6 bg-gradient-to-r from-purple-700/40 via-fuchsia-700/30 to-purple-900/40 border-b border-purple-500/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-fuchsia-500 flex items-center justify-center text-white shadow-lg shadow-purple-600/30">
                <Crown className="w-6 h-6 text-amber-300" />
              </div>
              <div>
                <h2 className="text-xl font-black text-white">DreamLive VIP Lounge</h2>
                <p className="text-xs text-purple-200">Exclusive Privileges &amp; Status</p>
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
            
            {/* Status Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-[#21113b] via-[#321354] to-[#1a0c30] border border-purple-500/40 text-center space-y-2 shadow-xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-300" />
                <span>Current Status: VIP 0 (Standard)</span>
              </div>
              <h3 className="text-lg font-black text-white">Elevate Your Presence</h3>
              <p className="text-xs text-slate-300 max-w-xs mx-auto">
                Unlock luxury entrance effects, custom badges, and high-priority room placement.
              </p>
            </div>

            {/* VIP Tier Selector */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Select VIP Tier</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {vipTiers.map((tier) => (
                  <button
                    key={tier.level}
                    onClick={() => setSelectedTier(tier.level)}
                    className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                      selectedTier === tier.level
                        ? 'bg-purple-600/30 border-fuchsia-500 shadow-lg shadow-purple-600/30 text-white'
                        : 'bg-white/[0.03] border-white/10 hover:border-purple-500/30 text-slate-300'
                    }`}
                  >
                    <div className="text-xs font-bold flex items-center justify-between">
                      <span>VIP {tier.level}</span>
                      {selectedTier === tier.level && <Star className="w-3 h-3 text-amber-300 fill-amber-300" />}
                    </div>
                    <div className="text-[10px] text-fuchsia-300 mt-1">{tier.price}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Tier Perks */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>{vipTiers.find((t) => t.level === selectedTier)?.title} Benefits</span>
              </h4>

              <div className="space-y-2">
                {vipTiers
                  .find((t) => t.level === selectedTier)
                  ?.perks.map((perk, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-200">
                      <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span>{perk}</span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Action CTA */}
            <button
              onClick={() => {
                showToast(`VIP Tier ${selectedTier} upgrade request submitted!`);
                onClose();
              }}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs sm:text-sm font-bold shadow-xl shadow-fuchsia-600/30 transition-all cursor-pointer hover:scale-[1.02]"
            >
              Activate VIP {selectedTier} Now
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default VIPModal;
