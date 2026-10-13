import React, { Suspense, lazy, useState, useEffect, useRef } from 'react';
import { motion, useSpring } from 'framer-motion';
import { Sparkles } from 'lucide-react';

// Lazy load Spline runtime component for performance
const Spline = lazy(() => import('@splinetool/react-spline'));

export const SplineScene = ({
  sceneUrl = 'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode',
  className = '',
  enableMouseParallax = true,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef(null);

  const springConfig = { damping: 25, stiffness: 120 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  useEffect(() => {
    if (!enableMouseParallax) return;

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 20;
      const y = (e.clientY / innerHeight - 0.5) * 20;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [enableMouseParallax, mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[380px] sm:min-h-[480px] lg:min-h-[580px] overflow-hidden ${className}`}
    >
      {/* 3D Spline Canvas */}
      {!hasError ? (
        <Suspense
          fallback={
            <div className="w-full h-full flex flex-col items-center justify-center space-y-3 bg-slate-950/40 rounded-3xl backdrop-blur-md border border-white/10">
              <div className="relative flex items-center justify-center">
                <div className="w-12 h-12 rounded-full border-2 border-violet-500/30 border-t-fuchsia-500 animate-spin" />
                <Sparkles className="w-5 h-5 text-fuchsia-400 absolute" />
              </div>
              <span className="text-xs font-semibold text-slate-300 tracking-wider">
                Loading Interactive 3D Experience...
              </span>
            </div>
          }
        >
          <motion.div
            style={{
              x: mouseX,
              y: mouseY,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ opacity: { duration: 0.5 } }}
            className="w-full h-full absolute inset-0"
          >
            <Spline
              scene={sceneUrl}
              onLoad={() => setIsLoaded(true)}
              onError={() => setHasError(true)}
              className="w-full h-full"
            />
          </motion.div>
        </Suspense>
      ) : (
        /* Graceful Fallback if WebGL/Spline scene is unavailable */
        <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-tr from-violet-950/40 via-purple-950/20 to-slate-950/60 rounded-3xl border border-white/10 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-violet-600 to-fuchsia-600 flex items-center justify-center text-white shadow-xl shadow-fuchsia-600/30 mb-4 animate-float-slow">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h4 className="text-lg font-bold text-white mb-1">
            Interactive Digital Realm
          </h4>
          <p className="text-xs text-slate-400 max-w-sm">
            High-performance WebGL visual architecture designed for live creative entertainment.
          </p>
        </div>
      )}

      {/* Subtle bottom vignette to blend 3D canvas smoothly with layout */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#07080d] via-[#07080d]/40 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#07080d] to-transparent" />
    </div>
  );
};

export default SplineScene;
