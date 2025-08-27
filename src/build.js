const fs = require('fs');
const fsp = fs.promises;
const path = require('path');
const { pathToFileURL } = require('url');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
let Layout = require('./layout');

const CONTENT_DIR = path.resolve('content');
const OUT_DIR = path.resolve('site');
const CACHE_DIR = path.resolve('.cache/mdx');
let PAGES = [];

function ensureDirSync(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

async function cleanDir(dir) {
  if (fs.existsSync(dir)) {
    await fsp.rm(dir, { recursive: true, force: true });
  }
  await fsp.mkdir(dir, { recursive: true });
}

function mapOutPath(filePath) {
  const rel = path.relative(CONTENT_DIR, filePath);
  const outRel = rel.replace(/\.mdx$/i, '.html');
  return path.join(OUT_DIR, outRel);
}

function extractTitle(mdxSource) {
  const m = mdxSource.match(/^\s*#\s+(.+)\s*$/m);
  return m ? m[1].trim() : 'Untitled';
}

function htmlShell({ title, body, cssHref }) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><title>${title}</title><link rel="stylesheet" href="${cssHref}"></head><body>${body}</body></html>`;
}

async function compileMdxFile(filePath, outPath, extraProps = {}) {
  const { compile } = await import('@mdx-js/mdx');
  // Debug logs for build flow
  // console.log('Reading', filePath);
  const source = await fsp.readFile(filePath, 'utf8');
  const title = extractTitle(source);
  const compiled = await compile(source, {
    jsx: false,
    development: false,
    providerImportSource: '@mdx-js/react',
    jsxImportSource: 'react',
    format: 'mdx'
  });
  const code = String(compiled);
  ensureDirSync(CACHE_DIR);
  const relCacheName = path
    .relative(CONTENT_DIR, filePath)
    .replace(/[\\/]/g, '_')
    .replace(/\.mdx$/i, '') + '.mjs';
  const tmpFile = path.join(CACHE_DIR, relCacheName);
  await fsp.writeFile(tmpFile, code, 'utf8');
  // console.log('Importing compiled module', tmpFile);
  const mod = await import(pathToFileURL(tmpFile).href);
  const MDXContent = mod.default || mod.MDXContent || mod;
  // console.log('Rendering to static markup');
  const page = React.createElement(Layout, {}, React.createElement(MDXContent, extraProps));
  const body = ReactDOMServer.renderToStaticMarkup(page);
  const cssRel = path
    .relative(path.dirname(outPath), path.join(OUT_DIR, 'styles.css'))
    .split(path.sep)
    .join('/');
  return htmlShell({ title, body, cssHref: cssRel || 'styles.css' });
}

async function copyFile(src, dest) {
  ensureDirSync(path.dirname(dest));
  await fsp.copyFile(src, dest);
}

async function ensureStyles() {
  const dest = path.join(OUT_DIR, 'styles.css');
  const custom = path.join(CONTENT_DIR, '_styles.css');
  ensureDirSync(path.dirname(dest));
  if (fs.existsSync(custom)) {
    await fsp.copyFile(custom, dest);
    return;
  }
  const css = `:root{--max-w:760px;--muted:#6b7280}*{box-sizing:border-box}body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Helvetica,Arial,sans-serif;max-width:var(--max-w);margin:2rem auto;padding:0 1rem;line-height:1.6}a{color:#2563eb;text-decoration:none}a:hover{text-decoration:underline}.site-header,.site-footer{display:flex;align-items:center;justify-content:space-between;gap:.5rem;padding:1rem 0;border-bottom:1px solid #e5e7eb}.site-footer{border-bottom:0;border-top:1px solid #e5e7eb;color:var(--muted)}.brand{font-weight:600}.content pre{background:#f6f8fa;padding:1rem;overflow:auto}.content code{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;background:#f6f8fa;padding:.1rem .3rem;border-radius:4px}`;
  await fsp.writeFile(dest, css, 'utf8');
}

async function compileMdxToComponent(filePath) {
  const { compile } = await import('@mdx-js/mdx');
  const source = await fsp.readFile(filePath, 'utf8');
  const compiled = await compile(source, {
    jsx: false,
    development: false,
    providerImportSource: '@mdx-js/react',
    jsxImportSource: 'react',
    format: 'mdx'
  });
  const code = String(compiled);
  ensureDirSync(CACHE_DIR);
  const relCacheName = path
    .relative(CONTENT_DIR, filePath)
    .replace(/[\\/]/g, '_')
    .replace(/\.mdx$/i, '') + '.mjs';
  const tmpFile = path.join(CACHE_DIR, relCacheName);
  await fsp.writeFile(tmpFile, code, 'utf8');
  const mod = await import(pathToFileURL(tmpFile).href);
  return mod.default || mod.MDXContent || mod;
}

async function loadCustomLayout() {
  const custom = path.join(CONTENT_DIR, '_layout.mdx');
  if (fs.existsSync(custom)) {
    try {
      const Comp = await compileMdxToComponent(custom);
      // Wrap compiled MDX as a layout component receiving children
      Layout = function LayoutWrapper({ children }) {
        return React.createElement(Comp, null, children);
      };
      console.log('Using custom layout: content/_layout.mdx');
    } catch (e) {
      console.warn('Failed to load custom layout, falling back. Reason:', e.message);
    }
  }
}

function isReservedFile(p) {
  const base = path.basename(p);
  return base.startsWith('_');
}

async function processEntry(absPath) {
  const stat = await fsp.stat(absPath);
  if (stat.isDirectory()) return; // handled by walk
  if (/\.mdx$/i.test(absPath)) {
    if (isReservedFile(absPath)) return; // skip reserved MDX like _layout/_index
    const outPath = mapOutPath(absPath);
    ensureDirSync(path.dirname(outPath));
    try {
      console.log('Processing MDX', absPath);
      const base = path.basename(absPath);
      const extra = base.toLowerCase() === 'sitemap.mdx' ? { pages: PAGES } : {};
      const html = await compileMdxFile(absPath, outPath, extra);
      console.log('Writing HTML to', outPath);
      await fsp.writeFile(outPath, html, 'utf8');
      console.log('Built', path.relative(process.cwd(), outPath));
    } catch (err) {
      console.error('MDX build failed for', absPath, '\n', err.message);
    }
  } else {
    // Copy other assets into site unchanged
    const rel = path.relative(CONTENT_DIR, absPath);
    const outPath = path.join(OUT_DIR, rel);
    await copyFile(absPath, outPath);
    console.log('Copied', path.relative(process.cwd(), outPath));
  }
}

async function walk(dir) {
  const entries = await fsp.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      await walk(p);
    } else if (e.isFile()) {
      await processEntry(p);
    }
  }
}

async function main() {
  if (!fs.existsSync(CONTENT_DIR)) {
    console.error('No content directory found at', CONTENT_DIR);
    process.exit(1);
  }
  await cleanDir(OUT_DIR);
  await ensureStyles();
  await loadCustomLayout();
  // Gather pages metadata
  const pages = [];
  async function collect(dir) {
    const entries = await fsp.readdir(dir, { withFileTypes: true });
    for (const e of entries) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) await collect(p);
      else if (e.isFile() && /\.mdx$/i.test(p) && !isReservedFile(p)) {
        const base = path.basename(p).toLowerCase();
        const src = await fsp.readFile(p, 'utf8');
        const title = extractTitle(src);
        const rel = path.relative(CONTENT_DIR, p).replace(/\.mdx$/i, '.html');
        if (base !== 'sitemap.mdx') {
          pages.push({ title, href: rel.split(path.sep).join('/') });
        }
      }
    }
  }
  await collect(CONTENT_DIR);
  PAGES = pages;
  await walk(CONTENT_DIR);
}

if (require.main === module) {
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
