'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const Cursor = () => {
    const [isHovering, setIsHovering] = useState(false);
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 30, stiffness: 400 }; // Lazier, smoother feel
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX - 16);
            cursorY.set(e.clientY - 16);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.classList.contains('cursor-hover')
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [cursorX, cursorY]);

    return (
        <motion.div
            className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] mix-blend-difference"
            style={{
                x: cursorXSpring,
                y: cursorYSpring,
                willChange: "transform"
            }}
        >
            {/* Crosshair / Precision Sight */}
            <motion.div
                className="w-full h-full relative flex items-center justify-center"
                animate={{
                    scale: isHovering ? 1.5 : 1,
                    rotate: isHovering ? 45 : 0,
                }}
                transition={{ duration: 0.2, ease: "circOut" }}
            >
                <div className="absolute w-full h-[1px] bg-white top-1/2 left-0" />
                <div className="absolute h-full w-[1px] bg-white top-0 left-1/2" />

                {/* Center Dot */}
                <div className="w-1 h-1 bg-white rounded-full" />

                {/* Outer Ring - Expands on Hover */}
                <motion.div
                    className="absolute inset-0 border border-white rounded-full opacity-0"
                    animate={{
                        opacity: isHovering ? 1 : 0,
                        scale: isHovering ? 1 : 0.5,
                    }}
                />
            </motion.div>
        </motion.div>
    );
};
