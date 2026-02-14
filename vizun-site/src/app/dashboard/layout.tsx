import React from "react";
import Sidebar from "@/components/dashboard/Sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-luxury-black text-white">
            <Sidebar />
            <main className="lg:ml-[280px] min-h-screen pt-24 px-4 sm:px-8 pb-12">
                <div className="max-w-6xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
