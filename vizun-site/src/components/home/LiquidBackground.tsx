"use client";

import React from "react";
import { motion } from "framer-motion";

export default function LiquidBackground() {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <motion.svg
                viewBox="0 0 1000 1000"
                className="absolute w-full h-full opacity-30 text-luxury-charcoal"
                style={{ filter: "blur(80px)" }}
                animate={{
                    rotate: [0, 360],
                    scale: [1, 1.2, 0.8, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                }}
            >
                <path
                    fill="currentColor"
                    d="M865.5,334.5c23.5,88.5-12.5,217.5-98,295.5c-85.5,78-220.5,105-333.5,67c-113-38-204-141-213-261
	c-9-120,64-257,178.5-316.5c114.5-59.5,270.5-41.5,357.5,43.5C844,248,842,246,865.5,334.5z"
                />
            </motion.svg>
            <motion.svg
                viewBox="0 0 1000 1000"
                className="absolute top-1/2 left-1/4 w-3/4 h-3/4 opacity-20 text-gray-800"
                style={{ filter: "blur(60px)" }}
                animate={{
                    rotate: [360, 0],
                    scale: [0.9, 1.1, 0.9],
                    x: [0, 100, -100, 0]
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                <path
                    fill="currentColor"
                    d="M784.5,633c-39.5,91.5-123.5,160.5-224.5,178.5c-101,18-219-15-288.5-95.5c-69.5-80.5-90.5-208.5-49.5-300.5
	c41-92,144-148,252-162.5c108-14.5,221,12.5,283.5,86C819.5,412.5,824,541.5,784.5,633z"
                />
            </motion.svg>
        </div>
    );
}
