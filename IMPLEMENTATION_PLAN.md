# IMPLEMENTATION_PLAN.md — Morph Website

Phased build order for Claude Code. Work **top to bottom**; don't start a phase
until the previous one's "Done when" is met. Pair this with `CLAUDE.md` (rules),
`TECHNOLOGY.md` (stack), `STYLE.md` (tokens), `SEO_GEO.md` (discoverability).

Legend: ☐ todo · pull = read from Figma MCP first.

---

## Phase 0 — Foundations & scaffold
**Goal:** running Next.js app, tokens wired, deploys to Vercel.

- ☐ Scaffold Next.js (App Router, TS, ESLint) + Tailwind + Prettier.
- ☐ Add `next/font`, base `layout.tsx`, global metadata defaults.
- ☐ Create `src/styles/tokens.css` from `STYLE.md`; extend Tailwind theme.
- ☐ Set up folder structure per `CLAUDE.md` §3.
- ☐ Move `WebsiteExperienceCenter2.glb` → `public/models/`; add `/draco/`.
- ☐ Connect repo to **Vercel**; confirm preview deploy + SSG output.
- ☐ Add `robots.ts`, `sitemap.ts`, base JSON-LD Organization (see `SEO_GEO.md`).

**Done when:** blank-but-styled app deploys; tokens usable; GLB served.

---

## Phase 1 — Design system in code
**Goal:** every reusable primitive exists, matching Figma.

- ☐ **pull** all tokens (color/type/space/radii/shadow) → finalize `STYLE.md`.
- ☐ Build primitives: Button (variants/states), typography components, Container/
  Grid, Section heading, links.
- ☐ Build **Nav** (transparent-over-canvas, menu, optional theme toggle) and
  **Footer** (links, socials, big MORPH wordmark) — both **pull** from Figma.
- ☐ Reduced-motion + focus-visible styles globally.

**Done when:** a styleguide route renders all primitives pixel-matched to Figma.

---

## Phase 2 — Smooth scroll + 3D core (the signature)
**Goal:** the GLB animates to scroll with the mont-fort feel; ripple on hover.

- ☐ Lenis provider (`src/lib/lenis.tsx`) + GSAP/ScrollTrigger sync (shared rAF).
- ☐ `src/three/Scene.tsx`: client-only `<Canvas>` (dynamic import, `ssr:false`),
  lights, environment, `dpr [1,2]`, AdaptiveDpr/PerformanceMonitor.
- ☐ `MorphModel.tsx`: load GLB (DRACO), preload + branded loader, reveal on load.
  Set up the **5 clips** via `useAnimations`, each paused; scrub `action.time`.
- ☐ `useScrollScene.ts`: map scroll progress → **R3F camera (driven in code — no
  camera in the GLB)** + model transform + the 5 clips' time. Pin the
  hero/canvas section; `scrub` enabled; reversible.
- ☐ **Ripple shader** in `src/three/shaders/ripple/`: pointer→UV raycast,
  eased `uHover`, decaying sine ripple along normals; tie tint to accent token.
- ☐ Reduced-motion / low-power fallback: static model poster, no scrub/ripple.
- ☐ Perf pass: offscreen pause, lazy mount, verify no CLS / no FCP block.

**Done when:** scrolling scrubs the model smoothly both directions; hovering the
model produces a smooth ripple; reduced-motion shows a clean static fallback;
HTML content still server-rendered beneath the canvas.

---

## Phase 3 — Home page (`/`, node `190-33`)
**Goal:** full home built on the 3D core.

**Read the Figma home frame (`190-33`) and build exactly the sections it
defines, in its order, with its copy and assets.** Do NOT assume sections from
the old site — derive the entire page from Figma.

- ☐ **pull** the home frame: enumerate every section/component top to bottom.
- ☐ Build the **hero** (headline/copy + the 3D model + scroll cue) per Figma.
- ☐ Build each remaining section exactly as in Figma (layout, copy, images,
  hover states) using `STYLE.md` tokens and the shared primitives.
- ☐ Wire scroll reveals (`STYLE.md` motion) and tie the GLB/camera scrub beats
  to the section rhythm Figma implies.
- ☐ Metadata + JSON-LD (`Organization`/`WebSite`); content in `src/content/home`
  (transcribed from Figma, not from the old site).

**Done when:** home matches Figma, scroll story works end-to-end, Lighthouse SEO
≥ 95, content is crawlable HTML.

---

## Phase 4 — Inner pages
Build each from its Figma node; reuse primitives; each gets metadata + JSON-LD +
content file + crawlable HTML. Decide per design whether the 3D model persists,
transforms, or is replaced by page hero media.

- ☐ **Experience Center** — `/experience-center` (node `334-32`). pull.
- ☐ **Corporate Films** — `/corporate-films` (node `350-188`). Likely
  video-forward; use `VideoObject` JSON-LD. pull.
- ☐ **Software & Apps** — `/software-and-apps` (node `350-266`). pull.
- ☐ **Events** — `/events` (node `350-367`). Use `Event` JSON-LD where relevant.
  pull.

**Done when:** all four match Figma, share nav/footer, animate consistently, pass
SEO checks.

---

## Phase 5 — Content, assets, polish
- ☐ Replace **placeholder images** with real assets (drop-in by path).
- ☐ Finalize copy from Figma; remove all `TODO:` placeholders.
- ☐ OG/social images per page in `public/og/`.
- ☐ Cross-page transitions; consistent loaders; 404 page.
- ☐ Mobile/tablet QA against Figma at each breakpoint.
- ☐ a11y pass: keyboard, focus order, contrast, alt text, reduced motion.

---

## Phase 6 — SEO/GEO, performance, launch
- ☐ Full `SEO_GEO.md` checklist: metadata, canonical, sitemap, robots, JSON-LD,
  semantic headings, internal links, image alts, `llms.txt` (if adopted).
- ☐ Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP < 200ms (field + lab).
- ☐ Optimize GLB (`gltf-transform`) + textures; verify bundle splits.
- ☐ Cross-browser + device test (incl. low-power → static fallback).
- ☐ Analytics (optional), verify Search Console, submit sitemap.
- ☐ Final Lighthouse: Perf / SEO / Best-practices / a11y all green.

**Done when:** production deploy passes all checks; design matches Figma across
breakpoints; 3D + ripple smooth; content fully crawlable by search + AI engines.

---

## Cross-cutting "definition of done" (every page)
1. Matches Figma at all breakpoints (uses tokens only).
2. Server-rendered, crawlable HTML; metadata + JSON-LD present.
3. Scroll + 3D behavior consistent; reduced-motion fallback works.
4. No layout shift; lazy 3D/images; CWV within budget.
5. Content from `src/content/`; no fabricated copy; placeholders clearly marked.
6. Lint + types + build pass.

---

## Resolved decisions
- **Corporate Films node-id:** `350-188`. ✓
- **Theme:** dark mode only — no light theme, no toggle. ✓
- **GLB:** contains 5 transform animation clips, **no embedded camera** → scrub
  clips + drive camera in code. ✓

## Open items to confirm with the user
- Contact: `mailto`/link vs. embedded form (affects Phase 4/5).
- Real domain for canonical URLs + sitemap.
