import Link from 'next/link';

export const Footer = () => {
    return (
        <footer className="section section-secondary border-top">
            <div className="container">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: 'var(--space-12)',
                    marginBottom: 'var(--space-12)',
                }}>
                    {/* Shop */}
                    <div>
                        <p className="label-base" style={{ marginBottom: 'var(--space-4)' }}>SHOP</p>
                        <nav style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                            <Link href="/shop" className="body-sm">All Products</Link>
                            <Link href="/shop?filter=new" className="body-sm">New Drops</Link>
                            <Link href="/shop?filter=archive" className="body-sm">Archive</Link>
                        </nav>
                    </div>

                    {/* Brand */}
                    <div>
                        <p className="label-base" style={{ marginBottom: 'var(--space-4)' }}>BRAND</p>
                        <nav style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                            <Link href="/brand" className="body-sm">Philosophy</Link>
                            <Link href="/brand#story" className="body-sm">Story</Link>
                            <Link href="/brand#craftsmanship" className="body-sm">Craftsmanship</Link>
                        </nav>
                    </div>

                    {/* Support */}
                    <div>
                        <p className="label-base" style={{ marginBottom: 'var(--space-4)' }}>SUPPORT</p>
                        <nav style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                            <Link href="/contact" className="body-sm">Contact</Link>
                            <Link href="/shipping" className="body-sm">Shipping</Link>
                            <Link href="/returns" className="body-sm">Returns</Link>
                            <Link href="/size-guide" className="body-sm">Size Guide</Link>
                        </nav>
                    </div>

                    {/* Legal */}
                    <div>
                        <p className="label-base" style={{ marginBottom: 'var(--space-4)' }}>LEGAL</p>
                        <nav style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                            <Link href="/privacy" className="body-sm">Privacy</Link>
                            <Link href="/terms" className="body-sm">Terms</Link>
                        </nav>
                    </div>

                    {/* Connect */}
                    <div>
                        <p className="label-base" style={{ marginBottom: 'var(--space-4)' }}>CONNECT</p>
                        <nav style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                            <a href="https://instagram.com/vizun" target="_blank" rel="noopener noreferrer" className="body-sm">
                                Instagram
                            </a>
                            <a href="mailto:hello@vizun.com" className="body-sm">Email</a>
                        </nav>
                    </div>
                </div>

                <hr className="divider" />

                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: 'var(--space-4)',
                }}>
                    <p className="body-xs">© 2026 VIZUN. All rights reserved.</p>
                    <p className="body-xs">Quiet luxury for the modern man</p>
                </div>
            </div>
        </footer>
    );
};
