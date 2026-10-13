import React, { useState } from 'react';
import { CheckCircle2, Building, Radio, Send, Shield } from 'lucide-react';
import confetti from 'canvas-confetti';
import Modal from '../common/Modal';
import Button from '../common/Button';

export const CreatorSignupModal = ({ isOpen, onClose }) => {
  const [appType, setAppType] = useState('host'); // 'host' or 'agency'
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    talent: 'Singing & Music',
    socialLink: '',
    agencyName: '',
    numberOfTalents: '1-10',
    notes: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleReset}
      title={isSubmitted ? 'Application Received!' : 'Join DreamLive Creator Network'}
      subtitle={
        isSubmitted
          ? 'Our talent team will review and contact you within 24 business hours.'
          : 'Broadcast live, build your global fandom, and earn with Top-Class Entertainment LLP.'
      }
      maxWidth="max-w-xl"
    >
      {isSubmitted ? (
        <div className="text-center py-8 space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border-2 border-emerald-500/40 flex items-center justify-center mx-auto text-3xl">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h4 className="text-xl font-bold text-white">
            Thank you, {formData.fullName}!
          </h4>
          <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
            Your application for{' '}
            <strong className="text-fuchsia-400">
              {appType === 'host' ? 'Verified Host / Broadcaster' : 'Talent Agency Partner'}
            </strong>{' '}
            has been successfully submitted to <code>dreamlivecare@gmail.com</code>.
          </p>
          <div className="pt-4">
            <Button variant="primary" size="md" onClick={handleReset}>
              Close Window
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          
          {/* Application Type Selector */}
          <div className="grid grid-cols-2 gap-3 pb-2">
            <button
              type="button"
              onClick={() => setAppType('host')}
              className={`p-3 rounded-2xl border text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                appType === 'host'
                  ? 'bg-gradient-to-r from-violet-600/30 to-fuchsia-600/30 border-fuchsia-400 text-white shadow-lg'
                  : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              <Radio className="w-4 h-4 text-fuchsia-400" />
              Solo Broadcaster
            </button>

            <button
              type="button"
              onClick={() => setAppType('agency')}
              className={`p-3 rounded-2xl border text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                appType === 'agency'
                  ? 'bg-gradient-to-r from-violet-600/30 to-fuchsia-600/30 border-fuchsia-400 text-white shadow-lg'
                  : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              <Building className="w-4 h-4 text-cyan-400" />
              Talent Agency
            </button>
          </div>

          {/* Full Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">
                {appType === 'agency' ? 'Contact Representative Name' : 'Full Name'} *
              </label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="e.g. Riya Sharma"
                className="w-full px-4 py-2.5 rounded-xl glass-input text-xs sm:text-sm focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="yourname@gmail.com"
                className="w-full px-4 py-2.5 rounded-xl glass-input text-xs sm:text-sm focus:outline-none"
              />
            </div>
          </div>

          {/* Phone & Talent / Agency Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">
                WhatsApp / Phone Number *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98765 43210"
                className="w-full px-4 py-2.5 rounded-xl glass-input text-xs sm:text-sm focus:outline-none"
              />
            </div>

            {appType === 'host' ? (
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">
                  Primary Talent Category
                </label>
                <select
                  value={formData.talent}
                  onChange={(e) => setFormData({ ...formData, talent: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-xs sm:text-sm focus:outline-none bg-slate-900"
                >
                  <option value="Singing & Music">Singing & Music</option>
                  <option value="Dance & Choreography">Dance & Choreography</option>
                  <option value="Comedy & Entertainment">Comedy & Entertainment</option>
                  <option value="Voice Lounge / Poetry">Voice Lounge / Poetry</option>
                  <option value="Gaming & Esports">Gaming & Esports</option>
                  <option value="Talk Show & Lifestyle">Talk Show & Lifestyle</option>
                </select>
              </div>
            ) : (
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">
                  Agency Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.agencyName}
                  onChange={(e) => setFormData({ ...formData, agencyName: e.target.value })}
                  placeholder="e.g. Star Media Talent"
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-xs sm:text-sm focus:outline-none"
                />
              </div>
            )}
          </div>

          {/* Social link */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">
              Instagram / YouTube / Existing Live Profile
            </label>
            <input
              type="text"
              value={formData.socialLink}
              onChange={(e) => setFormData({ ...formData, socialLink: e.target.value })}
              placeholder="https://instagram.com/your_handle"
              className="w-full px-4 py-2.5 rounded-xl glass-input text-xs sm:text-sm focus:outline-none"
            />
          </div>

          {/* Notes */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">
              Brief Introduction / Experience
            </label>
            <textarea
              rows={2}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Tell us about your streaming background and schedule..."
              className="w-full px-4 py-2.5 rounded-xl glass-input text-xs sm:text-sm focus:outline-none resize-none"
            />
          </div>

          <div className="pt-2 flex items-center justify-between gap-4">
            <div className="text-[11px] text-slate-400 flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>Direct verification by Top-Class Entertainment</span>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              icon={Send}
              iconPosition="right"
            >
              Submit Application
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};
export default CreatorSignupModal;
