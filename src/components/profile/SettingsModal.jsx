import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Settings as SettingsIcon,
  Shield,
  Bell,
  Volume2,
  Lock,
  Globe,
  Info,
  LogOut,
  ChevronRight,
  Smartphone,
  Check,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SettingsModal = ({ isOpen, onClose }) => {
  const { showToast } = useApp();

  const [toggles, setToggles] = useState({
    pushNotifs: true,
    liveAlerts: true,
    giftAlerts: true,
    soundEffects: true,
    hideLocation: false,
    privateMode: false,
  });

  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  if (!isOpen) return null;

  const handleToggle = (key) => {
    setToggles((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      showToast(`${key} updated`);
      return next;
    });
  };

  const handleLogout = () => {
    setShowLogoutConfirm(false);
    showToast('Signed out of DreamLive account session.');
    onClose();
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
          className="relative w-full max-w-lg bg-[#0e0c14] border border-amber-500/30 rounded-3xl overflow-hidden shadow-2xl shadow-amber-950/40 z-10 my-auto text-slate-100 max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="relative p-6 bg-gradient-to-r from-amber-700/30 via-orange-700/20 to-amber-900/30 border-b border-amber-500/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-600 to-yellow-600 flex items-center justify-center text-white shadow-lg shadow-amber-600/30">
                <SettingsIcon className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-black text-white">App Settings</h2>
                <p className="text-xs text-amber-200">Preferences &amp; Account Controls</p>
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
            
            {/* Account & Security */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-amber-400" /> Account Security
              </h4>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Smartphone className="w-4 h-4 text-amber-400" />
                    <span>Bound Mobile Phone</span>
                  </div>
                  <span className="font-bold text-white">+91 70581 47403</span>
                </div>
                <div className="flex items-center justify-between text-xs pt-2 border-t border-white/5">
                  <span className="text-slate-300">Account Safety Status</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <Check className="w-3 h-3" /> Protected
                  </span>
                </div>
              </div>
            </div>

            {/* Notifications Toggles */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Bell className="w-3.5 h-3.5 text-amber-400" /> Notifications &amp; Alerts
              </h4>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <div className="font-semibold text-white">Push Notifications</div>
                    <div className="text-[10px] text-slate-400">Receive alerts when offline</div>
                  </div>
                  <button
                    onClick={() => handleToggle('pushNotifs')}
                    className={`w-11 h-6 rounded-full p-1 transition-colors cursor-pointer ${
                      toggles.pushNotifs ? 'bg-amber-500' : 'bg-white/20'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transition-transform ${
                        toggles.pushNotifs ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-white/5">
                  <div>
                    <div className="font-semibold text-white">Broadcaster Live Alerts</div>
                    <div className="text-[10px] text-slate-400">Alerts when followed hosts go live</div>
                  </div>
                  <button
                    onClick={() => handleToggle('liveAlerts')}
                    className={`w-11 h-6 rounded-full p-1 transition-colors cursor-pointer ${
                      toggles.liveAlerts ? 'bg-amber-500' : 'bg-white/20'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transition-transform ${
                        toggles.liveAlerts ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Sound & Privacy */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Volume2 className="w-3.5 h-3.5 text-amber-400" /> Audio &amp; Privacy
              </h4>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300">Room Sound Effects &amp; Animations</span>
                  <button
                    onClick={() => handleToggle('soundEffects')}
                    className={`w-11 h-6 rounded-full p-1 transition-colors cursor-pointer ${
                      toggles.soundEffects ? 'bg-amber-500' : 'bg-white/20'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transition-transform ${
                        toggles.soundEffects ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-white/5">
                  <span className="text-slate-300">Hide My Location / Country Flag</span>
                  <button
                    onClick={() => handleToggle('hideLocation')}
                    className={`w-11 h-6 rounded-full p-1 transition-colors cursor-pointer ${
                      toggles.hideLocation ? 'bg-amber-500' : 'bg-white/20'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transition-transform ${
                        toggles.hideLocation ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Language Selection */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-amber-400" /> App Language
              </h4>

              <div className="grid grid-cols-3 gap-2">
                {['English', 'हिन्दी', 'বাংলা', 'العربية', 'Español'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setSelectedLanguage(lang);
                      showToast(`Language set to ${lang}`);
                    }}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      selectedLanguage === lang
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                        : 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            {/* About App */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-300 font-semibold">DreamLive Application</span>
                <span className="text-slate-400">Version 2.4.0 (Build 2026)</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Operated by Top-Class Entertainment LLP. All rights reserved.
              </p>
            </div>

            {/* Logout Button */}
            <div className="pt-2">
              {showLogoutConfirm ? (
                <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/40 space-y-3 text-center">
                  <p className="text-xs text-rose-200 font-bold">Are you sure you want to log out?</p>
                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={handleLogout}
                      className="px-4 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-colors cursor-pointer"
                    >
                      Yes, Log Out
                    </button>
                    <button
                      onClick={() => setShowLogoutConfirm(false)}
                      className="px-4 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 text-xs font-bold transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowLogoutConfirm(true)}
                  className="w-full py-3 rounded-2xl bg-white/[0.04] hover:bg-rose-500/20 hover:border-rose-500/40 border border-white/10 text-rose-400 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out of DreamLive</span>
                </button>
              )}
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SettingsModal;
