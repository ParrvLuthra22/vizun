'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { durations, easings } from '@/lib/motion';

interface ProductCardProps {
    id: string;
    name: string;
    price: number;
    image: string;
    remaining?: number;
    slug: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
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
                className="relative cursor-pointer group"
                whileHover={{ y: -8 }}
                transition={{ duration: durations.fast, ease: easings.aggressive }}
            >
                {/* Image Container - Sharp Edges */}
                <div className="relative w-full aspect-[3/4] overflow-hidden bg-[var(--color-gray-900)] mb-4 ring-1 ring-transparent group-hover:ring-[var(--color-alert-red)] transition-all duration-300">
                    <motion.div
                        animate={{
                            scale: isHovered ? 1.1 : 1,
                        }}
                        transition={{ duration: durations.medium, ease: easings.aggressive }}
                        className="w-full h-full relative"
                    >
                        <Image
                            src={image}
                            alt={name}
                            fill
                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        {/* Glitch Overlay on Hover (Simulated with opacity) */}
                        <div className={`absolute inset-0 bg-[var(--color-alert-red)] mix-blend-color opacity-0 ${isHovered ? 'opacity-20' : ''} transition-opacity duration-100`} />
                    </motion.div>

                    {/* Limited Stock Indicator - Hard Tag */}
                    {remaining && remaining < 20 && (
                        <div className="absolute top-0 right-0 bg-[var(--color-alert-red)] text-white px-3 py-1 text-xs font-bold uppercase tracking-widest">
                            {remaining} LEFT
                        </div>
                    )}
                </div>

                {/* Product Info - Aggressive Type */}
                <div className="flex flex-col gap-1">
                    <h3 className="text-2xl font-bold uppercase tracking-tighter leading-none group-hover:text-[var(--color-alert-red)] transition-colors">
                        {name}
                    </h3>

                    <p className="text-lg font-bold text-[var(--color-gray-500)] group-hover:text-[var(--color-jet-black)] transition-colors">
                        ${price}
                    </p>
                </div>
            </motion.div>
        </Link>
    );
};
