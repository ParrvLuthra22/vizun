"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Eye, Star } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ProductCardProps {
    id: string;
    name: string;
    price: number;
    image1: string;
    image2: string;
    rating: number;
    reviews: number;
    isNew?: boolean;
    isSale?: boolean;
}

export default function ProductCard({
    id,
    name,
    price,
    image1,
    image2,
    rating,
    reviews,
    isNew,
    isSale,
}: ProductCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [isWishlisted, setIsWishlisted] = useState(false);

    return (
        <div
            className="group relative bg-[#1C1C1C] rounded w-full cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(212,175,55,0.15)] hover:border-luxury-gold border border-transparent"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Image Container */}
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-t bg-luxury-black">
                {/* Badges */}
                <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
                    {isNew && (
                        <span className="bg-luxury-gold text-black text-[10px] font-bold px-2 py-1 uppercase tracking-widest shadow-md">
                            New
                        </span>
                    )}
                    {isSale && (
                        <span className="bg-luxury-rose text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest shadow-md">
                            Sale
                        </span>
                    )}
                </div>

                {/* Wishlist Button */}
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        setIsWishlisted(!isWishlisted);
                    }}
                    className="absolute top-3 right-3 z-30 p-2 text-white/70 hover:text-luxury-rose transition-colors"
                >
                    <Heart
                        className={cn(
                            "w-5 h-5 transition-all duration-300",
                            isWishlisted ? "fill-luxury-rose text-luxury-rose scale-110" : "hover:scale-110"
                        )}
                    />
                </button>

                {/* Images */}
                <Link href={`/product/${id}`} className="block h-full w-full relative">
                    <Image
                        src={image1}
                        alt={name}
                        fill
                        className="object-cover transition-opacity duration-500 ease-in-out z-10"
                        style={{ opacity: isHovered ? 0 : 1 }}
                    />
                    <Image
                        src={image2}
                        alt={name}
                        fill
                        className="object-cover transition-transform duration-700 ease-in-out z-0"
                        style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
                    />
                </Link>

                {/* Quick View Button (Slide Up) */}
                <div className="absolute bottom-0 left-0 right-0 z-20 overflow-hidden">
                    <motion.button
                        initial={{ y: "100%" }}
                        animate={{ y: isHovered ? "0%" : "100%" }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="w-full bg-gradient-to-r from-luxury-rose to-luxury-gold text-white font-semibold py-3 flex items-center justify-center gap-2 text-sm uppercase tracking-wide hover:brightness-110"
                    >
                        <Eye className="w-4 h-4" />
                        Quick View
                    </motion.button>
                </div>
            </div>

            {/* Product Info */}
            <div className="p-4">
                <div className="flex items-start justify-between mb-1">
                    <h3 className="text-white font-heading font-medium text-lg truncate pr-2 group-hover:text-luxury-gold transition-colors">
                        {name}
                    </h3>
                </div>

                <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center text-luxury-gold">
                        <Star className="w-3 h-3 fill-current" />
                        <Star className="w-3 h-3 fill-current" />
                        <Star className="w-3 h-3 fill-current" />
                        <Star className="w-3 h-3 fill-current" />
                        <Star className="w-3 h-3 fill-current" />
                    </div>
                    <span className="text-xs text-luxury-silver">({reviews})</span>
                </div>

                <p className="text-luxury-rose font-semibold font-sans">
                    ₹{price.toLocaleString()}
                </p>
            </div>
        </div>
    );
}
