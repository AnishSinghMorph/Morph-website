import SplashCursor from "@/components/effects/SplashCursor";
import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { FeatureImage } from "@/components/home/FeatureImage";
import { PortalNav } from "@/components/home/PortalNav";
import { Gallery } from "@/components/home/Gallery";
import { PagesNav } from "@/components/home/PagesNav";

/**
 * Home (/) — Figma 190-33: hero (3D scrub) → intro/"who we are" → feature image
 * → our work → gallery. Splash Cursor (reactbits) fluid overlay on top. Footer
 * in the root layout. Scroll-narrative pages navigator is layered next.
 */
export default function HomePage() {
  return (
    <>
      <SplashCursor />
      <Hero />
      <Intro />
      <FeatureImage />
      <PortalNav />
      <Gallery />
      <PagesNav />
    </>
  );
}
