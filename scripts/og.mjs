// Renders Open Graph images (1200x630) for the default card plus every service
// and industry page. Run after editing src/data/site.ts: `node scripts/og.mjs`.
import { chromium } from 'playwright';
import { mkdirSync, readFileSync } from 'fs';
import { pathToFileURL } from 'url';

const logo = readFileSync('public/logo-white.svg', 'utf8');
const font = (f) => `http://127.0.0.1:4321/fonts/${f}`; // served by `astro preview`

const cards = [
  { file: 'og-default.png', kicker: 'Formerly SEBPO · Operating since 2006', title: 'Outsourced ad operations, finance and compliance teams for media and advertising companies.', stat: '92', statLabel: 'Net Promoter Score' },
];
import { services, industries, caseStudies } from '../src/data/site.ts';

const html = (c) => `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:Archivo;src:url(${font('archivo-latin.woff2')});font-weight:100 900;font-stretch:62% 125%}
@font-face{font-family:Inter;src:url(${font('inter-latin.woff2')});font-weight:100 900}
html,body{margin:0}body{width:1200px;height:630px;background:#0b1020;color:#fff;font-family:Inter,sans-serif;position:relative;overflow:hidden}
.grid{position:absolute;inset:0;background-image:linear-gradient(to right,rgba(255,255,255,.06) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,.06) 1px,transparent 1px);background-size:48px 48px}
.glow{position:absolute;right:-160px;top:-160px;width:640px;height:640px;border-radius:50%;background:radial-gradient(circle,rgba(51,44,242,.55),rgba(51,44,242,0) 70%)}
.wrap{position:absolute;inset:0;padding:64px 72px;display:flex;flex-direction:column;justify-content:space-between}
.logo svg{height:52px;width:auto}
.kicker{font-size:18px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:#9aa0ff;margin-bottom:18px}
h1{font-family:Archivo;font-weight:700;font-size:${c.title.length > 95 ? 46 : c.title.length > 70 ? 54 : 64}px;line-height:1.04;letter-spacing:-.02em;margin:0;max-width:900px}
.foot{display:flex;justify-content:space-between;align-items:flex-end}
.stat b{font-family:Archivo;font-size:72px;font-weight:700;color:#ff6b00;line-height:1;display:block}
.stat span{font-size:18px;color:rgba(255,255,255,.7)}
.proof{font-size:16px;color:rgba(255,255,255,.6);text-align:right;line-height:1.6}
</style></head><body><div class="grid"></div><div class="glow"></div><div class="wrap">
<div class="logo">${logo}</div>
<div><div class="kicker">${c.kicker}</div><h1>${c.title}</h1></div>
<div class="foot"><div class="stat"><b>${c.stat}</b><span>${c.statLabel}</span></div><div class="proof">IAOP Global Outsourcing 100 · Inc. 5000<br>Woman-owned · 20+ years · alloyed.io</div></div>
</div></body></html>`;

for (const s of services) cards.push({ file: `og/services-${s.slug}.png`, kicker: s.name, title: s.headline, stat: s.outcomes[0].value, statLabel: s.outcomes[0].label });
for (const i of industries) cards.push({ file: `og/industries-${i.slug}.png`, kicker: i.name, title: i.headline, stat: i.outcomes[0].value, statLabel: i.outcomes[0].label });

for (const c of caseStudies) cards.push({ file: `og/case-${c.slug.slice(0, 60)}.png`, kicker: `Case study · ${c.industry}`, title: c.title, stat: c.metrics[0].value, statLabel: c.metrics[0].label });
cards.push({ file: 'og/pricing.png', kicker: 'Pricing', title: 'Priced per person or per outcome. Everything else is included.', stat: '~70%', statLabel: 'cost advantage, 9-person ad ops team' });

mkdirSync('public/og', { recursive: true });
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
for (const c of cards) {
  await p.goto('http://127.0.0.1:4321/', { waitUntil: 'domcontentloaded' });
  await p.setContent(html(c), { waitUntil: 'load' });
  await p.evaluate(() => Promise.all([document.fonts.load('700 64px Archivo'), document.fonts.load('400 18px Inter'), document.fonts.load('600 18px Inter')]));
  await p.screenshot({ path: `public/${c.file}`, type: 'png' });
  console.log('wrote', c.file);
}
await b.close();
