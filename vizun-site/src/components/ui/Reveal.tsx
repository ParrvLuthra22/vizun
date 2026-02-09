'use client';

import { motion, useInView, useAnimation, Variants } from 'framer-motion';
import { useRef, useEffect } from 'react';

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
    duration = 0.8,
    y = 30,
    className = '',
    triggerOnce = true,
}: RevealProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: triggerOnce, margin: "-50px" });
    const mainControls = useAnimation();

    useEffect(() => {
        if (isInView) {
            mainControls.start("visible");
        }
    }, [isInView, mainControls]);

    // Use Variants type for defining animation states
    const variants: Variants = {
        hidden: { opacity: 0, y: y },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: duration,
                delay: delay,
                ease: [0.16, 1, 0.3, 1], // Luxury easing
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
    const isInView = useInView(ref, { once: true, margin: "-20px" });
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
            transition: { staggerChildren: 0.03, delayChildren: delay * i },
        }),
    };

    const child: Variants = {
        visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: {
                type: "spring",
                damping: 30,
                stiffness: 200,
                ease: [0.16, 1, 0.3, 1],
                duration: 0.8
            },
        },
        hidden: {
            opacity: 0,
            y: 20,
            rotateX: -45,
        },
    };

    return (
        <motion.div
            ref={ref}
            style={{ display: "flex", flexWrap: "wrap", perspective: "800px" }}
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
