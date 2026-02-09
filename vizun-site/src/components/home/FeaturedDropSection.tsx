'use client';

import { ProductCard } from '@/components/ui/ProductCard';
import { Button } from '@/components/ui/Button';
import { Reveal, RevealText } from '@/components/ui/Reveal';

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
        <section className="section section-secondary">
            <div className="container">
                {/* Section Header */}
                <div style={{ textAlign: 'center', marginBottom: 'var(--space-16)' }}>
                    <Reveal width="100%">
                        <p className="label-lg text-luxury" style={{ marginBottom: 'var(--space-6)' }}>
                            CURRENT DROP
                        </p>
                    </Reveal>

                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--space-4)' }}>
                        <RevealText
                            text="Spring/Summer 2026"
                            className="headline-2"
                        />
                    </div>

                    <Reveal delay={0.2} width="100%">
                        <p className="headline-4" style={{
                            color: 'var(--color-off-white-subtle)',
                            fontWeight: 'var(--font-regular)',
                        }}>
                            Modern Essentials
                        </p>
                    </Reveal>
                </div>

                {/* Product Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: 'var(--space-12)',
                    marginBottom: 'var(--space-16)',
                }}>
                    {featuredProducts.map((product, index) => (
                        <Reveal key={product.id} delay={index * 0.15} width="100%">
                            <ProductCard {...product} />
                        </Reveal>
                    ))}
                </div>

                {/* Scarcity Message & CTA */}
                <div style={{ textAlign: 'center' }}>
                    <Reveal delay={0.4} width="100%">
                        <p className="body-base text-luxury" style={{
                            marginBottom: 'var(--space-8)',
                            letterSpacing: '0.05em',
                        }}>
                            Limited to 100 pieces — Each drop sells out
                        </p>

                        <Button variant="accent" size="lg">
                            VIEW FULL COLLECTION
                        </Button>
                    </Reveal>
                </div>
            </div>
        </section>
    );
};
