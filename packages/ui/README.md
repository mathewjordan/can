@canopy-iiif/ui
================

Small React components used by Canopy MDX pages, including a client-only Viewer wrapper for Clover.

Install
-------

npm install @canopy-iiif/ui

Peer dependencies: react >=18.

Usage
-----

import { Viewer } from '@canopy-iiif/ui';

export default function Page() {
  return <Viewer iiifContent="https://example.org/iiif/manifest" />;
}

Build
-----

The package publishes prebuilt files under `dist/`. A `prepublishOnly` script ensures `dist/` is built during publish.

License
-------

MIT

