@canopy-iiif/lib
=================

Build and dev utilities for the Canopy IIIF static site generator. This package provides the Node APIs that:

- Compile MDX content and directory layouts to HTML
- Fetch and cache IIIF collections/manifests and generate work pages
- Generate the search index and runtime assets

Install
-------

This package is intended to be used in a workspace app.

Usage
-----

const canopy = require('@canopy-iiif/lib');

// Build content from ./content into ./site
await canopy.build();

// Development server with watch and live reload
await canopy.dev();

Files
-----

This package publishes only its CommonJS sources (\*.js), configuration (\*.json), and small CSS used by the dev server.

License
-------

MIT

