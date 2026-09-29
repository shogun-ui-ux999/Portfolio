import { useEffect } from "react";
import { Link } from "react-router-dom";
import { curator } from "../data/artifacts";
import { Reveal, Typewriter } from "../components/motion";

/** Curator's Note — a personal letter from the museum's curator. */
export default function Curator() {
  useEffect(() => {
    const prev = document.title;
    document.title = "Curator's Note — Anchit's Museum";
    return () => {
      document.title = prev;
    };
  }, []);

  return (
    <section className="mx-auto min-h-dvh max-w-3xl px-5 py-24 sm:px-6">
      {/* Header */}
      <div className="text-center">
        <p className="museum-label animate-fade-up text-[0.6rem] text-museum-gold/80">About the Museum</p>
        <h1 className="mt-3 font-serif text-4xl text-paper-50 sm:text-5xl">
          <Typewriter text="Curator's Note" speedMs={45} caret />
        </h1>
        <p className="mt-3 font-serif text-lg text-paper-200/75 italic">
          {curator.subtitle}
        </p>
      </div>

      {/* The letter */}
      <article className="mt-12 rounded-2xl border border-paper-400/15 bg-night-800/40 p-7 shadow-[0_18px_50px_rgba(0,0,0,0.45)] sm:p-11">
        <div className="flex items-center gap-4">
          <span
            aria-hidden
            className="flex h-12 w-12 items-center justify-center rounded-full border border-museum-gold/50 bg-night-900 font-serif text-lg text-museum-gold"
          >
            A
          </span>
          <div>
            <p className="font-serif text-xl text-paper-50">{curator.name}</p>
            <p className="museum-label mt-0.5 text-[0.5rem] text-paper-300/60">
              Curator, Founder of Nothing Official
            </p>
          </div>
        </div>

        <div aria-hidden className="my-7 h-px bg-paper-400/15" />

        <div className="space-y-5 text-[0.95rem] leading-[1.85] text-paper-200/90">
          {curator.statement.split(". ").map((sentence, i, arr) =>
            i < arr.length - 1 ? (
              <Reveal key={i} variant="animate-fade-up" delayMs={i * 40}>
                <p>{sentence}.</p>
              </Reveal>
            ) : (
              sentence.trim() && (
                <Reveal key={i} variant="animate-fade-up" delayMs={i * 40}>
                  <p>{sentence}</p>
                </Reveal>
              )
            )
          )}
        </div>

        <div aria-hidden className="my-7 h-px bg-paper-400/15" />

        <p className="text-right font-hand text-2xl text-amber-glow/85">
          — Anchit
        </p>
      </article>

      {/* Values */}
      <div className="mt-14">
        <h2 className="museum-label text-[0.6rem] text-museum-gold/80">What I Care About</h2>
        <div className="mt-4 flex flex-wrap gap-2.5">
          {curator.values.map((v, i) => (
            <span
              key={v}
              className="animate-scale-in rounded-full border border-museum-gold/30 bg-museum-gold/5 px-4 py-2 font-serif text-sm text-paper-100 transition-all duration-300 hover:-translate-y-0.5 hover:rotate-1 hover:border-museum-gold/60 hover:bg-museum-gold/10"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {v}
            </span>
          ))}
        </div>
      </div>

      {/* Future Direction */}
      <div className="mt-12">
        <h2 className="museum-label text-[0.6rem] text-museum-gold/80">Future Direction</h2>
        <div className="mt-4 rounded-2xl border border-screen/25 bg-screen/5 p-6 sm:p-7">
          <p className="text-[0.95rem] leading-[1.85] text-paper-100/90">
            {curator.futureDirection}
          </p>
        </div>
      </div>

      {/* Ask Me About */}
      <div className="mt-12">
        <h2 className="museum-label text-[0.6rem] text-museum-gold/80">Ask Me About</h2>
        <p className="mt-2 font-hand text-xl text-paper-300/60">
          conversation starters, if we ever meet
        </p>
        <div className="mt-4 flex flex-wrap gap-2.5">
          {curator.askMeAbout.map((topic) => (
            <span
              key={topic}
              className="cursor-default rounded-full border border-paper-400/25 bg-night-800/60 px-4 py-2 text-[0.8rem] text-paper-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-glow/50 hover:text-amber-glow"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-16 text-center">
        <Link
          to="/gift-shop"
          className="museum-label inline-flex items-center gap-2.5 rounded-full border border-amber-glow/60 bg-amber-glow/10 px-7 py-3.5 text-[0.65rem] text-amber-glow transition-all duration-300 hover:bg-amber-glow/20"
        >
          Visit the Gift Shop
          <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  );
}
