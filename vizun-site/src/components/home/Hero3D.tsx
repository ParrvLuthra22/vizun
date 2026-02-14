"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import ProductStage from "./3d/ProductStage";
import Button from "../ui/Button";

export default function Hero3D() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        setMousePos({
            x: e.clientX,
            y: e.clientY,
        });
    };

    return (
        <section
            className="relative h-screen w-full overflow-hidden bg-luxury-black text-white"
            onMouseMove={handleMouseMove}
        >
            {/* Interactive Gradient Background */}
            <div
                className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-100"
                style={{
                    background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(212, 175, 55, 0.08) 0%, transparent 60%)`
                }}
            />

            {/* 3D Scene Layer */}
            <div className="absolute inset-0 z-10">
                <ProductStage />
            </div>

            {/* UI Overlay Layer */}
            <div className="absolute inset-0 z-20 flex flex-col justify-end pb-32 px-4 pointer-events-none">
                <div className="max-w-7xl mx-auto w-full text-center pointer-events-auto">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="mb-4"
                    >
                        <span className="text-luxury-gold font-tech tracking-[0.5em] text-xs uppercase border border-luxury-gold/30 px-3 py-1 rounded-full backdrop-blur-md">
                            Collections 2026
                        </span>
                    </motion.div>

                    <div className="overflow-hidden">
                        <motion.h1
                            className="text-5xl md:text-7xl lg:text-9xl font-heading font-black tracking-tighter mb-6 text-white drop-shadow-[0_0_30px_rgba(0,0,0,0.5)]"
                        >
                            {"REDEFINE STREETWEAR".split("").map((char, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ y: 100, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{
                                        delay: i * 0.05,
                                        duration: 0.8,
                                        ease: [0.2, 0.65, 0.3, 0.9]
                                    }}
                                    className="inline-block hover:text-luxury-gold hover:scale-110 transform transition-all duration-300 cursor-default"
                                >
                                    {char === " " ? "\u00A0" : char}
                                </motion.span>
                            ))}
                        </motion.h1>
                    </div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2, duration: 0.8 }}
                        className="text-lg md:text-2xl text-gray-300 font-sans mb-10 tracking-wide font-light max-w-2xl mx-auto"
                    >
                        Premium menswear engineering. <span className="text-luxury-silver font-semibold">Future-ready.</span>
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.5, duration: 0.5 }}
                    >
                        <Button
                            variant="primary"
                            size="lg"
                            className="bg-gradient-to-br from-luxury-rose to-luxury-gold border-none shadow-[0_0_30px_rgba(183,110,121,0.4)] hover:shadow-[0_0_50px_rgba(183,110,121,0.6)] hover:scale-105 transition-all duration-300 px-10 py-6 text-lg tracking-widest"
                        >
                            EXPLORE COLLECTION
                        </Button>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 1 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-3"
            >
                <div className="w-6 h-10 border border-luxury-gold/30 rounded-full flex justify-center p-1 backdrop-blur-sm">
                    <motion.div
                        animate={{ y: [0, 12, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                        className="w-1 h-2 bg-luxury-gold rounded-full shadow-[0_0_10px_rgba(212,175,55,0.8)]"
                    />
                </div>
            </motion.div>
        </section>
    );
}
