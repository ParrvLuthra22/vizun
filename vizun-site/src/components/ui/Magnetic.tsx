'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const Magnetic = ({ children }: { children: React.ReactNode }) => {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const smoothX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
    const smoothY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current?.getBoundingClientRect() || { height: 0, width: 0, left: 0, top: 0 };
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);

        // Clamp values to max 15px to prevent flying off
        const maxDist = 15;
        const clampedX = Math.max(-maxDist, Math.min(maxDist, middleX * 0.2));
        const clampedY = Math.max(-maxDist, Math.min(maxDist, middleY * 0.2));

        x.set(clampedX);
        y.set(clampedY);
    };

    const reset = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            style={{ position: 'relative', x: smoothX, y: smoothY }}
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={reset}
        >
            {children}
        </motion.div>
    );
};
