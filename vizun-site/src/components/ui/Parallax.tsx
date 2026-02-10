'use client';

import { useRef, ReactNode } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useVelocity, useAnimationFrame } from 'framer-motion';

interface ParallaxProps {
    children: ReactNode;
    speed?: number; // Negative = Slower (Lag), Positive = Faster (Lead)
    className?: string;
    direction?: 'vertical' | 'horizontal';
    lag?: boolean; // If true, use physics-based lag instead of direct transform
}

export const Parallax = ({
    children,
    speed = 0.5,
    className = "",
    direction = 'vertical',
    lag = false
}: ParallaxProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Direct Transform (Standard Parallax)
    const yTransform = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`]);
    const xTransform = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`]);

    // Physics Transform (Laggy/Heavy feel)
    const smoothY = useSpring(yTransform, { damping: 15, stiffness: 100 });
    const smoothX = useSpring(xTransform, { damping: 15, stiffness: 100 });

    const finalY = lag ? smoothY : yTransform;
    const finalX = lag ? smoothX : xTransform;

    return (
        <div ref={ref} className={className}>
            <motion.div
                style={{
                    y: direction === 'vertical' ? finalY : 0,
                    x: direction === 'horizontal' ? finalX : 0
                }}
            >
                {children}
            </motion.div>
        </div>
    );
};
