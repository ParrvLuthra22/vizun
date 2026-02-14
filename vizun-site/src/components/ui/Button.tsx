"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends HTMLMotionProps<"button"> {
    variant?: "primary" | "outline" | "ghost" | "neon";
    size?: "sm" | "md" | "lg";
    children: React.ReactNode;
}

export default function Button({
    variant = "primary",
    size = "md",
    className = "",
    children,
    ...props
}: ButtonProps) {
    const baseStyles =
        "inline-flex items-center justify-center font-bold tracking-wide transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden group font-heading uppercase";

    const variants = {
        primary: "bg-luxury-gold text-black hover:bg-white hover:text-black shadow-[0_0_15px_rgba(212,175,55,0.4)] hover:shadow-[0_0_25px_rgba(255,255,255,0.6)]",
        outline:
            "border border-luxury-gold/50 text-luxury-gold hover:border-luxury-gold hover:bg-luxury-gold/10 hover:text-white backdrop-blur-sm",
        ghost: "text-gray-400 hover:text-white hover:bg-white/5",
        neon: "border border-neon-green text-neon-green hover:bg-neon-green hover:text-black shadow-[0_0_10px_rgba(57,255,20,0.3)] hover:shadow-[0_0_20px_rgba(57,255,20,0.6)]",
    };

    const sizes = {
        sm: "h-9 px-4 text-xs",
        md: "h-12 px-8 text-sm",
        lg: "h-14 px-10 text-base",
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(baseStyles, variants[variant], sizes[size], className)}
            {...props}
        >
            <span className="relative z-10 flex items-center gap-2">{children}</span>
            {/* Glitch overlay effect on hover could go here */}
        </motion.button>
    );
}
