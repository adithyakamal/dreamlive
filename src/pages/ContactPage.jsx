import React from 'react';
import { Mail, ShieldAlert } from 'lucide-react';
import PageTransition from '../components/common/PageTransition';
import ContactInfoCards from '../components/contact/ContactInfoCards';
import ContactForm from '../components/contact/ContactForm';
import LocationMap from '../components/contact/LocationMap';
import AppDownloadCTA from '../components/home/AppDownloadCTA';
import CreatorSignupModal from '../components/home/CreatorSignupModal';
import { COMPANY_INFO } from '../data/dreamLiveContent';
import SplitText from '../components/animations/SplitText';
import BlurText from '../components/animations/BlurText';
import GradientText from '../components/animations/GradientText';
import FadeContent from '../components/animations/FadeContent';
import ScrollReveal from '../components/animations/ScrollReveal';
import Magnet from '../components/animations/Magnet';

export const ContactPage = ({ _onOpenDownload, isCreatorModalOpen, setIsCreatorModalOpen }) => {
  return (
    <PageTransition>
      <div className="pt-36 pb-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Banner */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-fuchsia-950/80 border border-fuchsia-400/40 text-fuchsia-200 text-xs font-bold uppercase tracking-wider backdrop-blur-xl shadow-lg">
                <Mail className="w-4 h-4 text-fuchsia-400" />
                <span>Get In Touch With DreamLive</span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                <span className="text-title-primary">
                  <SplitText text="We Are Here To" />
                </span>{' '}
                <GradientText className="font-black drop-shadow-[0_2px_14px_rgba(168,85,247,0.4)]">
                  Help &amp; Partner
                </GradientText>
              </h1>
            </ScrollReveal>

            <FadeContent blur={true} duration={0.8} delay={0.2}>
              <BlurText
                text={`Whether you are an aspiring broadcaster, a talent agency director, or need customer assistance, the official team at ${COMPANY_INFO.name} is ready to support you.`}
                className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl mx-auto text-shadow-subtle"
              />
            </FadeContent>
          </div>

          {/* Contact Details Cards */}
          <ScrollReveal delay={0.15}>
            <ContactInfoCards />
          </ScrollReveal>

          {/* Form and Map Grid */}
          <ScrollReveal delay={0.2}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
              <div className="lg:col-span-7">
                <ContactForm />
              </div>
              <div className="lg:col-span-5">
                <LocationMap />
              </div>
            </div>
          </ScrollReveal>

          {/* Emergency Account Recovery Banner with High Local Contrast */}
          <ScrollReveal delay={0.25}>
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-950/90 border border-rose-500/40 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left mb-16 shadow-2xl backdrop-blur-2xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-rose-500/30 text-rose-300 border border-rose-500/50 flex items-center justify-center shrink-0 mx-auto sm:mx-0 shadow-lg">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base sm:text-lg font-bold text-white text-shadow-contrast">
                    Emergency Account Security &amp; Stolen ID Recovery
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed text-shadow-subtle">
                    If your phone number was unlinked or you notice unauthorized diamond activity, immediately email our priority desk at{' '}
                    <strong className="text-rose-300 underline font-bold">dreamlivecare@gmail.com</strong> with your registered User ID.
                  </p>
                </div>
              </div>

              <Magnet strength={10}>
                <a
                  href={`mailto:${COMPANY_INFO.email}?subject=Urgent%20Account%20Security%20Inquiry`}
                  className="px-6 py-3 rounded-full bg-rose-600 hover:bg-rose-500 text-white text-xs sm:text-sm font-bold shadow-xl shadow-rose-600/40 shrink-0 transition-transform active:scale-95 cursor-pointer block"
                >
                  Priority Helpdesk
                </a>
              </Magnet>
            </div>
          </ScrollReveal>

          {/* App Download CTA */}
          <AppDownloadCTA />

          {/* Creator Signup Modal */}
          <CreatorSignupModal
            isOpen={isCreatorModalOpen}
            onClose={() => setIsCreatorModalOpen(false)}
          />
        </div>
      </div>
    </PageTransition>
  );
};

export default ContactPage;
