import { readFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join } from 'path';
const root = 'dist'; const files = [];
(function walk(d){ for (const f of readdirSync(d)) { const p = join(d,f); statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') && files.push(p); } })(root);
const bad = new Map();
for (const f of files) {
  const html = readFileSync(f, 'utf8');
  for (const m of html.matchAll(/(?:href|src)="([^"#?]+)[^"]*"/g)) {
    const u = m[1];
    if (/^(https?:|mailto:|tel:|data:|\/\/)/.test(u)) continue;
    const path = u.startsWith('/') ? u : join(f.replace(/[^/]+$/, ''), u).replace(/^dist/, '');
    const cands = [join(root, path), join(root, path, 'index.html')];
    if (!cands.some(existsSync)) bad.set(u, (bad.get(u)||0)+1);
  }
}
console.log(files.length, 'pages scanned');
for (const [u,n] of bad) console.log('MISSING', u, `(${n})`);
if (!bad.size) console.log('no broken internal links');
