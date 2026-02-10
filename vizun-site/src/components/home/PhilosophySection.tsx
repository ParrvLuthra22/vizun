import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { slamUp, durations, easings } from '@/lib/motion';

export const PhilosophySection = () => {
    return (
        <section className="py-32 bg-[var(--color-jet-black)] text-[var(--color-off-white)] relative overflow-hidden">
            {/* Asymmetrical Layout */}
            <div className="container relative z-10 flex flex-col md:flex-row gap-16 md:gap-32">

                {/* Huge Watermark / Title */}
                <div className="md:w-1/2">
                    <motion.h2
                        variants={slamUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-10%" }}
                        className="text-[15vw] leading-[0.8] font-bold tracking-tighter text-[var(--color-gray-900)] uppercase font-serif"
                        style={{ wordBreak: 'break-all' }}
                    >
                        PHILO <br /> SOPHY
                    </motion.h2>
                </div>

                <div className="md:w-1/2 flex flex-col justify-center">
                    <motion.h3
                        variants={slamUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-8 text-[var(--color-off-white)]"
                    >
                        CONFIDENCE <span className="text-[var(--color-electric-blue)]">IS</span> <br />
                        PRECISION.
                    </motion.h3>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: durations.medium, delay: 0.2, ease: easings.aggressive }}
                        viewport={{ once: true }}
                        className="border-l-4 border-[var(--color-electric-blue)] pl-8"
                    >
                        <p className="text-xl md:text-2xl font-bold leading-tight mb-8 max-w-md text-[var(--color-gray-400)] uppercase">
                            We don't do "quiet". We do deliberate. <br />
                            Every stitch is a decision. <br />
                            Every cut is a declaration.
                        </p>
                        <div className="flex gap-4">
                            <Button variant="secondary">THE MANIFESTO</Button>
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
