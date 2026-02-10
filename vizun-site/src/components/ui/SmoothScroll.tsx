'use client';

import { ReactLenis } from 'lenis/react';

export function SmoothScroll({ children }: { children: React.ReactNode }) {
    return (
        <ReactLenis root options={{ lerp: 0.15, duration: 1.2, smoothWheel: true }}> {/* Increased lerp for tighter control */}
            {children}
        </ReactLenis>
    );
}
