"use client";

import React, { useState } from "react";
import Container from "@/components/ui/Container";
import ProductCard from "@/components/product/ProductCard";
import QuickViewModal from "@/components/product/QuickViewModal";
import FilterSidebar from "@/components/shop/FilterSidebar"; // Assuming this exists or I'll create a placeholder
import { AnimatePresence, motion } from "framer-motion";

// Dummy Data
const products = [
    {
        id: "prod-1",
        name: "Oversized Bomber Jacket",
        price: 5999,
        rating: 4.8,
        reviews: 47,
        images: [
            "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=2836&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1551028919-ac38b9a302b0?q=80&w=2789&auto=format&fit=crop",
        ],
        isNew: true,
        description: "Meticulously engineered for the urban vanguard. This piece features our signature tech-fleece blend.",
        sizes: ["S", "M", "L", "XL"],
    },
    {
        id: "prod-2",
        name: "Cyberpunk Cargo Pants",
        price: 4499,
        rating: 4.6,
        reviews: 32,
        images: [
            "https://images.unsplash.com/photo-1552160753-f17c5a2d7d8c?q=80&w=100&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=2787&auto=format&fit=crop",
        ],
        isSale: true,
        description: "Functional utility meets high-street fashion. Multiple pockets and adjustable straps for a custom fit.",
        sizes: ["30", "32", "34", "36"],
    },
    {
        id: "prod-3",
        name: "Neon Tech Hoodie",
        price: 3999,
        rating: 4.9,
        reviews: 88,
        images: [
            "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1578932750294-f5075e142056?q=80&w=200&auto=format&fit=crop",
        ],
        description: "Glow in the dark accents on our premium heavyweight cotton hoodie. Stand out in the underground.",
        sizes: ["S", "M", "L", "XL", "XXL"],
    },
    {
        id: "prod-4",
        name: "Neural Interface Tee",
        price: 1999,
        rating: 4.5,
        reviews: 120,
        images: [
            "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=200&auto=format&fit=crop",
        ],
        description: "Inspired by neural networks and digital consciousness. Soft-touch organic cotton.",
        sizes: ["XS", "S", "M", "L", "XL"],
    },
    {
        id: "prod-5",
        name: "Void Walker Sneakers",
        price: 8999,
        rating: 4.7,
        reviews: 15,
        images: [
            "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=200&auto=format&fit=crop",
        ],
        isNew: true,
        description: "Anti-gravity sole technology for maximum comfort and style. The future of footwear.",
        sizes: ["7", "8", "9", "10", "11"],
    },
    {
        id: "prod-6",
        name: "Flux Capacitator Cap",
        price: 1499,
        rating: 4.2,
        reviews: 8,
        images: [
            "https://images.unsplash.com/photo-1588850561407-ed78c282e89f?q=80&w=200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?q=80&w=200&auto=format&fit=crop"
        ],
        description: "Classic construction with futuristic materials. Water-resistant and breathable.",
        sizes: ["One Size"],
    }
];

export default function ShopPage() {
    const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
    const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

    const handleQuickView = (product: typeof products[0]) => {
        setSelectedProduct(product);
        setIsQuickViewOpen(true);
    };

    const handleCloseQuickView = () => {
        setIsQuickViewOpen(false);
        // Add small delay to clear product to avoid flashing content during close animation
        setTimeout(() => setSelectedProduct(null), 300);
    };

    return (
        <div className="bg-luxury-black min-h-screen pt-24 pb-20">
            <Container>
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Placeholder */}
                    <aside className="w-full lg:w-[280px] hidden lg:block h-fit space-y-8 sticky top-24">
                        <div className="p-6 bg-[#1C1C1C]/60 backdrop-blur-md rounded border border-white/5">
                            <h3 className="font-heading font-bold text-white mb-4">FILTERS</h3>
                            <div className="space-y-4 text-gray-400 text-sm">
                                <p>Category</p>
                                <p>Price Range</p>
                                <p>Size</p>
                                <p>Color</p>
                            </div>
                        </div>
                    </aside>

                    {/* Product Grid */}
                    <div className="flex-1">
                        <div className="mb-6 flex justify-between items-center">
                            <h1 className="font-heading font-bold text-3xl text-white">ALL PRODUCTS <span className="text-luxury-silver text-lg font-normal">({products.length})</span></h1>
                            <div className="flex gap-4">
                                <button className="text-sm text-gray-400 hover:text-white">Sort By: <span className="text-white">Newest</span></button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    onQuickView={handleQuickView}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </Container>

            <QuickViewModal
                product={selectedProduct}
                isOpen={isQuickViewOpen}
                onClose={handleCloseQuickView}
            />
        </div>
    );
}
