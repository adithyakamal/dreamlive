import React from 'react';
import { Building2, Globe2, Sparkles, Users, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO } from '../../data/dreamLiveContent';
import SplitText from '../animations/SplitText';
import BlurText from '../animations/BlurText';
import GradientText from '../animations/GradientText';
import FadeContent from '../animations/FadeContent';
import ScrollReveal from '../animations/ScrollReveal';
import SpotlightCard from '../animations/SpotlightCard';
import GlareHover from '../animations/GlareHover';
import Meshy3DViewer from '../3d/Meshy3DViewer';

export const AboutHero = () => {
  const milestones = [
    {
      year: '2020',
      title: 'Top-Class Entertainment LLP Founded',
      desc: 'Established with the ambitious mission to transform how global audiences discover, stream, and interact with live audio & video.',
    },
    {
      year: '2021-2022',
      title: 'DreamLive Launch & Rapid Adoption',
      desc: 'Launched the DreamLive flagship mobile platform across India, introducing interactive 3D virtual gifts and real-time voice rooms.',
    },
    {
      year: '2023-2024',
      title: 'PK Battles & Creator Economy Scale',
      desc: 'Expanded multi-guest 9-seat audio rooms, tournament-grade PK duels, and distributed millions in verified host earnings.',
    },
    {
      year: '2025-2026+',
      title: 'Worldwide Expansion & Next-Gen Audio/Video',
      desc: 'Expanding operations to Southeast Asia, Middle East, and worldwide markets to become the leading global social streaming network.',
    },
  ];

  return (
    <section className="pt-36 pb-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Hero Heading */}
        <div className="text-center max-w-4xl mx-auto mb-16 sm:mb-20 space-y-6">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-950/80 border border-violet-400/40 text-violet-200 text-xs font-bold uppercase tracking-wider backdrop-blur-xl shadow-lg">
              <Building2 className="w-4 h-4 text-fuchsia-400" />
              <span>About Top-Class Entertainment LLP</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              <span className="text-title-primary">
                <SplitText text="Empowering Human Connection Through" />
              </span>{' '}
              <GradientText className="font-black drop-shadow-[0_2px_14px_rgba(168,85,247,0.4)]">
                Live Entertainment
              </GradientText>
            </h1>
          </ScrollReveal>

          <FadeContent blur={true} duration={0.8} delay={0.2}>
            <BlurText
              text={COMPANY_INFO.description}
              className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-3xl mx-auto text-shadow-subtle"
            />
          </FadeContent>
        </div>

        {/* 3D Interactive Vision Node Showcase */}
        <ScrollReveal delay={0.2} className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-3xl glass-panel-glow border border-white/25 p-6 sm:p-10 bg-slate-950/85 backdrop-blur-2xl shadow-2xl">
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 text-cyan-300 text-xs font-bold border border-cyan-400/40 shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Next-Gen 3D Architecture</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white text-shadow-contrast">
                Merging Spatial 3D Assets with Real-Time Video
              </h3>
              <p className="text-sm text-slate-200 leading-relaxed text-shadow-subtle">
                DreamLive blends high-performance WebGL 3D virtual gifts, low-latency audio sync, and cloud-moderated safe chat rooms. Our engineering enables over 500,000 daily broadcasters to engage with fans simultaneously with zero stutter.
              </p>
            </div>
            <div className="lg:col-span-6">
              <Meshy3DViewer initialPreset="sculpture" height="340px" />
            </div>
          </div>
        </ScrollReveal>

        {/* Company Vision & Values Grid with GlareHover */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-20">
          <ScrollReveal delay={0.1}>
            <GlareHover
              glareColor="rgba(168, 85, 247, 0.2)"
              glareSize={250}
              borderRadius="24px"
              className="h-full"
            >
              <div className="p-8 rounded-3xl glass-panel border border-white/20 space-y-4 hover:border-violet-500/50 transition-colors h-full bg-slate-950/85 backdrop-blur-2xl shadow-xl">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-violet-600 to-fuchsia-600 flex items-center justify-center text-white shadow-lg shadow-violet-500/30">
                  <Globe2 className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-white text-shadow-contrast">Global Vision</h3>
                <p className="text-sm text-slate-200 leading-relaxed text-shadow-subtle">
                  Targeting to be the most popular and culturally vibrant live streaming platform worldwide, connecting diverse communities across 150+ countries.
                </p>
              </div>
            </GlareHover>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <GlareHover
              glareColor="rgba(236, 72, 153, 0.2)"
              glareSize={250}
              borderRadius="24px"
              className="h-full"
            >
              <div className="p-8 rounded-3xl glass-panel border border-white/20 space-y-4 hover:border-fuchsia-500/50 transition-colors h-full bg-slate-950/85 backdrop-blur-2xl shadow-xl">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-fuchsia-600 to-pink-600 flex items-center justify-center text-white shadow-lg shadow-fuchsia-500/30">
                  <Users className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-white text-shadow-contrast">Creator First Economy</h3>
                <p className="text-sm text-slate-200 leading-relaxed text-shadow-subtle">
                  Enabling anyone to broadcast their talent, build dedicated fan groups, receive real-time virtual gifts, and generate reliable, scalable income.
                </p>
              </div>
            </GlareHover>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <GlareHover
              glareColor="rgba(6, 182, 212, 0.2)"
              glareSize={250}
              borderRadius="24px"
              className="h-full"
            >
              <div className="p-8 rounded-3xl glass-panel border border-white/20 space-y-4 hover:border-cyan-500/50 transition-colors h-full bg-slate-950/85 backdrop-blur-2xl shadow-xl">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/30">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-white text-shadow-contrast">Safety &amp; Moderation</h3>
                <p className="text-sm text-slate-200 leading-relaxed text-shadow-subtle">
                  Pioneering proactive anti-harassment controls, user moderation tools, and 24/7 care to ensure a positive, welcoming environment for everyone.
                </p>
              </div>
            </GlareHover>
          </ScrollReveal>
        </div>

        {/* Milestone Timeline */}
        <ScrollReveal delay={0.2}>
          <div className="rounded-3xl glass-panel-glow border border-white/25 p-6 sm:p-10 lg:p-12 mb-16 bg-slate-950/85 backdrop-blur-2xl shadow-2xl">
            <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
              <span className="text-xs font-bold text-fuchsia-300 uppercase tracking-wider text-shadow-subtle">
                Our Journey
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-title-primary">
                The Evolution of DreamLive
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {milestones.map((m, idx) => (
                <div
                  key={idx}
                  className="relative p-6 rounded-2xl bg-slate-950/70 border border-white/15 flex flex-col justify-between space-y-3 hover:border-violet-500/50 transition-colors shadow-lg"
                >
                  <div className="text-2xl font-black text-gradient-neon">
                    {m.year}
                  </div>
                  <h4 className="text-base font-bold text-white leading-snug text-shadow-contrast">
                    {m.title}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed text-shadow-subtle">
                    {m.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default AboutHero;
