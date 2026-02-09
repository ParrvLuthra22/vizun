'use client';

import { Button } from '@/components/ui/Button';

export const HeroSection = () => {
    return (
        <section className="section-hero">
            <div className="container" style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                minHeight: '100vh',
            }}>
                <p className="label-lg text-secondary" style={{ marginBottom: 'var(--space-6)' }}>
                    SPRING/SUMMER 2026
                </p>

                <h1 className="headline-hero" style={{ marginBottom: 'var(--space-6)' }}>
                    VIZUN
                </h1>

                <p className="body-xl" style={{
                    marginBottom: 'var(--space-10)',
                    maxWidth: '600px',
                }}>
                    Quiet luxury for the modern man
                </p>

                <Button variant="primary" size="lg">
                    Shop Current Drop
                </Button>

                <div style={{
                    marginTop: 'var(--space-16)',
                    color: 'var(--color-off-white-subtle)',
                }}>
                    <p className="body-sm">↓ Scroll to explore</p>
                </div>
            </div>
        </section>
    );
};
