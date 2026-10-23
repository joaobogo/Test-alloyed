# Alloyed.io — Visual Production Brief for Lovable

Version 1 · October 2026 · Prepared by OmniFlow (Flow Group Ventures)

This document is the complete visual brief for the alloyed.io rebuild. It is written so it can be pasted into Lovable as one prompt, section by section, and so every output lands in a known place in the production repository.

---

## 0. How this works (read first)

**Division of labour.** The production site is a static Astro build in the GitHub repository (`src/`, `public/`). Every page is pre-rendered to HTML for search engines and AI assistants, which is the single biggest fix from the September audit. Lovable does not edit that code. Lovable produces **visual assets** (images, backgrounds, loops) and **animated React components**, which are then committed to the same repository and picked up automatically.

**Where output goes.**

| Lovable produces | Commit to | Picked up by |
|---|---|---|
| Images (WebP) | `public/img/<folder>/<exact file name>` | Templates check the path at build time and render the image when it exists. No code change needed. |
| Background loops (MP4) | `public/img/hero/home-loop.mp4` | Homepage hero, desktop only, muted, with the WebGL field as fallback. |
| Animated React components | `lovable/src/components/*.tsx` (Lovable's own project in a subfolder) | Copied into `src/islands/` and mounted as Astro islands. |

**Hard rules (these come from the audit and are non-negotiable).**

1. No asset over 400 KB. Hero backgrounds ≤ 400 KB, everything else ≤ 250 KB, video ≤ 1.5 MB. The old site shipped 27 MB on the homepage; the new one ships 34 KB of HTML. Keep it that way.
2. WebP for raster, SVG for marks and diagrams, MP4 (H.264, no audio track) for loops.
3. No text inside images. Headlines, numbers and labels are live HTML for SEO and translation. Images are environment, texture, people and abstract form only.
4. No stock-photo clichés: no handshakes, no headsets, no "diverse team pointing at a laptop", no glowing brains, no robots. The brand promise is precision and craft, not "AI magic".
5. Every animation must respect `prefers-reduced-motion` and must not block first paint. Components ship with a static fallback.
6. Keep the exact file names below. The templates look for those names.

---

## 1. Brand system (paste into Lovable's project knowledge)

**Positioning.** Alloyed (formerly SEBPO, founded 2006, Philadelphia metro HQ, woman-owned) runs outsourced ad operations, finance, compliance, data and customer-engagement teams for media, advertising and financial-services companies. Promise: teams that cost ~70% less and run at 99.99% accuracy. Proof: 92 NPS, 98% client retention, 43% of partnerships over five years, IAOP Global Outsourcing 100, Inc. 5000.

**The name.** An alloy is a precise fusion of elements that is stronger than any of them alone. Visual language follows from that: *molten metal, brushed steel, drawn wire, precision machining, crystalline structure, flow lines under heat*. Never "circuit boards" or "neural networks".

**Colors.**

| Token | Hex | Use |
|---|---|---|
| Ink 950 | #070a16 | Footer, deepest surfaces |
| Ink 900 | #0b1020 | Hero and dark section backgrounds (primary dark) |
| Ink 800 | #141a30 | Cards on dark |
| Ink 50 | #f5f6fa | Light section backgrounds |
| White | #ffffff | Light surfaces |
| Brand 600 (Alloyed blue) | #332cf2 | Primary accent, links, data |
| Brand 300 | #9aa0ff | Eyebrows on dark |
| Ember 500 (Alloyed orange) | #ff6b00 | CTAs, highlights, the "heat" in imagery |
| Ember 400 | #ff8a33 | Orange on dark backgrounds |
| Mint 500 | #16a36b | "On track" / success states only |

**Mood for imagery.** Deep ink backgrounds, cool blue mid-tones, one warm orange light source. Think *a steel workshop at night lit by a single forge*. High contrast, low saturation except the orange. Cinematic, 35 mm, shallow depth of field. Grain is fine; HDR gloss is not.

**Typography (for reference, never rendered into images).** Archivo 700 for headlines, Inter for body.

**Composition rules.** Subjects sit in the right or lower-right third; the left 55% of hero images must stay quiet and dark so headlines read on top. Images are always placed behind or beside live text, never as the carrier of a message.

---

## 2. Asset manifest

Every row is one file. Column "Fallback" is what the site shows today if the file is missing, so nothing is blocked on Lovable.

### 2.1 Homepage

| # | File | Size | Placement | Fallback |
|---|---|---|---|---|
| H1 | `public/img/hero/home-bg.webp` | 2400×1400 | Full-bleed hero background, 70% opacity behind a dark gradient on the left | Real-time WebGL alloy field |
| H2 | `public/img/hero/home-loop.mp4` | 1920×1080, 8–10 s, ≤1.5 MB, muted, seamless loop | Desktop-only hero loop, poster = H1 | H1, then WebGL |
| H3 | `public/img/textures/alloy-dark.webp` | 1920×1080 | Subtle texture behind dark sections (Why Alloyed, CTA) at 8–12% opacity | Grid pattern |
| H4 | `public/img/textures/alloy-light.webp` | 1920×1080 | Texture behind light sections at 4–6% | Flat Ink 50 |

**Prompt H1 (hero still).** "Cinematic macro photograph of molten alloy being drawn into thin parallel wires, deep navy-black environment (#0b1020), a single warm orange light source (#ff6b00) from the lower right, cool blue reflections (#332cf2) on the metal, extremely shallow depth of field, fine film grain, the left half of the frame nearly black and empty, no text, no people, no sparks flying, 16:9, 2400×1400."

**Prompt H2 (loop).** "Slow, seamless 8-second loop of the same scene: the drawn wires glide diagonally from lower-left to upper-right at walking pace, light pulses almost imperceptibly, no cuts, no camera shake, first and last frames identical. Export H.264 MP4, no audio, under 1.5 MB."

**Prompt H3/H4 (textures).** "Tileable brushed-steel surface, extremely subtle, near-monochrome. Dark version on #0b1020 with highlights no brighter than #27304d. Light version on #f5f6fa with lines no darker than #d3d8e6. No noise hotspots, no visible seam."

### 2.2 Service pages (six)

File pattern `public/img/services/<slug>-hero.webp`, 1600×1000, placed in the right column of the hero above the "Published outcomes" card. Composition: subject right-weighted, dark edges, one orange light source.

| Slug | Subject direction |
|---|---|
| `marketing-services` | A wall of digital ad placements rendered as backlit glass tiles in a dark gallery; one tile glowing orange, the rest cool blue; tiles align in a perfect grid (precision, not chaos). |
| `finance-accounting` | Close-up of ledger-like steel rails with glowing numeric tick marks receding into darkness; feels like a precision instrument, not a spreadsheet. |
| `compliance-risk` | A vault-like machined steel aperture, partially open, warm light inside, cool exterior; conveys controlled access. |
| `data-analytics` | A dense field of thin vertical light filaments forming a smooth surface, like a 3D chart made of drawn wire; one filament orange. |
| `customer-engagement` | Two interlocking machined rings (an alloy of two parts), brushed steel, soft orange rim light; no faces. |
| `operational-excellence` | A row of identical precision gauges in dark steel, needles perfectly aligned; one gauge face lit orange. |

Shared prompt suffix: "deep navy-black environment (#0b1020), brushed-metal materials, single warm orange light (#ff6b00), cool blue fill (#332cf2), cinematic 35 mm, shallow depth of field, fine grain, no text, no people, no logos, 16:10, 1600×1000."

### 2.3 Industry pages (six)

File pattern `public/img/industries/<slug>-hero.webp`, 1600×1000, same placement as services.

| Slug | Subject direction |
|---|---|
| `media-publishers` | A broadcast control room at night, out-of-focus wall of monitors in cool blue, one orange tally light in focus. |
| `advertising-adtech` | Abstract: a stream of thousands of tiny glass squares (ad impressions) flowing through a machined steel channel. |
| `retail-media-ecommerce` | Backlit retail shelf edge labels rendered as a long luminous strip receding into dark, cool blue with an orange price-light accent. |
| `financial-services` | Polished steel vault-door mechanism, gears meshed, warm light from within, strict symmetry. |
| `travel-hospitality` | Departure-board style split-flap panels rendered in brushed steel, mid-flip motion blur, one orange character. |
| `sports-entertainment` | Empty stadium at night from the tunnel, floodlights cool blue, one orange sideline display glowing. |

### 2.4 Case studies (24)

File pattern `public/img/case-studies/<first 60 characters of slug>.webp`, 1600×900. Used as the header image on the case-study page and as the card image on index pages. Clients are anonymous, so no real brands, no recognisable logos, no real people.

Generate per industry family, reused across studies in that family with variations:

| Family | Slugs (first 60 chars) | Direction |
|---|---|---|
| Sports | `how-a-global-sports-brand-protected-sponsorship-revenue-and-` | Stadium concourse signage, abstract, no team marks |
| Travel | `strengthening-engagement-and-financial-operations-for-a-lead` | Airport pier at night, long exposure, cool blue, orange runway light |
| Financial services | `scaling-aml-kyc-operations-to-strengthen-risk-detection-and-`, `how-a-global-financial-intelligence-firm-improved-data-accur`, `how-sebpos-urgent-protection-of-financial-markets-turned-int`, `bpo-automation-of-global-sales-and-marketing-insights-streng`, `outsourcing-partner-automates-workflow-and-reporting-for-str` | Trading-floor-adjacent abstraction: tickers as light rails, machined steel, no numbers readable |
| Media & publishers | `unlocking-30-greater-efficiency-for-a-global-advertising-bra`, `scaling-financial-operations-billing-accuracy-for-a-high-gro`, `elevating-customer-engagement-through-integrated-social-plan`, `automating-quality-control-with-qa-outsourcing-auditor-tool`, `scaling-digital-ad-production-through-creative-outsourcing-y`, `data-engineering-outsourcing-significantly-improves-client-w`, `how-alloyed-cut-media-ad-ops-hiring-costs-by-70`, `pharma-media-giant-cuts-2m-in-costs-by-outsourcing-advertisi`, `task-automation-increases-productivity-by-500`, `global-broadcaster-scales-ad-ops-with-major-cost-savings` | Studio and control-room environments, monitor walls out of focus, cool blue with one orange light |
| Ad tech | `closing-a-7-day-data-gap-how-outsourcing-unlocked-real-time-`, `how-an-adtech-leader-doubled-creative-output-without-increas`, `high-volume-platform-organization-streamlines-peak-season-op`, `digital-marketing-outsourcing-empowers-flexible-scalability-` | Flowing impressions as glass particles through steel channels |
| Retail media | `retail-media-network-improves-speed-to-market-by-outsourcing`, `grocery-retail-company-estimates-50-in-cost-savings-with-ret`, `retail-media-scaling-to-new-regions` | Luminous shelf-edge strips, dark aisle, no products readable |

Shared prompt suffix as in 2.2, aspect 16:9, 1600×900. Vary camera angle and light position across a family so cards on the same index page don't look identical.

### 2.5 Perspectives and news (13)

File pattern `public/img/articles/<first 60 characters of slug>.webp`, 1600×900. Editorial, abstract, brand-coloured. One concept per piece:

| Slug (first 60) | Concept |
|---|---|
| `why-most-ai-initiatives-in-media-operations-fail-and-what-ac` | A bridge of drawn wire with one missing span, orange light on the gap |
| `lauren-kochan-on-ai-and-the-future-of-managed-services` | Two alloys fusing at a seam, human scale implied by a steel rule |
| `how-to-automate-operations-from-the-ground-up` | Foundations: machined steel footings in a row, first one lit orange |
| `how-shared-services-and-global-business-services-leaders-are` | A globe implied by concentric steel rings, one ring orange |
| `8-ways-outsourcing-empowers-accelerated-automation` | Eight parallel wire rails accelerating into motion blur |
| `why-human-in-the-loop-automation-is-the-real-key-to-outsourc` | A loop of wire passing through a steel aperture, hand-scale, no hand visible |
| `3-things-about-human-in-the-loop-hitl-you-must-understand-be` | Three machined keys on a steel surface, one lit |
| `cracking-the-code-how-outsourcing-transforms-data-and-analyt` | A crystalline alloy cross-section revealing a lattice, cool blue with orange facets |
| `alloyed-partners-with-beam-ai-to-put-ai-agents-into-client-o` | Two beams of light meeting at a steel junction |
| `alloyed-announces-strategic-partnership-with-simplismart-llc` | Two gears of different metals meshing cleanly |
| `lauren-kochan-on-ai-and-the-future-of-managed-services` (news) | Reuse the perspective concept |
| `alloyed-and-supervity-partner-to-deliver-people-ai-solutions` | A row of steel desks with one chair lit orange, empty, abstract |
| `alloyed-solutions-inc-announces-management-buyout-and-new-ce` | A single alloy ingot stamped blank, warm light; new beginning |

### 2.6 People and places

| File | Size | Notes |
|---|---|---|
| `public/img/leadership/lauren-kochan.webp`, `j-c-groon.webp`, `brian-anderson.webp`, `ray-adamson.webp` | 800×800 | **Real photographs supplied by the client.** Do not generate faces of real people. If photos are not available, leave empty; the site shows initials. For Lovable: produce only the treatment spec: neutral Ink 900 background, soft key light from upper left, subject desaturated 10%, 1:1 crop at shoulders. |
| `public/img/locations/philadelphia-metro.webp`, `san-salvador.webp`, `manila.webp`, `dhaka.webp` | 1200×800 | Skyline-at-dusk abstractions for each city, cool blue with one orange light, no landmarks that would be wrong (be generic: towers, water, roads). |
| `public/img/culture/culture-1.webp` … `culture-5.webp` | 1200×800 | Workplace environment without faces: a training room with empty chairs lit warm; a desk with a headset and a steel rule; hands on a keyboard in cool light; a team table from above with laptops; a corridor with Alloyed-orange accent lighting. Diverse hands where hands appear. |

### 2.7 Pricing and contact

| File | Size | Notes |
|---|---|---|
| `public/img/hero/pricing-bg.webp` | 2400×1400 | Two ingots side by side, one three times larger, same light; the visual of "$850K vs $250K" without any numbers. |

---

## 3. Animated components (React, built in Lovable, mounted as Astro islands)

Build these as self-contained React components, TypeScript, no external animation libraries heavier than Framer Motion, each under 15 KB gzipped, with a `reducedMotion` prop that renders the static state. Export default. No global CSS; Tailwind utility classes are fine.

| # | Component | Where it goes | Behaviour |
|---|---|---|---|
| A1 | `AlloyForgeHero.tsx` | Homepage hero background (replaces WebGL when present) | 3D-feeling layered parallax of 5 wire-field PNG/WebP layers (supplied from H1 as separated layers) moving at different speeds with pointer and scroll; 60 fps; pauses off-screen. |
| A2 | `CounterGrid.tsx` | Stats band | Four numbers count up from 0 to final (92, 98%, 99.99%, 43%) over 1.1 s with ease-out when scrolled into view. Final values are rendered in the DOM before animation. |
| A3 | `FlowPipeline.tsx` | "Work goes in. Measured outcomes come out." | SVG pipeline: particles (impressions, invoices, tickets as tiny glyphs) enter from the left, pass through three glowing nodes (Ingest, Analyze, Optimize), exit as checkmarks on the right. Continuous, 24 particles max, GPU-friendly transforms only. |
| A4 | `CoverageClock.tsx` | Global delivery page | A 24-hour ring; as the ring sweeps, segments light for Philadelphia, San Salvador, Dhaka, Manila; a "centers on shift" number updates. Option to scrub with the pointer. |
| A5 | `SavingsMeter.tsx` | Pricing / calculator result | A horizontal meter that fills from $850K down to the Alloyed figure with a spring; number ticks; orange fill. Props: `inHouse`, `alloyed`. |
| A6 | `LogoMarquee.tsx` | Partner strip | Gentle infinite marquee of the four partner SVGs, pauses on hover, static row under reduced motion. |
| A7 | `PhoneReveal.tsx` | Demo page | A phone frame that slides up and tilts 6° on scroll with a screenshot inside, then straightens. |

Acceptance for every component: renders without network calls, no layout shift (reserve height), works at 360 px wide, Lighthouse performance stays ≥ 95 mobile on the page that hosts it.

---

## 4. Lovable project setup prompt (paste as the first message)

> You are producing visual assets and animated React components for alloyed.io, a B2B operations-outsourcing company. You are not building pages. Create a Vite + React + TypeScript project named `alloyed-visuals` with Tailwind. Add a `/gallery` route that previews every component and image in section 2 and 3 of the brief side by side at 390 px and 1440 px widths. Use this palette: ink #0b1020, ink-800 #141a30, brand #332cf2, brand-300 #9aa0ff, ember #ff6b00, ember-400 #ff8a33, mint #16a36b, light #f5f6fa. Fonts: Archivo 700 for headings, Inter for body (Google Fonts are fine inside this preview project only). Every component must accept a `reducedMotion` boolean and render a static version when true. Export generated images to `public/img/...` using the exact file names in the brief, as WebP quality 80, under 250 KB (hero backgrounds under 400 KB). Never put text, logos or real people in images. Visual language: molten alloy, brushed steel, drawn wire, precision machining, one warm orange light in a deep navy environment. Avoid stock-photo clichés, robots, glowing brains and circuit boards.

Then paste section 2 for images and section 3 for components, one subsection per message.

---

## 5. Hand-back and GitHub as the source of truth

1. Lovable connects to the repository and works in `lovable/` (its own Vite project). It never touches `src/`, `public/img/` is the only shared folder it writes to.
2. After each Lovable export, run `npm run build` at the repository root. The Astro build checks every slot and renders whichever images exist.
3. For components, copy `lovable/src/components/<Name>.tsx` to `src/islands/<Name>.tsx`; the Astro side mounts them with `client:visible`. This step is one line per component and is done by Claude.
4. Quality gates before merge (all in the repository, run with `astro preview`): `node scripts/links.mjs`, `node scripts/axe.mjs`, `node scripts/qa.mjs`, `node scripts/lh.mjs http://127.0.0.1:4321/`. Thresholds: no broken links, no axe violations, Lighthouse ≥ 95 mobile.
5. Branch model: `main` is production (Netlify deploys from it). Lovable commits to `lovable/visuals`; Claude reviews, runs the gates and merges.

---

## 6. Checklist for the first Lovable session

- [ ] H1 hero still and H2 loop (the single biggest visual upgrade)
- [ ] Six service heroes (2.2)
- [ ] Six industry heroes (2.3)
- [ ] Two textures (H3, H4)
- [ ] A2 CounterGrid and A3 FlowPipeline (highest-impact animations)
- [ ] Gallery route reviewed at 390 px and 1440 px
- [ ] Every file under its size limit; `ls -la public/img/**` to confirm

Second session: case-study and article images (2.4, 2.5), locations and culture (2.6), A1, A4–A7.
