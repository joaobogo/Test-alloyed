import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
for (const mobile of [true, false]) {
  const c = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: mobile, deviceScaleFactor: 2 }); const p = await c.newPage();
  await p.goto('http://127.0.0.1:4321/services/finance-accounting/', { waitUntil: 'networkidle' }); await p.evaluate(() => localStorage.setItem('alloyed-consent', '{"analytics":false}')); await p.reload({ waitUntil: 'networkidle' });
  await p.evaluate(() => scrollTo(0, 1800)); await p.waitForTimeout(500);
  console.log('isMobile', mobile, 'header top:', await p.evaluate(() => document.getElementById('site-header').getBoundingClientRect().top), 'scrollY', await p.evaluate(() => scrollY));
  await c.close();
}
await b.close();
