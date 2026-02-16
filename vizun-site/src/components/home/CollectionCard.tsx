"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CollectionCardProps {
    name: string;
    itemCount: number;
    image: string;
    index: number;
}

export default function CollectionCard({ name, itemCount, image }: CollectionCardProps) {
    const router = useRouter();
    const ref = useRef<HTMLDivElement>(null);
    const [hovered, setHovered] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        setHovered(false);
    };

    return (
        <motion.div
            ref={ref}
            onClick={() => router.push("/shop")}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className="relative h-[600px] w-[85vw] md:w-[500px] flex-shrink-0 cursor-pointer snap-center perspective-1000 group"
        >
            <div
                className={cn(
                    "absolute inset-0 bg-[#1C1C1C] rounded-lg border border-transparent transition-all duration-500 overflow-hidden",
                    hovered ? "border-luxury-gold shadow-[0_20px_60px_rgba(212,175,55,0.2)] -translate-y-2" : "shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
                )}
            >
                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-luxury-gold/10 to-transparent -translate-x-full group-hover:animate-shimmer z-20 pointer-events-none" />

                {/* Image Section (Top 70%) */}
                <div className="h-[70%] relative overflow-hidden">
                    <div className={cn(
                        "absolute inset-0 transition-all duration-700 ease-out",
                        hovered ? "scale-105 grayscale-0" : "grayscale scale-100"
                    )}>
                        <Image
                            src={image}
                            alt={name}
                            fill
                            className="object-cover"
                        />
                    </div>
                    {/* Gradient Overlay */}
                    <div className={cn(
                        "absolute inset-0 bg-gradient-to-b from-transparent to-black/80 transition-opacity duration-500",
                        hovered ? "opacity-100" : "opacity-0"
                    )} />
                </div>

                {/* Info Section (Bottom 30%) */}
                <div className="h-[30%] p-8 flex flex-col justify-between relative z-10 bg-[#1C1C1C]">
                    <div>
                        <h3 className="font-heading font-bold text-3xl text-white mb-2">{name}</h3>
                        <p className="font-sans text-sm text-gray-400">{itemCount} items</p>
                    </div>

                    <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider transition-colors duration-300 group-hover:text-luxury-gold text-luxury-rose">
                        View Collection
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
