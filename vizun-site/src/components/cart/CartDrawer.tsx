"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Zap, Tag, Lock, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
import CartItem from "./CartItem";
import { cn } from "@/lib/utils";

const FREE_SHIPPING_THRESHOLD = 999;

export default function CartDrawer() {
    const { isOpen, closeCart, items, total } = useCart();
    const [promoCode, setPromoCode] = useState("");
    const [discount, setDiscount] = useState(0);
    const [isPromoOpen, setIsPromoOpen] = useState(false);
    const [promoError, setPromoError] = useState(false);
    const [isApplyingPromo, setIsApplyingPromo] = useState(false);

    // Reset promo on cart close
    useEffect(() => {
        if (!isOpen) {
            setPromoError(false);
            setIsPromoOpen(false);
        }
    }, [isOpen]);

    const handleApplyPromo = () => {
        setIsApplyingPromo(true);
        setTimeout(() => {
            if (promoCode.toUpperCase() === "SAVE10") {
                setDiscount(650);
                setPromoError(false);
            } else {
                setPromoError(true);
                setDiscount(0);
            }
            setIsApplyingPromo(false);
        }, 1000);
    };

    const removePromo = () => {
        setDiscount(0);
        setPromoCode("");
    };

    const freeShippingProgress = Math.min(100, (total / FREE_SHIPPING_THRESHOLD) * 100);
    const finalTotal = total - discount;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeCart}
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-y-0 right-0 w-full md:w-[440px] bg-luxury-black border-l border-luxury-gold/20 shadow-[-10px_0_60px_rgba(0,0,0,0.8)] z-50 flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-luxury-charcoal">
                            <div className="flex items-center gap-3">
                                <h2 className="font-heading font-bold text-2xl text-white">YOUR CART</h2>
                                <span className="text-luxury-rose font-bold text-lg">({items.length})</span>
                            </div>
                            <button
                                onClick={closeCart}
                                className="group"
                            >
                                <X className="w-6 h-6 text-gray-400 group-hover:text-luxury-rose group-hover:rotate-90 transition-all duration-300" />
                            </button>
                        </div>

                        {/* Free Shipping Bar */}
                        <div className="px-6 py-4 border-b border-white/5 bg-[#1C1C1C]/50">
                            {total >= FREE_SHIPPING_THRESHOLD ? (
                                <div className="flex items-center gap-2 text-green-400 font-medium text-sm animate-pulse">
                                    <span className="bg-green-400/20 p-1 rounded-full"><Check className="w-3 h-3" /></span>
                                    🎉 Free delivery unlocked!
                                </div>
                            ) : (
                                <div className="text-sm">
                                    <p className="text-gray-400 mb-2">
                                        Add <span className="text-luxury-rose font-bold">₹{FREE_SHIPPING_THRESHOLD - total}</span> more for <span className="text-white font-bold">FREE delivery</span>
                                    </p>
                                    <div className="h-2 bg-luxury-charcoal rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-gradient-to-r from-luxury-rose to-luxury-gold"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${freeShippingProgress}%` }}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Items List */}
                        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-luxury-gold/20">
                            {items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center opacity-60">
                                    <div className="relative mb-6">
                                        <ShoppingBag className="w-16 h-16 text-luxury-gold animate-bounce" />
                                        <div className="absolute inset-0 bg-luxury-gold/20 blur-xl rounded-full" />
                                    </div>
                                    <h3 className="font-heading text-xl text-white mb-2">Your cart is empty</h3>
                                    <p className="text-gray-400 mb-8">Start adding items to build your look.</p>
                                    <button onClick={closeCart} className="px-6 py-2 border border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-black transition-all">
                                        Start Shopping
                                    </button>
                                </div>
                            ) : (
                                <AnimatePresence>
                                    {items.map((item) => (
                                        <CartItem key={`${item.id}-${item.size}`} item={item} />
                                    ))}
                                </AnimatePresence>
                            )}
                        </div>

                        {/* Promo Code & Totals */}
                        {items.length > 0 && (
                            <div className="border-t border-luxury-gold/30 bg-luxury-charcoal p-6 space-y-6">
                                {/* Promo Code */}
                                <div>
                                    {!isPromoOpen && discount === 0 ? (
                                        <button
                                            onClick={() => setIsPromoOpen(true)}
                                            className="flex items-center gap-2 text-luxury-gold text-sm hover:underline"
                                        >
                                            <Tag className="w-4 h-4" /> Have a promo code?
                                        </button>
                                    ) : (
                                        <div className="space-y-2">
                                            {discount > 0 ? (
                                                <div className="flex items-center justify-between bg-green-500/10 border border-green-500/20 p-2 rounded px-3">
                                                    <span className="text-green-400 text-sm flex items-center gap-2">
                                                        <Check className="w-3 h-3" /> SAVE10 applied
                                                    </span>
                                                    <button onClick={removePromo} className="text-gray-400 hover:text-white"><X className="w-3 h-3" /></button>
                                                </div>
                                            ) : (
                                                <div className="flex gap-2">
                                                    <div className="relative flex-1">
                                                        <input
                                                            type="text"
                                                            value={promoCode}
                                                            onChange={(e) => setPromoCode(e.target.value)}
                                                            placeholder="Enter code..."
                                                            className={cn(
                                                                "w-full bg-[#0A0A0A] border rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-luxury-gold transition-colors",
                                                                promoError ? "border-red-500" : "border-white/10"
                                                            )}
                                                        />
                                                        {promoError && <span className="absolute -bottom-5 left-0 text-xs text-red-500">Invalid code</span>}
                                                    </div>
                                                    <button
                                                        onClick={handleApplyPromo}
                                                        disabled={!promoCode || isApplyingPromo}
                                                        className="bg-luxury-rose text-white px-4 py-2 rounded text-xs font-bold uppercase tracking-wider hover:brightness-110 disabled:opacity-50"
                                                    >
                                                        {isApplyingPromo ? "Checking..." : "Apply"}
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Totals */}
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between text-gray-400">
                                        <span>Subtotal</span>
                                        <span>₹{total.toLocaleString()}</span>
                                    </div>
                                    {discount > 0 && (
                                        <div className="flex justify-between text-luxury-rose">
                                            <span>Discount</span>
                                            <span>-₹{discount.toLocaleString()}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between text-gray-400">
                                        <span>Delivery</span>
                                        <span className={cn(total >= FREE_SHIPPING_THRESHOLD && "text-green-400")}>
                                            {total >= FREE_SHIPPING_THRESHOLD ? "FREE" : "₹150"}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-end pt-4 border-t border-white/10 mt-4">
                                        <span className="font-heading font-bold text-xl text-white">TOTAL</span>
                                        <span className="font-heading font-bold text-2xl text-luxury-gold">
                                            ₹{(finalTotal + (total >= FREE_SHIPPING_THRESHOLD ? 0 : 150)).toLocaleString()}
                                        </span>
                                    </div>
                                </div>

                                {/* Checkout Button */}
                                <button className="w-full h-14 bg-gradient-to-r from-luxury-rose to-luxury-gold text-white font-bold uppercase tracking-wide rounded hover:brightness-110 transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] flex items-center justify-center gap-2 group">
                                    PROCEED TO CHECKOUT <Zap className="w-5 h-5 fill-white group-hover:animate-pulse" />
                                </button>

                                <div className="flex items-center justify-center gap-2 text-gray-500 text-xs">
                                    <Lock className="w-3 h-3" /> Secure checkout
                                </div>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
