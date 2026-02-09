import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';

export const CommunitySection = () => {
    // Mock Instagram images - will be replaced with API integration
    const instagramImages = Array(6).fill(null);

    return (
        <section className="section section-secondary">
            <div className="container" style={{ textAlign: 'center' }}>
                <Reveal width="100%">
                    <p className="label-lg text-luxury" style={{ marginBottom: 'var(--space-6)' }}>
                        COMMUNITY
                    </p>
                </Reveal>

                <Reveal delay={0.1} width="100%">
                    <h2 className="headline-2" style={{ marginBottom: 'var(--space-12)' }}>
                        Join the Movement
                    </h2>
                </Reveal>

                {/* Instagram Grid */}
                <Reveal delay={0.3} width="100%">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: 'var(--space-4)',
                        marginBottom: 'var(--space-8)',
                    }}>
                        {instagramImages.map((_, index) => (
                            <div
                                key={index}
                                style={{
                                    aspectRatio: '1',
                                    backgroundColor: 'var(--color-gray-800)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <p className="body-sm text-muted">Instagram</p>
                            </div>
                        ))}
                    </div>
                </Reveal>

                <Reveal delay={0.5} width="100%">
                    <p className="body-lg" style={{ marginBottom: 'var(--space-6)' }}>
                        @vizun
                    </p>

                    <Button variant="ghost">
                        Follow on Instagram →
                    </Button>
                </Reveal>
            </div>
        </section>
    );
};
