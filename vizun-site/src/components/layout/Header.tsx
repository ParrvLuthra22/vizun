"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Container from "../ui/Container";

// Placeholder icons (replace with Lucide or preferred icon set later)
const ShoppingBagIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
);

const UserIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);

const SearchIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
    </svg>
);

const navLinks = [
    { name: "New Arrivals", href: "/new-arrivals" },
    { name: "Clothing", href: "/clothing" },
    { name: "Accessories", href: "/accessories" },
    { name: "Collections", href: "/collections" },
    { name: "Editorial", href: "/editorial" },
];

export default function Header() {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }

        if (latest > 50) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    });

    return (
        <motion.header
            variants={{
                visible: { y: 0 },
                hidden: { y: "-100%" },
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${scrolled ? "bg-luxury-white/90 backdrop-blur-md border-b border-gray-100" : "bg-transparent text-white"
                }`}
        >
            <Container>
                <div className="flex items-center justify-between h-20">
                    {/* Mobile Menu Button (Placeholder) */}
                    <div className="md:hidden">
                        <button className="p-2">
                            <span className="sr-only">Menu</span>
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`text-sm font-medium tracking-wide transition-colors ${scrolled ? "text-luxury-black hover:text-luxury-gray" : "text-white/90 hover:text-white"
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Logo */}
                    <div className="absolute left-1/2 transform -translate-x-1/2">
                        <Link href="/" className="flex items-center">
                            <span className={`text-2xl font-serif font-bold tracking-widest ${scrolled ? "text-luxury-black" : "text-white"
                                }`}>VIZUN</span>
                        </Link>
                    </div>

                    {/* Icons */}
                    <div className="flex items-center space-x-4">
                        <button className={`p-2 transition-colors ${scrolled ? "text-luxury-black hover:text-luxury-gray" : "text-white/90 hover:text-white"}`}>
                            <SearchIcon className="w-5 h-5" />
                        </button>
                        <Link href="/account" className={`p-2 transition-colors ${scrolled ? "text-luxury-black hover:text-luxury-gray" : "text-white/90 hover:text-white"}`}>
                            <UserIcon className="w-5 h-5" />
                        </Link>
                        <Link href="/cart" className={`p-2 transition-colors relative ${scrolled ? "text-luxury-black hover:text-luxury-gray" : "text-white/90 hover:text-white"}`}>
                            <ShoppingBagIcon className="w-5 h-5" />
                            <span className="absolute top-1 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-luxury-accent text-[10px] font-bold text-white">
                                0
                            </span>
                        </Link>
                    </div>
                </div>
            </Container>
        </motion.header>
    );
}
