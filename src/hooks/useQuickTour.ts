import { useCallback, useEffect, useState } from "react";
import { getArtifactById, quickTourIds } from "../data/artifacts";
import type { Artifact } from "../data/artifacts";

export type TourState = "idle" | "running" | "finished";

/**
 * Drives the 30-Second Quick Tour: walks the visitor through
 * three stops at their own pace — Next / Back buttons, Skip at
 * any time, and two closing paths when the tour ends.
 */
export function useQuickTour(onVisit: (artifact: Artifact) => void) {
  const [tourState, setTourState] = useState<TourState>("idle");
  const [activeArtifact, setActiveArtifact] = useState<Artifact | null>(null);

  const stopTour = useCallback(() => {
    setTourState("idle");
    setActiveArtifact(null);
  }, []);

  const startTour = useCallback(() => {
    const first = getArtifactById(quickTourIds[0]);
    setTourState("running");
    setActiveArtifact(first ?? null);
    if (first) onVisit(first);
  }, [onVisit]);

  const goToStop = useCallback(
    (index: number) => {
      if (index < 0 || index >= quickTourIds.length) {
        // Walking past either end finishes the tour.
        setTourState("finished");
        setActiveArtifact(null);
        return;
      }
      const artifact = getArtifactById(quickTourIds[index]);
      if (!artifact) return;
      setTourState("running");
      setActiveArtifact(artifact);
      onVisit(artifact);
    },
    [onVisit]
  );

  const step = quickTourIds.indexOf(
    (activeArtifact?.id ?? "") as (typeof quickTourIds)[number]
  );

  const nextStop = useCallback(
    () => goToStop(step + 1),
    [goToStop, step]
  );
  const previousStop = useCallback(() => {
    // "Back" on the very first stop does nothing.
    if (step > 0) goToStop(step - 1);
  }, [goToStop, step]);

  // Escape during the tour skips it (handled in ArtifactModal too).
  useEffect(() => {
    if (tourState !== "running") return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") nextStop();
      if (event.key === "ArrowLeft") previousStop();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [tourState, nextStop, previousStop]);

  return {
    tourState,
    activeArtifact,
    step,
    total: quickTourIds.length,
    startTour,
    stopTour,
    nextStop,
    previousStop,
  };
}
