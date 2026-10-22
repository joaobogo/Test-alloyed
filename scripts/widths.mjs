import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
for (const w of [1100, 1280, 820]) {
  const c = await b.newContext({ viewport: { width: w, height: 800 } }); const p = await c.newPage();
  await p.goto('http://127.0.0.1:4321/', { waitUntil: 'networkidle' }); await p.evaluate(() => localStorage.setItem('alloyed-consent', '{"analytics":false}')); await p.reload({ waitUntil: 'networkidle' }); await p.waitForTimeout(800);
  await p.screenshot({ path: `/tmp/shots/w${w}.png` }); await c.close();
}
await b.close(); console.log('ok');
