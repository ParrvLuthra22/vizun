'use client';

import { EditorialCard } from '@/components/ui/EditorialCard';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { slamUp, staggerContainer } from '@/lib/motion';
import { Parallax } from '@/components/ui/Parallax';

export const FeaturedDropSection = () => {
    const featuredProducts = [
        {
            id: '1',
            name: 'Oversized Wool Coat',
            price: 520,
            image: '/products/coat.jpg',
            remaining: 12,
            slug: 'oversized-wool-coat'
        },
        {
            id: '2',
            name: 'Premium Cotton Tee',
            price: 180,
            image: '/products/tee.jpg',
            remaining: 8,
            slug: 'premium-cotton-tee'
        },
        {
            id: '3',
            name: 'Tailored Trousers',
            price: 380,
            image: '/products/trousers.jpg',
            remaining: 15,
            slug: 'tailored-trousers'
        },
    ];

    return (
        <section className="py-32 bg-[var(--color-off-white)] text-[var(--color-jet-black)] relative overflow-hidden">

            {/* Editorial Background Elements - Grid & Coordinates */}
            <div className="absolute inset-0 pointer-events-none z-0 opacity-20">
                <div className="absolute left-[10%] top-0 h-full w-[1px] bg-[var(--color-jet-black)]" />
                <div className="absolute right-[10%] top-0 h-full w-[1px] bg-[var(--color-jet-black)]" />
                <div className="absolute top-[20%] left-0 w-full h-[1px] bg-[var(--color-jet-black)]" />
                <span className="absolute top-[21%] left-[11%] font-mono text-xs uppercase">LAT: 40.7128 N</span>
            </div>

            <div className="container relative z-10">
                {/* Header - Scattered */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={slamUp}
                        className="relative"
                    >
                        <div className="absolute -top-12 -left-12 opacity-10">
                            <span className="text-[10rem] leading-none font-bold font-serif">A</span>
                        </div>
                        <p className="font-bold tracking-widest uppercase text-sm mb-4 text-[var(--color-alert-red)]">
                            DROP 01 / SPRING 26
                        </p>
                        <h2 className="text-8xl md:text-9xl leading-[0.8] font-bold font-serif tracking-tighter uppercase relative z-10">
                            MODERN <br /> ESSENTIALS
                        </h2>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={slamUp}
                        className="md:mb-4"
                    >
                        <Button
                            size="lg"
                            className="bg-[var(--color-jet-black)] text-[var(--color-off-white)] hover:bg-[var(--color-alert-red)] hover:text-white rounded-none border-none transition-colors duration-300 px-12 py-6 text-xl"
                        >
                            VIEW FULL COLLECTION
                        </Button>
                    </motion.div>
                </div>

                {/* Editorial Layout - Proper 3-Col Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {featuredProducts.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <EditorialCard
                                {...product}
                                aspectRatio="portrait"
                                className="w-full h-full"
                            />
                        </motion.div>
                    ))}
                </div>

                {/* Giant Scrolling Text Background */}
                <div className="absolute left-0 bottom-0 pointer-events-none opacity-[0.03] w-full overflow-hidden leading-none z-0">
                    <span className="text-[20vw] font-bold font-serif tracking-tighter whitespace-nowrap text-[var(--color-jet-black)]">
                        LIMITED EDITION LIMITED EDITION
                    </span>
                </div>
            </div>
        </section>
    );
};
