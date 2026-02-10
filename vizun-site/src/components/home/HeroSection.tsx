'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';
import { durations, easings, slamUp, maskReveal, tiltEnter, impactVar } from '@/lib/motion';

export const HeroSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Parallax - Image moves faster than text
    const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
    const textY = useTransform(scrollYProgress, [0, 1], ['0%', '60%']); // Text moves away slower (clamping)

    return (
        <section
            ref={containerRef}
            className="relative h-screen w-full overflow-hidden bg-[var(--color-jet-black)] perspective-[1000px]"
        >
            {/* 3D Tilted Image Layer - Oversized & Asymmetrical */}
            <motion.div
                className="absolute top-[-5%] left-[-5%] w-[110vw] h-[110vh] z-0 origin-center"
                variants={tiltEnter}
                initial="hidden"
                animate="visible"
                style={{ y: imageY, willChange: "transform" }}
            >
                <div className="relative w-full h-full">
                    <Image
                        src="/hero-product.jpg"
                        alt="VIZUN ARMORED"
                        fill
                        className="object-cover grayscale contrast-125 brightness-75"
                        priority
                        sizes="100vw"
                    />
                    {/* Hard Grain/Noise Overlay integration could go here if using CSS */}
                </div>
            </motion.div>

            {/* Content Layer - Asymmetrical & Colliding */}
            <div className="absolute inset-0 z-10 pointer-events-none">

                {/* Top Left - VIZUN (Ultra Light, Bleeding) */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={impactVar}
                    className="absolute top-[5%] left-[-2%]"
                    style={{ y: textY, willChange: 'transform' }}
                >
                    <h1 className="text-[18vw] font-bold font-serif leading-[0.75] tracking-tighter text-[var(--color-off-white)] opacity-80 mix-blend-exclusion select-none">
                        VIZUN
                    </h1>
                </motion.div>

                {/* Bottom Right - ARMORED (Ultra Bold, Bleeding) */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={impactVar} // Same fast entry
                    className="absolute bottom-[10%] right-[-2%] z-20 text-right"
                    style={{ willChange: 'transform' }}
                >
                    <h1 className="text-[18vw] font-bold font-serif leading-[0.75] tracking-tighter text-[var(--color-electric-blue)] mix-blend-difference select-none">
                        ARMORED
                    </h1>
                </motion.div>

                {/* CTA Block - Offset, floating, purely functional */}
                <motion.div
                    variants={maskReveal}
                    initial="hidden"
                    animate="visible"
                    className="absolute bottom-[20%] left-[10%] md:left-[15%] pointer-events-auto max-w-sm"
                >
                    <p className="text-xl font-bold leading-tight mb-6 text-[var(--color-off-white)] uppercase tracking-tight mix-blend-difference">
                        Structure is weapon. <br />
                        Silence is noise.
                    </p>
                    <Button
                        size="lg"
                        className="bg-[var(--color-electric-blue)] text-[var(--color-off-white)] hover:bg-[var(--color-off-white)] hover:text-[var(--color-electric-blue)] border border-[var(--color-electric-blue)] hover:border-[var(--color-off-white)] rounded-none px-10 py-6 text-xl"
                    >
                        SHOP DROP 01
                    </Button>
                </motion.div>
            </div>

            {/* Kinetic Scroll Indicator - Vertical Line */}
            <motion.div
                className="absolute bottom-0 left-[5%] z-20 h-[15vh] w-[1px] bg-[var(--color-off-white)] overflow-hidden origin-bottom"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 1, delay: 0.5, ease: easings.luxury }}
            >
                <motion.div
                    className="w-full h-full bg-[var(--color-electric-blue)]"
                    animate={{ y: ['-100%', '100%'] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                />
            </motion.div>
        </section>
    );
};
