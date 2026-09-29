/**
 * PAGE 4 — THE CURATOR'S NOTE (ABOUT ME)
 * A long, readable letter from the curator, followed by the
 * chips that describe how he works and what to ask him about.
 */
const traits = [
  "Relentlessness",
  "Independence",
  "Curiosity",
  "Empathy",
  "Discipline",
  "Self-awareness",
] as const;

const askMeAbout = [
  "The gap year that changed everything",
  "Qualifying for NEET twice — independently",
  "Teaching myself AI with Google, Cisco & NVIDIA courses",
  "Interning at an AI startup",
  "The food initiative that fed 200+ people",
  "Founding a neighborhood running club (and coding its website)",
  "EcoHub — 40+ flowers & trees planted, and one rescued puppy",
  "Tutoring three Class-10 students to +30 marks",
  "The chess game I coded from scratch",
  "Being a jack of all trades — and why that's the point",
] as const;

export default function CuratorPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-14 sm:px-8">
      <div className="text-center">
        <p className="museum-eyebrow">From the Curator</p>
        <h1 className="mt-3 font-serif text-4xl font-semibold text-paper-50 sm:text-5xl">
          Curator&rsquo;s Note
        </h1>
        <p className="mt-4 text-lg text-paper-300">
          Every museum has a voice behind it. This one is mine.
        </p>
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
            Welcome to my museum. I built it because I believe you should not
            have to take my word for anything — you should be able to walk
            through the evidence yourself.
          </p>
          <p>
            I finished Grade 12 at 16, which meant I was too young for college.
            Most people saw a waiting room. I saw a gap year, and I treated it
            like a full-time job. I qualified for NEET — India&rsquo;s national
            medical entrance examination — twice, preparing entirely on my own.
            I took Google, Cisco, and NVIDIA courses and taught myself AI. I
            interned at an AI startup. I co-founded a food initiative that fed
            more than 200 people, and I founded a neighborhood running club,
            building its website myself.
          </p>
          <p>
            I also started EcoHub, an environmental initiative through which I
            have planted over 40 flowers and trees, cared for stray dogs, and
            rescued a puppy that now refuses to leave my side. I tutored three
            Class-10 students in biology — each of them improved by roughly 30
            marks. And when I need to think, I sit down at a chessboard, or I
            open the chess game I coded from scratch.
          </p>
          <p>
            People like to call this being a jack of all trades — usually as an
            insult. But every trade taught me something the others couldn&rsquo;t:
            medicine taught me empathy, code taught me patience, community work
            taught me discipline, and failure taught me everything else.
          </p>
          <p>
            This museum is not proof that I have everything figured out. It is
            proof that I keep moving.
          </p>
          <p>
            Where this is going next: merging artificial intelligence and
            biology to solve real-world healthcare problems. The bedroom you
            just walked through is the first exhibit of that career — come back
            in four years and see what hangs on these walls.
          </p>
        </div>

        <p className="mt-10 font-hand text-3xl text-paper-100">
          — Anchit
        </p>
      </div>

      {/* The traits behind every exhibit */}
      <div className="mt-10">
        <p className="museum-eyebrow">The Traits Behind Every Exhibit</p>
        <ul className="mt-4 flex flex-wrap gap-3">
          {traits.map((trait) => (
            <li
              key={trait}
              className="rounded-full border border-amber-lamp/35 bg-amber-lamp/5 px-4 py-1.5 font-serif text-sm italic text-amber-glow"
            >
              {trait}
            </li>
          ))}
        </ul>
      </div>

      {/* Ask me about */}
      <div className="mt-10">
        <p className="museum-eyebrow">Ask Me About</p>
        <ul className="mt-4 flex flex-wrap gap-3">
          {askMeAbout.map((topic) => (
            <li
              key={topic}
              className="rounded-full border border-paper-400/25 bg-night-850/70 px-4 py-1.5 text-sm text-paper-200 transition-colors hover:border-amber-lamp/50 hover:text-amber-glow"
            >
              {topic}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
