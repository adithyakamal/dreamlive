import React from 'react';
import { QrCode, Sparkles, Star, Download, ShieldCheck, Zap, Smartphone, Check } from 'lucide-react';
import SplitText from '../animations/SplitText';
import BlurText from '../animations/BlurText';
import GradientText from '../animations/GradientText';
import FadeContent from '../animations/FadeContent';
import ScrollReveal from '../animations/ScrollReveal';
import TiltedCard from '../animations/TiltedCard';
import GlareHover from '../animations/GlareHover';
import Magnet from '../animations/Magnet';
import Floating3DObject from '../3d/Floating3DObject';

export const AppDownloadCTA = () => {
  return (
    <section id="download" className="py-20 relative z-10 overflow-hidden section-stable">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <ScrollReveal>
          <div className="rounded-[36px] bg-gradient-to-r from-violet-950/90 via-purple-950/80 to-fuchsia-950/90 border border-white/25 p-8 sm:p-12 lg:p-16 shadow-2xl backdrop-blur-2xl relative overflow-hidden">
            
            {/* Ambient 3D floating shape in corner */}
            <div className="absolute -top-10 -right-10 opacity-30 pointer-events-none">
              <Floating3DObject shape="torus" color="#c084fc" size={140} wireframe={true} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Left Content */}
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-fuchsia-500/25 border border-fuchsia-400/40 text-fuchsia-200 text-xs font-bold uppercase tracking-wider shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '4s' }} />
                  Available on Mobile &amp; Tablet
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight">
                  <span className="text-title-primary">
                    <SplitText text="Download DreamLive &" />
                  </span>{' '}
                  <GradientText className="font-black drop-shadow-[0_2px_14px_rgba(168,85,247,0.4)]">
                    Go Live in Seconds!
                  </GradientText>
                </h2>

                <FadeContent blur={true} duration={0.8} delay={0.15}>
                  <BlurText
                    text="Join over 10 Million+ global users today. Stream high-definition video, hop into voice party rooms, send 3D gifts, and connect with creative minds worldwide."
                    className="text-base sm:text-lg text-slate-200 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0 text-shadow-subtle"
                    delay={0.1}
                  />
                </FadeContent>

                {/* Feature checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-left">
                  {[
                    'Instant live streaming from any phone',
                    'Multi-seat interactive voice rooms',
                    '200+ Animated 3D gifts & PK battles',
                    'Direct daily creator bank payouts',
                  ].map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                      <div className="w-4 h-4 rounded-full bg-emerald-500/30 text-emerald-300 flex items-center justify-center shrink-0 border border-emerald-400/40">
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="text-shadow-subtle">{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Store Download Buttons */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
                  {/* Google Play Button */}
                  <Magnet strength={12}>
                    <a
                      href="https://dreamlive.co.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-black/90 hover:bg-black border border-white/25 hover:border-violet-400 text-white transition-all shadow-xl hover:scale-105 group backdrop-blur-xl"
                    >
                      <div className="w-7 h-7 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                          <path d="M3 20.5v-17c0-.86.5-1.54 1.25-1.87l11.45 10.37L4.25 22.37C3.5 22.04 3 21.36 3 20.5m14.12-8.5L5.75 1.75l10.87 9.87.5.38M5.75 22.25L17.12 12.38l-4.5-4.13-6.87 14M21.5 12c0 .5-.25 1-.75 1.38l-2.63 2.37-3-2.75 3-2.75 2.63 2.38c.5.37.75.87.75 1.37z" />
                        </svg>
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-[10px] text-slate-300 uppercase leading-none font-bold">GET IT ON</span>
                        <span className="text-sm font-black leading-tight text-shadow-subtle">Google Play</span>
                      </div>
                    </a>
                  </Magnet>

                  {/* App Store Button */}
                  <Magnet strength={12}>
                    <a
                      href="https://dreamlive.co.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-black/90 hover:bg-black border border-white/25 hover:border-fuchsia-400 text-white transition-all shadow-xl hover:scale-105 group backdrop-blur-xl"
                    >
                      <div className="w-7 h-7 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.38c.64-.78 1.08-1.86.96-2.95-1 .04-2.14.67-2.8 1.44-.58.68-1.1 1.77-.96 2.84 1.12.09 2.19-.55 2.8-1.33z" />
                        </svg>
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-[10px] text-slate-300 uppercase leading-none font-bold">Download on the</span>
                        <span className="text-sm font-black leading-tight text-shadow-subtle">App Store</span>
                      </div>
                    </a>
                  </Magnet>
                </div>

                {/* Rating summary */}
                <div className="flex items-center justify-center lg:justify-start gap-4 pt-2 text-xs text-slate-300">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="font-bold text-white text-shadow-subtle">4.8/5 Rating</span>
                  <span>•</span>
                  <span className="text-shadow-subtle">100K+ Verified Reviews</span>
                </div>
              </div>

              {/* Right Content: QR Code Card with GlareHover */}
              <div className="lg:col-span-5 flex justify-center">
                <GlareHover
                  borderRadius="28px"
                  glareColor="rgba(255, 255, 255, 0.25)"
                  glareSize={250}
                >
                  <div className="p-6 rounded-3xl bg-black/90 border border-white/25 backdrop-blur-2xl shadow-2xl flex flex-col items-center text-center space-y-4 max-w-xs relative overflow-hidden group">
                    <div className="p-4 rounded-2xl bg-white text-slate-950 shadow-inner relative">
                      <QrCode className="w-36 h-36 text-slate-950" />
                    </div>

                    <div className="space-y-1">
                      <span className="text-sm font-bold text-white flex items-center justify-center gap-1.5 text-shadow-contrast">
                        <Smartphone className="w-4 h-4 text-cyan-400" />
                        Scan with Phone Camera
                      </span>
                      <p className="text-xs text-slate-300 text-shadow-subtle">
                        Instantly open direct install link on iOS &amp; Android
                      </p>
                    </div>
                  </div>
                </GlareHover>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default React.memo(AppDownloadCTA);
