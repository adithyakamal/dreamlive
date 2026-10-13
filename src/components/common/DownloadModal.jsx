import React from 'react';
import { QrCode, CheckCircle2, ShieldCheck } from 'lucide-react';
import Modal from './Modal';

export const DownloadModal = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Download DreamLive App"
      subtitle="Experience the best live broadcasting, voice party rooms & PK battles on mobile."
      maxWidth="max-w-xl"
    >
      <div className="space-y-6 pt-2">
        {/* Store buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Google Play */}
          <a
            href="https://dreamlive.co.in"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3.5 p-4 rounded-2xl bg-black/80 hover:bg-black border border-white/20 hover:border-violet-400 text-white transition-all shadow-lg group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M3 20.5v-17c0-.86.5-1.54 1.25-1.87l11.45 10.37L4.25 22.37C3.5 22.04 3 21.36 3 20.5m14.12-8.5L5.75 1.75l10.87 9.87.5.38M5.75 22.25L17.12 12.38l-4.5-4.13-6.87 14M21.5 12c0 .5-.25 1-.75 1.38l-2.63 2.37-3-2.75 3-2.75 2.63 2.38c.5.37.75.87.75 1.37z" />
              </svg>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">GET IT ON</span>
              <span className="text-base font-bold text-white leading-tight">Google Play</span>
              <span className="text-[10px] text-emerald-400 font-medium mt-0.5">Android 7.0+</span>
            </div>
          </a>

          {/* App Store */}
          <a
            href="https://dreamlive.co.in"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3.5 p-4 rounded-2xl bg-black/80 hover:bg-black border border-white/20 hover:border-fuchsia-400 text-white transition-all shadow-lg group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.38c.64-.78 1.08-1.86.96-2.95-1 .04-2.14.67-2.8 1.44-.58.68-1.1 1.77-.96 2.84 1.12.09 2.19-.55 2.8-1.33z" />
              </svg>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Download on the</span>
              <span className="text-sm font-bold text-white leading-tight">App Store</span>
              <span className="text-[10px] text-fuchsia-300 font-medium mt-0.5">iOS 13.0+</span>
            </div>
          </a>
        </div>

        {/* QR Code and Direct Download */}
        <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
          <div className="p-2 rounded-xl bg-white text-slate-950 shrink-0">
            <QrCode className="w-24 h-24 text-slate-950" />
          </div>
          <div className="space-y-1.5 flex-1">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="text-sm font-bold text-white">Scan to Install Directly</span>
              <span className="text-[10px] font-bold text-violet-300 bg-violet-500/20 px-2 py-0.5 rounded-full">
                v7.0.4
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Use your phone&#39;s camera app to scan the code and launch the install directly on your device.
            </p>
            <div className="pt-1 flex items-center justify-center sm:justify-start gap-3 text-[11px] text-slate-300">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Verified Clean
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" /> SSL Encrypted
              </span>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={onClose}
            className="text-xs text-slate-400 hover:text-white underline underline-offset-4 cursor-pointer"
          >
            Close Window
          </button>
        </div>
      </div>
    </Modal>
  );
};
export default DownloadModal;
