'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { ProductCard } from '@/components/ui/ProductCard';

// Product data - will be replaced with CMS data
const featuredProducts = [
    {
        id: '1',
        name: 'Oversized Wool Coat',
        price: 520,
        image: '/products/coat.jpg',
        remaining: 12,
        slug: 'oversized-wool-coat',
    },
    {
        id: '2',
        name: 'Premium Cotton Tee',
        price: 180,
        image: '/products/tee.jpg',
        remaining: 8,
        slug: 'premium-cotton-tee',
    },
    {
        id: '3',
        name: 'Tailored Trousers',
        price: 380,
        image: '/products/trousers.jpg',
        remaining: 15,
        slug: 'tailored-trousers',
    },
];

export const FeaturedDropSection = () => {
    return (
        <section className="section section-secondary">
            <div className="container">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        textAlign: 'center',
                        marginBottom: 'var(--space-16)',
                    }}
                >
                    <p className="label-lg text-luxury" style={{ marginBottom: 'var(--space-6)' }}>
                        CURRENT DROP
                    </p>

                    <h2 className="headline-2" style={{ marginBottom: 'var(--space-4)' }}>
                        Spring/Summer 2026
                    </h2>

                    <p className="headline-4" style={{
                        color: 'var(--color-off-white-subtle)',
                        fontWeight: 'var(--font-regular)',
                    }}>
                        Modern Essentials
                    </p>
                </motion.div>

                {/* Product Grid */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, delay: 0.2 }}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                        gap: 'var(--space-12)',
                        marginBottom: 'var(--space-16)',
                    }}
                >
                    {featuredProducts.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{
                                duration: 0.8,
                                delay: index * 0.15,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                        >
                            <ProductCard {...product} />
                        </motion.div>
                    ))}
                </motion.div>

                {/* Scarcity Message & CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    style={{ textAlign: 'center' }}
                >
                    <p className="body-base text-luxury" style={{
                        marginBottom: 'var(--space-8)',
                        letterSpacing: '0.05em',
                    }}>
                        Limited to 100 pieces — Each drop sells out
                    </p>

                    <Button variant="accent" size="lg">
                        VIEW FULL COLLECTION
                    </Button>
                </motion.div>
            </div>
        </section>
    );
};
