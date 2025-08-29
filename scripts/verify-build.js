'use strict';

const fs = require('fs');
const path = require('path');

const OUT_DIR = path.resolve('site');

function findHtmlFiles(dir) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...findHtmlFiles(p));
    else if (e.isFile() && p.toLowerCase().endsWith('.html')) out.push(p);
  }
  return out;
}

function main() {
  const pages = findHtmlFiles(OUT_DIR);
  if (!pages.length) {
    console.error("CI check failed: no HTML pages generated in 'site'.");
    console.error('Expected at least one HTML file from content MDX.');
    process.exit(1);
  }
  console.log(`CI check: found ${pages.length} HTML page(s) in site.`);
}

if (require.main === module) {
  main();
}

