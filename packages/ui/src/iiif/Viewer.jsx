import React from "react";
import Hydrate from "../Hydrate.jsx";

// Declare client-only rendering for the Clover Viewer.
export default function Viewer(props) {
  // Hydrate the actual Clover React component in the browser.
  // Using a distinct component name avoids recursive hydration of this wrapper.
  return <Hydrate component="CloverViewer" {...props} />;
}
