"use client";

import Link from "next/link";
import { useRef, type MouseEvent } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Flowing Menu (reactbits, ported to TS). Vertical list of links; on pointer the
 * accent marquee flows in from the nearest edge (GSAP), with a continuously
 * scrolling label strip. Used as the navigation to the inner pages.
 */
export type FlowingMenuItem = { link: string; text: string };

export function FlowingMenu({ items }: { items: FlowingMenuItem[] }) {
  return (
    <nav aria-label="Pages" className="flex h-full w-full flex-col overflow-hidden">
      {items.map((item) => (
        <MenuItem key={item.link} {...item} />
      ))}
    </nav>
  );
}

function MenuItem({ link, text }: FlowingMenuItem) {
  const itemRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const defaults = { duration: 0.6, ease: "expo" };

  const sq = (x: number, y: number, x2: number, y2: number) =>
    (x - x2) ** 2 + (y - y2) ** 2;
  const edgeOf = (mx: number, my: number, w: number, h: number) =>
    sq(mx, my, w / 2, 0) < sq(mx, my, w / 2, h) ? "top" : "bottom";

  const enter = (e: MouseEvent) => {
    if (!itemRef.current || !marqueeRef.current || !innerRef.current) return;
    const r = itemRef.current.getBoundingClientRect();
    const edge = edgeOf(e.clientX - r.left, e.clientY - r.top, r.width, r.height);
    gsap
      .timeline({ defaults })
      .set(marqueeRef.current, { y: edge === "top" ? "-101%" : "101%" }, 0)
      .set(innerRef.current, { y: edge === "top" ? "101%" : "-101%" }, 0)
      .to([marqueeRef.current, innerRef.current], { y: "0%" }, 0);
  };

  const leave = (e: MouseEvent) => {
    if (!itemRef.current || !marqueeRef.current || !innerRef.current) return;
    const r = itemRef.current.getBoundingClientRect();
    const edge = edgeOf(e.clientX - r.left, e.clientY - r.top, r.width, r.height);
    gsap
      .timeline({ defaults })
      .to(marqueeRef.current, { y: edge === "top" ? "-101%" : "101%" }, 0)
      .to(innerRef.current, { y: edge === "top" ? "101%" : "-101%" }, 0);
  };

  return (
    <div
      ref={itemRef}
      className="relative flex-1 overflow-hidden border-b border-border"
    >
      <Link
        href={link}
        onMouseEnter={enter}
        onMouseLeave={leave}
        className="relative flex h-full items-center justify-center px-6 text-center font-display text-[clamp(1.75rem,4.5vw,4rem)] font-semibold uppercase tracking-tight text-fg"
      >
        {text}
      </Link>
      <div
        ref={marqueeRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 translate-y-[101%] overflow-hidden bg-accent"
      >
        <div ref={innerRef} className="h-full w-full">
          <div className="flex h-full w-max animate-[mb-marquee_22s_linear_infinite] items-center">
            {Array.from({ length: 14 }).map((_, i) => (
              <span key={i} className="flex items-center gap-10 px-5">
                <span className="font-display text-[clamp(1.5rem,3.5vw,3.25rem)] font-semibold uppercase text-bg">
                  {text}
                </span>
                <span className="h-3 w-3 shrink-0 rotate-45 bg-bg/80" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
