/**
 * Home page content — transcribed verbatim from the Figma home frame (190-33).
 * No copy is invented or taken from the old site. Placeholders (images, the
 * gallery "TITLE", hidden "OUR WORK" section) are marked TODO.
 */

export type GalleryItem = {
  title: string;
  image?: string;
  alt: string;
};

export const homeContent = {
  /** Hero = the scroll-scrubbed GLB (Phase 2). Figma shows only the cinematic
   *  reveal (no copy); the scroll cue is motion, defined here not in Figma. */
  hero: {
    scrollCue: "Scroll",
  },

  /** Intro / "Who We Are" (Figma 190:42 / 190:46 / 190:43 / 190:61). */
  intro: {
    statement: "MORPH is a creative tech consultant.", // 190:42 — page h1
    subhead: {
      before: "that produces ",
      accent: "NEXT GEN", // 190:46 — Exo Bold, accent
      after: " experiences for brands & enterprises around the world.",
    },
    label: "WHO WE ARE.", // 190:43
    body: [
      "A Creative Technology Consultancy with 18 years of enterprise experience.",
      "We build Experience Centers that create believers. Films that move decision-makers. Software & Apps that solve real problems. Events that own the moment.",
    ],
    bodyEmphasis: "Your brand has a challenge. We know what to do about it.", // uppercase in Figma
  },

  /** Full-bleed cinematic image (Figma Frame 5 / 190:62). Placeholder asset. */
  feature: {
    image: "/images/home-intro-feature.png",
    alt: "A lone figure silhouetted in a warm, light-filled doorway.", // TODO: real asset + alt
  },

  /** "Our Work" (Figma 294:52). Heading is hidden in Figma → placeholder. */
  work: {
    heading: "OUR WORK.", // TODO: section is unfinished/hidden in Figma — confirm content
  },

  /** Gallery (Figma 294:53). Carousel; only the centre card has an image. */
  gallery: {
    heading: "GALLERY.",
    items: [
      {
        title: "TITLE", // Figma placeholder is "TITTLE." → cleaned placeholder
        image: "/images/home-gallery-feature.png",
        alt: "Gallery placeholder image.", // TODO: real project image + alt
      },
    ] as GalleryItem[],
  },
} as const;
