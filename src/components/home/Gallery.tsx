import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { homeContent } from "@/content/home";

/**
 * Gallery (Figma 294:53): featured card. Uses the baked Figma card export
 * (frame + image + "TITTLE." + arrow). Carousel side cards + interactivity later.
 */
export function Gallery() {
  const { gallery } = homeContent;
  const featured = gallery.items[0];
  return (
    <section aria-labelledby="gallery" className="overflow-hidden bg-bg">
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--margin-page)] py-[clamp(4rem,11vh,10rem)]">
        <Reveal>
          <SectionHeading id="gallery">{gallery.heading}</SectionHeading>
        </Reveal>
        <Reveal delay={0.1}>
          <figure className="relative mx-auto mt-12 w-full max-w-[910px]">
            <div className="relative aspect-[910/630] w-full overflow-hidden rounded-[var(--radius-lg)]">
              <Image
                src={featured.image ?? "/images/home-gallery-feature.png"}
                alt={featured.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 910px"
                className="object-cover"
              />
            </div>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
