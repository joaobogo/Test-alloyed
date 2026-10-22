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

## Still needs the client

- Final privacy policy and terms text (placeholders in place).
- Leadership headshots and client logos, if approved (components accept them).
- Confirm phone number, email and hours. Add a scheduling link to the thank-you page if they use one.
- GTM container ID as `PUBLIC_GTM_ID` in Netlify.
