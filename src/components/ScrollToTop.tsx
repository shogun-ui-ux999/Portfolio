import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scrolls to top on every route change, so navigating between
 * wings feels like stepping into a new gallery room.
 */
export function useScrollToTopOnRouteChange() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
}

export default function ScrollToTop() {
  useScrollToTopOnRouteChange();
  return null;
}
