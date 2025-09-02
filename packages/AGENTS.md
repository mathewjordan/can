Workspace Agent Notes
=====================

Helpers
-------

- Keep all repository helper scripts in `packages/helpers/` (not in a root `scripts/` folder).
- Common tasks:
  - Release guard: `node packages/helpers/guard-publish.js`
  - Build verification: `node packages/helpers/verify-build.js`

Publishing
----------

- Only `@canopy-iiif/lib` and `@canopy-iiif/ui` are publishable. All other workspace packages remain `private: true`.
- `@canopy-iiif/ui` builds its `dist/` via `prepublishOnly`.

IIIF Build
----------

- Enable by adding `content/works/_layout.mdx`. This layout receives `props.manifest` (normalized to IIIF Presentation 3 if possible).
- Configure the collection URI in `canopy.yml` (`collection.uri`) or via `CANOPY_COLLECTION_URI`.
- Outputs work pages at `site/works/<slug>.html`.
- Tune performance with `iiif.chunkSize` and `iiif.concurrency` (or env `CANOPY_CHUNK_SIZE`, `CANOPY_FETCH_CONCURRENCY`).

IIIF Cache
----------

- `.cache/iiif/index.json`: tracks `byId` (ids→slugs/parents) and `collection` meta.
- `.cache/iiif/manifests/{slug}.json`: cached normalized Manifests.
- Changing the collection URI resets the cache; delete `.cache/iiif/` to force refetch.

Assets and Live Reload
----------------------

- Files in the repository `assets/` directory are mirrored into `site/` (subpaths preserved) by the build.
- The dev server watches `assets/` and copies only changed files to `site/` without a full rebuild; a live reload is triggered.

Dev Quick Notes
---------------

- `npm run dev` serves `http://localhost:3000` with live reload.
- MDX edits rebuild the site; asset edits sync directly to `site/`.
