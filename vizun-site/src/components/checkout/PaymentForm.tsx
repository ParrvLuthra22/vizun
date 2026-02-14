"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, Wallet, Smartphone, Banknote, Loader2, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaymentFormProps {
    onComplete: () => void;
}

const paymentMethods = [
    { id: "upi", label: "UPI", icon: Smartphone, description: "Google Pay, PhonePe, Paytm" },
    { id: "card", label: "Credit / Debit Card", icon: CreditCard, description: "Visa, Mastercard, RuPay" },
    { id: "wallet", label: "Wallets", icon: Wallet, description: "Paytm Wallet, Amazon Pay" },
    { id: "cod", label: "Cash on Delivery", icon: Banknote, description: "Pay via cash or UPI on delivery" },
];

export default function PaymentForm({ onComplete }: PaymentFormProps) {
    const [selectedMethod, setSelectedMethod] = useState("upi");
    const [isProcessing, setIsProcessing] = useState(false);

    const handlePlaceOrder = () => {
        setIsProcessing(true);
        // Simulate payment processing
        setTimeout(() => {
            setIsProcessing(false);
            onComplete();
        }, 2500);
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-8"
        >
            <div className="mb-8">
                <h2 className="font-heading font-bold text-3xl text-white mb-2">Payment Method</h2>
                <p className="text-luxury-silver text-sm">Secure, encrypted transaction</p>
            </div>

            <div className="space-y-4">
                {paymentMethods.map((method) => {
                    const Icon = method.icon;
                    const isSelected = selectedMethod === method.id;

                    return (
                        <div
                            key={method.id}
                            onClick={() => setSelectedMethod(method.id)}
                            className={cn(
                                "relative border rounded-lg p-5 cursor-pointer transition-all duration-300",
                                isSelected
                                    ? "bg-[#1C1C1C] border-luxury-gold shadow-[0_0_15px_rgba(212,175,55,0.1)]"
                                    : "bg-[#1C1C1C]/50 border-white/10 hover:border-white/30"
                            )}
                        >
                            <div className="flex items-center gap-4">
                                <div className={cn(
                                    "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0",
                                    isSelected ? "border-luxury-gold" : "border-gray-500"
                                )}>
                                    {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-luxury-gold" />}
                                </div>

                                <div className={cn(
                                    "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                                    isSelected ? "bg-luxury-gold/10 text-luxury-gold" : "bg-black text-gray-400"
                                )}>
                                    <Icon className="w-5 h-5" />
                                </div>

                                <div>
                                    <h3 className={cn("font-bold text-sm", isSelected ? "text-white" : "text-gray-400")}>{method.label}</h3>
                                    <p className="text-xs text-gray-500">{method.description}</p>
                                </div>
                            </div>

                            {/* Expandable Content Placeholder */}
                            {isSelected && method.id === 'card' && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="mt-4 pl-14 grid gap-4 pr-4"
                                >
                                    <input placeholder="Card Number" className="w-full bg-black border border-white/20 rounded p-3 text-white text-sm" />
                                    <div className="flex gap-4">
                                        <input placeholder="MM/YY" className="flex-1 bg-black border border-white/20 rounded p-3 text-white text-sm" />
                                        <input placeholder="CVV" className="w-24 bg-black border border-white/20 rounded p-3 text-white text-sm" />
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    );
                })}
            </div>

            <button
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className={cn(
                    "w-full h-16 mt-8 bg-luxury-gold text-black font-heading font-bold text-lg uppercase tracking-wide rounded transition-all flex items-center justify-center gap-2",
                    isProcessing ? "cursor-not-allowed opacity-80" : "hover:brightness-110 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:scale-[1.02]"
                )}
            >
                {isProcessing ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Processing Payment...
                    </>
                ) : (
                    <>
                        PLACE ORDER
                        <Check className="w-5 h-5" />
                    </>
                )}
            </button>

            <p className="text-center text-xs text-gray-500 mt-4 flex items-center justify-center gap-1">
                <Lock className="w-3 h-3" />
                Payments are 256-bit SSL Encrypted
            </p>
        </motion.div>
    );
}

// Helper for security icon
import { Lock } from "lucide-react";
