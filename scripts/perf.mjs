// Frame-time probe: scrolls each page under 4x CPU throttling and reports long frames.
import { chromium } from 'playwright';
const base = process.env.BASE || 'http://127.0.0.1:4321';
const pages = process.argv.slice(2).length ? process.argv.slice(2) : ['/', '/services/marketing-services/', '/pricing/', '/industries/media-publishers/', '/insights/case-studies/', '/about-us/'];
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--enable-gpu-rasterization'] });
const measure = async (page) => page.evaluate(async () => {
  const frames = []; let last = performance.now(); let stop = false;
  const loop = (t) => { frames.push(t - last); last = t; if (!stop) requestAnimationFrame(loop); };
  requestAnimationFrame(loop);
  const h = document.documentElement.scrollHeight - innerHeight;
  const t0 = performance.now(); const dur = 3000;
  await new Promise((res) => { const step = (t) => { const p = Math.min(1, (t - t0) / dur); scrollTo(0, h * p); if (p < 1) requestAnimationFrame(step); else res(); }; requestAnimationFrame(step); });
  stop = true;
  const long = frames.filter((f) => f > 50).length; const slow = frames.filter((f) => f > 20).length;
  const avg = frames.reduce((a, c) => a + c, 0) / frames.length;
  return { frames: frames.length, avg: +avg.toFixed(1), over20: slow, over50: long, max: +Math.max(...frames).toFixed(0) };
});
for (const mobile of [true, false]) {
  const ctx = await b.newContext(mobile ? { viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true } : { viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const cdp = await ctx.newCDPSession(page); await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  console.log(mobile ? '--- mobile 390 / 4x CPU' : '--- desktop 1440 / 4x CPU');
  for (const p of pages) {
    await page.goto(base + p, { waitUntil: 'networkidle' }); await page.waitForTimeout(1500);
    console.log(p.padEnd(40), JSON.stringify(await measure(page)));
  }
  // Navigation leak test: home -> service via client router, then measure.
  await page.goto(base + '/', { waitUntil: 'networkidle' }); await page.waitForTimeout(1500);
  for (const p of ['/services/marketing-services/', '/pricing/', '/about-us/']) { await page.click(`a[href="${p}"]`).catch(() => page.goto(base + p)); await page.waitForTimeout(1200); }
  console.log('after 3 client navigations'.padEnd(40), JSON.stringify(await measure(page)));
  await ctx.close();
}
await b.close();
