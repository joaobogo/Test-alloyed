import lighthouse from 'lighthouse';
import { launch } from 'chrome-launcher';
const urls = process.argv.slice(2);
const chrome = await launch({ chromePath: '/opt/pw-browsers/chromium', chromeFlags: ['--headless=new', '--no-sandbox', '--disable-gpu'] });
for (const u of urls) {
  for (const form of ['mobile', 'desktop']) {
    const r = await lighthouse(u, { port: chrome.port, output: 'json', logLevel: 'error', onlyCategories: ['performance','accessibility','best-practices','seo'], formFactor: form, screenEmulation: form==='desktop' ? {mobile:false,width:1350,height:940,deviceScaleFactor:1,disabled:false} : undefined });
    const c = r.lhr.categories; const a = r.lhr.audits;
    console.log(`${form.padEnd(7)} ${u.replace('http://localhost:4321','')}  perf ${Math.round(c.performance.score*100)} a11y ${Math.round(c.accessibility.score*100)} bp ${Math.round(c['best-practices'].score*100)} seo ${Math.round(c.seo.score*100)} | LCP ${a['largest-contentful-paint'].displayValue} CLS ${a['cumulative-layout-shift'].displayValue} TBT ${a['total-blocking-time'].displayValue}`);
    const fails = Object.values(a).filter(x => x.score !== null && x.score < 0.9 && x.scoreDisplayMode !== 'informative' && x.scoreDisplayMode !== 'notApplicative').map(x=>`   - ${x.id}: ${x.title}`);
    if (fails.length) console.log(fails.join('\n'));
  }
}
await chrome.kill();
