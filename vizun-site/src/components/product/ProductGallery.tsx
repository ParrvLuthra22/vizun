"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Rotate3D, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
    images: string[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isZoomed) return;
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setMousePos({ x, y });
    };

    return (
        <div className="flex flex-col gap-6 w-full lg:sticky lg:top-24 h-fit">
            {/* Main Image View */}
            <div
                className="relative aspect-[3/4] w-full bg-black border border-white/5 overflow-hidden group cursor-zoom-in"
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
                onMouseMove={handleMouseMove}
            >
                <motion.div
                    key={selectedIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full relative"
                >
                    {/* Normal Image */}
                    <Image
                        src={images[selectedIndex]}
                        alt="Product View"
                        fill
                        className={cn(
                            "object-contain transition-opacity duration-300",
                            isZoomed ? "opacity-0" : "opacity-100"
                        )}
                        priority
                    />

                    {/* Zoomed Image */}
                    <div
                        className={cn(
                            "absolute inset-0 bg-no-repeat transition-opacity duration-300 pointer-events-none",
                            isZoomed ? "opacity-100" : "opacity-0"
                        )}
                        style={{
                            backgroundImage: `url(${images[selectedIndex]})`,
                            backgroundPosition: `${mousePos.x}% ${mousePos.y}%`,
                            backgroundSize: "200%",
                        }}
                    />
                </motion.div>

                {/* 360 Trigger Button */}
                <button className="absolute bottom-6 right-6 bg-white/10 backdrop-blur-md p-3 rounded-full hover:bg-luxury-gold hover:text-black transition-all duration-300 group/btn border border-white/20">
                    <Rotate3D className="w-6 h-6 animate-pulse group-hover/btn:animate-spin" />
                </button>

                {/* Zoom Hint Icon */}
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 p-2 rounded-full backdrop-blur-sm pointer-events-none">
                    <ZoomIn className="w-5 h-5 text-white" />
                </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x">
                {images.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => setSelectedIndex(idx)}
                        className={cn(
                            "relative w-24 h-32 flex-shrink-0 border-2 transition-all duration-300 snap-start bg-black",
                            selectedIndex === idx
                                ? "border-luxury-gold scale-105 shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                                : "border-transparent opacity-60 hover:opacity-100 hover:border-white/20 hover:-translate-y-1"
                        )}
                    >
                        <Image src={img} alt={`Thumbnail ${idx}`} fill className="object-cover" />
                    </button>
                ))}
            </div>
        </div>
    );
}
