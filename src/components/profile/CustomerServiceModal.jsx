import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Headphones,
  HelpCircle,
  MessageSquare,
  AlertTriangle,
  Mail,
  ChevronDown,
  ChevronUp,
  Send,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FAQS, COMPANY_INFO } from '../../data/dreamLiveContent';

export const CustomerServiceModal = ({ isOpen, onClose }) => {
  const { showToast } = useApp();
  const [activeTab, setActiveTab] = useState('faq'); // 'faq', 'contact', 'report'
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Contact chat state
  const [chatMessages, setChatMessages] = useState([
    { sender: 'support', text: 'Hello Rossy! Welcome to DreamLive 24/7 Support. How can we help you today?', time: '12:00' },
  ]);
  const [chatInput, setChatInput] = useState('');

  // Report state
  const [reportCategory, setReportCategory] = useState('Harassment');
  const [reportText, setReportText] = useState('');
  const [reportSubmitted, setReportSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = { sender: 'user', text: chatInput.trim(), time: 'Just now' };
    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput('');

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'support',
          text: 'Thank you for reaching out. An official DreamLive support representative has received your ticket. We usually respond within 5-10 minutes!',
          time: 'Just now',
        },
      ]);
    }, 1000);
  };

  const handleReportSubmit = (e) => {
    e.preventDefault();
    if (!reportText.trim()) return;

    setReportSubmitted(true);
    showToast('Report submitted to DreamLive Safety Team');
    setTimeout(() => {
      setReportSubmitted(false);
      setReportText('');
      onClose();
    }, 2000);
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
          className="relative w-full max-w-lg bg-[#0e0a14] border border-pink-500/30 rounded-3xl overflow-hidden shadow-2xl shadow-pink-950/40 z-10 my-auto text-slate-100 max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="relative p-6 bg-gradient-to-r from-pink-700/30 via-rose-700/20 to-pink-900/30 border-b border-pink-500/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-600 to-rose-500 flex items-center justify-center text-white shadow-lg shadow-pink-600/30">
                <Headphones className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-black text-white">Customer Support</h2>
                <p className="text-xs text-pink-200">24/7 Official Help Center</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-black/50 hover:bg-black/80 text-white/80 hover:text-white border border-white/10 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="px-5 pt-4">
            <div className="flex items-center rounded-xl bg-white/[0.04] p-1 border border-white/8">
              <button
                onClick={() => setActiveTab('faq')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  activeTab === 'faq'
                    ? 'bg-pink-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Help &amp; FAQs
              </button>
              <button
                onClick={() => setActiveTab('contact')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  activeTab === 'contact'
                    ? 'bg-pink-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Live Chat
              </button>
              <button
                onClick={() => setActiveTab('report')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  activeTab === 'report'
                    ? 'bg-pink-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Report Issue
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
            
            {/* TAB 1: FAQs */}
            {activeTab === 'faq' && (
              <div className="space-y-3">
                <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/8 text-xs text-slate-300">
                  <span>Official Care Email: </span>
                  <a href={`mailto:${COMPANY_INFO.email}`} className="text-fuchsia-400 font-bold underline ml-1">
                    {COMPANY_INFO.email}
                  </a>
                </div>

                <div className="space-y-2">
                  {FAQS.slice(0, 5).map((faq, idx) => {
                    const isOpen = openFaqIndex === idx;

                    return (
                      <div
                        key={idx}
                        className="rounded-2xl bg-white/[0.03] border border-white/8 overflow-hidden transition-colors"
                      >
                        <button
                          onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                          className="w-full p-3.5 text-left flex items-center justify-between gap-3 text-xs font-bold text-white hover:text-pink-300 cursor-pointer"
                        >
                          <span>{faq.question}</span>
                          {isOpen ? (
                            <ChevronUp className="w-4 h-4 text-pink-400 shrink-0" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                          )}
                        </button>

                        {isOpen && (
                          <div className="px-3.5 pb-3.5 text-xs text-slate-300 leading-relaxed border-t border-white/5 pt-2 whitespace-pre-line">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 2: Live Chat */}
            {activeTab === 'contact' && (
              <div className="flex flex-col h-[340px] justify-between space-y-3">
                <div className="flex-1 overflow-y-auto space-y-2 p-3 rounded-2xl bg-black/40 border border-white/8 text-xs">
                  {chatMessages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex ${
                        msg.sender === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-[80%] p-2.5 rounded-2xl ${
                          msg.sender === 'user'
                            ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white'
                            : 'bg-white/10 text-slate-200 border border-white/10'
                        }`}
                      >
                        <p>{msg.text}</p>
                        <span className="text-[9px] text-white/50 mt-1 block text-right">{msg.time}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendChat} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Type your message to support..."
                    className="flex-1 px-3.5 py-2.5 rounded-full bg-white/[0.06] border border-white/12 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-pink-500/50"
                  />
                  <button
                    type="submit"
                    disabled={!chatInput.trim()}
                    className="p-2.5 rounded-full bg-gradient-to-r from-pink-600 to-rose-600 text-white disabled:opacity-40 cursor-pointer shadow-md"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}

            {/* TAB 3: Report Problem */}
            {activeTab === 'report' && (
              <div>
                {reportSubmitted ? (
                  <div className="py-12 text-center space-y-3">
                    <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                    <h3 className="text-base font-bold text-white">Report Received</h3>
                    <p className="text-xs text-slate-300">
                      Our 24/7 community trust &amp; safety team will investigate and take immediate action.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleReportSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-300">Issue Category</label>
                      <select
                        value={reportCategory}
                        onChange={(e) => setReportCategory(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-pink-500"
                      >
                        <option value="Harassment">Chat Harassment / Inappropriate Behavior</option>
                        <option value="Payment">Coin Recharge / Diamond Withdrawal Issue</option>
                        <option value="Bug">Technical Bug / Stream Glitch</option>
                        <option value="Account">Account Access / Security</option>
                        <option value="Other">Other Query</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-300">Detailed Description</label>
                      <textarea
                        required
                        rows={4}
                        value={reportText}
                        onChange={(e) => setReportText(e.target.value)}
                        placeholder="Please describe the issue or the user ID involved..."
                        className="w-full p-3 rounded-xl bg-black/60 border border-white/15 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-pink-500"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-2xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-bold text-xs shadow-lg shadow-pink-600/30 transition-all cursor-pointer"
                    >
                      Submit Official Report
                    </button>
                  </form>
                )}
              </div>
            )}

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CustomerServiceModal;
