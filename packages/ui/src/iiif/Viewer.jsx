import React from "react";

// Server: emit a placeholder div with data attributes.
// Client: our site runtime hydrates this to a React Clover Viewer.
export default function Viewer({ iiifContent }) {
  const content = typeof iiifContent === "string" ? iiifContent : "";
  return (
    <div
      className="canopy--viewer"
      data-canopy-viewer
      data-iiif-content={content}
    />
  );
}
