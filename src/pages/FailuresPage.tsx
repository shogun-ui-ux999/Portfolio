import { failureArtifacts } from "../data/artifacts";

/**
 * PAGE 3 — THE MUSEUM OF FAILURES (THE SHADOW ROOM)
 * Darker wing. Elegant caution tape, crossed-out accents.
 * Failure plaques and cracked-glass effects arrive in Prompt 2.
 */
export default function FailuresPage() {
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
        <p className="mt-4 text-lg text-paper-300">
          Exhibits that did not work, but changed how I think.
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
          <article
            key={artifact.id}
            className="museum-card group relative overflow-hidden p-6"
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
            <h2 className="mt-3 font-serif text-xl font-semibold text-paper-100 line-through decoration-brick-400/60 decoration-1">
              {artifact.title}
            </h2>
            <p className="mt-1 text-xs italic text-paper-400">
              {artifact.objectName}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-paper-200/85">
              {artifact.lesson}
            </p>
            <p className="mt-5 font-type text-[0.6rem] uppercase tracking-[0.25em] text-paper-400/60">
              Full plaque opens in Prompt 2
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
