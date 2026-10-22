import lighthouse from 'lighthouse';
import { launch } from 'chrome-launcher';
const chrome = await launch({ chromePath: '/opt/pw-browsers/chromium', chromeFlags: ['--headless=new', '--no-sandbox'] });
const r = await lighthouse(process.argv[2], { port: chrome.port, output: 'json', logLevel: 'error', onlyAudits: ['largest-contentful-paint-element','lcp-lazy-loaded','font-display','network-requests'], formFactor: 'desktop', screenEmulation: {mobile:false,width:1350,height:940,deviceScaleFactor:1,disabled:false} });
const a = r.lhr.audits;
console.log(JSON.stringify(a['largest-contentful-paint-element'].details.items[0]?.items?.[0]?.node?.snippet));
console.log(JSON.stringify(a['largest-contentful-paint-element'].details.items[1]?.items, null, 1));
console.log(a['network-requests'].details.items.map(i=>`${i.url.replace(/^http:\/\/127.0.0.1:4321/,'')} ${i.resourceType} ${Math.round(i.transferSize/1024)}KB start ${Math.round(i.networkRequestTime)}ms end ${Math.round(i.networkEndTime)}ms`).join('\n'));
await chrome.kill();
