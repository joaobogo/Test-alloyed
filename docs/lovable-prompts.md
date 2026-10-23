# Alloyed.io — The Lovable Prompt Pack

Version 1 · October 2026 · Companion to `docs/lovable-visual-brief.md`

This is the complete, ordered set of prompts to paste into Lovable. Work top to bottom. Each prompt is self-contained and ends with an acceptance check so you know when to move on. Prompts are written in the imperative voice Lovable responds to best. Where a prompt says "generate image", use Lovable's image generation (or its connected image model); where it says "build", Lovable writes React.

Timeline: Session 1 = Phases 0 to 2 (about two hours). Session 2 = Phases 3 to 5. Session 3 = Phases 6 to 8.

---

## Phase 0 — Project setup (three prompts, in order)

### P0.1 Create the project

> Create a Vite + React + TypeScript project called `alloyed-visuals` with Tailwind CSS. This project is a visual production studio for alloyed.io, a B2B operations-outsourcing company. It is NOT the website. Its only purpose is to generate image assets and build animated React components that will be copied into a separate Astro site. Set up this folder structure: `public/img/hero`, `public/img/textures`, `public/img/services`, `public/img/industries`, `public/img/case-studies`, `public/img/articles`, `public/img/locations`, `public/img/culture`, `public/img/leadership`, `src/components`, `src/gallery`. Add a `/gallery` route (React Router) that lists every image in `public/img` by folder with its file size in KB printed under it in red if it is over its limit (400 KB for `hero/*.webp`, 1.5 MB for `*.mp4`, 250 KB everything else) and green otherwise. Add a `/components` route that renders every component in `src/components` twice side by side: once in a 390 px wide frame with a phone bezel and once in a 1440 px frame, each with a toggle for `reducedMotion`. Load Archivo 700 and Inter 400 to 700 from Google Fonts for this preview only.

Acceptance: `/gallery` and `/components` routes render, size badges show, fonts load.

### P0.2 Project knowledge (paste into Lovable's Knowledge / custom instructions, not the chat)

> BRAND: Alloyed (formerly SEBPO). Founded 2006, Philadelphia metro, woman-owned. Runs outsourced ad-operations, finance, compliance, data and customer-engagement teams for media, advertising and financial-services companies. Promise: teams that cost about 70% less and run at 99.99% accuracy. Proof points: 92 NPS, 98% client retention, 43% of partnerships over five years, IAOP Global Outsourcing 100, Inc. 5000.
>
> THE NAME: an alloy is a precise fusion of elements that is stronger than any of them alone. All imagery follows from that: molten metal, brushed steel, drawn wire, precision machining, crystalline lattice, flow lines under heat. Never circuit boards, neural networks, robots, glowing brains, handshakes, headsets, or "diverse team pointing at a laptop".
>
> PALETTE (use these exact hex values everywhere): ink-950 #070a16, ink-900 #0b1020 (primary dark), ink-800 #141a30, ink-50 #f5f6fa, white #ffffff, brand-600 #332cf2 (Alloyed blue, data and links), brand-300 #9aa0ff, ember-500 #ff6b00 (Alloyed orange, CTAs, the single warm light source in every image), ember-400 #ff8a33, mint-500 #16a36b (success only).
>
> IMAGE MOOD: a steel workshop at night lit by one forge. Deep ink background, cool blue mid-tones, exactly one warm orange light source. High contrast, low saturation except the orange. Cinematic 35 mm, shallow depth of field, fine film grain. No HDR gloss, no lens flares, no sparks flying, no neon.
>
> COMPOSITION: the subject sits in the right or lower-right third. The left 55% of every hero image stays quiet and nearly black so live HTML headlines read on top. Images never carry a message; they are environment and texture only.
>
> HARD RULES: no text inside images, no logos, no real people's faces, no stock clichés. WebP quality 80 for raster, SVG for marks, H.264 MP4 without audio for loops. File sizes: hero backgrounds ≤ 400 KB, everything else ≤ 250 KB, video ≤ 1.5 MB. Use the exact file names given; the site looks for those names.
>
> MOTION RULES: every component accepts `reducedMotion: boolean` and renders the final static state when true. Nothing blocks first paint. Reserve height to avoid layout shift. Transforms and opacity only (no animating width, height, top or left). 60 fps on a mid-range Android phone. Pause when off-screen using IntersectionObserver. No animation library heavier than Framer Motion; prefer CSS and the Web Animations API.
>
> TYPOGRAPHY (reference only, never rendered into images): Archivo 700 headlines, tight letter-spacing (-0.02em); Inter body.

