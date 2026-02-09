import { Button } from '@/components/ui/Button';
import { Reveal, RevealText } from '@/components/ui/Reveal';

export const PhilosophySection = () => {
    return (
        <section className="section section-primary">
            <div className="container-narrow" style={{
                textAlign: 'center',
            }}>
                <Reveal width="100%">
                    <p className="label-lg text-luxury" style={{ marginBottom: 'var(--space-6)' }}>
                        PHILOSOPHY
                    </p>
                </Reveal>

                <div style={{ marginBottom: 'var(--space-8)', display: 'flex', justifyContent: 'center' }}>
                    <RevealText
                        text="Confidence Through Precision"
                        className="headline-2"
                    />
                </div>

                <Reveal delay={0.2} width="100%">
                    <p className="body-lg" style={{
                        marginBottom: 'var(--space-6)',
                        maxWidth: '800px',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                    }}>
                        We design for those who value quiet luxury over loud statements.
                        Every piece is intentional, crafted with precision, and built to last.
                    </p>
                </Reveal>

                <Reveal delay={0.3} width="100%">
                    <p className="body-lg" style={{
                        marginBottom: 'var(--space-10)',
                        maxWidth: '800px',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                    }}>
                        VIZUN represents the intersection of modern streetwear and editorial fashion—
                        confidence expressed through restraint, luxury through subtlety.
                    </p>
                </Reveal>

                <Reveal delay={0.4} width="100%">
                    <Button variant="secondary">Learn Our Story</Button>
                </Reveal>
            </div>
        </section>
    );
};
