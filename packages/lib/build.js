const fs = require("fs");
const fsp = fs.promises;
const path = require("path");
const { pathToFileURL } = require("url");
const crypto = require("crypto");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
// ESM-only in v3; load dynamically from CJS
let MDXProviderCached = null;
async function getMdxProvider() {
  if (MDXProviderCached) return MDXProviderCached;
  try {
    const mod = await import("@mdx-js/react");
    MDXProviderCached = mod.MDXProvider || mod.default;
  } catch (_) {
    MDXProviderCached = null;
  }
  return MDXProviderCached;
}
let Layout = require("./layout");
const slugify = require("slugify");
const yaml = require("js-yaml");

const CONTENT_DIR = path.resolve("content");
const OUT_DIR = path.resolve("site");
const CACHE_DIR = path.resolve(".cache/mdx");
const ASSETS_DIR = path.resolve("assets");
const IIIF_CACHE_DIR = path.resolve(".cache/iiif");
const IIIF_CACHE_MANIFESTS_DIR = path.join(IIIF_CACHE_DIR, "manifests");
const IIIF_CACHE_COLLECTION = path.join(IIIF_CACHE_DIR, "collection.json");
const IIIF_CACHE_INDEX = path.join(IIIF_CACHE_DIR, "manifest-index.json");
let PAGES = [];
const dirLayouts = new Map();
let CONFIG = {
  collection: {
    uri: "https://iiif.io/api/cookbook/recipe/0032-collection/collection.json",
  },
};

// Lazily load UI components from the workspace package and cache them.
// We "blindly" accept all named exports and pass them to MDX.
let UI_COMPONENTS = null;
async function loadUiComponents() {
  if (UI_COMPONENTS) return UI_COMPONENTS;
  try {
    const mod = await import("@canopy-iiif/ui");
    // Use the namespace object as-is for MDX components mapping.
    UI_COMPONENTS = mod || {};
  } catch (_) {
    UI_COMPONENTS = {};
  }
  return UI_COMPONENTS;
}

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
  const outRel = rel.replace(/\.mdx$/i, ".html");
  return path.join(OUT_DIR, outRel);
}

