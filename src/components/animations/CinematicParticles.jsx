import React, { useMemo } from 'react';

/**
 * CinematicParticles — Pure CSS floating particle system for ambient atmosphere.
 * No external dependencies. Creates drifting luminous dots with staggered animations.
 */
export const CinematicParticles = ({
  count = 20,
  colors = ['#8b5cf6', '#ec4899', '#22d3ee', '#f59e0b'],
  className = '',
  minSize = 2,
  maxSize = 5,
  minDuration = 15,
  maxDuration = 35,
}) => {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const size = minSize + Math.random() * (maxSize - minSize);
      const color = colors[i % colors.length];
      const duration = minDuration + Math.random() * (maxDuration - minDuration);
      const delay = Math.random() * duration;
      const left = Math.random() * 100;
      const drift = (Math.random() - 0.5) * 200;

      return { id: i, size, color, duration, delay, left, drift };
    });
  }, [count, colors, minSize, maxSize, minDuration, maxDuration]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            bottom: '-5%',
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
            opacity: 0,
            animation: `particle-float ${p.duration}s linear ${p.delay}s infinite`,
            '--drift': `${p.drift}px`,
          }}
        />
      ))}
    </div>
  );
};

export default CinematicParticles;