### P0.3 Preview harness for hero legibility

> On the `/gallery` route, add a "Hero check" panel: it shows `public/img/hero/home-bg.webp` (or a placeholder if missing) at 1440×800 with this exact overlay on top so I can judge legibility: a left-to-right gradient from #0b1020 at 100% opacity to transparent at 60% width, then the headline "Teams that cost 70% less and miss nothing." in Archivo 700, 64 px, white, max width 14ch, positioned at left 8%, vertically centered, and a sub-line in Inter 18 px at 75% white. Also show the same at 390×700 with the headline at 40 px. If the image makes the headline hard to read, say so in a red note under the panel.

Acceptance: both previews render with overlay text; this is the panel you will use to approve every hero image.

---

## Phase 1 — Hero and textures (the single biggest visual upgrade)

### P1.1 Hero still, three variants

> Generate three variants of the homepage hero background and save them as `public/img/hero/home-bg-a.webp`, `home-bg-b.webp`, `home-bg-c.webp`, 2400×1400, WebP quality 80, each under 400 KB.
>
> Prompt for all three: "Cinematic macro photograph of molten alloy being drawn into dozens of thin parallel wires, deep navy-black environment (#0b1020), one warm orange light source (#ff6b00) from the lower right, cool blue reflections (#332cf2) along the wires, extremely shallow depth of field, fine 35 mm film grain, the left half of the frame nearly black and empty, no text, no people, no sparks, no lens flare, 16:9."
>
> Variant A: wires run diagonally lower-left to upper-right. Variant B: wires run horizontally and converge toward a vanishing point on the right. Variant C: wires are vertical and the orange light comes from below, like a forge under them. Show all three in the Hero check panel and tell me which one keeps the left 55% darkest.

Acceptance: three files under 400 KB, left 55% average luminance below 8% (Lovable can compute this with a canvas: sample the left 55%, average the luma, print it).

### P1.2 Pick and finalise

> Keep variant [A/B/C] as `public/img/hero/home-bg.webp`. Delete the other two. If any area in the left 55% is brighter than #1a2140, darken it with a soft gradient so the headline reads. Export at 2400×1400 and also a 1200×700 version named `home-bg-sm.webp` for phones, both WebP quality 80.

### P1.3 Hero loop

> Produce an 8 to 10 second seamless loop based on `home-bg.webp`: the drawn wires glide slowly along their own direction at walking pace, the orange light pulses by no more than 10% in brightness over the loop, no cuts, no camera movement, first and last frames identical. Export as `public/img/hero/home-loop.mp4`, 1920×1080, H.264, no audio track, CRF around 28, under 1.5 MB. Also export the first frame as the poster `public/img/hero/home-poster.webp` 1920×1080 under 250 KB. If you cannot render video, instead export five separated depth layers of the hero as transparent WebP (`home-layer-1.webp` far background to `home-layer-5.webp` foreground, each 2400×1400, under 200 KB each) so the parallax component in Phase 6 can animate them.

Acceptance: loop plays seamlessly in the gallery (loop it and watch the join twice), or five layers exist.

### P1.4 Section textures

> Generate two tileable textures, 1920×1080, WebP quality 80, under 250 KB each.
> `public/img/textures/alloy-dark.webp`: "Brushed-steel surface, extremely subtle, near-monochrome, on #0b1020; brush lines run horizontally; the brightest highlight is no brighter than #27304d; no hotspots; perfectly tileable with no visible seam."
> `public/img/textures/alloy-light.webp`: "Same brushed surface on #f5f6fa; lines no darker than #d3d8e6; tileable."
> In the gallery, show each texture tiled 3×3 at 10% opacity over its base colour so I can check the seam.

### P1.5 Pricing hero

