"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CheckoutStepsProps {
    currentStep: number;
}

const steps = [
    { id: 1, label: "Shipping" },
    { id: 2, label: "Payment" },
    { id: 3, label: "Review" },
];

export default function CheckoutSteps({ currentStep }: CheckoutStepsProps) {
    return (
        <div className="w-full max-w-3xl mx-auto mb-12">
            <div className="relative flex justify-between items-center">
                {/* Progress Bar Background */}
                <div className="absolute top-1/2 left-0 w-full h-1 bg-luxury-charcoal -translate-y-1/2 z-0" />

                {/* Active Progress Bar */}
                <motion.div
                    className="absolute top-1/2 left-0 h-1 bg-luxury-rose -translate-y-1/2 z-0"
                    initial={{ width: "0%" }}
                    animate={{
                        width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
                    }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                />

                {steps.map((step) => {
                    const isCompleted = currentStep > step.id;
                    const isActive = currentStep === step.id;

                    return (
                        <div key={step.id} className="relative z-10 flex flex-col items-center gap-2">
                            <motion.div
                                initial={false}
                                animate={{
                                    scale: isActive ? 1.2 : 1,
                                    backgroundColor: isCompleted || isActive ? "#0A0A0A" : "#1C1C1C",
                                    borderColor: isCompleted || isActive ? "#D4AF37" : "#C0C0C0",
                                }}
                                className={cn(
                                    "w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors duration-300",
                                    (isCompleted || isActive) ? "border-luxury-gold bg-luxury-black" : "border-luxury-silver/50 bg-luxury-charcoal"
                                )}
                            >
                                {isCompleted ? (
                                    <Check className="w-4 h-4 text-luxury-gold" />
                                ) : (
                                    <div
                                        className={cn(
                                            "w-2.5 h-2.5 rounded-full transition-colors duration-300",
                                            isActive ? "bg-luxury-gold animate-pulse" : "bg-transparent"
                                        )}
                                    />
                                )}
                            </motion.div>
                            <span
                                className={cn(
                                    "text-xs font-medium uppercase tracking-wider transition-colors duration-300 absolute top-10 whitespace-nowrap",
                                    isActive ? "text-luxury-gold font-bold" : isCompleted ? "text-white" : "text-luxury-silver"
                                )}
                            >
                                {step.label}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
