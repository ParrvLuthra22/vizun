"use client";

import React, { useEffect, useState, createContext, useContext } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type CursorContextType = {
    setCursorState: (state: "default" | "text" | "button" | "drag" | "card") => void;
    setCursorText: (text: string) => void;
};

const CursorContext = createContext<CursorContextType>({
    setCursorState: () => { },
    setCursorText: () => { },
});

export const useCursor = () => useContext(CursorContext);

export default function CustomCursor({ children }: { children: React.ReactNode }) {
    const [cursorState, setCursorState] = useState<"default" | "text" | "button" | "drag" | "card">("default");
    const [cursorText, setCursorText] = useState("");

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener("mousemove", moveCursor);
        return () => window.removeEventListener("mousemove", moveCursor);
    }, [mouseX, mouseY]);

    // Variants for the cursor look
    const variants = {
        default: {
            height: 20,
            width: 20,
            backgroundColor: "transparent",
            border: "1px solid #D4AF37",
            mixBlendMode: "difference" as const,
        },
        text: {
            height: 40,
            width: 4,
            backgroundColor: "#D4AF37",
            border: "none",
            mixBlendMode: "difference" as const,
        },
        button: {
            height: 60,
            width: 60,
            backgroundColor: "rgba(212, 175, 55, 0.2)",
            border: "1px solid #D4AF37",
            mixBlendMode: "normal" as const,
        },
        card: {
            height: 80,
            width: 80,
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(2px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            mixBlendMode: "normal" as const,
        },
        drag: {
            height: 50,
            width: 50,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            mixBlendMode: "difference" as const,
        }
    };

    return (
        <CursorContext.Provider value={{ setCursorState, setCursorText }}>
            <motion.div
                className="fixed top-0 left-0 bg-white rounded-full pointer-events-none z-[9999] flex items-center justify-center -translate-x-1/2 -translate-y-1/2 hidden md:flex"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: "-50%",
                    translateY: "-50%"
                }}
                variants={variants}
                animate={cursorState}
                transition={{ duration: 0.2, ease: "easeInOut" }}
            >
                {cursorState === "button" && (
                    <motion.span
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-[10px] font-bold text-luxury-gold uppercase tracking-widest"
                    >
                        {cursorText || "View"}
                    </motion.span>
                )}
                {cursorState === "card" && (
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-xs font-bold text-white uppercase tracking-widest"
                    >
                        Open
                    </motion.span>
                )}
            </motion.div>
            {children}
        </CursorContext.Provider>
    );
}
