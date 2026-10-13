import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

const AppContext = createContext(null);

const DEFAULT_NOTIFICATIONS = [
  {
    id: 'notif-1',
    title: 'New Follower',
    message: 'Simran Wakiya started following you.',
    time: '5m ago',
    read: false,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    type: 'follow',
  },
  {
    id: 'notif-2',
    title: 'Daily Reward Ready',
    message: 'Rossy, your daily reward is ready! Claim today\'s coins now.',
    time: '1h ago',
    read: false,
    avatar: null,
    icon: 'Gift',
    type: 'reward',
  },
  {
    id: 'notif-3',
    title: 'New Message',
    message: 'You received a new message from Call Me ❤️.',
    time: '2h ago',
    read: false,
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    type: 'message',
  },
  {
    id: 'notif-4',
    title: 'Friend Request',
    message: 'You have a new friend request from Aarav Patel.',
    time: '4h ago',
    read: false,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    type: 'friend',
  },
  {
    id: 'notif-5',
    title: 'Profile Visitor',
    message: 'Someone visited your profile. See who is viewing you.',
    time: '1d ago',
    read: true,
    avatar: null,
    icon: 'Eye',
    type: 'system',
  },
  {
    id: 'notif-6',
    title: 'Daily Check-In',
    message: 'Daily Check-In reward is available. Keep your streak alive!',
    time: '2d ago',
    read: true,
    avatar: null,
    icon: 'Calendar',
    type: 'reward',
  },
];

const INITIAL_FOLLOWED_IDS = [
  'user-1',
  'user-2',
  'user-3',
  'user-4',
  'user-5',
  'user-6',
  'user-7',
  'user-8',
  'user-9',
  'user-10',
];

export const AppProvider = ({ children }) => {
  // 1. Notifications State
  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem('dreamlive_notifications');
      return saved ? JSON.parse(saved) : DEFAULT_NOTIFICATIONS;
    } catch {
      return DEFAULT_NOTIFICATIONS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('dreamlive_notifications', JSON.stringify(notifications));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [notifications]);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  // 2. Daily Check-in State (Day 1 - 7)
  const [dailyCheckIn, setDailyCheckIn] = useState(() => {
    try {
      const saved = localStorage.getItem('dreamlive_daily_checkin');
      return saved
        ? JSON.parse(saved)
        : {
            claimedDays: [1], // Day 1 claimed initially
            currentDay: 2,
            streak: 1,
            lastClaimDate: new Date().toDateString(),
          };
    } catch {
      return {
        claimedDays: [1],
        currentDay: 2,
        streak: 1,
        lastClaimDate: new Date().toDateString(),
      };
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('dreamlive_daily_checkin', JSON.stringify(dailyCheckIn));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [dailyCheckIn]);

  const claimDailyReward = (dayNumber, rewardAmount = 100) => {
    if (dailyCheckIn.claimedDays.includes(dayNumber)) return false;

    // Trigger confetti animation
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#a855f7', '#ec4899', '#3b82f6', '#fbbf24'],
    });

    setDailyCheckIn((prev) => ({
      ...prev,
      claimedDays: [...prev.claimedDays, dayNumber],
      streak: prev.streak + 1,
      lastClaimDate: new Date().toDateString(),
    }));

    // Add reward coins to wallet
    addCoins(rewardAmount, `Daily Check-In Day ${dayNumber} Reward`);
    return true;
  };

  // 3. Followed Users State
  const [followedUsers, setFollowedUsers] = useState(() => {
    try {
      const saved = localStorage.getItem('dreamlive_followed_users');
      return saved ? JSON.parse(saved) : INITIAL_FOLLOWED_IDS;
    } catch {
      return INITIAL_FOLLOWED_IDS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('dreamlive_followed_users', JSON.stringify(followedUsers));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [followedUsers]);

  const toggleFollow = (userId) => {
    setFollowedUsers((prev) => {
      if (prev.includes(userId)) {
        return prev.filter((id) => id !== userId);
      } else {
        return [...prev, userId];
      }
    });
  };

  const isFollowing = (userId) => followedUsers.includes(userId);

  // 4. Wallet State
  const [wallet, setWallet] = useState(() => {
    try {
      const saved = localStorage.getItem('dreamlive_wallet');
      return saved
        ? JSON.parse(saved)
        : {
            coins: 480,
            diamonds: 1250,
            transactions: [
              { id: 'tx-1', type: 'recharge', description: 'Welcome Bonus Coins', amount: '+300 Coins', date: 'Yesterday' },
              { id: 'tx-2', type: 'gift', description: 'Neon Rose Sent to Riya Sharma', amount: '-10 Coins', date: '2 days ago' },
              { id: 'tx-3', type: 'reward', description: 'Daily Check-In Day 1', amount: '+50 Coins', date: '3 days ago' },
            ],
          };
    } catch {
      return {
        coins: 480,
        diamonds: 1250,
        transactions: [
          { id: 'tx-1', type: 'recharge', description: 'Welcome Bonus Coins', amount: '+300 Coins', date: 'Yesterday' },
          { id: 'tx-2', type: 'gift', description: 'Neon Rose Sent to Riya Sharma', amount: '-10 Coins', date: '2 days ago' },
          { id: 'tx-3', type: 'reward', description: 'Daily Check-In Day 1', amount: '+50 Coins', date: '3 days ago' },
        ],
      };
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('dreamlive_wallet', JSON.stringify(wallet));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [wallet]);

  const addCoins = (amount, description = 'Recharge Coins') => {
    setWallet((prev) => ({
      ...prev,
      coins: prev.coins + amount,
      transactions: [
        {
          id: `tx-${Date.now()}`,
          type: 'recharge',
          description,
          amount: `+${amount} Coins`,
          date: 'Just now',
        },
        ...prev.transactions,
      ],
    }));
  };

  // 5. Active Category & Search Query State
  const [activeCategory, setActiveCategory] = useState(() => {
    return localStorage.getItem('dreamlive_active_cat') || 'ELITE';
  });

  useEffect(() => {
    localStorage.setItem('dreamlive_active_cat', activeCategory);
  }, [activeCategory]);

  const [searchQuery, setSearchQuery] = useState('');

  // 6. User Profile Data
  const profileData = {
    username: 'Rossy',
    id: '1288846',
    gender: 'female',
    age: 18,
    vipStatus: 'VIP 0',
    level: 'Lv.01',
    badge: 'Any',
    stats: {
      friends: 0,
      following: followedUsers.length,
      fans: 0,
    },
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=1200&auto=format&fit=crop&q=80',
  };

  // 7. Toast / Feedback notification
  const [toastMessage, setToastMessage] = useState(null);
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2600);
  };

  return (
    <AppContext.Provider
      value={{
        notifications,
        markAsRead,
        markAllAsRead,
        unreadCount,
        dailyCheckIn,
        claimDailyReward,
        followedUsers,
        toggleFollow,
        isFollowing,
        wallet,
        addCoins,
        activeCategory,
        setActiveCategory,
        searchQuery,
        setSearchQuery,
        profileData,
        showToast,
        toastMessage,
      }}
    >
      {children}

      {/* Global Lightweight Toast */}
      {toastMessage && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full bg-[#161226]/95 border border-fuchsia-500/40 text-white text-xs font-semibold shadow-2xl shadow-fuchsia-950/60 backdrop-blur-xl animate-fade-in flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export default AppContext;
