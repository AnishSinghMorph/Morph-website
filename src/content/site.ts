/**
 * Site-wide constants and navigation. Kept in `src/content/` so this is
 * CMS-swappable later without touching components.
 *
 * Facts here mirror the brand essence in CLAUDE.md §1 (sourced from the current
 * getmorph.com). Anything not yet confirmed is marked `TODO` — do not fabricate.
 */

export type NavLink = {
  label: string;
  href: string;
};

export const siteConfig = {
  name: "Morph",
  legalName: "Morph", // TODO: confirm registered legal name
  // TODO: pull the exact tagline + positioning line from Figma (home 190-33).
  // Do not assume copy or reuse the old site. Empty until transcribed.
  tagline: "",
  description:
    "Morph is a creative technology company producing next-gen experiences for brands and enterprises.", // TODO: replace with the exact positioning line from Figma
  // TODO: confirm final production domain (open item in IMPLEMENTATION_PLAN.md).
  // Centralised here so canonical/sitemap/robots update in one place.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.getmorph.com",
  ogImage: "/og/default.png", // TODO: real OG image (Phase 5)
  contactEmail: "", // TODO: confirm contact email
  // TODO: real social profile URLs (used for Organization.sameAs / GEO entity linking)
  sameAs: [] as string[],
} as const;

/** Page-title base. Falls back to the brand name until the Figma tagline lands. */
export const defaultTitle = siteConfig.tagline
  ? `${siteConfig.name} — ${siteConfig.tagline}`
  : siteConfig.name;

/**
 * Footer content — transcribed from the Figma home footer (190:122–190:136).
 * Social links have no URLs in Figma yet → placeholders (`#`), marked TODO.
 */
export const footerContent = {
  wordmark: "/icons/morph-wordmark.svg",
  label: "DIGITAL SOLUTIONS.", // 190:135
  copyright: "2026 | Morph Digital Solutions - All rights reserved", // 190:136
  socials: [
    { label: "CONTACT", href: "#" }, // TODO: real contact (mailto?) — open item
    { label: "YOUTUBE", href: "#" }, // TODO: real URL
    { label: "INSTAGRAM", href: "#" }, // TODO: real URL
    { label: "LINKEDIN", href: "#" }, // TODO: real URL
  ],
} as const;

/** Primary navigation — also the crawlable internal-link set. */
export const mainNav: NavLink[] = [
  { label: "Experience Center", href: "/experience-center" },
  { label: "Corporate Films", href: "/corporate-films" },
  { label: "Software & Apps", href: "/software-and-apps" },
  { label: "Events", href: "/events" },
];

/** Every public route, for the sitemap. */
export const routes = [
  "/",
  "/experience-center",
  "/corporate-films",
  "/software-and-apps",
  "/events",
] as const;
