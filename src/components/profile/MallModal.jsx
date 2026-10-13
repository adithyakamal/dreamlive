import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Store, Sparkles, Coins, Check, ShoppingBag, Eye, Award } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MallModal = ({ isOpen, onClose }) => {
  const { wallet, showToast } = useApp();
  const [activeTab, setActiveTab] = useState('frames'); // 'frames', 'effects', 'bubbles', 'mounts'
  const [equippedItems, setEquippedItems] = useState(['frame-1']);

  if (!isOpen) return null;

  const mallCategories = [
    { id: 'frames', label: 'Avatar Frames' },
    { id: 'effects', label: 'Entry Effects' },
    { id: 'bubbles', label: 'Chat Bubbles' },
    { id: 'mounts', label: 'Ride Mounts' },
  ];

  const mallItems = {
    frames: [
      { id: 'frame-1', name: 'Cyber Dragon Frame', price: 499, icon: '🐉', rarity: 'Legendary', tag: 'Equipped' },
      { id: 'frame-2', name: 'Galaxy Sovereign Ring', price: 899, icon: '👑', rarity: 'Epic', tag: 'New' },
      { id: 'frame-3', name: 'Neon Rose Aura', price: 299, icon: '🌹', rarity: 'Rare', tag: 'Popular' },
      { id: 'frame-4', name: 'Crystal Ice Halo', price: 599, icon: '❄️', rarity: 'Epic' },
    ],
    effects: [
      { id: 'eff-1', name: 'Cyber Supercar Drift', price: 1499, icon: '🏎️', rarity: 'Mythic', tag: 'Hot' },
      { id: 'eff-2', name: 'Cosmic Starship Arrival', price: 1999, icon: '🚀', rarity: 'Mythic' },
      { id: 'eff-3', name: 'Phoenix Fire Explosion', price: 999, icon: '🔥', rarity: 'Legendary' },
    ],
    bubbles: [
      { id: 'bub-1', name: 'Gold VIP Luxury Bubble', price: 199, icon: '💬', rarity: 'Rare' },
      { id: 'bub-2', name: 'Pink Heart Romance Bubble', price: 199, icon: '💖', rarity: 'Rare' },
      { id: 'bub-3', name: 'Cyber Hologram Bubble', price: 249, icon: '✨', rarity: 'Epic' },
    ],
    mounts: [
      { id: 'mnt-1', name: 'Golden Pegasus Mount', price: 3499, icon: '🦄', rarity: 'Mythic', tag: 'Exclusive' },
      { id: 'mnt-2', name: 'Inferno Cyber Tiger', price: 2999, icon: '🐅', rarity: 'Mythic' },
      { id: 'mnt-3', name: 'Phantom Hoverboard', price: 1299, icon: '🛹', rarity: 'Legendary' },
    ],
  };

  const handleEquipOrBuy = (item) => {
    if (equippedItems.includes(item.id)) {
      setEquippedItems(equippedItems.filter((id) => id !== item.id));
      showToast(`Unequipped ${item.name}`);
    } else {
      setEquippedItems([...equippedItems, item.id]);
      showToast(`Equipped ${item.name}!`);
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
          className="relative w-full max-w-lg bg-[#0a1017] border border-teal-500/30 rounded-3xl overflow-hidden shadow-2xl shadow-teal-950/50 z-10 my-auto text-slate-100 max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="relative p-6 bg-gradient-to-r from-teal-700/30 via-emerald-700/30 to-teal-900/30 border-b border-teal-500/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center text-white shadow-lg shadow-teal-500/30">
                <Store className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-black text-white">DreamLive Mall</h2>
                <p className="text-xs text-teal-200">Customizations &amp; Rewards</p>
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
          <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1">
            
            {/* Coins Balance Ribbon */}
            <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-between">
              <span className="text-xs text-slate-300">Available Wallet Balance</span>
              <div className="flex items-center gap-1.5 text-amber-300 font-bold text-sm">
                <Coins className="w-4 h-4 text-amber-400" />
                <span>{wallet.coins.toLocaleString()} Coins</span>
              </div>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              {mallCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    activeTab === cat.id
                      ? 'bg-teal-500 text-white shadow-md shadow-teal-500/30'
                      : 'bg-white/[0.04] text-slate-400 hover:text-white border border-white/8'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Items Grid */}
            <div className="grid grid-cols-2 gap-3">
              {mallItems[activeTab]?.map((item) => {
                const isEquipped = equippedItems.includes(item.id);

                return (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-teal-500/40 transition-all flex flex-col justify-between space-y-3 group text-center"
                  >
                    {/* Item Visual */}
                    <div className="relative w-16 h-16 mx-auto rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                      {item.icon}
                      {item.tag && (
                        <span className="absolute -top-2 -right-2 px-1.5 py-0.2 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white text-[8px] font-black uppercase">
                          {item.tag}
                        </span>
                      )}
                    </div>

                    {/* Details */}
                    <div>
                      <h4 className="text-xs font-bold text-white truncate">{item.name}</h4>
                      <span className="text-[10px] text-teal-300 font-semibold">{item.rarity}</span>
                      <div className="flex items-center justify-center gap-1 text-amber-300 text-xs font-black mt-1">
                        <Coins className="w-3 h-3 text-amber-400" />
                        <span>{item.price} Coins</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={() => handleEquipOrBuy(item)}
                      className={`w-full py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                        isEquipped
                          ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40'
                          : 'bg-teal-600 hover:bg-teal-500 text-white shadow-md shadow-teal-600/30'
                      }`}
                    >
                      {isEquipped ? (
                        <>
                          <Check className="w-3.5 h-3.5" /> Equipped
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" /> Equip / Buy
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default MallModal;
