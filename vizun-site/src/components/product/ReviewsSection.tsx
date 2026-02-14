"use client";

import React from "react";
import { Star, ThumbsUp } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const reviews = [
    {
        id: 1,
        name: "Rahul K.",
        rating: 5,
        date: "2 days ago",
        content: "Amazing quality! The fabric feels premium and the fit is exactly what I was looking for. Definitely worth the price.",
        helpful: 24,
        images: ["https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=100&auto=format&fit=crop"],
    },
    {
        id: 2,
        name: "Sarah M.",
        rating: 4,
        date: "1 week ago",
        content: "Great design, but the sizing runs slightly large. I'd recommend sizing down if you want a tighter fit.",
        helpful: 12,
    },
    {
        id: 3,
        name: "Vikram S.",
        rating: 5,
        date: "2 weeks ago",
        content: "The gold accents are stunning in person. Fast delivery too!",
        helpful: 8,
    },
];

export default function ReviewsSection() {
    return (
        <div className="py-16 border-t border-white/10">
            <h2 className="font-heading font-bold text-3xl text-white mb-10">CUSTOMER REVIEWS</h2>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Rating Breakdown */}
                <div className="lg:col-span-4 space-y-8">
                    <div className="flex items-center gap-4">
                        <span className="font-heading font-bold text-6xl text-white">4.8</span>
                        <div className="flex flex-col">
                            <div className="flex text-luxury-gold gap-1 mb-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-current" />
                                ))}
                            </div>
                            <span className="text-gray-400 text-sm">Based on 47 reviews</span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {[5, 4, 3, 2, 1].map((stars, i) => (
                            <div key={stars} className="flex items-center gap-3 text-sm">
                                <div className="flex items-center gap-1 w-12">
                                    <span className="text-white font-medium">{stars}</span>
                                    <Star className="w-3 h-3 text-luxury-gold fill-luxury-gold" />
                                </div>
                                <div className="flex-1 h-2 bg-luxury-charcoal rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-linear-to-r from-luxury-gold to-luxury-rose rounded-full"
                                        style={{ width: i === 0 ? "85%" : i === 1 ? "10%" : "3%" }}
                                    />
                                </div>
                                <span className="text-gray-500 w-8 text-right">{i === 0 ? "32" : i === 1 ? "5" : "1"}</span>
                            </div>
                        ))}
                    </div>

                    <button className="w-full py-3 border border-luxury-gold text-luxury-gold font-bold uppercase tracking-wide hover:bg-luxury-gold hover:text-black transition-all">
                        Write a Review
                    </button>
                </div>

                {/* Reviews List */}
                <div className="lg:col-span-8">
                    {/* Filter Tabs */}
                    <div className="flex gap-4 mb-8 border-b border-white/10 pb-4 overflow-x-auto">
                        {["All Reviews", "With Photos", "5 Stars"].map((tab, i) => (
                            <button
                                key={tab}
                                className={cn(
                                    "text-sm font-medium whitespace-nowrap transition-colors pb-4 -mb-4 border-b-2",
                                    i === 0 ? "text-white border-luxury-gold" : "text-gray-400 border-transparent hover:text-white"
                                )}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="space-y-6">
                        {reviews.map((review) => (
                            <div key={review.id} className="bg-[#1C1C1C]/40 border border-white/5 p-6 rounded-lg">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-2">
                                        <div className="flex text-luxury-gold gap-0.5">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className={cn("w-3 h-3", i < review.rating ? "fill-current" : "text-gray-600")} />
                                            ))}
                                        </div>
                                        <span className="text-white font-bold ml-2">{review.name}</span>
                                    </div>
                                    <span className="text-gray-500 text-xs">{review.date}</span>
                                </div>

                                <p className="text-gray-300 mb-4 leading-relaxed">{review.content}</p>

                                {review.images && (
                                    <div className="flex gap-2 mb-4">
                                        {review.images.map((img, i) => (
                                            <div key={i} className="relative w-20 h-20 rounded-md overflow-hidden border border-white/10 hover:border-luxury-gold transition-colors cursor-pointer">
                                                <Image src={img} alt="Review" fill className="object-cover" />
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div className="flex items-center gap-6">
                                    <button className="flex items-center gap-1 text-gray-500 text-xs hover:text-luxury-gold transition-colors group">
                                        <ThumbsUp className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                        Helpful ({review.helpful})
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
