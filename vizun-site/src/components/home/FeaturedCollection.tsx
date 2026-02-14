"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Container from "../ui/Container";

// Placeholder images - using Unsplash
const collections = [
    {
        id: 1,
        name: "CYBER PUNK EDITORIAL",
        image: "https://images.unsplash.com/photo-1488161628813-99c974fc5bcd?q=80&w=2678&auto=format&fit=crop",
        size: "large", // spans 2 cols, 2 rows
        href: "/collections/editorial",
        code: "NEO-01",
    },
    {
        id: 2,
        name: "ESSENTIALS V2",
        image: "https://images.unsplash.com/photo-1516257984-b1b4d8c9230c?q=80&w=2787&auto=format&fit=crop",
        size: "tall", // spans 1 col, 2 rows
        href: "/collections/essentials",
        code: "BS-002",
    },
    {
        id: 3,
        name: "TECH ACCESSORIES",
        image: "https://images.unsplash.com/photo-1621609764180-2ca554a9d6f2?q=80&w=2574&auto=format&fit=crop",
        size: "wide", // spans 2 cols, 1 row
        href: "/collections/accessories",
        code: "ACC-X",
    },
    {
        id: 4,
        name: "FOOTWEAR",
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2212&auto=format&fit=crop",
        size: "standard", // 1x1
        href: "/collections/footwear",
        code: "KICKS-04",
    },
];

export default function FeaturedCollection() {
    return (
        <section className="py-24 bg-luxury-black relative overflow-hidden">
            {/* Background Grid Accent */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20 pointer-events-none" />

            <Container>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 flex items-end justify-between border-b border-white/10 pb-6"
                >
                    <div>
                        <h2 className="text-4xl md:text-6xl font-heading font-bold mb-2 text-white">SELECTED <span className="text-luxury-gold">DROPS</span></h2>
                        <p className="text-gray-400 font-tech text-xs tracking-[0.2em] uppercase">Curated by Vizun AI Algorithm</p>
                    </div>
                    <Link href="/collections" className="hidden md:block text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-luxury-gold transition-colors font-tech">
                        View All [42]
                    </Link>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[300px]">
                    {collections.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`relative group overflow-hidden border border-white/5 bg-luxury-charcoal/50 backdrop-blur-sm hover:border-luxury-gold/50 transition-colors duration-500 ${item.size === "large"
                                    ? "md:col-span-2 md:row-span-2"
                                    : item.size === "tall"
                                        ? "md:col-span-1 md:row-span-2"
                                        : item.size === "wide"
                                            ? "md:col-span-2 md:row-span-1"
                                            : "md:col-span-1 md:row-span-1"
                                }`}
                        >
                            <Link href={item.href} className="block w-full h-full relative z-10">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out"
                                />

                                {/* Tech Overlays */}
                                <div className="absolute top-4 left-4 z-20">
                                    <span className="text-[10px] font-tech text-luxury-gold border border-luxury-gold/30 px-2 py-1 bg-black/50 backdrop-blur-md">
                                        {item.code}
                                    </span>
                                </div>

                                {/* Content Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                                    <h3 className="text-white text-2xl md:text-3xl font-heading font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        {item.name}
                                    </h3>
                                    <div className="h-[2px] w-12 bg-luxury-gold mt-4 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 delay-100" />
                                </div>
                            </Link>

                            {/* Scanline Effect */}
                            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-20 bg-[linear-gradient(rgba(18,16,11,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-20 bg-[length:100%_2px,3px_100%] transition-opacity duration-300" />
                        </motion.div>
                    ))}
                </div>

                <div className="mt-8 text-center md:hidden">
                    <Link href="/collections" className="text-sm font-bold uppercase tracking-widest text-luxury-gold font-tech border border-luxury-gold/50 px-6 py-4 inline-block">
                        View All Collections
                    </Link>
                </div>
            </Container>
        </section>
    );
}
