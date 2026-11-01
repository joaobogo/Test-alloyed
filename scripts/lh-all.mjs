// Lighthouse mobile across every template; one line per page; flags anything below the floor.
import lighthouse from 'lighthouse';
import { launch } from 'chrome-launcher';
const pages = ['/', '/services/', '/services/marketing-services/', '/industries/', '/industries/media-publishers/', '/automation/', '/pricing/', '/faq/', '/insights/', '/insights/case-studies/', '/insights/case-studies/how-alloyed-cut-media-ad-ops-hiring-costs-by-70/', '/insights/perspectives/', '/insights/perspectives/why-most-ai-initiatives-in-media-operations-fail-and-what-actually-works/', '/insights/news/', '/insights/events/', '/about-us/', '/about-us/engagement-models/', '/about-us/locations/', '/about-us/our-partners/', '/about-us/careers/', '/about-us/careers/el-salvador/', '/es/carreras/el-salvador/', '/contact/', '/thank-you/'];
const floor = { performance: 95, accessibility: 100, 'best-practices': 100, seo: 100 };
const form = process.env.FORM || 'mobile';
const chrome = await launch({ chromePath: '/opt/pw-browsers/chromium', chromeFlags: ['--headless=new', '--no-sandbox', '--disable-gpu'] });
let bad = 0;
for (const p of pages) {
  const r = await lighthouse((process.env.BASE || 'http://127.0.0.1:4321') + p, { port: chrome.port, output: 'json', logLevel: 'error', onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'], formFactor: form, screenEmulation: form === 'desktop' ? { mobile: false, width: 1350, height: 940, deviceScaleFactor: 1, disabled: false } : undefined, throttling: form === 'desktop' ? { rttMs: 40, throughputKbps: 10240, cpuSlowdownMultiplier: 1, requestLatencyMs: 0, downloadThroughputKbps: 0, uploadThroughputKbps: 0 } : undefined });
  const c = Object.fromEntries(Object.entries(r.lhr.categories).map(([k, v]) => [k, Math.round(v.score * 100)])); const a = r.lhr.audits;
  const noindex = p === '/thank-you/' || p === '/demo/'; // noindex pages fail Lighthouse's is-crawlable audit by design
  const flags = Object.entries(floor).filter(([k, v]) => !(k === 'seo' && noindex) && c[k] < (k === 'performance' && form === 'desktop' ? 90 : v)).map(([k]) => k);
  if (flags.length) bad++;
  console.log(p.slice(0, 58).padEnd(60), `perf ${c.performance} a11y ${c.accessibility} bp ${c['best-practices']} seo ${c.seo} | LCP ${a['largest-contentful-paint'].displayValue} CLS ${a['cumulative-layout-shift'].displayValue} TBT ${a['total-blocking-time'].displayValue} SI ${a['speed-index'].displayValue}`, flags.length ? '<-- ' + flags.join(',') : '');
}
console.log(bad ? `${bad} pages below floor` : `all ${pages.length} pages at or above floor (${form})`);
await chrome.kill();
