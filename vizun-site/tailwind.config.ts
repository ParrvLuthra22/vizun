import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                "luxury-black": "#0A0A0A",
                "luxury-charcoal": "#1C1C1C",
                "luxury-white": "#FFFFFF",
                "luxury-gold": "#D4AF37", // Champagne Gold
                "luxury-rose": "#B76E79", // Rose Gold
                "luxury-silver": "#C0C0C0",
                "neon-green": "#39FF14", // Cyberpunk Green
            },
            fontFamily: {
                sans: ["var(--font-inter)", "sans-serif"],
                serif: ["var(--font-playfair)", "serif"], // Keeping for legacy/content
                heading: ["var(--font-space-grotesk)", "sans-serif"],
                tech: ["var(--font-orbitron)", "monospace"],
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
                "metal-gradient": "linear-gradient(135deg, #E0E0E0 0%, #F5F5F5 50%, #C0C0C0 100%)",
            },
            animation: {
                "fade-in": "fadeIn 0.5s ease-out forwards",
                "slide-up": "slideUp 0.8s ease-out forwards",
                "reveal": "reveal 1s cubic-bezier(0.77, 0, 0.175, 1)",
                "glitch": "glitch 1s linear infinite",
                "neon-pulse": "neonPulse 1.5s ease-in-out infinite alternate",
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                slideUp: {
                    "0%": { opacity: "0", transform: "translateY(20px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                reveal: {
                    "0%": { transform: "translateY(100%)" },
                    "100%": { transform: "translateY(0)" },
                },
                neonPulse: {
                    "0%": { boxShadow: "0 0 5px #D4AF37, 0 0 10px #D4AF37" },
                    "100%": { boxShadow: "0 0 20px #D4AF37, 0 0 30px #D4AF37" },
                },
                glitch: {
                    "2%, 64%": { transform: "translate(2px,0) skew(0deg)" },
                    "4%, 60%": { transform: "translate(-2px,0) skew(0deg)" },
                    "62%": { transform: "translate(0,0) skew(5deg)" },
                },
            },
        },
    },
    plugins: [],
};
export default config;
