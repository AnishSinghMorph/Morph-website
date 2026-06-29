import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Experience Center",
  description:
    "Morph designs and builds immersive LED and interactive experience centers for brands and enterprises.",
  path: "/experience-center",
});

/** Phase 0 route stub. Built from Figma node 334-32 in Phase 4. */
export default function ExperienceCenterPage() {
  return (
    <section className="mx-auto max-w-[var(--container-max)] px-[var(--margin-page)] py-24">
      <h1 className="font-display text-4xl font-bold tracking-tight sm:text-6xl">
        Experience Center
      </h1>
      <p className="mt-4 text-muted">Scaffold placeholder — built in Phase 4.</p>
    </section>
  );
}
