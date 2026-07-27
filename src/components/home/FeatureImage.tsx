import Image from "next/image";
import { homeContent } from "@/content/home";

/** Full-bleed cinematic image (Figma Frame 5 / 190:62). */
export function FeatureImage() {
  const { feature } = homeContent;
  return (
    <section className="bg-bg">
      <div className="relative aspect-[1920/868] w-full overflow-hidden">
        <Image
          src={feature.image}
          alt={feature.alt}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
    </section>
  );
}
