"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Eye, Heart } from "lucide-react";

interface ProductCardProps {
    product: {
        id: string;
        name: string;
        price: number;
        rating: number;
        reviews: number;
        images: string[];
        isNew?: boolean;
        isSale?: boolean;
    };
    onQuickView: (product: any) => void;
    priority?: boolean;
}

export default function ProductCard({ product, onQuickView, priority = false }: ProductCardProps) {
    // 3D Tilt Effect
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [-100, 100], [10, -10]);
    const rotateY = useTransform(x, [-100, 100], [-10, 10]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        x.set(e.clientX - centerX);
        y.set(e.clientY - centerY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="group relative bg-[#1C1C1C] rounded-md border border-transparent hover:border-luxury-gold/50 transition-all duration-300 hover:shadow-[0_20px_60px_rgba(212,175,55,0.15)] hover:-translate-y-2"
        >
            {/* Wishlist Button */}
            <button className="absolute top-3 right-3 z-20 text-luxury-silver hover:text-luxury-rose hover:scale-110 transition-all">
                <Heart className="w-5 h-5 hover:fill-current" />
            </button>

            {/* Badges */}
            <div className="absolute top-3 left-3 z-20 flex flex-col gap-1">
                {product.isNew && (
                    <span className="bg-luxury-gold text-black text-[10px] font-bold px-2 py-1 uppercase tracking-wider">New</span>
                )}
                {product.isSale && (
                    <span className="bg-luxury-rose text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider">Sale</span>
                )}
            </div>

            {/* Image Container */}
            <Link href={`/product/${product.id}`} className="block relative aspect-[3/4] overflow-hidden rounded-t-md bg-black">
                {/* Main Image */}
                <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    priority={priority}
                    className="object-cover transition-opacity duration-500 group-hover:opacity-0"
                    sizes="(max-width: 768px) 50vw, 33vw"
                />
                {/* Hover Image */}
                <Image
                    src={product.images[1] || product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100 scale-105 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, 33vw"
                />

                {/* Quick View Trigger - Slide Up */}
                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-10">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            onQuickView(product);
                        }}
                        className="w-full bg-linear-to-r from-luxury-rose to-luxury-gold text-white font-bold uppercase text-xs py-3 rounded shadow-lg hover:shadow-xl hover:brightness-110 flex items-center justify-center gap-2"
                    >
                        <Eye className="w-4 h-4" /> Quick View
                    </button>
                </div>
            </Link>

            {/* Info */}
            <div className="p-4">
                <h3 className="text-white font-heading font-medium text-lg mb-1 truncate group-hover:text-luxury-gold transition-colors">
                    {product.name}
                </h3>
                <div className="flex items-center justify-between">
                    <span className="text-luxury-rose font-sans font-bold">₹{product.price.toLocaleString()}</span>
                    <div className="flex items-center gap-1 text-xs text-luxury-silver">
                        <span className="text-luxury-gold">★</span> {product.rating} ({product.reviews})
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
