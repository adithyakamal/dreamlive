import React from 'react';
import { ShieldCheck, UserX, MessageSquareOff, Smartphone, ArrowRight, Lock, EyeOff, Sparkles, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import SplitText from '../animations/SplitText';
import BlurText from '../animations/BlurText';
import GradientText from '../animations/GradientText';
import FadeContent from '../animations/FadeContent';
import ScrollReveal from '../animations/ScrollReveal';
import GlareHover from '../animations/GlareHover';
import Magnet from '../animations/Magnet';

export const CommunitySafety = () => {
  const safetyFeatures = [
    {
      icon: MessageSquareOff,
      title: 'Audience Chat Mute Control',
      badge: 'Broadcaster Control',
      description:
        'Broadcasters can instantly disable "Allow Audience to chat" in room settings whenever they want a private, VIP-only or distraction-free musical performance.',
    },
    {
      icon: UserX,
      title: '1-Tap Quick Kickout & Ban',
      badge: 'Real-time Moderation',
      description:
        'Tap any abusive user\'s avatar in the live room and select "Report – Kickout" to immediately ban them and remove all disruptions from your stream.',
    },
    {
      icon: Smartphone,
      title: 'Phone Number Account Binding',
      badge: 'Asset Protection',
      description:
        'Secure your virtual diamond earnings and broadcaster ID by binding your verified mobile number with multi-factor authentication.',
    },
    {
      icon: ShieldCheck,
      title: '24/7 Dedicated Safety Support',
      badge: 'Live Priority Desk',
      description:
        'Official support desk at dreamlivecare@gmail.com actively investigates reports, handles account recovery, and enforces community rules.',
    },
  ];

  return (
    <section id="safety" className="py-20 relative z-10 overflow-hidden section-stable">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Heading with React Bits Animations */}
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-400/40 text-emerald-200 text-xs font-bold uppercase tracking-wider backdrop-blur-xl shadow-lg">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>Trust & Safety First</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            <span className="text-title-primary">
              <SplitText text="Safe, Welcoming &" />
            </span>{' '}
            <GradientText className="font-black drop-shadow-[0_2px_14px_rgba(168,85,247,0.4)]">
              Protected Community
            </GradientText>
          </h2>

          <FadeContent blur={true} duration={0.8} delay={0.15}>
            <BlurText
              text="Top-Class Entertainment LLP is committed to protecting all broadcasters and viewers with proactive AI moderation and industry-grade anti-harassment controls."
              className="text-base sm:text-lg text-slate-200 font-medium leading-relaxed max-w-2xl mx-auto text-shadow-subtle"
              delay={0.1}
            />
          </FadeContent>
        </ScrollReveal>

        {/* Safety feature cards with GlareHover */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {safetyFeatures.map((item, idx) => {
            const Icon = item.icon;
            return (
              <ScrollReveal key={idx} delay={idx * 0.08}>
                <GlareHover
                  glareColor="rgba(16, 185, 129, 0.2)"
                  glareSize={220}
                  borderRadius="24px"
                  className="h-full"
                >
                  <div className="p-6 rounded-3xl glass-panel border border-white/20 hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-950/30 transition-all group flex flex-col justify-between h-full bg-slate-950/85 backdrop-blur-2xl shadow-xl">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 group-hover:scale-110 transition-transform shadow-lg shadow-emerald-500/20">
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-400/30 shadow-sm">
                          {item.badge}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-white text-shadow-contrast group-hover:text-emerald-300 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed text-shadow-subtle">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-emerald-400">
                      <span className="flex items-center gap-1 text-shadow-subtle">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Protected
                      </span>
                      <span className="text-[10px] text-slate-300 font-bold">DreamLive Shield</span>
                    </div>
                  </div>
                </GlareHover>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Trust Badges Bar */}
        <ScrollReveal delay={0.25} className="mt-12">
          <div className="p-4 sm:p-6 rounded-2xl bg-slate-950/80 border border-white/20 backdrop-blur-2xl flex flex-wrap items-center justify-around gap-4 text-center shadow-xl">
            {[
              { label: 'Proactive AI Filter', desc: 'Real-time text & stream moderation' },
              { label: 'End-to-End Secure Payouts', desc: 'Bank-grade verification' },
              { label: 'Zero Tolerance Policy', desc: 'Strict anti-harassment enforcement' },
              { label: 'Privacy By Design', desc: 'Full control over your visibility' },
            ].map((trust, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5 text-shadow-contrast">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  {trust.label}
                </span>
                <span className="text-[11px] text-slate-300 mt-0.5 text-shadow-subtle">{trust.desc}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Read More link */}
        <ScrollReveal delay={0.3} className="mt-10 text-center">
          <Magnet strength={12}>
            <Link
              to="/about#safety"
              className="inline-flex items-center gap-2 text-sm font-bold text-violet-200 hover:text-white transition-colors group px-6 py-3 rounded-full bg-slate-950/85 border border-white/20 hover:border-violet-400/60 backdrop-blur-xl shadow-xl"
            >
              <span className="text-shadow-subtle">Read complete Community Guidelines &amp; FAQs</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Magnet>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default React.memo(CommunitySafety);
