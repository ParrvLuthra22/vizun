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
      <main>
        <HeroSection />
        <PhilosophySection />
        <FeaturedDropSection />
        <TrustSection />
        <CommunitySection />
      </main>
      <Footer />
    </>
  );
}
