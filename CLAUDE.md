# CLAUDE.md — Morph Website

> Master guide for Claude Code. Read this first, every session. It links to
> `TECHNOLOGY.md`, `STYLE.md`, `IMPLEMENTATION_PLAN.md`, and `SEO_GEO.md`.
> Treat those four as the source of truth for stack, design tokens, build order,
> and discoverability.

---

## 1. What we are building

A **3D, scroll-driven marketing website for Morph** — a Creative Technology
company that builds "Next Gen" experiences (immersive experience centers,
corporate films, software & apps, events). This is a **brand-new design defined
entirely by the Figma file** below.

The site's signature is a **single GLB model that animates as the user scrolls**
(camera + model state scrubbed to scroll position), with page content revealing
in sync — the *motion feel* (and only the motion feel) takes inspiration from
**https://mont-fort.com/**. The cursor/surface has a **smooth ripple effect on
hover** over the 3D canvas.

> ⛔ **SINGLE SOURCE OF TRUTH = FIGMA.** Do **not** look at, copy, or take layout,
> sections, content, or styling cues from the old site `getmorph.com` — it is
> being decommissioned and is **not** a design reference. Only its *motion* peer
> is mont-fort, and only for animation feel. Every page's structure, sections,
> copy, and visuals must come from its Figma node (table below). If something
> needed isn't in Figma, insert a clearly-marked `TODO:` and ask — never invent
> it or pull it from the old site.

Design must match **Figma exactly** (see §5). Build with SEO **and** GEO
(Generative Engine Optimization) baked in from day one (see `SEO_GEO.md`).

### Pages (Figma file key: `fsG3EA4wHahiLdSEFw9dyX`)

| Page | Route | Figma node-id |
|------|-------|---------------|
| Home | `/` | `190-33` |
| Experience Center | `/experience-center` | `334-32` |
| Corporate Films | `/corporate-films` | `350-188` |
| Software & Apps | `/software-and-apps` | `350-266` |
| Events | `/events` | `350-367` |

Figma link pattern: `https://www.figma.com/design/fsG3EA4wHahiLdSEFw9dyX/Morph?node-id=<NODE>`

### Brand essence
Morph is a Creative Technology company producing "Next Gen" experiences for
brands and enterprises. **Pull the exact tagline, positioning line, and the list
of services/sections from the Figma frames — do not assume them.** If the Figma
copy is missing for a spot, add a `TODO:` placeholder rather than reusing old
marketing copy.

---

## 2. Tech stack (one-line summary — full detail in `TECHNOLOGY.md`)

- **Next.js (App Router, TypeScript)** on **Vercel**, SSG/ISR for SEO/GEO.
- **React Three Fiber + drei** for the 3D layer; **@react-three/postprocessing** for FX.
- **Lenis** for smooth scroll; **GSAP + ScrollTrigger** to scrub the GLB to scroll.
- **Custom GLSL shader** for the hover ripple on the model surface.
- **Tailwind CSS** + design tokens generated from Figma.
- **next/image**, **next/font**, partial hydration, lazy 3D loading for performance.

---

## 3. Repository structure (target)

```
morph-website/
├── CLAUDE.md                 # this file
├── TECHNOLOGY.md             # stack + rationale
├── STYLE.md                  # design system / tokens
├── IMPLEMENTATION_PLAN.md    # phased build order
├── SEO_GEO.md                # SEO + GEO strategy
├── public/
│   ├── models/               # WebsiteExperienceCenter2.glb (already provided) + draco/
│   ├── images/               # placeholders now → real assets later
│   └── og/                   # social / OG images per page
├── src/
│   ├── app/
│   │   ├── layout.tsx        # root: fonts, metadata, Lenis + Canvas providers
│   │   ├── page.tsx          # Home (/)
│   │   ├── experience-center/page.tsx
│   │   ├── corporate-films/page.tsx
│   │   ├── software-and-apps/page.tsx
│   │   ├── events/page.tsx
│   │   ├── sitemap.ts
│   │   └── robots.ts
│   ├── three/                # all 3D code
│   │   ├── Scene.tsx         # <Canvas> + lights + model + effects
│   │   ├── MorphModel.tsx    # GLB loader + scroll-driven animation
│   │   ├── shaders/ripple/   # vertex.glsl, fragment.glsl, RippleMaterial.ts
│   │   └── useScrollScene.ts # maps Lenis scroll → model/camera state
│   ├── components/           # UI sections (hero, nav, footer, cards…)
│   ├── lib/                  # lenis provider, gsap registration, seo helpers, jsonld
│   ├── content/              # hardcoded page content (typed objects/MDX)
│   └── styles/               # globals.css, tokens.css (from STYLE.md)
└── ...config files
```

> Adjust as needed, but keep **all 3D under `src/three/`** and **all hardcoded
> copy under `src/content/`** so content can later be swapped for a CMS without
> touching components.

---

## 4. Working conventions

