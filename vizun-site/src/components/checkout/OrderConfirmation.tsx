"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy, ShoppingBag, Truck } from "lucide-react";
import Link from "next/link";
import confetti from "canvas-confetti";

export default function OrderConfirmation() {
    const [isCopied, setIsCopied] = useState(false);
    const orderId = `FT${Math.floor(Math.random() * 10000) + 20000}`;

    useEffect(() => {
        // Fire confetti
        const duration = 3000;
        const end = Date.now() + duration;

        const frame = () => {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#D4AF37', '#B76E79', '#FFFFFF']
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#D4AF37', '#B76E79', '#FFFFFF']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        };

        frame();
    }, []);

    const handleCopy = () => {
        navigator.clipboard.writeText(orderId);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-xl mx-auto text-center"
        >
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
                className="w-24 h-24 bg-luxury-gold rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(212,175,55,0.6)]"
            >
                <Check className="w-12 h-12 text-black" strokeWidth={3} />
            </motion.div>

            <h1 className="font-heading font-bold text-4xl text-white mb-2">Order Confirmed!</h1>
            <p className="text-luxury-silver text-lg mb-8">Thank you, Rahul. Your future is being prepared.</p>

            <div className="bg-[#1C1C1C] border border-white/10 rounded-lg p-6 mb-8 relative overflow-hidden">
                {/* Decorative Background */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-luxury-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                <div className="relative z-10">
                    <p className="text-sm text-gray-500 mb-1">Order Number</p>
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <span className="font-mono text-2xl text-white tracking-widest">#{orderId}</span>
                        <button
                            onClick={handleCopy}
                            className="text-luxury-gold hover:text-white transition-colors"
                            title="Copy Order ID"
                        >
                            {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </button>
                    </div>

                    <div className="border-t border-white/10 pt-4 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3 text-left">
                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                                <Truck className="w-5 h-5 text-luxury-rose" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Estimated Delivery</p>
                                <p className="font-bold text-white">Jan 25, 2025</p>
                            </div>
                        </div>

                        <div className="text-right">
                            <p className="text-xs text-gray-500">Sent to</p>
                            <p className="text-white text-sm">rahul.k@example.com</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="flex-1 max-w-[200px] h-12 bg-luxury-gold text-black font-bold uppercase rounded hover:brightness-110 flex items-center justify-center gap-2 transition-all">
                    Track Order
                </button>
                <Link href="/shop" className="flex-1 max-w-[200px] h-12 border border-white/30 text-white font-medium uppercase rounded hover:border-white hover:bg-white/5 flex items-center justify-center gap-2 transition-all">
                    Continue Shopping
                </Link>
            </div>
        </motion.div>
    );
}
