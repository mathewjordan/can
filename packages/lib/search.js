const React = require('react');
const ReactDOMServer = require('react-dom/server');
const { path } = require('./common');
const { ensureDirSync, OUT_DIR, htmlShell, fsp } = require('./common');

async function ensureSearchRuntime() {
  let esbuild = null;
  try { esbuild = require('../ui/node_modules/esbuild'); } catch (_) {
    try { esbuild = require('esbuild'); } catch (_) {}
  }
  if (!esbuild) return;
  const entry = `
    import FlexSearch from 'flexsearch';
    async function boot() {
      const res = await fetch('./search-index.json').catch(() => null);
      if (!res || !res.ok) return;
      const data = await res.json();
      const index = new FlexSearch.Index({ tokenize: 'forward' });
      const idToRec = new Map();
      data.forEach((rec, i) => { index.add(i, rec.title || ''); idToRec.set(i, rec); });
      const $ = (sel) => document.querySelector(sel);
      const input = $('#search-input');
      const list = $('#search-results');
      function render(ids) {
        if (!list) return;
        const html = (ids || []).map((i) => {
          const r = idToRec.get(i);
          if (!r) return '';
          const esc = (s) => String(s||'').replace(/[&<>]/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
          return '<li><a href="/' + r.href + '">' + esc(r.title || r.href) + '</a></li>';
        }).join('');
        list.innerHTML = html || '<li><em>No results</em></li>';
      }
      function showAll() { render(data.map((_, i) => i)); }
      function search(q) {
        if (!q) { showAll(); return; }
        const ids = index.search(q, { limit: 200 });
        render(Array.isArray(ids) ? ids : []);
      }
      const params = new URLSearchParams(location.search);
      const initial = params.get('q') || '';
      if (input) {
        input.value = initial;
        input.addEventListener('input', (e) => search(e.target.value));
      }
      if (initial) search(initial); else showAll();
    }
    if (document.readyState !== 'loading') boot();
    else document.addEventListener('DOMContentLoaded', boot);
  `;
  ensureDirSync(OUT_DIR);
  await esbuild.build({
    stdin: { contents: entry, resolveDir: process.cwd(), loader: 'js', sourcefile: 'search-entry.js' },
    outfile: path.join(OUT_DIR, 'search.js'),
    platform: 'browser',
    format: 'iife',
    bundle: true,
    sourcemap: true,
    target: ['es2018'],
    logLevel: 'silent',
  });
}

async function buildSearchPage(Layout) {
  try {
    const outPath = path.join(OUT_DIR, 'search.html');
    ensureDirSync(path.dirname(outPath));
    const content = React.createElement(
      'div',
      { className: 'search' },
      React.createElement('h1', null, 'Search'),
      React.createElement('p', null, 'Search the collection by title.'),
      React.createElement('input', { id: 'search-input', type: 'search', placeholder: 'Type to search…', style: { width: '100%', padding: '0.5rem' } }),
      React.createElement('ul', { id: 'search-results' })
    );
    const page = React.createElement(Layout, {}, content);
    const body = ReactDOMServer.renderToStaticMarkup(page);
    const cssRel = path.relative(path.dirname(outPath), path.join(OUT_DIR, 'styles.css')).split(path.sep).join('/');
    const jsRel = path.relative(path.dirname(outPath), path.join(OUT_DIR, 'search.js')).split(path.sep).join('/');
    const html = htmlShell({ title: 'Search', body, cssHref: cssRel || 'styles.css', scriptHref: jsRel || 'search.js' });
    await fsp.writeFile(outPath, html, 'utf8');
    console.log('Search: Built', path.relative(process.cwd(), outPath));
  } catch (e) {
    console.warn('Search: Failed to build page', e.message);
  }
}

async function writeSearchIndex(records) {
  const idxPath = path.join(OUT_DIR, 'search-index.json');
  await fsp.writeFile(idxPath, JSON.stringify(records || [], null, 2), 'utf8');
}

module.exports = {
  ensureSearchRuntime,
  buildSearchPage,
  writeSearchIndex,
};

