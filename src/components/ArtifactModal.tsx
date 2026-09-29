import { useEffect, useRef, useState } from "react";
import type { Artifact, CertificateEvidence } from "../data/artifacts";
import { evidenceLabelToCertificate, quickTourCaptions } from "../data/artifacts";

export interface TourInfo {
  /** 0-based index of the current stop */
  step: number;
  total: number;
  onBack: () => void;
  onNext: () => void;
  onSkip: () => void;
}

interface ArtifactModalProps {
  artifact: Artifact | null;
  onClose: () => void;
  /** Present while the Quick Tour is driving the modal */
  tour?: TourInfo | null;
}

/**
 * OVERLAY 1 — THE ARTIFACT MODAL
 * A high-end museum plaque: brass frame, engraved exhibit
 * number, story, lesson, audio-guide transcript, and evidence.
 * Closes on button, backdrop click, or Escape.
 */
export default function ArtifactModal({
  artifact,
  onClose,
  tour = null,
}: ArtifactModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [audioOpen, setAudioOpen] = useState(false);
  const [openEvidence, setOpenEvidence] = useState<{
    label: string;
    cert: CertificateEvidence;
  } | null>(null);

  // Reset per-artifact UI state when the plaque changes.
  useEffect(() => {
    setAudioOpen(false);
    setOpenEvidence(null);
  }, [artifact?.id]);

  // Escape closes overlays first, then the plaque; while the
  // tour is running Escape means "skip".
  useEffect(() => {
    if (!artifact) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (openEvidence) {
        setOpenEvidence(null);
        return;
      }
      if (tour) tour.onSkip();
      else onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [artifact, onClose, tour, openEvidence]);

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
            <div className="flex flex-wrap items-center gap-2">
              <p className="museum-eyebrow">{artifact.exhibitNumber}</p>
              {artifact.isFailure && (
                <span className="rounded-full border border-brick-400/50 bg-brick-400/10 px-2.5 py-0.5 font-type text-[0.55rem] uppercase tracking-[0.2em] text-brick-400">
                  Failure Exhibit
                </span>
              )}
              {artifact.isSecret && (
                <span className="rounded-full border border-gold-400/50 bg-gold-400/10 px-2.5 py-0.5 font-type text-[0.55rem] uppercase tracking-[0.2em] text-gold-400">
                  Curator&rsquo;s Private Item
                </span>
              )}
            </div>
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

          {/* Audio Guide transcript */}
          {artifact.audioGuideScript && (
            <div className="mt-8">
              <button
                type="button"
                onClick={() => setAudioOpen((open) => !open)}
                aria-expanded={audioOpen}
                aria-controls={`audio-guide-${artifact.id}`}
                className="inline-flex items-center gap-2 rounded-md border border-screen-400/40 bg-screen-500/10 px-4 py-2 text-sm font-medium text-screen-300 transition-colors hover:border-screen-300 hover:bg-screen-500/20"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3v10.5" />
                  <path d="M8 11.5a4 4 0 0 0 8 0" />
                  <path d="M12 17.5V21" />
                  <path d="M9 21h6" />
                  <path d="M4.5 11.5H5M19 11.5h.5" />
                </svg>
                Audio Guide
                <svg
                  viewBox="0 0 24 24"
                  className={`h-3.5 w-3.5 transition-transform ${audioOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              {audioOpen && (
                <div
                  id={`audio-guide-${artifact.id}`}
                  data-testid="audio-guide-transcript"
                  className="mt-3 rounded-lg border border-screen-400/25 bg-night-850/70 p-5"
                >
                  <p className="font-type text-[0.6rem] uppercase tracking-[0.3em] text-screen-300/90">
                    Audio Guide Transcript
                  </p>
                  <p className="mt-3 text-sm italic leading-relaxed text-paper-200/90">
                    &ldquo;{artifact.audioGuideScript}&rdquo;
                  </p>
                  <p className="mt-3 font-type text-[0.55rem] uppercase tracking-[0.25em] text-paper-400/70">
                    Voice recording coming soon.
                  </p>
                </div>
              )}
            </div>
          )}

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
                {artifact.evidenceLinks.map((link) => {
                  const cert = evidenceLabelToCertificate[link.label];
                  const openCert = () =>
                    cert && setOpenEvidence({ label: link.label, cert });

                  if (link.verified && cert) {
                    return (
                      <li key={link.label}>
                        <button
                          type="button"
                          onClick={openCert}
                          className="inline-flex flex-wrap items-center gap-2 rounded-md border border-screen-400/40 bg-screen-500/10 px-4 py-2 text-sm font-medium text-screen-300 transition-colors hover:border-screen-300 hover:bg-screen-500/20"
                        >
                          {link.label}
                          <span
                            data-testid="verified-badge"
                            className="inline-flex items-center gap-1 rounded-full border border-gold-400/60 bg-gold-400/15 px-1.5 py-0.5 font-type text-[0.5rem] uppercase tracking-[0.15em] text-gold-400"
                          >
                            <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M4 12.5l5 5L20 6.5" />
                            </svg>
                            Verified
                          </span>
                        </button>
                      </li>
                    );
                  }

                  return (
                    <li key={link.label}>
                      <a
                        href={link.url || undefined}
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
                  );
                })}
              </ul>
            </div>
          )}

          {/* Footer: tour controls or simple close */}
          <div className="mt-10 flex flex-col items-center gap-4 border-t border-paper-400/10 pt-6 sm:flex-row sm:justify-between">
            {isTour && tour ? (
              <>
                <div
                  className="flex flex-col gap-2"
                  aria-label={`Tour stop ${tour.step + 1} of ${tour.total}`}
                >
                  <div className="flex items-center gap-2">
                    {Array.from({ length: tour.total }, (_, index) => (
                      <span
                        key={index}
                        aria-hidden
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          index === tour.step
                            ? "w-6 bg-amber-lamp"
                            : "w-1.5 bg-paper-400/40"
                        }`}
                      />
                    ))}
                    <span className="ml-2 font-type text-[0.6rem] uppercase tracking-[0.25em] text-paper-300">
                      Quick Tour — {tour.step + 1}/{tour.total}
                    </span>
                  </div>
                  <p className="font-hand text-xl leading-none text-amber-glow">
                    {quickTourCaptions[artifact.id] ?? ""}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={tour.onBack}
                    disabled={tour.step === 0}
                    className="btn-ghost !px-4 !py-2 text-xs disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={tour.onNext}
                    className="btn-lamp !px-5 !py-2 text-xs"
                  >
                    Next
                  </button>
                  <button
                    type="button"
                    onClick={tour.onSkip}
                    className="btn-ghost !px-4 !py-2 text-xs"
                  >
                    Skip
                  </button>
                </div>
              </>
            ) : (
              <button type="button" onClick={onClose} className="btn-ghost !px-5 !py-2 text-xs">
                Close
              </button>
            )}
          </div>
        </div>
      </div>

      {/* OVERLAY 2 — CERTIFICATE EVIDENCE VIEW */}
      {openEvidence && (
        <CertificateEvidenceView
          label={openEvidence.label}
          cert={openEvidence.cert}
          onBack={() => setOpenEvidence(null)}
        />
      )}
    </div>
  );
}

