"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Save, User, Lock, Bell, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "security", label: "Security", icon: Lock },
    { id: "preferences", label: "Preferences", icon: Bell },
];

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState("personal");

    return (
        <div className="space-y-8">
            <div>
                <h1 className="font-heading font-bold text-3xl text-white mb-2">Profile Settings</h1>
                <p className="text-luxury-silver">Manage your account details and preferences.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Settings Sidebar */}
                <div className="w-full lg:w-64 space-y-2">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={cn(
                                    "w-full flex items-center gap-3 px-4 py-3 rounded text-sm font-medium transition-all",
                                    activeTab === tab.id
                                        ? "bg-luxury-gold text-black font-bold"
                                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                                )}
                            >
                                <Icon className="w-4 h-4" />
                                {tab.label}
                            </button>
                        );
                    })}

                    <div className="pt-4 mt-4 border-t border-white/5">
                        <button className="w-full flex items-center gap-3 px-4 py-3 rounded text-sm font-medium text-red-500 hover:bg-red-500/10 transition-all">
                            <Trash2 className="w-4 h-4" />
                            Delete Account
                        </button>
                    </div>
                </div>

                {/* Settings Content */}
                <div className="flex-1 bg-[#1C1C1C] border border-white/5 rounded-lg p-6 lg:p-8">
                    <AnimatePresence mode="wait">
                        {activeTab === "personal" && (
                            <motion.div
                                key="personal"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <h2 className="font-bold text-xl text-white mb-6">Personal Information</h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <InputField label="First Name" defaultValue="Rahul" />
                                    <InputField label="Last Name" defaultValue="Kumar" />
                                    <InputField label="Email Address" defaultValue="rahul@example.com" type="email" />
                                    <InputField label="Phone Number" defaultValue="+91 98765 43210" />
                                </div>

                                <div className="pt-4">
                                    <button className="px-8 py-3 bg-luxury-gold text-black font-bold rounded hover:brightness-110 flex items-center gap-2 transition-all">
                                        <Save className="w-4 h-4" /> Save Changes
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === "security" && (
                            <motion.div
                                key="security"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <h2 className="font-bold text-xl text-white mb-6">Change Password</h2>

                                <div className="space-y-4 max-w-md">
                                    <InputField label="Current Password" type="password" />
                                    <InputField label="New Password" type="password" />
                                    <InputField label="Confirm New Password" type="password" />
                                </div>

                                <div className="pt-4">
                                    <button className="px-8 py-3 bg-luxury-gold text-black font-bold rounded hover:brightness-110 flex items-center gap-2 transition-all">
                                        <Save className="w-4 h-4" /> Update Password
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

function InputField({ label, ...props }: any) {
    return (
        <div className="space-y-2">
            <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">{label}</label>
            <input
                {...props}
                className="w-full h-12 bg-black border border-white/10 rounded px-4 text-white focus:border-luxury-gold focus:outline-none transition-colors"
            />
        </div>
    );
}
