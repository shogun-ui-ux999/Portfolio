import { bedroomArtifacts } from "../data/artifacts";

/**
 * PAGE 2 — THE BEDROOM
 * Shell for the interactive room. The 2D/3D scene, artifact
 * hotspots, and modals are built in Prompt 2. For now: header,
 * progress tracker, and a preview of the collection data.
 */
export default function BedroomPage() {
  const viewedCount = 0; // Wired to real viewed-state in Prompt 2
  const total = bedroomArtifacts.length;

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="museum-eyebrow">Gallery One</p>
          <h1 className="mt-3 font-serif text-4xl font-semibold text-paper-50 sm:text-5xl">
            The Bedroom
          </h1>
        </div>

        {/* Progress tracker */}
        <p className="rounded-full border border-amber-lamp/30 bg-night-850/80 px-5 py-2 font-type text-xs uppercase tracking-[0.25em] text-amber-glow">
          Artifacts viewed: {viewedCount} / {total}
        </p>
      </div>

      <div className="gold-rule mt-8 mx-0" aria-hidden />

      {/* The interactive bedroom scene mounts here in Prompt 2 */}
      <div
        id="bedroom-scene"
        className="museum-card mt-10 flex min-h-[420px] items-center justify-center"
      >
        <div className="px-6 py-16 text-center">
          <p className="font-serif text-2xl italic text-paper-200">
            The room is still being curated.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-paper-300/80">
            Nine artifacts will live here — clickable, glowing softly in
            lamplight. For now, meet the collection:
          </p>

          {/* Data-driven preview so the structure is testable today */}
          <ul className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-3 text-left sm:grid-cols-3">
            {bedroomArtifacts.map((artifact) => (
              <li
                key={artifact.id}
                className="rounded-md border border-paper-400/10 bg-night-800/60 px-4 py-3"
              >
                <p className="font-type text-[0.6rem] uppercase tracking-[0.25em] text-amber-lamp/70">
                  {artifact.exhibitNumber}
                </p>
                <p className="mt-1 font-serif text-sm font-semibold text-paper-100">
                  {artifact.title}
                </p>
                <p className="mt-0.5 text-xs text-paper-400">
                  sits on the {artifact.position}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
