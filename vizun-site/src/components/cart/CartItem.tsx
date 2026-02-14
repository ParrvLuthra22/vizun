"use client";

import React from "react";
import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";
import { motion } from "framer-motion";
import { CartItem as CartItemType, useCart } from "@/context/CartContext";

interface CartItemProps {
    item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
    const { updateQuantity, removeFromCart } = useCart();
    const fastId = `${item.id}-${item.size}`;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="relative flex gap-4 p-4 mb-3 bg-[#1C1C1C]/60 rounded-lg border border-transparent hover:border-luxury-gold/30 transition-colors group"
        >
            {/* Image */}
            <div className="relative w-20 h-20 flex-shrink-0 bg-black rounded overflow-hidden border border-white/5">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
            </div>

            {/* Info */}
            <div className="flex-1 flex flex-col justify-between">
                <div className="pr-6">
                    <h4 className="text-white font-medium text-sm line-clamp-1">{item.name}</h4>
                    <p className="text-xs text-luxury-silver mt-1">
                        Size: {item.size} {item.color && `| ${item.color}`}
                    </p>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-luxury-rose font-bold text-sm">₹{item.price.toLocaleString()}</span>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 bg-luxury-charcoal border border-white/10 rounded px-1 h-8">
                        <button
                            onClick={() => updateQuantity(fastId, item.quantity - 1)}
                            className="w-6 h-full flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                        >
                            <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-semibold text-white w-4 text-center">{item.quantity}</span>
                        <button
                            onClick={() => updateQuantity(fastId, item.quantity + 1)}
                            className="w-6 h-full flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                        >
                            <Plus className="w-3 h-3" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Remove Button */}
            <button
                onClick={() => removeFromCart(fastId)}
                className="absolute top-2 right-2 p-1 text-gray-500 hover:text-luxury-rose transition-colors hover:rotate-90 duration-300"
            >
                <X className="w-4 h-4" />
            </button>
        </motion.div>
    );
}
