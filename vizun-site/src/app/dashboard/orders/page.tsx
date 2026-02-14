"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, ChevronUp, Package, Truck, CheckCircle2, Circle, Download } from "lucide-react";
import { cn } from "@/lib/utils";

const orders = [
    {
        id: "FT24001",
        date: "Jan 15, 2025",
        total: "₹2,999",
        status: "Delivered",
        deliveredDate: "Jan 18, 2025",
        items: [
            { name: "Oversized Bomber Jacket", price: "₹2,999", quantity: 1, image: "https://images.unsplash.com/photo-1551028919-ac66e624eca1?q=80&w=200&auto=format&fit=crop" }
        ],
        timeline: [
            { status: "Ordered", date: "Jan 15", completed: true },
            { status: "Packed", date: "Jan 16", completed: true },
            { status: "Shipped", date: "Jan 17", completed: true },
            { status: "Delivered", date: "Jan 18", completed: true },
        ]
    },
    {
        id: "FT23098",
        date: "Dec 28, 2024",
        total: "₹5,499",
        status: "Shipped",
        items: [
            { name: "Cyberpunk Cargo Pants", price: "₹3,499", quantity: 1, image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=200&auto=format&fit=crop" },
            { name: "Tech Runner V2", price: "₹2,000", quantity: 1, image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=200&auto=format&fit=crop" }
        ],
        timeline: [
            { status: "Ordered", date: "Dec 28", completed: true },
            { status: "Packed", date: "Dec 29", completed: true },
            { status: "Shipped", date: "Dec 30", completed: true },
            { status: "Delivered", date: "Expected Jan 2", completed: false },
        ]
    }
];

const tabs = ["All", "Pending", "Shipped", "Delivered"];

export default function OrdersPage() {
    const [activeTab, setActiveTab] = useState("All");
    const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

    const filteredOrders = activeTab === "All"
        ? orders
        : orders.filter(order => order.status === activeTab);

    const toggleOrder = (id: string) => {
        setExpandedOrder(expandedOrder === id ? null : id);
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="font-heading font-bold text-3xl text-white mb-2">My Orders</h1>
                <p className="text-luxury-silver">Track and manage your recent purchases.</p>
            </div>

            {/* Tabs */}
            <div className="flex gap-8 border-b border-white/10 pb-1 overflow-x-auto">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={cn(
                            "pb-4 text-sm font-medium transition-colors relative whitespace-nowrap",
                            activeTab === tab ? "text-luxury-gold" : "text-gray-400 hover:text-white"
                        )}
                    >
                        {tab}
                        {activeTab === tab && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-luxury-gold"
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* Orders List */}
            <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                    {filteredOrders.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20 bg-[#1C1C1C] rounded-lg border border-white/5"
                        >
                            <Package className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                            <p className="text-gray-400">No orders found in this category.</p>
                        </motion.div>
                    ) : (
                        filteredOrders.map((order) => (
                            <motion.div
                                key={order.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className={cn(
                                    "bg-[#1C1C1C] border rounded-lg overflow-hidden transition-all duration-300",
                                    expandedOrder === order.id ? "border-luxury-gold/30" : "border-white/5 hover:border-luxury-gold/20"
                                )}
                            >
                                {/* Order Header Summary */}
                                <div
                                    onClick={() => toggleOrder(order.id)}
                                    className="p-6 cursor-pointer flex flex-col md:flex-row md:items-center gap-4 justify-between"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center border border-white/5">
                                            <Package className="w-6 h-6 text-luxury-gold" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3">
                                                <h3 className="font-bold text-white text-lg">{order.id}</h3>
                                                <span className={cn(
                                                    "text-xs font-bold px-2 py-0.5 rounded-full",
                                                    order.status === "Delivered" ? "bg-green-500/20 text-green-400" : "bg-blue-500/20 text-blue-400"
                                                )}>
                                                    {order.status}
                                                </span>
                                            </div>
                                            <p className="text-luxury-silver text-sm">Placed on {order.date}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-6">
                                        <div className="text-right hidden md:block">
                                            <p className="text-xs text-gray-500">Total Amount</p>
                                            <p className="font-bold text-luxury-rose">{order.total}</p>
                                        </div>
                                        <div className={cn("transition-transform duration-300", expandedOrder === order.id ? "rotate-180" : "")}>
                                            <ChevronDown className="w-5 h-5 text-gray-400" />
                                        </div>
                                    </div>
                                </div>

                                {/* Expanded Details */}
                                <AnimatePresence>
                                    {expandedOrder === order.id && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="border-t border-white/5 bg-[#161616]"
                                        >
                                            <div className="p-6 space-y-8">
                                                {/* Timeline */}
                                                <div className="relative flex justify-between max-w-2xl mx-auto">
                                                    {/* Connecting Line */}
                                                    <div className="absolute top-3 left-0 right-0 h-0.5 bg-white/10 -z-0" />

                                                    {order.timeline.map((step, idx) => (
                                                        <div key={idx} className="relative z-10 flex flex-col items-center gap-2">
                                                            <div className={cn(
                                                                "w-6 h-6 rounded-full flex items-center justify-center border-2 transition-colors",
                                                                step.completed ? "bg-luxury-gold border-luxury-gold" : "bg-[#1C1C1C] border-gray-600"
                                                            )}>
                                                                {step.completed && <CheckCircle2 className="w-3 h-3 text-black" />}
                                                            </div>
                                                            <div className="text-center">
                                                                <p className={cn("text-xs font-bold", step.completed ? "text-luxury-gold" : "text-gray-500")}>{step.status}</p>
                                                                <p className="text-[10px] text-gray-500">{step.date}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* Order Items */}
                                                <div className="bg-[#1C1C1C] rounded border border-white/5 p-4">
                                                    {order.items.map((item, idx) => (
                                                        <div key={idx} className="flex gap-4 py-4 first:pt-0 last:pb-0 border-b border-white/5 last:border-0">
                                                            <div className="w-16 h-16 bg-black rounded overflow-hidden shrink-0">
                                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                            </div>
                                                            <div className="flex-1">
                                                                <h4 className="text-white font-medium">{item.name}</h4>
                                                                <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                                                            </div>
                                                            <div className="text-white font-bold">{item.price}</div>
                                                        </div>
                                                    ))}

                                                    <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
                                                        <button className="flex items-center gap-2 text-luxury-gold text-sm hover:underline">
                                                            <Download className="w-4 h-4" /> Download Invoice
                                                        </button>
                                                        <div className="text-right">
                                                            <p className="text-xl font-bold text-white">{order.total}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Actions */}
                                                <div className="flex gap-4 justify-end">
                                                    <button className="px-6 py-2 border border-white/20 rounded text-sm text-white hover:bg-white/5 transition-colors">
                                                        Rate & Review
                                                    </button>
                                                    <button className="px-6 py-2 bg-white text-black font-bold rounded text-sm hover:bg-gray-200 transition-colors">
                                                        Reorder
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
