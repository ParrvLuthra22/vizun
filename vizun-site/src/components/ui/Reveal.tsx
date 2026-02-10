'use client';

import { motion, useInView, useAnimation, Variants } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { durations, easings, viewportMargin } from '@/lib/motion';

interface RevealProps {
    children: React.ReactNode;
    width?: 'fit-content' | '100%';
    delay?: number;
    duration?: number;
    y?: number;
    className?: string;
    triggerOnce?: boolean;
}

export const Reveal = ({
    children,
    width = 'fit-content',
    delay = 0,
    duration = durations.slow,
    y = 30,
    className = '',
    triggerOnce = true,
}: RevealProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: triggerOnce, margin: viewportMargin.normal as "-50px" });
    const mainControls = useAnimation();

    useEffect(() => {
        if (isInView) {
            mainControls.start("visible");
        }
    }, [isInView, mainControls]);

    const variants: Variants = {
        hidden: { opacity: 0, y: y },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: duration,
                delay: delay,
                ease: easings.luxury,
            }
        },
    };

    return (
        <div ref={ref} style={{ position: 'relative', width, overflow: 'hidden' }} className={className}>
            <motion.div
                variants={variants}
                initial="hidden"
                animate={mainControls}
            >
                {children}
            </motion.div>
        </div>
    );
};

export const RevealText = ({
    text,
    delay = 0,
    className = ''
}: {
    text: string,
    delay?: number,
    className?: string
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: viewportMargin.normal as "-50px" });
    const controls = useAnimation();

    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        }
    }, [isInView, controls]);

    const container: Variants = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { 
                staggerChildren: 0.08, 
                delayChildren: delay * i 
            },
        }),
    };

    const child: Variants = {
        visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: {
                duration: durations.slow,
                ease: easings.luxury,
            },
        },
        hidden: {
            opacity: 0,
            y: 30,
            rotateX: -15,
        },
    };

    return (
        <motion.div
            ref={ref}
            style={{ display: "flex", flexWrap: "wrap", perspective: "1000px" }}
            variants={container}
            initial="hidden"
            animate={controls}
            className={className}
        >
            {text.split(" ").map((word, index) => (
                <motion.span
                    style={{ marginRight: "0.25em", display: "inline-block", transformStyle: "preserve-3d" }}
                    variants={child}
                    key={index}
                >
                    {word}
                </motion.span>
            ))}
        </motion.div>
    );
};
