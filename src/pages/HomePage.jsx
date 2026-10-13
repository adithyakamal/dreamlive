import React, { useState } from 'react';
import PageTransition from '../components/common/PageTransition';
import Hero from '../components/home/Hero';
import HomeAppHeader from '../components/home/HomeAppHeader';
import TwoColumnUserGrid from '../components/home/TwoColumnUserGrid';
import LiveStreamGrid from '../components/home/LiveStreamGrid';
import CinematicBroadcastSection from '../components/home/CinematicBroadcastSection';
import StreamModal from '../components/home/StreamModal';
import VirtualGifts from '../components/home/VirtualGifts';
import PKBattleShowcase from '../components/home/PKBattleShowcase';
import CreatorMonetization from '../components/home/CreatorMonetization';
import CommunitySafety from '../components/home/CommunitySafety';
import AppDownloadCTA from '../components/home/AppDownloadCTA';
import CreatorSignupModal from '../components/home/CreatorSignupModal';
import { CORE_FEATURES, TESTIMONIALS } from '../data/dreamLiveContent';
import { Radio, Users2, Swords, Gift, ShieldCheck, Trophy, Quote, Sparkles } from 'lucide-react';
import SplitText from '../components/animations/SplitText';
import BlurText from '../components/animations/BlurText';
import GradientText from '../components/animations/GradientText';
import FadeContent from '../components/animations/FadeContent';
import ScrollReveal from '../components/animations/ScrollReveal';
import SpotlightCard from '../components/animations/SpotlightCard';
import TiltedCard from '../components/animations/TiltedCard';
import GlareHover from '../components/animations/GlareHover';
import AnimatedImage from '../components/animations/AnimatedImage';

const ICON_MAP = {
  Radio,
  Users2,
  Swords,
  Gift,
  ShieldCheck,
  Trophy,
};

