"use client";

import React, { useState } from "react";
import { Plus, MapPin, Edit2, Trash2, Check } from "lucide-react";
import { motion } from "framer-motion";

const addresses = [
    { id: 1, type: "Home", name: "Rahul Kumar", phone: "+91 98765 43210", address: "123 Innovation Drive, Tech Park", city: "Bangalore", state: "KA", zip: "560103", isDefault: true },
    { id: 2, type: "Work", name: "Rahul Kumar", phone: "+91 98765 43210", address: "456 Corporate Ave, Business Hub", city: "Bangalore", state: "KA", zip: "560100", isDefault: false },
];

export default function AddressesPage() {
    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="font-heading font-bold text-3xl text-white mb-2">My Addresses</h1>
                    <p className="text-luxury-silver">Manage your shipping locations.</p>
                </div>
                <button className="bg-luxury-gold text-black px-6 py-3 rounded font-bold hover:brightness-110 flex items-center gap-2 transition-all">
                    <Plus className="w-5 h-5" /> Add New Address
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {addresses.map((addr) => (
                    <motion.div
                        key={addr.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-[#1C1C1C] border border-white/5 rounded-lg p-6 relative group hover:border-luxury-gold/30 transition-all"
                    >
                        {addr.isDefault && (
                            <span className="absolute top-4 right-4 text-[10px] font-bold bg-luxury-gold/20 text-luxury-gold px-2 py-0.5 rounded-full flex items-center gap-1">
                                <Check className="w-3 h-3" /> Default
                            </span>
                        )}

                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                                <MapPin className="w-4 h-4 text-luxury-silver" />
                            </div>
                            <span className="font-bold text-white uppercase tracking-wide">{addr.type}</span>
                        </div>

                        <div className="space-y-1 text-sm text-gray-400 mb-6">
                            <p className="text-white font-medium">{addr.name}</p>
                            <p>{addr.address}</p>
                            <p>{addr.city}, {addr.state} - {addr.zip}</p>
                            <p className="mt-2 text-white/50">{addr.phone}</p>
                        </div>

                        <div className="flex gap-4 pt-4 border-t border-white/5">
                            <button className="text-sm font-medium text-white hover:text-luxury-gold flex items-center gap-2 transition-colors">
                                <Edit2 className="w-3 h-3" /> Edit
                            </button>
                            <button className="text-sm font-medium text-white hover:text-red-500 flex items-center gap-2 transition-colors">
                                <Trash2 className="w-3 h-3" /> Delete
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
