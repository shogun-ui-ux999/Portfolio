import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMuseum } from "../context/MuseumContext";
import { getArtifact, quickTour } from "../data/artifacts";
import ArtifactGlyph from "./ArtifactGlyph";

/** The 30-second guided tour: exactly three stops. */
export default function QuickTour() {
  const { tourOpen, closeTour, openArtifact } = useMuseum();
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  // Reset to the first stop each time the tour opens
  useEffect(() => {
    if (tourOpen) setStep(0);
  }, [tourOpen]);

  useEffect(() => {
    if (!tourOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeTour();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [tourOpen, closeTour]);

  if (!tourOpen) return null;

  const tourArtifact = getArtifact(quickTour[step].artifactId);
  if (!tourArtifact) return null;
  const isLast = step === quickTour.length - 1;

  const goNext = () => {
    if (!isLast) setStep((s) => s + 1);
  };
  const goBack = () => setStep((s) => Math.max(0, s - 1));

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="30-second guided tour"
      className="animate-fade-in fixed inset-0 z-[85] flex items-center justify-center overflow-y-auto bg-night-950/90 p-4 backdrop-blur-sm"
      onClick={closeTour}
    >
      <div
        className="animate-scale-in relative w-full max-w-lg rounded-2xl border border-museum-gold/40 bg-night-800 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.75)] sm:p-9"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={closeTour}
          aria-label="Skip tour"
          className="museum-label absolute top-4 right-4 text-[0.55rem] text-paper-300/50 transition-colors hover:text-amber-glow"
        >
          Skip
        </button>

        <p className="museum-label text-[0.55rem] text-museum-gold">
          Quick Tour — Stop {step + 1} of {quickTour.length}
        </p>

        {/* Progress dots */}
        <div aria-hidden className="mt-3 flex gap-1.5">
          {quickTour.map((_, i) => (
            <span
              key={i}
              className={`h-0.5 flex-1 rounded-full transition-colors duration-300 ${
                i <= step ? "bg-amber-glow" : "bg-paper-400/20"
              }`}
            />
          ))}
        </div>

        {/* Artifact visual */}
        <button
          type="button"
          onClick={() => {
            closeTour();
            openArtifact(tourArtifact.id);
          }}
          aria-label={`Open the full exhibit plaque for ${tourArtifact.title}`}
          className="group mx-auto mt-7 flex h-36 w-full items-center justify-center rounded-xl border border-paper-400/15 bg-night-900/70 transition-colors duration-300 hover:border-museum-gold/40"
        >
          <span className="transition-transform duration-300 group-hover:scale-105">
            <ArtifactGlyph id={tourArtifact.id} />
          </span>
        </button>
        <p className="museum-label mt-2 text-center text-[0.5rem] text-paper-300/40">
          Tap the object to open its full plaque
        </p>

        {/* Title + caption */}
        <h2 className="mt-5 font-serif text-2xl text-paper-50 sm:text-3xl">
          {tourArtifact.title}
        </h2>
        <p className="mt-2.5 font-serif text-lg leading-snug text-paper-200/85 italic">
          {quickTour[step].caption}
        </p>

        {/* Controls */}
        <div className="mt-7 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={goBack}
            disabled={step === 0}
            className="museum-label rounded-full border border-paper-400/25 px-4 py-2.5 text-[0.55rem] text-paper-300 transition-colors duration-300 hover:border-paper-300/50 hover:text-paper-100 disabled:cursor-not-allowed disabled:opacity-30"
          >
            ← Back
          </button>

          {isLast ? (
            <div className="animate-stamp flex flex-wrap justify-end gap-2.5">
              <button
                type="button"
                onClick={() => {
                  closeTour();
                  navigate("/bedroom");
                }}
                className="museum-label rounded-full border border-amber-glow/60 bg-amber-glow/10 px-4 py-2.5 text-[0.55rem] text-amber-glow transition-colors duration-300 hover:bg-amber-glow/20"
              >
                Explore the Bedroom
              </button>
              <button
                type="button"
                onClick={() => {
                  closeTour();
                  navigate("/failures");
                }}
                className="museum-label rounded-full border border-fail-red/50 px-4 py-2.5 text-[0.55rem] text-fail-red transition-colors duration-300 hover:bg-fail-red/10"
              >
                Museum of Failures
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={goNext}
              className="museum-label rounded-full border border-amber-glow/60 bg-amber-glow/10 px-5 py-2.5 text-[0.55rem] text-amber-glow transition-colors duration-300 hover:bg-amber-glow/20"
            >
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