- **TypeScript strict.** No `any` in committed code.
- **Components are server components by default**; mark `"use client"` only for
  interactive/3D/scroll pieces. The `<Canvas>`, Lenis provider, and any GSAP
  code are client-only and must be dynamically imported with `ssr: false` so the
  HTML stays crawlable (content renders as real DOM, 3D layers on top).
- **Content lives in `src/content/`** as typed data. Use **placeholder images
  now**; swap to real assets later by replacing files/paths only.
- **Design tokens, not magic numbers.** Pull every color/spacing/font value from
  `STYLE.md` tokens, which mirror Figma. If a value isn't a token yet, add it to
  `STYLE.md` first.
- **Dark mode only.** The site ships dark-only (no light theme / no toggle).
  Define dark tokens only in `STYLE.md`; force `color-scheme: dark`.
- **Accessibility + reduced motion:** honor `prefers-reduced-motion` — disable
  scrub/ripple and show a static poster of the model. Keyboard nav must work.
- **Commits:** small, scoped, conventional (`feat:`, `fix:`, `chore:`…).

---

## 5. Figma → code workflow (exact-match rule)

The Figma MCP will be connected by the user. **Always pull real values from
Figma — never eyeball.** For each page/section:

1. Use the Figma MCP to read the node (node-ids in §1).
2. Extract: exact **colors** (hex/opacity), **typography** (family, weight,
   size, line-height, letter-spacing), **spacing/auto-layout** (padding, gap),
   **radii, shadows, breakpoints**, and **asset exports** (SVGs/PNGs).
3. Map them to tokens in `STYLE.md` (add new tokens if missing) — do **not**
   hardcode raw values in components.
4. Build the section to **pixel/measurement parity** with the frame, then
   visually diff against the Figma export.
5. Only the **layout/skin** comes from Figma; **motion** (scroll scrub, ripple,
   reveals) comes from `IMPLEMENTATION_PLAN.md` + the mont-fort reference.

If Figma and this doc disagree on a static value, **Figma wins** — then update
the doc.

---

## 6. The 3D + scroll system (summary — detail in `IMPLEMENTATION_PLAN.md`)

- One persistent `<Canvas>` lives at the app shell so the model survives route
  transitions where design calls for it.
- **Lenis** drives smooth scroll; its scroll value feeds **GSAP ScrollTrigger**
  timelines that scrub **camera position, model rotation, and animation mix**.
- The GLB is `public/models/WebsiteExperienceCenter2.glb` (already in repo).
  DRACO/meshopt decode; preload with a loading state. **Verified contents:** 5
  transform animation clips (`CylinderAction`, `.001`, `.002`, `PlaneAction`,
  `BézierCurveAction` — rotation/scale/translation), 5 meshes, 2 materials, no
  textures, **no embedded camera**, no skins. → Mix/scrub the 5 clips to scroll;
  **drive the R3F camera in code** (there is no camera track in the file).
- **Ripple hover:** a GLSL shader on the model material; pointer position +
  time drive concentric ripples that ease out smoothly. Lives in
  `src/three/shaders/ripple/`.
- Always provide a **static fallback** (poster image / no scrub) for reduced
  motion and low-power devices.

---

## 7. Commands (fill in once scaffolded)

```bash
npm install
npm run dev          # local dev
npm run build        # production build (must pass before merge)
npm run lint         # eslint + types
npm run start        # serve production build
```

---

## 8. Guardrails for Claude Code

- **Plan before large changes.** Re-read `IMPLEMENTATION_PLAN.md` and work in
  its phase order; don't skip ahead.
- **Don't invent brand copy or stats.** Pull from Figma; if missing, insert a
  clearly marked `TODO:` placeholder rather than fabricating.
- **Performance & smoothness are non-negotiable** (see `SEO_GEO.md` for the
  numeric budget). The site must feel **extremely fast and buttery** — no jank,
  no stutter, no visible "loading/buffering" once past the initial branded
  preloader. Hard rules:
  - **Maintain ~60fps** during scroll, scrub, and ripple. Never block the main
    thread; do heavy work on the GPU (shaders) and keep `useFrame` cheap.
  - **Instant first paint:** page HTML/text renders immediately (SSG); the 3D
    canvas is lazy, dynamically imported (`ssr:false`), and never blocks FCP/LCP.
  - **Preload smartly:** GLB + fonts + hero assets so there's no mid-scroll pop;
    show a single branded loader, then a smooth reveal — no flashes/reflows.
  - **No layout shift (CLS≈0):** reserve canvas/media space up front.
  - **Adaptive:** cap `dpr [1,2]`, AdaptiveDpr/PerformanceMonitor, pause rAF when
    offscreen/tab hidden; drop to the static poster on low-power/reduced-motion.
  - Lenis smoothing + GSAP scrub must be tuned so motion is fluid and reversible,
    never laggy. Profile on a mid-range laptop and a phone before calling it done.
  The 3D must never block first contentful paint or hide crawlable content.
- **Every page ships with metadata + JSON-LD** before it's considered done.
- **Never break SSR text content** — search engines and AI crawlers must read
  real HTML, not a blank canvas.
