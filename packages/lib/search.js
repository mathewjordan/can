const React = require('react');
const ReactDOMServer = require('react-dom/server');
const { path, withBase } = require('./common');
const { ensureDirSync, OUT_DIR, htmlShell, fsp } = require('./common');

async function ensureSearchRuntime() {
  let esbuild = null;
  try { esbuild = require('../ui/node_modules/esbuild'); } catch (_) {
    try { esbuild = require('esbuild'); } catch (_) {}
  }
  if (!esbuild) return;
  const { BASE_PATH } = require('./common');
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
      const countEl = $('#search-count');
      const summaryEl = $('#search-summary');
      let currentQuery = '';
      function render(ids) {
        if (!list) return;
        const html = (ids || []).map((i) => {
          const r = idToRec.get(i);
          if (!r) return '';
          const esc = (s) => String(s||'').replace(/[&<>]/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
          var base = ${JSON.stringify(BASE_PATH)};
          var pref = base ? base : '';
          var href = (pref ? pref : '') + '/' + r.href;
          return '<li><a href="' + href + '">' + esc(r.title || r.href) + '</a></li>';
        }).join('');
        const shown = (ids || []).length;
        list.innerHTML = html || '<li><em>No results</em></li>';
        if (countEl) countEl.textContent = String(shown);
        if (summaryEl) {
          const esc = (s) => String(s||'').replace(/[&<>]/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
          const total = data.length;
          if (currentQuery) {
            summaryEl.innerHTML = 'Found <strong>' + shown + '</strong> of ' + total + ' for \u201C' + esc(currentQuery) + '\u201D';
          } else {
            summaryEl.innerHTML = 'Showing <strong>' + shown + '</strong> of ' + total + ' items';
          }
        }
      }
      function showAll() { render(data.map((_, i) => i)); }
      function search(q) {
        if (!q) { currentQuery=''; showAll(); return; }
        currentQuery = q;
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

async function buildSearchPage() {
  try {
    const outPath = path.join(OUT_DIR, 'search.html');
    ensureDirSync(path.dirname(outPath));
    // Provide composable primitives for MDX layout: form + results
    const formEl = React.createElement('input', {
      id: 'search-input',
      type: 'search',
      placeholder: 'Type to search…',
      style: { width: '100%', padding: '0.5rem' },
    });
    const resultsEl = React.createElement('ul', { id: 'search-results' });
    const countEl = React.createElement('span', { id: 'search-count' });
    const summaryEl = React.createElement('div', { id: 'search-summary' });

    // If a custom layout exists at content/search/_layout.mdx, render it
    const { CONTENT_DIR } = require('./common');
    const layoutPath = path.join(CONTENT_DIR, 'search', '_layout.mdx');
    let content = null;
    if (require('fs').existsSync(layoutPath)) {
      const { compileMdxToComponent } = require('./mdx');
      const Layout = await compileMdxToComponent(layoutPath);
      content = React.createElement(Layout, { search: { form: formEl, results: resultsEl, count: countEl, summary: summaryEl } });
    } else {
      // Fallback to a minimal hardcoded page
      content = React.createElement(
        'div',
        { className: 'search' },
        React.createElement('h1', null, 'Search'),
        React.createElement('p', null, 'Search the collection by title.'),
        formEl,
        React.createElement('p', null, 'Results: ', countEl),
        summaryEl,
        resultsEl
      );
    }

    // Wrap the page with MDXProvider so anchors in custom MDX Layout get base path
    let MDXProvider = null;
    try { const mod = await import('@mdx-js/react'); MDXProvider = mod.MDXProvider || mod.default || null; } catch (_) { MDXProvider = null; }
    const Anchor = function A(props) {
      let { href = '', ...rest } = props || {};
      href = withBase(href);
      return React.createElement('a', { href, ...rest }, props.children);
    };
    const compMap = { a: Anchor };
    const { loadAppWrapper } = require('./mdx');
    const app = await loadAppWrapper();
    const wrappedApp = app && app.App ? React.createElement(app.App, null, content) : content;
    const page = MDXProvider ? React.createElement(MDXProvider, { components: compMap }, wrappedApp) : wrappedApp;
    const body = ReactDOMServer.renderToStaticMarkup(page);
    const head = app && app.Head ? ReactDOMServer.renderToStaticMarkup(React.createElement(app.Head)) : '';
    const cssRel = path.relative(path.dirname(outPath), path.join(OUT_DIR, 'styles.css')).split(path.sep).join('/');
    const jsRel = path.relative(path.dirname(outPath), path.join(OUT_DIR, 'search.js')).split(path.sep).join('/');
    const html = htmlShell({ title: 'Search', body, cssHref: cssRel || 'styles.css', scriptHref: jsRel || 'search.js', headExtra: head });
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
