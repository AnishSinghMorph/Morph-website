import { HeroVideo } from "@/components/home/HeroVideo";
import { HeroCards } from "@/components/home/HeroCards";
import { homeContent } from "@/content/home";

/** Hero = the cinematic scroll-scrubbed video (pin target). */
export function Hero() {
  return (
    <section
      data-hero
      aria-label="Morph cinematic introduction"
      className="relative min-h-[100svh] overflow-hidden bg-bg"
    >
      <HeroVideo />
      <HeroCards />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-10 z-10 flex flex-col items-center gap-3 text-muted"
      >
        <span className="font-display text-label uppercase tracking-[0.3em]">
          {homeContent.hero.scrollCue}
        </span>
        <span className="h-12 w-px bg-muted/50" />
      </div>
    </section>
  );
}
