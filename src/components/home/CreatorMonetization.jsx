import React, { useState } from 'react';
import { DollarSign, Users, TrendingUp, Sparkles, ArrowRight, Wallet, CheckCircle, Flame, Coins, ShieldCheck } from 'lucide-react';
import Button from '../common/Button';
import SplitText from '../animations/SplitText';
import BlurText from '../animations/BlurText';
import GradientText from '../animations/GradientText';
import FadeContent from '../animations/FadeContent';
import ScrollReveal from '../animations/ScrollReveal';
import SpotlightCard from '../animations/SpotlightCard';
import GlareHover from '../animations/GlareHover';
import Magnet from '../animations/Magnet';

export const CreatorMonetization = ({ onOpenCreatorModal }) => {
  const [streamHoursPerDay, setStreamHoursPerDay] = useState(3);
  const [activeAudience, setActiveAudience] = useState(500);

  // Estimated creator calculation
  const estimatedMonthly = Math.round(streamHoursPerDay * 30 * (activeAudience * 2.8));

  return (
    <section id="monetization" className="py-20 relative z-10 overflow-hidden section-stable">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Heading with React Bits Animations */}
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-400/40 text-emerald-200 text-xs font-bold uppercase tracking-wider backdrop-blur-xl shadow-lg">
            <DollarSign className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>Host Monetization & Careers</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            <span className="text-title-primary">
              <SplitText text="Turn Your Passion Into a" />
            </span>{' '}
            <GradientText className="font-black drop-shadow-[0_2px_14px_rgba(168,85,247,0.4)]">
              Thriving Career
            </GradientText>
          </h2>

          <FadeContent blur={true} duration={0.8} delay={0.15}>
            <BlurText
              text="Top-Class Entertainment LLP provides transparent creator economics, automated daily diamond payouts, and verified agency partnerships worldwide."
              className="text-base sm:text-lg text-slate-200 font-medium leading-relaxed max-w-2xl mx-auto text-shadow-subtle"
              delay={0.1}
            />
          </FadeContent>
        </ScrollReveal>

        {/* Highlight Stats Badges */}
        <ScrollReveal delay={0.1} className="flex flex-wrap items-center justify-center gap-4 mb-12">
          {[
            { icon: Flame, text: 'Top 10% Earn ₹2.5L+ Monthly', color: 'text-amber-300 border-amber-400/40 bg-amber-950/80' },
            { icon: CheckCircle, text: 'Instant Daily Payouts to Bank', color: 'text-emerald-300 border-emerald-400/40 bg-emerald-950/80' },
            { icon: ShieldCheck, text: 'Verified Talent Agency Support', color: 'text-cyan-300 border-cyan-400/40 bg-cyan-950/80' },
          ].map((badge, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold border backdrop-blur-xl shadow-lg ${badge.color}`}
            >
              <badge.icon className="w-3.5 h-3.5" />
              <span className="text-shadow-subtle">{badge.text}</span>
            </div>
          ))}
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          
          {/* Left: Monetization Pillars with Spotlight Cards */}
          <div className="lg:col-span-6 space-y-6">
            <ScrollReveal delay={0.1}>
              <SpotlightCard className="p-6 sm:p-7 rounded-3xl glass-panel border border-white/20 space-y-3 hover:border-violet-500/50 transition-colors bg-slate-950/85 backdrop-blur-2xl shadow-xl">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-violet-600 to-fuchsia-600 flex items-center justify-center text-white shadow-lg shadow-violet-500/30">
                  <Wallet className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white text-shadow-contrast">Direct Virtual Gift Revenue</h3>
                <p className="text-sm text-slate-200 leading-relaxed text-shadow-subtle">
                  Every animated gift sent by viewers converts instantly into Diamonds/Beans inside your wallet. Withdraw directly to your verified bank account at any time with 0% platform hidden fees.
                </p>
              </SpotlightCard>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <SpotlightCard className="p-6 sm:p-7 rounded-3xl glass-panel border border-white/20 space-y-3 hover:border-fuchsia-500/50 transition-colors bg-slate-950/85 backdrop-blur-2xl shadow-xl">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-fuchsia-600 to-pink-600 flex items-center justify-center text-white shadow-lg shadow-fuchsia-500/30">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white text-shadow-contrast">PK Tournaments &amp; Milestone Bonuses</h3>
                <p className="text-sm text-slate-200 leading-relaxed text-shadow-subtle">
                  Win weekly global PK battles and cross daily streaming milestones to earn direct cash bonuses, verified badges, and platform-wide banner highlights.
                </p>
              </SpotlightCard>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <SpotlightCard className="p-6 sm:p-7 rounded-3xl glass-panel border border-white/20 space-y-3 hover:border-cyan-500/50 transition-colors bg-slate-950/85 backdrop-blur-2xl shadow-xl">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/30">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white text-shadow-contrast">Agency &amp; Talent Management</h3>
                <p className="text-sm text-slate-200 leading-relaxed text-shadow-subtle">
                  Talent agencies receive dedicated backend dashboards, host performance tracking, multi-host payroll management, and tiered agency commission rewards.
                </p>
              </SpotlightCard>
            </ScrollReveal>
          </div>

          {/* Right: Interactive Creator Earnings Calculator */}
          <div className="lg:col-span-6">
            <ScrollReveal delay={0.2}>
              <GlareHover
                glareColor="rgba(16, 185, 129, 0.2)"
                glareSize={300}
                borderRadius="28px"
              >
                <div className="p-6 sm:p-8 rounded-3xl glass-panel-glow border border-white/25 space-y-6 bg-slate-950/85 backdrop-blur-2xl shadow-2xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-fuchsia-300 uppercase tracking-wider text-shadow-subtle">
                      <Sparkles className="w-4 h-4 animate-spin text-fuchsia-400" style={{ animationDuration: '4s' }} />
                      Creator Income Estimator
                    </div>
                    <span className="text-xs text-emerald-300 font-bold flex items-center gap-1 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-400/40 shadow-sm">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Direct Payouts
                    </span>
                  </div>

                  {/* Slider 1: Streaming Hours */}
                  <div className="space-y-2.5">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-200 font-medium text-shadow-subtle">Daily Streaming Time:</span>
                      <span className="text-white font-bold px-2 py-0.5 rounded bg-white/10 text-shadow-subtle">{streamHoursPerDay} Hours / Day</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={streamHoursPerDay}
                      onChange={(e) => setStreamHoursPerDay(Number(e.target.value))}
                      className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-fuchsia-500"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                      <span>1 hr (Part-time)</span>
                      <span>5 hrs (Pro)</span>
                      <span>10 hrs (Full-time)</span>
                    </div>
                  </div>

                  {/* Slider 2: Average Concurrent Viewers */}
                  <div className="space-y-2.5">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-200 font-medium text-shadow-subtle">Avg. Concurrent Viewers:</span>
                      <span className="text-white font-bold px-2 py-0.5 rounded bg-white/10 text-shadow-subtle">{activeAudience.toLocaleString()} Viewers</span>
                    </div>
                    <input
                      type="range"
                      min="100"
                      max="5000"
                      step="100"
                      value={activeAudience}
                      onChange={(e) => setActiveAudience(Number(e.target.value))}
                      className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-violet-500"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                      <span>100 Viewers</span>
                      <span>2,500 Viewers</span>
                      <span>5,000+ Viewers</span>
                    </div>
                  </div>

                  {/* Estimated Result Card */}
                  <div className="p-6 rounded-2xl bg-gradient-to-r from-violet-950/90 via-purple-950/80 to-fuchsia-950/90 border border-violet-400/40 text-center space-y-1.5 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-2 right-3 flex items-center gap-1 text-amber-300 text-xs font-bold text-shadow-subtle">
                      <Coins className="w-3.5 h-3.5 text-amber-400" />
                      <span>Est. Diamond Rate</span>
                    </div>
                    <span className="text-xs text-slate-300 font-bold uppercase tracking-wider block text-shadow-subtle">
                      Estimated Monthly Potential
                    </span>
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-amber-300 drop-shadow-[0_0_25px_rgba(245,158,11,0.5)]">
                      ₹{estimatedMonthly.toLocaleString('en-IN')}
                    </div>
                    <p className="text-[11px] text-slate-300 pt-1 font-medium max-w-sm mx-auto text-shadow-subtle">
                      Based on average gift turnover, daily streaming bonuses &amp; fan club memberships.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <Magnet strength={10} className="w-full">
                      <Button
                        variant="primary"
                        size="md"
                        className="w-full font-bold shadow-xl shadow-fuchsia-600/30"
                        onClick={onOpenCreatorModal}
                        icon={ArrowRight}
                        iconPosition="right"
                      >
                        Apply as Host / Creator
                      </Button>
                    </Magnet>
                    <Magnet strength={10} className="w-full">
                      <Button
                        variant="secondary"
                        size="md"
                        className="w-full bg-slate-950/80 border-white/20"
                        onClick={onOpenCreatorModal}
                      >
                        Agency Registration
                      </Button>
                    </Magnet>
                  </div>
                </div>
              </GlareHover>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(CreatorMonetization);
