"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, X } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

const wishlistItems = [
    { id: 1, name: "Oversized Bomber Jacket", price: 2999, image: "https://images.unsplash.com/photo-1551028919-ac66e624eca1?q=80&w=300&auto=format&fit=crop" },
    { id: 2, name: "Cyberpunk Cargo Pants", price: 3499, image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=300&auto=format&fit=crop" },
    { id: 3, name: "Void Black Hoodie", price: 2499, image: "https://images.unsplash.com/photo-1578932750294-f5075e85f44a?q=80&w=300&auto=format&fit=crop" },
];

export default function WishlistPage() {
    const { addToCart } = useCart();

    const handleMoveToCart = (item: typeof wishlistItems[0]) => {
        addToCart({
            id: `prod-${item.id}`,
            name: item.name,
            price: item.price,
            image: item.image,
            size: "M", // Default
            color: "Black"
        });
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="font-heading font-bold text-3xl text-white mb-2">My Wishlist</h1>
                <p className="text-luxury-silver">Items you love and want to save for later.</p>
            </div>

            {wishlistItems.length === 0 ? (
                <div className="text-center py-20 bg-[#1C1C1C] rounded-lg border border-white/5">
                    <Heart className="w-16 h-16 text-gray-700 mx-auto mb-4 animate-pulse" />
                    <h3 className="text-xl font-bold text-white mb-2">Your wishlist is empty</h3>
                    <p className="text-gray-400 mb-6">Start adding items you love!</p>
                    <Link href="/shop" className="px-8 py-3 bg-luxury-gold text-black font-bold rounded hover:brightness-110 transition-all">
                        Browse Products
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {wishlistItems.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group bg-[#1C1C1C] border border-white/5 rounded-lg overflow-hidden hover:border-luxury-gold/30 transition-all duration-300"
                        >
                            <div className="relative aspect-square bg-black overflow-hidden">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <button className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 backdrop-blur flex items-center justify-center text-white hover:bg-rose-500 hover:text-white transition-colors">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="p-4">
                                <h3 className="text-white font-medium truncate mb-1">{item.name}</h3>
                                <p className="text-luxury-rose font-bold mb-4">₹{item.price.toLocaleString()}</p>

                                <button
                                    onClick={() => handleMoveToCart(item)}
                                    className="w-full py-2 bg-white/10 hover:bg-luxury-gold hover:text-black text-white rounded text-sm font-bold transition-colors flex items-center justify-center gap-2"
                                >
                                    <ShoppingBag className="w-4 h-4" /> Move to Cart
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
