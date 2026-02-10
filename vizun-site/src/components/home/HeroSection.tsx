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

            {/* Content Layer - Grid Anchored */}
            <div className="absolute inset-0 z-10 pointer-events-none grid grid-cols-12 grid-rows-6 h-full px-[2%] pb-[2%]">

                {/* Top Left - VIZUN (Framing Image Top) */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={impactVar}
                    className="col-span-12 md:col-span-8 row-start-2 row-span-2 flex items-center justify-start z-20 mix-blend-exclusion"
                    style={{ y: textY, willChange: 'transform' }}
                >
                    <h1 className="text-[15vw] md:text-[16vw] font-bold font-serif leading-[0.7] tracking-tighter text-[var(--color-off-white)] select-none ml-[-1%]">
                        VIZUN
                    </h1>
                </motion.div>

                {/* Bottom Right - ARMORED (Framing Image Bottom) */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={impactVar}
                    className="col-span-12 md:col-span-8 md:col-start-5 row-start-4 row-span-2 flex items-center justify-end z-20 mix-blend-difference"
                    style={{ willChange: 'transform' }}
                >
                    <h1 className="text-[15vw] md:text-[16vw] font-bold font-serif leading-[0.7] tracking-tighter text-[var(--color-electric-blue)] select-none mr-[-1%] text-right">
                        ARMORED
                    </h1>
                </motion.div>

                {/* CTA Block - Anchored Below Composition */}
                <motion.div
                    variants={maskReveal}
                    initial="hidden"
                    animate="visible"
                    className="col-span-12 md:col-span-4 md:col-start-2 row-start-5 md:row-start-5 flex flex-col justify-end pointer-events-auto z-30 pb-8"
                >
                    <p className="text-xl font-bold leading-tight mb-6 text-[var(--color-off-white)] uppercase tracking-tight mix-blend-difference">
                        Structure is weapon. <br />
                        Silence is noise.
                    </p>
                    <Button
                        size="lg"
                        className="bg-[var(--color-electric-blue)] text-[var(--color-off-white)] hover:bg-[var(--color-off-white)] hover:text-[var(--color-electric-blue)] border border-[var(--color-electric-blue)] hover:border-[var(--color-off-white)] rounded-none px-10 py-6 text-xl w-max"
                    >
                        SHOP DROP 01
                    </Button>
                </motion.div>
            </div>


            {/* Product Film Strip - "The Evidence" */}
            <div className="absolute bottom-0 left-0 w-full h-[12vh] md:h-[15vh] z-20 border-t border-[var(--color-off-white)] bg-[var(--color-jet-black)] overflow-hidden">
                <motion.div
                    className="flex h-full w-max"
                    animate={{ x: ["0%", "-33.33%"] }}
                    transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                >
                    {[...Array(24)].map((_, i) => (
                        <div key={i} className="relative h-full aspect-[4/5] border-r border-[var(--color-off-white)]">
                            <Image
                                src={i % 3 === 0 ? '/products/coat.jpg' : i % 3 === 1 ? '/products/tee.jpg' : '/products/trousers.jpg'}
                                alt="Product Detail"
                                fill
                                className="object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-300"
                                sizes="20vw"
                            />
                            {/* Overlay flash */}
                            <div className="absolute inset-0 bg-[var(--color-alert-red)] opacity-0 hover:opacity-20 transition-opacity duration-100 mix-blend-multiply" />
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};
