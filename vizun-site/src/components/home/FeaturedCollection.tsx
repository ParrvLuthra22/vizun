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
        name: "Summer Editorial",
        image: "https://images.unsplash.com/photo-1488161628813-99c974fc5bcd?q=80&w=2678&auto=format&fit=crop",
        size: "large", // spans 2 cols, 2 rows
        href: "/collections/summer",
    },
    {
        id: 2,
        name: "Essentials",
        image: "https://images.unsplash.com/photo-1516257984-b1b4d8c9230c?q=80&w=2787&auto=format&fit=crop",
        size: "tall", // spans 1 col, 2 rows
        href: "/collections/essentials",
    },
    {
        id: 3,
        name: "Accessories",
        image: "https://images.unsplash.com/photo-1621609764180-2ca554a9d6f2?q=80&w=2574&auto=format&fit=crop",
        size: "wide", // spans 2 cols, 1 row
        href: "/collections/accessories",
    },
    {
        id: 4,
        name: "Footwear",
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2212&auto=format&fit=crop",
        size: "standard", // 1x1
        href: "/collections/footwear",
    },
];

export default function FeaturedCollection() {
    return (
        <section className="py-24 bg-luxury-white">
            <Container>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 flex items-end justify-between"
                >
                    <div>
                        <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">Curated Collections</h2>
                        <p className="text-gray-500 max-w-md">Discover our latest arrivals and timeless pieces, handpicked for the discerning individual.</p>
                    </div>
                    <Link href="/collections" className="hidden md:block text-sm font-bold uppercase tracking-widest border-b border-black pb-1 hover:text-luxury-accent hover:border-luxury-accent transition-colors">
                        View All Collections
                    </Link>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[300px]">
                    {collections.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`relative group overflow-hidden bg-gray-100 ${item.size === "large"
                                    ? "md:col-span-2 md:row-span-2"
                                    : item.size === "tall"
                                        ? "md:col-span-1 md:row-span-2"
                                        : item.size === "wide"
                                            ? "md:col-span-2 md:row-span-1"
                                            : "md:col-span-1 md:row-span-1"
                                }`}
                        >
                            <Link href={item.href} className="block w-full h-full">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
                                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                                    <h3 className="text-white text-2xl md:text-3xl font-serif font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        {item.name}
                                    </h3>
                                    <span className="text-white text-sm uppercase tracking-wider mt-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                                        Shop Now
                                    </span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-8 text-center md:hidden">
                    <Link href="/collections" className="text-sm font-bold uppercase tracking-widest border-b border-black pb-1">
                        View All Collections
                    </Link>
                </div>
            </Container>
        </section>
    );
}
