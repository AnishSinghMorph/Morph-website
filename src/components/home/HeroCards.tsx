"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { heroState } from "@/components/home/HeroVideo";
import { cn } from "@/lib/cn";

/**
 * Scroll-synced cards over the hero video. Each card fades/rises in around its
 * scroll-progress window (matching the video's flythrough beats), then out.
 * Driven by a non-pinning ScrollTrigger on the same hero range as HeroVideo.
 */
const cards = [
  { at: 0.16, title: "Experience Centers", sub: "Immersive LED & interactive spaces", pos: "tl" },
  { at: 0.42, title: "Films & Content", sub: "Stories that move decision-makers", pos: "tr" },
  { at: 0.66, title: "Software & Apps", sub: "Next-gen digital products", pos: "bl" },
  { at: 0.86, title: "Live Events", sub: "Moments worth remembering", pos: "br" },
] as const;

const place: Record<string, string> = {
  tl: "left-[var(--margin-page)] top-[18%]",
  tr: "right-[var(--margin-page)] top-[22%] text-right items-end",
  bl: "left-[var(--margin-page)] bottom-[24%]",
  br: "right-[var(--margin-page)] bottom-[20%] text-right items-end",
};

export function HeroCards() {
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const [mounted, setMounted] = useState(false);
  const [reduced, setReduced] = useState(true);

  useEffect(() => {
    setMounted(true);
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (!mounted || reduced) return;
    // Read the shared (pinned) hero progress each frame and ease cards in/out.
    const onTick = () => {
      const p = heroState.progress;
      cards.forEach((c, i) => {
        const el = refs.current[i];
        if (!el) return;
        const op = Math.max(0, 1 - Math.abs(p - c.at) / 0.12);
        el.style.opacity = String(op);
        el.style.transform = `translateY(${(1 - op) * 28}px)`;
      });
    };
    gsap.ticker.add(onTick);
    return () => gsap.ticker.remove(onTick);
  }, [mounted, reduced]);

  if (!mounted || reduced) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      {cards.map((c, i) => (
        <div
          key={c.title}
          ref={(el) => {
            refs.current[i] = el;
          }}
          style={{ opacity: 0 }}
          className={cn(
            "absolute flex max-w-xs flex-col gap-2 rounded-[var(--radius-lg)] border border-white/10 bg-black/75 p-6 shadow-2xl backdrop-blur-md",
            place[c.pos],
          )}
        >
          <span className="font-display text-label uppercase tracking-[0.3em] text-accent">
            0{i + 1}
          </span>
          <h3 className="font-display text-display-sm font-normal uppercase leading-none">
            {c.title}
          </h3>
          <p className="font-body text-sm text-fg/80">{c.sub}</p>
        </div>
      ))}
    </div>
  );
}
