import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
// 1. reduced motion: hero visible immediately, no canvas, content present
const rm = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' }); const p = await rm.newPage();
await p.goto('http://127.0.0.1:4321/', { waitUntil: 'networkidle' }); await p.evaluate(() => localStorage.setItem('alloyed-consent', '{"analytics":false}')); await p.reload({ waitUntil: 'networkidle' }); await p.waitForTimeout(800);
console.log('reduced-motion h1 opacity:', await p.evaluate(() => getComputedStyle(document.querySelector('h1')).opacity), '| canvas opacity:', await p.evaluate(() => getComputedStyle(document.querySelector('.hero-gl-canvas')).opacity), '| reveal visible:', await p.evaluate(() => getComputedStyle(document.querySelector('.reveal')).opacity));
await p.screenshot({ path: '/tmp/shots/reduced-motion.png' });
// 2. keyboard: tab into Services, dropdown becomes visible, arrow to first child
const kb = await b.newContext({ viewport: { width: 1440, height: 900 } }); const k = await kb.newPage();
await k.goto('http://127.0.0.1:4321/', { waitUntil: 'networkidle' }); await k.evaluate(() => localStorage.setItem('alloyed-consent', '{"analytics":false}')); await k.reload({ waitUntil: 'networkidle' });
await k.keyboard.press('Tab'); console.log('first tab lands on:', await k.evaluate(() => document.activeElement?.textContent?.trim().slice(0, 30)));
for (let i = 0; i < 2; i++) await k.keyboard.press('Tab');
console.log('focused:', await k.evaluate(() => document.activeElement?.textContent?.trim().slice(0, 30)), '| dropdown visible:', await k.evaluate(() => { const d = document.activeElement?.closest('.group')?.querySelector('ul'); return d ? getComputedStyle(d.parentElement).visibility : 'n/a'; }));
await k.keyboard.press('Tab'); console.log('next focus:', await k.evaluate(() => document.activeElement?.textContent?.trim().slice(0, 40)));
await b.close();
