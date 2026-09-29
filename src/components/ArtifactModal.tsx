import { useEffect, useRef, useState } from "react";
import { useMuseum } from "../context/MuseumContext";
import { getArtifact } from "../data/artifacts";
import type { EvidenceDetail } from "../data/artifacts";
import CertificateView from "./CertificateView";

/** Elegant museum plaque overlay for a single artifact */
export default function ArtifactModal() {
  const { activeArtifactId, closeArtifact } = useMuseum();
  const artifact = activeArtifactId ? getArtifact(activeArtifactId) : undefined;
  const [transcriptOpen, setTranscriptOpen] = useState(false);
  const [openCert, setOpenCert] = useState<EvidenceDetail | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Reset panel state + focus the close button when a new artifact opens
  useEffect(() => {
    setTranscriptOpen(false);
    setOpenCert(null);
    if (activeArtifactId) {
      const t = window.setTimeout(() => closeRef.current?.focus(), 50);
      return () => window.clearTimeout(t);
    }
  }, [activeArtifactId]);

  // Escape closes (evidence view first, then plaque)
  useEffect(() => {
    if (!activeArtifactId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (openCert) setOpenCert(null);
        else if (transcriptOpen) setTranscriptOpen(false);
        else closeArtifact();
      }
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [activeArtifactId, closeArtifact, openCert, transcriptOpen]);

  if (!artifact) return null;

  return (
    <>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Exhibit plaque: ${artifact.title}`}
        className="animate-fade-in fixed inset-0 z-[80] flex items-end justify-center overflow-y-auto bg-night-950/80 p-3 backdrop-blur-sm sm:items-center sm:p-6"
        onClick={() => {
          if (!openCert) closeArtifact();
        }}
      >
        <div
          className="animate-fade-up relative my-auto w-full max-w-2xl rounded-2xl border border-museum-gold/40 bg-night-800 shadow-[0_24px_80px_rgba(0,0,0,0.7)]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Gold top rule */}
          <div aria-hidden className="h-px w-full bg-gradient-to-r from-transparent via-museum-gold/60 to-transparent" />

          <button
            ref={closeRef}
            type="button"
            onClick={closeArtifact}
            aria-label="Close exhibit plaque"
            className="absolute top-3.5 right-3.5 flex h-9 w-9 items-center justify-center rounded-full border border-paper-400/25 text-paper-300 transition-all duration-300 hover:border-amber-glow/60 hover:text-amber-glow"
          >
            <span aria-hidden className="text-lg leading-none">×</span>
          </button>

          <div className="max-h-[82dvh] overflow-y-auto px-6 py-7 sm:px-10 sm:py-9">
            {/* Exhibit number + badges */}
            <div className="mb-3 flex flex-wrap items-center gap-2.5">
              <span className="museum-label text-[0.6rem] text-museum-gold">
                {artifact.exhibitNumber}
              </span>
              {artifact.isFailure && (
                <span className="museum-label rounded-sm border border-fail-red/50 bg-fail-red/10 px-2 py-1 text-[0.55rem] text-fail-red">
                  Failure Exhibit
                </span>
              )}
              {artifact.isSecret && (
                <span className="museum-label rounded-sm border border-museum-gold/50 bg-museum-gold/10 px-2 py-1 text-[0.55rem] text-museum-gold">
                  Curator's Private Item
                </span>
              )}
            </div>

            {/* Title + object name */}
            <h2 className="font-serif text-3xl leading-tight text-paper-50 sm:text-4xl">
              {artifact.title}
            </h2>
            <p className="mt-2 font-hand text-xl text-amber-glow/90">
              {artifact.objectName}
            </p>

            <div aria-hidden className="my-5 h-px bg-paper-400/15" />

            {/* Story */}
            <p className="max-w-prose text-[0.95rem] leading-relaxed text-paper-200/90">
              {artifact.story}
            </p>

            {/* Lesson block */}
            <blockquote className="mt-6 rounded-lg border-l-2 border-amber-glow/70 bg-amber-glow/5 px-5 py-4">
              <span className="museum-label block text-[0.55rem] text-amber-glow/80">Lesson</span>
              <p className="mt-1.5 font-serif text-lg leading-snug text-paper-100 italic">
                {artifact.lesson}
              </p>
            </blockquote>

            {/* Evidence links */}
            {artifact.evidenceLinks && artifact.evidenceLinks.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-3">
                {artifact.evidenceLinks.map((l) => (
                  <a
                    key={l.url}
                    href={l.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="museum-label inline-flex items-center gap-2 rounded-full border border-museum-gold/40 px-4 py-2.5 text-[0.6rem] text-museum-gold transition-all duration-300 hover:border-museum-gold hover:bg-museum-gold/10"
                  >
                    {l.label}
                    <span aria-hidden>↗</span>
                  </a>
                ))}
              </div>
            )}

            {/* Evidence detail cards (certificates etc.) */}
            {artifact.evidenceDetails && (
              <div className="mt-7">
                <span className="museum-label text-[0.55rem] text-paper-300/60">
                  Evidence
                </span>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {artifact.evidenceDetails.map((d) => (
                    <EvidenceCard key={d.label} detail={d} onOpen={() => setOpenCert(d)} />
                  ))}
                </div>
              </div>
            )}

            {/* Audio guide */}
            {artifact.audioGuideScript && (
              <div className="mt-7">
                <button
                  type="button"
                  onClick={() => setTranscriptOpen((v) => !v)}
                  aria-expanded={transcriptOpen}
                  className="museum-label inline-flex items-center gap-2.5 rounded-full border border-screen/40 px-4 py-2.5 text-[0.6rem] text-screen transition-all duration-300 hover:border-screen hover:bg-screen/10"
                >
                  <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-screen shadow-[0_0_8px_rgba(127,180,217,0.8)]" />
                  {transcriptOpen ? "Hide Audio Guide" : "Audio Guide"}
                </button>
                {transcriptOpen && (
                  <div className="animate-fade-up mt-3 rounded-lg border border-screen/25 bg-screen/5 px-5 py-4">
                    <span className="museum-label block text-[0.55rem] text-screen/80">
                      Audio Guide Transcript
                    </span>
                    <p className="mt-2 font-serif text-[1.05rem] leading-relaxed text-paper-100/90 italic">
                      "{artifact.audioGuideScript}"
                    </p>
                    <p className="mt-2.5 text-xs text-paper-300/50">
                      Voice recording coming soon.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Certificate Evidence View (nested above plaque) */}
      {openCert && (
        <CertificateView detail={openCert} onClose={() => setOpenCert(null)} />
      )}
    </>
  );
}

/** Museum-style evidence card for structured certificate data */
function EvidenceCard({
  detail,
  onOpen,
}: {
  detail: EvidenceDetail;
  onOpen: () => void;
}) {
  const hasCertView = Boolean(detail.certificate);

  const inner = (
    <>
      <div className="flex items-start justify-between gap-2">
        <p className="font-serif text-[1.05rem] text-paper-50">{detail.label}</p>
        {hasCertView && (
          <span className="museum-label shrink-0 rounded-sm border border-museum-gold/40 bg-museum-gold/10 px-1.5 py-0.5 text-[0.5rem] text-museum-gold">
            Verified
          </span>
        )}
      </div>
      {detail.description && (
        <p className="mt-1 text-xs leading-relaxed text-paper-200/75">{detail.description}</p>
      )}
      {detail.issuer && (
        <p className="mt-1.5 text-xs text-paper-300/60">{detail.issuer}</p>
      )}
      {detail.completionDate && (
        <p className="museum-label mt-2 text-[0.55rem] text-paper-300/60">
          Completed {detail.completionDate}
        </p>
      )}
      {detail.status && (
        <p className="font-hand mt-1.5 text-base text-paper-300/60 italic">{detail.status}</p>
      )}
    </>
  );

  if (hasCertView) {
    return (
      <button
        type="button"
        onClick={onOpen}
        className="rounded-xl border border-paper-400/20 bg-night-700/40 p-4 text-left transition-all duration-300 hover:border-museum-gold/50 hover:bg-night-700/70"
      >
        {inner}
        <span className="museum-label mt-3 block text-[0.5rem] text-museum-gold/80">
          View Certificate →
        </span>
      </button>
    );
  }
  return (
    <div className="rounded-xl border border-paper-400/15 bg-night-700/25 p-4">{inner}</div>
  );
}
