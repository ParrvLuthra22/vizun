"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, Minus, Plus, ShoppingBag, ChevronLeft, ChevronRight, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

interface Product {
    id: string;
    name: string;
    price: number;
    rating: number;
    reviews: number;
    description: string;
    images: string[];
    sizes: string[];
}

interface QuickViewModalProps {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
    const { addToCart } = useCart();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [isAdding, setIsAdding] = useState(false);
    const [isAdded, setIsAdded] = useState(false);

    // Reset state when product changes
    useEffect(() => {
        if (product) {
            setCurrentImageIndex(0);
            setSelectedSize(null);
            setQuantity(1);
            setIsAdded(false);
        }
    }, [product]);

    // Lock body scroll
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isOpen]);

    if (!product) return null;

    const handleAddToCart = () => {
        if (!selectedSize) return;

        setIsAdding(true);
        setTimeout(() => {
            addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.images[0],
                size: selectedSize,
                quantity: quantity,
            });
            setIsAdding(false);
            setIsAdded(true);
            setTimeout(() => setIsAdded(false), 2000);
        }, 800);
    };

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/85 backdrop-blur-md z-[60]"
                    />

                    {/* Modal Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30 }}
                        onClick={(e) => e.stopPropagation()}
                        className="fixed z-[70] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] md:w-[900px] bg-[#1C1C1C] border border-luxury-gold/30 rounded-lg shadow-[0_20px_80px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col md:flex-row max-h-[85vh] md:max-h-auto"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-20 text-gray-400 hover:text-luxury-rose hover:rotate-90 transition-all duration-300 bg-black/20 p-2 rounded-full backdrop-blur-sm"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Left: Gallery */}
                        <div className="w-full md:w-1/2 relative bg-black flex flex-col justify-center group h-[400px] md:h-[550px]">
                            <div className="relative w-full h-full">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentImageIndex}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="absolute inset-0"
                                    >
                                        <Image
                                            src={product.images[currentImageIndex]}
                                            alt={product.name}
                                            fill
                                            className="object-cover md:object-contain"
                                            sizes="(max-width: 768px) 100vw, 450px"
                                        />
                                    </motion.div>
                                </AnimatePresence>

                                {/* Navigation Arrows */}
                                <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-luxury-gold hover:text-black">
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-luxury-gold hover:text-black">
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Thumbnails */}
                            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                                {product.images.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentImageIndex(idx)}
                                        className={cn(
                                            "w-2 h-2 rounded-full transition-all duration-300",
                                            currentImageIndex === idx ? "bg-luxury-gold w-3 scale-125" : "bg-white/30 hover:bg-white/60"
                                        )}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Right: Info */}
                        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col overflow-y-auto">
                            <div className="mb-1">
                                <h2 className="font-heading font-bold text-2xl md:text-3xl text-white tracking-tight">{product.name}</h2>
                            </div>

                            <div className="flex items-center gap-4 mb-4">
                                <span className="font-bold text-2xl text-luxury-rose">₹{product.price.toLocaleString()}</span>
                                <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 fill-luxury-gold text-luxury-gold" />
                                    <span className="text-white font-medium">{product.rating}</span>
                                    <span className="text-gray-500 text-sm">({product.reviews})</span>
                                </div>
                            </div>

                            <p className="text-gray-300 text-sm leading-relaxed mb-6 opacity-80 border-b border-white/10 pb-6">
                                {product.description}
                            </p>

                            {/* Selectors */}
                            <div className="space-y-6 mb-8">
                                {/* Size */}
                                <div>
                                    <span className="text-xs font-bold text-luxury-silver uppercase tracking-widest block mb-3">Size</span>
                                    <div className="flex gap-3 flex-wrap">
                                        {product.sizes.map(size => (
                                            <button
                                                key={size}
                                                onClick={() => setSelectedSize(size)}
                                                className={cn(
                                                    "w-10 h-10 rounded-full border text-sm font-medium transition-all duration-200",
                                                    selectedSize === size
                                                        ? "bg-luxury-rose border-luxury-rose text-white shadow-[0_0_10px_rgba(183,110,121,0.4)]"
                                                        : "border-white/20 text-gray-400 hover:border-luxury-gold hover:text-white"
                                                )}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Quantity */}
                                <div>
                                    <span className="text-xs font-bold text-luxury-silver uppercase tracking-widest block mb-3">Quantity</span>
                                    <div className="flex items-center bg-[#2A2A2A] border border-white/10 rounded w-32 justify-between">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="p-2 text-gray-400 hover:text-white transition-colors"
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="font-semibold text-white text-sm">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(quantity + 1)}
                                            className="p-2 text-gray-400 hover:text-white transition-colors"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="mt-auto space-y-3">
                                <button
                                    onClick={handleAddToCart}
                                    disabled={!selectedSize || isAdding}
                                    className={cn(
                                        "w-full py-3.5 bg-luxury-gold text-black font-bold uppercase tracking-wide rounded transition-all flex items-center justify-center gap-2",
                                        !selectedSize ? "opacity-50 cursor-not-allowed" : "hover:brightness-110 hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:scale-[1.02]"
                                    )}
                                >
                                    {isAdding ? "Adding..." : isAdded ? (
                                        <>
                                            <Check className="w-5 h-5" /> Added
                                        </>
                                    ) : (
                                        <>
                                            <ShoppingBag className="w-5 h-5" /> Add to Cart
                                        </>
                                    )}
                                </button>

                                <Link
                                    href={`/product/${product.id}`}
                                    onClick={onClose}
                                    className="block w-full text-center py-3 border border-luxury-gold/50 text-luxury-rose font-medium text-sm hover:bg-luxury-gold/5 transition-colors"
                                >
                                    VIEW FULL DETAILS →
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
