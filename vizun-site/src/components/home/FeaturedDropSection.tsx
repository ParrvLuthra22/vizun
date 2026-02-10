'use client';

import { ProductCard } from '@/components/ui/ProductCard';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { slamUp, staggerContainer } from '@/lib/motion';

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
        <section className="py-32 bg-[var(--color-off-white)] text-[var(--color-jet-black)] relative">
            <div className="container">
                {/* Header - Scattered */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={slamUp}
                    >
                        <p className="font-bold tracking-widest uppercase text-sm mb-4 text-[var(--color-gray-500)]">
                            DROP 01 / SPRING 26
                        </p>
                        <h2 className="text-8xl md:text-9xl leading-[0.8] font-bold font-serif tracking-tighter uppercase">
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
                        <Button variant="primary" size="lg">VIEW FULL COLLECTION</Button>
                    </motion.div>
                </div>

                {/* Experimental "Grid" - Offset columns */}
                <motion.div
                    variants={staggerContainer('medium')}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-10%" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16"
                >
                    {featuredProducts.map((product, index) => (
                        <motion.div
                            key={product.id}
                            variants={slamUp}
                            className={`
                                ${index === 1 ? 'md:mt-32' : ''} 
                                ${index === 2 ? 'md:mt-16' : ''}
                            `}
                        >
                            <ProductCard {...product} />
                        </motion.div>
                    ))}
                </motion.div>

                {/* Giant Scrolling Text Background (Optional Visual Weapon) */}
                <div className="absolute left-0 bottom-0 pointer-events-none opacity-5 w-full overflow-hidden leading-none">
                    <span className="text-[20vw] font-bold font-serif tracking-tighter whitespace-nowrap">
                        LIMITED EDITION LIMITED EDITION
                    </span>
                </div>
            </div>
        </section>
    );
};
