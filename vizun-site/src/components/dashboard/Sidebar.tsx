"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Package,
    Heart,
    MapPin,
    CreditCard,
    User,
    Gift,
    LogOut,
    Camera
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: Package, label: "Orders", href: "/dashboard/orders" },
    { icon: Heart, label: "Wishlist", href: "/dashboard/wishlist" },
    { icon: MapPin, label: "Addresses", href: "/dashboard/addresses" },
    { icon: CreditCard, label: "Payment Methods", href: "/dashboard/payment-methods" },
    { icon: User, label: "Profile", href: "/dashboard/profile" },
    { icon: Gift, label: "Rewards", href: "/dashboard/rewards" },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="w-full h-full min-h-screen bg-[#1C1C1C] border-r border-white/10 flex flex-col fixed left-0 top-0 pt-24 z-10 hidden lg:flex lg:w-[280px]">
            {/* Profile Section */}
            <div className="flex flex-col items-center p-8 border-b border-white/5">
                <div className="relative group cursor-pointer mb-4">
                    <div className="w-[80px] h-[80px] rounded-full border-2 border-luxury-gold overflow-hidden transition-transform duration-300 group-hover:scale-105">
                        <img
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=150&h=150"
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 bg-luxury-gold rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Camera className="w-4 h-4 text-black" />
                    </div>
                </div>
                <h3 className="font-heading font-bold text-xl text-white mb-1">Rahul Kumar</h3>
                <p className="text-luxury-silver text-xs">rahul@email.com</p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-6 space-y-1">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "relative flex items-center gap-4 px-6 py-4 transition-all duration-200 group",
                                isActive
                                    ? "text-luxury-gold bg-[#D4AF37]/10"
                                    : "text-luxury-silver hover:bg-white/5 hover:text-white"
                            )}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="activeNavIndicator"
                                    className="absolute left-0 top-0 bottom-0 w-1 bg-luxury-gold"
                                />
                            )}
                            <Icon className={cn("w-5 h-5", isActive ? "text-luxury-gold" : "text-gray-400 group-hover:text-white")} />
                            <span className="font-medium text-sm">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Logout */}
            <div className="p-6 border-t border-white/5">
                <button className="flex items-center gap-4 text-red-400 hover:text-red-300 transition-colors w-full px-6 py-3 rounded hover:bg-red-500/10">
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium text-sm">Logout</span>
                </button>
            </div>
        </div>
    );
}
