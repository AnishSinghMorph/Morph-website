# TECHNOLOGY.md — Morph Website

The stack, why each piece is here, and how the pieces fit. Decisions confirmed
with the user: **React Three Fiber + drei**, **scroll-scrubbed animation with
Lenis**, **hardcoded content (placeholder → real images)**, **Vercel + SSG/ISR**.

---

## 1. Stack at a glance

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | **Next.js 15 (App Router) + TypeScript** | SSG/ISR for SEO/GEO, server components keep content crawlable, first-class Vercel deploy, image/font optimization. |
| Hosting | **Vercel** | Native Next.js target; edge CDN; ISR; preview deploys. |
| 3D engine | **Three.js** via **React Three Fiber** | Declarative 3D in React; syncs with state and scroll cleanly. |
| 3D helpers | **@react-three/drei** | `useGLTF`, `Environment`, loaders, controls, `Html`, performance helpers. |
| Post FX | **@react-three/postprocessing** | Bloom / subtle DOF for the "Next Gen" look without hand-rolled passes. |
| Smooth scroll | **Lenis** (`@studio-freight/lenis`) | Buttery inertia scroll; exposes a normalized scroll value to drive animation. |
| Scroll timelines | **GSAP + ScrollTrigger** | Industry-standard scrubbing; pin sections, scrub model/camera to scroll. |
| Ripple FX | **Custom GLSL shader** (raw WebGL material) | Concentric hover ripples on the model surface; full control, GPU-cheap. |
| Styling | **Tailwind CSS** + CSS variables (design tokens) | Fast, tokenized, maps to Figma values; see `STYLE.md`. |
| Fonts | **next/font** | Self-hosted, no layout shift, fast LCP. |
| Images | **next/image** | Responsive, lazy, modern formats; placeholders now. |
| Content | **Typed objects / MDX in `src/content/`** | Hardcoded now, CMS-swappable later — no backend needed. |
| Animation (DOM) | **GSAP only** (no Framer Motion) | Reveal-on-scroll, text splits, nav transitions — one animation engine for the whole site, shared easing, smaller bundle. |
| SEO/GEO | next Metadata API, `next-sitemap`/route handlers, JSON-LD | See `SEO_GEO.md`. |
| Quality | **ESLint + TypeScript strict + Prettier** | Consistency and safety. |

> Pin exact versions at scaffold time and record them here so the build is
> reproducible.

---

## 2. Why this shape

**Why Next.js over a pure Vite/Three SPA (or Astro like mont-fort):** the brief
demands strong SEO **and** GEO. AI crawlers and search engines must read real
HTML. Next.js server-renders all page copy as crawlable DOM, then we mount the
3D canvas on top as a client-only layer. We get the cinematic feel of mont-fort
*without* hiding content inside a JS-only render. (mont-fort uses Astro; Next
gives us the same static-output benefit plus a richer React 3D ecosystem.)

**Why R3F + drei over vanilla Three:** the site mixes 3D with reactive UI,
routing, and scroll state. R3F lets the model, camera, and DOM share React state
and the same scroll source, which makes the scrubbing system far simpler to
build and maintain. drei removes boilerplate (GLTF/DRACO loading, environment,
HTML overlays).

**Why Lenis + GSAP ScrollTrigger (not scroll snapping or CSS only):** the
reference is a continuous, scrubbed timeline — model and camera move *with* the
scrollbar, forward and backward. Lenis smooths the input; ScrollTrigger maps
scroll progress (0→1 per pinned section) onto camera/model tweens. This is the
exact pattern behind mont-fort-style sites.

**Why a custom shader for ripple:** a hover ripple that distorts the surface
needs per-vertex/per-fragment math driven by pointer + time. A GLSL material is
the cleanest, cheapest way; postprocessing alone can't do localized,
pointer-anchored ripples well.

---

## 3. The scroll → 3D pipeline

```
user scroll
   │
   ▼
Lenis (smoothing + inertia)  ──emits progress──►  GSAP ticker / ScrollTrigger
   │                                                   │
   │ (also drives DOM reveals)                         ▼
   │                                       timeline scrubs:
   ▼                                         • R3F camera (driven in code)
DOM section reveals                          • model rotation / position
                                             • GLTF clip time (5 clips, scrubbed)
                                             • material/ripple uniforms
                                                   │
                                                   ▼
                                       R3F renders <Canvas> each frame
```

