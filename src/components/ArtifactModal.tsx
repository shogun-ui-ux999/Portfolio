import { useEffect, useRef } from "react";
import type { Artifact } from "../data/artifacts";

export interface TourInfo {
  /** 1-based index of the current stop */
  step: number;
  total: number;
  onSkip: () => void;
}

interface ArtifactModalProps {
  artifact: Artifact | null;
  onClose: () => void;
  /** Present while the 30-Second Quick Tour is driving the modal */
  tour?: TourInfo | null;
}

/**
 * OVERLAY 1 — THE ARTIFACT MODAL
 * A high-end museum plaque: brushed-brass frame, engraved
 * exhibit number, serif title, and the artifact's story and
 * lesson. Closes on button, backdrop click, or Escape.
 */
export default function ArtifactModal({
  artifact,
  onClose,
  tour = null,
}: ArtifactModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  // Escape closes; while the tour is running Escape means "skip".
  useEffect(() => {
    if (!artifact) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (tour) tour.onSkip();
        else onClose();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [artifact, onClose, tour]);

  // Lock page scroll and move focus into the dialog while open.
  useEffect(() => {
    if (!artifact) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [artifact]);

  if (!artifact) return null;

  const isTour = Boolean(tour);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-night-950/80 p-4 backdrop-blur-sm sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      data-testid="modal-backdrop"
    >
      {/* Brass frame → dark plaque face */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="artifact-modal-title"
        className="relative w-full max-w-2xl rounded-xl p-[3px] shadow-plaque"
        style={{
          background:
            "linear-gradient(150deg, #f0c878 0%, #c9822a 30%, #7c5a22 55%, #d9b45b 100%)",
        }}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="max-h-[85vh] overflow-y-auto rounded-[10px] bg-night-900 p-7 sm:p-10">
          {/* Plaque header */}
          <div className="flex items-start justify-between gap-4">
            <p className="museum-eyebrow">{artifact.exhibitNumber}</p>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close artifact plaque"
              className="-mt-1 -mr-1 rounded-full border border-paper-400/25 p-2 text-paper-300 transition-colors hover:border-amber-lamp/60 hover:text-amber-glow"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <h2
            id="artifact-modal-title"
            className="mt-3 font-serif text-3xl font-semibold leading-tight text-paper-50 sm:text-4xl"
          >
            {artifact.title}
          </h2>
          <p className="mt-2 text-sm italic text-paper-300">
            {artifact.objectName}
          </p>

          <div className="gold-rule mt-6 mx-0" aria-hidden />

          {/* Story */}
          <p className="mt-6 museum-eyebrow">The Story</p>
          <p className="mt-3 leading-relaxed text-paper-200">
            {artifact.story}
          </p>

          {/* Lesson — engraved takeaway */}
          <div className="mt-8 rounded-lg border border-amber-lamp/30 bg-amber-lamp/5 p-5">
            <p className="museum-eyebrow">The Lesson</p>
            <p className="mt-2 font-serif text-lg italic leading-snug text-amber-glow">
              {artifact.lesson}
            </p>
          </div>

          {/* Evidence links */}
          {artifact.evidenceLinks.length > 0 && (
            <div className="mt-8">
              <p className="museum-eyebrow">Evidence</p>
              <ul className="mt-3 flex flex-wrap gap-3">
                {artifact.evidenceLinks.map((link) => (
                  <li key={link.url}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-md border border-screen-400/40 bg-screen-500/10 px-4 py-2 text-sm font-medium text-screen-300 transition-colors hover:border-screen-300 hover:bg-screen-500/20"
                    >
                      {link.label}
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 17L17 7M9 7h8v8" />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Footer: tour controls or simple close */}
          <div className="mt-10 flex flex-col items-center gap-4 border-t border-paper-400/10 pt-6 sm:flex-row sm:justify-between">
            {isTour && tour ? (
              <>
                <div className="flex items-center gap-2" aria-label={`Tour stop ${tour.step} of ${tour.total}`}>
                  {Array.from({ length: tour.total }, (_, index) => (
                    <span
                      key={index}
                      aria-hidden
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        index + 1 === tour.step
                          ? "w-6 bg-amber-lamp"
                          : "w-1.5 bg-paper-400/40"
                      }`}
                    />
                  ))}
                  <span className="ml-2 font-type text-[0.6rem] uppercase tracking-[0.25em] text-paper-300">
                    Quick Tour — {tour.step}/{tour.total}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={tour.onSkip}
                  className="btn-ghost !px-5 !py-2 text-xs"
                >
                  Skip Tour
                </button>
              </>
            ) : (
              <button type="button" onClick={onClose} className="btn-ghost !px-5 !py-2 text-xs">
                Close
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
