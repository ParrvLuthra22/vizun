import Link from 'next/link';

export const Footer = () => {
    return (
        <footer className="section section-secondary border-top">
            <div className="container">
                <div className="grid grid-cols-2 md:grid-cols-12 gap-8 mb-12">
                    {/* Shop - 2 Cols */}
                    <div className="col-span-1 md:col-span-2">
                        <p className="label-base mb-4">SHOP</p>
                        <nav className="flex flex-col gap-3">
                            <Link href="/shop" className="body-sm hover:text-[var(--color-alert-red)] transition-colors">All Products</Link>
                            <Link href="/shop?filter=new" className="body-sm hover:text-[var(--color-alert-red)] transition-colors">New Drops</Link>
                            <Link href="/shop?filter=archive" className="body-sm hover:text-[var(--color-alert-red)] transition-colors">Archive</Link>
                        </nav>
                    </div>

                    {/* Brand - 2 Cols */}
                    <div className="col-span-1 md:col-span-2">
                        <p className="label-base mb-4">BRAND</p>
                        <nav className="flex flex-col gap-3">
                            <Link href="/brand" className="body-sm hover:text-[var(--color-alert-red)] transition-colors">Philosophy</Link>
                            <Link href="/brand#story" className="body-sm hover:text-[var(--color-alert-red)] transition-colors">Story</Link>
                            <Link href="/brand#craftsmanship" className="body-sm hover:text-[var(--color-alert-red)] transition-colors">Craftsmanship</Link>
                        </nav>
                    </div>

                    {/* Support - 2 Cols */}
                    <div className="col-span-1 md:col-span-2">
                        <p className="label-base mb-4">SUPPORT</p>
                        <nav className="flex flex-col gap-3">
                            <Link href="/contact" className="body-sm hover:text-[var(--color-alert-red)] transition-colors">Contact</Link>
                            <Link href="/shipping" className="body-sm hover:text-[var(--color-alert-red)] transition-colors">Shipping</Link>
                            <Link href="/returns" className="body-sm hover:text-[var(--color-alert-red)] transition-colors">Returns</Link>
                            <Link href="/size-guide" className="body-sm hover:text-[var(--color-alert-red)] transition-colors">Size Guide</Link>
                        </nav>
                    </div>

                    {/* Legal - 2 Cols */}
                    <div className="col-span-1 md:col-span-2">
                        <p className="label-base mb-4">LEGAL</p>
                        <nav className="flex flex-col gap-3">
                            <Link href="/privacy" className="body-sm hover:text-[var(--color-alert-red)] transition-colors">Privacy</Link>
                            <Link href="/terms" className="body-sm hover:text-[var(--color-alert-red)] transition-colors">Terms</Link>
                        </nav>
                    </div>

                    {/* Connect - 4 Cols (Larger) */}
                    <div className="col-span-2 md:col-span-4 md:text-right">
                        <p className="label-base mb-4">CONNECT</p>
                        <nav className="flex flex-col gap-3 md:items-end">
                            <a href="https://instagram.com/vizun" target="_blank" rel="noopener noreferrer" className="body-sm hover:text-[var(--color-alert-red)] transition-colors">
                                Instagram
                            </a>
                            <a href="mailto:hello@vizun.com" className="body-sm hover:text-[var(--color-alert-red)] transition-colors">Email</a>
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
