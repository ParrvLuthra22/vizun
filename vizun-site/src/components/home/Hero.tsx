"use client";

import React from "react";
import { motion } from "framer-motion";
import Button from "../ui/Button";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative h-screen w-full overflow-hidden flex items-center justify-center text-luxury-white">
            {/* Video Background (Placeholder) */}
            <div className="absolute inset-0 z-0 bg-luxury-black">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-60"
                >
                    {/* Replace with actual video URL */}
                    <source src="https://cdn.coverr.co/videos/coverr-walking-in-a-city-at-night-4566/1080p.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 tracking-tight"
                >
                    Redefine Your Style
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto font-light tracking-wide"
                >
                    Experience the pinnacle of modern menswear. Meticulously crafted for the contemporary gentleman.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <Link href="/collections">
                        <Button variant="primary" size="lg">Explore Collection</Button>
                    </Link>
                    <Link href="/new-arrivals">
                        <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-black">
                            New Arrivals
                        </Button>
                    </Link>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            >
                <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent opacity-50"></div>
            </motion.div>
        </section>
    );
}
