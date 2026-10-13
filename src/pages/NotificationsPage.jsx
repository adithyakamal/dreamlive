import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, CheckCheck, Gift, MessageSquare, UserPlus, Eye, Calendar, Sparkles } from 'lucide-react';
import PageTransition from '../components/common/PageTransition';
import { useApp } from '../context/AppContext';

export const NotificationsPage = () => {
  const navigate = useNavigate();
  const { notifications, markAsRead, markAllAsRead, unreadCount, showToast } = useApp();

  const getIcon = (type) => {
    switch (type) {
      case 'follow':
      case 'friend':
        return <UserPlus className="w-4 h-4 text-fuchsia-400" />;
      case 'message':
        return <MessageSquare className="w-4 h-4 text-cyan-400" />;
      case 'reward':
        return <Gift className="w-4 h-4 text-amber-400" />;
      default:
        return <Sparkles className="w-4 h-4 text-violet-400" />;
    }
  };

  return (
    <PageTransition>
      <div className="relative min-h-screen bg-transparent text-slate-100 pb-24 pt-16 sm:pt-20">
        
        {/* Top Header */}
        <div className="sticky top-0 z-30 bg-[#07080d]/90 backdrop-blur-xl border-b border-white/10 px-4 sm:px-6 py-3.5">
          <div className="max-w-2xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate(-1)}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
                aria-label="Back"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-black text-white">Notifications</h1>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white text-[11px] font-black animate-pulse">
                    {unreadCount} New
                  </span>
                )}
              </div>
            </div>

            {unreadCount > 0 && (
              <button
                onClick={() => {
                  markAllAsRead();
                  showToast('All notifications marked as read');
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-xs font-bold text-slate-300 hover:text-white border border-white/10 transition-all cursor-pointer"
              >
                <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Mark All Read</span>
              </button>
            )}
          </div>
        </div>

        {/* Notifications List */}
        <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-4 space-y-2.5">
          {notifications.map((notif) => {
            return (
              <div
                key={notif.id}
                onClick={() => {
                  markAsRead(notif.id);
                  if (notif.type === 'follow' || notif.type === 'friend') {
                    navigate('/friends');
                  } else if (notif.type === 'reward') {
                    navigate('/profile');
                  }
                }}
                className={`p-3.5 sm:p-4 rounded-2xl border transition-all flex items-start gap-3.5 cursor-pointer group ${
                  notif.read
                    ? 'bg-white/[0.02] border-white/6 hover:bg-white/[0.05]'
                    : 'bg-gradient-to-r from-purple-950/30 to-fuchsia-950/20 border-fuchsia-500/30 shadow-lg shadow-fuchsia-950/20 hover:border-fuchsia-500/60'
                }`}
              >
                {/* Avatar or Icon */}
                <div className="relative shrink-0 mt-0.5">
                  {notif.avatar ? (
                    <img
                      src={notif.avatar}
                      alt={notif.title}
                      className="w-11 h-11 rounded-full object-cover border-2 border-fuchsia-500/50"
                    />
                  ) : (
                    <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-violet-600/30 to-fuchsia-600/30 border border-violet-500/40 flex items-center justify-center">
                      {getIcon(notif.type)}
                    </div>
                  )}

                  {/* Unread Small Red Indicator Dot */}
                  {!notif.read && (
                    <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-rose-500 border-2 border-[#07080d] shadow-sm animate-ping" />
                  )}
                  {!notif.read && (
                    <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-rose-500 border-2 border-[#07080d] shadow-sm" />
                  )}
                </div>

                {/* Notification Content */}
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className={`text-xs sm:text-sm font-bold truncate ${notif.read ? 'text-slate-200' : 'text-white'}`}>
                      {notif.title}
                    </h3>
                    <span className="text-[11px] text-slate-500 shrink-0 font-medium">{notif.time}</span>
                  </div>

                  <p className={`text-xs leading-relaxed line-clamp-2 ${notif.read ? 'text-slate-400' : 'text-slate-200 font-medium'}`}>
                    {notif.message}
                  </p>
                </div>
              </div>
            );
          })}

          {notifications.length === 0 && (
            <div className="py-20 text-center space-y-3 bg-white/[0.02] rounded-3xl border border-white/5 p-8">
              <Bell className="w-12 h-12 text-slate-500 mx-auto" />
              <h3 className="text-base font-bold text-white">No Notifications</h3>
              <p className="text-xs text-slate-400">You are all caught up!</p>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default NotificationsPage;
