'use client';

import { ButtonHTMLAttributes, forwardRef, useState } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { durations, easings, hoverLift } from '@/lib/motion';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'accent' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
}

const MotionButton = motion.button;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className = '', variant = 'primary', size = 'md', ...props }, ref) => {
        const [isHovered, setIsHovered] = useState(false);

        const baseStyles = 'relative overflow-hidden inline-flex items-center justify-center font-bold uppercase tracking-widest transition-all focus:outline-none disabled:opacity-50 disabled:pointer-events-none rounded-none group';

        const variants = {
            primary: 'bg-[var(--color-jet-black)] text-[var(--color-off-white)] border border-[var(--color-jet-black)]',
            secondary: 'bg-transparent border border-[var(--color-jet-black)] text-[var(--color-jet-black)]',
            accent: 'bg-[var(--color-electric-blue)] text-white border border-[var(--color-electric-blue)]',
            ghost: 'bg-transparent text-[var(--color-gray-600)] hover:text-[var(--color-jet-black)]',
        };

        const sizes = {
            sm: 'h-8 px-4 text-xs',
            md: 'h-12 px-8 text-sm',
            lg: 'h-16 px-12 text-base',
        };

        return (
            <MotionButton
                ref={ref}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
                whileHover={variant !== 'ghost' ? hoverLift : {}}
                whileTap={{ scale: 0.98 }}
                {...(props as HTMLMotionProps<'button'>)}
            >
                {/* Fill Effect Layer */}
                <span className={`absolute inset-0 bg-[var(--color-off-white)] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out ${variant === 'primary' ? 'block' : 'hidden'}`} />
                <span className={`absolute inset-0 bg-[var(--color-jet-black)] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out ${variant === 'secondary' ? 'block' : 'hidden'}`} />
                <span className={`absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out ${variant === 'accent' ? 'block' : 'hidden'}`} />

                {/* Content Layer - Color Swap */}
                <span className={`relative z-10 transition-colors duration-300 ${variant === 'primary' ? 'group-hover:text-[var(--color-jet-black)]' :
                    variant === 'secondary' ? 'group-hover:text-[var(--color-off-white)]' :
                        variant === 'accent' ? 'group-hover:text-[var(--color-electric-blue)]' : ''
                    }`}>
                    {props.children}
                </span>
            </MotionButton>
        );
    }
);

Button.displayName = 'Button';
