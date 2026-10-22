import { chromium } from 'playwright';
import { readFileSync } from 'fs';
const svg = readFileSync('public/favicon.svg', 'utf8');
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
for (const [file, size, pad] of [['apple-touch-icon.png', 180, 24], ['icon-192.png', 192, 28], ['icon-512.png', 512, 72]]) {
  const p = await b.newPage({ viewport: { width: size, height: size } });
  await p.setContent(`<body style="margin:0;background:#0b1020;display:grid;place-items:center;width:${size}px;height:${size}px"><div style="width:${size - pad * 2}px">${svg.replace('<svg ', '<svg style="width:100%;height:auto;display:block" ')}</div></body>`);
  await p.screenshot({ path: `public/${file}` }); await p.close(); console.log('wrote', file);
}
await b.close();
