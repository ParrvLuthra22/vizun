"use client";

import React, { useState, useEffect } from "react";
import Container from "@/components/ui/Container";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ReviewsSection from "@/components/product/ReviewsSection";
import FeaturedDrops from "@/components/home/FeaturedDrops"; // Re-using as "Related Products"
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Dummy Product Data
const product = {
    id: "prod-1",
    name: "Oversized Bomber Jacket",
    price: 5999,
    originalPrice: 8999,
    rating: 4.8,
    reviews: 47,
    images: [
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=2836&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1551028919-ac38b9a302b0?q=80&w=2789&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1545594861-3bef43ff22c7?q=80&w=2942&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=2787&auto=format&fit=crop"
    ]
};

export default function ProductPage({ params }: { params: { id: string } }) {
    const [showStickyBar, setShowStickyBar] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 800) {
                setShowStickyBar(true);
            } else {
                setShowStickyBar(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="bg-luxury-black min-h-screen pt-24 pb-20 relative">
            <Container>
                {/* Main Product Section */}
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 mb-20">
                    {/* Left: Gallery (60%) */}
                    <div className="lg:w-[60%]">
                        <ProductGallery images={product.images} />
                    </div>

                    {/* Right: Info (40%) */}
                    <div className="lg:w-[40%]">
                        <ProductInfo {...product} />
                    </div>
                </div>

                {/* Reviews */}
                <ReviewsSection />

                {/* Related Products */}
                <div className="mt-20 border-t border-white/10 pt-16">
                    <h3 className="font-heading font-bold text-2xl text-white mb-8">COMPLETE THE LOOK</h3>
                    {/* Re-using FeaturedDrops for demo purposes, logically would be a different component */}
                    <div className="opacity-80 scale-90 origin-top-left pointer-events-none filter grayscale">
                        <p className="text-gray-500 mb-4">[Placeholder for Related Products Carousel]</p>
                        {/* <FeaturedDrops /> - Too heavy to re-render here without modification */}
                    </div>
                </div>
            </Container>

            {/* Sticky Add To Cart Bar */}
            <AnimatePresence>
                {showStickyBar && (
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ duration: 0.3 }}
                        className="fixed bottom-0 left-0 right-0 bg-luxury-black/90 backdrop-blur-md border-t border-white/10 p-4 z-40 hidden md:block"
                    >
                        <Container>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="relative w-12 h-16 rounded overflow-hidden">
                                        <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold">{product.name}</h4>
                                        <span className="text-luxury-rose font-semibold">₹{product.price.toLocaleString()}</span>
                                    </div>
                                </div>
                                <button className="bg-luxury-gold text-black font-bold uppercase px-8 py-3 rounded hover:bg-white transition-colors">
                                    Add to Cart
                                </button>
                            </div>
                        </Container>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
