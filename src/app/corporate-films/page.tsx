import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Corporate Films",
  description:
    "Morph produces corporate films, brand content and showreels for enterprises worldwide.",
  path: "/corporate-films",
});

/** Phase 0 route stub. Built from Figma node 350-188 in Phase 4. */
export default function CorporateFilmsPage() {
  return (
    <section className="mx-auto max-w-[var(--container-max)] px-[var(--margin-page)] py-24">
      <h1 className="font-display text-4xl font-bold tracking-tight sm:text-6xl">
        Corporate Films
      </h1>
      <p className="mt-4 text-muted">Scaffold placeholder — built in Phase 4.</p>
    </section>
  );
}
