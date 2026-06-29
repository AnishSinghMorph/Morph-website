# STYLE.md — Morph Design System

This is the **design source of truth for code**. It mirrors Figma exactly.
Every color, type, spacing, and radius used in components must come from a token
here. **Figma wins** on any static value; when Figma and this file disagree,
update this file to match Figma.

> ✅ Values below are **pulled from the Figma home frame (`190-33`)** via the MCP.
> Inner-page frames may introduce new tokens — extend this file (don't hardcode)
> when building Phase 4. Anything still `TBD` is genuinely not yet in Figma.

Figma file: `https://www.figma.com/design/fsG3EA4wHahiLdSEFw9dyX/Morph`

---

## 1. Figma extraction checklist (do this first)

For the home frame (`190-33`) and each page frame, use the Figma MCP to capture:

- [ ] **Color styles** — every fill/stroke as hex + opacity; name them.
- [ ] **Text styles** — family, weight, size, line-height, letter-spacing, case.
- [ ] **Effects** — shadows, blurs (x/y/blur/spread/color).
- [ ] **Layout grid** — columns, gutter, margin, max content width.
- [ ] **Spacing scale** — auto-layout paddings/gaps actually used.
- [ ] **Corner radii** — per component.
- [ ] **Breakpoints** — desktop / tablet / mobile frame widths.
- [ ] **Assets** — export SVG/PNG (logo, icons, marks like the M-O-R-P-H letters).

Fill the tables in §2–§7, then delete the placeholder note above.

---

## 2. Color tokens

> **Dark mode only** (confirmed). No light theme, no toggle. Define only the
> dark palette; set `color-scheme: dark` globally. Replace values from Figma.
> Use CSS variables in `:root` and a Tailwind theme extension.

```css
:root {
  /* Core (Figma 190-33) */
  --color-bg:            #000000; /* page background (hero + footer) */
  --color-surface:       #0c0604; /* mid-stop of the warm intro gradient */
  --color-text:          #ffffff; /* primary text */
  --color-text-muted:    #86746a; /* warm taupe — copyright / fine print */
  --color-accent:        #ff8800; /* brand accent ("Color mrp"): the ".", NEXT GEN */
  --color-on-accent:     #1a1a1d; /* dark text on light/accent pills (links) */
  --color-border:        #1a1a1d; /* hairlines / pill outlines */

  /* States */
  --color-focus-ring:    #ff8800; /* = accent */

  /* Warm radial backdrop behind the intro (Rectangle 4) */
  --grad-intro: radial-gradient(120% 90% at 75% 80%,
    #170c07 0%, #0c0604 51%, #000000 100%);
}
```

| Token | Value (dark) | Usage |
|-------|--------------|-------|
| bg | `#000000` | page background (hero, footer) |
| surface | `#0c0604` | warm gradient mid-stop / panels |
| text | `#ffffff` | primary text |
| text-muted | `#86746a` | copyright, fine print |
| accent | `#ff8800` | the trailing ".", "NEXT GEN", ripple tint |
| on-accent | `#1a1a1d` | dark text on light pills (social links) |
| border | `#1a1a1d` | hairlines, pill outlines |

> The intro sits on a warm **radial gradient** (`--grad-intro`):
> `#170c07 → #0c0604 → #000000`, glow centred lower-right.

---

## 3. Typography

> Pulled from Figma (`190-33`). Self-host via `next/font`.
> **Display & UI font = `Exo`** (Google Fonts). **Body (long-form) = `Fellix`** —
> ⚠️ Figma uses *Fellix-TRIAL*, a **commercial font not on Google Fonts**. Until
> the licensed file is supplied we use a close free stand-in (`Manrope`) via
> `--font-body`. `TODO:` drop in licensed Fellix (swap one next/font call).

```css
:root {
  --font-display: "Exo", sans-serif;     /* headings + small UI text */
  --font-body:    "Manrope", sans-serif; /* TODO: Fellix (licensed) — long-form body */
}
```

| Style | Font | Weight | Size (desktop @1920) | Line-height | Case | Notes |
|-------|------|--------|----------------------|-------------|------|-------|
| Display / section H | Exo | 400 | 96px | normal (~1.0) | as-is | hero statement, "WHO WE ARE.", "GALLERY.", "OUR WORK.", "DIGITAL SOLUTIONS." — trailing `.` in accent |
| Body L | Fellix→Manrope | 400 | 32px | normal (~1.3) | — | intro paragraph |
| Body emphasis | Fellix→Manrope | 400 | 35px | normal | UPPER | "Your brand has a challenge…" line |
| Caption / fine | Exo | 500 | 16px | normal | — | copyright (#86746a) |
| Link / label | Exo | 600 | 15px | normal | UPPER | social links ("/ CONTACT") |

Use **fluid type** (`clamp()`) so the 96px display scales down on small screens
(`--text-display`), matching Figma at 1920 and degrading gracefully below.

---

## 4. Spacing & layout

```css
:root {
  /* Figma frame is 1920 wide; content margin = 128px each side → 1664 content. */
  --container-max: 1664px;                       /* content width (1920 − 2×128) */
  --margin-page:   clamp(1.25rem, 6.67vw, 8rem); /* 128px @1920, fluid down */
  --gutter:        clamp(1rem, 1.67vw, 2rem);    /* ~32px @1920 */
}
```

- **Design frame width:** 1920 (desktop reference). Full-bleed media ignores the
  page margin; text/columns respect `--margin-page`.
- **Breakpoints:**
  - mobile: `≤ 640px`
  - tablet: `641–1024px`
  - desktop: `1025–1440px`
  - wide: `> 1440px` (Figma reference 1920)

---

## 5. Radii, borders, shadows

```css
:root {
  --radius-sm: TBD; --radius-md: TBD; --radius-lg: TBD; --radius-full: 9999px;
  --border-width: 1px;
  --shadow-sm: TBD;
  --shadow-lg: TBD;
}
```

---

## 6. Iconography & assets

- Export icons as **SVG** from Figma → `public/icons/` (or inline components).
- Logo / wordmark and any decorative marks (e.g. M·O·R·P·H letters, play arrow)
  exported at correct density.
- Keep an `assets-manifest` note here mapping Figma layer → file path.

---

## 7. Motion language

Motion is **not** in Figma — it's defined here + the mont-fort reference. Keep it
consistent across the site.

| Motion | Spec |
|--------|------|
| Page/scroll feel | Lenis smooth scroll; `lerp ≈ 0.08–0.1`, no harsh stops. |
| Section reveals | fade + 12–24px rise, `ease: power3.out`, ~0.6–0.9s, stagger ~0.06s. |
| 3D scrub | model/camera tied to scroll progress (`scrub`), eased, reversible. |
| Hover ripple | concentric ripple eased in over ~0.3s, decays over ~1.2s; amplitude small/elegant — not gimmicky. |
| Buttons/links | subtle scale/underline/color shift ~0.2s `ease-out`. |
| Cursor (optional) | custom cursor if Figma specifies. |
| Reduced motion | all scrub/ripple/parallax disabled; instant reveals; static model poster. |

**Easing tokens**
```
--ease-out:    cubic-bezier(0.16, 1, 0.3, 1);   /* primary */
--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
--dur-fast: 200ms; --dur-base: 600ms; --dur-slow: 900ms;
```

---

## 8. Component inventory (build from Figma)

**Catalogue components from Figma only** (names below are generic placeholders —
the real set, naming, and structure come from the Figma frames). Typical
candidates: **Nav**, **Hero** (headline + 3D), **cards** (with hover states),
**filter/tabs**, **logo marquee**, **section heading**, **CTA band**, **Footer**
(links, socials, wordmark), **Buttons** (primary/ghost), **media/video block**.
For each actual Figma component capture: variants, states
(default/hover/focus/active), responsive behavior, and exact tokens.

---

## 9. Implementation mapping

- Put all tokens in `src/styles/tokens.css` (CSS vars) and extend Tailwind's
  theme to reference them (`colors`, `fontFamily`, `spacing`, `borderRadius`).
- Never hardcode raw hex/px in components — reference tokens/utilities.
- When a needed value has no token, **add the token here first**, then use it.
