import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Search, UserCheck, UserPlus, MessageSquare, Radio, Award, Sparkles } from 'lucide-react';
import PageTransition from '../components/common/PageTransition';
import { useApp } from '../context/AppContext';
import { MOCK_STREAM_USERS } from '../data/mockUsers';
import UserProfileModal from '../components/profile/UserProfileModal';

export const FriendsPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { followedUsers, toggleFollow, isFollowing, showToast } = useApp();

  const initialTab = searchParams.get('tab') || 'following';
  const [activeTab, setActiveTab] = useState(initialTab);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  // Sample Friend Requests
  const friendRequests = [
    {
      id: 'req-1',
      name: 'Kavya Desai',
      handle: '@kavya_voice',
      userId: '492810',
      level: 'Lv.71',
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&auto=format&fit=crop&q=80',
      cover: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&auto=format&fit=crop&q=80',
      isOnline: true,
      time: '10m ago',
      bio: 'Late night poetry lounge host 🎧',
    },
    {
      id: 'req-2',
      name: 'Vikram Malhotra',
      handle: '@vikram_gaming',
      userId: '601928',
      level: 'Lv.49',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
      cover: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80',
      isOnline: false,
      time: '2h ago',
      bio: 'Esports broadcaster & gamer 🎮',
    },
  ];

  // Filter following users
  const followingList = MOCK_STREAM_USERS.filter((user) =>
    followedUsers.includes(user.id)
  ).filter((user) =>
    !searchQuery ||
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.handle.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
              <h1 className="text-lg sm:text-xl font-black text-white">Connections</h1>
            </div>

            <div className="text-xs font-semibold text-fuchsia-400">
              {followingList.length} Following
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-4 space-y-4">
          
          {/* Search Connections Input */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search users..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white/[0.06] border border-white/12 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-fuchsia-500/50"
            />
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center justify-between rounded-2xl bg-white/[0.04] p-1 border border-white/8 text-xs sm:text-sm font-bold">
            <button
              onClick={() => setActiveTab('friends')}
              className={`flex-1 py-2 text-center rounded-xl transition-all cursor-pointer ${
                activeTab === 'friends'
                  ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Friends (0)
            </button>
            <button
              onClick={() => setActiveTab('following')}
              className={`flex-1 py-2 text-center rounded-xl transition-all cursor-pointer ${
                activeTab === 'following'
                  ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Following ({followedUsers.length})
            </button>
            <button
              onClick={() => setActiveTab('fans')}
              className={`flex-1 py-2 text-center rounded-xl transition-all cursor-pointer ${
                activeTab === 'fans'
                  ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Fans (0)
            </button>
            <button
              onClick={() => setActiveTab('requests')}
              className={`flex-1 py-2 text-center rounded-xl transition-all cursor-pointer ${
                activeTab === 'requests'
                  ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Requests (2)
            </button>
          </div>

          {/* TAB 1: Following List */}
          {activeTab === 'following' && (
            <div className="space-y-2.5">
              {followingList.map((user) => {
                const following = isFollowing(user.id);

                return (
                  <div
                    key={user.id}
                    onClick={() => setSelectedUser(user)}
                    className="p-3 sm:p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/8 hover:border-fuchsia-500/30 transition-all flex items-center justify-between gap-3 cursor-pointer group"
                  >
                    {/* User Avatar & Info */}
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative shrink-0">
                        <img
                          src={user.cover}
                          alt={user.name}
                          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-fuchsia-500/50"
                        />
                        {user.isOnline && (
                          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#07080d] flex items-center justify-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                          </span>
                        )}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h3 className="text-sm font-bold text-white group-hover:text-fuchsia-300 transition-colors truncate">
                            {user.name}
                          </h3>
                          {user.isVerified && (
                            <span className="p-0.5 rounded-full bg-cyan-500 text-white shrink-0">
                              <Award className="w-2.5 h-2.5" />
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400 truncate">{user.handle} • ID: {user.userId}</p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            {user.level}
                          </span>
                          <span className="text-[10px] text-emerald-400 font-semibold">
                            {user.isOnline ? 'Online' : 'Offline'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFollow(user.id);
                          showToast(following ? `Unfollowed ${user.name}` : `Followed ${user.name}!`);
                        }}
                        className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                          following
                            ? 'bg-white/10 hover:bg-rose-500/20 text-slate-300 hover:text-rose-300 border border-white/10'
                            : 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-md shadow-fuchsia-600/30'
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
                            <span>Follow</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}

              {followingList.length === 0 && (
                <div className="py-16 text-center space-y-2">
                  <p className="text-sm text-slate-400">No users found matching your search</p>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: My Friends */}
          {activeTab === 'friends' && (
            <div className="py-16 text-center space-y-3 bg-white/[0.02] rounded-3xl border border-white/5 p-6">
              <Sparkles className="w-10 h-10 text-fuchsia-400/50 mx-auto" />
              <h3 className="text-base font-bold text-white">No Mutual Friends Yet</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                When you follow someone and they follow you back, they will appear here as your mutual friend!
              </p>
            </div>
          )}

          {/* TAB 3: Fans */}
          {activeTab === 'fans' && (
            <div className="py-16 text-center space-y-3 bg-white/[0.02] rounded-3xl border border-white/5 p-6">
              <Sparkles className="w-10 h-10 text-fuchsia-400/50 mx-auto" />
              <h3 className="text-base font-bold text-white">No Fans Yet</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                Start broadcasting live or joining voice rooms to build your global fan following on DreamLive!
              </p>
            </div>
          )}

          {/* TAB 4: Friend Requests */}
          {activeTab === 'requests' && (
            <div className="space-y-2.5">
              {friendRequests.map((req) => (
                <div
                  key={req.id}
                  onClick={() => setSelectedUser(req)}
                  className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.03] border border-white/8 hover:border-fuchsia-500/30 transition-all flex items-center justify-between gap-3 cursor-pointer group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={req.avatar}
                      alt={req.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-fuchsia-500/50 shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-white group-hover:text-fuchsia-300 transition-colors truncate">
                        {req.name}
                      </h4>
                      <p className="text-xs text-slate-400 truncate">{req.bio}</p>
                      <span className="text-[10px] text-fuchsia-400 font-medium">{req.time}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        showToast(`Accepted friend request from ${req.name}!`);
                      }}
                      className="px-3 py-1.5 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-xs font-bold shadow-md cursor-pointer"
                    >
                      Accept
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        showToast(`Ignored request`);
                      }}
                      className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/15 text-slate-300 text-xs font-semibold cursor-pointer"
                    >
                      Decline
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* User Profile Modal */}
        {selectedUser && (
          <UserProfileModal
            user={selectedUser}
            onClose={() => setSelectedUser(null)}
          />
        )}
      </div>
    </PageTransition>
  );
};

export default FriendsPage;
