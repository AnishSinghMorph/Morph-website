import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Software & Apps",
  description:
    "Morph builds custom software and applications that power next-generation brand experiences.",
  path: "/software-and-apps",
});

/** Phase 0 route stub. Built from Figma node 350-266 in Phase 4. */
export default function SoftwareAndAppsPage() {
  return (
    <section className="mx-auto max-w-[var(--container-max)] px-[var(--margin-page)] py-24">
      <h1 className="font-display text-4xl font-bold tracking-tight sm:text-6xl">
        Software &amp; Apps
      </h1>
      <p className="mt-4 text-muted">Scaffold placeholder — built in Phase 4.</p>
    </section>
  );
}
