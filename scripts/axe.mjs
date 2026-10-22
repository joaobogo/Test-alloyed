import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const ctx = await b.newContext(); const p = await ctx.newPage();
for (const u of ['/', '/services/marketing-services/', '/industries/media-publishers/', '/insights/case-studies/', '/insights/case-studies/how-a-global-sports-brand-protected-sponsorship-revenue-and-scaled-operations-without-adding-headcount/', '/about-us/', '/about-us/locations/', '/automation/', '/contact/', '/404/']) {
  await p.goto('http://127.0.0.1:4321' + u, { waitUntil: 'networkidle' });
  const r = await new AxeBuilder({ page: p }).withTags(['wcag2a','wcag2aa','wcag21aa','best-practice']).analyze();
  console.log(u, r.violations.length ? '' : 'clean');
  for (const v of r.violations) { console.log(`  [${v.impact}] ${v.id}: ${v.help} (${v.nodes.length})`); for (const n of v.nodes.slice(0,6)) console.log("     ", n.target[0], "|", (n.failureSummary||"").split("\n")[1]||""); }
}
await b.close();
