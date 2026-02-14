"use client";

import React from "react";
import Image from "next/image";
import { Lock } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function OrderSummary() {
    const { items, total } = useCart(); // Changed cartTotal to total
    const shipping = total > 999 ? 0 : 500;
    const discount = 0; // Logic for discount to be added if promo applied globally
    const finalTotal = total + shipping - discount;

    return (
        <div className="bg-[#1C1C1C]/80 backdrop-blur-md border border-luxury-gold/20 rounded-lg p-6 sticky top-24">
            <h3 className="font-heading font-bold text-xl text-white mb-6 tracking-wide border-b border-white/10 pb-4">
                ORDER SUMMARY
            </h3>

            <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {items.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="flex gap-4">
                        <div className="relative w-16 h-20 bg-black rounded overflow-hidden shrink-0 border border-white/5">
                            <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover"
                            />
                            <span className="absolute top-0 right-0 bg-luxury-gold text-black text-[10px] font-bold px-1.5 py-0.5">
                                x{item.quantity}
                            </span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="text-white font-medium text-sm truncate">{item.name}</h4>
                            <p className="text-luxury-silver text-xs">Size: {item.size}</p>
                            <p className="text-luxury-rose font-bold text-sm mt-1">
                                ₹{item.price.toLocaleString()}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="space-y-3 border-t border-white/10 pt-4 text-sm">
                <div className="flex justify-between text-luxury-silver">
                    <span>Subtotal</span>
                    <span className="text-white">₹{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-luxury-silver">
                    <span>Shipping</span>
                    {shipping === 0 ? (
                        <span className="text-green-400">FREE</span>
                    ) : (
                        <span className="text-white">₹{shipping}</span>
                    )}
                </div>
                {discount > 0 && (
                    <div className="flex justify-between text-luxury-rose">
                        <span>Discount</span>
                        <span>-₹{discount.toLocaleString()}</span>
                    </div>
                )}
            </div>

            <div className="border-t border-luxury-gold/30 pt-4 mt-4 mb-6">
                <div className="flex justify-between items-end">
                    <span className="text-white font-heading font-bold text-lg">TOTAL</span>
                    <span className="text-2xl font-bold text-luxury-gold">
                        ₹{finalTotal.toLocaleString()}
                    </span>
                </div>
                <p className="text-right text-xs text-access-silver mt-1">
                    (Determined by your location)
                </p>
            </div>

            <div className="flex items-center gap-2 justify-center bg-black/20 py-3 rounded border border-white/5">
                <Lock className="w-3 h-3 text-luxury-silver" />
                <span className="text-xs text-luxury-silver font-medium">Secure SSL Checkout</span>
            </div>
        </div>
    );
}
