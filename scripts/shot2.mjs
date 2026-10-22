import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const pages = process.argv.slice(2);
for (const p of pages) {
  const name = p.replace(/\W+/g, '_').replace(/^_|_$/g, '') || 'home';
  for (const [tag, vp, mobile] of [['d', { width: 1440, height: 900 }, false], ['m', { width: 390, height: 844 }, true]]) {
    const c = await b.newContext({ viewport: vp, isMobile: mobile, deviceScaleFactor: 1 });
    const pg = await c.newPage();
    await pg.goto('http://127.0.0.1:4321' + p, { waitUntil: 'networkidle' });
    await pg.evaluate(() => localStorage.setItem('alloyed-consent', '{"analytics":false}'));
    await pg.reload({ waitUntil: 'networkidle' });
    await pg.addStyleTag({ content: '.reveal{opacity:1!important;transform:none!important;transition:none!important}.hero-in{animation:none!important}' });
    await pg.waitForTimeout(300);
    await pg.screenshot({ path: `/tmp/shots/${name}-${tag}.png`, fullPage: true });
    await c.close();
  }
}
await b.close(); console.log('ok');