Key files (see `CLAUDE.md` §3): `src/lib/lenis.tsx` (provider + GSAP sync),
`src/three/Scene.tsx`, `src/three/MorphModel.tsx`,
`src/three/useScrollScene.ts`, `src/three/shaders/ripple/`.

Integration notes:
- Drive GSAP from Lenis's `scroll` event and call `ScrollTrigger.update()`;
  register `gsap.ticker` with Lenis's `raf` so they share one loop.
- Use `scrub: true` (or a small number for smoothing) on ScrollTrigger; **pin**
  the canvas section while its timeline plays.
- Read scroll inside R3F via a shared store (zustand or context) rather than
  re-querying the DOM in `useFrame`.

---

## 4. The GLB model

- Asset already in repo: **`WebsiteExperienceCenter2.glb`** → move to
  `public/models/`.
- **Verified contents** (Blender glTF export, ~80 KB):
  - **5 animation clips**, all transform tracks (rotation/scale/translation):
    `CylinderAction`, `CylinderAction.001`, `CylinderAction.002`,
    `PlaneAction`, `BézierCurveAction`.
  - 6 nodes / 5 meshes (3 cylinders, 2 planes) + a Bézier curve node; 2
    materials; **no textures/images**; **no skins**.
  - **No embedded camera** (`cameras: 0`). The Blender camera/path was *not*
    exported — so **the website camera must be driven in code** (R3F camera
    animated by the scroll timeline). Do not expect a camera track in the file.
- Load with `useGLTF` + **DRACO** decoder (`/public/draco/`) and/or meshopt.
- **Preload** and show a branded loader; gate the reveal on `onLoad`.
- Drive the clips via `useAnimations`: hold each `AnimationAction` paused and set
  `action.time` from scroll progress (scrub), rather than letting them play on a
  clock — this makes them reversible and synced to the scrollbar. Mix the 5 clips
  across scroll sections per `IMPLEMENTATION_PLAN.md`.
- Optimize: `gltf-transform` (draco, dedup, prune) to keep it light. Already
  small (~80 KB), so this is mostly future-proofing. Record final size here.

---

## 5. Ripple-on-hover shader

- Material extends a standard/physical material (via `CustomShaderMaterial` or
  `onBeforeCompile`) so lighting still works.
- **Uniforms:** `uTime`, `uPointer` (UV-space hover point), `uHover` (0→1 eased),
  `uAmplitude`, `uFrequency`, `uDecay`.
- **Vertex:** offset along normal by a decaying sine ring centered on `uPointer`.
- **Fragment:** optional subtle highlight/fresnel along the ripple crest.
- Smoothly **lerp** `uHover` and the pointer so ripples ease in/out (no
  popping). Raycast pointer → UV each frame only while hovering.
- Respect `prefers-reduced-motion`: clamp amplitude to 0.

---

## 6. Performance & device strategy

- **Code-split the 3D**: `dynamic(() => import('...Scene'), { ssr: false })`.
  Page HTML/content renders without WebGL.
- Cap `dpr` (e.g. `[1, 2]`), use drei `<AdaptiveDpr>` / `<PerformanceMonitor>`.
- Pause `useFrame`/rAF when the canvas is offscreen or tab hidden.
- Lazy-load below-the-fold imagery; `next/image` everywhere.
- Mobile / low-power / reduced-motion → static poster image instead of live
  canvas; no scrub, no ripple.
- Targets: LCP < 2.5s, CLS < 0.1, INP < 200ms (see `SEO_GEO.md`).

---

## 7. Tooling & DX

- ESLint (next + ts), Prettier, TypeScript strict.
- Husky + lint-staged (optional) to keep commits clean.
- `glsl` import support (vite/webpack loader or string templates) for shaders.
- Env: none required for v1 (no backend). Add only if analytics/CMS arrive.

---

## 8. Deferred / future (not v1)

- Headless CMS (Sanity/Contentful) — structure content now so this is a drop-in.
- Contact form backend (currently link/`mailto` or third-party form).
- Analytics (Vercel Analytics / GA4) + heatmaps.
