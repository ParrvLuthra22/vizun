"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ShoppingBag, Zap, Ruler, Minus, Plus, Heart, Share2, Check } from "lucide-react";
import Link from "next/link";
import AccordionItem from "../ui/AccordionItem";
import { cn } from "@/lib/utils";

interface ProductInfoProps {
    name: string;
    price: number;
    originalPrice?: number;
    rating: number;
    reviews: number;
}

const sizes = ["S", "M", "L", "XL", "XXL"];

import { useCart } from "@/context/CartContext";

export default function ProductInfo({ name, price, originalPrice, rating, reviews }: ProductInfoProps) {
    const { addToCart } = useCart();
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [isAdding, setIsAdding] = useState(false);
    const [isAdded, setIsAdded] = useState(false);
    const [isWishlisted, setIsWishlisted] = useState(false);

    const handleAddToCart = () => {
        if (!selectedSize) return; // Should show error/shake animation

        setIsAdding(true);

        // Simulate animation delay
        setTimeout(() => {
            addToCart({
                id: "prod-1", // hardcoded for demo
                name,
                price,
                image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=2836&auto=format&fit=crop", // hardcoded for demo
                size: selectedSize,
                color: "Black",
                quantity: quantity
            });
            setIsAdding(false);
            setIsAdded(true);
            setTimeout(() => setIsAdded(false), 2000);
        }, 1200);
    };

    return (
        <div className="flex flex-col h-full">
            {/* Header Actions */}
            <div className="flex justify-between items-start mb-6">
                <Link href="/shop" className="text-gray-400 hover:text-luxury-rose transition-colors flex items-center gap-2 group">
                    <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Shop
                </Link>
                <div className="flex gap-4">
                    <button onClick={() => setIsWishlisted(!isWishlisted)} className="text-gray-400 hover:text-luxury-rose transition-colors">
                        <Heart className={cn("w-6 h-6", isWishlisted && "fill-luxury-rose text-luxury-rose")} />
                    </button>
                    <button className="text-gray-400 hover:text-luxury-gold transition-colors">
                        <Share2 className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Product Header */}
            <h1 className="font-heading font-bold text-4xl md:text-5xl text-white mb-2 tracking-tight">{name}</h1>

            <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1 text-luxury-gold">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className={cn("w-4 h-4", i < Math.floor(rating) ? "fill-current" : "text-gray-600")} />
                    ))}
                </div>
                <span className="text-gray-400 text-sm hover:underline cursor-pointer">({reviews} reviews)</span>
                <span className="text-luxury-silver text-sm">|</span>
                <span className="text-green-400 text-sm font-medium">✓ In Stock</span>
            </div>

            {/* Price */}
            <div className="flex items-end gap-4 mb-8">
                <span className="font-sans font-bold text-4xl text-luxury-rose">₹{price.toLocaleString()}</span>
                {originalPrice && (
                    <span className="text-xl text-gray-500 line-through mb-1">₹{originalPrice.toLocaleString()}</span>
                )}
                {originalPrice && (
                    <div className="bg-luxury-gold text-black text-xs font-bold px-2 py-1 uppercase tracking-widest mb-2">
                        {Math.round(((originalPrice - price) / originalPrice) * 100)}% OFF
                    </div>
                )}
            </div>

            {/* Description */}
            <p className="text-gray-300 leading-relaxed mb-8 opacity-90 font-light">
                Meticulously engineered for the urban vanguard. This piece features our signature tech-fleece blend, offering unparalleled comfort and a futuristic silhouette. Designed to move with you through the neon-lit streets.
            </p>

            {/* Size Selector */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-semibold text-luxury-silver tracking-widest">SELECT SIZE</span>
                    <button className="flex items-center gap-2 text-luxury-rose text-sm hover:text-white transition-colors">
                        <Ruler className="w-4 h-4" /> Size Guide
                    </button>
                </div>
                <div className="flex gap-3 flex-wrap">
                    {sizes.map(size => (
                        <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={cn(
                                "w-12 h-12 rounded-full border flex items-center justify-center font-medium transition-all duration-300",
                                selectedSize === size
                                    ? "bg-luxury-rose border-luxury-rose text-white shadow-[0_0_15px_rgba(183,110,121,0.5)] scale-110"
                                    : "bg-luxury-charcoal border-white/10 text-gray-400 hover:border-luxury-gold hover:text-white"
                            )}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>

            {/* Quantity & Actions */}
            <div className="flex flex-col gap-4 mb-10">
                <div className="flex gap-4 h-14">
                    {/* Quantity */}
                    <div className="flex items-center bg-luxury-charcoal border border-white/10 rounded px-2 w-32 justify-between">
                        <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="p-2 text-gray-400 hover:text-white transition-colors"
                        >
                            <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-semibold text-white">{quantity}</span>
                        <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="p-2 text-gray-400 hover:text-white transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Add to Cart */}
                    <button
                        onClick={handleAddToCart}
                        disabled={isAdding || isAdded}
                        className={cn(
                            "flex-1 flex items-center justify-center gap-2 font-bold uppercase tracking-wide transition-all duration-300 rounded overflow-hidden relative",
                            isAdded ? "bg-green-500 text-white" : "bg-luxury-gold text-black hover:bg-white hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:scale-[1.02]"
                        )}
                    >
                        <AnimatePresence mode="wait">
                            {isAdding ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex items-center gap-2"
                                >
                                    <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                    Adding...
                                </motion.div>
                            ) : isAdded ? (
                                <motion.div
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.5, opacity: 0 }}
                                    className="flex items-center gap-2"
                                >
                                    <Check className="w-5 h-5" /> Added
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex items-center gap-2"
                                >
                                    <ShoppingBag className="w-5 h-5" /> Add to Cart
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </button>
                </div>

                {/* Buy Now */}
                <button className="w-full h-14 bg-gradient-to-r from-luxury-rose to-luxury-gold text-white font-bold uppercase tracking-wide rounded hover:brightness-110 transition-all shadow-lg flex items-center justify-center gap-2">
                    <Zap className="w-5 h-5 fill-white" /> Buy Now
                </button>
            </div>

            {/* Accordions */}
            <div className="mt-8">
                <AccordionItem title="Product Details" defaultOpen>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Premium heavyweight cotton blend</li>
                        <li>Oversized, boxy fit</li>
                        <li>Ribbed crewneck and cuffs</li>
                        <li>Signature gold metal tag on hem</li>
                    </ul>
                </AccordionItem>
                <AccordionItem title="Fabric & Care">
                    <p>100% Cotton. Machine wash cold with like colors. Do not bleach. Tumble dry low. Cool iron if needed.</p>
                </AccordionItem>
                <AccordionItem title="Shipping & Returns">
                    <p>Free shipping on orders over ₹999. Easy 7-day returns for all unworn items with original tags.</p>
                </AccordionItem>
            </div>
        </div>
    );
}