> Generate `public/img/hero/pricing-bg.webp`, 2400×1400, under 400 KB: "Two rectangular alloy ingots side by side on a dark brushed-steel bench, the left ingot roughly three times the size of the right one, identical material and finish, one warm orange light (#ff6b00) from the upper right, cool blue fill (#332cf2), deep navy-black background (#0b1020), the left 55% of the frame quiet and dark, no text, no numbers, no people, cinematic 35 mm, shallow depth of field, fine grain." The idea is "$850K vs $250K" without any numbers.

---

## Phase 2 — Service page heroes (six images)

### P2.1 Batch prompt

> Generate six images, 1600×1000 (16:10), WebP quality 80, each under 250 KB, saved to `public/img/services/` with these exact names. Every image shares this suffix: "deep navy-black environment (#0b1020), brushed-metal materials, one warm orange light (#ff6b00), cool blue fill (#332cf2), cinematic 35 mm, shallow depth of field, fine film grain, subject weighted to the right third, dark edges, no text, no people, no logos, no screens with readable content."
>
> 1. `marketing-services-hero.webp` — "A wall of backlit glass tiles in a dark gallery arranged in a perfect grid, representing digital ad placements; one tile glows warm orange, the rest cool blue; the grid is immaculate, precision not chaos."
> 2. `finance-accounting-hero.webp` — "Close-up of machined steel rails like a ledger, with tiny glowing tick marks receding into darkness; feels like a precision instrument; one tick mark orange."
> 3. `compliance-risk-hero.webp` — "A vault-like machined steel aperture, partially open, warm orange light inside, cool blue exterior; controlled access; strict symmetry."
> 4. `data-analytics-hero.webp` — "A dense field of thin vertical light filaments whose tops form a smooth undulating surface, like a 3D chart made of drawn wire; one filament orange."
> 5. `customer-engagement-hero.webp` — "Two interlocking machined rings of brushed steel, an alloy of two parts, soft orange rim light on one, cool blue on the other."
> 6. `operational-excellence-hero.webp` — "A row of identical precision gauges set into dark steel, every needle at exactly the same position, one gauge face lit orange."
>
> Show all six in the gallery in a 3×2 grid at card size (400×250) so I can check they read as a set.

Acceptance: six files, all under 250 KB, consistent light direction, no text artefacts. Reject any image where the orange appears in more than one place.

### P2.2 Set consistency pass

> Compare the six service images side by side. If any one has a different light temperature, saturation level or grain amount from the others, regenerate that one with the same seed family and the same suffix until the six look like they were shot in the same room on the same night.

---

## Phase 3 — Industry page heroes (six images)

### P3.1 Batch prompt

> Generate six images, 1600×1000, WebP quality 80, under 250 KB each, saved to `public/img/industries/`, same shared suffix as the service images.
>
> 1. `media-publishers-hero.webp` — "A broadcast control room at night, out-of-focus wall of monitors glowing cool blue with no readable content, one orange tally light in sharp focus in the right third."
> 2. `advertising-adtech-hero.webp` — "An abstract stream of thousands of tiny glass squares flowing through a machined steel channel, like impressions moving through a pipeline; the stream is cool blue, the channel edge catches one orange light."
> 3. `retail-media-ecommerce-hero.webp` — "A long luminous shelf-edge strip in a dark aisle receding into darkness, cool blue light, one orange accent far down the aisle, no products or labels readable."
> 4. `financial-services-hero.webp` — "A polished steel vault-door mechanism, gears meshed, warm orange light from within the mechanism, cool blue exterior, perfect symmetry."
> 5. `travel-hospitality-hero.webp` — "Split-flap departure board panels rendered in brushed steel, mid-flip with motion blur, all blank, one panel lit orange."
> 6. `sports-entertainment-hero.webp` — "An empty stadium at night seen from the player tunnel, floodlights cool blue, one orange sideline display glowing in the distance, no logos or crowd."

### P3.2 Consistency pass

> Same as the service set: compare the six industry images with the six service images. All twelve must share light temperature, grain and saturation. Regenerate outliers.

---

## Phase 4 — Case studies and articles (37 images)

Clients are anonymous. No real brands, no recognisable logos, no real people.

### P4.1 Case-study families

