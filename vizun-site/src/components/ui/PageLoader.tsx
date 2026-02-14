"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageLoader() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate initial loading time
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="fixed inset-0 z-[10000] bg-black flex items-center justify-center"
                >
                    <div className="relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="relative z-10 text-center"
                        >
                            <h1 className="font-heading font-bold text-6xl text-white tracking-widest drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]">
                                VIZUN
                            </h1>
                            <p className="text-luxury-gold text-xs uppercase tracking-[0.5em] mt-2">Future of Fashion</p>
                        </motion.div>

                        {/* Swirling particles ring */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, ease: "linear", repeat: Infinity }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-luxury-gold/20 border-t-luxury-gold/80"
                        />
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 3, ease: "linear", repeat: Infinity }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-white/10 border-b-white/50"
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
