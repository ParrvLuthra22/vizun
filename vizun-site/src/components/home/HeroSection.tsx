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
            className="relative h-screen w-full overflow-hidden bg-[var(--color-jet-black)] flex items-center justify-center"
        >
            {/* Background Image - Clean & Stable */}
            <motion.div
                className="absolute inset-0 z-0"
                style={{ y: imageY, scale: 1.1 }} // Slight scale for parallax room
            >
                <div className="relative w-full h-full">
                    <Image
                        src="/hero-product.jpg"
                        alt="VIZUN ARMORED"
                        fill
                        className="object-cover opacity-60" // Reduced opacity for text legibility
                        priority
                        sizes="100vw"
                    />
                </div>
            </motion.div>

            {/* Content - Centralized & Strong */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center w-full px-4">

                {/* VIZUN - Top Anchor */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={impactVar}
                    className="mix-blend-overlay mb-4"
                >
                    <h1 className="text-[15vw] leading-[0.8] font-bold font-serif tracking-tighter text-[var(--color-off-white)] select-none">
                        VIZUN
                    </h1>
                </motion.div>

                {/* Sub-headline / CTA Group */}
                <motion.div
                    variants={maskReveal}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col items-center gap-8 my-8"
                >
                    <p className="text-xl md:text-2xl font-bold uppercase tracking-widest text-[var(--color-off-white)] mix-blend-difference">
                        Future Armor.
                    </p>

                    <Button
                        size="lg"
                        className="bg-[var(--color-electric-blue)] text-[var(--color-off-white)] hover:bg-[var(--color-off-white)] hover:text-[var(--color-electric-blue)] border-none px-12 py-4 text-lg"
                    >
                        SHOP DROP 01
                    </Button>
                </motion.div>

                {/* ARMORED - Bottom Anchor */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={impactVar}
                    className="mix-blend-overlay mt-4"
                >
                    <h1 className="text-[15vw] leading-[0.8] font-bold font-serif tracking-tighter text-[var(--color-off-white)] select-none opacity-50">
                        ARMORED
                    </h1>
                </motion.div>
            </div>
        </section>
    );
};
