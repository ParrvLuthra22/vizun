import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
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
      <body className={`${playfair.variable} ${inter.variable}`}>
        {children}
      </body>
    </html>
  );
}
