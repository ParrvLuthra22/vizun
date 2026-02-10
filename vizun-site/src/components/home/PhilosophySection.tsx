'use client';

import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { slamUp, fadeSlideUp, durations, easings } from '@/lib/motion';
import { Parallax } from '@/components/ui/Parallax';

export const PhilosophySection = () => {
    return (
        <section className="py-32 bg-[var(--color-jet-black)] text-[var(--color-off-white)] relative overflow-hidden w-full">
            {/* Asymmetrical Layout */}
            <div className="container relative z-10 flex flex-col md:flex-row h-full">

                {/* Huge Watermark / Title - Moves slower (Lag) */}
                <div className="md:w-1/2 flex flex-col justify-center relative mix-blend-difference z-0">
                    <Parallax speed={-0.2}>
                        <div className="flex flex-col leading-[0.8] tracking-tighter font-bold font-serif text-[var(--color-jet-black)] opacity-100 select-none">
                            <motion.span
                                initial={{ x: -100, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                className="text-[25vw] md:text-[30vw] ml-[-5vw]"
                            >
                                PHILO
                            </motion.span>
                            <motion.span
                                initial={{ x: 100, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                                className="text-[25vw] md:text-[30vw] self-end mr-[-5vw]"
                            >
                                SOPHY
                            </motion.span>
                        </div>
                    </Parallax>
                </div>

                <div className="md:w-1/2 flex flex-col justify-center md:pl-24 z-10">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-10%" }}
                        variants={fadeSlideUp}
                        className="bg-[var(--color-off-white)] p-8 md:p-12 shadow-2xl skew-y-2 md:-skew-y-2 border-l-4 border-[var(--color-alert-red)]"
                    >
                        <h3 className="text-sm font-bold tracking-widest uppercase mb-6 text-[var(--color-alert-red)]">
                            The Manifesto
                        </h3>
                        <p className="text-2xl md:text-4xl font-bold leading-tight uppercase tracking-tight text-[var(--color-jet-black)] mb-8">
                            "We do not design for comfort. We design for <span className="text-[var(--color-alert-red)]">impact</span>."
                        </p>
                        <p className="text-lg md:text-xl text-[var(--color-gray-600)] leading-relaxed font-medium">
                            VIZUN is an exploration of raw aesthetics and industrial precision.
                            We reject the seamless and embrace the friction of reality.
                        </p>
                        <div className="mt-8">
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
