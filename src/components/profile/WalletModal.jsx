import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Wallet, Coins, Gem, PlusCircle, ArrowUpRight, ArrowDownLeft, Clock, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import confetti from 'canvas-confetti';

export const WalletModal = ({ isOpen, onClose }) => {
  const { wallet, addCoins, showToast } = useApp();
  const [activeTab, setActiveTab] = useState('recharge'); // 'recharge' or 'history'

  if (!isOpen) return null;

  const rechargePacks = [
    { coins: 100, bonus: 0, price: '$0.99', popular: false },
    { coins: 600, bonus: 50, price: '$4.99', popular: true },
    { coins: 1300, bonus: 150, price: '$9.99', popular: false },
    { coins: 2800, bonus: 400, price: '$19.99', popular: false },
    { coins: 7500, bonus: 1500, price: '$49.99', popular: false },
    { coins: 16000, bonus: 4000, price: '$99.99', popular: false },
  ];

  const handleRecharge = (pack) => {
    const totalAdded = pack.coins + pack.bonus;
    addCoins(totalAdded, `Recharge: ${pack.price} Package (+${totalAdded} Coins)`);
    
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#38bdf8', '#818cf8', '#ec4899'],
    });

    showToast(`Successfully recharged +${totalAdded} Coins!`);
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
          className="relative w-full max-w-lg bg-[#0a0d18] border border-blue-500/30 rounded-3xl overflow-hidden shadow-2xl shadow-blue-950/50 z-10 my-auto text-slate-100 max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="relative p-6 bg-gradient-to-r from-blue-700/30 via-indigo-700/30 to-blue-900/30 border-b border-blue-500/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-blue-600/30">
                <Wallet className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-black text-white">DreamLive Wallet</h2>
                <p className="text-xs text-blue-200">Balance &amp; Coin Top-Up</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-black/50 hover:bg-black/80 text-white/80 hover:text-white border border-white/10 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Balance Summary Cards */}
          <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
            <div className="grid grid-cols-2 gap-3">
              {/* Coins Balance */}
              <div className="p-4 rounded-2xl bg-gradient-to-tr from-[#141b36] to-[#1d274f] border border-blue-500/30 space-y-1 shadow-lg">
                <div className="flex items-center gap-1.5 text-xs text-amber-300 font-bold">
                  <Coins className="w-4 h-4 text-amber-400" />
                  <span>Coins Balance</span>
                </div>
                <div className="text-2xl font-black text-white">{wallet.coins.toLocaleString()}</div>
                <p className="text-[10px] text-slate-400">Used for sending virtual gifts</p>
              </div>

              {/* Diamonds Balance */}
              <div className="p-4 rounded-2xl bg-gradient-to-tr from-[#24133b] to-[#361756] border border-fuchsia-500/30 space-y-1 shadow-lg">
                <div className="flex items-center gap-1.5 text-xs text-fuchsia-300 font-bold">
                  <Gem className="w-4 h-4 text-fuchsia-400" />
                  <span>Diamonds Balance</span>
                </div>
                <div className="text-2xl font-black text-white">{wallet.diamonds.toLocaleString()}</div>
                <p className="text-[10px] text-slate-400">Earned from broadcasts</p>
              </div>
            </div>

            {/* Tabs (Recharge / History) */}
            <div className="flex items-center rounded-xl bg-white/[0.04] p-1 border border-white/8">
              <button
                onClick={() => setActiveTab('recharge')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  activeTab === 'recharge'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Top-Up Coins
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  activeTab === 'history'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Transaction History
              </button>
            </div>

            {/* Recharge Packs */}
            {activeTab === 'recharge' ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Choose Coin Package</h4>
                  <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Instant Delivery
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {rechargePacks.map((pack, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleRecharge(pack)}
                      className={`relative p-3.5 rounded-2xl border text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-between gap-2 group ${
                        pack.popular
                          ? 'bg-gradient-to-b from-blue-950/60 to-indigo-950/80 border-blue-400 shadow-lg shadow-blue-950/50 hover:scale-104'
                          : 'bg-white/[0.03] border-white/10 hover:border-blue-500/40 hover:bg-white/[0.06]'
                      }`}
                    >
                      {pack.popular && (
                        <span className="absolute -top-2.5 px-2 py-0.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white text-[9px] font-black uppercase tracking-wider">
                          Best Value
                        </span>
                      )}

                      <div className="flex items-center gap-1 text-amber-300 font-black text-base">
                        <Coins className="w-4 h-4 text-amber-400" />
                        <span>{pack.coins}</span>
                      </div>

                      {pack.bonus > 0 && (
                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded-full border border-emerald-500/20">
                          +{pack.bonus} Free Bonus
                        </span>
                      )}

                      <div className="w-full py-1.5 rounded-xl bg-blue-600/30 group-hover:bg-blue-600 text-white font-bold text-xs border border-blue-500/30 transition-colors">
                        {pack.price}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* Transaction History */
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> Recent Transactions
                </h4>

                {wallet.transactions.length > 0 ? (
                  wallet.transactions.map((tx) => (
                    <div
                      key={tx.id}
                      className="p-3 rounded-xl bg-white/[0.03] border border-white/8 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            tx.type === 'recharge' || tx.type === 'reward'
                              ? 'bg-emerald-500/15 text-emerald-400'
                              : 'bg-rose-500/15 text-rose-400'
                          }`}
                        >
                          {tx.type === 'recharge' || tx.type === 'reward' ? (
                            <ArrowDownLeft className="w-4 h-4" />
                          ) : (
                            <ArrowUpRight className="w-4 h-4" />
                          )}
                        </div>
                        <div>
                          <div className="font-semibold text-white">{tx.description}</div>
                          <div className="text-[10px] text-slate-400">{tx.date}</div>
                        </div>
                      </div>

                      <span
                        className={`font-bold ${
                          tx.amount.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'
                        }`}
                      >
                        {tx.amount}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 text-center py-6">No recent transactions</p>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default WalletModal;
