import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import PageTransition from '../components/common/PageTransition';
import VIPModal from '../components/profile/VIPModal';

export const VIPPage = () => {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="relative min-h-screen bg-transparent text-slate-100 pb-24 pt-16 sm:pt-20">
        <div className="sticky top-0 z-30 bg-[#07080d]/90 backdrop-blur-xl border-b border-white/10 px-4 py-3">
          <div className="max-w-2xl mx-auto flex items-center gap-3">
            <button
              onClick={() => navigate('/profile')}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-black text-white">VIP Status &amp; Privileges</h1>
          </div>
        </div>

        <VIPModal isOpen={true} onClose={() => navigate('/profile')} />
      </div>
    </PageTransition>
  );
};

export default VIPPage;
