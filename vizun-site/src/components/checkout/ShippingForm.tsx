"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ShippingFormProps {
    onComplete: () => void;
}

export default function ShippingForm({ onComplete }: ShippingFormProps) {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zip: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.fullName) newErrors.fullName = "Full Name is required";
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Valid email is required";
        if (!formData.phone || formData.phone.length < 10) newErrors.phone = "Valid phone is required";
        if (!formData.address) newErrors.address = "Address is required";
        if (!formData.city) newErrors.city = "City is required";
        if (!formData.state) newErrors.state = "State is required";
        if (!formData.zip) newErrors.zip = "Zip Code is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            onComplete();
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-8"
        >
            <div className="mb-8">
                <h2 className="font-heading font-bold text-3xl text-white mb-2">Shipping Address</h2>
                <p className="text-luxury-silver text-sm">Where should we create your future?</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <FloatingInput
                    label="Full Name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    error={errors.fullName}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FloatingInput
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                    />
                    <FloatingInput
                        label="Phone Number"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        error={errors.phone}
                    />
                </div>

                <FloatingInput
                    label="Street Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    error={errors.address}
                />

                <div className="grid grid-cols-3 gap-4">
                    <FloatingInput
                        label="City"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        error={errors.city}
                    />
                    <FloatingInput
                        label="State"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        error={errors.state}
                    />
                    <FloatingInput
                        label="Zip / PIN"
                        name="zip"
                        value={formData.zip}
                        onChange={handleChange}
                        error={errors.zip}
                    />
                </div>

                {/* Saved Addresses Placeholder */}
                <div className="pt-4 border-t border-white/10">
                    <h3 className="text-white font-medium mb-4 text-sm">Saved Addresses</h3>
                    <div className="bg-[#1C1C1C] border border-luxury-gold rounded-lg p-4 relative group cursor-pointer hover:bg-[#252525] transition-colors">
                        <div className="flex justify-between items-start">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-bold text-white">Home</span>
                                    <span className="bg-luxury-gold/20 text-luxury-gold text-[10px] px-2 rounded-full">Default</span>
                                </div>
                                <p className="text-gray-400 text-sm">Rahul K.<br />123 Innovation Drive, Tech Park<br />Bangalore, KA 560103</p>
                            </div>
                            <div className="w-5 h-5 rounded-full border-2 border-luxury-gold flex items-center justify-center">
                                <div className="w-2.5 h-2.5 rounded-full bg-luxury-gold" />
                            </div>
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full h-14 bg-linear-to-r from-luxury-rose to-luxury-gold text-white font-bold uppercase tracking-wide rounded hover:brightness-110 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all flex items-center justify-center gap-2 group mt-8"
                >
                    Continue to Payment
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
            </form>
        </motion.div>
    );
}

interface FloatingInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

function FloatingInput({ label, error, className, value, ...props }: FloatingInputProps) {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = value && value.toString().length > 0;

    return (
        <div className="relative group">
            <input
                {...props}
                value={value}
                onFocus={(e) => {
                    setIsFocused(true);
                    props.onFocus?.(e);
                }}
                onBlur={(e) => {
                    setIsFocused(false);
                    props.onBlur?.(e);
                }}
                className={cn(
                    "w-full h-14 bg-[#1C1C1C] border rounded px-4 text-white text-base focus:outline-none transition-all duration-300 pt-4",
                    error
                        ? "border-red-500 focus:border-red-500 focus:shadow-[0_0_15px_rgba(239,68,68,0.2)]"
                        : "border-white/20 focus:border-luxury-gold focus:shadow-[0_0_15px_rgba(212,175,55,0.2)]",
                    className
                )}
            />
            <label
                className={cn(
                    "absolute left-4 transition-all duration-200 pointer-events-none text-luxury-silver",
                    isFocused || hasValue
                        ? "top-2 text-xs text-luxury-gold"
                        : "top-4 text-base"
                )}
            >
                {label}
            </label>

            {/* Validation Icon */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
                {error ? (
                    <AlertCircle className="w-5 h-5 text-red-500 animate-pulse" />
                ) : hasValue && !error ? (
                    <Check className="w-5 h-5 text-green-400" />
                ) : null}
            </div>

            {error && (
                <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-xs mt-1 absolute -bottom-5 left-0"
                >
                    {error}
                </motion.p>
            )}
        </div>
    );
}
