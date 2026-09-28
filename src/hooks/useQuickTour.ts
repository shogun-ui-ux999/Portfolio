import { useCallback, useEffect, useRef, useState } from "react";
import { getArtifactById, quickTourIds } from "../data/artifacts";
import type { Artifact } from "../data/artifacts";

export type TourState = "idle" | "running";

/** How long each tour stop stays open (ms). */
const STOP_DURATION_MS = 6000; // 3 stops × ~6s ≈ a 30-second tour

/**
 * Drives the 30-Second Quick Tour: opens the modal for each
 * artifact in `quickTourIds` in sequence, auto-advancing until
 * the tour finishes or the visitor skips it.
 */
export function useQuickTour(onVisit: (artifact: Artifact) => void) {
  const [tourState, setTourState] = useState<TourState>("idle");
  const [activeArtifact, setActiveArtifact] = useState<Artifact | null>(null);
  const timerRef = useRef<number | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const stopTour = useCallback(() => {
    clearTimer();
    setTourState("idle");
    setActiveArtifact(null);
  }, [clearTimer]);

  const startTour = useCallback(() => {
    clearTimer();
    setTourState("running");

    let step = 0;
    const advance = () => {
      if (step >= quickTourIds.length) {
        setTourState("idle");
        setActiveArtifact(null);
        return;
      }
      const artifact = getArtifactById(quickTourIds[step]);
      step += 1;
      if (!artifact) {
        advance();
        return;
      }
      setActiveArtifact(artifact);
      onVisit(artifact);
      timerRef.current = window.setTimeout(advance, STOP_DURATION_MS);
    };
    advance();
  }, [clearTimer, onVisit]);

  // Always clean up the pending timer on unmount.
  useEffect(() => clearTimer, [clearTimer]);

  return { tourState, activeArtifact, startTour, stopTour };
}
