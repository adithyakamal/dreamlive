import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Radio, Menu, X, Sparkles, Download, UserPlus, Flame, Zap } from 'lucide-react';
import { NAV_LINKS } from '../../data/navigation';
import Button from './Button';
import ShinyText from '../animations/ShinyText';
import Magnet from '../animations/Magnet';
import DreamLiveLogo from './DreamLiveLogo';

export const Navbar = ({ onOpenDownload, onOpenCreatorModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isScrolledRef = useRef(false);
  const location = useLocation();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const nextScrolled = window.scrollY > 20;
          if (nextScrolled !== isScrolledRef.current) {
            isScrolledRef.current = nextScrolled;
            setIsScrolled(nextScrolled);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/' && !location.hash;
    if (path.startsWith('/#')) return location.pathname === '/' && location.hash === path.slice(1);
    return location.pathname === path;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#07080d]/95 backdrop-blur-2xl border-b border-white/15 shadow-2xl shadow-black/80 py-3'
          : 'bg-slate-950/70 backdrop-blur-xl border-b border-white/10 py-3.5 sm:py-4 shadow-lg'
      }`}
    >
      {/* Top subtle glow line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />

      <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 lg:gap-3 xl:gap-4 w-full min-w-0">
          
          {/* Official DreamLive Logo */}
          <div className="flex items-center flex-shrink-0 min-w-0">
            <Link
              to="/"
              className="group focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 rounded-xl block"
            >
              <DreamLiveLogo size={38} className="lg:scale-95 xl:scale-100 origin-left" />
            </Link>
          </div>

          {/* Desktop Navigation Links with High Local Contrast & Responsive Fluid Scaling */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 2xl:gap-1.5 px-1.5 xl:px-2.5 2xl:px-3 py-1 rounded-full bg-slate-950/85 border border-white/15 backdrop-blur-2xl flex-shrink-0 shadow-xl mx-auto">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.path);
              const isHashLink = link.path.startsWith('/#');

              const linkClasses = `relative px-2 xl:px-2.5 2xl:px-3.5 py-1 rounded-full text-[11px] xl:text-xs 2xl:text-sm font-bold transition-all duration-200 whitespace-nowrap ${
                active
                  ? 'text-white font-black'
                  : 'text-slate-200 hover:text-white hover:bg-white/10'
              }`;

              const activeIndicator = active && (
                <motion.div
                  layoutId="navbar-active-indicator"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 -z-10 shadow-md shadow-fuchsia-500/40"
                  transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                />
              );

              return isHashLink ? (
                <a key={link.name} href={link.path} className={linkClasses}>
                  {activeIndicator}
                  <span className="relative z-10 text-shadow-subtle">{link.name}</span>
                </a>
              ) : (
                <Link key={link.name} to={link.path} className={linkClasses}>
                  {activeIndicator}
                  <span className="relative z-10 text-shadow-subtle">{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center gap-1.5 xl:gap-2.5 2xl:gap-3 flex-shrink-0 justify-end">
            {/* Live Count Pill (2xl only) */}
            <div className="hidden 2xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-950/80 border border-rose-500/30 text-rose-200 text-xs font-bold backdrop-blur-xl shadow-md">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              <span className="text-shadow-subtle">2.4K Streams Live</span>
            </div>

            <Magnet strength={10}>
              <button
                onClick={onOpenCreatorModal}
                className="hidden xl:flex items-center gap-1.5 px-3 xl:px-3.5 py-1.5 text-xs font-bold text-violet-200 hover:text-white rounded-full bg-slate-950/80 hover:bg-slate-900 border border-violet-400/40 transition-all cursor-pointer shadow-lg backdrop-blur-xl"
              >
                <UserPlus className="w-3.5 h-3.5 text-fuchsia-400" />
                <span className="text-shadow-subtle">Become Host</span>
              </button>
            </Magnet>

            <Magnet strength={10}>
              <Button
                variant="primary"
                size="sm"
                icon={Download}
                onClick={onOpenDownload}
                className="shadow-xl shadow-fuchsia-600/30 font-bold px-3 xl:px-4 text-xs xl:text-sm py-1.5"
              >
                <ShinyText>Get App</ShinyText>
              </Button>
            </Magnet>
          </div>

          {/* Mobile/Tablet Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2 flex-shrink-0">
            <button
              onClick={onOpenDownload}
              className="p-2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-xs font-semibold flex items-center justify-center shadow-lg shadow-violet-500/40"
              aria-label="Download app"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-950/80 border border-white/20 text-slate-200 hover:text-white focus:outline-none backdrop-blur-xl shadow-md"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-slate-950/98 backdrop-blur-3xl border-b border-white/20 shadow-2xl overflow-hidden"
          >
            <div className="px-4 pt-3 pb-6 space-y-2">
              {NAV_LINKS.map((link) => {
                const active = isActive(link.path);
                const isHashLink = link.path.startsWith('/#');

                const itemClasses = `block px-4 py-3 rounded-2xl text-sm font-bold transition-colors ${
                  active
                    ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg'
                    : 'text-slate-200 hover:text-white hover:bg-white/10'
                }`;

                return isHashLink ? (
                  <a
                    key={link.name}
                    href={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={itemClasses}
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={itemClasses}
                  >
                    {link.name}
                  </Link>
                );
              })}

              <div className="pt-4 border-t border-white/10 space-y-2.5">
                <Button
                  variant="primary"
                  size="md"
                  icon={Download}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenDownload();
                  }}
                  className="w-full font-bold shadow-xl shadow-fuchsia-600/30"
                >
                  <ShinyText>Download DreamLive App</ShinyText>
                </Button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCreatorModal();
                  }}
                  className="w-full py-3 rounded-2xl bg-slate-900 border border-violet-400/40 text-violet-200 font-bold text-sm flex items-center justify-center gap-2"
                >
                  <UserPlus className="w-4 h-4 text-fuchsia-400" />
                  <span>Become a Host / Partner</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default React.memo(Navbar);
