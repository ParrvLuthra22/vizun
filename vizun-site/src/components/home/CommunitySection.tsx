import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { slamUp, staggerContainer } from '@/lib/motion';

export const CommunitySection = () => {
    const instagramImages = Array(6).fill(null);

    return (
        <section className="py-32 bg-[var(--color-off-white)] text-[var(--color-jet-black)] relative overflow-hidden">

            {/* Marquee Background */}
            <div className="absolute top-0 w-full overflow-hidden whitespace-nowrap opacity-5 text-[15vw] font-bold font-serif leading-none tracking-tighter select-none pointer-events-none">
                JOIN THE CULT JOIN THE CULT JOIN THE CULT
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
