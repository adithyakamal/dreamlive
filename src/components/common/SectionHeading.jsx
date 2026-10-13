import React from 'react';
import { motion } from 'framer-motion';
import SplitText from '../animations/SplitText';
import BlurText from '../animations/BlurText';
import GradientText from '../animations/GradientText';
import FadeContent from '../animations/FadeContent';

export const SectionHeading = ({
  badge,
  title,
  highlight,
  subtitle,
  align = 'center',
  className = '',
}) => {
  const alignmentClasses = {
    center: 'text-center items-center mx-auto',
    left: 'text-left items-start',
    right: 'text-right items-end ml-auto',
  };

  return (
    <motion.div
      initial={{ opacity: 1, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '600px 0px 200px 0px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`flex flex-col max-w-3xl mb-12 sm:mb-16 ${alignmentClasses[align]} ${className}`}
    >
      {badge && (
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-950/80 border border-violet-400/40 backdrop-blur-xl mb-4 text-xs font-bold uppercase tracking-wider text-violet-200 shadow-md">
          <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400 animate-pulse"></span>
          {badge}
        </div>
      )}

      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15]">
        {title && (
          <span className="text-title-primary">
            <SplitText text={title} className="inline-block" />
          </span>
        )}{' '}
        {highlight && (
          <GradientText className="font-black drop-shadow-[0_2px_14px_rgba(168,85,247,0.4)]">
            {highlight}
          </GradientText>
        )}
      </h2>

      {/* Decorative gradient underline */}
      <div className={`h-1 w-20 rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400 mt-4 mb-2 shadow-sm ${align === 'center' ? 'mx-auto' : ''}`} />

      {subtitle && (
        <FadeContent blur={true} duration={0.8} delay={0.15} className="mt-3">
          <BlurText
            text={subtitle}
            className="text-base sm:text-lg text-slate-200 font-medium leading-relaxed max-w-2xl text-shadow-subtle"
            delay={0.1}
          />
        </FadeContent>
      )}
    </motion.div>
  );
};

export default SectionHeading;
