import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Scrolls to the top on every route change.
// If the URL has a #hash, it scrolls to that element instead.
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView();
        return;
      }
    }
    // "instant" avoids a slow animated scroll if html has scroll-behavior: smooth
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, hash]);

  return null;
}