> Generate case-study header images, 1600×900 (16:9), WebP quality 80, under 250 KB each, saved to `public/img/case-studies/`. Use the shared suffix. Each file name below is exact. Within a family, vary the camera angle (low, eye level, high), the light position (left, right, behind) and the depth of field so cards next to each other on an index page never look identical.
>
> SPORTS family — stadium concourse signage, abstract, blank displays:
> - `how-a-global-sports-brand-protected-sponsorship-revenue-and-.webp`
>
> TRAVEL family — airport pier at night, long exposure, cool blue, one orange runway light:
> - `strengthening-engagement-and-financial-operations-for-a-lead.webp`
>
> FINANCIAL SERVICES family — trading-floor adjacency: tickers as light rails on machined steel, no readable numbers:
> - `scaling-aml-kyc-operations-to-strengthen-risk-detection-and-.webp`
> - `how-a-global-financial-intelligence-firm-improved-data-accur.webp`
> - `how-sebpos-urgent-protection-of-financial-markets-turned-int.webp`
> - `bpo-automation-of-global-sales-and-marketing-insights-streng.webp`
> - `outsourcing-partner-automates-workflow-and-reporting-for-str.webp`
>
> MEDIA & PUBLISHERS family — studio and control-room environments, monitor walls out of focus, cool blue, one orange light:
> - `unlocking-30-greater-efficiency-for-a-global-advertising-bra.webp`
> - `scaling-financial-operations-billing-accuracy-for-a-high-gro.webp`
> - `elevating-customer-engagement-through-integrated-social-plan.webp`
> - `automating-quality-control-with-qa-outsourcing-auditor-tool.webp`
> - `scaling-digital-ad-production-through-creative-outsourcing-y.webp`
> - `data-engineering-outsourcing-significantly-improves-client-w.webp`
> - `how-alloyed-cut-media-ad-ops-hiring-costs-by-70.webp`
> - `pharma-media-giant-cuts-2m-in-costs-by-outsourcing-advertisi.webp`
> - `task-automation-increases-productivity-by-500.webp`
> - `global-broadcaster-scales-ad-ops-with-major-cost-savings.webp`
>
> AD TECH family — flowing impressions as glass particles through steel channels:
> - `closing-a-7-day-data-gap-how-outsourcing-unlocked-real-time-.webp`
> - `how-an-adtech-leader-doubled-creative-output-without-increas.webp`
> - `high-volume-platform-organization-streamlines-peak-season-op.webp`
> - `digital-marketing-outsourcing-empowers-flexible-scalability-.webp`
>
> RETAIL MEDIA family — luminous shelf-edge strips, dark aisle, nothing readable:
> - `retail-media-network-improves-speed-to-market-by-outsourcing.webp`
> - `grocery-retail-company-estimates-50-in-cost-savings-with-ret.webp`
> - `retail-media-scaling-to-new-regions.webp`
>
> After generating, show the Media family (ten images) in a 5×2 grid at 320×180. If two look like near-duplicates, regenerate one of them with a different angle.

Acceptance: 24 files, all under 250 KB, no two near-duplicates in the same family.

### P4.2 Article and news images

> Generate editorial images, 1600×900, WebP quality 80, under 250 KB, saved to `public/img/articles/`. Same shared suffix, but these are conceptual: one clear idea per image, centred composition is allowed because they sit above the article title, not behind it.
>
> - `why-most-ai-initiatives-in-media-operations-fail-and-what-ac.webp` — "A suspension bridge made of drawn steel wire with one span missing, the gap lit orange, the rest cool blue."
> - `lauren-kochan-on-ai-and-the-future-of-managed-services.webp` — "Two different alloys fusing along a clean seam, a steel engineer's rule laid alongside for scale, macro."
> - `how-to-automate-operations-from-the-ground-up.webp` — "A row of machined steel footings on a dark floor, the first one lit orange, the rest receding in cool blue."
> - `how-shared-services-and-global-business-services-leaders-are.webp` — "A globe implied by concentric brushed-steel rings, one ring glowing orange."
> - `8-ways-outsourcing-empowers-accelerated-automation.webp` — "Eight parallel steel wire rails accelerating into motion blur toward the right."
> - `why-human-in-the-loop-automation-is-the-real-key-to-outsourc.webp` — "A loop of fine wire passing through a machined steel aperture, hand-scale, no hand visible."
> - `3-things-about-human-in-the-loop-hitl-you-must-understand-be.webp` — "Three machined steel keys lying on a dark steel surface, one lit orange."
> - `cracking-the-code-how-outsourcing-transforms-data-and-analyt.webp` — "A crystalline alloy cross-section revealing a lattice, cool blue with a few orange facets."
> - `alloyed-partners-with-beam-ai-to-put-ai-agents-into-client-o.webp` — "Two beams of light meeting at a steel junction, one blue, one orange."
> - `alloyed-announces-strategic-partnership-with-simplismart-llc.webp` — "Two gears of visibly different metals meshing cleanly, macro."
> - `alloyed-and-supervity-partner-to-deliver-people-ai-solutions.webp` — "A row of steel desks in a dark room, one chair lit orange, abstract and empty."
> - `alloyed-solutions-inc-announces-management-buyout-and-new-ce.webp` — "A single freshly cast alloy ingot, blank, on a dark bench in warm light; a new beginning."
>
> Show all twelve in a 4×3 grid at card size.

