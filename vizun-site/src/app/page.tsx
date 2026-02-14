import Hero3D from "@/components/home/Hero3D";
import FeaturedCollection from "@/components/home/FeaturedCollection";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-luxury-black">
      <Hero3D />
      <FeaturedCollection />
      {/* Additional sections can be added here */}
    </main>
  );
}
