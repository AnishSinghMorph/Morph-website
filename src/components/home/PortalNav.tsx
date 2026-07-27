"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Portal navigation (the "Our Work" idea): a small framed element that, on
 * scroll, zooms to fullscreen and becomes the Experience Center page, then
 * scrolls through the other inner pages, then shrinks back — returning to the
 * home flow. Pinned GSAP timeline scrubbed to scroll. Reduced motion → a static
 * grid of links (still crawlable).
 */
const pages = [
  {
    href: "/experience-center",
    n: "01",
    label: "Experience Center",
    desc: "Immersive LED and interactive experience centers that create believers.",
    at: "15% 20%",
  },
  {
    href: "/corporate-films",
    n: "02",
    label: "Corporate Films",
    desc: "Films and brand content that move decision-makers.",
    at: "85% 25%",
  },
  {
    href: "/software-and-apps",
    n: "03",
    label: "Software & Apps",
    desc: "Custom software and applications that power next-gen experiences.",
    at: "20% 80%",
  },
  {
    href: "/events",
    n: "04",
    label: "Events",
    desc: "Live events and engagement experiences that own the moment.",
    at: "80% 80%",
  },
];

const glow = (at: string) =>
  `radial-gradient(70% 70% at ${at}, rgba(255,136,0,0.20), transparent 62%)`;

export function PortalNav() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [reduced, setReduced] = useState(true);

  useEffect(() => {
    setMounted(true);
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (!mounted || reduced) return;
    const section = sectionRef.current;
    const frame = frameRef.current;
    const track = trackRef.current;
    const hint = hintRef.current;
    if (!section || !frame || !track) return;

    const ctx = gsap.context(() => {
      const last = -100 * ((pages.length - 1) / pages.length); // -75% for 4
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=600%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });
      tl.set(frame, { scale: 0.3, borderRadius: 40 });
      tl.set(track, { yPercent: 0 });
      tl.to(hint, { autoAlpha: 0, duration: 0.4 }, 0);
      tl.to(frame, { scale: 1, borderRadius: 0, ease: "power2.inOut", duration: 1 }, 0);
      tl.to(track, { yPercent: last, ease: "none", duration: 4 }, ">");
      tl.to(frame, { scale: 0.3, borderRadius: 40, ease: "power2.inOut", duration: 1 }, ">");
      tl.to(hint, { autoAlpha: 1, duration: 0.4 }, "<0.3");
    }, section);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    return () => {
      ctx.revert();
      window.removeEventListener("load", refresh);
    };
  }, [mounted, reduced]);

  // Reduced-motion / no-JS fallback: a simple grid of page links.
  if (mounted && reduced) {
    return (
      <section
        aria-label="Our work"
        className="mx-auto max-w-[var(--container-max)] px-[var(--margin-page)] py-[var(--section-y)]"
      >
        <h2 className="font-display text-display font-normal uppercase leading-[1.02]">
          OUR WORK<span className="text-accent">.</span>
        </h2>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2">
          {pages.map((p) => (
            <li key={p.href}>
              <Link
                href={p.href}
                className="block rounded-[var(--radius-lg)] border border-border bg-surface/40 p-8 transition-colors hover:border-accent"
              >
                <span className="font-display text-label text-accent">{p.n}</span>
                <h3 className="mt-3 font-display text-display-sm uppercase">
                  {p.label}
                </h3>
                <p className="mt-3 text-muted">{p.desc}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      aria-label="Explore Morph's pages"
      className="relative h-screen overflow-hidden bg-bg"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          ref={frameRef}
          className="relative h-full w-full origin-center overflow-hidden border border-border will-change-transform"
        >
          <div ref={trackRef} className="h-[400%] w-full">
            {pages.map((p) => (
              <article
                key={p.href}
                className="flex h-1/4 w-full flex-col items-start justify-center gap-5 px-[clamp(2rem,8vw,9rem)]"
                style={{ backgroundImage: `${glow(p.at)}, var(--grad-intro)` }}
              >
                <span className="font-display text-label uppercase tracking-[0.3em] text-accent">
                  {p.n} / Morph
                </span>
                <h3 className="font-display text-display font-normal uppercase leading-[1.0]">
                  {p.label}
                  <span className="text-accent">.</span>
                </h3>
                <p className="max-w-xl font-body text-body-lg text-fg/85">
                  {p.desc}
                </p>
                <Link
                  href={p.href}
                  className="mt-2 inline-flex items-center gap-2 rounded-full border border-accent px-6 py-2.5 font-display text-label uppercase tracking-wide text-accent transition-colors hover:bg-accent hover:text-bg"
                >
                  Open page <span aria-hidden>→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div
        ref={hintRef}
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-12 flex flex-col items-center gap-2 text-muted"
      >
        <span className="font-display text-label uppercase tracking-[0.3em]">
          Our Work — scroll to explore
        </span>
        <span className="h-8 w-px bg-muted/50" />
      </div>
    </section>
  );
}
