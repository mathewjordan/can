# Canopy IIIF App

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

## Contributing
See `CONTRIBUTING.md` for repository structure, versioning with Changesets, release flow, and the template-branch workflow.
