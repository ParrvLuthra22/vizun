'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { Button } from '@/components/ui/Button';

interface EditorialCardProps {
    id: string;
    name: string;
    price: number;
    image: string;
    remaining?: number;
    slug: string;
    aspectRatio?: 'portrait' | 'square' | 'landscape';
    className?: string;
}

export const EditorialCard: React.FC<EditorialCardProps> = ({
    name,
    price,
    image,
    remaining,
    slug,
    aspectRatio = 'portrait',
    className = ''
}) => {
    const ref = useRef<HTMLDivElement>(null);

    // 3D Tilt Logic
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 50, damping: 20 });
    const mouseY = useSpring(y, { stiffness: 50, damping: 20 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["5deg", "-5deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-5deg", "5deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXPos = e.clientX - rect.left;
        const mouseYPos = e.clientY - rect.top;

        const xPct = mouseXPos / width - 0.5;
        const yPct = mouseYPos / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <Link href={`/product/${slug}`} className={`block group perspective-[1000px] ${className}`}>
            <motion.div
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="relative w-full h-full cursor-pointer"
            >
                {/* Image Container - Aggressive Scale */}
                <div className={`relative w-full overflow-hidden bg-[var(--color-jet-black)] mb-6 ${aspectRatio === 'portrait' ? 'aspect-[3/4]' :
                        aspectRatio === 'square' ? 'aspect-square' : 'aspect-[4/3]'
                    }`}>
                    <motion.div
                        className="w-full h-full relative"
                        whileHover={{ scale: 1.15 }} // Aggressive zoom
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <Image
                            src={image}
                            alt={name}
                            fill
                            className="object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        {/* Glitch/Noise Overlay */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-[var(--color-alert-red)] mix-blend-color-burn" />
                    </motion.div>

                    {/* Floating Stock Tag - 3D Lift */}
                    {remaining && remaining < 20 && (
                        <div
                            className="absolute top-4 right-4 bg-[var(--color-alert-red)] text-white px-3 py-1 text-xs font-bold uppercase tracking-widest z-20"
                            style={{ transform: "translateZ(20px)" }} // Physical lift
                        >
                            {remaining} LEFT
                        </div>
                    )}
                </div>

                {/* Editorial Details - Text Displacement */}
                <div className="flex flex-col items-start relative z-10 mix-blend-difference text-[var(--color-off-white)]">
                    <motion.h3
                        initial={{ x: 0 }}
                        whileHover={{ x: 10 }} // Text shifts on hover
                        className="text-3xl font-bold uppercase tracking-tighter leading-none mb-2"
                    >
                        {name}
                    </motion.h3>

                    <div className="flex justify-between w-full border-t border-[var(--color-off-white)] pt-2 opacity-80 group-hover:opacity-100 transition-opacity">
                        <span className="font-mono text-sm uppercase tracking-wider">REF. {slug.substring(0, 6).toUpperCase()}</span>
                        <span className="text-xl font-bold">${price}</span>
                    </div>
                </div>

            </motion.div>
        </Link>
    );
};
