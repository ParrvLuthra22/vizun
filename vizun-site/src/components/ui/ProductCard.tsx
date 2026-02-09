'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface ProductCardProps {
    id: string;
    name: string;
    price: number;
    image: string;
    remaining?: number;
    slug: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
    id,
    name,
    price,
    image,
    remaining,
    slug,
}) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link href={`/product/${slug}`}>
            <motion.div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                    position: 'relative',
                    cursor: 'pointer',
                }}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
                {/* Image Container */}
                <div style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '3/4',
                    overflow: 'hidden',
                    backgroundColor: 'var(--color-gray-900)',
                    marginBottom: 'var(--space-4)',
                }}>
                    <motion.div
                        animate={{
                            scale: isHovered ? 1.08 : 1,
                        }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                            width: '100%',
                            height: '100%',
                            position: 'relative',
                        }}
                    >
                        <Image
                            src={image}
                            alt={name}
                            fill
                            style={{
                                objectFit: 'cover',
                            }}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </motion.div>

                    {/* Limited Stock Indicator */}
                    {remaining && remaining < 20 && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            style={{
                                position: 'absolute',
                                top: 'var(--space-4)',
                                right: 'var(--space-4)',
                                padding: 'var(--space-2) var(--space-4)',
                                backgroundColor: 'rgba(10, 10, 10, 0.9)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid var(--border-subtle)',
                            }}
                        >
                            <p className="body-xs text-luxury">
                                Only {remaining} left
                            </p>
                        </motion.div>
                    )}
                </div>

                {/* Product Info */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--space-2)',
                }}>
                    <motion.h3
                        className="headline-4"
                        animate={{
                            color: isHovered ? 'var(--color-amber)' : 'var(--color-off-white)',
                        }}
                        transition={{ duration: 0.3 }}
                        style={{
                            fontSize: 'var(--text-2xl)',
                            margin: 0,
                        }}
                    >
                        {name}
                    </motion.h3>

                    <motion.p
                        className="body-lg"
                        animate={{
                            opacity: isHovered ? 0.7 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                        style={{
                            color: 'var(--color-off-white-subtle)',
                        }}
                    >
                        ${price}
                    </motion.p>
                </div>

                {/* Hover Underline */}
                <motion.div
                    style={{
                        height: '1px',
                        backgroundColor: 'var(--color-amber)',
                        marginTop: 'var(--space-3)',
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: isHovered ? '100%' : 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />
            </motion.div>
        </Link>
    );
};
