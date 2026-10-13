import React, { useRef, useEffect } from 'react';

/**
 * DreamLive Fixed Cinematic Background Video System (Ultra-Performance Edition)
 * 
 * Architecture:
 * - Exactly ONE stable HTML5 <video> element mounted once for the entire app lifecycle
 * - Advances seamlessly through playlist: video21 -> video22 -> video23 -> video24 -> video25 -> video26 -> loop
 * - ZERO connection to scroll events or React state changes
 * - Lightweight single-pass brightness(0.90) filter without expensive GPU blur layers
 * - Automatically pauses when tab is hidden or when StreamModal is active
 * - Pure hardware compositor isolation (contain: strict, isolation: isolate, transform: translateZ(0))
 */

const VIDEO_PLAYLIST = [
  '/video21.mp4',
  '/video22.mp4',
  '/video23.mp4',
  '/video24.mp4',
  '/video25.mp4',
  '/video26.mp4',
];

export const AnimatedBackground = () => {
  const videoRef = useRef(null);
  const playlistIndexRef = useRef(0);
  const isPausedByModalRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.playsInline = true;
    video.src = VIDEO_PLAYLIST[playlistIndexRef.current];

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        if (video) {
          video.muted = true;
          video.play().catch(() => {});
        }
      });
    }

    const handleEnded = () => {
      playlistIndexRef.current = (playlistIndexRef.current + 1) % VIDEO_PLAYLIST.length;
      if (video) {
        video.src = VIDEO_PLAYLIST[playlistIndexRef.current];
        if (!isPausedByModalRef.current) {
          video.play().catch(() => {});
        }
      }
    };

    const handleError = () => {
      // Gracefully advance to next video if a format or load glitch occurs
      playlistIndexRef.current = (playlistIndexRef.current + 1) % VIDEO_PLAYLIST.length;
      if (video) {
        video.src = VIDEO_PLAYLIST[playlistIndexRef.current];
        if (!isPausedByModalRef.current) {
          video.play().catch(() => {});
        }
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && !isPausedByModalRef.current) {
        if (video && video.paused) {
          video.play().catch(() => {});
        }
      } else if (document.visibilityState === 'hidden') {
        if (video) video.pause();
      }
    };

    const handleModalPause = () => {
      isPausedByModalRef.current = true;
      if (video) video.pause();
    };

    const handleModalResume = () => {
      isPausedByModalRef.current = false;
      if (document.visibilityState === 'visible' && video && video.paused) {
        video.play().catch(() => {});
      }
    };

    video.addEventListener('ended', handleEnded);
    video.addEventListener('error', handleError);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('dreamlive-pause-bg-video', handleModalPause);
    window.addEventListener('dreamlive-resume-bg-video', handleModalResume);

    return () => {
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('error', handleError);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('dreamlive-pause-bg-video', handleModalPause);
      window.removeEventListener('dreamlive-resume-bg-video', handleModalResume);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 w-full h-full min-h-[100svh] overflow-hidden pointer-events-none z-0"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        minHeight: '100svh',
        contain: 'strict',
        isolation: 'isolate',
      }}
      aria-hidden="true"
    >
      {/* Base solid dark backdrop */}
      <div className="absolute inset-0 bg-[#06070b] z-0" />

      {/* ═══ SINGLE STABLE BACKGROUND VIDEO ELEMENT ═══ */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          filter: 'brightness(0.82) contrast(1.03)',
          transform: 'translateZ(0)',
          willChange: 'transform',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          zIndex: 1,
        }}
      />

      {/* ═══ SUBTLE BACKGROUND DARKENING OVERLAY (10-15% reduction, zero blur) ═══ */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundColor: 'rgba(6, 7, 11, 0.18)',
          zIndex: 2,
        }}
      />

      {/* ═══ ULTRA-LIGHT CINEMATIC ACCENTS (Zero blur rasterization) ═══ */}
      {/* Natural contrast vignette */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, transparent 60%, rgba(4,3,8,0.30) 85%, rgba(4,3,8,0.50) 100%), linear-gradient(180deg, rgba(5,4,10,0.35) 0%, transparent 15%, transparent 85%, rgba(5,4,10,0.45) 100%)',
        }}
      />

      {/* Smooth soft ambient highlights using pure GPU radial gradients without costly blur filters */}
      <div
        className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] rounded-full z-10 pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.25) 0%, rgba(139, 92, 246, 0.08) 40%, transparent 70%)',
        }}
      />
      <div
        className="absolute -bottom-[10%] -right-[10%] w-[50vw] h-[50vw] rounded-full z-10 pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.22) 0%, rgba(236, 72, 153, 0.06) 40%, transparent 70%)',
        }}
      />
    </div>
  );
};

export default React.memo(AnimatedBackground);
