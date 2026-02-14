import React from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    hoverEffect?: boolean;
}

export default function GlassCard({
    children,
    className,
    hoverEffect = false,
    ...props
}: GlassCardProps) {
    return (
        <div
            className={cn(
                "bg-white/5 border border-white/10 backdrop-blur-md rounded-xl p-6 transition-all duration-300",
                hoverEffect && "hover:bg-white/10 hover:border-luxury-gold/30 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)] hover:-translate-y-1",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
