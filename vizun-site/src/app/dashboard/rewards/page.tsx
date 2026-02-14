"use client";

import React from "react";
import { motion } from "framer-motion";
import { Trophy, Gift, Share2, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

const currentPoints = 470;
const nextTierPoints = 1000;
const progress = (currentPoints / nextTierPoints) * 100;

export default function RewardsPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="font-heading font-bold text-3xl text-white mb-2">Rewards & Loyalty</h1>
                <p className="text-luxury-silver">Earn points and redeem exclusive rewards.</p>
            </div>

            {/* Points Banner */}
            <div className="bg-linear-to-r from-[#1C1C1C] to-black border border-luxury-gold/30 rounded-xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-luxury-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <Trophy className="w-6 h-6 text-luxury-gold" />
                            <span className="text-luxury-gold font-bold uppercase tracking-widest text-sm">Silver Member</span>
                        </div>
                        <h2 className="text-5xl md:text-6xl font-heading font-bold text-white mb-2">{currentPoints}</h2>
                        <p className="text-gray-400">Total Reward Points</p>
                    </div>

                    <div className="w-full md:w-1/2">
                        <div className="flex justify-between text-xs font-bold text-gray-400 mb-2">
                            <span>Silver</span>
                            <span className="text-luxury-gold">Gold ({nextTierPoints} pts)</span>
                        </div>
                        <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className="h-full bg-linear-to-r from-luxury-gold to-yellow-200"
                            />
                        </div>
                        <p className="text-right text-xs text-white mt-2">
                            Earn {nextTierPoints - currentPoints} more points to reach Gold tier
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Referral */}
                <div className="bg-[#1C1C1C] border border-white/5 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <Share2 className="w-5 h-5 text-luxury-rose" /> Refer a Friend
                    </h3>
                    <p className="text-gray-400 mb-6 text-sm">
                        Share your code with friends. They get ₹500 off their first order, and you get 500 points!
                    </p>

                    <div className="flex gap-4">
                        <div className="flex-1 bg-black border border-white/10 rounded px-4 py-3 text-white font-mono tracking-widest text-center">
                            RAHUL10
                        </div>
                        <button className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded transition-colors" title="Copy Code">
                            <Copy className="w-5 h-5" />
                        </button>
                        <button className="px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded transition-colors font-bold">
                            WhatsApp
                        </button>
                    </div>
                </div>

                {/* Ways to Earn */}
                <div className="bg-[#1C1C1C] border border-white/5 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <Gift className="w-5 h-5 text-blue-400" /> Ways to Redeem
                    </h3>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-white/5 rounded">
                            <span className="text-white text-sm">₹50 Off Voucher</span>
                            <button className="text-luxury-gold text-xs font-bold uppercase hover:underline">Redeem (500 pts)</button>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-white/5 rounded">
                            <span className="text-white text-sm">Free Shipping</span>
                            <button className="text-gray-500 text-xs font-bold uppercase cursor-not-allowed">Redeem (800 pts)</button>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-white/5 rounded">
                            <span className="text-white text-sm">₹100 Off Voucher</span>
                            <button className="text-gray-500 text-xs font-bold uppercase cursor-not-allowed">Redeem (1000 pts)</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
