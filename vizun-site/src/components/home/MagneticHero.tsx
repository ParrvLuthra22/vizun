"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowRight, Play } from "lucide-react";

// Types
interface Point {
    x: number;
    y: number;
    originX: number;
    originY: number;
    size: number;
    color: string;
    vx: number;
    vy: number;
}

export default function MagneticHero() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

    // Animation Refs for GSAP
    const badgeRef = useRef(null);
    const headlineRef = useRef(null);
    const taglineRef = useRef(null);
    const buttonsRef = useRef(null);
    const statsRef = useRef(null);

    // --- Canvas Logic ---
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        let points: Point[] = [];
        let animationFrameId: number;

        const colors = {
            default: "rgba(192, 192, 192, 0.3)", // Silver
            active: "rgba(212, 175, 55, 0.8)",   // Gold
            highlight: "rgba(183, 110, 121, 0.9)" // Rose Gold
        };

        const init = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;

            points = [];
            // Desktop: 40x30, Mobile: 20x15
            const cols = width > 768 ? 40 : 20;
            const rows = width > 768 ? 30 : 15;
            const spacingX = width / cols;
            const spacingY = height / rows;

            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    const x = i * spacingX + spacingX / 2;
                    const y = j * spacingY + spacingY / 2;
                    points.push({
                        x,
                        y,
                        originX: x,
                        originY: y,
                        size: 2, // Base size
                        color: colors.default,
                        vx: 0,
                        vy: 0
                    });
                }
            }
        };

        const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b;
        const dist = (x1: number, y1: number, x2: number, y2: number) =>
            Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            points.forEach((p) => {
                // Physics & Mouse Interaction
                const d = dist(mousePos.x, mousePos.y, p.originX, p.originY);
                const force = Math.max(0, 150 - d) / 150; // Radius 150px

                const angle = Math.atan2(mousePos.y - p.originY, mousePos.x - p.originX);
                const targetX = p.originX + Math.cos(angle) * force * 50; // Max displacement 50px
                const targetY = p.originY + Math.sin(angle) * force * 50;

                // Spring physics (elastic ease)
                p.x = lerp(p.x, targetX, 0.1);
                p.y = lerp(p.y, targetY, 0.1);

                // Visual properties based on distance
                if (d < 150) {
                    p.size = lerp(p.size, 5, 0.1);
                    p.color = d < 80 ? colors.highlight : colors.active;
                } else {
                    p.size = lerp(p.size, 2, 0.1); // Return to base size
                    p.color = colors.default;
                }

                // Draw Dot
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();

                // Connect Lines (if close to mouse)
                if (d < 120) {
                    points.forEach(neighbor => {
                        const neighborDist = dist(p.x, p.y, neighbor.x, neighbor.y);
                        if (neighborDist < 40) {
                            ctx.beginPath();
                            ctx.moveTo(p.x, p.y);
                            ctx.lineTo(neighbor.x, neighbor.y);
                            ctx.strokeStyle = `rgba(212, 175, 55, ${0.4 - neighborDist / 100})`;
                            ctx.lineWidth = 0.5;
                            ctx.stroke();
                        }
                    });
                }
            });

            // Ambient Wave (Subtle pulse without mouse)
            const time = Date.now() / 2000;
            points.forEach(p => {
                if (dist(mousePos.x, mousePos.y, p.originX, p.originY) > 200) {
                    const waveY = Math.sin(p.originX / 200 + time) * 5;
                    p.y += (p.originY + waveY - p.y) * 0.05;
                }
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener("resize", init);
        init();
        animate();

        return () => {
            window.removeEventListener("resize", init);
            cancelAnimationFrame(animationFrameId);
        };
    }, [mousePos]);

    const handleMouseMove = (e: React.MouseEvent) => {
        setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseLeave = () => {
        setMousePos({ x: -1000, y: -1000 });
    };


    // --- GSAP Content Animations ---
    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            // Batch 1: Badge
            tl.fromTo(badgeRef.current,
                { y: -20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, delay: 0.2 }
            );

            // Batch 2: Headline Words
            const words = headlineRef.current ? (headlineRef.current as HTMLElement).querySelectorAll(".word") : [];
            tl.fromTo(words,
                { y: 100, clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" },
                { y: 0, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", duration: 1, stagger: 0.2 },
                "-=0.4"
            );

            // Batch 3: Tagline & Buttons
            tl.fromTo(taglineRef.current,
                { y: 20, opacity: 0, filter: "blur(10px)" },
                { y: 0, opacity: 1, filter: "blur(0px)", duration: 1 },
                "-=0.6"
            );

            tl.fromTo(buttonsRef.current,
                { scale: 0.9, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.8 },
                "-=0.8"
            );

            // Batch 4: Stats
            const stats = statsRef.current ? (statsRef.current as HTMLElement).children : [];
            tl.fromTo(stats,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
                "-=0.4"
            );

        }, containerRef);

        return () => ctx.revert();
    }, []);


    return (
        <div
            ref={containerRef}
            className="relative h-screen w-full bg-black overflow-hidden flex flex-col items-center justify-center text-center"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Canvas Layer */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 z-0 pointer-events-none"
            />

            {/* Content Layer */}
            <div className="relative z-10 px-4 max-w-5xl mx-auto flex flex-col items-center gap-8 md:gap-10">

                {/* Badge */}
                <div ref={badgeRef} className="px-6 py-2 border border-luxury-gold/50 bg-[#1C1C1C]/80 backdrop-blur-sm rounded-full">
                    <span className="font-heading font-bold text-luxury-gold text-xs tracking-widest uppercase">SS26 Collection</span>
                </div>

                {/* Headline */}
                <h1 ref={headlineRef} className="font-heading font-black text-5xl md:text-7xl lg:text-9xl text-white leading-[0.9] tracking-tighter drop-shadow-[0_0_30px_rgba(255,255,255,0.15)] mix-blend-screen">
                    <div className="overflow-hidden"><span className="word block">REDEFINE</span></div>
                    <div className="overflow-hidden"><span className="word block">STREETWEAR</span></div>
                </h1>

                {/* Tagline */}
                <p ref={taglineRef} className="font-sans font-light text-lg md:text-xl text-gray-300 max-w-lg">
                    Premium menswear engineering. Future-ready designs for the vanguard of fashion.
                </p>

                {/* Buttons */}
                <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
                    <Link
                        href="/shop"
                        className="group relative px-8 py-4 bg-linear-to-r from-luxury-gold to-[#F5D061] text-black font-bold tracking-wider overflow-hidden hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-2"
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            SHOP NOW <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </span>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                    </Link>

                    <Link
                        href="/shop"
                        className="group px-8 py-4 bg-transparent border border-white/30 text-white font-bold tracking-wider hover:bg-white/5 hover:border-white transition-all duration-300 flex items-center justify-center gap-2"
                    >
                        <Play className="w-4 h-4 fill-white" /> VIEW LOOKBOOK
                    </Link>
                </div>
            </div>

            {/* Footer Stats */}
            <div ref={statsRef} className="absolute bottom-12 flex items-center gap-4 md:gap-8 text-luxury-silver text-xs md:text-sm font-medium tracking-wide">
                <span>1000+ PRODUCTS</span>
                <div className="w-1.5 h-1.5 rounded-full bg-luxury-gold animate-pulse" />
                <span>PREMIUM QUALITY</span>
                <div className="w-1.5 h-1.5 rounded-full bg-luxury-gold animate-pulse" />
                <span>FAST DELIVERY</span>
            </div>

        </div>
    );
}
