// Production-like static server for dist/: Brotli for text, immutable caching for
// fonts and hashed assets, directory index. Astro's preview server sends no
// compression, which makes Lighthouse's simulated throttling pessimistic.
import { createServer } from 'http';
import { readFile, stat } from 'fs/promises';
import { brotliCompressSync, constants } from 'zlib';
import { extname, join, normalize } from 'path';
const root = 'dist', port = +(process.env.PORT || 4322);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain', '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.ico': 'image/x-icon', '.mp4': 'video/mp4' };
const cache = new Map();
createServer(async (req, res) => {
  let p = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname)).replace(/^(\.\.[/\\])+/, '');
  let file = join(root, p);
  try { if ((await stat(file)).isDirectory()) file = join(file, 'index.html'); } catch { file = join(root, '404.html'); res.statusCode = 404; }
  let body; try { body = cache.get(file) ?? (cache.set(file, await readFile(file)), cache.get(file)); } catch { res.statusCode = 404; return res.end('not found'); }
  const ext = extname(file); const type = types[ext] || 'application/octet-stream';
  res.setHeader('Content-Type', type);
  res.setHeader('Cache-Control', /^\/(fonts|_astro)\//.test(p) ? 'public, max-age=31536000, immutable' : 'public, max-age=0, must-revalidate');
  const text = /^(text\/|application\/(xml|json|manifest)|image\/svg)/.test(type);
  if (text && /\bbr\b/.test(req.headers['accept-encoding'] || '')) {
    const key = file + ':br'; const out = cache.get(key) ?? (cache.set(key, brotliCompressSync(body, { params: { [constants.BROTLI_PARAM_QUALITY]: 6 } })), cache.get(key));
    res.setHeader('Content-Encoding', 'br'); res.setHeader('Vary', 'Accept-Encoding'); return res.end(out);
  }
  res.end(body);
}).listen(port, '127.0.0.1', () => console.log('serving dist with brotli on http://127.0.0.1:' + port));
