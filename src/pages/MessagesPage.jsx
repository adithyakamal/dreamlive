import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, MessageSquare, Send, CheckCheck, Sparkles, Award } from 'lucide-react';
import PageTransition from '../components/common/PageTransition';
import { MOCK_STREAM_USERS } from '../data/mockUsers';
import { useApp } from '../context/AppContext';

export const MessagesPage = () => {
  const navigate = useNavigate();
  const { showToast } = useApp();
  const [selectedUser, setSelectedUser] = useState(MOCK_STREAM_USERS[0]);
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState({
    'user-1': [
      { sender: 'user-1', text: 'Hey Rossy! Welcome to my live room tonight! 💖✨', time: '10:30 AM' },
      { sender: 'me', text: 'Hey Call Me ❤️! Excited for the live songs!', time: '10:32 AM' },
    ],
    'user-3': [
      { sender: 'user-3', text: 'Thank you for following! Hope you enjoy the stream! 🌹', time: 'Yesterday' },
    ],
  });

  const activeMessages = chatHistory[selectedUser?.id] || [
    { sender: selectedUser?.id, text: `Hello! Thanks for connecting with ${selectedUser?.name} on DreamLive!`, time: 'Recently' },
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim() || !selectedUser) return;

    const newMsg = { sender: 'me', text: chatInput.trim(), time: 'Just now' };
    setChatHistory((prev) => ({
      ...prev,
      [selectedUser.id]: [...(prev[selectedUser.id] || []), newMsg],
    }));
    setChatInput('');
    showToast(`Message sent to ${selectedUser.name}!`);

    // Simulated reply
    setTimeout(() => {
      setChatHistory((prev) => ({
        ...prev,
        [selectedUser.id]: [
          ...(prev[selectedUser.id] || []),
          { sender: selectedUser.id, text: '💖 Thanks for your message! See you in my stream!', time: 'Just now' },
        ],
      }));
    }, 1200);
  };

  return (
    <PageTransition>
      <div className="relative min-h-screen bg-transparent text-slate-100 pb-24 pt-16 sm:pt-20">
        
        {/* Top Header */}
        <div className="sticky top-0 z-30 bg-[#07080d]/90 backdrop-blur-xl border-b border-white/10 px-4 sm:px-6 py-3.5">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate(-1)}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
                aria-label="Back"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-lg sm:text-xl font-black text-white">Direct Messages</h1>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span>Real-Time Chat</span>
            </div>
          </div>
        </div>

        {/* Chat UI Layout */}
        <div className="max-w-4xl mx-auto px-3 sm:px-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#0d0f1a] rounded-3xl border border-white/10 overflow-hidden shadow-2xl min-h-[520px]">
            
            {/* Conversation List */}
            <div className="border-b md:border-b-0 md:border-r border-white/10 p-3 sm:p-4 space-y-3">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2">Conversations</div>

              <div className="space-y-1.5 max-h-[440px] overflow-y-auto">
                {MOCK_STREAM_USERS.slice(0, 6).map((u) => {
                  const isSelected = selectedUser?.id === u.id;

                  return (
                    <button
                      key={u.id}
                      onClick={() => setSelectedUser(u)}
                      className={`w-full p-2.5 rounded-2xl flex items-center gap-3 text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-fuchsia-600/20 border border-fuchsia-500/40 text-white shadow-md'
                          : 'hover:bg-white/5 text-slate-300 border border-transparent'
                      }`}
                    >
                      <div className="relative shrink-0">
                        <img
                          src={u.cover}
                          alt={u.name}
                          className="w-10 h-10 rounded-full object-cover border border-fuchsia-500/40"
                        />
                        {u.isOnline && (
                          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-[#0d0f1a]" />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-white truncate">{u.name}</h4>
                          <span className="text-[10px] text-slate-500">Live</span>
                        </div>
                        <p className="text-[11px] text-slate-400 truncate">{u.bio}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Chat Window */}
            <div className="md:col-span-2 flex flex-col justify-between p-4 sm:p-6 bg-[#0a0c16]">
              {selectedUser ? (
                <>
                  {/* Chat Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <img
                        src={selectedUser.cover}
                        alt={selectedUser.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-fuchsia-500"
                      />
                      <div>
                        <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                          {selectedUser.name}
                          {selectedUser.isVerified && (
                            <Award className="w-3 h-3 text-cyan-400" />
                          )}
                        </h3>
                        <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          Online • {selectedUser.level}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => navigate(`/?user=${selectedUser.id}`)}
                      className="px-3 py-1 rounded-full bg-fuchsia-500/20 text-fuchsia-300 text-xs font-bold border border-fuchsia-500/30 hover:bg-fuchsia-500/30 transition-colors"
                    >
                      Watch Stream
                    </button>
                  </div>

                  {/* Messages Stream */}
                  <div className="flex-1 overflow-y-auto py-4 space-y-3 min-h-[260px] max-h-[320px]">
                    {activeMessages.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[78%] p-3 rounded-2xl text-xs ${
                            msg.sender === 'me'
                              ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-br-none shadow-md shadow-fuchsia-600/20'
                              : 'bg-white/10 text-slate-200 rounded-bl-none border border-white/10'
                          }`}
                        >
                          <p>{msg.text}</p>
                          <span className="text-[9px] text-white/50 block text-right mt-1">{msg.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input Form */}
                  <form onSubmit={handleSendMessage} className="flex items-center gap-2 pt-2">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder={`Message ${selectedUser.name}...`}
                      className="flex-1 px-4 py-2.5 rounded-full bg-white/[0.06] border border-white/12 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-fuchsia-500/60"
                    />
                    <button
                      type="submit"
                      disabled={!chatInput.trim()}
                      className="p-2.5 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white disabled:opacity-40 shadow-lg shadow-fuchsia-600/30 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-slate-500 text-xs">
                  Select a user to begin chatting
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default MessagesPage;
