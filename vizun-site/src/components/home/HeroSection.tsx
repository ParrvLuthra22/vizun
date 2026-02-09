'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';

export const HeroSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Parallax effect for image
    const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
    const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

    // Text reveal animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12,
                delayChildren: 0.3,
            }
        }
    };

    const wordVariants = {
        hidden: {
            opacity: 0,
            y: 50,
            rotateX: -90,
        },
        visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: {
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1], // Luxury easing
            }
        }
    };

    const lineVariants = {
        hidden: {
            opacity: 0,
            y: 30,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                ease: [0.16, 1, 0.3, 1],
            }
        }
    };

    const ctaVariants = {
        hidden: {
            opacity: 0,
            scale: 0.9,
        },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.8,
                delay: 1.5,
                ease: [0.16, 1, 0.3, 1],
            }
        }
    };

    return (
        <section
            ref={containerRef}
            style={{
                position: 'relative',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                overflow: 'hidden',
                backgroundColor: 'var(--color-jet-black)',
            }}
        >
            {/* Background gradient overlay */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(circle at 30% 50%, rgba(0, 102, 255, 0.15) 0%, transparent 50%)',
                pointerEvents: 'none',
            }} />

            {/* Product Image with Parallax */}
            <motion.div
                style={{
                    position: 'absolute',
                    right: '-10%',
                    top: '50%',
                    y: imageY,
                    scale: imageScale,
                    width: '50%',
                    height: '120%',
                    marginTop: '-60%',
                }}
            >
                <div style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    opacity: 0.4,
                    mixBlendMode: 'luminosity',
                }}>
                    <Image
                        src="/hero-product.jpg"
                        alt="VIZUN Collection"
                        fill
                        style={{
                            objectFit: 'cover',
                            objectPosition: 'center',
                        }}
                        priority
                        quality={90}
                    />

                    {/* Gradient mask for artistic crop */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to right, var(--color-jet-black) 0%, transparent 40%, transparent 60%, var(--color-jet-black) 100%)',
                    }} />
                </div>
            </motion.div>

            {/* Content */}
            <div className="container" style={{
                position: 'relative',
                zIndex: 2,
                paddingTop: 'var(--space-32)',
                paddingBottom: 'var(--space-32)',
            }}>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    style={{
                        maxWidth: '900px',
                    }}
                >
                    {/* Season Label */}
                    <motion.div variants={lineVariants}>
                        <p className="label-lg" style={{
                            marginBottom: 'var(--space-8)',
                            color: 'var(--color-amber)',
                            letterSpacing: '0.15em',
                        }}>
                            SPRING/SUMMER 2026
                        </p>
                    </motion.div>

                    {/* Headline with word-by-word reveal */}
                    <div style={{
                        marginBottom: 'var(--space-8)',
                        perspective: '1000px',
                    }}>
                        <motion.h1
                            className="headline-hero"
                            style={{
                                fontSize: 'clamp(4rem, 12vw, 10rem)',
                                lineHeight: 0.9,
                                letterSpacing: '-0.04em',
                                marginBottom: 0,
                            }}
                        >
                            <div style={{ overflow: 'hidden', marginBottom: 'var(--space-4)' }}>
                                <motion.span
                                    variants={wordVariants}
                                    style={{ display: 'inline-block' }}
                                >
                                    QUIET
                                </motion.span>
                            </div>
                            <div style={{ overflow: 'hidden', marginBottom: 'var(--space-4)' }}>
                                <motion.span
                                    variants={wordVariants}
                                    style={{ display: 'inline-block' }}
                                >
                                    LUXURY
                                </motion.span>
                            </div>
                            <div style={{ overflow: 'hidden' }}>
                                <motion.span
                                    variants={wordVariants}
                                    style={{
                                        display: 'inline-block',
                                        color: 'var(--color-off-white-subtle)',
                                    }}
                                >
                                    REDEFINED
                                </motion.span>
                            </div>
                        </motion.h1>
                    </div>

                    {/* Subtext */}
                    <motion.div variants={lineVariants}>
                        <p className="body-xl" style={{
                            marginBottom: 'var(--space-12)',
                            maxWidth: '500px',
                            color: 'var(--color-off-white-subtle)',
                            lineHeight: 1.6,
                        }}>
                            Precision tailoring meets modern streetwear.
                            Limited to 100 pieces.
                        </p>
                    </motion.div>

                    {/* CTA */}
                    <motion.div variants={ctaVariants}>
                        <Button
                            variant="primary"
                            size="lg"
                            style={{
                                padding: 'var(--space-5) var(--space-16)',
                                fontSize: 'var(--text-base)',
                                letterSpacing: '0.1em',
                            }}
                        >
                            EXPLORE COLLECTION
                        </Button>
                    </motion.div>

                    {/* Scroll Indicator */}
                    <motion.div
                        variants={ctaVariants}
                        style={{
                            position: 'absolute',
                            bottom: 'var(--space-12)',
                            left: 0,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--space-4)',
                        }}
                    >
                        <motion.div
                            animate={{
                                y: [0, 10, 0],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            style={{
                                width: '1px',
                                height: '40px',
                                backgroundColor: 'var(--color-off-white-faint)',
                            }}
                        />
                        <p className="body-sm" style={{
                            color: 'var(--color-off-white-faint)',
                            letterSpacing: '0.1em',
                        }}>
                            SCROLL
                        </p>
                    </motion.div>
                </motion.div>
            </div>

            {/* Ambient light effect */}
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '200px',
                background: 'linear-gradient(to top, var(--color-electric-blue-subtle) 0%, transparent 100%)',
                pointerEvents: 'none',
            }} />
        </section>
    );
};
