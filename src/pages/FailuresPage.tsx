import { useState } from "react";
import { failureArtifacts } from "../data/artifacts";
import ArtifactModal from "../components/ArtifactModal";
import type { Artifact } from "../data/artifacts";

/**
 * PAGE 3 — THE MUSEUM OF FAILURES (THE SHADOW ROOM)
 * Darker wing. Elegant caution tape, crossed-out accents, and
 * full plaques that open on click — because these exhibits
 * deserve the same depth as any achievement.
 */
export default function FailuresPage() {
  const [activeArtifact, setActiveArtifact] = useState<Artifact | null>(null);

  return (
    <div className="relative mx-auto w-full max-w-6xl px-5 py-14 sm:px-8">
      {/* Darker shadow-room lighting */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-gradient-to-b from-black/60 to-transparent"
      />

      <div className="text-center">
        <p className="museum-eyebrow !text-brick-400/90">Gallery Two — Staff Only</p>
        <h1 className="mt-3 font-serif text-4xl font-semibold text-paper-50 sm:text-5xl">
          The Museum of Failures
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-paper-300">
          Most museums only display victories. This wing displays the moments
          that broke my plan, bruised my ego, and forced me to think
          differently. These are not achievements. They are evidence of
          growth.
        </p>

        {/* Elegant caution tape divider */}
        <div
          aria-hidden
          className="mx-auto mt-8 h-px w-full max-w-md"
          style={{
            background:
              "repeating-linear-gradient(90deg, rgba(217,122,90,0.0) 0 8px, rgba(217,122,90,0.65) 8px 16px)",
          }}
        />
      </div>

      <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
        {failureArtifacts.map((artifact) => (
          <button
            key={artifact.id}
            type="button"
            onClick={() => setActiveArtifact(artifact)}
            aria-label={`Open ${artifact.exhibitNumber}: ${artifact.title}`}
            className="museum-card group relative cursor-pointer overflow-hidden p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-brick-400/40"
          >
            {/* Cracked-glass hint: a faint diagonal sheen */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                background:
                  "linear-gradient(115deg, transparent 42%, rgba(217,122,90,0.08) 43%, transparent 46%, transparent 74%, rgba(217,122,90,0.06) 75%, transparent 78%)",
              }}
            />
            <p className="font-type text-[0.65rem] uppercase tracking-[0.3em] text-brick-400">
              {artifact.exhibitNumber}
            </p>
            <span className="mt-3 flex items-center justify-between gap-2">
              <h2 className="font-serif text-xl font-semibold text-paper-100 line-through decoration-brick-400/60 decoration-1">
                {artifact.title}
              </h2>
              <span className="rounded-full border border-brick-400/40 bg-brick-400/10 px-2 py-0.5 font-type text-[0.5rem] uppercase tracking-[0.2em] text-brick-400">
                Failure Exhibit
              </span>
            </span>
            <p className="mt-1 text-xs italic text-paper-400">
              {artifact.objectName}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-paper-200/85">
              {artifact.lesson}
            </p>
            <p className="mt-5 font-type text-[0.6rem] uppercase tracking-[0.25em] text-paper-400/60 transition-colors group-hover:text-brick-400/80">
              Read the full plaque →
            </p>
          </button>
        ))}
      </div>

      {/* Closing note */}
      <p className="mx-auto mt-14 max-w-xl text-center text-sm italic leading-relaxed text-paper-400">
        Every exhibit in this wing still hurts a little. That is exactly why
        they are on display.
      </p>

      <ArtifactModal
        artifact={activeArtifact}
        onClose={() => setActiveArtifact(null)}
      />
    </div>
  );
}
