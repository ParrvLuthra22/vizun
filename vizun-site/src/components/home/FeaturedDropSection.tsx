import { Button } from '@/components/ui/Button';

// Temporary mock data - will be replaced with CMS data
const featuredProducts = [
    {
        id: 1,
        name: 'Oversized Wool Coat',
        price: 520,
        image: '/products/coat.jpg',
        remaining: 12,
    },
    {
        id: 2,
        name: 'Premium Cotton Tee',
        price: 180,
        image: '/products/tee.jpg',
        remaining: 8,
    },
    {
        id: 3,
        name: 'Tailored Trousers',
        price: 380,
        image: '/products/trousers.jpg',
        remaining: 15,
    },
];

export const FeaturedDropSection = () => {
    return (
        <section className="section section-secondary">
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
                    <p className="label-lg text-luxury" style={{ marginBottom: 'var(--space-6)' }}>
                        CURRENT DROP
                    </p>

                    <h2 className="headline-2" style={{ marginBottom: 'var(--space-4)' }}>
                        Spring/Summer 2026
                    </h2>

                    <p className="headline-4" style={{ color: 'var(--color-off-white-subtle)' }}>
                        Modern Essentials
                    </p>
                </div>

                {/* Product Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: 'var(--space-8)',
                    marginBottom: 'var(--space-12)',
                }}>
                    {featuredProducts.map((product) => (
                        <div key={product.id} className="card" style={{ textAlign: 'center' }}>
                            {/* Placeholder for product image */}
                            <div style={{
                                width: '100%',
                                aspectRatio: '3/4',
                                backgroundColor: 'var(--color-gray-800)',
                                marginBottom: 'var(--space-4)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <p className="body-sm text-muted">Product Image</p>
                            </div>

                            <h3 className="headline-4" style={{ marginBottom: 'var(--space-3)' }}>
                                {product.name}
                            </h3>

                            <p className="body-lg" style={{ marginBottom: 'var(--space-3)' }}>
                                ${product.price}
                            </p>

                            <p className="body-sm text-luxury">
                                Only {product.remaining} remaining
                            </p>
                        </div>
                    ))}
                </div>

                {/* Scarcity Message & CTA */}
                <div style={{ textAlign: 'center' }}>
                    <p className="body-base text-luxury" style={{ marginBottom: 'var(--space-6)' }}>
                        Limited to 100 pieces
                    </p>

                    <Button variant="accent" size="lg">
                        View Full Collection
                    </Button>
                </div>
            </div>
        </section>
    );
};
