'use client';

import Link from 'next/link';
import { useState } from 'react';

export const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <>
            <header style={{
                position: 'sticky',
                top: 0,
                zIndex: 'var(--z-sticky)',
                backgroundColor: 'var(--color-jet-black)',
                borderBottom: '1px solid var(--border-subtle)',
            }}>
                <div className="container" style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 'var(--space-4) var(--space-6)',
                }}>
                    {/* Mobile Menu Button */}
                    <button
                        className="btn btn-ghost"
                        style={{ display: 'none' }}
                        onClick={() => setMobileMenuOpen(true)}
                        aria-label="Open menu"
                    >
                        ☰
                    </button>

                    {/* Logo */}
                    <Link href="/" className="headline-4" style={{ margin: 0 }}>
                        VIZUN
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="nav" style={{ display: 'flex' }}>
                        <Link href="/shop" className="nav-link">Shop</Link>
                        <Link href="/brand" className="nav-link">Brand</Link>
                        <Link href="/cart" className="nav-link">
                            Cart
                            <span style={{
                                marginLeft: 'var(--space-2)',
                                padding: '2px 6px',
                                backgroundColor: 'var(--color-electric-blue)',
                                borderRadius: 'var(--radius-sm)',
                                fontSize: 'var(--text-xs)',
                            }}>
                                0
                            </span>
                        </Link>
                    </nav>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'var(--color-jet-black)',
                    zIndex: 'var(--z-modal)',
                    padding: 'var(--space-6)',
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 'var(--space-12)',
                    }}>
                        <span className="headline-4">Menu</span>
                        <button
                            className="btn btn-ghost"
                            onClick={() => setMobileMenuOpen(false)}
                            aria-label="Close menu"
                        >
                            ✕
                        </button>
                    </div>

                    <nav style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 'var(--space-6)',
                    }}>
                        <Link href="/shop" className="headline-3" onClick={() => setMobileMenuOpen(false)}>
                            Shop
                        </Link>
                        <Link href="/brand" className="headline-3" onClick={() => setMobileMenuOpen(false)}>
                            Brand
                        </Link>
                        <Link href="/cart" className="headline-3" onClick={() => setMobileMenuOpen(false)}>
                            Cart
                        </Link>
                    </nav>
                </div>
            )}
        </>
    );
};
