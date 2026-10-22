# alloyed.io rebuild: before vs after

Scored against the ten findings in the OmniFlow audit (September 2026, 41/100).

| Audit finding | Current alloyed.io | Rebuild |
|---|---|---|
| 01 Search engines & AI get an empty page | `<div id="root">` · 0 words in HTML | Every page is static HTML. Homepage: 2,200 words, 1 H1, full schema. `llms.txt` added for AI assistants. |
| 02 sebpo.com 302s losing rankings | 302s, 3 land on 404 | `_redirects` maps every legacy sebpo.com and old alloyed.io path to a 301 target. |
| 03 Soft 404s, stale sitemap | Every URL returns 200; 27 pages missing | Real 404 status via `/* /404/index.html 404`. Sitemap generated at build with `lastmod`, trailing-slash URLs only. |
| 04 27.3 MB homepage, LCP 6.2 s | Two background videos (20.5 MB) | No video, no stock images. Whole site ships at 2.7 MB total; hero is a 1 KB SVG. Fonts self-hosted, preloaded. |
| 05 Homepage doesn't say what Alloyed does | "Move faster. Perform better." → *Who We Are* | H1: "Outsourced ad operations, finance and compliance teams for media and advertising companies." CTA: *Talk to an operations expert*. |
| 06 Proof hidden or broken | Anonymous video, awards missing | Proof bar on every page: IAOP Global Outsourcing 100, Inc. 5000, woman-owned, 20+ years, 4 delivery centers. One consistent stat set (92 / 98% / 99.99% / 43%). |
| 07 Two forms, no source tracking | Salesforce + Pardot, 6 fields, reCAPTCHA | One 4-field form everywhere. Hidden UTM / gclid / li_fat_id / landing / referrer fields. Honeypot instead of reCAPTCHA. `generate_lead` dataLayer event. |
| 08 Cramped mobile first screen | Sticky bar covers 9%, CTA is "Who We Are" | CTA above the fold at 390 px. No sticky bar. Phone and email in the mobile menu. |
| 09 Misses the searches buyers make | No industry / service / location pages | 6 service pages titled for buyer searches, 6 new industry pages, delivery-center page, engagement-models page titled "Dedicated Teams vs Managed Services". |
| 10 Consent ignored, security headers missing | GA4 fires after Reject All; no CSP | Consent Mode v2 defaults to denied; GTM only loads after Accept. `_headers` adds CSP, X-Frame-Options, HSTS, nosniff. |

Also fixed from the quick-fix list: duplicate About page (one `/about-us/`), testimonial typo, titles under 60 characters, contrast-safe buttons, skip-to-content link, service pages tagged `website` not `article`, no duplicate font loads.

## Still needs the client

- Final privacy policy and terms text (placeholders in place).
- Photography / leadership headshots if wanted (site is designed to work without them).
- Three named client logos or quotes for the proof section.
- Confirm phone number, email and Calendly link.
- GTM container ID (currently the existing `GTM-W3D6T5PL`).
