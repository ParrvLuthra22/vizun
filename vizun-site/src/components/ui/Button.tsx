'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { durations, easings } from '@/lib/motion';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'accent' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
}

const MotionButton = motion.button;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className = '', variant = 'primary', size = 'md', ...props }, ref) => {
        const baseStyles = 'inline-flex items-center justify-center font-bold uppercase tracking-widest transition-all focus:outline-none disabled:opacity-50 disabled:pointer-events-none rounded-none';

        const variants = {
            primary: 'bg-[var(--color-jet-black)] text-[var(--color-off-white)] border border-[var(--color-jet-black)] hover:bg-[var(--color-off-white)] hover:text-[var(--color-jet-black)]',
            secondary: 'bg-transparent border border-[var(--color-jet-black)] text-[var(--color-jet-black)] hover:bg-[var(--color-jet-black)] hover:text-[var(--color-off-white)]',
            accent: 'bg-[var(--color-electric-blue)] text-white hover:bg-white hover:text-[var(--color-electric-blue)]',
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
                className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
                whileHover={{
                    scale: 1.0,
                    y: -2,
                    boxShadow: '0 10px 0 rgba(0,0,0,0.2)',
                    transition: {
                        duration: durations.fast,
                        ease: easings.aggressive
                    }
                }}
                whileTap={{
                    scale: 0.98,
                    y: 0,
                    boxShadow: '0 0 0 rgba(0,0,0,0)',
                    transition: {
                        duration: durations.instant,
                        ease: easings.impact
                    }
                }}
                {...(props as HTMLMotionProps<'button'>)}
            >
                {props.children}
            </MotionButton>
        );
    }
);

Button.displayName = 'Button';