export const HomePage = ({ onOpenDownload, isCreatorModalOpen, setIsCreatorModalOpen }) => {
  const [selectedStream, setSelectedStream] = useState(null);

  return (
    <PageTransition>
      <div className="relative pb-16">
        {/* 1. DREAMLIVE HERO / LANDING SECTION (First section users see) */}
        <Hero
          onOpenDownload={onOpenDownload}
          onOpenCreatorModal={() => setIsCreatorModalOpen(true)}
          onSelectStream={(stream) => setSelectedStream(stream)}
        />

        {/* 2. POPULAR LIVE STREAMS (Popular, Party, ELITE, Music, Multi, PK, Event + Broadcaster Cards) */}
        <section id="app-live-discovery" className="py-10 sm:py-14 relative z-20 section-stable w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            {/* Header: Translucent Search Bar + Friends Icon + Notification Bell + Categories Row */}
            <HomeAppHeader />

            {/* 2-Column Live Broadcaster Card Grid with Working Follow, Profile Modal & Filters */}
            <TwoColumnUserGrid
              onSelectStream={(stream) => setSelectedStream(stream)}
            />
          </div>
        </section>

        {/* 3. EXISTING "LIVE ENTERTAINMENT" SECTION: Live Stream Grid Discovery */}
        <LiveStreamGrid
          onSelectStream={(stream) => setSelectedStream(stream)}
        />

        {/* 4. EXISTING LIVE PLAYER / STREAM CONTENT: 10-Second High-Energy Cinematic Broadcast Showcase */}
        <CinematicBroadcastSection />

        {/* 5. Core Platform Capabilities / Features */}
        <section id="features" className="py-20 relative z-10 section-stable">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal className="text-center max-w-3xl mx-auto mb-12 space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-950/80 border border-violet-400/40 text-violet-200 text-xs font-bold uppercase tracking-wider backdrop-blur-xl shadow-lg">
                <Sparkles className="w-3.5 h-3.5 text-fuchsia-400" />
                <span>Platform Capabilities</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                <span className="text-title-primary">
                  <SplitText text="Next-Generation" />
                </span>{' '}
                <GradientText className="font-black drop-shadow-[0_2px_14px_rgba(168,85,247,0.4)]">
                  Live Social Features
                </GradientText>
              </h2>

              <FadeContent blur={true} duration={0.8} delay={0.15}>
                <BlurText
                  text="Built from the ground up for low-latency interaction, vibrant community spaces, and high-performance mobile entertainment."
                  className="text-base sm:text-lg text-slate-200 font-medium leading-relaxed max-w-2xl mx-auto text-shadow-subtle"
                  delay={0.1}
                />
              </FadeContent>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {CORE_FEATURES.map((feature, idx) => {
                const IconComponent = ICON_MAP[feature.icon] || Radio;
                return (
                  <ScrollReveal key={idx} delay={idx * 0.06}>
                    <SpotlightCard className="p-6 sm:p-8 rounded-3xl glass-panel border border-white/20 hover:border-violet-500/50 hover:shadow-2xl hover:shadow-violet-950/40 transition-all duration-300 group flex flex-col justify-between h-full bg-slate-950/85 backdrop-blur-2xl shadow-xl">
                      <div className="space-y-4">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-violet-600/40 to-fuchsia-600/40 border border-violet-400/40 flex items-center justify-center text-fuchsia-300 group-hover:scale-110 transition-transform shadow-lg shadow-violet-600/20">
                          <IconComponent className="w-7 h-7" />
                        </div>

                        <div className="inline-flex px-2.5 py-0.5 rounded-full bg-violet-500/20 text-violet-200 text-[11px] font-bold border border-violet-400/30 shadow-sm">
                          {feature.highlight}
                        </div>

                        <h3 className="text-xl font-bold text-white text-shadow-contrast group-hover:text-fuchsia-300 transition-colors">
                          {feature.title}
                        </h3>

                        <p className="text-sm text-slate-200 leading-relaxed font-normal text-shadow-subtle">
                          {feature.description}
                        </p>
                      </div>
                    </SpotlightCard>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* 6. Interactive Virtual Gifts & Economy */}
        <VirtualGifts onOpenDownload={onOpenDownload} />

        {/* 7. PK Battle Duel Showcase */}
        <PKBattleShowcase />

        {/* 8. Creator Monetization & Calculator */}
        <CreatorMonetization
          onOpenCreatorModal={() => setIsCreatorModalOpen(true)}
        />

        {/* 9. Community Safety & Anti-Harassment */}
        <CommunitySafety />

        {/* 10. Verified Creator & Agency Testimonials */}
        <section id="testimonials" className="py-20 relative z-10 section-stable">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal className="text-center max-w-3xl mx-auto mb-12 space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-fuchsia-950/80 border border-fuchsia-400/40 text-fuchsia-200 text-xs font-bold uppercase tracking-wider backdrop-blur-xl shadow-lg">
                <Quote className="w-3.5 h-3.5 text-fuchsia-400" />
                <span>Host Stories &amp; Feedback</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                <span className="text-title-primary">
                  <SplitText text="Loved by Broadcasters" />
                </span>{' '}
                <GradientText className="font-black drop-shadow-[0_2px_14px_rgba(168,85,247,0.4)]">
                  Worldwide
                </GradientText>
              </h2>

              <FadeContent blur={true} duration={0.8} delay={0.15}>
                <BlurText
                  text="Real creators who transformed their talent into lifelong fanbases and sustainable careers on DreamLive."
                  className="text-base sm:text-lg text-slate-200 font-medium leading-relaxed max-w-2xl mx-auto text-shadow-subtle"
                  delay={0.1}
                />
              </FadeContent>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {TESTIMONIALS.map((t, idx) => (
                <ScrollReveal key={idx} delay={idx * 0.08}>
                  <GlareHover
                    glareColor="rgba(236, 72, 153, 0.2)"
                    glareSize={280}
                    borderRadius="24px"
                    className="h-full"
                  >
                    <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-white/20 flex flex-col justify-between space-y-6 hover:border-fuchsia-500/50 transition-colors h-full bg-slate-950/85 backdrop-blur-2xl shadow-xl">
                      <div className="space-y-4">
                        <Quote className="w-8 h-8 text-fuchsia-400/80" />
                        <p className="text-sm text-slate-200 leading-relaxed italic text-shadow-subtle">
                          &ldquo;{t.text}&rdquo;
                        </p>
                      </div>

                      <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-violet-400 shrink-0 shadow-md">
                            <img
                              src={t.avatar}
                              alt={t.name}
                              loading="lazy"
                              decoding="async"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-white text-shadow-contrast">{t.name}</h4>
                            <p className="text-xs text-slate-300 text-shadow-subtle">{t.role}</p>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold text-amber-300 bg-amber-950/80 px-2.5 py-1 rounded-full border border-amber-400/30 shadow-sm text-shadow-subtle">
                          {t.earnings}
                        </span>
                      </div>
                    </div>
                  </GlareHover>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* 11. Direct App Download & QR Scanner CTA */}
        <AppDownloadCTA />

        {/* Live Stream Theater Simulation Modal */}
        {selectedStream && (
          <StreamModal
            stream={selectedStream}
            onClose={() => setSelectedStream(null)}
          />
        )}

        {/* Creator / Agency Application Modal */}
        <CreatorSignupModal
          isOpen={isCreatorModalOpen}
          onClose={() => setIsCreatorModalOpen(false)}
        />
      </div>
    </PageTransition>
  );
};

export default React.memo(HomePage);
