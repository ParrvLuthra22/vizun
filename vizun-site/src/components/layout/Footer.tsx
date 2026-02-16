"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    Instagram,
    Twitter,
    Youtube,
    ArrowRight,
    Check,
    CreditCard,
    Heart,
    Globe
} from "lucide-react";
import { cn } from "@/lib/utils";

const footerLinks = {
    shop: [
        { label: "New Arrivals", href: "/shop" },
        { label: "Men", href: "/shop" },
        { label: "Women", href: "/shop" },
        { label: "Kids", href: "/shop" },
        { label: "Sale", href: "/shop" },
    ],
    help: [
        { label: "FAQ", href: "/faq" },
        { label: "Contact Us", href: "/contact" },
        { label: "Shipping Info", href: "/shipping" },
        { label: "Returns & Exchanges", href: "/returns" },
        { label: "Size Guide", href: "/size-guide" },
    ],
    company: [
        { label: "About Us", href: "/about" },
        { label: "Careers", href: "/careers" },
        { label: "Press", href: "/press" },
        { label: "Sustainability", href: "/sustainability" },
        { label: "Affiliate Program", href: "/affiliate" },
    ],
    legal: [
        { label: "Terms of Service", href: "/terms" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Cookie Policy", href: "/cookies" },
        { label: "Accessibility", href: "/accessibility" },
    ],
};

const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Youtube, href: "#", label: "YouTube" },
];

export default function Footer() {
    const [email, setEmail] = useState("");
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setIsSubscribed(true);
            setTimeout(() => {
                setEmail("");
                setIsSubscribed(false);
            }, 3000);
        }
    };

    return (
        <footer className="w-full bg-black text-white relative z-10">
            {/* Newsletter Section */}
            <div className="bg-linear-to-b from-[#1C1C1C] to-black py-20 px-4">
                <div className="max-w-4xl mx-auto text-center space-y-6">
                    <div>
                        <h2 className="font-heading font-bold text-3xl md:text-5xl mb-3 drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                            Stay Connected
                        </h2>
                        <p className="text-luxury-silver text-sm md:text-base">
                            Get exclusive drops and 10% off your first order
                        </p>
                    </div>

                    <form onSubmit={handleSubscribe} className="relative max-w-lg mx-auto">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            disabled={isSubscribed}
                            className="w-full h-14 bg-[#1C1C1C]/60 border border-white/10 rounded-full px-6 pr-40 text-white placeholder:text-gray-500 focus:outline-none focus:border-luxury-gold focus:shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-all"
                        />
                        <button
                            type="submit"
                            disabled={isSubscribed}
                            className={cn(
                                "absolute right-1 top-1 bottom-1 px-6 rounded-full font-bold text-sm transition-all flex items-center gap-2",
                                isSubscribed
                                    ? "bg-green-500 text-white"
                                    : "bg-linear-to-r from-luxury-rose to-luxury-gold text-white hover:brightness-110 hover:pr-8"
                            )}
                        >
                            {isSubscribed ? (
                                <>Subscribed <Check className="w-4 h-4" /></>
                            ) : (
                                <>SUBSCRIBE <ArrowRight className="w-4 h-4" /></>
                            )}
                        </button>
                    </form>

                    {isSubscribed && (
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-green-400 text-sm font-medium"
                        >
                            Success! You are on the list.
                        </motion.p>
                    )}
                </div>
            </div>

            {/* Main Footer Links */}
            <div className="max-w-7xl mx-auto py-16 px-4 md:px-8">
                {/* Golden Divider */}
                <div className="h-px w-3/4 mx-auto bg-linear-to-r from-transparent via-luxury-gold to-transparent opacity-50 mb-16" />

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 gap-y-16 mb-20">
                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category}>
                            <h3 className="font-heading font-bold text-white uppercase tracking-widest text-sm mb-6">
                                {category}
                            </h3>
                            <ul className="space-y-4">
                                {links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-luxury-silver text-sm hover:text-luxury-gold hover:pl-1 transition-all duration-300 block"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Social & Payment */}
                <div className="flex flex-col items-center gap-12">
                    <div>
                        <h3 className="text-center font-heading font-bold text-white mb-6">Follow Us</h3>
                        <div className="flex gap-6">
                            {socialLinks.map((social) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-luxury-silver hover:bg-luxury-gold hover:border-luxury-gold hover:text-black hover:scale-110 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300"
                                    >
                                        <Icon className="w-5 h-5" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-center text-xs text-luxury-silver uppercase tracking-widest mb-4">We Accept</h3>
                        <div className="flex gap-4 opacity-50 hover:opacity-100 transition-opacity duration-300">
                            <CreditCard className="w-10 h-8 text-white" />
                            {/* Using placeholder divs/icons for specific logos since using Lucide */}
                            <div className="w-12 h-8 border border-white/20 rounded flex items-center justify-center text-[10px] text-white font-bold">VISA</div>
                            <div className="w-12 h-8 border border-white/20 rounded flex items-center justify-center text-[10px] text-white font-bold">UPI</div>
                            <div className="w-12 h-8 border border-white/20 rounded flex items-center justify-center text-[10px] text-white font-bold">COD</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="bg-[#1C1C1C] border-t border-white/10 py-6 px-4">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-access-silver">
                    <p>&copy; 2026 VIZUN. All rights reserved.</p>

                    <div className="flex items-center gap-2 border border-white/10 rounded px-3 py-1 cursor-pointer hover:bg-white/5">
                        <Globe className="w-3 h-3" />
                        <span>English (IN)</span>
                    </div>

                    <p className="flex items-center gap-1 group">
                        made by Parrv
                    </p>
                </div>
            </div>
        </footer>
    );
}
