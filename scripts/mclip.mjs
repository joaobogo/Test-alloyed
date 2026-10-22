import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const c = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, deviceScaleFactor: 2 }); const p = await c.newPage();
await p.goto('http://127.0.0.1:4321/', { waitUntil: 'networkidle' }); await p.evaluate(() => localStorage.setItem('alloyed-consent', '{"analytics":false}')); await p.reload({ waitUntil: 'networkidle' });
await p.addStyleTag({ content: '.reveal{opacity:1!important;transform:none!important;transition:none!important}' });
for (const [name, sel] of [['m-services', 'section:has(h2:text("Six operations"))'], ['m-testimonials', 'section:has(h2:text("Measurable outcomes"))'], ['m-timeline', 'section:has(h2:text("30-minute call"))'], ['m-industries', 'section:has(h2:text("Deep in the industries"))']]) {
  const el = p.locator(sel).first(); await el.scrollIntoViewIfNeeded(); await p.waitForTimeout(300);
  await el.screenshot({ path: `/tmp/shots/${name}.png` });
}
await b.close(); console.log('ok');
