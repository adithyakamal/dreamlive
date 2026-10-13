import React from 'react';
import PageTransition from '../components/common/PageTransition';
import AboutHero from '../components/about/AboutHero';
import FAQSection from '../components/about/FAQSection';
import CommunitySafety from '../components/home/CommunitySafety';
import AppDownloadCTA from '../components/home/AppDownloadCTA';
import CreatorSignupModal from '../components/home/CreatorSignupModal';

export const AboutPage = ({ _onOpenDownload, isCreatorModalOpen, setIsCreatorModalOpen }) => {
  return (
    <PageTransition>
      <div className="relative">
        {/* About Hero & Mission Timeline */}
        <AboutHero />

        {/* Community Safety & Rules */}
        <div id="safety">
          <CommunitySafety />
        </div>

        {/* FAQs and Help Center */}
        <FAQSection />

        {/* App Download CTA */}
        <AppDownloadCTA />

        {/* Creator Signup Modal */}
        <CreatorSignupModal
          isOpen={isCreatorModalOpen}
          onClose={() => setIsCreatorModalOpen(false)}
        />
      </div>
    </PageTransition>
  );
};
export default AboutPage;
