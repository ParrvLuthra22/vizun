"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { ShoppingBag, User, Search, Menu, X } from "lucide-react";
import Container from "../ui/Container";
import Magnetic from "../ui/Magnetic";
import { cn } from "@/lib/utils";

const navLinks = [
    { name: "SHOP", href: "/shop" },
    { name: "NEW DROPS", href: "/new-arrivals" },
    { name: "COLLECTIONS", href: "/collections" },
    { name: "ABOUT", href: "/about" },
];

import { useCart } from "@/context/CartContext";

export default function Header() {
    const { scrollY } = useScroll();
    const { itemCount, toggleCart } = useCart();
    const [hidden, setHidden] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);

    // Scroll Behavior
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

    // Focus search input when opened
    useEffect(() => {
        if (isSearchOpen && searchInputRef.current) {
            // Small timeout to allow transition to render input
            setTimeout(() => searchInputRef.current?.focus(), 100);
        }
    }, [isSearchOpen]);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isMobileMenuOpen]);

    return (
        <>
            <motion.header
                variants={{
                    visible: { y: 0 },
                    hidden: { y: "-100%" },
                }}
                animate={hidden ? "hidden" : "visible"}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className={cn(
                    "fixed top-0 left-0 right-0 z-[40] transition-all duration-500 border-b border-luxury-silver/10 backdrop-blur-[20px]",
                    scrolled ? "h-16 bg-luxury-black/90 shadow-lg" : "h-[80px] bg-luxury-black/80"
                )}
                style={{
                    boxShadow: '0 4px 20px rgba(212, 175, 55, 0.05)'
                }}
            >
                <Container className="h-full">
                    <div className="flex items-center justify-between h-full">

                        {/* Logo */}
                        <Link href="/" className="flex items-center relative z-50 group">
                            <motion.span
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                className="font-heading font-bold text-2xl tracking-[-0.02em] text-luxury-gold drop-shadow-[0_0_8px_rgba(212,175,55,0.3)]"
                            >
                                VIZUN
                                <span className="absolute -top-1 -right-2 w-2 h-2 rounded-full bg-luxury-gold animate-ping opacity-75" />
                            </motion.span>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center space-x-12">
                            {navLinks.map((link) => (
                                <Magnetic key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="relative text-[15px] font-medium text-white hover:text-white transition-colors py-2 group overflow-hidden block"
                                    >
                                        {link.name}
                                        {/* Hover Underline Slide-in */}
                                        <span className="absolute bottom-0 left-0 w-full h-[1px] bg-luxury-rose transform -translate-x-full group-hover:translate-x-0 transition-transform duration-200 ease-out" />
                                    </Link>
                                </Magnetic>
                            ))}
                        </nav>

                        {/* Icons / Actions */}
                        <div className="flex items-center gap-6 relative z-50">
                            {/* Search */}
                            <div className={`flex items-center justify-end transition-all duration-500 ease-in-out ${isSearchOpen ? 'w-64' : 'w-8'}`}>
                                <AnimatePresence mode="wait">
                                    {isSearchOpen ? (
                                        <motion.div
                                            initial={{ opacity: 0, width: 0 }}
                                            animate={{ opacity: 1, width: "100%" }}
                                            exit={{ opacity: 0, width: 0 }}
                                            className="relative w-full"
                                        >
                                            <input
                                                ref={searchInputRef}
                                                type="text"
                                                placeholder="SEARCH..."
                                                className="w-full bg-luxury-charcoal border border-luxury-gold/30 rounded-full py-1.5 px-4 text-sm text-white focus:outline-none focus:border-luxury-gold focus:shadow-[0_0_10px_rgba(212,175,55,0.2)] font-tech tracking-wide"
                                                onBlur={(e) => {
                                                    // Close if clicking outside or if input is empty
                                                    if (!e.target.value) setIsSearchOpen(false);
                                                }}
                                            />
                                            <button
                                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                                                onClick={() => setIsSearchOpen(false)}
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </motion.div>
                                    ) : (
                                        <motion.button
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            onClick={() => setIsSearchOpen(true)}
                                            className="text-luxury-silver hover:text-white transition-colors"
                                        >
                                            <Search className="w-5 h-5" />
                                        </motion.button>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Cart */}
                            <Magnetic>
                                <button onClick={toggleCart} className="relative text-luxury-silver hover:text-white transition-colors group block">
                                    <ShoppingBag className="w-5 h-5" />
                                    <AnimatePresence>
                                        {itemCount > 0 && (
                                            <motion.span
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                exit={{ scale: 0 }}
                                                className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-luxury-rose text-[10px] font-bold text-white shadow-sm"
                                            >
                                                {itemCount}
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </button>
                            </Magnetic>

                            {/* User */}
                            <Magnetic>
                                <Link href="/account" className="text-luxury-silver hover:text-white transition-colors hidden sm:block">
                                    <User className="w-5 h-5" />
                                </Link>
                            </Magnetic>

                            {/* Mobile Menu Toggle */}
                            <div className="md:hidden">
                                <button onClick={() => setIsMobileMenuOpen(true)} className="text-white hover:text-luxury-gold transition-colors block">
                                    <Menu className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    </div>
                </Container>
            </motion.header>

            {/* Mobile Full Screen Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-[100] bg-luxury-black flex flex-col items-center justify-center"
                    >
                        {/* Background Particles (Placeholder) */}
                        <div className="absolute inset-0 z-0 overflow-hidden opacity-30 pointer-events-none">
                            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-luxury-gold/20 rounded-full blur-[100px] animate-pulse" />
                            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-luxury-rose/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
                        </div>

                        <div className="absolute top-6 right-6 z-20">
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="p-2 text-white hover:text-luxury-rose transition-colors"
                            >
                                <X className="w-8 h-8" />
                            </button>
                        </div>

                        <nav className="flex flex-col items-center gap-8 relative z-10 w-full px-8">
                            {navLinks.map((link, index) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    transition={{ delay: 0.1 + index * 0.1, duration: 0.4 }}
                                    className="w-full flex flex-col items-center group cursor-pointer"
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-3xl font-heading font-bold text-white tracking-wider flex items-center gap-4 hover:text-luxury-gold transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                    {index !== navLinks.length - 1 && (
                                        <div className="w-[1px] h-6 bg-luxury-gold/30 mt-8" />
                                    )}
                                </motion.div>
                            ))}
                        </nav>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="absolute bottom-10 flex gap-6 text-gray-500 font-tech text-xs tracking-widest uppercase z-10"
                        >
                            <Link href="#" className="hover:text-white">Instagram</Link>
                            <Link href="#" className="hover:text-white">Twitter</Link>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
