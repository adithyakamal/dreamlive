import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Radio, Mail, Phone, MapPin, Clock, ArrowRight, Heart, Shield, CheckCircle2 } from 'lucide-react';
import { COMPANY_INFO } from '../../data/dreamLiveContent';
import { FOOTER_SECTIONS } from '../../data/navigation';
import Button from './Button';
import ShinyText from '../animations/ShinyText';
import Magnet from '../animations/Magnet';
import DreamLiveLogo from './DreamLiveLogo';

export const Footer = ({ onOpenCreatorModal, onOpenDownload }) => {
  const [subscribedEmail, setSubscribedEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (subscribedEmail) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setSubscribedEmail('');
      }, 4000);
    }
  };

  return (
    <footer className="relative bg-[#06070a]/95 backdrop-blur-3xl border-t border-white/15 pt-14 sm:pt-20 pb-[max(9.5rem,calc(8.5rem+env(safe-area-inset-bottom,0px)))] sm:pb-[max(8.5rem,calc(7.5rem+env(safe-area-inset-bottom,0px)))] lg:pb-[max(7.5rem,calc(6.5rem+env(safe-area-inset-bottom,0px)))] overflow-hidden z-10 shadow-2xl">
      {/* Background ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-gradient-to-t from-violet-600/15 via-fuchsia-600/10 to-transparent blur-[140px] pointer-events-none" />
      {/* Subtle top-edge gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/60 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-16">
          {/* Brand & Mission Column */}
          <div className="lg:col-span-2 space-y-5">
            <Link to="/" className="inline-flex items-center group">
              <DreamLiveLogo size={46} />
            </Link>

            <p className="text-sm text-slate-300 leading-relaxed max-w-sm text-shadow-subtle">
              {COMPANY_INFO.description}
            </p>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/15 space-y-2.5 max-w-md shadow-xl">
              <div className="flex items-start gap-2.5 text-xs text-slate-200">
                <MapPin className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-200">
                <Mail className="w-4 h-4 text-fuchsia-400 shrink-0" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-white transition-colors underline-offset-2 hover:underline">
                  {COMPANY_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-200">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href={`tel:${COMPANY_INFO.phone.replace(/\s+/g, '')}`} className="hover:text-white transition-colors">
                  {COMPANY_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-400 pt-1 border-t border-white/10">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Mon–Fri: {COMPANY_INFO.hours.weekday} | Sat–Sun: {COMPANY_INFO.hours.weekend}</span>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          {FOOTER_SECTIONS.map((section, idx) => (
            <div key={idx} className="space-y-4">
              <h4 className="text-sm font-black text-white uppercase tracking-wider text-shadow-contrast">
                {section.title}
              </h4>
              <ul className="space-y-2.5 text-sm">
                {section.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    {link.action === 'openCreatorModal' || link.action === 'openAgencyModal' ? (
                      <button
                        onClick={onOpenCreatorModal}
                        className="text-slate-300 hover:text-fuchsia-300 transition-colors text-left cursor-pointer font-medium"
                      >
                        {link.label}
                      </button>
                    ) : link.action === 'openDownloadModal' ? (
                      <button
                        onClick={onOpenDownload}
                        className="text-slate-300 hover:text-fuchsia-300 transition-colors text-left cursor-pointer font-medium"
                      >
                        {link.label}
                      </button>
                    ) : link.href.startsWith('/#') ? (
                      <a
                        href={link.href}
                        className="text-slate-300 hover:text-white transition-colors font-medium"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-slate-300 hover:text-white transition-colors font-medium"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter & Creator Quick Subscribe with High Local Contrast */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-950/90 border border-white/20 mb-12 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xl backdrop-blur-2xl">
          <div className="space-y-1 text-center lg:text-left">
            <h3 className="text-lg font-bold text-white flex items-center justify-center lg:justify-start gap-2 text-shadow-contrast">
              <Shield className="w-5 h-5 text-violet-400" />
              <ShinyText>Stay Updated with DreamLive Announcements &amp; Events</ShinyText>
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 text-shadow-subtle">
              Get official notifications on upcoming PK tournaments, VIP gift releases, and creator incentives.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex flex-col sm:flex-row items-center gap-3">
            <div className="relative w-full sm:w-72">
              <input
                type="email"
                required
                value={subscribedEmail}
                onChange={(e) => setSubscribedEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2.5 rounded-full bg-black/80 border border-white/20 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-violet-500 transition-colors shadow-inner"
              />
            </div>
            <Magnet strength={10} className="w-full sm:w-auto">
              <Button
                type="submit"
                variant="primary"
                size="sm"
                className="w-full sm:w-auto shrink-0 shadow-lg shadow-fuchsia-600/30"
                icon={isSubscribed ? CheckCircle2 : ArrowRight}
                iconPosition="right"
              >
                {isSubscribed ? 'Subscribed!' : 'Subscribe'}
              </Button>
            </Magnet>
          </form>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p className="flex items-center gap-1.5 text-center sm:text-left">
            © {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved.
            <span className="inline-flex items-center gap-1 text-slate-300 ml-2">
              Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for Live Entertainment
            </span>
          </p>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-4 sm:gap-6">
            <Link to="/about" className="hover:text-white transition-colors font-medium">
              About Us
            </Link>
            <Link to="/about#faq" className="hover:text-white transition-colors font-medium">
              FAQs &amp; Security
            </Link>
            <Link to="/contact" className="hover:text-white transition-colors font-medium">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
