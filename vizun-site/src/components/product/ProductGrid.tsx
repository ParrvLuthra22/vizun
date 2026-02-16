"use client";

import React, { useState } from "react";
import ProductCard from "@/components/product/ProductCard";
import QuickViewModal from "@/components/product/QuickViewModal";

interface Product {
    id: string;
    name: string;
    price: number;
    rating: number;
    reviews: number;
    images: string[];
    description: string;
    sizes: string[];
    isNew?: boolean;
    isSale?: boolean;
}

interface ProductGridProps {
    products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

    const handleQuickView = (product: any) => {
        setSelectedProduct(product);
        setIsQuickViewOpen(true);
    };

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onQuickView={handleQuickView}
                    />
                ))}
            </div>

            <QuickViewModal
                product={selectedProduct}
                isOpen={isQuickViewOpen}
                onClose={() => setIsQuickViewOpen(false)}
            />
        </>
    );
}
