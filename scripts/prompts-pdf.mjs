import { chromium } from 'playwright';
import { readFileSync, writeFileSync } from 'fs';
import { marked } from 'marked';
const md = readFileSync('docs/lovable-prompts.md', 'utf8');
const body = marked.parse(md);
const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@page { size: A4; margin: 18mm 16mm; }
body { font: 11pt/1.55 Inter, -apple-system, Segoe UI, sans-serif; color: #141a30; }
h1 { font: 800 26pt/1.1 Archivo, Inter, sans-serif; letter-spacing: -.02em; color: #0b1020; margin: 0 0 6pt; }
h2 { font: 700 16pt/1.2 Archivo, Inter, sans-serif; color: #0b1020; margin: 22pt 0 8pt; padding-top: 10pt; border-top: 2px solid #332cf2; page-break-after: avoid; }
h3 { font: 700 12.5pt/1.3 Archivo, Inter, sans-serif; color: #332cf2; margin: 16pt 0 6pt; page-break-after: avoid; }
p, li { margin: 0 0 7pt; }
table { border-collapse: collapse; width: 100%; font-size: 9.2pt; margin: 6pt 0 12pt; page-break-inside: auto; }
th, td { border: 1px solid #d3d8e6; padding: 5pt 6pt; vertical-align: top; text-align: left; }
th { background: #f5f6fa; font-weight: 600; }
tr { page-break-inside: avoid; }
code { font: 9pt ui-monospace, Menlo, monospace; background: #f5f6fa; padding: 1pt 4pt; border-radius: 3px; }
blockquote { margin: 8pt 0; padding: 10pt 14pt; border-left: 3px solid #ff6b00; background: #fff7f0; font-size: 10.2pt; }
hr { border: 0; border-top: 1px solid #d3d8e6; margin: 14pt 0; }
.cover { height: 240mm; display: flex; flex-direction: column; justify-content: center; page-break-after: always; }
.cover .k { font: 600 9pt/1 Inter; letter-spacing: .14em; text-transform: uppercase; color: #332cf2; margin-bottom: 14pt; }
.cover h1 { font-size: 40pt; }
.cover p { font-size: 13pt; color: #3d476a; max-width: 60ch; }
.sw { display: flex; gap: 6pt; margin-top: 24pt; } .sw span { width: 34pt; height: 34pt; border-radius: 6pt; display: block; }
</style></head><body>
<div class="cover"><div class="k">Lovable prompt pack · v1 · October 2026</div><h1>alloyed.io<br>The Lovable prompt pack</h1><p>Every prompt to paste into Lovable, in order: setup, hero and textures, 12 page heroes, 37 editorial images, 10 animated components, polish passes and the GitHub hand-back.</p><div class="sw"><span style="background:#0b1020"></span><span style="background:#141a30"></span><span style="background:#332cf2"></span><span style="background:#9aa0ff"></span><span style="background:#ff6b00"></span><span style="background:#ff8a33"></span><span style="background:#16a36b"></span><span style="background:#f5f6fa;border:1px solid #d3d8e6"></span></div><p style="margin-top:28pt;font-size:10pt">Prepared by OmniFlow · Flow Group Ventures · for Alloyed Solutions Inc.</p></div>
${body}</body></html>`;
writeFileSync('/tmp/claude-0/-home-user/26562559-326f-592d-ba2c-dfd678c115c9/scratchpad/brief.html', html);
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const p = await b.newPage();
await p.setContent(html, { waitUntil: 'load' });
await p.pdf({ path: 'docs/Alloyed-Lovable-Prompt-Pack.pdf', format: 'A4', printBackground: true, displayHeaderFooter: true, headerTemplate: '<div></div>', footerTemplate: '<div style="width:100%;font:8pt Inter,sans-serif;color:#7f88a8;padding:0 16mm;display:flex;justify-content:space-between"><span>alloyed.io Lovable prompt pack · OmniFlow</span><span class="pageNumber"></span></div>' });
await b.close(); console.log('pdf ok');
