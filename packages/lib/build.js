const { fs, fsp, path, CONTENT_DIR, OUT_DIR, ensureDirSync, cleanDir, htmlShell } = require('./common');
const mdx = require('./mdx');
const iiif = require('./iiif');
const search = require('./search');
const { log, logLine } = require('./log');

let PAGES = [];

function mapOutPath(filePath) {
  const rel = path.relative(CONTENT_DIR, filePath);
  const outRel = rel.replace(/\.mdx$/i, '.html');
  return path.join(OUT_DIR, outRel);
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

async function compileMdxFile(filePath, outPath, extraProps = {}) {
  const source = await fsp.readFile(filePath, 'utf8');
  const title = mdx.extractTitle(source);
  const { body, head } = await mdx.compileMdxFile(filePath, outPath, null, extraProps);
  const cssRel = path.relative(path.dirname(outPath), path.join(OUT_DIR, 'styles.css')).split(path.sep).join('/');
  const needsHydrate = body.includes('data-canopy-hydrate') || body.includes('data-canopy-viewer');
  const jsRel = needsHydrate
    ? path.relative(path.dirname(outPath), path.join(OUT_DIR, 'canopy-viewer.js')).split(path.sep).join('/')
    : null;
  return htmlShell({ title, body, cssHref: cssRel || 'styles.css', scriptHref: jsRel, headExtra: head });
}

async function processEntry(absPath) {
  const stat = await fsp.stat(absPath);
  if (stat.isDirectory()) return;
  if (/\.mdx$/i.test(absPath)) {
    if (mdx.isReservedFile(absPath)) return;
    const outPath = mapOutPath(absPath);
    ensureDirSync(path.dirname(outPath));
    try {
      try { log(`• Processing MDX ${absPath}\n`, 'blue'); } catch (_) {}
      const base = path.basename(absPath);
      const extra = base.toLowerCase() === 'sitemap.mdx' ? { pages: PAGES } : {};
      const html = await compileMdxFile(absPath, outPath, extra);
      await fsp.writeFile(outPath, html || '', 'utf8');
      try { log(`✓ Built ${path.relative(process.cwd(), outPath)}\n`, 'green'); } catch (_) {}
    } catch (err) {
      console.error('MDX build failed for', absPath, '\n', err.message);
    }
  } else {
    const rel = path.relative(CONTENT_DIR, absPath);
    const outPath = path.join(OUT_DIR, rel);
    ensureDirSync(path.dirname(outPath));
    await fsp.copyFile(absPath, outPath);
    try { log(`• Copied ${path.relative(process.cwd(), outPath)}\n`, 'cyan', { dim: true }); } catch (_) {}
  }
}

async function walk(dir) {
  const entries = await fsp.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) await walk(p);
    else if (e.isFile()) await processEntry(p);
  }
}

// No global default layout; directory-scoped layouts are resolved per-page

async function build() {
  if (!fs.existsSync(CONTENT_DIR)) {
    console.error('No content directory found at', CONTENT_DIR);
    process.exit(1);
  }
  await cleanDir(OUT_DIR);
  logLine('✓ Cleaned output directory\n', 'cyan');
  await ensureStyles();
  logLine('✓ Wrote styles.css\n', 'cyan');
  await mdx.ensureClientRuntime();
  logLine('✓ Prepared client hydration runtime\n', 'cyan', { dim: true });
  // No-op: global layout removed

  // Build IIIF works + collect search records
  const CONFIG = await iiif.loadConfig();
  const { searchRecords } = await iiif.buildIiifCollectionPages(CONFIG);

  // Collect pages metadata for sitemap injection
  const pages = [];
  async function collect(dir) {
    const entries = await fsp.readdir(dir, { withFileTypes: true });
    for (const e of entries) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) await collect(p);
      else if (e.isFile() && /\.mdx$/i.test(p) && !mdx.isReservedFile(p)) {
        const base = path.basename(p).toLowerCase();
        const src = await fsp.readFile(p, 'utf8');
        const title = mdx.extractTitle(src);
        const rel = path.relative(CONTENT_DIR, p).replace(/\.mdx$/i, '.html');
        if (base !== 'sitemap.mdx') pages.push({ title, href: rel.split(path.sep).join('/') });
      }
    }
  }
  await collect(CONTENT_DIR);
  PAGES = pages;
  // Build all MDX and assets
  logLine('• Building MDX pages...', 'blue', { bright: true });
  await walk(CONTENT_DIR);
  logLine('✓ MDX pages built\n', 'green');

  // Ensure search artifacts
  try {
    const searchPath = path.join(OUT_DIR, 'search.html');
    if (!fs.existsSync(searchPath)) {
      await search.writeSearchIndex([]);
      await search.ensureSearchRuntime();
      await search.buildSearchPage();
      logLine('✓ Created search page (empty index)', 'cyan');
    }
    if (Array.isArray(searchRecords)) {
      await search.writeSearchIndex(searchRecords);
      await search.ensureSearchRuntime();
      await search.buildSearchPage();
      logLine(`✓ Search index: ${searchRecords.length} records\n`, 'cyan');
    }
  } catch (_) {}
}

module.exports = { build };

if (require.main === module) {
  build().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
