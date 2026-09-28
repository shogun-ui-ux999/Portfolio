/**
 * PAGE 4 — THE CURATOR'S NOTE (ABOUT ME)
 * Clean, readable letter layout. Full letter + "Ask Me About"
 * arrive with content wiring; shell holds the frame.
 */
export default function CuratorPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-14 sm:px-8">
      <div className="text-center">
        <p className="museum-eyebrow">From the Curator</p>
        <h1 className="mt-3 font-serif text-4xl font-semibold text-paper-50 sm:text-5xl">
          Curator&rsquo;s Note
        </h1>
      </div>

      {/* The letter */}
      <div className="museum-card mt-12 p-8 sm:p-12">
        <p className="font-type text-[0.65rem] uppercase tracking-[0.3em] text-amber-lamp/80">
          Curator: Anchit Aman
        </p>

        <div className="mt-8 space-y-6 text-lg leading-relaxed text-paper-200">
          <p>
            <span className="font-hand text-2xl text-amber-glow">
              Dear visitor,
            </span>
          </p>
          <p>
            The core drive behind everything in this museum is simple: an ego
            of never giving up, and a habit of finding my own way.
          </p>
          <p>
            I graduated at 16, then took a gap year to build, learn, and
            qualify for NEET independently. Along the way I co-founded a food
            initiative feeding 200+ people, founded a neighborhood running
            club, and taught myself AI.
          </p>
          <p>
            Where this is going: merging AI and Biology to solve real-world
            healthcare problems.
          </p>
        </div>

        <p className="mt-10 font-hand text-3xl text-paper-100">
          — Anchit
        </p>
      </div>

      {/* Ask me about */}
      <div className="mt-10">
        <p className="museum-eyebrow">Ask Me About</p>
        <ul className="mt-4 flex flex-wrap gap-3">
          {[
            "Cold-calling bakeries",
            "My gap year",
            "Failing at code → AI startup intern",
          ].map((topic) => (
            <li
              key={topic}
              className="rounded-full border border-paper-400/25 bg-night-850/70 px-4 py-1.5 text-sm text-paper-200"
            >
              {topic}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
