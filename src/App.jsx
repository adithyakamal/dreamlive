import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import AnimatedBackground from './components/common/AnimatedBackground';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import BottomNav from './components/common/BottomNav';
import DownloadModal from './components/common/DownloadModal';
import CreatorSignupModal from './components/home/CreatorSignupModal';
import CustomCursor from './components/common/CustomCursor';
import { AppProvider } from './context/AppContext';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ProfilePage from './pages/ProfilePage';
import FriendsPage from './pages/FriendsPage';
import NotificationsPage from './pages/NotificationsPage';
import LevelPage from './pages/LevelPage';
import VIPPage from './pages/VIPPage';
import WalletPage from './pages/WalletPage';
import MallPage from './pages/MallPage';
import DailyCheckInPage from './pages/DailyCheckInPage';
import SettingsPage from './pages/SettingsPage';
import CustomerServicePage from './pages/CustomerServicePage';
import MessagesPage from './pages/MessagesPage';
import DiscoverPage from './pages/DiscoverPage';

// Scroll to top helper on route navigation or hash anchor scroll
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

export function App() {
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [isCreatorModalOpen, setIsCreatorModalOpen] = useState(false);

  return (
    <AppProvider>
      <div className="relative min-h-screen bg-transparent text-slate-100 selection:bg-fuchsia-500 selection:text-white flex flex-col justify-between">
        <ScrollToTop />
        
        {/* Global Custom Cursor */}
        <CustomCursor />

        {/* Fixed Cinematic Background Video System */}
        <AnimatedBackground />

        {/* Global Navbar */}
        <Navbar
          onOpenDownload={() => setIsDownloadModalOpen(true)}
          onOpenCreatorModal={() => setIsCreatorModalOpen(true)}
        />

        {/* Main Routed Content */}
        <main className="flex-grow relative z-10 w-full min-h-screen">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  onOpenDownload={() => setIsDownloadModalOpen(true)}
                  isCreatorModalOpen={isCreatorModalOpen}
                  setIsCreatorModalOpen={setIsCreatorModalOpen}
                />
              }
            />
            <Route
              path="/home"
              element={
                <HomePage
                  onOpenDownload={() => setIsDownloadModalOpen(true)}
                  isCreatorModalOpen={isCreatorModalOpen}
                  setIsCreatorModalOpen={setIsCreatorModalOpen}
                />
              }
            />
            <Route
              path="/profile"
              element={<ProfilePage />}
            />
            <Route
              path="/friends"
              element={<FriendsPage />}
            />
            <Route
              path="/notifications"
              element={<NotificationsPage />}
            />
            <Route
              path="/level"
              element={<LevelPage />}
            />
            <Route
              path="/vip"
              element={<VIPPage />}
            />
            <Route
              path="/wallet"
              element={<WalletPage />}
            />
            <Route
              path="/mall"
              element={<MallPage />}
            />
            <Route
              path="/daily-checkin"
              element={<DailyCheckInPage />}
            />
            <Route
              path="/settings"
              element={<SettingsPage />}
            />
            <Route
              path="/customer-service"
              element={<CustomerServicePage />}
            />
            <Route
              path="/messages"
              element={<MessagesPage />}
            />
            <Route
              path="/discover"
              element={<DiscoverPage />}
            />
            <Route
              path="/about"
              element={
                <AboutPage
                  onOpenDownload={() => setIsDownloadModalOpen(true)}
                  isCreatorModalOpen={isCreatorModalOpen}
                  setIsCreatorModalOpen={setIsCreatorModalOpen}
                />
              }
            />
            <Route
              path="/contact"
              element={
                <ContactPage
                  onOpenDownload={() => setIsDownloadModalOpen(true)}
                  isCreatorModalOpen={isCreatorModalOpen}
                  setIsCreatorModalOpen={setIsCreatorModalOpen}
                />
              }
            />
            <Route
              path="*"
              element={
                <HomePage
                  onOpenDownload={() => setIsDownloadModalOpen(true)}
                  isCreatorModalOpen={isCreatorModalOpen}
                  setIsCreatorModalOpen={setIsCreatorModalOpen}
                />
              }
            />
          </Routes>
        </main>

        {/* Global Bottom Navigation (Fixed on mobile / app views) */}
        <BottomNav />

        {/* Global Footer */}
        <Footer
          onOpenDownload={() => setIsDownloadModalOpen(true)}
          onOpenCreatorModal={() => setIsCreatorModalOpen(true)}
        />

        {/* Global Download Modal */}
        <DownloadModal
          isOpen={isDownloadModalOpen}
          onClose={() => setIsDownloadModalOpen(false)}
        />

        {/* Global Creator / Agency Modal */}
        <CreatorSignupModal
          isOpen={isCreatorModalOpen}
          onClose={() => setIsCreatorModalOpen(false)}
        />
      </div>
    </AppProvider>
  );
}

export default App;
