// src/iiif/Viewer.jsx
import React from "react";
function Viewer({ iiifContent }) {
  const content = typeof iiifContent === "string" ? iiifContent : "";
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "canopy--viewer",
      "data-canopy-viewer": true,
      "data-iiif-content": content
    }
  );
}

// src/Fallback.jsx
import React2 from "react";
function Fallback({ name, ...props }) {
  const style = {
    padding: "0.75rem 1rem",
    border: "1px dashed #d1d5db",
    color: "#6b7280",
    borderRadius: 6,
    background: "#f9fafb",
    fontSize: 14
  };
  return /* @__PURE__ */ React2.createElement("div", { style, "data-fallback-component": name || "Unknown" }, /* @__PURE__ */ React2.createElement("strong", null, name || "Unknown component"), " not available in UI.");
}
export {
  Fallback,
  Viewer
};
//# sourceMappingURL=index.js.map
