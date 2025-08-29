const fs = require('fs');
const fsp = fs.promises;
const path = require('path');

const CONTENT_DIR = path.resolve('content');
const OUT_DIR = path.resolve('site');
const CACHE_DIR = path.resolve('.cache/mdx');
const ASSETS_DIR = path.resolve('assets');

function ensureDirSync(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

async function cleanDir(dir) {
  if (fs.existsSync(dir)) {
    await fsp.rm(dir, { recursive: true, force: true });
  }
  await fsp.mkdir(dir, { recursive: true });
}

function htmlShell({ title, body, cssHref, scriptHref }) {
  const scriptTag = scriptHref ? `<script defer src="${scriptHref}"></script>` : '';
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><title>${title}</title><link rel="stylesheet" href="${cssHref}">${scriptTag}</head><body>${body}</body></html>`;
}

module.exports = {
  fs,
  fsp,
  path,
  CONTENT_DIR,
  OUT_DIR,
  CACHE_DIR,
  ASSETS_DIR,
  ensureDirSync,
  cleanDir,
  htmlShell,
};

