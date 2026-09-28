import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { bedroomArtifacts, quickTourIds } from "../data/artifacts";
import { hotspotArtifacts } from "../data/hotspots";
import { useViewedArtifacts } from "../hooks/useViewedArtifacts";
import { useQuickTour } from "../hooks/useQuickTour";
import ArtifactHotspot from "../components/ArtifactHotspot";
import ArtifactModal from "../components/ArtifactModal";
import type { Artifact } from "../data/artifacts";

/**
 * PAGE 2 — THE BEDROOM
 * The main interactive space: a late-night bedroom scene with
 * nine clickable artifact hotspots, a live progress tracker,
 * and ambient lamp light. Hosts the 30-Second Quick Tour,
 * which can also be launched from the Entrance via #tour.
 */
export default function BedroomPage() {
  const { viewed, markViewed } = useViewedArtifacts();
  const [modalArtifact, setModalArtifact] = useState<Artifact | null>(null);

  const openArtifact = useCallback(
    (artifact: Artifact) => {
      markViewed(artifact.id);
      setModalArtifact(artifact);
    },
    [markViewed]
  );

  const {
    tourState,
    activeArtifact: tourArtifact,
    startTour,
    stopTour,
  } = useQuickTour(openArtifact);

  // The tour's modal wins when it is running.
  const effectiveArtifact = tourState === "running" ? tourArtifact : modalArtifact;
  const isTour = tourState === "running" && tourArtifact !== null;

  // Launch the tour when arriving via the Entrance's #tour hash.
  // A ref guard keeps StrictMode's double-invoked effects from
  // starting the tour twice.
  const location = useLocation();
  const tourLaunchRef = useRef(false);
  useEffect(() => {
    if (location.hash === "#tour" && !tourLaunchRef.current) {
      tourLaunchRef.current = true;
      startTour();
    }
  }, [location.hash, startTour]);

  // Clean the #tour hash off the URL once consumed.
  useEffect(() => {
    if (tourLaunchRef.current && window.location.hash === "#tour") {
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, [location.hash]);

  const viewedCount = useMemo(
    () => bedroomArtifacts.filter((a) => viewed.has(a.id)).length,
    [viewed]
  );
  const total = bedroomArtifacts.length;
  const allViewed = viewedCount === total;

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
      {/* Header + progress tracker */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="museum-eyebrow">Gallery One — Interactive</p>
          <h1 className="mt-3 font-serif text-4xl font-semibold text-paper-50 sm:text-5xl">
            The Bedroom
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-paper-300/85">
            Nine objects, each with a story. Click the glowing hotspots to
            read their plaques — or wander the room at your own pace.
          </p>
        </div>

        <div className="flex flex-col items-start gap-2 sm:items-end">
          <p
            className="rounded-full border border-amber-lamp/30 bg-night-850/80 px-5 py-2 font-type text-xs uppercase tracking-[0.25em] text-amber-glow"
            data-testid="progress-tracker"
          >
            Artifacts viewed: {viewedCount} / {total}
          </p>
          {/* Tiny progress bar */}
          <div className="h-1 w-44 overflow-hidden rounded-full bg-night-700">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-ember to-amber-glow transition-all duration-700"
              style={{ width: `${(viewedCount / total) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="gold-rule mt-8 mx-0" aria-hidden />

      {/* ===================== THE SCENE ===================== */}
      <div
        className="group/scene relative mt-8 w-full overflow-hidden rounded-xl border border-paper-400/15 shadow-plaque"
        style={{ aspectRatio: "16 / 10" }}
        data-testid="bedroom-scene"
      >
        {/* Background image (SVG stays crisp at any size) */}
        <img
          src="/assets/bedroom-background.svg"
          alt="A messy bedroom at night, lit by a desk lamp: desk with laptop, bed, bookshelf, and window"
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />

        {/* Ambient late-night lighting overlays */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 animate-flicker"
          style={{
            background:
              "radial-gradient(60% 50% at 72% 18%, rgba(245,195,107,0.18), transparent 70%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(14,10,7,0.25) 0%, transparent 30%, transparent 65%, rgba(14,10,7,0.45) 100%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 shadow-[inset_0_0_140px_rgba(14,10,7,0.9)]"
        />

        {/* Artifact hotspots */}
        {hotspotArtifacts.map(({ artifact, hotspot }) => (
          <ArtifactHotspot
            key={artifact.id}
            artifact={artifact}
            hotspot={hotspot}
            viewed={viewed.has(artifact.id)}
            onOpen={openArtifact}
          />
        ))}

        {/* Completion stamp */}
        {allViewed && (
          <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-gold-400/50 bg-night-950/90 px-5 py-2 text-center backdrop-blur-sm">
            <p className="font-hand text-xl leading-none text-gold-400">
              Full collection viewed — the curator is impressed.
            </p>
          </div>
        )}

        {/* Mobile hint: tap targets are small on phones */}
        <p className="pointer-events-none absolute left-3 top-3 rounded-md bg-night-950/70 px-3 py-1.5 font-type text-[0.55rem] uppercase tracking-[0.25em] text-paper-300/80 sm:hidden">
          Tap the glowing points
        </p>
      </div>

      {/* Caption row under the scene */}
      <div className="mt-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <p className="font-type text-[0.6rem] uppercase tracking-[0.3em] text-paper-400/70">
          Lighting: desk lamp, 1:12 AM — Best experienced with sound off
        </p>
        <button
          type="button"
          onClick={startTour}
          className="btn-ghost !px-5 !py-2 text-xs"
        >
          Replay the 30-Second Tour
        </button>
      </div>

      {/* Artifact Modal (shared by hotspots and the quick tour) */}
      <ArtifactModal
        artifact={effectiveArtifact}
        onClose={() => {
          if (isTour) stopTour();
          setModalArtifact(null);
        }}
        tour={
          isTour && tourArtifact
            ? {
                step: quickTourStep(tourArtifact.id),
                total: quickTourIds.length,
                onSkip: stopTour,
              }
            : null
        }
      />
    </div>
  );
}

/** 1-based position of an artifact in the quick tour sequence. */
function quickTourStep(artifactId: string): number {
  const index = quickTourIds.indexOf(artifactId as (typeof quickTourIds)[number]);
  return index + 1;
}
