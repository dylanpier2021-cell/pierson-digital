"use client";
// Renders children only after mount. The ported pages compute layout from
// window.innerWidth during render (the original was a client-only SPA), so we
// keep that behavior and skip server rendering for the page body — while still
// letting each route's server page export real SEO metadata.
import { useState, useEffect } from "react";

export default function ClientOnly({ children }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted ? children : null;
}
