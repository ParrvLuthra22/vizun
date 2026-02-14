"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface ButtonProps extends HTMLMotionProps<"button"> {
    variant?: "primary" | "secondary" | "outline";
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
        "inline-flex items-center justify-center font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
        primary: "bg-luxury-black text-luxury-white hover:bg-zinc-800",
        secondary: "bg-luxury-white text-luxury-black hover:bg-gray-100",
        outline:
            "border border-luxury-black text-luxury-black hover:bg-luxury-black hover:text-luxury-white",
    };

    const sizes = {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-8 text-base",
        lg: "h-14 px-10 text-lg",
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {children}
        </motion.button>
    );
}
