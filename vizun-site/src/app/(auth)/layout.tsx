import React from "react";
import ParticleBackground from "@/components/ui/ParticleBackground";
import Container from "@/components/ui/Container";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-black relative flex items-center justify-center overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 z-0">
                <ParticleBackground />
            </div>

            {/* Ambient glows */}
            <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-luxury-gold/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-luxury-gold/5 rounded-full blur-[120px] pointer-events-none" />

            <Container className="relative z-10 w-full max-w-md py-12">
                {children}
            </Container>
        </div>
    );
}
