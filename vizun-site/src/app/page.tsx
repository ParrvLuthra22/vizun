import Hero3D from "@/components/home/Hero3D";
import MagneticHero from "@/components/home/MagneticHero";
import FeaturedDrops from "@/components/home/FeaturedDrops";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-luxury-black">
      <MagneticHero />
      <FeaturedDrops />
      {/* Additional sections can be added here */}
    </main>
  );
}
