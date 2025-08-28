import React from 'react';

// Marks a client-only component to be hydrated in the browser.
// Usage in MDX: <Hydrate component="Viewer" iiifContent="..." />
export default function Hydrate({ component, ...props }) {
  const payload = encodeURIComponent(JSON.stringify(props || {}));
  return (
    <div
      data-canopy-hydrate
      data-component={component}
      data-props={payload}
    />
  );
}

