import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Events",
  description:
    "Morph designs and delivers live events and engagement experiences for brands and enterprises.",
  path: "/events",
});

/** Phase 0 route stub. Built from Figma node 350-367 in Phase 4. */
export default function EventsPage() {
  return (
    <section className="mx-auto max-w-[var(--container-max)] px-[var(--margin-page)] py-24">
      <h1 className="font-display text-4xl font-bold tracking-tight sm:text-6xl">
        Events
      </h1>
      <p className="mt-4 text-muted">Scaffold placeholder — built in Phase 4.</p>
    </section>
  );
}
