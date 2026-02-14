import React from "react";
import Link from "next/link";
import Container from "../ui/Container";

export default function Footer() {
    return (
        <footer className="bg-luxury-black text-luxury-white pt-16 pb-8 border-t border-zinc-800">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="space-y-4">
                        <h3 className="text-2xl font-serif font-bold tracking-widest">VIZUN</h3>
                        <p className="text-gray-400 text-sm max-w-xs">
                            Redefining premium menswear for the modern gentleman. Minimalism meets luxury.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6 text-sm tracking-wider uppercase">Shop</h4>
                        <ul className="space-y-4 text-gray-400 text-sm">
                            <li><Link href="/new-arrivals" className="hover:text-white transition">New Arrivals</Link></li>
                            <li><Link href="/clothing" className="hover:text-white transition">Clothing</Link></li>
                            <li><Link href="/accessories" className="hover:text-white transition">Accessories</Link></li>
                            <li><Link href="/collections" className="hover:text-white transition">Collections</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6 text-sm tracking-wider uppercase">Support</h4>
                        <ul className="space-y-4 text-gray-400 text-sm">
                            <li><Link href="/faq" className="hover:text-white transition">FAQ</Link></li>
                            <li><Link href="/shipping" className="hover:text-white transition">Shipping & Returns</Link></li>
                            <li><Link href="/contact" className="hover:text-white transition">Contact Us</Link></li>
                            <li><Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6 text-sm tracking-wider uppercase">Newsletter</h4>
                        <p className="text-gray-400 text-sm mb-4">
                            Subscribe to receive updates, access to exclusive deals, and more.
                        </p>
                        <form className="flex flex-col gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-transparent border border-zinc-700 px-4 py-3 text-sm focus:outline-none focus:border-white transition"
                            />
                            <button
                                type="submit"
                                className="bg-white text-black px-4 py-3 text-sm font-bold uppercase hover:bg-gray-200 transition"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Vizun. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link href="#" className="hover:text-white transition">Instagram</Link>
                        <Link href="#" className="hover:text-white transition">Twitter</Link>
                        <Link href="#" className="hover:text-white transition">Facebook</Link>
                    </div>
                </div>
            </Container>
        </footer>
    );
}
