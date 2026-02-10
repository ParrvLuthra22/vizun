'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';
import { durations, easings, slamUp, maskReveal, staggerContainer } from '@/lib/motion';

export const HeroSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
    const imageStart = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

    return (
        <section
            ref={containerRef}
            className="flex flex-col justify-end min-h-screen relative overflow-hidden bg-[var(--color-off-white)] text-[var(--color-jet-black)]"
            style={{ paddingBottom: 'var(--space-16)' }}
        >
            {/* Background Image / Texture - Asymmetrical placement */}
            <div className="absolute top-0 right-0 w-[85%] h-[90%] overflow-hidden z-0">
                <motion.div
                    style={{ scale: imageScale, y: imageStart, height: '100%', width: '100%', position: 'relative' }}
                >
                    <Image
                        src="/hero-product.jpg"
                        alt="VIZUN ARMORED"
                        fill
                        className="object-cover grayscale contrast-125 brightness-90"
                        priority
                    />
                </motion.div>
                {/* Hard Cut Overlay */}
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[var(--color-off-white)]" style={{ width: '20%' }} />
            </div>

            <div className="container relative z-10 pointer-events-none">
                <motion.div
                    variants={staggerContainer('fast')}
                    initial="hidden"
                    animate="visible"
                    className="max-w-[1400px]"
                >
                    {/* Season Label - Rotated/Vertical */}
                    <motion.div variants={slamUp} className="absolute -left-8 top-0 origin-bottom-left -rotate-90 hidden md:block">
                        <span className="text-xs font-bold tracking-widest uppercase">Spring / Summer 2026</span>
                    </motion.div>

                    {/* Giant Typography */}
                    <div className="overflow-hidden mb-[-2vw]">
                        <motion.h1
                            variants={slamUp}
                            className="text-[12vw] leading-[0.85] font-bold tracking-tighter uppercase font-serif"
                        >
                            VIZUN
                        </motion.h1>
                    </div>

                    <div className="flex flex-col md:flex-row items-end gap-8">
                        <div className="overflow-hidden md:w-2/3">
                            <motion.h1
                                variants={slamUp}
                                className="text-[12vw] leading-[0.85] font-bold tracking-tighter uppercase font-serif text-[var(--color-electric-blue)]"
                            >
                                ARMORED
                            </motion.h1>
                        </div>

                        <motion.div variants={maskReveal} className="md:w-1/3 pb-8 pointer-events-auto">
                            <p className="text-xl md:text-2xl font-bold leading-tight mb-8 max-w-md">
                                WEAPONIZE YOUR WARDROBE. <br />
                                PRECISION TAILORING FOR THE URBAN WARZONE.
                            </p>
                            <div className="flex gap-4">
                                <Button size="lg" variant="primary">SHOP DROP 01</Button>
                                <Button size="lg" variant="secondary">L00KBOOK</Button>
                            </div>
                        </motion.div>
                    </div>

                </motion.div>
            </div>

            {/* Kinetic Scroll Indicator */}
            <motion.div
                className="absolute bottom-8 left-8 z-20 overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: durations.slow }}
            >
                <motion.div
                    animate={{ y: ['-100%', '0%', '100%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: easings.aggressive }}
                    className="h-16 w-[2px] bg-[var(--color-jet-black)]"
                />
            </motion.div>
        </section>
    );
};
