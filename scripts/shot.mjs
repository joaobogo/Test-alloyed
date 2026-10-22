import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' }).catch(async()=>chromium.launch());
const pages = [['home','/'],['service','/services/marketing-services/'],['industry','/industries/media-publishers/'],['case','/insights/case-studies/how-a-global-sports-brand-protected-sponsorship-revenue-and-scaled-operations-without-adding-headcount/'],['about','/about-us/'],['contact','/contact/']];
for (const [n,p] of pages) {
  const ctx = await b.newContext({ viewport:{width:1440,height:900}, deviceScaleFactor:1 });
  const pg = await ctx.newPage();
  await pg.goto('http://localhost:4321'+p, { waitUntil:'networkidle' });
  await pg.addStyleTag({content:'.reveal{opacity:1!important;transform:none!important}'});
  await pg.screenshot({ path:`/tmp/shots/${n}.png`, fullPage:true });
  await ctx.close();
}
const m = await b.newContext({ viewport:{width:390,height:844}, deviceScaleFactor:1, isMobile:true });
const mp = await m.newPage(); await mp.goto('http://localhost:4321/', { waitUntil:'networkidle' });
await mp.addStyleTag({content:'.reveal{opacity:1!important;transform:none!important}'});
await mp.screenshot({ path:'/tmp/shots/mobile.png', fullPage:true });
await b.close();
console.log('ok');
