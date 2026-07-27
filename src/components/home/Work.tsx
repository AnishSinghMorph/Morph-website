import { Reveal } from "@/components/Reveal";
import { homeContent } from "@/content/home";

/**
 * "Our Work" (Figma 294:52): centred object on a soft vignette; heading hidden
 * in Figma → sr-only. Laptop image was lost in the discard → placeholder block
 * (TODO: re-pull 294:49 from Figma when the MCP quota resets).
 */
export function Work() {
  const { work } = homeContent;
  return (
    <section aria-labelledby="our-work" className="bg-bg">
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--margin-page)] py-[clamp(3rem,9vh,8rem)]">
        <h2 id="our-work" className="sr-only">
          {work.heading}
        </h2>
        <Reveal>
          <div className="relative mx-auto flex h-[clamp(150px,16vw,249px)] w-full max-w-[464px] items-center justify-center">
            <div
              aria-hidden
              className="absolute inset-0 rounded-[var(--radius-full)] bg-[radial-gradient(ellipse_at_center,#170c07_0%,transparent_72%)]"
            />
            <div
              aria-hidden
              className="relative h-[58%] w-[52%] rounded-[var(--radius-md)] border border-border bg-surface/50"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
