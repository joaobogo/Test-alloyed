// Viewport-sized screens down a page (design review), desktop + mobile.
import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const [path, n = 4] = process.argv.slice(2);
const name = path.replace(/\W+/g, '_').replace(/^_|_$/g, '') || 'home';
for (const [tag, vp, m] of [['d', { width: 1440, height: 900 }, false], ['m', { width: 390, height: 844 }, true]]) {
  const c = await b.newContext({ viewport: vp, isMobile: m, deviceScaleFactor: 1 });
  const p = await c.newPage(); await p.goto('http://127.0.0.1:4321' + path, { waitUntil: 'networkidle' });
  await p.evaluate(() => localStorage.setItem('alloyed-consent', '{"analytics":false}')); await p.reload({ waitUntil: 'networkidle' });
  await p.addStyleTag({ content: '.reveal{opacity:1!important;transform:none!important;transition:none!important}.hero-in{animation:none!important}#mobile-cta{display:none}' });
  for (let i = 0; i < +n; i++) { await p.evaluate((y) => scrollTo(0, y), i * vp.height); await p.waitForTimeout(250); await p.screenshot({ path: `/tmp/shots/s-${name}-${tag}${i}.png` }); }
  await c.close();
}
await b.close();
