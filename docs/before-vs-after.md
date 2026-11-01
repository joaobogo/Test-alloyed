# alloyed.io rebuild: before vs after

Scored against the ten findings in the OmniFlow audit (September 2026, 41/100).

| Audit finding | Current alloyed.io | Rebuild |
|---|---|---|
| 01 Search engines & AI get an empty page | `<div id="root">` · 0 words in HTML | Every one of 70 pages is static HTML. Homepage: 2,500+ words, one H1, FAQ/Service/Organization schema. `llms.txt` for AI assistants. |
| 02 sebpo.com 302s losing rankings | 302s, 3 land on 404 | `_redirects` maps every legacy sebpo.com and old alloyed.io path to a 301 target, including renamed articles. |
| 03 Soft 404s, stale sitemap | Every URL returns 200; 27 pages missing | Real 404 status. Sitemap generated at build (68 URLs) with `lastmod`, trailing-slash URLs only. |
| 04 27.3 MB homepage, LCP 6.2 s | Two background videos (20.5 MB) | Homepage HTML 34 KB gzipped, 5 KB of JavaScript. Real-time WebGL hero instead of video. Lighthouse performance 99–100 mobile. |
| 05 Homepage doesn't say what Alloyed does | "Move faster. Perform better." → *Who We Are* | H1: "Outsourced ad ops, finance and compliance teams that cost 70% less and run at 99.99% accuracy." CTA: *Talk to an operations expert*. |
| 06 Proof hidden or broken | Anonymous video, awards missing | Proof bar on every page (IAOP 100, Inc. 5000, woman-owned, 20+ years, 4 centers). Results ticker, live ops dashboard, one consistent stat set, real numbers on all 23 case study cards. |
| 07 Two forms, no source tracking | Salesforce + Pardot, 6 fields, reCAPTCHA | One 4-field form everywhere with UTM / gclid / li_fat_id / landing / referrer capture, honeypot, `generate_lead` dataLayer event. |
| 08 Cramped mobile first screen | Sticky bar covers 9%, CTA is "Who We Are" | CTA above the fold at 390 px. Full-screen animated menu with phone number. Slim CTA bar appears after the first screen and hides near forms. |
| 09 Misses the searches buyers make | No industry / service / location pages | 6 service pages titled for buyer searches with FAQ schema, 6 new industry pages, delivery-center page, "Dedicated Teams vs Managed Services" page, El Salvador careers in EN and ES. |
| 10 Consent ignored, security headers missing | GA4 fires after Reject All; no CSP | Consent Mode v2 defaults to denied; GTM loads only after Accept and only when `PUBLIC_GTM_ID` is set. CSP, X-Frame-Options, HSTS, nosniff in `_headers`. |

## Beyond the audit: what makes it a sales tool

- **Hire vs BPO vs Alloyed comparison** with the published $850K vs $250K nine-person team numbers.
- **Interactive cost calculator** (team size, loaded cost, function) with a sized-proposal CTA.
- **90-day engagement timeline**, so the buyer knows what happens after the call.
- **Follow-the-sun coverage chart** showing which center is on shift every hour of the US day.
- **Animated process-flow** (Ingest → Analyze → Optimize) and a live ops-dashboard card in the hero.
- **App-like page transitions**, scroll reveals, count-up stats, 3D tilt; all respect reduced-motion.
- Accessibility 100, best practices 100, SEO 100 on every template; zero broken internal links.

## Second pass (31 October 2026): speed, honesty, conversion, coverage

**Runtime performance.** The WebGL hero now renders at half resolution, caps at 30 fps, pauses while the visitor scrolls, tears itself down on client-side navigation and stays off on low-core or Data Saver devices. The process-flow diagram lost its animated SVG blur filter. The sticky header only blurs on desktop; cards fade a pre-rendered shadow instead of animating `box-shadow`; the mobile CTA bar uses two IntersectionObservers and zero layout reads on scroll; every component removes its listeners on `astro:before-swap`. Scripted-scroll probe (`scripts/perf.mjs`, 4x CPU throttle): homepage average frame time 24 ms → 16.6 ms on a 390 px phone, 108 ms → 28 ms at 1440 px under software GL; every inner page at 16.5 ms with zero frames over 20 ms, including after three client-side navigations.

**Claims.** Blanket promises became sourced statements. The H1 reads "up to 70% below US hiring cost, run to a 99.99% QA standard"; "24/7" became "follow-the-sun" except where a published case uses it; "double QA", "300+ platforms", "free session", "no setup fees" and "pilot of two to five for 90 days" were removed or softened; response time is "typically within one business day". A "Where these numbers come from" block on the homepage and pricing page links every headline figure (92 NPS, 98%, 43%, 99.99%, ~70%, $250K vs $850K, 2x, 500%) to the published metric or case study it comes from.

**Conversion.** Contact page shows the form first on phones. Thank-you page explains the three next steps, offers the phone number and the savings estimator, and shows three case studies. The lead form locks its button on submit so slow networks never double-post. Hero headline no longer clips at 360–390 px (verified by `scripts/overflow.mjs` across 26 templates at 360 and 390 px).

**Coverage.** New `/faq/` page: 81 answers across getting started, pricing, delivery and governance, security and compliance, company, every service and every industry, with a live filter and one FAQPage schema. New `/rss.xml` feed of perspectives and news, advertised in `<head>` and the footer. `/blog/*` already 301s to Perspectives. Navigation and footer link the FAQ.

**Gates after the pass.** 73 pages, 0 QA issues, 0 broken links, axe clean on every template, Lighthouse home 100/100/100/100 mobile and 93/100/100/100 desktop, FAQ and service pages 94 desktop with LCP 1.5 s and CLS 0.

## Load-speed verification (1 November 2026)

Measured against `scripts/serve.mjs`, a production-like static server (Brotli, immutable asset caching), because Astro's preview server sends no compression and made the earlier desktop numbers pessimistic.

| Check | Result |
|---|---|
| Lighthouse mobile, 24 templates (`scripts/lh-all.mjs`) | Performance 100 on every page; LCP 1.4–1.7 s simulated slow 4G; CLS 0; TBT 0 ms |
| Lighthouse desktop, 24 templates (`FORM=desktop`) | Performance 100 on every page; LCP 0.4 s; Speed Index 0.2–0.3 s |
| Cold cache, Slow 4G, 4x CPU, phone (`scripts/load.mjs`) | 6 requests per page; 72–90 kB transferred; LCP 0.49–0.91 s; load event 0.63–1.19 s |
| Scroll frame time, 4x CPU (`scripts/perf.mjs`) | 16.5–16.6 ms average on every page on a 390 px phone, including after client-side navigations |

What ships on a first visit: one HTML document (26–43 kB compressed, CSS inlined), two self-hosted subset fonts (46 kB, preloaded), one 15 kB router script (cached for a year), the favicon and manifest. No third-party requests before consent. Open Graph images were re-encoded from 6.9 MB to 1.8 MB. The WebGL hero now starts after the load event, compiles its shader in parallel where the driver supports it, and renders at half resolution at 30 fps; the headline slides in without an opacity fade so it is painted on the first frame.

Only `/thank-you/` scores below 100 on SEO (69) and that is by design: it is `noindex`.

## Still needs the client

- Final privacy policy and terms text (placeholders in place).
- Leadership headshots and client logos, if approved (components accept them).
- Confirm phone number, email, hours and the "typically within one business day" response commitment. Add a scheduling link to the thank-you page if they use one.
- Confirm the security and compliance FAQ answers (access reviews, delivery-center controls, certifications) with operations before launch.
- GTM container ID as `PUBLIC_GTM_ID` in Netlify.
