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

    // Clamp values to prevent elements from flying off too far
    // Limit to -50% to 50% relative movement
    const clampedY = useTransform(scrollYProgress, [0, 1], ["0%", `${Math.max(-50, Math.min(50, speed * 100))}%`]);
    const clampedX = useTransform(scrollYProgress, [0, 1], ["0%", `${Math.max(-50, Math.min(50, speed * 100))}%`]);

    // Physics Transform (Laggy/Heavy feel)
    const smoothY = useSpring(clampedY, { damping: 15, stiffness: 100 });
    const smoothX = useSpring(clampedX, { damping: 15, stiffness: 100 });

    const finalY = lag ? smoothY : clampedY;
    const finalX = lag ? smoothX : clampedX;

    return (
        <div ref={ref} className={`${className} w-full h-full`}>
            <motion.div
                className="w-full h-full"
                style={{
                    y: direction === 'vertical' ? finalY : 0,
                    x: direction === 'horizontal' ? finalX : 0,
                    willChange: 'transform' // GPU Hint
                }}
            >
                {children}
            </motion.div>
        </div>
    );
};
