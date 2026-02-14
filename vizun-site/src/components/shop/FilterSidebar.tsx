"use client";

import React, { useState } from "react";
import { ChevronDown, Check, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import RangeSlider from "../ui/RangeSlider";
import { cn } from "@/lib/utils";

const categories = ["Jackets", "Jeans", "Tees", "Hoodies", "Accessories"];
const sizes = ["S", "M", "L", "XL", "XXL"];
const colors = ["#0A0A0A", "#FFFFFF", "#1C1C1C", "#D4AF37", "#B76E79", "#0000FF", "#FF0000", "#00FF00"];

export default function FilterSidebar() {
    const [priceRange, setPriceRange] = useState<[number, number]>([500, 5000]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);

    const [sections, setSections] = useState({
        category: true,
        price: true,
        size: true,
        color: true,
    });

    const toggleSection = (section: keyof typeof sections) => {
        setSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const toggleCategory = (category: string) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    const toggleSize = (size: string) => {
        setSelectedSizes(prev =>
            prev.includes(size)
                ? prev.filter(s => s !== size)
                : [...prev, size]
        );
    };

    return (
        <aside className="w-[280px] flex-shrink-0 hidden lg:block sticky top-24 h-[calc(100vh-100px)] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-luxury-gold/20">
            <div className="bg-[#1C1C1C]/60 backdrop-blur-md border-r border-luxury-silver/10 p-6 rounded-lg">
                <h3 className="font-heading font-bold text-xl mb-6 text-white">Filters</h3>

                {/* Active Filters Pills */}
                {(selectedCategories.length > 0 || selectedSizes.length > 0 || selectedColor || priceRange[0] !== 500 || priceRange[1] !== 5000) && (
                    <div className="flex flex-wrap gap-2 mb-6">
                        {[...selectedCategories, ...selectedSizes].map(filter => (
                            <span key={filter} className="text-xs bg-luxury-charcoal text-white border border-luxury-silver/30 px-2 py-1 rounded flex items-center gap-1 animate-fadeIn">
                                {filter} <X className="w-3 h-3 cursor-pointer hover:text-luxury-rose" />
                            </span>
                        ))}
                        <button
                            onClick={() => {
                                setSelectedCategories([]);
                                setSelectedSizes([]);
                                setSelectedColor(null);
                                setPriceRange([500, 5000]);
                            }}
                            className="text-xs text-luxury-rose hover:text-white underline ml-auto"
                        >
                            Clear All
                        </button>
                    </div>
                )}

                {/* Category */}
                <div className="mb-6 border-b border-white/5 pb-6">
                    <button
                        onClick={() => toggleSection("category")}
                        className="w-full flex items-center justify-between text-white font-medium mb-4 hover:text-luxury-gold transition-colors"
                    >
                        CATEGORY
                        <ChevronDown className={cn("w-4 h-4 transition-transform", sections.category && "rotate-180")} />
                    </button>
                    <AnimatePresence>
                        {sections.category && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden space-y-3"
                            >
                                {categories.map(cat => (
                                    <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                                        <div className={cn(
                                            "w-5 h-5 border transition-all duration-300 flex items-center justify-center",
                                            selectedCategories.includes(cat)
                                                ? "bg-luxury-rose border-luxury-rose"
                                                : "border-luxury-silver/50 group-hover:border-luxury-gold"
                                        )}>
                                            {selectedCategories.includes(cat) && <Check className="w-3 h-3 text-white" />}
                                        </div>
                                        <input
                                            type="checkbox"
                                            className="hidden"
                                            checked={selectedCategories.includes(cat)}
                                            onChange={() => toggleCategory(cat)}
                                        />
                                        <span className={cn(
                                            "text-sm group-hover:text-white transition-colors",
                                            selectedCategories.includes(cat) ? "text-white" : "text-gray-400"
                                        )}>{cat}</span>
                                    </label>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Price */}
                <div className="mb-6 border-b border-white/5 pb-6">
                    <button
                        onClick={() => toggleSection("price")}
                        className="w-full flex items-center justify-between text-white font-medium mb-4 hover:text-luxury-gold transition-colors"
                    >
                        PRICE
                        <ChevronDown className={cn("w-4 h-4 transition-transform", sections.price && "rotate-180")} />
                    </button>
                    <AnimatePresence>
                        {sections.price && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden px-1 py-2"
                            >
                                <div className="flex justify-between text-xs text-luxury-gold font-bold mb-4">
                                    <span>₹{priceRange[0]}</span>
                                    <span>₹{priceRange[1]}</span>
                                </div>
                                <RangeSlider
                                    min={500}
                                    max={5000}
                                    step={100}
                                    value={priceRange}
                                    onValueChange={setPriceRange}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Size */}
                <div className="mb-6 border-b border-white/5 pb-6">
                    <button
                        onClick={() => toggleSection("size")}
                        className="w-full flex items-center justify-between text-white font-medium mb-4 hover:text-luxury-gold transition-colors"
                    >
                        SIZE
                        <ChevronDown className={cn("w-4 h-4 transition-transform", sections.size && "rotate-180")} />
                    </button>
                    <AnimatePresence>
                        {sections.size && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden flex flex-wrap gap-2"
                            >
                                {sizes.map(size => (
                                    <button
                                        key={size}
                                        onClick={() => toggleSize(size)}
                                        className={cn(
                                            "w-10 h-10 rounded border text-sm font-medium transition-all duration-300 flex items-center justify-center",
                                            selectedSizes.includes(size)
                                                ? "bg-luxury-gold border-luxury-gold text-black shadow-[0_0_10px_rgba(212,175,55,0.4)] scale-105"
                                                : "bg-luxury-charcoal border-white/10 text-gray-400 hover:border-luxury-gold/50 hover:text-white"
                                        )}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Color */}
                <div className="mb-6">
                    <button
                        onClick={() => toggleSection("color")}
                        className="w-full flex items-center justify-between text-white font-medium mb-4 hover:text-luxury-gold transition-colors"
                    >
                        COLOR
                        <ChevronDown className={cn("w-4 h-4 transition-transform", sections.color && "rotate-180")} />
                    </button>
                    <AnimatePresence>
                        {sections.color && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden flex flex-wrap gap-3"
                            >
                                {colors.map(color => (
                                    <button
                                        key={color}
                                        onClick={() => setSelectedColor(color === selectedColor ? null : color)}
                                        className={cn(
                                            "w-8 h-8 rounded-full border border-white/10 transition-all duration-300 relative",
                                            selectedColor === color && "ring-2 ring-luxury-gold ring-offset-2 ring-offset-luxury-black scale-110"
                                        )}
                                        style={{ backgroundColor: color }}
                                    />
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

            </div>
        </aside>
    );
}