---

## Phase 5 — People, places and culture

### P5.1 Locations

> Generate four city images, 1200×800, WebP quality 80, under 250 KB, saved to `public/img/locations/`. These are atmospheric abstractions, not postcards: generic towers, water and roads at dusk, cool blue with one orange light, no identifiable landmarks (a wrong landmark is worse than none), no text or signage.
> - `philadelphia-metro.webp` — "A mid-Atlantic river city at dusk, bridges and glass towers, long exposure."
> - `san-salvador.webp` — "A Central American capital at dusk with volcanic hills behind, warm orange streetlight line."
> - `manila.webp` — "A dense tropical bay city at dusk, water in the foreground, one orange light."
> - `dhaka.webp` — "A dense riverside South Asian city at dusk, long exposure traffic trails in cool blue, one orange light."

### P5.2 Culture (careers page)

> Generate five workplace images with no faces, 1200×800, WebP quality 80, under 250 KB, saved to `public/img/culture/`. Realistic photography style, Alloyed palette, one orange accent in each. Where hands appear they should be diverse across the set.
> - `culture-1.webp` — "A training room with rows of empty chairs facing a blank screen, warm light from the front."
> - `culture-2.webp` — "A clean desk with a headset, a notebook and a steel rule, cool window light, one orange sticky-note-sized accent (no text)."
> - `culture-3.webp` — "Hands typing on a keyboard in cool light, shallow depth of field, blurred monitor with no readable content."
> - `culture-4.webp` — "A team table from directly above, four laptops, coffee cups, no people visible, one orange notebook."
> - `culture-5.webp` — "An office corridor at dusk with a strip of Alloyed-orange accent lighting along the floor edge."

### P5.3 Leadership treatment (no generation)

> Do not generate faces. Instead build a small React utility on the `/gallery` route called "Headshot treatment": I can drop a photo in, and it outputs an 800×800 WebP with the subject cropped at the shoulders, background replaced with a flat #0b1020, a soft vignette, and saturation reduced by 10%. Save outputs as `public/img/leadership/<first-last>.webp` using the name I type. The four names will be lauren-kochan, j-c-groon, brian-anderson, ray-adamson.

---

## Phase 6 — Animated components (React, mounted later as Astro islands)

General rules for every component in this phase, paste once at the start of Session 3:

> Every component in this phase: TypeScript, default export, props typed, `reducedMotion?: boolean` prop that renders the final static state, no global CSS (Tailwind utilities or a CSS module), no network calls, no external fonts (inherit), reserve its own height so nothing shifts when it mounts, pause all animation when scrolled off-screen via IntersectionObserver, use only transform and opacity for motion, under 15 KB gzipped excluding React, and renders correctly at 360 px wide. Add each one to the `/components` route in both frame sizes with the reducedMotion toggle.

### P6.1 AlloyForgeHero (homepage hero background)

