// First-visit load audit: cold cache, Slow 4G (1.6 Mbps down, 150 ms RTT), 4x CPU.
// Reports requests, transferred bytes, FCP, LCP, DOMContentLoaded and load per template.
import { chromium } from 'playwright';
const base = process.env.BASE || 'http://127.0.0.1:4321';
const pages = process.argv.slice(2).length ? process.argv.slice(2) : ['/', '/services/marketing-services/', '/industries/media-publishers/', '/pricing/', '/faq/', '/insights/case-studies/', '/insights/case-studies/how-alloyed-cut-media-ad-ops-hiring-costs-by-70/', '/insights/perspectives/why-most-ai-initiatives-in-media-operations-fail-and-what-actually-works/', '/about-us/', '/contact/'];
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
console.log('page'.padEnd(44), 'req', 'kB', 'FCP', 'LCP', 'DCL', 'load');
let worst = { lcp: 0 };
for (const p of pages) {
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 3 });
  const page = await ctx.newPage();
  const cdp = await ctx.newCDPSession(page);
  await cdp.send('Network.enable'); await cdp.send('Network.setCacheDisabled', { cacheDisabled: true });
  await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: 1.6e6 / 8, uploadThroughput: 750e3 / 8 });
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  let bytes = 0, req = 0;
  cdp.on('Network.loadingFinished', (e) => { bytes += e.encodedDataLength; req++; });
  await page.goto(base + p, { waitUntil: 'load' });
  await page.waitForTimeout(2500);
  const m = await page.evaluate(() => new Promise((res) => {
    const nav = performance.getEntriesByType('navigation')[0];
    const fcp = performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0;
    let lcp = 0; const po = new PerformanceObserver((l) => { for (const e of l.getEntries()) lcp = e.startTime; });
    po.observe({ type: 'largest-contentful-paint', buffered: true });
    setTimeout(() => { po.disconnect(); res({ fcp, lcp, dcl: nav.domContentLoadedEventEnd, load: nav.loadEventEnd }); }, 300);
  }));
  const r = (n) => (n / 1000).toFixed(2) + 's';
  console.log(p.slice(0, 43).padEnd(44), String(req).padStart(3), String(Math.round(bytes / 1024)).padStart(3), r(m.fcp), r(m.lcp), r(m.dcl), r(m.load));
  if (m.lcp > worst.lcp) worst = { lcp: m.lcp, p };
  await ctx.close();
}
console.log('worst LCP', (worst.lcp / 1000).toFixed(2) + 's on', worst.p);
await b.close();