function extractTitle(mdxSource) {
  const m = mdxSource.match(/^\s*#\s+(.+)\s*$/m);
  return m ? m[1].trim() : "Untitled";
}

function htmlShell({ title, body, cssHref, scriptHref }) {
  const scriptTag = scriptHref ? `<script defer src="${scriptHref}"></script>` : '';
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><title>${title}</title><link rel="stylesheet" href="${cssHref}">${scriptTag}</head><body>${body}</body></html>`;
}

async function ensureClientRuntime() {
  // Bundle a tiny browser runtime that hydrates Viewer placeholders using React.
  let esbuild = null;
  try {
    // Prefer UI's local esbuild to avoid adding new deps.
    esbuild = require("../ui/node_modules/esbuild");
  } catch (_) {
    try { esbuild = require("esbuild"); } catch (_) {}
  }
  if (!esbuild) {
    console.warn("[build] esbuild not available; Viewer will not hydrate in browser.");
    return;
  }
  const entry = `
    import React from 'react';
    import { createRoot } from 'react-dom/client';
    import CloverViewer from '@samvera/clover-iiif/viewer';
    function boot() {
      document.querySelectorAll('[data-canopy-viewer]').forEach((el) => {
        if (el.__hydrated) return; el.__hydrated = true;
        const iiifContent = el.getAttribute('data-iiif-content') || '';
        const root = createRoot(el);
        root.render(React.createElement(CloverViewer, { iiifContent }));
      });
    }
    if (document.readyState !== 'loading') boot();
    else document.addEventListener('DOMContentLoaded', boot);
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

async function compileMdxFile(filePath, outPath, extraProps = {}) {
  const { compile } = await import("@mdx-js/mdx");
  // Debug logs for build flow
  console.log('[mdx] reading', filePath);
  const source = await fsp.readFile(filePath, "utf8");
  const title = extractTitle(source);
  const compiled = await compile(source, {
    jsx: false,
    development: false,
    providerImportSource: "@mdx-js/react",
    jsxImportSource: "react",
    format: "mdx",
  });
  const code = String(compiled);
  ensureDirSync(CACHE_DIR);
  const relCacheName =
    path
      .relative(CONTENT_DIR, filePath)
      .replace(/[\\/]/g, "_")
      .replace(/\.mdx$/i, "") + ".mjs";
  const tmpFile = path.join(CACHE_DIR, relCacheName);
  await fsp.writeFile(tmpFile, code, "utf8");
  console.log('[mdx] importing', tmpFile);
  // Bust ESM module cache using source mtime to ensure dev rebuilds pick up changes
  let bust = '';
  try {
    const st = fs.statSync(filePath);
    bust = `?v=${Math.floor(st.mtimeMs)}`;
  } catch (_) {}
  const mod = await import(pathToFileURL(tmpFile).href + bust);
  const MDXContent = mod.default || mod.MDXContent || mod;
  console.log('[mdx] rendering', filePath);
  const components = await loadUiComponents();
  const MDXProvider = await getMdxProvider();
  const content = React.createElement(MDXContent, extraProps);
  const wrapped = MDXProvider
    ? React.createElement(MDXProvider, { components }, content)
    : content;
  const page = React.createElement(Layout, {}, wrapped);
  const body = ReactDOMServer.renderToStaticMarkup(page);
  const cssRel = path
    .relative(path.dirname(outPath), path.join(OUT_DIR, "styles.css"))
    .split(path.sep)
    .join("/");
  const jsRel = path
    .relative(path.dirname(outPath), path.join(OUT_DIR, "canopy-viewer.js"))
    .split(path.sep)
    .join("/");
  return htmlShell({ title, body, cssHref: cssRel || "styles.css", scriptHref: jsRel || "canopy-viewer.js" });
}

async function copyFile(src, dest) {
  ensureDirSync(path.dirname(dest));
  await fsp.copyFile(src, dest);
}

async function ensureStyles() {
  const dest = path.join(OUT_DIR, "styles.css");
  const custom = path.join(CONTENT_DIR, "_styles.css");
  ensureDirSync(path.dirname(dest));
  if (fs.existsSync(custom)) {
    await fsp.copyFile(custom, dest);
    return;
  }
  const css = `:root{--max-w:760px;--muted:#6b7280}*{box-sizing:border-box}body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Helvetica,Arial,sans-serif;max-width:var(--max-w);margin:2rem auto;padding:0 1rem;line-height:1.6}a{color:#2563eb;text-decoration:none}a:hover{text-decoration:underline}.site-header,.site-footer{display:flex;align-items:center;justify-content:space-between;gap:.5rem;padding:1rem 0;border-bottom:1px solid #e5e7eb}.site-footer{border-bottom:0;border-top:1px solid #e5e7eb;color:var(--muted)}.brand{font-weight:600}.content pre{background:#f6f8fa;padding:1rem;overflow:auto}.content code{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;background:#f6f8fa;padding:.1rem .3rem;border-radius:4px}`;
  await fsp.writeFile(dest, css, "utf8");
}

async function compileMdxToComponent(filePath) {
  const { compile } = await import("@mdx-js/mdx");
  const source = await fsp.readFile(filePath, "utf8");
  const compiled = await compile(source, {
    jsx: false,
    development: false,
    providerImportSource: "@mdx-js/react",
    jsxImportSource: "react",
    format: "mdx",
  });
  const code = String(compiled);
  ensureDirSync(CACHE_DIR);
  const relCacheName =
    path
      .relative(CONTENT_DIR, filePath)
      .replace(/[\\/]/g, "_")
      .replace(/\.mdx$/i, "") + ".mjs";
  const tmpFile = path.join(CACHE_DIR, relCacheName);
  await fsp.writeFile(tmpFile, code, "utf8");
  // Bust ESM module cache using source mtime to ensure dev rebuilds pick up changes
  let bust = '';
  try {
    const st = fs.statSync(filePath);
    bust = `?v=${Math.floor(st.mtimeMs)}`;
  } catch (_) {}
  const mod = await import(pathToFileURL(tmpFile).href + bust);
  return mod.default || mod.MDXContent || mod;
}

async function loadCustomLayout() {
  const custom = path.join(CONTENT_DIR, "_layout.mdx");
  if (fs.existsSync(custom)) {
    try {
      const Comp = await compileMdxToComponent(custom);
      // Wrap compiled MDX as a layout component receiving children
      Layout = function LayoutWrapper({ children }) {
        return React.createElement(Comp, null, children);
      };
      console.log("Using custom layout: content/_layout.mdx");
    } catch (e) {
      console.warn(
        "Failed to load custom layout, falling back. Reason:",
        e.message
      );
    }
  }
}

async function loadDirLayout(dirAbs) {
  const key = path.resolve(dirAbs);
  if (dirLayouts.has(key)) return dirLayouts.get(key);
  const localLayout = path.join(dirAbs, "_layout.mdx");
  let Comp = null;
  if (fs.existsSync(localLayout)) {
    try {
      Comp = await compileMdxToComponent(localLayout);
      console.log(
        "Using folder layout:",
        path.relative(CONTENT_DIR, localLayout)
      );
    } catch (e) {
      console.warn("Failed to load folder layout", localLayout, e.message);
    }
  }
  dirLayouts.set(key, Comp);
  return Comp;
}

function isReservedFile(p) {
  const base = path.basename(p);
  return base.startsWith("_");
}

async function processEntry(absPath) {
  const stat = await fsp.stat(absPath);
  if (stat.isDirectory()) return; // handled by walk
  if (/\.mdx$/i.test(absPath)) {
    if (isReservedFile(absPath)) return; // skip reserved MDX like _layout/_index
    const outPath = mapOutPath(absPath);
    ensureDirSync(path.dirname(outPath));
    try {
      console.log("Processing MDX", absPath);
      const base = path.basename(absPath);
      const extra =
        base.toLowerCase() === "sitemap.mdx" ? { pages: PAGES } : {};
      const html = await compileMdxFile(absPath, outPath, extra);
      console.log("[mdx] compiled type:", typeof html, 'len:', html && html.length);
      console.log("Writing HTML to", outPath);
      await fsp.writeFile(outPath, html || '', "utf8");
      console.log("Built", path.relative(process.cwd(), outPath));
    } catch (err) {
      console.error("MDX build failed for", absPath, "\n", err.message);
    }
  } else {
    // Copy other assets into site unchanged
    const rel = path.relative(CONTENT_DIR, absPath);
    const outPath = path.join(OUT_DIR, rel);
    await copyFile(absPath, outPath);
    console.log("Copied", path.relative(process.cwd(), outPath));
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

async function build() {
  if (!fs.existsSync(CONTENT_DIR)) {
    console.error("No content directory found at", CONTENT_DIR);
    process.exit(1);
  }
  await cleanDir(OUT_DIR);
  await ensureStyles();
  await ensureClientRuntime();
  await loadCustomLayout();
  await loadConfig();
  await buildIiifCollectionPages();
  // Gather pages metadata
  const pages = [];
  async function collect(dir) {
    const entries = await fsp.readdir(dir, { withFileTypes: true });
    for (const e of entries) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) await collect(p);
      else if (e.isFile() && /\.mdx$/i.test(p) && !isReservedFile(p)) {
        const base = path.basename(p).toLowerCase();
        const src = await fsp.readFile(p, "utf8");
        const title = extractTitle(src);
        const rel = path.relative(CONTENT_DIR, p).replace(/\.mdx$/i, ".html");
        if (base !== "sitemap.mdx") {
          pages.push({ title, href: rel.split(path.sep).join("/") });
        }
      }
    }
  }
  await collect(CONTENT_DIR);
  PAGES = pages;
  await walk(CONTENT_DIR);
}

async function loadConfig() {
  const overrideConfigPath = process.env.CANOPY_CONFIG;
  const configPath = path.resolve(overrideConfigPath || "canopy.yml");
  if (fs.existsSync(configPath)) {
    try {
      const raw = await fsp.readFile(configPath, "utf8");
      const data = yaml.load(raw) || {};
      // shallow merge; keep defaults if unspecified
      CONFIG = {
        collection: {
          uri: (data.collection && data.collection.uri) || CONFIG.collection.uri,
        },
      };
      console.log(
        "Loaded config from",
        overrideConfigPath ? overrideConfigPath : "canopy.yml"
      );
    } catch (e) {
      console.warn(
        "Failed to read",
        overrideConfigPath ? overrideConfigPath : "canopy.yml",
        e.message
      );
    }
  }
  // Environment variable override for collection URI (never writes to disk)
  if (process.env.CANOPY_COLLECTION_URI) {
    CONFIG.collection.uri = String(process.env.CANOPY_COLLECTION_URI);
    console.log("Using collection URI from CANOPY_COLLECTION_URI");
  }
}

function firstLabelString(label) {
  if (!label) return "Untitled";
  if (typeof label === "string") return label;
  const keys = Object.keys(label || {});
  if (!keys.length) return "Untitled";
  const arr = label[keys[0]];
  if (Array.isArray(arr) && arr.length) return String(arr[0]);
  return "Untitled";
}

async function normalizeToV3(resource) {
  try {
    const helpers = await import("@iiif/helpers");
    if (helpers && typeof helpers.toPresentation3 === "function") {
      return helpers.toPresentation3(resource);
    }
    if (helpers && typeof helpers.normalize === "function") {
      return helpers.normalize(resource);
    }
    if (helpers && typeof helpers.upgradeToV3 === "function") {
      return helpers.upgradeToV3(resource);
    }
  } catch (_) {}
  return resource;
}

async function readJson(p) {
  const raw = await fsp.readFile(p, "utf8");
  return JSON.parse(raw);
}

async function buildIiifCollectionPages() {
  const worksDir = path.join(CONTENT_DIR, "works");
  const worksLayoutPath = path.join(worksDir, "_layout.mdx");
  if (!fs.existsSync(worksLayoutPath)) {
    console.log(
      "IIIF: No content/works/_layout.mdx found; skipping IIIF page build."
    );
    return;
  }
  ensureDirSync(IIIF_CACHE_MANIFESTS_DIR);
  // Always fetch the source collection from canopy.yml; do not read/write cache
  const collectionUri =
    (CONFIG && CONFIG.collection && CONFIG.collection.uri) || null;
  let collection = null;
  if (collectionUri) {
    collection = await readJsonFromUri(collectionUri);
  }
  if (!collection) {
    console.warn("IIIF: No collection available; skipping.");
    return;
  }
  collection = await normalizeToV3(collection);
  // Compare against tracked collection signature; flush manifests cache if changed
  const index = await loadManifestIndex();
  const currentSig = {
    uri: String(collectionUri || ""),
    hash: computeHash(collection),
  };
  const prev = (index && index.collection) || null;
  // Only flush when the source collection URI changes; content changes at the
  // same URI should NOT trigger a flush.
  const changed = !prev || prev.uri !== currentSig.uri;
  if (changed) {
    console.log("IIIF: Source collection signature changed; flushing manifest cache.");
    await flushManifestCache();
    index.byId = {};
  }
  index.collection = { ...currentSig, updatedAt: new Date().toISOString() };
  await saveManifestIndex(index);

  const WorksLayout = await compileMdxToComponent(worksLayoutPath);
  const SiteLayout = Layout;

  const items = Array.isArray(collection.items) ? collection.items : [];
  for (const it of items) {
    if (!it) continue;
    const id = it.id || it["@id"] || "";
    // 1) Try cached manifest by id
    let manifest = await loadCachedManifestById(id);
    // If no local manifest found, try fetching from id (if http/https)
    if (!manifest && /^https?:\/\//i.test(String(id || ""))) {
      const remote = await readJsonFromUri(String(id));
      if (remote) {
        // Normalize to v3 before caching to ensure stability of slug
        const norm = await normalizeToV3(remote);
        manifest = norm;
        await saveCachedManifest(manifest, String(id));
      }
    }
    if (!manifest) {
      console.warn("IIIF: Could not resolve manifest for item id:", id);
      continue;
    }
    manifest = await normalizeToV3(manifest);

    const title = firstLabelString(manifest.label);
    const slug = slugify(title || "untitled", {
      lower: true,
      strict: true,
      trim: true,
    });
    const outPath = path.join(OUT_DIR, "works", slug + ".html");
    ensureDirSync(path.dirname(outPath));

    try {
      const components = await loadUiComponents();
      const MDXProvider = await getMdxProvider();
      const content = React.createElement(WorksLayout, { manifest });
      const wrapped = MDXProvider
        ? React.createElement(MDXProvider, { components }, content)
        : content;
      const page = React.createElement(SiteLayout, {}, wrapped);
      const body = ReactDOMServer.renderToStaticMarkup(page);
      const cssRel = path
        .relative(path.dirname(outPath), path.join(OUT_DIR, "styles.css"))
        .split(path.sep)
        .join("/");
      const jsRel = path
        .relative(path.dirname(outPath), path.join(OUT_DIR, "canopy-viewer.js"))
        .split(path.sep)
        .join("/");
      const html = htmlShell({ title, body, cssHref: cssRel || "styles.css", scriptHref: jsRel || "canopy-viewer.js" });
      await fsp.writeFile(outPath, html, "utf8");
      console.log("IIIF: Built", path.relative(process.cwd(), outPath));
    } catch (e) {
      console.warn(
        "IIIF: Failed to render page for manifest",
        id || '<unknown>',
        e.message
      );
    }
  }
}

async function isHttpUrl(uri) {
  return /^https?:\/\//i.test(String(uri || ""));
}

async function loadCachedCollection() {
  try {
    if (fs.existsSync(IIIF_CACHE_COLLECTION)) {
      return await readJson(IIIF_CACHE_COLLECTION);
    }
  } catch (_) {}
  return null;
}

async function saveCachedCollection(obj) {
  try {
    ensureDirSync(IIIF_CACHE_DIR);
    await fsp.writeFile(
      IIIF_CACHE_COLLECTION,
      JSON.stringify(obj, null, 2),
      "utf8"
    );
    console.log("IIIF: Cached collection ->", IIIF_CACHE_COLLECTION);
  } catch (_) {}
}

async function loadManifestIndex() {
  try {
    if (fs.existsSync(IIIF_CACHE_INDEX)) {
      const idx = await readJson(IIIF_CACHE_INDEX);
      return idx && typeof idx === "object" ? idx : { byId: {}, collection: null };
    }
  } catch (_) {}
  return { byId: {}, collection: null };
}

async function saveManifestIndex(index) {
  try {
    ensureDirSync(IIIF_CACHE_DIR);
    await fsp.writeFile(
      IIIF_CACHE_INDEX,
      JSON.stringify(index, null, 2),
      "utf8"
    );
  } catch (_) {}
}

async function loadCachedManifestById(id) {
  if (!id) return null;
  try {
    const index = await loadManifestIndex();
    const slug = index.byId && index.byId[id];
    if (!slug) return null;
    const p = path.join(IIIF_CACHE_MANIFESTS_DIR, slug + ".json");
    if (!fs.existsSync(p)) return null;
    return await readJson(p);
  } catch (_) {
    return null;
  }
}

async function saveCachedManifest(manifest, id) {
  try {
    const index = await loadManifestIndex();
    const title = firstLabelString(manifest && manifest.label);
    let baseSlug =
      slugify(title || "untitled", { lower: true, strict: true, trim: true }) ||
      "untitled";
    // ensure unique slug across existing index
    const usedSlugs = new Set(Object.values(index.byId || {}));
    let slug = baseSlug;
    let i = 1;
    while (usedSlugs.has(slug)) {
      const existingId = Object.keys(index.byId).find(
        (k) => index.byId[k] === slug
      );
      if (existingId === id) break; // same mapping, allow overwrite
      slug = `${baseSlug}-${i++}`;
    }
    ensureDirSync(IIIF_CACHE_MANIFESTS_DIR);
    const dest = path.join(IIIF_CACHE_MANIFESTS_DIR, slug + ".json");
    await fsp.writeFile(dest, JSON.stringify(manifest, null, 2), "utf8");
    index.byId = index.byId || {};
    index.byId[id] = slug;
    await saveManifestIndex(index);
    console.log("IIIF: Cached manifest ->", dest);
  } catch (_) {}
}

async function readJsonFromUri(uri) {
  try {
    if (/^https?:\/\//i.test(uri)) {
      if (typeof fetch !== "function") return null;
      const res = await fetch(uri, { headers: { Accept: "application/json" } });
      if (!res.ok) {
        console.warn("IIIF: HTTP error for", uri, res.status);
        return null;
      }
      return await res.json();
    }
    // Local path or file URI
    const p = uri.startsWith("file://") ? new URL(uri) : { pathname: uri };
    const localPath = uri.startsWith("file://")
      ? p
      : path.resolve(String(p.pathname));
    return await readJson(localPath);
  } catch (e) {
    console.warn("IIIF: Failed to load", uri, e.message);
    return null;
  }
}

function computeHash(obj) {
  try {
    const json = stableStringify(obj);
    return crypto.createHash("sha256").update(json).digest("hex");
  } catch (_) {
    return "";
  }
}

function stableStringify(value) {
  return JSON.stringify(deepSort(value));
}

function deepSort(value) {
  if (Array.isArray(value)) {
    return value.map(deepSort);
  }
  if (value && typeof value === "object") {
    const out = {};
    for (const key of Object.keys(value).sort()) {
      out[key] = deepSort(value[key]);
    }
    return out;
  }
  return value;
}

async function flushManifestCache() {
  try {
    await fsp.rm(IIIF_CACHE_MANIFESTS_DIR, { recursive: true, force: true });
  } catch (_) {}
  ensureDirSync(IIIF_CACHE_MANIFESTS_DIR);
}

module.exports = { build };

if (require.main === module) {
  build().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
