import { chromium } from 'playwright';
const [url, selector, out] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto('http://127.0.0.1:4321' + url, { waitUntil: 'networkidle' });
await p.evaluate(() => localStorage.setItem('alloyed-consent', '{"analytics":false}')); await p.reload({ waitUntil: 'networkidle' });
await p.addStyleTag({ content: '.reveal{opacity:1!important;transform:none!important;transition:none!important}' });
const el = p.locator(selector).first(); await el.scrollIntoViewIfNeeded(); await p.waitForTimeout(400);
await el.screenshot({ path: out }); await b.close(); console.log('ok');
