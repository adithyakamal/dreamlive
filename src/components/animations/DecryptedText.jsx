import React, { useState, useEffect, useRef, useCallback } from 'react';

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';

export const DecryptedText = ({
  text = '',
  speed = 35,
  maxIterations = 12,
  className = '',
  parentClassName = '',
  animateOn = 'view', // 'view' or 'hover'
  revealDirection = 'start',
  sequential = true,
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef(null);

  const startDecryption = useCallback(() => {
    let iteration = 0;
    const originalText = text;
    const length = originalText.length;

    const interval = setInterval(() => {
      setDisplayText(() => {
        return originalText
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            
            let isRevealed;
            if (sequential) {
              if (revealDirection === 'start') {
                isRevealed = index < iteration / (maxIterations / length);
              } else {
                isRevealed = index > length - 1 - iteration / (maxIterations / length);
              }
            } else {
              isRevealed = Math.random() < iteration / maxIterations;
            }

            if (isRevealed) {
              return originalText[index];
            }
            return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
          })
          .join('');
      });

      iteration += 1;
      if (iteration > maxIterations) {
        clearInterval(interval);
        setDisplayText(originalText);
      }
    }, speed);
  }, [maxIterations, revealDirection, sequential, speed, text]);

  useEffect(() => {
    if (animateOn === 'view' && !hasAnimated) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            startDecryption();
            setHasAnimated(true);
            observer.disconnect();
          }
        },
        { threshold: 0.2 }
      );

      if (containerRef.current) {
        observer.observe(containerRef.current);
      }

      return () => observer.disconnect();
    }
  }, [animateOn, hasAnimated, startDecryption]);

  const handleMouseEnter = () => {
    if (animateOn === 'hover') {
      startDecryption();
    }
  };

  return (
    <span
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      className={`inline-block font-mono ${parentClassName}`}
    >
      <span className={className}>{displayText}</span>
    </span>
  );
};

export default DecryptedText;
