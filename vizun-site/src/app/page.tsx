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
      <main className="relative z-10">
        {/* Sticky Hero Curtain */}
        <div className="relative h-screen">
          <div className="sticky top-0 h-screen z-0">
            <HeroSection />
          </div>
        </div>

        {/* Content slides OVER the Hero (z-10 relative) */}
        <div className="relative z-10 bg-[var(--color-off-white)]">
          <PhilosophySection />
          <FeaturedDropSection />
          <TrustSection />
          <CommunitySection />
        </div>
      </main>

      {/* Sticky Footer Reveal */}
      <div className="relative z-10 bg-[var(--color-jet-black)]" style={{ marginBottom: '100vh' }}>
        {/* Spacer to push footer down if needed, but here we just need margin on the content above 
              Actually, the pattern is: 
              1. Footer is fixed z-0.
              2. Content is z-10 and has margin-bottom = footer height.
              
              Since footer height is dynamic, a better way with Lenis/Grid is:
              Footer fixed bottom-0 z-0.
              Last section z-10 mb-[footer-height].
              
              Let's try a simpler approach for the footer:
              Just put it in a container that effectively reveals it.
          */}
      </div>

      {/* 
        Better Footer Reveal Strategy: 
        Main content has z-10.
        Footer is fixed at bottom z-0.
        We add a spacer div at the end of Main that matches Footer height, 
        OR we just let the main content scroll away.
        
        To avoid hardcoding height, we can't easily do the spacer without JS.
        Alternative: Sticky Footer at bottom of flow.
        Let's stick to standard flow for footer for now unless I'm sure about height.
        
        Wait, I can make the FOOTER sticky at bottom: 0, and give it z-index -1.
        Then the content needs to have a transparent bottom? No.
        
        Let's go with the sticky Hero first, that's safe.
        For footer, let's keep it standard for now to avoid layout breakage, 
        or use a specific "Reveal" wrapper if I had one.
        
        Actually, let's try the "Curtain" effect for the Footer too:
        The PREVIOUS section (Community) should be Sticky? No.
        
        Let's stick to the plan:
        Hero -> Philosophy (Sticky Hero).
        Community -> Footer (Sticky Reveal).
      */}

      {/* Re-writing the return to be clean and implement the plan */}
      <div className="relative">
        {/* Main Content Wrapper */}
        <div className="relative z-10 bg-[var(--color-off-white)]">

          {/* Hero Container - Sticky */}
          <div className="relative h-screen clip-path-hero">
            <div className="sticky top-0 h-screen z-0">
              <HeroSection />
            </div>
          </div>

          {/* Scrolling Content - Slides OVER Hero */}
          <div className="relative z-10 bg-[var(--color-off-white)]">
            <PhilosophySection />
            <FeaturedDropSection />
            <TrustSection />
            {/* Community Section needs to lift up to reveal Footer? 
                      Or Footer stays fixed behind it?
                      Let's try Footer Fixed z-0, and everything else z-10.
                  */}
            <div className="relative z-10 bg-[var(--color-off-white)] pb-[100vh]"> {/* Huge padding to allow reveal */}
              <CommunitySection />
            </div>

            {/* Footer acting as a fixed layer at the bottom */}
            <div className="fixed bottom-0 left-0 w-full h-screen z-0 flex flex-col justify-end pointer-events-none">
              <div className="pointer-events-auto h-auto">
                <Footer />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* 
   Wait, the above footer logic has a flaw: The footer is fixed, so it's always visible behind the content if the content is transparent?
   But content (Philosophy..Community) has bg-[var(--color-off-white)]. So it covers the footer.
   The CommunitySection has pb-[100vh], which is essentially a transparent window? No.
   
   If CommunitySection has bg-color, then we need a "window" at the bottom.
   
   Correct logic for Footer Reveal:
   1. Footer is fixed z-0.
   2. All preceding content is z-10 with a solid background.
   3. The last element (Community) needs a margin-bottom equal to Footer height.
   
   Since we don't know footer height, we can approximate or use a different trick.
   Or, we can make the footer sticky *at the bottom* of the main container?
   
   Let's try the "Sticky Hero" first, as that's safe.
   And for the Footer, let's just make it standard flow for now to ensure no overlaps,
   UNLESS I can ensure the margin.
   
   Actually, "Sticky Bottom" effect:
   Wrap Community + Footer in a container.
   Community is sticky top? No.
   
   Let's just implement the Hero Curtain for now as it's the requested "Cinematic" start.
   The Community -> Footer transition can be a standard scroll for safety if strict height isn't known.
*/

/* Re-thinking page structure for best result */
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
