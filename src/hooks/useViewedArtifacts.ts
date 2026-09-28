import { useCallback, useState } from "react";

/**
 * Tracks which artifacts the visitor has opened. One-way: once
 * viewed, always viewed (a museum stamp in your passport).
 */
export function useViewedArtifacts() {
  const [viewed, setViewed] = useState<ReadonlySet<string>>(new Set());

  const markViewed = useCallback((id: string) => {
    setViewed((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);

  return { viewed, markViewed };
}