/**
 * A faithful, CSS-drawn rendering of the official certificate:
 * ornate frame, serif recipient name, course, completion date,
 * issuer, standards, signatories, and a "Verified Evidence"
 * stamp.
 */
function CertificateEvidenceView({
  label,
  cert,
  onBack,
}: {
  label: string;
  cert: CertificateEvidence;
  onBack: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-night-950/90 p-4 backdrop-blur-sm sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onBack();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="certificate-view-title"
    >
      <div className="relative w-full max-w-2xl">
        <div
          className="max-h-[88vh] overflow-y-auto rounded-lg p-[3px]"
          style={{
            background:
              "linear-gradient(150deg, #f0c878 0%, #c9822a 30%, #7c5a22 55%, #d9b45b 100%)",
          }}
        >
          <div
            className="relative rounded-[5px] px-6 py-10 text-center sm:px-12"
            style={{
              background:
                "linear-gradient(165deg, #faf4e4 0%, #f4ecdc 55%, #ecdfc6 100%)",
            }}
          >
            {/* Inner frame border */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-2.5 rounded-[3px] border-2 border-[#b98a2e]/50"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-4 rounded-[2px] border border-[#b98a2e]/30"
            />

            <p className="museum-eyebrow !text-[#8a6a1f]">
              {cert.kind === "certificate" ? "Certificate of Completion" : "Certificate of Participation"}
            </p>
            <p className="mt-6 font-serif text-xs uppercase tracking-[0.35em] text-[#6b5320]">
              This certifies that
            </p>
            <h2
              id="certificate-view-title"
              data-testid="certificate-recipient"
              className="mt-2 font-serif text-4xl font-semibold text-[#2c2313] sm:text-5xl"
            >
              {cert.recipient}
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-[#4a3b20]">
              has successfully completed
            </p>
            <p className="mx-auto mt-1 max-w-lg font-serif text-xl font-semibold leading-snug text-[#2c2313] sm:text-2xl">
              {cert.course}
            </p>

            <p className="mt-4 font-type text-[0.65rem] uppercase tracking-[0.3em] text-[#6b5320]">
              Completed {cert.completionDate}
            </p>

            {cert.tagline && (
              <p className="mt-4 font-serif text-sm italic text-[#6b5320]">
                &ldquo;{cert.tagline}&rdquo;
              </p>
            )}

            {cert.standards && cert.standards.length > 0 && (
              <ul className="mx-auto mt-5 max-w-md space-y-1.5">
                {cert.standards.map((standard) => (
                  <li key={standard} className="text-xs leading-relaxed text-[#4a3b20]">
                    — {standard} —
                  </li>
                ))}
              </ul>
            )}

            {/* Signatories + Verified Evidence stamp */}
            <div className="mt-9 flex flex-col items-center justify-between gap-7 sm:flex-row sm:items-end">
              <div className="flex flex-1 flex-wrap items-end justify-center gap-7 sm:justify-start">
                {cert.signatories.map((signatory) => (
                  <div key={signatory.name} className="min-w-[10rem] text-center">
                    <p className="font-hand text-2xl leading-none text-[#2c2313]">
                      {signatory.name}
                    </p>
                    <div className="mt-1 h-px w-full bg-[#8a6a1f]/40" aria-hidden />
                    <p className="mt-1.5 text-[0.65rem] uppercase tracking-[0.15em] text-[#6b5320]">
                      {signatory.role}
                    </p>
                  </div>
                ))}
              </div>

              {/* The stamp — rotated seal */}
              <div
                data-testid="verified-evidence-stamp"
                className="flex h-24 w-24 shrink-0 rotate-6 flex-col items-center justify-center rounded-full border-[3px] border-gold-600/70 text-gold-600"
                style={{ color: "#9a7a2e", borderColor: "rgba(154, 122, 46, 0.7)" }}
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 12.5l5 5L20 6.5" />
                </svg>
                <p className="mt-1 text-center font-type text-[0.5rem] font-bold uppercase leading-tight tracking-[0.12em]">
                  Verified
                  <br />
                  Evidence
                </p>
              </div>
            </div>

            <p className="mt-8 text-[0.65rem] uppercase tracking-[0.25em] text-[#6b5320]/80">
              {cert.issuer}
            </p>
            <p className="mt-1 font-type text-[0.55rem] uppercase tracking-[0.25em] text-[#6b5320]/60">
              Museum exhibit copy — original on file with the curator ({label})
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onBack}
          className="btn-ghost mt-4 !px-5 !py-2 text-xs"
        >
          ← Back to the plaque
        </button>
      </div>
    </div>
  );
}
