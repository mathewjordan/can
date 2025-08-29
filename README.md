# Canopy IIIF App

[![Deploy to GitHub Pages](https://github.com/mathewjordan/can/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/mathewjordan/can/actions/workflows/deploy-pages.yml)

Static site generator powered by MDX and IIIF. Use `@canopy-iiif/lib` to build content from `content/` and generate HTML in `site/`.

## Quick Start
- Install: `npm install`
- Develop: `npm run dev` (serves `http://localhost:3000`)
- Build: `npm run build`

## Content Tree
```
content/
  _layout.mdx          # optional: site-wide layout wrapper
  _styles.css          # optional: site-wide CSS copied to site/styles.css
  index.mdx            # homepage → site/index.html
  sitemap.mdx          # sitemap page (receives props.pages) → site/sitemap.html
  docs/
    getting-started.mdx
    guide.mdx
  works/
    _layout.mdx        # layout for IIIF manifests (receives props.manifest)
```

Build output goes to `site/`. Development cache lives in `.cache/`:
- `.cache/mdx`: transient compiled MDX modules
- `.cache/iiif`: cached IIIF `collection.json`, `manifest-index.json`, and `manifests/{slug}.json`

## Search Page (MDX Composition)

Compose the search UI with MDX at `content/search/_layout.mdx`. The builder injects a `search` prop so you can place the primitives anywhere:

- `props.search.form`: search input (`<input id="search-input" />`).
- `props.search.results`: results container (`<ul id="search-results"></ul>`).
- `props.search.count`: live count of shown results (`<span id="search-count"></span>`).
- `props.search.summary`: live summary text (`<div id="search-summary"></div>`), e.g., “Found X of N for “query””.

Example:

```
# Search

<div className="search-grid">
  <aside>
    <strong>Results:</strong> {props.search.count}
    <div>{props.search.summary}</div>
  </aside>
  <section>
    {props.search.form}
    {props.search.results}
  </section>
</div>
```

Notes:
- If `content/search/_layout.mdx` is absent, a minimal fallback page is generated.
- Client behavior is provided by `site/search.js`, which wires the input and updates count/summary.
- Type filters and grouping:
  - The search runtime auto-discovers record types in `search-index.json` (e.g., `page`, `work`, `docs`) and renders type checkboxes into `#search-filters`.
  - Results are grouped by type inside `#search-results`. To control placement, add per-type lists with IDs `search-results-<type>` (e.g., `search-results-docs`), otherwise grouped sections are generated automatically.

## Deploy to GitHub Pages
- Workflow: `.github/workflows/deploy-pages.yml` builds `site/` and deploys to Pages.
- Enable Pages: in repository Settings → Pages → set Source to "GitHub Actions" (or use the workflow’s automatic enablement if allowed).
- Trigger: pushes to `main` (or run manually via Actions → "Deploy to GitHub Pages").
- Output: the workflow uploads the `site/` folder as the Pages artifact and deploys it.
- Live site URL:

<!-- PAGES_URL_START -->
Live: https://mathewjordan.github.io/can/
<!-- PAGES_URL_END -->
- CI tuning (optional):
  - `canopy.yml` → `iiif.chunkSize`, `iiif.concurrency` to control fetch/build parallelism.
  - Env overrides (in workflow): `CANOPY_CHUNK_SIZE`, `CANOPY_FETCH_CONCURRENCY`, and `CANOPY_COLLECTION_URI` (use a small collection for faster CI).
- Project Pages base path: links currently use absolute `/…`. If deploying under `/<repo>` you may want base‑path aware links; open an issue if you want this wired in.

## Contributing
See `CONTRIBUTING.md` for repository structure, versioning with Changesets, release flow, and the template-branch workflow.
