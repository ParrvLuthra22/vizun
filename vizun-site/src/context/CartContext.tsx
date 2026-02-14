"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    size: string;
    color?: string;
}

interface CartContextType {
    items: CartItem[];
    isOpen: boolean;
    total: number;
    itemCount: number;
    addToCart: (item: Omit<CartItem, "quantity">) => void;
    removeFromCart: (fastId: string) => void; // fastId is composite of id+size
    updateQuantity: (fastId: string, quantity: number) => void;
    toggleCart: () => void;
    openCart: () => void;
    closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    // Load from LocalStorage
    useEffect(() => {
        setIsMounted(true);
        const savedCart = localStorage.getItem("vizun-cart");
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart));
            } catch (e) {
                console.error("Failed to load cart", e);
            }
        }
    }, []);

    // Save to LocalStorage
    useEffect(() => {
        if (isMounted) {
            localStorage.setItem("vizun-cart", JSON.stringify(items));
        }
    }, [items, isMounted]);

    const addToCart = (newItem: Omit<CartItem, "quantity">) => {
        setItems((prev) => {
            const fastId = `${newItem.id}-${newItem.size}`;
            const existing = prev.find((item) => `${item.id}-${item.size}` === fastId);

            if (existing) {
                return prev.map((item) =>
                    `${item.id}-${item.size}` === fastId
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...newItem, quantity: 1 }];
        });
        setIsOpen(true);
    };

    const removeFromCart = (fastId: string) => {
        setItems((prev) => prev.filter((item) => `${item.id}-${item.size}` !== fastId));
    };

    const updateQuantity = (fastId: string, quantity: number) => {
        if (quantity < 1) {
            removeFromCart(fastId);
            return;
        }
        setItems((prev) =>
            prev.map((item) =>
                `${item.id}-${item.size}` === fastId ? { ...item, quantity } : item
            )
        );
    };

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                items,
                isOpen,
                total,
                itemCount,
                addToCart,
                removeFromCart,
                updateQuantity,
                toggleCart: () => setIsOpen(!isOpen),
                openCart: () => setIsOpen(true),
                closeCart: () => setIsOpen(false),
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
