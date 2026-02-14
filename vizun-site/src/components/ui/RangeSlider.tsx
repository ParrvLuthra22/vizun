"use client";

import React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

interface RangeSliderProps {
    min: number;
    max: number;
    step?: number;
    value: [number, number];
    onValueChange: (value: [number, number]) => void;
    className?: string;
}

export default function RangeSlider({
    min,
    max,
    step = 1,
    value,
    onValueChange,
    className,
}: RangeSliderProps) {
    return (
        <SliderPrimitive.Root
            className={cn("relative flex items-center select-none touch-none w-full h-5", className)}
            value={value}
            onValueChange={onValueChange}
            max={max}
            min={min}
            step={step}
            minStepsBetweenThumbs={1}
        >
            <SliderPrimitive.Track className="bg-luxury-charcoal relative grow rounded-full h-[2px]">
                <SliderPrimitive.Range className="absolute bg-luxury-rose h-full rounded-full" />
            </SliderPrimitive.Track>
            {value.map((_, i) => (
                <SliderPrimitive.Thumb
                    key={i}
                    className="block w-4 h-4 bg-luxury-gold shadow-[0_0_10px_rgba(212,175,55,0.5)] rounded-full hover:scale-110 focus:outline-none focus:ring-2 focus:ring-luxury-gold/50 transition-transform duration-200"
                />
            ))}
        </SliderPrimitive.Root>
    );
}
