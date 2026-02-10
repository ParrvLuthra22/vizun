'use client';

import { motion } from 'framer-motion';
import { Parallax } from '@/components/ui/Parallax';

export const TrustSection = () => {
    return (
        <section className="py-12 bg-[var(--color-jet-black)] text-[var(--color-off-white)] overflow-hidden">
            {/* Brutalist Marquees */}
            <div className="flex flex-col gap-0">
                {/* Line 1 - Right to Left */}
                <Parallax speed={-0.02} className="w-full">
                    <div className="whitespace-nowrap flex gap-12 items-center opacity-80">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <span key={i} className="text-[12vw] font-bold font-serif leading-none tracking-tighter hover:text-[var(--color-alert-red)] transition-colors duration-200">
                                ITALIAN MILLS / JAPANESE DENIM /
                            </span>
                        ))}
                    </div>
                </Parallax>

                {/* Line 2 - Left to Right */}
                <Parallax speed={0.02} className="w-full">
                    <div className="whitespace-nowrap flex gap-12 items-center text-[var(--color-gray-500)] ml-[-20vw]">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <span key={i} className="text-[12vw] font-bold font-serif leading-none tracking-tighter hover:text-[var(--color-off-white)] transition-colors duration-200">
                                LIMITED EDITION / NO RESTOCKS /
                            </span>
                        ))}
                    </div>
                </Parallax>
            </div>

            {/* Divider */}
            <div className="w-full h-[1px] bg-[var(--color-gray-800)] mt-12 mb-12" />

            <div className="container flex justify-between items-end">
                <span className="text-sm font-mono uppercase tracking-widest text-[var(--color-gray-500)]">
                    EST. 2026 / NYC
                </span>
                <span className="text-sm font-mono uppercase tracking-widest text-[var(--color-alert-red)]">
                    ● WORLDWIDE SHIPPING
                </span>
            </div>
        </section>
    );
};