> Build `src/components/AlloyForgeHero.tsx`. Props: `layers: string[]` (5 image URLs, far to near), `poster: string`, `reducedMotion`. Render the five layers absolutely positioned and covering the container. On pointer move, each layer translates toward the pointer by a different amount (layer 1 moves 4 px, layer 5 moves 28 px at full travel) with a 120 ms ease-out so it feels like depth, and on scroll each layer translates vertically at a different rate (parallax factors 0.05 to 0.3). Add a very slow 60-second ambient drift so it is never fully still. Overlay a left-to-right gradient from #0b1020 to transparent at 60% width so headlines read. Under reducedMotion or when `layers` is empty, render only the poster. Run at 60 fps; use `will-change: transform` and a single requestAnimationFrame loop. Test on the 390 px frame with touch events disabled (no pointer parallax on touch, scroll parallax only).

### P6.2 CounterGrid (stats band)

> Build `src/components/CounterGrid.tsx`. Props: `items: { value: number; suffix?: string; prefix?: string; decimals?: number; label: string }[]`, `reducedMotion`. Render the final numbers in the DOM immediately (SEO and no-JS), then when the grid enters the viewport animate each from 0 to final over 1.1 s with an ease-out-expo curve, staggered 90 ms apart. Use `font-variant-numeric: tabular-nums` so widths do not jitter. Default items: 92 "Net Promoter Score", 98 "%" "Client retention", 99.99 "%" "QA accuracy" (two decimals), 43 "%" "Partnerships over five years". Numbers in Archivo 700 at 56 px desktop, 40 px mobile, labels Inter 14 px at 70% opacity. Dark variant (white on #0b1020) and light variant (#0b1020 on #f5f6fa) via a `tone` prop.

### P6.3 FlowPipeline ("Work goes in. Measured outcomes come out.")

> Build `src/components/FlowPipeline.tsx`. An SVG pipeline, 100% width, 16:5 aspect, three glowing nodes labelled by props (`stages: string[]` default ["Ingest", "Analyze", "Optimize"]). Particles enter from the left as tiny glyphs (a 6 px square for impressions, a 6 px rectangle for invoices, a 6 px circle for tickets), travel along a slightly curved path through the three nodes, and exit on the right as small check marks in mint #16a36b. Max 24 particles alive at once, continuous, each with a slightly different speed, GPU-friendly (animate transform along precomputed path points, not SVG `animateMotion`). Nodes pulse 4% in scale when a particle passes. Path stroke #332cf2 at 40%, node fill #141a30 with an #ff6b00 ring on the middle node. Static version: path, nodes and three frozen particles.

### P6.4 CoverageClock (global delivery)

> Build `src/components/CoverageClock.tsx`. A 24-hour ring (SVG, 320 px, scales down to 280 px on mobile). Props: `centers: { name: string; tz: string; shiftStart: number; shiftEnd: number }[]` default Philadelphia (America/New_York, 8 to 18), San Salvador (America/El_Salvador, 7 to 19), Dhaka (Asia/Dhaka, 0 to 24), Manila (Asia/Manila, 0 to 24). A hand sweeps the ring once every 24 s; as it passes each hour the segments of the centres on shift at that UTC hour light up in brand blue, and a central number "N centres on shift" updates. The real current UTC hour is marked with an orange tick. The user can scrub the hand by dragging on the ring (pointer events) and it resumes after 3 s idle. Static version: hand at the current hour, segments lit accordingly.

### P6.5 SavingsMeter (pricing and calculator result)

> Build `src/components/SavingsMeter.tsx`. Props: `inHouse: number`, `alloyed: number`, `currency?: string` default "$", `reducedMotion`. A horizontal track (#141a30, 12 px tall, rounded) with two bars: a grey bar for in-house at full width and an orange (#ff6b00) bar for Alloyed whose width is `alloyed / inHouse`. On mount or when props change, the orange bar springs to its width (stiffness 180, damping 20) while the two numbers tick to their values in tabular Archivo 700, and a mint badge fades in reading the percentage saved. Numbers are formatted with thousands separators and "K"/"M" suffixes over 10,000. Works when `alloyed` changes every keystroke from a calculator without stutter (debounce 60 ms).

### P6.6 LogoMarquee (partner strip)

> Build `src/components/LogoMarquee.tsx`. Props: `logos: { src: string; alt: string; href?: string }[]`, `speed?: number` default 40 px/s, `reducedMotion`. A single-row infinite marquee using a duplicated track and a CSS `translateX` keyframe (not JS per frame), logos 32 px tall at 60% opacity rising to 100% on hover, gap 64 px, edge fade masks 80 px wide using `mask-image`. Pauses on hover and on focus-within. Static version: a centred wrapped row. Test with these four SVGs from the site's `public/logos/`: beam-ai.svg, simplismart.svg, supervity.svg, thread-ai.svg (copy them into this project for the preview).

### P6.7 PhoneReveal (demo page)

> Build `src/components/PhoneReveal.tsx`. Props: `src: string` (screenshot URL), `alt: string`, `reducedMotion`. A phone frame (390×844 inner, 22 px bezel, #0b1020 body, 48 px corner radius, a dynamic-island notch) that starts 80 px lower, 92% scale and rotated 6° around the Y axis with `perspective: 1200px`; as the component scrolls from 20% to 70% of the viewport it eases to its final upright position. The screenshot inside has a subtle inner shadow and scrolls slowly inside the frame on hover (translateY over 6 s, pauses when not hovered). Static version: final upright position.

### P6.8 TiltCard (service and industry cards)

> Build `src/components/TiltCard.tsx`. A wrapper that takes `children` and tilts up to 6° toward the pointer with a 160 ms ease, adds a soft radial highlight that follows the pointer (white at 6% opacity, 320 px radius), lifts by 4 px with a deeper shadow on hover, and resets smoothly on leave. No tilt on touch devices (detect via `(hover: hover)` media query). Reduced motion: hover shadow only.

### P6.9 TestimonialCarousel

> Build `src/components/TestimonialCarousel.tsx`. Props: `items: { quote: string; name: string; role: string }[]`, `interval?: number` default 7000, `reducedMotion`. One quote visible at a time in Archivo 700 at 28 px desktop / 22 px mobile on #0b1020, with the name and role below in Inter. Quotes cross-fade and slide 16 px with a 500 ms ease; progress is shown as thin bars under the quote, the active one filling over the interval in orange. Swipe left/right on touch, arrow keys on desktop, pause on hover and focus, `aria-live="polite"`. Static version: first quote and dots.

### P6.10 ProofRibbon (awards and badges)

> Build `src/components/ProofRibbon.tsx`. Props: `items: { label: string; sub?: string }[]` default ["IAOP Global Outsourcing 100", "Inc. 5000", "Woman-owned", "Since 2006"], `reducedMotion`. A row of pill badges with a brushed-steel gradient border (conic gradient from #27304d through #9aa0ff back to #27304d) that slowly rotates (8 s) so the border catches light, text Inter 13 px semibold. Static version: fixed gradient.

### P6.11 Component QA pass

> Open `/components`. For every component: (1) toggle reducedMotion and confirm the static state looks finished, not broken; (2) in the 390 frame confirm nothing overflows horizontally; (3) open the browser performance panel, record 5 seconds of each animation, and report any component whose frame time exceeds 16 ms on average; fix it; (4) print each component's gzipped size and flag anything over 15 KB. Report the table.

---

## Phase 7 — Polish passes (run after all assets exist)

### P7.1 Legibility audit

> For every image in `public/img/hero`, `services` and `industries`, compute the average luminance of the left 55% (hero) or the top-left 40% (service and industry, where the headline card overlaps) and list any file where it exceeds 10%. Darken those regions with a soft gradient and re-export under the size limit.

### P7.2 Set coherence

> Show every image in `public/img` in one long scrolling gallery at 240 px width, ordered by folder. I am looking for the one thing that breaks the set: a different light temperature, a visible text artefact, a face, a logo-like shape, neon, sparks, lens flare, or oversaturation. List any suspects with the file name and the reason, then regenerate them.

### P7.3 Size and format compliance

> Run a check over `public/img`: every raster must be WebP; every file must be under its limit (400 KB hero, 1.5 MB video, 250 KB otherwise); report dimensions and confirm they match the manifest (2400×1400 heroes, 1600×1000 services and industries, 1600×900 case studies and articles, 1200×800 locations and culture, 1920×1080 textures). Re-encode anything that fails at quality 75, then 70, until it passes; never resize below the manifest dimension.

### P7.4 Responsive variants

> For every hero image (home, pricing, the six services, the six industries), also export a `-sm` version at half width and half height (for example `marketing-services-hero-sm.webp` at 800×500) under 90 KB, so phones never download the desktop file.

### P7.5 Open Graph set

> Create `public/img/og/` and export a 1200×630 crop of the home hero, the pricing hero and each service and industry hero, named `<same base name>-og.webp` under 200 KB. Composition: the quiet dark area on the left where the live title will be rendered by the site, the subject on the right.

### P7.6 Motion review on a real phone

> Give me a QR code to open `/components` on my phone. I will check: scroll stays smooth with FlowPipeline and CounterGrid on screen at once, no component makes the phone hot after one minute, and reducedMotion from the phone's system setting is respected (read `prefers-reduced-motion` as the default value of the prop).

### P7.7 Accessibility of components

> For each component: all interactive elements reachable by keyboard with a visible focus ring (#9aa0ff 2 px), `aria-label`s on icon-only controls, the carousel announces slide changes politely, the clock and meter expose their current value through `aria-valuenow` or visually hidden text, and decorative SVGs have `aria-hidden="true"`. Fix and report.

---

## Phase 8 — Hand-back to GitHub

### P8.1 Connect and branch

> Connect this project to the GitHub repository `joaobogo/test-alloyed`. Work on the branch `lovable/visuals`. Put this whole Lovable project in the `lovable/` folder of the repository (not the root). Never modify anything under `src/`, `scripts/`, `docs/` or the repository root config files. The only folder outside `lovable/` you write to is `public/img/` at the repository root, where you copy the finished assets using their exact names.

### P8.2 Commit cadence

> Commit after each phase with messages in this form: "Visuals: hero still, loop, textures (Phase 1)", "Visuals: six service heroes (Phase 2)", "Components: CounterGrid, FlowPipeline (Phase 6)". One commit per phase, pushed to `lovable/visuals`.

### P8.3 Pull request

> Open a pull request from `lovable/visuals` to `main` titled "Visual layer: images, textures and animated components". Body: a table of every file added with its size and dimensions, the component QA table from P6.11, and a short list of anything you could not meet (size, seam, consistency). Do not merge; the Astro side runs its quality gates (links, axe, qa, Lighthouse ≥ 95 mobile) and merges.

---

## Correction prompts (use when Lovable drifts)

- Too bright or too busy: "Too much is lit. Keep exactly one orange light source and push everything else toward #0b1020. The left 55% must be nearly black."
- Stock-photo feel: "This looks like a stock photo. Remove the people and the screens. Replace with brushed steel, drawn wire or machined parts in the same composition."
- Text artefacts: "There is text-like marking on the surface. Regenerate with no letters, numbers or symbols anywhere."
- Neon or sci-fi: "This reads as neon or sci-fi. The reference is a steel workshop at night, not a nightclub. Lower saturation, add film grain, remove glow trails."
- Not a set: "These do not look like the same photographer shot them. Match light temperature and grain to `marketing-services-hero.webp` exactly."
- Oversized file: "Over the size limit. Re-encode WebP at quality 75, keep dimensions, and confirm the new size."
- Animation jank: "Frame time is over 16 ms. Move this to transform and opacity only, remove any layout-triggering property, batch into one requestAnimationFrame, and pause off-screen."
- Reduced motion broken: "Under reducedMotion the component must look finished, not empty. Render the final state with no transitions."
- Scope creep: "You are building a page. Stop. This project only produces assets and components. Delete the page and continue with the asset list."

---

## Definition of "wow" (how we will judge the result)

1. On the homepage at 1440 px the hero reads as a single cinematic frame: one forge light, drawn wires, headline on quiet dark, and it moves gently under the pointer.
2. On a phone the hero still loads under 90 KB and the page is interactive in under two seconds on 4G.
3. Service, industry and case-study images look like one photographer's series, not twelve different stock libraries.
4. Every number on the site counts up once, exactly when it comes into view, and never again.
5. Nothing on the site flickers, shifts or stutters, with or without reduced motion.
6. No asset breaks the size budget; Lighthouse stays at 95 or above on mobile on every template.
