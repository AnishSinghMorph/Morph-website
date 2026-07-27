"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/** Shared hero scroll progress (0→1), so overlay cards stay in sync with the
 *  pinned hero (a separate ScrollTrigger can't track a pinned element). */
export const heroState = { progress: 0 };

/**
 * Hero video, scrubbed to scroll (replaces the GLB). Pins the hero and eases the
 * video's currentTime toward the scroll progress each tick (dense-keyframe encode
 * → smooth seeking). Reduced motion → static first frame, no pin/scrub.
 */
export function HeroVideo() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetTime = useRef(0);
  const [mounted, setMounted] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setMounted(true);
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const video = videoRef.current;
    const hero = wrapRef.current?.closest<HTMLElement>("[data-hero]");
    if (!video || !hero) return;

    video.pause();
    if (reduced) {
      video.currentTime = 0;
      return;
    }

    const duration = () =>
      Number.isFinite(video.duration) && video.duration > 0
        ? video.duration
        : 10;

    const st = ScrollTrigger.create({
      trigger: hero,
      start: "top top",
      end: "+=320%",
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        heroState.progress = self.progress;
        targetTime.current = self.progress * duration();
      },
    });

    const onTick = () => {
      if (video.readyState < 2) return;
      const cur = video.currentTime;
      const diff = targetTime.current - cur;
      if (Math.abs(diff) < 0.004) return;
      video.currentTime = cur + diff * 0.25;
    };
    gsap.ticker.add(onTick);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);

    return () => {
      st.kill();
      gsap.ticker.remove(onTick);
      window.removeEventListener("load", refresh);
    };
  }, [mounted, reduced]);

  return (
    <div ref={wrapRef} className="absolute inset-0 bg-bg">
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        src="/video/hero-scrub.mp4"
        muted
        playsInline
        preload="auto"
      />
    </div>
  );
}
