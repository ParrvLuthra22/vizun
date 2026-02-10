import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/home/HeroSection';
import { PhilosophySection } from '@/components/home/PhilosophySection';
import { FeaturedDropSection } from '@/components/home/FeaturedDropSection';
import { TrustSection } from '@/components/home/TrustSection';
import { CommunitySection } from '@/components/home/CommunitySection';

export default function Home() {
  return (
    <>
      <Header />

      {/* HACK: Main wrapper to handle stacking context */}
      <main className="relative">

        {/* 1. Hero: Sticky at top, gets covered by next section */}
        <div className="relative h-screen">
          <div className="sticky top-0 h-screen w-full z-0">
            <HeroSection />
          </div>
        </div>

        {/* 2. Content: Solid background, z-10, slides over Hero */}
        <div className="relative z-10 bg-[var(--color-off-white)]">
          <PhilosophySection />
          <FeaturedDropSection />
          <TrustSection />
          <CommunitySection />
        </div>

        {/* 3. Footer: Standard flow for now to avoid overlap issues without JS height calc */}
        <div className="relative z-10">
          <Footer />
        </div>
      </main>
    </>
  );
}
