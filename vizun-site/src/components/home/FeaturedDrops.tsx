"use client";

import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import CollectionCard from "./CollectionCard";
import LiquidBackground from "./LiquidBackground";

const collections = [
    {
        name: "WINTER ESSENTIALS",
        itemCount: 15,
        image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=2787&auto=format&fit=crop",
    },
    {
        name: "DENIM ARCHIVE",
        itemCount: 8,
        image: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?q=80&w=2835&auto=format&fit=crop",
    },
    {
        name: "STATEMENT TEES",
        itemCount: 24,
        image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=2835&auto=format&fit=crop",
    },
    {
        name: "STREETWEAR STAPLES",
        itemCount: 12,
        image: "https://images.unsplash.com/photo-1523398002811-999ca8dec234?q=80&w=2810&auto=format&fit=crop",
    },
    {
        name: "NEW ARRIVALS",
        itemCount: 42,
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2820&auto=format&fit=crop",
    },
];

export default function FeaturedDrops() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef });

    // Parallax for background text
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

    // Horizontal Scroll with Mouse Wheel (Hijack)
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleWheel = (e: WheelEvent) => {
            // Only hijack if we are scrolling vertically and inside the container area
            // This is a simplified version, usually we want to check if deltaY is dominant
            if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                e.preventDefault();
                container.scrollLeft += e.deltaY;
            }
        };

        container.addEventListener("wheel", handleWheel, { passive: false });
        return () => container.removeEventListener("wheel", handleWheel);
    }, []);

    return (
        <section className="relative h-[90vh] w-full bg-gradient-to-b from-black to-[#1C1C1C] overflow-hidden flex flex-col justify-center">

            {/* Liquid Background */}
            <LiquidBackground />

            {/* Floating Headline */}
            <div className="absolute top-12 left-8 md:top-20 md:left-20 z-10 pointer-events-none">
                <motion.h2
                    style={{ x }}
                    className="font-bebas text-6xl md:text-8xl text-white drop-shadow-[0_0_15px_rgba(212,175,55,0.3)] tracking-wide"
                >
                    FEATURED DROPS
                </motion.h2>
                <p className="font-sans text-luxury-silver text-sm md:text-base mt-2 tracking-widest pl-1 uppercase">
                    Curated collections for the vanguard
                </p>
            </div>

            {/* Horizontal Scroll Container */}
            <div
                ref={containerRef}
                className="w-full overflow-x-auto flex gap-6 md:gap-10 px-8 md:px-20 py-10 pb-20 snap-x snap-mandatory scrollbar-hide z-20 items-center"
                style={{ scrollBehavior: 'smooth' }}
            >
                {collections.map((collection, index) => (
                    <CollectionCard
                        key={collection.name}
                        index={index}
                        {...collection}
                    />
                ))}

                {/* Spacer for end of scroll */}
                <div className="w-10 md:w-20 flex-shrink-0" />
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 right-10 flex items-center gap-2 z-20 pointer-events-none mix-blend-difference">
                <span className="text-xs font-bold text-white uppercase tracking-widest">Scroll</span>
                <div className="flex gap-1">
                    <span className="w-1 h-1 bg-white rounded-full animate-bounce delay-75" />
                    <span className="w-1 h-1 bg-white rounded-full animate-bounce delay-150" />
                    <span className="w-1 h-1 bg-white rounded-full animate-bounce delay-300" />
                </div>
            </div>
        </section>
    );
}
