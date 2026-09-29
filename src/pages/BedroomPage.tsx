import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { bedroomArtifacts } from "../data/artifacts";
import { hotspotArtifacts } from "../data/hotspots";
import { useViewedArtifacts } from "../hooks/useViewedArtifacts";
import { useQuickTour } from "../hooks/useQuickTour";
import { useDiscoveredSecrets } from "../hooks/useDiscoveredSecrets";
import ArtifactHotspot from "../components/ArtifactHotspot";
import ArtifactModal from "../components/ArtifactModal";
import ListViewPanel from "../components/ListViewPanel";
import type { Artifact } from "../data/artifacts";

/**
 * PAGE 2 — THE BEDROOM
 * The main interactive space: a late-night bedroom scene with
 * nine artifact hotspots, a progress tracker, a secret latch,
 * the Master Catalog list view, and the manual Quick Tour.
 */
export default function BedroomPage() {
  const { viewed, markViewed } = useViewedArtifacts();
  const [modalArtifact, setModalArtifact] = useState<Artifact | null>(null);
  const [listViewOpen, setListViewOpen] = useState(false);
  const [hoveredSecretId, setHoveredSecretId] = useState<string | null>(null);
  const [toastVisible, setToastVisible] = useState(false);
  const { secretsUnlocked } = useDiscoveredSecrets(viewed);

  const openArtifact = useCallback(
    (artifact: Artifact) => {
      markViewed(artifact.id);
      setModalArtifact(artifact);
      setListViewOpen(false);
      setHoveredSecretId(null);
    },
    [markViewed]
  );

  const {
    tourState,
    activeArtifact: tourArtifact,
    step: tourStep,
    total: tourTotal,
    startTour,
    stopTour,
    nextStop,
    previousStop,
  } = useQuickTour(openArtifact);

  // The tour's modal wins while it is running.
  const effectiveArtifact =
    tourState === "running" ? tourArtifact : modalArtifact;
  const isTour = tourState === "running" && tourArtifact !== null;

  // Ending the tour (skip, finish, or close) shuts its plaque too.
  const endTour = useCallback(() => {
    stopTour();
    setModalArtifact(null);
  }, [stopTour]);

  // Toast fires once, after both private items have been seen.
  const toastShownRef = useRef(false);
  useEffect(() => {
    if (secretsUnlocked && !toastShownRef.current) {
      const secretCount = bedroomArtifacts.filter(
        (a) => a.isSecret && viewed.has(a.id)
      ).length;
      if (secretCount === 2) {
        toastShownRef.current = true;
        setToastVisible(true);
        const timer = window.setTimeout(() => setToastVisible(false), 6000);
        return () => window.clearTimeout(timer);
      }
    }
  }, [secretsUnlocked, viewed]);

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

  // Open the Master Catalog when arriving via #catalog (Entrance's
  // "View Artifact List"). Same StrictMode-safe ref guard.
  const catalogLaunchRef = useRef(false);
  useEffect(() => {
    if (location.hash === "#catalog" && !catalogLaunchRef.current) {
      catalogLaunchRef.current = true;
      setListViewOpen(true);
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, [location.hash]);

  const viewedCount = useMemo(
    () => bedroomArtifacts.filter((a) => viewed.has(a.id)).length,
    [viewed]
  );
  const total = bedroomArtifacts.length;
  const allViewed = viewedCount === total;

  const navigate = useNavigate();

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
            read their plaques — or browse the{" "}
            <button
              type="button"
              onClick={() => setListViewOpen(true)}
              className="underline decoration-amber-lamp/50 underline-offset-4 transition-colors hover:text-amber-glow"
            >
              Master Catalog
            </button>
            .
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

        {/* Artifact hotspots — secrets stay hidden until the latch opens */}
        {hotspotArtifacts.map(({ artifact, hotspot }) => {
          if (artifact.isSecret && !secretsUnlocked) return null;

          const isSecret = artifact.isSecret;
          const secretNotViewed = isSecret && !viewed.has(artifact.id);

          return (
            <ArtifactHotspot
              key={artifact.id}
              artifact={artifact}
              hotspot={hotspot}
              viewed={viewed.has(artifact.id)}
              hint={
                artifact.id === "drawer-letter"
                  ? "Something old is hidden here."
                  : "A quiet sacrifice."
              }
              showHint={secretNotViewed && hoveredSecretId === artifact.id}
              badge={
                isSecret && viewed.has(artifact.id)
                  ? "Curator’s Private Item"
                  : undefined
              }
              onOpen={openArtifact}
              onMouseEnter={
                secretNotViewed
                  ? () => setHoveredSecretId(artifact.id)
                  : undefined
              }
              onMouseLeave={
                secretNotViewed ? () => setHoveredSecretId(null) : undefined
              }
            />
          );
        })}

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
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={startTour}
            className="btn-ghost !px-5 !py-2 text-xs"
          >
            Replay the 30-Second Tour
          </button>
          {/* List view for accessibility / keyboard users */}
          <button
            type="button"
            onClick={() => setListViewOpen(true)}
            className="btn-ghost !px-5 !py-2 text-xs"
          >
            Prefer a list view?
          </button>
        </div>
      </div>

      {/* Artifact Modal (shared by hotspots, catalog, and tour) */}
      <ArtifactModal
        artifact={effectiveArtifact}
        onClose={() => {
          if (isTour) endTour();
          else setModalArtifact(null);
        }}
        tour={
          isTour && tourArtifact
            ? {
                step: tourStep,
                total: tourTotal,
                onBack: previousStop,
                onNext: nextStop,
                onSkip: endTour,
              }
            : null
        }
      />

      {/* Master Catalog list view */}
      {listViewOpen && (
        <ListViewPanel
          onSelectArtifact={openArtifact}
          onClose={() => setListViewOpen(false)}
        />
      )}

      {/* Secret-discovery toast */}
      <div
        aria-live="polite"
        className={`pointer-events-none fixed bottom-6 left-1/2 z-[120] w-max max-w-[92vw] -translate-x-1/2 rounded-lg border border-gold-400/50 bg-night-950/95 px-5 py-3 text-center shadow-plaque transition-all duration-500 ${
          toastVisible
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-3 opacity-0"
        }`}
        data-testid="secret-toast"
      >
        <p className="font-hand text-lg leading-snug text-gold-400">
          You found the private collection. The curator appreciates curiosity.
        </p>
      </div>

      {/* Quick Tour finished screen */}
      {tourState === "finished" && (
        <div
          className="fixed inset-0 z-[130] flex items-center justify-center bg-night-950/90 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="tour-finished-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) endTour();
          }}
        >
          <div className="museum-card w-full max-w-lg p-8 text-center sm:p-10">
            <p className="museum-eyebrow">Tour Complete</p>
            <h2
              id="tour-finished-title"
              className="mt-3 font-serif text-3xl font-semibold text-paper-50"
            >
              That was the lightning version.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-paper-300/90">
              The room has far more to show you — including a drawer most
              visitors walk right past.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={endTour}
                className="btn-lamp"
              >
                Explore the Bedroom
              </button>
              <Link to="/failures" className="btn-ghost">
                Visit the Museum of Failures
              </Link>
            </div>
            <button
              type="button"
              onClick={() => {
                endTour();
                navigate("/");
              }}
              className="mt-6 text-xs text-paper-400 underline underline-offset-4 transition-colors hover:text-amber-glow"
            >
              Back to the Entrance
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
