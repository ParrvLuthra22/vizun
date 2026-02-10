'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { durations, easings } from '@/lib/motion';
import { Magnetic } from '@/components/ui/Magnetic';
import { Cursor } from '@/components/ui/Cursor';

export const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);

    const mainLinks = [
        { name: 'SHOP', href: '/shop', image: '/products/coat.jpg' }, // Placeholder image
        { name: 'BRAND', href: '/brand', image: '/products/tee.jpg' },
        { name: 'COLLECTIONS', href: '/collections', image: '/products/trousers.jpg' },
        { name: 'ARCHIVE', href: '/archive', image: '/products/coat.jpg' },
    ];

    const secondaryLinks = [
        { name: 'ACCOUNT', href: '/account' },
        { name: 'SEARCH', href: '/search' },
        { name: 'LEGAL', href: '/legal' },
    ];

    const socialLinks = [
        { name: 'INSTAGRAM', href: '#' },
        { name: 'TWITTER', href: '#' },
        { name: 'LINKEDIN', href: '#' },
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
                    <Magnetic>
                        <span className="font-serif font-bold text-4xl md:text-5xl leading-none tracking-tighter hover:opacity-50 transition-opacity block cursor-hover relative z-50">
                            VIZUN
                        </span>
                    </Magnetic>
                </Link>

                {/* Right Anchored Controls */}
                <div className="flex gap-8 pointer-events-auto items-center relative z-50">
                    <Magnetic>
                        <Link href="/cart" className="font-bold text-sm tracking-widest relative group cursor-hover overflow-hidden block">
                            <span className="block group-hover:-translate-y-full transition-transform duration-300 ease-in-out">
                                CART (0)
                            </span>
                            <span className="absolute top-full left-0 block group-hover:-translate-y-full transition-transform duration-300 ease-in-out text-[var(--color-alert-red)]">
                                CART (0)
                            </span>
                        </Link>
                    </Magnetic>

                    <Magnetic>
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="font-bold text-sm tracking-widest cursor-hover overflow-hidden block relative group"
                        >
                            <span className="block group-hover:-translate-y-full transition-transform duration-300 ease-in-out">
                                {menuOpen ? 'CLOSE' : 'MENU'}
                            </span>
                            <span className="absolute top-full left-0 block group-hover:-translate-y-full transition-transform duration-300 ease-in-out text-[var(--color-alert-red)]">
                                {menuOpen ? 'CLOSE' : 'MENU'}
                            </span>
                        </button>
                    </Magnetic>
                </div>
            </motion.header>

            {/* Full Screen Menu Overlay */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ clipPath: 'inset(100% 0 0 0)' }}
                        animate={{ clipPath: 'inset(0 0 0 0)' }}
                        exit={{ clipPath: 'inset(0 0 100% 0)' }}
                        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }} // Custom erratic ease
                        className="fixed inset-0 bg-[var(--color-jet-black)] z-[var(--z-modal)] flex flex-col md:flex-row pointer-events-auto overflow-hidden"
                    >
                        {/* Background Image Reveal Layer */}
                        <div className="absolute inset-0 z-0 opacity-20 md:opacity-40">
                            <AnimatePresence mode="wait">
                                {hoveredLink && (
                                    <motion.div
                                        key={hoveredLink}
                                        initial={{ opacity: 0, scale: 1.1 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.4 }}
                                        className="absolute inset-0"
                                    >
                                        <Image
                                            src={mainLinks.find(l => l.name === hoveredLink)?.image || ''}
                                            alt="Menu Background"
                                            fill
                                            className="object-cover grayscale"
                                            priority
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <div className="absolute inset-0 bg-[var(--color-jet-black)] mix-blend-color" />
                        </div>

                        {/* Navigation Content */}
                        <div className="container relative z-10 h-full flex flex-col justify-end pb-12 md:pb-24 pt-32">

                            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-full">
                                {/* Main Links - Giant Type */}
                                <div className="col-span-1 md:col-span-8 flex flex-col justify-center gap-0 md:gap-4">
                                    {mainLinks.map((link, index) => (
                                        <motion.div
                                            key={link.name}
                                            initial={{ y: 100, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            exit={{ y: 100, opacity: 0 }}
                                            transition={{ delay: 0.1 * index, duration: 0.8, ease: easings.aggressive }}
                                            className="overflow-hidden"
                                        >
                                            <Link
                                                href={link.href}
                                                onMouseEnter={() => setHoveredLink(link.name)}
                                                onMouseLeave={() => setHoveredLink(null)}
                                                onClick={() => setMenuOpen(false)}
                                                className={`
                                                    block text-[12vw] md:text-[10vw] leading-[0.85] font-bold font-serif tracking-tighter transition-colors duration-300 cursor-hover
                                                    ${hoveredLink && hoveredLink !== link.name ? 'text-[var(--color-gray-800)]' : 'text-[var(--color-off-white)]'}
                                                    hover:text-transparent hover:text-stroke hover:text-stroke-white
                                                `}
                                                style={{ WebkitTextStroke: hoveredLink === link.name ? '1px white' : '0px transparent' }}
                                            >
                                                {link.name}
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Secondary Links & Info */}
                                <div className="col-span-1 md:col-span-4 flex flex-col justify-end gap-12 md:pl-12 text-[var(--color-off-white)]">
                                    <div className="flex flex-col gap-4">
                                        {secondaryLinks.map((link, index) => (
                                            <motion.div
                                                key={link.name}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: 20 }}
                                                transition={{ delay: 0.4 + (0.1 * index) }}
                                            >
                                                <Link
                                                    href={link.href}
                                                    className="text-lg font-bold tracking-widest hover:text-[var(--color-alert-red)] transition-colors cursor-hover"
                                                    onClick={() => setMenuOpen(false)}
                                                >
                                                    {link.name}
                                                </Link>
                                            </motion.div>
                                        ))}
                                    </div>

                                    <div className="flex gap-8">
                                        {socialLinks.map((link, index) => (
                                            <motion.div
                                                key={link.name}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ delay: 0.6 + (0.1 * index) }}
                                            >
                                                <a href={link.href} className="text-xs font-bold uppercase tracking-widest opacity-50 hover:opacity-100 transition-opacity cursor-hover">
                                                    {link.name}
                                                </a>
                                            </motion.div>
                                        ))}
                                    </div>

                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ delay: 0.8 }}
                                    >
                                        <p className="text-xs font-mono uppercase opacity-30">
                                            VIZUN STUDIOS © 2026 <br />
                                            EST. NEW YORK
                                        </p>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
