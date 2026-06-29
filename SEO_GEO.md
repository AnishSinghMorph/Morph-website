# SEO_GEO.md — Search + Generative Engine Optimization

How the Morph site stays discoverable by **search engines (SEO)** and **AI
answer engines (GEO** — ChatGPT, Perplexity, Google AI Overviews, Gemini,
Claude). A 3D site is high-risk for both because content can hide inside WebGL —
this doc exists to prevent that.

---

## 1. The one rule that matters most

**All meaningful content must be real, server-rendered HTML — never trapped in
the canvas.** The 3D layer is decoration mounted on top (client-only,
`ssr:false`). Search crawlers and AI crawlers must read headings, paragraphs,
lists, and links directly in the DOM. If a section's words only exist as WebGL
text, they are invisible to both Google and LLMs. Verify with "View Source" and
by disabling JS — the page should still convey the full message.

---

## 2. SEO foundations (Next.js App Router)

- **Metadata API** per route: unique `title`, `description`, canonical, Open
  Graph, Twitter card. Use a shared helper in `src/lib/seo.ts`.
- **Semantic HTML:** one `<h1>` per page, logical `<h2>/<h3>`, `<nav>`, `<main>`,
  `<section>`, `<footer>`, descriptive `<a>` text (no "click here").
- **`sitemap.ts`** (all routes) + **`robots.ts`** (allow crawl, point to
  sitemap). Submit in Google Search Console + Bing Webmaster.
- **Canonical URLs** on every page using the real production domain.
- **Image SEO:** `next/image`, descriptive `alt` on every meaningful image,
  lazy-loading, modern formats.
- **Internal linking:** services → work → page detail; footer sitemap links.
- **Clean URLs:** the routes in `CLAUDE.md` §1 (`/experience-center`, etc.).
- **404 + redirects:** at launch, 301-map any legacy URLs being replaced to the
  new routes (for SEO continuity only — the old site is not a design reference).

---

## 3. Structured data (JSON-LD) — feeds both SEO & GEO

Inject per page via a `<script type="application/ld+json">`. AI engines lean on
structured data to extract facts.

- **Site-wide:** `Organization` (name "Morph" / legal name, logo, url, sameAs →
  Instagram, LinkedIn, contact) + `WebSite` (with `SearchAction` if search).
- **Home:** `Organization` + `WebSite`.
- **Service pages:** `Service` / `CreativeWork` describing the offering.
- **Corporate Films:** `VideoObject` for showreel/films (name, thumbnail,
  description, uploadDate, duration, contentUrl/embedUrl).
- **Events:** `Event` (name, dates, location) where applicable.
- **Work/case studies:** `CreativeWork` with client, location, category.
- **Breadcrumbs:** `BreadcrumbList` on inner pages.

Keep JSON-LD facts in sync with visible copy (don't assert what isn't on-page).

---

## 4. GEO — being citable by AI engines

GEO optimizes for being **retrieved, understood, and cited** in AI answers.

- **Answer-first, factual copy.** State who Morph is, what it does, where, for
  whom — in plain declarative sentences near the top. AI extracts clean facts,
  not marketing fluff. Example seed: *"Morph is a creative technology company
  that designs immersive experience centers, corporate films, software & apps,
  and live events for brands worldwide."*
- **Self-contained sections.** Each section should stand alone with a clear
  heading that answers a question ("What is an experience center?", "What does
  Morph build?") — chunk-friendly for retrieval.
- **Entity clarity & consistency.** Same brand name, descriptions, NAP (name,
  address, phone), and service names everywhere (site, JSON-LD, social, listings)
  so engines resolve "Morph" to one entity.
- **Strong structured data** (§3) — the machine-readable spine of GEO.
- **FAQ content** where natural (services, process) — optionally `FAQPage`
  JSON-LD; maps directly to how people query AI.
- **Authoritative signals.** Real client names, locations, case-study specifics,
  and outbound/inbound credible links raise trust and citation odds.
- **`llms.txt`** (optional, low-cost): a root `/llms.txt` summarizing the site
  and linking key pages for LLM crawlers.
- **Crawlable to AI bots:** in `robots.ts`, allow major AI crawlers (GPTBot,
  PerplexityBot, ClaudeBot, Google-Extended) unless the business decides
  otherwise. **Decision point for the user** — default: allow.
- **Freshness:** keep `dateModified` accurate; update work/events regularly.

---

## 5. Performance = ranking + UX (Core Web Vitals)

3D is heavy; protect the budget so SEO/GEO and UX don't suffer.

| Metric | Target |
|--------|--------|
| LCP | < 2.5s |
| CLS | < 0.1 |
| INP | < 200ms |
| TTFB | < 0.8s (SSG/ISR on Vercel edge) |

Tactics: SSG/ISR HTML so first paint never waits on WebGL; **dynamic-import the
canvas** (`ssr:false`) so 3D loads after content; preconnect/preload fonts &
GLB; `gltf-transform` (DRACO + texture compression) on the model; `next/image`
everywhere; cap `dpr`; pause rAF offscreen; avoid layout shift by reserving
canvas space. Test with Lighthouse + PageSpeed (lab) and Search Console (field).

---

## 6. Accessibility (also helps SEO/GEO)

- Semantic landmarks + heading order (already required above).
- `prefers-reduced-motion`: disable scrub/ripple, static poster.
- Keyboard navigable; visible focus; sufficient contrast (per `STYLE.md`).
- Alt text on all informative imagery; aria-labels on icon-only controls.

---

## 7. Per-page SEO/GEO definition of done
1. Unique title + meta description + canonical + OG/Twitter.
2. One `<h1>`, semantic heading tree, crawlable body copy (verify JS-off).
3. Appropriate JSON-LD present and matching visible content.
4. Images optimized with alt text; internal links in place.
5. CWV within budget (lab + field).
6. Added to sitemap; indexable (no stray `noindex`).

---

## 8. Launch SEO checklist
- ☐ Verify Google Search Console + Bing; submit sitemap.
- ☐ 301 redirects from any legacy URLs being replaced (SEO continuity only).
- ☐ Confirm canonical domain (www vs apex) + HTTPS.
- ☐ Robots allows search + (decided) AI crawlers; sitemap referenced.
- ☐ OG images render in social/link-preview debuggers.
- ☐ Structured data passes Rich Results Test.
- ☐ Lighthouse SEO ≥ 95 on every page; CWV green.
- ☐ Test the site in an AI engine ("What does Morph do?") post-launch; refine
  copy/structured data based on how it's summarized.

---

## 9. Open decisions for the user
- Allow AI crawlers (GPTBot/PerplexityBot/ClaudeBot/Google-Extended)? Default: **yes**.
- Final production domain (for canonical + sitemap)?
- Adopt `/llms.txt`? Default: **yes** (low effort, GEO upside).
- Add `FAQPage` content/markup? Recommended where natural.
