import type { Metadata } from "next";
import { Inter, Space_Grotesk, Orbitron, Bebas_Neue } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron" });
const bebasNeue = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas" });

export const metadata: Metadata = {
  title: "Vizun | Futuristic Streetwear Luxury",
  description: "Redefine your reality. Exclusive futuristic fashion for the vanguard.",
};

import { CartProvider } from "@/context/CartContext";
import SmoothScroll from "@/components/ui/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import { ToastProvider } from "@/components/ui/ToastSystem";
import PageLoader from "@/components/ui/PageLoader";
import ParticleBackground from "@/components/ui/ParticleBackground";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${orbitron.variable} ${bebasNeue.variable}`}>
      <body className="font-sans antialiased bg-luxury-black text-luxury-white flex flex-col min-h-screen selection:bg-luxury-gold selection:text-black cursor-none">
        <SmoothScroll>
          <ToastProvider>
            <CustomCursor>
              <CartProvider>
                <div className="relative min-h-screen bg-black">
                  <PageLoader />
                  <ParticleBackground />

                  {/* Background Elements */}
                  <div className="fixed inset-0 bg-[#0A0A0A] -z-20" />
                  <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.03)_0%,transparent_70%)] -z-10 pointer-events-none" />

                  <Header />
                  <div className="pt-20">
                    {children}
                    <Footer />
                    <CartDrawer />
                  </div>
                </div>
              </CartProvider>
            </CustomCursor>
          </ToastProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
