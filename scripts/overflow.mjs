// Horizontal-overflow check at 360 and 390 px for one page per template.
import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const pages = ['/', '/services/', '/services/marketing-services/', '/industries/', '/industries/media-publishers/', '/automation/', '/pricing/', '/insights/', '/insights/case-studies/', '/insights/case-studies/how-alloyed-cut-media-ad-ops-hiring-costs-by-70/', '/insights/perspectives/', '/insights/perspectives/why-most-ai-initiatives-in-media-operations-fail-and-what-actually-works/', '/insights/news/', '/insights/events/', '/about-us/', '/about-us/engagement-models/', '/about-us/locations/', '/about-us/our-partners/', '/about-us/careers/', '/about-us/careers/el-salvador/', '/es/carreras/el-salvador/', '/contact/', '/thank-you/', '/faq/', '/privacy-policy/', '/404/'];
let bad = 0;
for (const w of [360, 390]) {
  const c = await b.newContext({ viewport: { width: w, height: 800 }, isMobile: true, hasTouch: true });
  const p = await c.newPage();
  for (const u of pages) {
    const r = await p.goto('http://127.0.0.1:4321' + u, { waitUntil: 'load' });
    if (!r || (r.status() >= 400 && u !== '/404/')) { console.log('HTTP', r?.status(), u); bad++; continue; }
    await p.addStyleTag({ content: '.reveal{opacity:1!important;transform:none!important}' });
    const res = await p.evaluate(() => {
      const iw = innerWidth; const culprits = [];
      // Text that runs past the viewport edge is a defect even when an overflow-hidden ancestor clips it.
      for (const el of document.querySelectorAll('h1,h2,h3,h4,p,li,a,span,button,label,td,th,summary,dt,dd,blockquote,time')) {
        if (!el.textContent.trim() || el.closest('.overflow-x-auto,.ticker,[hidden],[aria-hidden="true"],#mobile-nav,#consent')) continue;
        const r = el.getBoundingClientRect(); if (r.width === 0) continue;
        if (r.right > iw + 1 || r.left < -1) { culprits.push(el.tagName.toLowerCase() + '.' + [...el.classList].slice(0, 2).join('.') + ' +' + Math.round(r.right - iw) + ' "' + el.textContent.trim().slice(0, 30) + '"'); if (culprits.length > 3) break; }
      }
      const sw = Math.max(document.documentElement.scrollWidth, culprits.length ? iw + 1 : 0);
      return { sw, iw, culprits };
    });
    if (res.sw > res.iw) { bad++; console.log(`${w}px OVERFLOW ${u} (${res.sw}>${res.iw})`, res.culprits.join(' | ')); }
  }
  await c.close();
}
console.log(bad ? `${bad} problems` : 'no horizontal overflow at 360/390 on ' + pages.length + ' templates');
await b.close();
