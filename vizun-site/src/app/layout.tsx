import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/ui/SmoothScroll";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["200", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "VIZUN — Quiet Luxury for the Modern Man",
  description: "Premium men's fashion. Limited drops. Quiet luxury meets modern streetwear.",
  keywords: ["men's fashion", "luxury streetwear", "limited edition", "premium clothing"],
  authors: [{ name: "VIZUN" }],
  openGraph: {
    title: "VIZUN — Quiet Luxury for the Modern Man",
    description: "Premium men's fashion. Limited drops. Quiet luxury meets modern streetwear.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${oswald.variable} ${inter.variable}`}>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
