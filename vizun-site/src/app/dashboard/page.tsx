"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShoppingBag, CreditCard, Heart, Star, ArrowRight, Package, Clock, Truck } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const stats = [
    { label: "Total Orders", value: "12", icon: ShoppingBag, color: "text-blue-400" },
    { label: "Total Spent", value: "₹5.2k", icon: CreditCard, color: "text-green-400" },
    { label: "Wishlist", value: "3", icon: Heart, color: "text-rose-400" },
    { label: "Reward Points", value: "470", icon: Star, color: "text-luxury-gold" },
];

const recentOrders = [
    {
        id: "FT24001",
        date: "Jan 15, 2025",
        total: "₹2,999",
        status: "Delivered",
        items: ["Oversized Bomber Jacket"],
        image: "https://images.unsplash.com/photo-1551028919-ac66e624eca1?q=80&w=200&auto=format&fit=crop"
    },
    {
        id: "FT23098",
        date: "Dec 28, 2024",
        total: "₹5,499",
        status: "Shipped",
        items: ["Cyberpunk Cargo Pants", "Tech Runner V2"],
        image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=200&auto=format&fit=crop"
    }
];

export default function DashboardPage() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12"
        >
            {/* Welcome Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="font-heading font-bold text-3xl md:text-4xl text-white mb-2">
                        Welcome back, Rahul! 👋
                    </h1>
                    <p className="text-luxury-silver">Your latest stats and updates.</p>
                </div>
                <div className="text-sm text-gray-500">
                    Last login: 2 hours ago
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-[#1C1C1C]/60 backdrop-blur border border-white/5 rounded-xl p-6 hover:border-luxury-gold/30 hover:-translate-y-1 transition-all duration-300 group"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-luxury-silver text-sm font-medium">{stat.label}</span>
                                <Icon className={cn("w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity", stat.color)} />
                            </div>
                            <h3 className={cn("font-heading font-bold text-3xl text-white group-hover:text-luxury-gold transition-colors")}>
                                {stat.value}
                            </h3>
                        </motion.div>
                    );
                })}
            </div>

            {/* Recent Orders */}
            <div>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="font-heading font-bold text-2xl text-white">Recent Orders</h2>
                    <Link href="/dashboard/orders" className="text-luxury-gold text-sm font-medium hover:underline flex items-center gap-1">
                        View All <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="space-y-4">
                    {recentOrders.map((order, index) => {
                        const statusColor = order.status === "Delivered" ? "bg-green-500/20 text-green-400" : "bg-blue-500/20 text-blue-400";

                        return (
                            <motion.div
                                key={order.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 + index * 0.1 }}
                                className="bg-[#1C1C1C] border border-white/5 rounded-lg p-5 flex flex-col md:flex-row items-center gap-6 hover:border-luxury-gold/20 transition-colors"
                            >
                                {/* Product Image Preview */}
                                <div className="w-full md:w-20 h-20 bg-black rounded-lg overflow-hidden shrink-0 relative">
                                    <img src={order.image} alt="Order item" className="w-full h-full object-cover" />
                                </div>

                                {/* Order Details */}
                                <div className="flex-1 w-full text-center md:text-left">
                                    <div className="flex flex-col md:flex-row md:items-center gap-2 mb-1">
                                        <h3 className="font-bold text-white text-lg">{order.id}</h3>
                                        <span className={cn("text-xs font-bold px-2 py-0.5 rounded-full w-fit mx-auto md:mx-0", statusColor)}>
                                            {order.status}
                                        </span>
                                    </div>
                                    <p className="text-gray-500 text-sm mb-1">{order.date}</p>
                                    <p className="text-white text-sm truncate max-w-md mx-auto md:mx-0">
                                        {order.items.join(", ")} {order.items.length > 1 && `+ ${order.items.length - 1} more`}
                                    </p>
                                </div>

                                {/* Pricing */}
                                <div className="text-xl font-bold text-luxury-rose shrink-0">
                                    {order.total}
                                </div>

                                {/* Actions */}
                                <div className="flex gap-3 w-full md:w-auto justify-center">
                                    <button className="flex-1 md:flex-none px-4 py-2 border border-white/20 rounded text-sm text-white hover:bg-white/5 transition-colors">
                                        Track
                                    </button>
                                    <button className="flex-1 md:flex-none px-4 py-2 bg-white text-black font-bold rounded text-sm hover:bg-gray-200 transition-colors">
                                        View Details
                                    </button>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </motion.div>
    );
}
