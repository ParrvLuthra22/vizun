'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'accent' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className = '', variant = 'primary', size = 'md', ...props }, ref) => {
        const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none';

        const variants = {
            primary: 'bg-[var(--color-off-white)] text-[var(--color-jet-black)] hover:bg-[var(--color-off-white-subtle)]',
            secondary: 'bg-transparent border border-[var(--color-off-white-faint)] text-[var(--color-off-white)] hover:border-[var(--color-off-white)]',
            accent: 'bg-[var(--color-electric-blue)] text-white hover:bg-blue-600',
            ghost: 'bg-transparent text-[var(--color-off-white-subtle)] hover:text-[var(--color-off-white)] hover:bg-[var(--color-off-white-faint)]',
        };

        const sizes = {
            sm: 'h-9 px-4 text-sm',
            md: 'h-11 px-8 text-base',
            lg: 'h-14 px-10 text-lg',
        };

        const MotionButton = motion.create('button');

        return (
            <MotionButton
                ref={ref}
                className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
                {...(props as HTMLMotionProps<'button'>)}
            >
                {props.children}
            </MotionButton>
        );
    }
);

Button.displayName = 'Button';
