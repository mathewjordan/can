const React = require('react');
const ReactDOMServer = require('react-dom/server');
const crypto = require('crypto');
const slugify = require('slugify');
const yaml = require('js-yaml');
const {
  fs,
  fsp,
  path,
  OUT_DIR,
  CONTENT_DIR,
  ensureDirSync,
  htmlShell,
} = require('./common');
const mdx = require('./mdx');

const IIIF_CACHE_DIR = path.resolve('.cache/iiif');
const IIIF_CACHE_MANIFESTS_DIR = path.join(IIIF_CACHE_DIR, 'manifests');
const IIIF_CACHE_COLLECTION = path.join(IIIF_CACHE_DIR, 'collection.json');
const IIIF_CACHE_INDEX = path.join(IIIF_CACHE_DIR, 'manifest-index.json');

function firstLabelString(label) {
  if (!label) return 'Untitled';
  if (typeof label === 'string') return label;
  const keys = Object.keys(label || {});
  if (!keys.length) return 'Untitled';
  const arr = label[keys[0]];
  if (Array.isArray(arr) && arr.length) return String(arr[0]);
  return 'Untitled';
}

async function normalizeToV3(resource) {
  try {
    const helpers = await import('@iiif/helpers');
    if (helpers && typeof helpers.toPresentation3 === 'function') {
      return helpers.toPresentation3(resource);
    }
    if (helpers && typeof helpers.normalize === 'function') {
      return helpers.normalize(resource);
    }
    if (helpers && typeof helpers.upgradeToV3 === 'function') {
      return helpers.upgradeToV3(resource);
    }
  } catch (_) {}
  return resource;
}

async function readJson(p) {
  const raw = await fsp.readFile(p, 'utf8');
  return JSON.parse(raw);
}

async function readJsonFromUri(uri) {
  try {
    if (/^https?:\/\//i.test(uri)) {
      if (typeof fetch !== 'function') return null;
      const res = await fetch(uri, { headers: { Accept: 'application/json' } });
      if (!res.ok) return null;
      return await res.json();
    }
    const p = uri.startsWith('file://') ? new URL(uri) : { pathname: uri };
    const localPath = uri.startsWith('file://') ? p : path.resolve(String(p.pathname));
    return await readJson(localPath);
  } catch (_) {
    return null;
  }
}

function computeHash(obj) {
  try {
    const json = JSON.stringify(deepSort(obj));
    return crypto.createHash('sha256').update(json).digest('hex');
  } catch (_) {
    return '';
  }
}

function deepSort(value) {
  if (Array.isArray(value)) return value.map(deepSort);
  if (value && typeof value === 'object') {
    const out = {};
    for (const key of Object.keys(value).sort()) out[key] = deepSort(value[key]);
    return out;
  }
  return value;
}

async function loadManifestIndex() {
  try {
    if (fs.existsSync(IIIF_CACHE_INDEX)) {
      const idx = await readJson(IIIF_CACHE_INDEX);
      return idx && typeof idx === 'object' ? idx : { byId: {}, collection: null };
    }
  } catch (_) {}
  return { byId: {}, collection: null };
}

async function saveManifestIndex(index) {
  try {
    ensureDirSync(IIIF_CACHE_DIR);
    await fsp.writeFile(IIIF_CACHE_INDEX, JSON.stringify(index, null, 2), 'utf8');
  } catch (_) {}
}

async function loadCachedManifestById(id) {
  if (!id) return null;
  try {
    const index = await loadManifestIndex();
    const slug = index.byId && index.byId[id];
    if (!slug) return null;
    const p = path.join(IIIF_CACHE_MANIFESTS_DIR, slug + '.json');
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
    const baseSlug = slugify(title || 'untitled', { lower: true, strict: true, trim: true }) || 'untitled';
    const usedSlugs = new Set(Object.values(index.byId || {}));
    let slug = baseSlug;
    let i = 1;
    while (usedSlugs.has(slug)) {
      const existingId = Object.keys(index.byId).find((k) => index.byId[k] === slug);
      if (existingId === id) break;
      slug = `${baseSlug}-${i++}`;
    }
    ensureDirSync(IIIF_CACHE_MANIFESTS_DIR);
    const dest = path.join(IIIF_CACHE_MANIFESTS_DIR, slug + '.json');
    await fsp.writeFile(dest, JSON.stringify(manifest, null, 2), 'utf8');
    index.byId = index.byId || {};
    index.byId[id] = slug;
    await saveManifestIndex(index);
  } catch (_) {}
}

async function flushManifestCache() {
  try { await fsp.rm(IIIF_CACHE_MANIFESTS_DIR, { recursive: true, force: true }); } catch (_) {}
  ensureDirSync(IIIF_CACHE_MANIFESTS_DIR);
}

