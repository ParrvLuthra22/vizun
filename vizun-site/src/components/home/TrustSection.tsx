import { Reveal } from '@/components/ui/Reveal';

export const TrustSection = () => {
    const trustPoints = [
        {
            number: '01',
            title: 'Premium Materials',
            description: 'Sourced from the finest mills in Italy and Japan',
        },
        {
            number: '02',
            title: 'Limited Production',
            description: 'Each drop is limited to 100-200 pieces',
        },
        {
            number: '03',
            title: 'Fast Shipping',
            description: 'Free 2-3 day shipping on all orders',
        },
    ];

    return (
        <section className="section section-primary">
            <div className="container">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: 'var(--space-12)',
                }}>
                    {trustPoints.map((point, index) => (
                        <Reveal key={point.number} delay={index * 0.1} width="100%">
                            <div style={{ textAlign: 'center' }}>
                                <p className="label-base text-luxury" style={{ marginBottom: 'var(--space-4)' }}>
                                    {point.number}
                                </p>

                                <h3 className="headline-4" style={{ marginBottom: 'var(--space-4)' }}>
                                    {point.title}
                                </h3>

                                <p className="body-base">
                                    {point.description}
                                </p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
};
