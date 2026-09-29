import { useEffect } from "react";
import { useMuseum } from "../context/MuseumContext";
import { failureArtifacts } from "../data/artifacts";
import ArtifactGlyph from "../components/ArtifactGlyph";

/** The Museum of Failures — a darker, reflective wing. */
export default function Failures() {
  const { viewedIds, openListView } = useMuseum();
  const viewed = failureArtifacts.filter((a) => viewedIds.has(a.id)).length;

  useEffect(() => {
    const prev = document.title;
    document.title = "The Museum of Failures — Anchit's Museum";
    return () => {
      document.title = prev;
    };
  }, []);

  return (
    <section className="lamp-room-shadow -mx-4 min-h-dvh px-4 py-24 sm:-mx-6 sm:px-6">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center">
          <p className="museum-label animate-fade-up text-[0.6rem] text-fail-red/80">The Shadow Room</p>
          <h1 className="animate-glitch mt-3 font-serif text-4xl text-paper-50 sm:text-5xl">
            The Museum of Failures
          </h1>
          <p className="animate-fade-up mt-3 font-serif text-lg text-paper-200/75 italic [animation-delay:300ms]">
            Exhibits that did not work, but changed how I think.
          </p>
          <p
            className="museum-label mt-5 text-[0.6rem] text-fail-amber/80"
            aria-live="polite"
          >
            Failures examined: {viewed} / {failureArtifacts.length}
          </p>
        </div>

        {/* Intro */}
        <p className="mx-auto mt-8 max-w-2xl text-center text-[0.95rem] leading-relaxed text-paper-200/80">
          Most museums only display victories. This wing displays the moments that broke
          my plan, bruised my ego, and forced me to think differently. These are not
          achievements. They are evidence of growth.
        </p>

        {/* Caution divider */}
        <div aria-hidden className="mx-auto mt-10 flex max-w-xs items-center gap-3">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-fail-amber/30" />
          <span className="museum-label text-[0.5rem] text-fail-amber/60">Restricted Wing</span>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-fail-amber/30" />
        </div>

        {/* Failure exhibits */}
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {failureArtifacts.map((a, i) => (
            <div key={a.id} className="animate-fade-up" style={{ animationDelay: `${i * 160}ms` }}>
              <FailureCard
                artifact={a}
                tilt={i === 1 ? "rotate-0" : i === 0 ? "-rotate-1" : "rotate-1"}
              />
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-14 text-center">
          <button
            type="button"
            onClick={openListView}
            className="museum-label rounded-full border border-paper-400/20 px-6 py-3 text-[0.55rem] text-paper-300/70 transition-colors hover:border-museum-gold/40 hover:text-museum-gold"
          >
            View the Full Collection
          </button>
          <p className="mx-auto mt-8 max-w-md font-hand text-xl leading-snug text-paper-300/50 italic">
            "Every exhibit here was once a plan I believed in."
          </p>
        </div>
      </div>
    </section>
  );
}

function FailureCard({
  artifact,
  tilt,
}: {
  artifact: (typeof failureArtifacts)[number];
  tilt: string;
}) {
  const { openArtifact, viewedIds } = useMuseum();
  const viewed = viewedIds.has(artifact.id);

  return (
    <button
      type="button"
      onClick={() => openArtifact(artifact.id)}
      className={`group relative flex flex-col items-center rounded-2xl border border-paper-400/12 bg-night-800/50 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-fail-red/40 hover:bg-night-800/80 hover:shadow-[0_18px_45px_rgba(0,0,0,0.6)] ${tilt}`}
    >
      {/* Stamped exhibit mark — stamps itself in on reveal */}
      <span
        aria-hidden
        className="animate-stamp museum-label absolute top-3 right-3 rounded-sm border border-fail-red/40 bg-night-900/60 px-1.5 py-0.5 text-[0.45rem] text-fail-red/70"
        style={{ transform: "rotate(6deg)" }}
      >
        Failure Exhibit
      </span>

      <span className="museum-label text-[0.55rem] text-fail-red/80">
        {artifact.exhibitNumber}
      </span>

      <div className="my-5 flex h-20 items-center justify-center">
        <span className="transition-transform duration-300 group-hover:scale-105">
          <ArtifactGlyph id={artifact.id} />
        </span>
      </div>

      <h2 className="font-serif text-xl leading-snug text-paper-50 group-hover:text-amber-glow">
        {artifact.title}
      </h2>
      <p className="mt-1.5 font-hand text-base text-paper-300/60">{artifact.objectName}</p>

      {/* Cracked border accent */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-1 rounded-xl border border-dashed border-fail-red/10 transition-colors duration-300 group-hover:border-fail-red/25"
      />
      {viewed && (
        <span
          aria-hidden
          className="absolute -top-1.5 -left-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-fail-amber text-[0.55rem] text-night-900 shadow"
        >
          ✓
        </span>
      )}
    </button>
  );
}
