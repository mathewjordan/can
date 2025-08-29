const React = require('react');
const ReactDOMServer = require('react-dom/server');
const { pathToFileURL } = require('url');
const {
  fs,
  fsp,
  path,
  CONTENT_DIR,
  OUT_DIR,
  CACHE_DIR,
  ensureDirSync,
  withBase,
} = require('./common');

// ESM-only in v3; load dynamically from CJS
let MDXProviderCached = null;
async function getMdxProvider() {
  if (MDXProviderCached) return MDXProviderCached;
  try {
    const mod = await import('@mdx-js/react');
    MDXProviderCached = mod.MDXProvider || mod.default;
  } catch (_) {
    MDXProviderCached = null;
  }
  return MDXProviderCached;
}

// Lazily load UI components from the workspace package and cache them.
let UI_COMPONENTS = null;
async function loadUiComponents() {
  if (UI_COMPONENTS) return UI_COMPONENTS;
  try {
    const mod = await import('@canopy-iiif/ui');
    UI_COMPONENTS = mod || {};
  } catch (_) {
    UI_COMPONENTS = {};
  }
  return UI_COMPONENTS;
}

function extractTitle(mdxSource) {
  const m = mdxSource.match(/^\s*#\s+(.+)\s*$/m);
  return m ? m[1].trim() : 'Untitled';
}

function isReservedFile(p) {
  const base = path.basename(p);
  return base.startsWith('_');
}

async function compileMdxFile(filePath, outPath, Layout, extraProps = {}) {
  const { compile } = await import('@mdx-js/mdx');
  const source = await fsp.readFile(filePath, 'utf8');
  const compiled = await compile(source, {
    jsx: false,
    development: false,
    providerImportSource: '@mdx-js/react',
    jsxImportSource: 'react',
    format: 'mdx',
  });
  const code = String(compiled);
  ensureDirSync(CACHE_DIR);
  const relCacheName =
    path
      .relative(CONTENT_DIR, filePath)
      .replace(/[\\/]/g, '_')
      .replace(/\.mdx$/i, '') + '.mjs';
  const tmpFile = path.join(CACHE_DIR, relCacheName);
  await fsp.writeFile(tmpFile, code, 'utf8');
  // Bust ESM module cache using source mtime
  let bust = '';
  try {
    const st = fs.statSync(filePath);
    bust = `?v=${Math.floor(st.mtimeMs)}`;
  } catch (_) {}
  const mod = await import(pathToFileURL(tmpFile).href + bust);
  const MDXContent = mod.default || mod.MDXContent || mod;
  const components = await loadUiComponents();
  const MDXProvider = await getMdxProvider();
  // Base path support for anchors
  const Anchor = function A(props) {
    let { href = '', ...rest } = props || {};
    href = withBase(href);
    return React.createElement('a', { href, ...rest }, props.children);
  };
  const compMap = { ...components, a: Anchor };
  const tree = React.createElement(Layout, {}, React.createElement(MDXContent, extraProps));
  const page = MDXProvider
    ? React.createElement(MDXProvider, { components: compMap }, tree)
    : tree;
  const body = ReactDOMServer.renderToStaticMarkup(page);
  return body;
}

async function compileMdxToComponent(filePath) {
  const { compile } = await import('@mdx-js/mdx');
  const source = await fsp.readFile(filePath, 'utf8');
  const compiled = await compile(source, {
    jsx: false,
    development: false,
    providerImportSource: '@mdx-js/react',
    jsxImportSource: 'react',
    format: 'mdx',
  });
  const code = String(compiled);
  ensureDirSync(CACHE_DIR);
  const relCacheName =
    path
      .relative(CONTENT_DIR, filePath)
      .replace(/[\\/]/g, '_')
      .replace(/\.mdx$/i, '') + '.mjs';
  const tmpFile = path.join(CACHE_DIR, relCacheName);
  await fsp.writeFile(tmpFile, code, 'utf8');
  let bust = '';
  try {
    const st = fs.statSync(filePath);
    bust = `?v=${Math.floor(st.mtimeMs)}`;
  } catch (_) {}
  const mod = await import(pathToFileURL(tmpFile).href + bust);
  return mod.default || mod.MDXContent || mod;
}

async function loadCustomLayout(defaultLayout) {
  const custom = path.join(CONTENT_DIR, '_layout.mdx');
  if (fs.existsSync(custom)) {
    try {
      const Comp = await compileMdxToComponent(custom);
      return function LayoutWrapper({ children }) {
        return React.createElement(Comp, null, children);
      };
    } catch (_) {}
  }
  return defaultLayout;
}

async function ensureClientRuntime() {
  // Bundle a tiny browser runtime that hydrates Viewer placeholders using React.
  let esbuild = null;
  try {
    esbuild = require('../ui/node_modules/esbuild');
  } catch (_) {
    try { esbuild = require('esbuild'); } catch (_) {}
  }
  if (!esbuild) { try { require('./log').log('Hydration runtime skipped (no esbuild)\n', 'yellow', { dim: true }); } catch (_) {} return; }
  const entry = `
    import React from 'react';
    import { createRoot } from 'react-dom/client';
    import * as UI from '@canopy-iiif/ui';
    import CloverViewer from '@samvera/clover-iiif/viewer';
    function hydrateCanopy() {
      document.querySelectorAll('[data-canopy-hydrate]').forEach((el) => {
        if (el.__hydrated) return; el.__hydrated = true;
        const name = el.getAttribute('data-component') || '';
        const raw = el.getAttribute('data-props') || '';
        let props = {};
        try { props = raw ? JSON.parse(decodeURIComponent(raw)) : {}; } catch (_) {}
        let Comp = UI && UI[name];
        if (!Comp && (name === 'Viewer' || name === 'CloverViewer')) Comp = CloverViewer;
        if (!Comp) return;
        const root = createRoot(el);
        root.render(React.createElement(Comp, props));
      });
      document.querySelectorAll('[data-canopy-viewer]').forEach((el) => {
        if (el.__hydrated) return; el.__hydrated = true;
        const iiifContent = el.getAttribute('data-iiif-content') || '';
        const root = createRoot(el);
        root.render(React.createElement(CloverViewer, { iiifContent }));
      });
    }
    if (document.readyState !== 'loading') hydrateCanopy();
    else document.addEventListener('DOMContentLoaded', hydrateCanopy);
  `;
  ensureDirSync(OUT_DIR);
  await esbuild.build({
    stdin: {
      contents: entry,
      resolveDir: process.cwd(),
      loader: 'js',
      sourcefile: 'canopy-viewer-entry.js',
    },
    outfile: path.join(OUT_DIR, 'canopy-viewer.js'),
    platform: 'browser',
    format: 'iife',
    bundle: true,
    sourcemap: true,
    target: ['es2018'],
    logLevel: 'silent',
  });
}

module.exports = {
  extractTitle,
  isReservedFile,
  compileMdxFile,
  compileMdxToComponent,
  loadCustomLayout,
  ensureClientRuntime,
};
