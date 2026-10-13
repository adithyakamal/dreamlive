import React, { useEffect, useRef } from 'react';

/**
 * CountUpNumber — Animated counter that counts up when visible (Ultra-Performance Edition).
 * Uses IntersectionObserver + direct DOM manipulation to avoid 60 React re-renders per second.
 */
export const CountUpNumber = ({
  end,
  duration = 2000,
  prefix = '',
  suffix = '',
  className = '',
  decimals = 0,
}) => {
  const ref = useRef(null);
  const hasAnimatedRef = useRef(false);

  const formatNumber = (num) => {
    if (decimals > 0) {
      return num.toFixed(decimals);
    }
    return Math.round(num).toLocaleString();
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          const startTime = performance.now();
          const startValue = 0;

          const tick = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = startValue + (end - startValue) * eased;
            
            if (el) {
              el.textContent = `${prefix}${formatNumber(current)}${suffix}`;
            }

            if (progress < 1) {
              requestAnimationFrame(tick);
            }
          };

          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration, prefix, suffix, decimals]);

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
};

export default React.memo(CountUpNumber);