async function loadConfig() {
  let CONFIG = {
    collection: { uri: 'https://iiif.io/api/cookbook/recipe/0032-collection/collection.json' },
  };
  const overrideConfigPath = process.env.CANOPY_CONFIG;
  const configPath = path.resolve(overrideConfigPath || 'canopy.yml');
  if (fs.existsSync(configPath)) {
    try {
      const raw = await fsp.readFile(configPath, 'utf8');
      const data = yaml.load(raw) || {};
      CONFIG = {
        collection: {
          uri: (data.collection && data.collection.uri) || CONFIG.collection.uri,
        },
      };
      console.log('Loaded config from', overrideConfigPath ? overrideConfigPath : 'canopy.yml');
    } catch (e) {
      console.warn('Failed to read', overrideConfigPath ? overrideConfigPath : 'canopy.yml', e.message);
    }
  }
  if (process.env.CANOPY_COLLECTION_URI) {
    CONFIG.collection.uri = String(process.env.CANOPY_COLLECTION_URI);
    console.log('Using collection URI from CANOPY_COLLECTION_URI');
  }
  return CONFIG;
}

async function buildIiifCollectionPages(CONFIG, Layout) {
  const worksDir = path.join(CONTENT_DIR, 'works');
  const worksLayoutPath = path.join(worksDir, '_layout.mdx');
  if (!fs.existsSync(worksLayoutPath)) {
    console.log('IIIF: No content/works/_layout.mdx found; skipping IIIF page build.');
    return { searchRecords: [] };
  }
  ensureDirSync(IIIF_CACHE_MANIFESTS_DIR);
  const collectionUri = (CONFIG && CONFIG.collection && CONFIG.collection.uri) || null;
  let collection = null;
  if (collectionUri) collection = await readJsonFromUri(collectionUri);
  if (!collection) {
    console.warn('IIIF: No collection available; skipping.');
    return { searchRecords: [] };
  }
  collection = await normalizeToV3(collection);
  const index = await loadManifestIndex();
  const currentSig = { uri: String(collectionUri || ''), hash: computeHash(collection) };
  const prev = (index && index.collection) || null;
  const changed = !prev || prev.uri !== currentSig.uri;
  if (changed) {
    console.log('IIIF: Source collection signature changed; flushing manifest cache.');
    await flushManifestCache();
    index.byId = {};
  }
  index.collection = { ...currentSig, updatedAt: new Date().toISOString() };
  await saveManifestIndex(index);

  const WorksLayout = await mdx.compileMdxToComponent(worksLayoutPath);
  const SiteLayout = Layout;
  const items = Array.isArray(collection.items) ? collection.items : [];
  const searchRecords = [];
  for (const it of items) {
    if (!it) continue;
    const id = it.id || it['@id'] || '';
    let manifest = await loadCachedManifestById(id);
    if (!manifest && /^https?:\/\//i.test(String(id || ''))) {
      const remote = await readJsonFromUri(String(id));
      if (remote) {
        const norm = await normalizeToV3(remote);
        manifest = norm;
        await saveCachedManifest(manifest, String(id));
      }
    }
    if (!manifest) {
      console.warn('IIIF: Could not resolve manifest for item id:', id);
      continue;
    }
    manifest = await normalizeToV3(manifest);
    const title = firstLabelString(manifest.label);
    const slug = slugify(title || 'untitled', { lower: true, strict: true, trim: true });
    const href = path.join('works', slug + '.html');
    const outPath = path.join(OUT_DIR, href);
    ensureDirSync(path.dirname(outPath));
    try {
      const components = {}; // WorksLayout does not need MDXProvider wrapping here
      const content = React.createElement(WorksLayout, { manifest });
      const page = React.createElement(SiteLayout, {}, content);
      const body = ReactDOMServer.renderToStaticMarkup(page);
      const cssRel = path.relative(path.dirname(outPath), path.join(OUT_DIR, 'styles.css')).split(path.sep).join('/');
      const needsHydrate = body.includes('data-canopy-hydrate') || body.includes('data-canopy-viewer');
      const jsRel = needsHydrate
        ? path.relative(path.dirname(outPath), path.join(OUT_DIR, 'canopy-viewer.js')).split(path.sep).join('/')
        : null;
      const html = htmlShell({ title, body, cssHref: cssRel || 'styles.css', scriptHref: jsRel });
      await fsp.writeFile(outPath, html, 'utf8');
      console.log('IIIF: Built', path.relative(process.cwd(), outPath));
      searchRecords.push({ id: String(manifest.id || id), title, href: href.split(path.sep).join('/') });
    } catch (e) {
      console.warn('IIIF: Failed to render page for manifest', id || '<unknown>', e.message);
    }
  }
  return { searchRecords };
}

module.exports = {
  buildIiifCollectionPages,
  loadConfig,
};

