'use client';

import { useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { motion, useScroll, useSpring, useTransform, useMotionValue, useVelocity, useAnimationFrame } from 'framer-motion';
import { slamUp, staggerContainer } from '@/lib/motion';

function MarqueeText({ children, baseVelocity = 100 }: { children: string; baseVelocity: number }) {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
        clamp: false
    });

    const x = useTransform(baseX, (v) => `${v}%`);

    const directionFactor = useRef<number>(1);

    useAnimationFrame((t, delta) => {
        let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

        // Apply scroll velocity effect
        if (velocityFactor.get() < 0) {
            directionFactor.current = -1;
        } else if (velocityFactor.get() > 0) {
            directionFactor.current = 1;
        }

        moveBy += directionFactor.current * moveBy * velocityFactor.get();

        baseX.set(baseX.get() + moveBy);

        // Loop logic (approximate for infinite scroll)
        if (baseX.get() < -100) {
            baseX.set(0);
        } else if (baseX.get() > 0) {
            baseX.set(-100);
        }
    });

    return (
        <motion.div className="flex whitespace-nowrap" style={{ x }}>
            <span className="text-[30vw] font-[800] font-serif leading-none tracking-tighter select-none text-[var(--color-jet-black)] mr-16">{children}</span>
            <span className="text-[30vw] font-[800] font-serif leading-none tracking-tighter select-none text-[var(--color-jet-black)] mr-16">{children}</span>
            <span className="text-[30vw] font-[800] font-serif leading-none tracking-tighter select-none text-[var(--color-jet-black)] mr-16">{children}</span>
            <span className="text-[30vw] font-[800] font-serif leading-none tracking-tighter select-none text-[var(--color-jet-black)] mr-16">{children}</span>
        </motion.div>
    );
}

export const CommunitySection = () => {
    const instagramImages = Array(6).fill(null);

    return (
        <section className="py-32 bg-[var(--color-alert-red)] text-[var(--color-jet-black)] relative overflow-hidden">

            {/* Marquee Background - Maximalist & Velocity Based */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full overflow-hidden whitespace-nowrap opacity-100 mix-blend-overlay pointer-events-none">
                <MarqueeText baseVelocity={5}>JOIN THE CULT</MarqueeText>
            </div>

            <div className="container relative z-10">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={slamUp}
                    className="text-center mb-16"
                >
                    <h2 className="text-6xl md:text-8xl font-bold uppercase tracking-tighter leading-none mb-8">
                        VIZUN <span className="text-stroke text-transparent" style={{ WebkitTextStroke: '2px var(--color-jet-black)' }}>ARCHIVE</span>
                    </h2>
                    <Button variant="primary">@VIZUN.OFFICIAL</Button>
                </motion.div>

                {/* Instagram Grid - Raw & Tight */}
                <motion.div
                    variants={staggerContainer('fast')}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-2 md:grid-cols-6 gap-0 border-t border-l border-[var(--color-jet-black)]"
                >
                    {instagramImages.map((_, index) => (
                        <motion.div
                            key={index}
                            variants={slamUp}
                            className="aspect-square bg-[var(--color-gray-900)] border-r border-b border-[var(--color-jet-black)] relative group overflow-hidden"
                        >
                            <div className="absolute inset-0 flex items-center justify-center text-[var(--color-off-white)] opacity-50 font-bold uppercase tracking-widest text-xs">
                                IMG {index + 1}
                            </div>
                            <div className="absolute inset-0 bg-[var(--color-electric-blue)] mix-blend-color opacity-0 group-hover:opacity-50 transition-opacity duration-200" />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};
