"use client";

/**
 * Single GSAP entry point. Registers ScrollTrigger once (client-only). Import
 * `gsap` / `ScrollTrigger` from here so the whole site shares one instance and
 * easing language (no Framer Motion — GSAP only, per TECHNOLOGY.md).
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
