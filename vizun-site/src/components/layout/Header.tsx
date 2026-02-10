'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { durations, easings } from '@/lib/motion';

export const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navItems = [
        { name: 'SHOP', href: '/shop' },
        { name: 'BRAND', href: '/brand' },
    ];

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: durations.slow, ease: easings.aggressive }}
                className="fixed top-0 left-0 right-0 z-[var(--z-sticky)] mix-blend-exclusion text-white p-6 md:p-8 flex justify-between items-start pointer-events-none"
            >
                {/* Logo - Anchored Top Left */}
                <Link href="/" className="pointer-events-auto">
                    <span className="font-serif font-bold text-4xl md:text-5xl leading-none tracking-tighter hover:opacity-50 transition-opacity">
                        VIZUN
                    </span>
                </Link>

                {/* Desktop Nav - Anchored Top Right */}
                <nav className="hidden md:flex gap-8 pointer-events-auto items-center">
                    {navItems.map((item) => (
                        <Link key={item.name} href={item.href} className="font-bold text-sm tracking-widest hover:line-through transition-all">
                            {item.name}
                        </Link>
                    ))}
                    <Link href="/cart" className="font-bold text-sm tracking-widest hover:line-through transition-all">
                        CART (0)
                    </Link>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMobileMenuOpen(true)}
                    className="md:hidden pointer-events-auto font-bold text-sm tracking-widest"
                >
                    MENU
                </button>
            </motion.header>

            {/* Mobile Menu Overlay - Aggressive Full Screen */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ clipPath: 'inset(0 0 100% 0)' }}
                        animate={{ clipPath: 'inset(0 0 0 0)' }}
                        exit={{ clipPath: 'inset(100% 0 0 0)' }}
                        transition={{ duration: durations.medium, ease: easings.aggressive }}
                        className="fixed inset-0 bg-[var(--color-electric-blue)] z-[var(--z-modal)] flex flex-col p-6"
                    >
                        <div className="flex justify-between items-start mb-12">
                            <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                                <span className="font-serif font-bold text-4xl leading-none tracking-tighter text-white">
                                    VIZUN
                                </span>
                            </Link>
                            <button
                                onClick={() => setMobileMenuOpen(false)}
                                className="font-bold text-sm tracking-widest text-white"
                            >
                                CLOSE
                            </button>
                        </div>

                        <nav className="flex flex-col gap-4">
                            {[...navItems, { name: 'CART (0)', href: '/cart' }].map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-6xl font-bold font-serif text-white tracking-tighter hover:text-black transition-colors"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </nav>

                        <div className="mt-auto">
                            <p className="text-white text-sm font-bold tracking-widest uppercase opacity-50">
                                Spring / Summer 2026
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
