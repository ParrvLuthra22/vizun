import { motion } from 'framer-motion';
import { slamUp, staggerContainer } from '@/lib/motion';

export const TrustSection = () => {
    const trustPoints = [
        {
            number: '01',
            title: 'MATERIALS',
            description: 'Sourced from the finest mills in Italy and Japan',
        },
        {
            number: '02',
            title: 'LIMITED',
            description: 'Each drop is strictly limited to 100 pieces',
        },
        {
            number: '03',
            title: 'VELOCITY',
            description: 'Global express shipping included',
        },
    ];

    return (
        <section className="py-24 bg-[var(--color-jet-black)] text-[var(--color-off-white)] border-t border-[var(--color-gray-800)]">
            <div className="container">
                <motion.div
                    variants={staggerContainer('fast')}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-10%" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left"
                >
                    {trustPoints.map((point) => (
                        <motion.div key={point.number} variants={slamUp} className="group cursor-default">
                            <p className="text-8xl font-bold font-serif text-[var(--color-gray-800)] group-hover:text-[var(--color-electric-blue)] transition-colors duration-300 mb-[-10px] leading-none">
                                {point.number}
                            </p>

                            <h3 className="text-3xl font-bold uppercase tracking-tighter mb-4 text-[var(--color-off-white)]">
                                {point.title}
                            </h3>

                            <p className="text-[var(--color-gray-500)] text-lg leading-tight uppercase font-bold tracking-wide">
                                {point.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};
