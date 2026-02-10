'use client';

import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { slamUp, fadeSlideUp, durations, easings } from '@/lib/motion';
import { Parallax } from '@/components/ui/Parallax';

export const PhilosophySection = () => {
    return (
        <section className="py-32 bg-[var(--color-jet-black)] text-[var(--color-off-white)] relative overflow-hidden w-full">
            {/* Asymmetrical Layout - Grid Anchored (5:7 Split) */}
            <div className="container relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 h-full items-center">

                {/* Huge Watermark / Title - Left 5 Columns */}
                <div className="md:col-span-5 flex flex-col justify-center relative mix-blend-difference z-0">
                    <Parallax speed={-0.2}>
                        <div className="flex flex-col leading-[0.8] tracking-tighter font-bold font-serif text-[var(--color-off-white)] opacity-10 select-none">
                            <motion.span
                                initial={{ x: -100, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                className="text-[25vw] md:text-[15vw] ml-[-2vw]"
                            >
                                PHILO
                            </motion.span>
                            <motion.span
                                initial={{ x: 100, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                                className="text-[25vw] md:text-[15vw] self-end mr-[-2vw]"
                            >
                                SOPHY
                            </motion.span>
                        </div>
                    </Parallax>
                </div>

                {/* Content Block - Right 7 Columns (Offset) */}
                <div className="md:col-span-7 flex flex-col justify-center md:pl-12 z-10">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-10%" }}
                        variants={fadeSlideUp}
                        className="bg-[#F5F5F0] p-8 md:p-16 shadow-2xl skew-y-2 md:-skew-y-2 border-l-4 border-[var(--color-alert-red)]"
                    >
                        <h3 className="text-sm font-bold tracking-widest uppercase mb-6 text-[var(--color-alert-red)]">
                            The Manifesto
                        </h3>
                        <p className="text-2xl md:text-5xl font-bold leading-tight uppercase tracking-tight text-[var(--color-jet-black)] mb-8">
                            "We do not design for comfort. We design for <span className="text-[var(--color-alert-red)]">impact</span>."
                        </p>
                        <p className="text-lg md:text-xl text-[var(--color-gray-600)] leading-relaxed font-medium max-w-2xl">
                            VIZUN is an exploration of raw aesthetics and industrial precision.
                            We reject the seamless and embrace the friction of reality.
                        </p>
                        <div className="mt-12">
                            <Button variant="primary">READ MORE</Button>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Background Lines */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute top-[20%] left-0 w-full h-[1px] bg-[var(--color-gray-800)]" />
                <div className="absolute top-[80%] left-0 w-full h-[1px] bg-[var(--color-gray-800)]" />
                <div className="absolute top-0 left-[33%] w-[1px] h-full bg-[var(--color-gray-800)]" />
            </div>
        </section>
    );
};
