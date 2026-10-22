import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';
const files = []; (function walk(d){ for (const f of readdirSync(d)) { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') && files.push(p); } })('dist');
const issues = [];
for (const f of files) {
  const h = readFileSync(f, 'utf8'); const url = f.replace(/^dist/, '').replace(/index\.html$/, '');
  const title = ((h.match(/<title>([^<]*)<\/title>/) || [])[1] || '').replace(/&amp;/g, '&').replace(/&#39;|&#x27;/g, "'"); const desc = (h.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';
  const h1s = (h.match(/<h1[\s>]/g) || []).length; const canon = (h.match(/<link rel="canonical" href="([^"]*)"/) || [])[1] || '';
  const body = h.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ');
  if (!title) issues.push([url, 'missing title']); else if (title.length > 60) issues.push([url, `title ${title.length} chars`]);
  if (!desc) issues.push([url, 'missing description']); else if (desc.length < 50 || desc.length > 160) issues.push([url, `description ${desc.length} chars`]);
  if (h1s !== 1) issues.push([url, `${h1s} h1`]);
  if (!canon.endsWith(url) && !url.startsWith('/404')) issues.push([url, `canonical ${canon}`]);
  for (const bad of ['undefined', 'NaN', '[object', 'null,', 'Lorem', 'TODO']) if (body.includes(bad)) issues.push([url, `contains "${bad}"`]);
  const sebpo = [...body.matchAll(/SEBPO/g)].length; const allowed = [...body.matchAll(/(formerly|as|from|than) SEBPO|SEBPO (to|rebranded|became|built|→)|SEBPO\./g)].length;
  if (sebpo > allowed + 2) issues.push([url, `SEBPO mentioned ${sebpo}x`]);
  if (/\s{2}[a-z]/.test(title)) issues.push([url, 'double space in title']);
}
console.log(files.length, 'pages checked;', issues.length, 'issues');
for (const [u, i] of issues) console.log(' -', u, '→', i);
