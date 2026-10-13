import React, { useRef } from 'react';
import { motion, useSpring } from 'framer-motion';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  iconPosition = 'left',
  onClick,
  type = 'button',
  disabled = false,
  magnetic = false,
  ...props
}) => {
  const buttonRef = useRef(null);

  const springConfig = { damping: 15, stiffness: 180, mass: 0.1 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseMove = (e) => {
    if (!magnetic || !buttonRef.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = buttonRef.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * 0.3);
    y.set(middleY * 0.3);
  };

  const handleMouseLeave = () => {
    if (magnetic) {
      x.set(0);
      y.set(0);
    }
  };

  const baseStyles = 'relative inline-flex items-center justify-center font-medium rounded-full cursor-pointer transition-all duration-300 select-none overflow-hidden group';

  const sizeStyles = {
    sm: 'text-xs px-4 py-2 gap-1.5',
    md: 'text-sm px-6 py-2.5 gap-2',
    lg: 'text-base px-8 py-3.5 gap-2.5 font-semibold',
  };

  const variants = {
    primary:
      'bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 text-white shadow-lg shadow-violet-500/25 hover:shadow-fuchsia-500/40 hover:scale-[1.03] active:scale-[0.97] border border-white/20',
    secondary:
      'bg-slate-900/90 hover:bg-slate-800 text-slate-100 border border-white/15 hover:border-violet-500/50 backdrop-blur-md hover:scale-[1.03] active:scale-[0.97]',
    glass:
      'bg-white/10 hover:bg-white/15 text-white border border-white/20 backdrop-blur-xl hover:scale-[1.03] active:scale-[0.97]',
    glow:
      'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-[1.03] active:scale-[0.97]',
    gold:
      'bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-slate-950 font-extrabold shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.03] active:scale-[0.97]',
    outline:
      'bg-transparent hover:bg-white/5 text-slate-300 hover:text-white border border-slate-700 hover:border-slate-500',
  };

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={magnetic ? { x, y } : undefined}
      whileTap={{ scale: disabled ? 1 : 0.96 }}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size]} ${variants[variant]} ${
        disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''
      } ${className}`}
      {...props}
    >
      {/* Subtle shine sweep effect on hover */}
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
      
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" />}
      <span className="relative z-10 flex items-center gap-1.5">{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1" />}
    </motion.button>
  );
};
export default Button;
