import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
for (const [n,vp,m] of [['fold-desktop',{width:1440,height:900},false],['fold-mobile',{width:390,height:844},true]]) {
  const c = await b.newContext({ viewport:vp, isMobile:m, deviceScaleFactor: m?2:1 });
  const p = await c.newPage(); await p.goto('http://127.0.0.1:4321/', {waitUntil:'networkidle'});
  await p.evaluate(()=>{localStorage.setItem('alloyed-consent','{"analytics":false}')}); await p.reload({waitUntil:'networkidle'});
  await p.waitForTimeout(800);
  await p.screenshot({ path:`/tmp/shots/${n}.png` }); await c.close();
}
await b.close();
