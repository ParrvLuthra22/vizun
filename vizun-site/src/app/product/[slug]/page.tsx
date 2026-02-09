'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

// Mock product data - will be replaced with CMS/API data
const product = {
    id: '1',
    name: 'Oversized Wool Coat',
    price: 520,
    remaining: 12,
    images: [
        '/products/detail-hero.jpg',
        '/products/detail-close.jpg',
        '/products/detail-lifestyle.jpg',
    ],
    story: 'Crafted from premium Italian wool, this oversized coat represents the intersection of modern streetwear and timeless tailoring. Each piece is cut and constructed by hand in our atelier.',
    fabric: '100% Italian Merino Wool',
    weight: '650gsm',
    fit: 'Oversized, drop shoulder silhouette',
    model: 'Model is 6\'1" wearing size M',
    care: 'Dry clean only',
};

export default function ProductDetailPage() {
    const [selectedImage, setSelectedImage] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

    return (
        <>
            <Header />
            <main ref={containerRef}>
                {/* Hero Image Section */}
                <section style={{
                    position: 'relative',
                    width: '100%',
                    height: '100vh',
                    overflow: 'hidden',
                    backgroundColor: 'var(--color-jet-black)',
                }}>
                    <motion.div
                        style={{
                            position: 'relative',
                            width: '100%',
                            height: '100%',
                            y: imageY,
                        }}
                    >
                        <Image
                            src={product.images[selectedImage]}
                            alt={product.name}
                            fill
                            style={{
                                objectFit: 'cover',
                                objectPosition: 'center',
                            }}
                            priority
                            quality={95}
                        />

                        {/* Gradient overlay for readability */}
                        <div style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: '40%',
                            background: 'linear-gradient(to top, rgba(10, 10, 10, 0.9) 0%, transparent 100%)',
                        }} />
                    </motion.div>

                    {/* Image thumbnails */}
                    <div style={{
                        position: 'absolute',
                        bottom: 'var(--space-8)',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        display: 'flex',
                        gap: 'var(--space-4)',
                        zIndex: 2,
                    }}>
                        {product.images.map((_, index) => (
                            <motion.button
                                key={index}
                                onClick={() => setSelectedImage(index)}
                                whileHover={{ scale: 1.1 }}
                                style={{
                                    width: '12px',
                                    height: '12px',
                                    borderRadius: '50%',
                                    backgroundColor: selectedImage === index
                                        ? 'var(--color-amber)'
                                        : 'var(--color-off-white-faint)',
                                    border: 'none',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.3s ease',
                                }}
                            />
                        ))}
                    </div>
                </section>

                {/* Product Info Section */}
                <section className="section section-primary">
                    <div className="container-narrow">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        >
                            {/* Stock Scarcity */}
                            <p className="label-base text-luxury" style={{ marginBottom: 'var(--space-4)' }}>
                                ONLY {product.remaining} REMAINING
                            </p>

                            <h1 className="headline-1" style={{ marginBottom: 'var(--space-6)' }}>
                                {product.name}
                            </h1>

                            <p className="headline-3" style={{
                                marginBottom: 'var(--space-12)',
                                color: 'var(--color-off-white-subtle)',
                            }}>
                                ${product.price}
                            </p>

                            {/* CTA */}
                            <Button
                                variant="primary"
                                size="lg"
                                style={{
                                    width: '100%',
                                    marginBottom: 'var(--space-16)',
                                }}
                            >
                                ADD TO CART
                            </Button>
                        </motion.div>

                        {/* Product Story */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            style={{ marginBottom: 'var(--space-16)' }}
                        >
                            <p className="label-lg" style={{ marginBottom: 'var(--space-6)' }}>
                                THE STORY
                            </p>

                            <p className="body-xl" style={{
                                lineHeight: 1.8,
                                color: 'var(--color-off-white-subtle)',
                            }}>
                                {product.story}
                            </p>
                        </motion.div>

                        {/* Fit & Fabric Details */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                gap: 'var(--space-8)',
                                marginBottom: 'var(--space-16)',
                            }}
                        >
                            <div>
                                <p className="label-base text-luxury" style={{ marginBottom: 'var(--space-3)' }}>
                                    FABRIC
                                </p>
                                <p className="body-base">{product.fabric}</p>
                                <p className="body-sm text-muted">{product.weight}</p>
                            </div>

                            <div>
                                <p className="label-base text-luxury" style={{ marginBottom: 'var(--space-3)' }}>
                                    FIT
                                </p>
                                <p className="body-base">{product.fit}</p>
                            </div>

                            <div>
                                <p className="label-base text-luxury" style={{ marginBottom: 'var(--space-3)' }}>
                                    CARE
                                </p>
                                <p className="body-base">{product.care}</p>
                            </div>
                        </motion.div>

                        {/* Model Info */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <p className="body-sm text-muted" style={{
                                paddingTop: 'var(--space-8)',
                                borderTop: '1px solid var(--border-subtle)',
                            }}>
                                {product.model}
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Full-width Detail Image */}
                <motion.section
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-200px" }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        position: 'relative',
                        width: '100%',
                        height: '80vh',
                        backgroundColor: 'var(--color-gray-900)',
                    }}
                >
                    <Image
                        src={product.images[1]}
                        alt="Detail shot"
                        fill
                        style={{
                            objectFit: 'cover',
                        }}
                        quality={95}
                    />
                </motion.section>

                {/* Craftsmanship Section */}
                <section className="section section-secondary">
                    <div className="container-narrow">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            style={{ textAlign: 'center' }}
                        >
                            <p className="label-lg text-luxury" style={{ marginBottom: 'var(--space-6)' }}>
                                CRAFTSMANSHIP
                            </p>

                            <h2 className="headline-2" style={{ marginBottom: 'var(--space-8)' }}>
                                Made to Last
                            </h2>

                            <p className="body-lg" style={{
                                maxWidth: '600px',
                                margin: '0 auto var(--space-12)',
                                lineHeight: 1.8,
                                color: 'var(--color-off-white-subtle)',
                            }}>
                                Each garment is constructed by hand in our atelier, using techniques
                                passed down through generations of master tailors. We believe in creating
                                pieces that improve with age.
                            </p>

                            <Button variant="secondary">
                                LEARN OUR PROCESS
                            </Button>
                        </motion.div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="section section-primary">
                    <div className="container-narrow" style={{ textAlign: 'center' }}>
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <p className="body-base text-luxury" style={{ marginBottom: 'var(--space-8)' }}>
                                Limited to {product.remaining} pieces
                            </p>

                            <Button
                                variant="accent"
                                size="lg"
                                style={{ minWidth: '300px' }}
                            >
                                ADD TO CART — ${product.price}
                            </Button>
                        </motion.div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
