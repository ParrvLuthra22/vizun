import { Button } from '@/components/ui/Button';

export const PhilosophySection = () => {
    return (
        <section className="section section-primary">
            <div className="container-narrow" style={{
                textAlign: 'center',
            }}>
                <p className="label-lg text-luxury" style={{ marginBottom: 'var(--space-6)' }}>
                    PHILOSOPHY
                </p>

                <h2 className="headline-2" style={{ marginBottom: 'var(--space-8)' }}>
                    Confidence Through Precision
                </h2>

                <p className="body-lg" style={{
                    marginBottom: 'var(--space-6)',
                    maxWidth: '800px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                }}>
                    We design for those who value quiet luxury over loud statements.
                    Every piece is intentional, crafted with precision, and built to last.
                </p>

                <p className="body-lg" style={{
                    marginBottom: 'var(--space-10)',
                    maxWidth: '800px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                }}>
                    VIZUN represents the intersection of modern streetwear and editorial fashion—
                    confidence expressed through restraint, luxury through subtlety.
                </p>

                <Button variant="secondary">Learn Our Story</Button>
            </div>
        </section>
    );
};
