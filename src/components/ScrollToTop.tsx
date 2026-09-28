import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scrolls to top on route change so navigating between wings
 * feels like stepping into a new gallery room — but not when
 * the URL only carries a hash launch like /bedroom#tour.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
}
