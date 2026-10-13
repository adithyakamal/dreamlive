import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart2,
  Crown,
  Wallet,
  Store,
  CalendarCheck2,
  Settings,
  Headphones,
} from 'lucide-react';
import LevelModal from './LevelModal';
import VIPModal from './VIPModal';
import WalletModal from './WalletModal';
import MallModal from './MallModal';
import DailyCheckInModal from './DailyCheckInModal';
import SettingsModal from './SettingsModal';
import CustomerServiceModal from './CustomerServiceModal';

export const ProfileFeatureGrid = () => {
  const [activeModal, setActiveModal] = useState(null); // 'level', 'vip', 'wallet', 'mall', 'checkin', 'settings', 'support'

  const row1Features = [
    {
      id: 'level',
      label: 'Level',
      icon: BarChart2,
      colorClass: 'bg-gradient-to-tr from-amber-500 to-orange-500 text-white shadow-amber-500/30',
      borderClass: 'border-orange-500/20 hover:border-orange-500/50',
    },
    {
      id: 'vip',
      label: 'VIP',
      icon: Crown,
      colorClass: 'bg-gradient-to-tr from-purple-600 to-fuchsia-600 text-white shadow-purple-600/30',
      borderClass: 'border-purple-500/20 hover:border-purple-500/50',
    },
    {
      id: 'wallet',
      label: 'Wallet',
      icon: Wallet,
      colorClass: 'bg-gradient-to-tr from-blue-600 to-cyan-500 text-white shadow-blue-600/30',
      borderClass: 'border-blue-500/20 hover:border-blue-500/50',
    },
    {
      id: 'mall',
      label: 'Mall',
      icon: Store,
      colorClass: 'bg-gradient-to-tr from-teal-500 to-emerald-500 text-white shadow-teal-500/30',
      borderClass: 'border-teal-500/20 hover:border-teal-500/50',
    },
  ];

  const row2Features = [
    {
      id: 'checkin',
      label: 'Daily Check-In',
      icon: CalendarCheck2,
      colorClass: 'bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-blue-600/30',
      borderClass: 'border-blue-500/20 hover:border-blue-500/50',
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      colorClass: 'bg-gradient-to-tr from-amber-700 to-yellow-700 text-white shadow-amber-700/30',
      borderClass: 'border-amber-600/20 hover:border-amber-600/50',
    },
    {
      id: 'support',
      label: 'Customer Service',
      icon: Headphones,
      colorClass: 'bg-gradient-to-tr from-pink-600 to-rose-600 text-white shadow-pink-600/30',
      borderClass: 'border-pink-500/20 hover:border-pink-500/50',
    },
  ];

  return (
    <div className="relative w-full max-w-2xl mx-auto px-4 sm:px-6 py-2 space-y-3 pb-24">
      {/* Row 1: 4 Items Grid */}
      <div className="grid grid-cols-4 gap-2.5 sm:gap-4">
        {row1Features.map((item) => {
          const Icon = item.icon;

          return (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveModal(item.id)}
              className={`p-3 sm:p-4 rounded-2xl sm:rounded-3xl bg-[#130f24]/80 backdrop-blur-xl border ${item.borderClass} flex flex-col items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all cursor-pointer group`}
            >
              {/* Circular Icon */}
              <div className={`w-11 h-11 sm:w-13 sm:h-13 rounded-full flex items-center justify-center shadow-lg ${item.colorClass} group-hover:scale-110 transition-transform`}>
                <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>

              {/* Label */}
              <span className="text-xs sm:text-sm font-bold text-slate-200 group-hover:text-white transition-colors text-center">
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Row 2: 3 Items Grid */}
      <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
        {row2Features.map((item) => {
          const Icon = item.icon;

          return (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveModal(item.id)}
              className={`p-3 sm:p-4 rounded-2xl sm:rounded-3xl bg-[#130f24]/80 backdrop-blur-xl border ${item.borderClass} flex flex-col items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all cursor-pointer group`}
            >
              {/* Circular Icon */}
              <div className={`w-11 h-11 sm:w-13 sm:h-13 rounded-full flex items-center justify-center shadow-lg ${item.colorClass} group-hover:scale-110 transition-transform`}>
                <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>

              {/* Label */}
              <span className="text-xs sm:text-sm font-bold text-slate-200 group-hover:text-white transition-colors text-center">
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Modals */}
      <LevelModal isOpen={activeModal === 'level'} onClose={() => setActiveModal(null)} />
      <VIPModal isOpen={activeModal === 'vip'} onClose={() => setActiveModal(null)} />
      <WalletModal isOpen={activeModal === 'wallet'} onClose={() => setActiveModal(null)} />
      <MallModal isOpen={activeModal === 'mall'} onClose={() => setActiveModal(null)} />
      <DailyCheckInModal isOpen={activeModal === 'checkin'} onClose={() => setActiveModal(null)} />
      <SettingsModal isOpen={activeModal === 'settings'} onClose={() => setActiveModal(null)} />
      <CustomerServiceModal isOpen={activeModal === 'support'} onClose={() => setActiveModal(null)} />
    </div>
  );
};

export default ProfileFeatureGrid;
