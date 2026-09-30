import { useEffect } from "react";
import { Link } from "react-router-dom";
import { curator } from "../data/artifacts";
import { Reveal, Typewriter } from "../components/motion";

/** Curator&apos;s Note — a personal letter from the museum&apos;s curator. */
export default function Curator() {
  useEffect(() => {
    const prev = document.title;
    document.title = "Curator's Note — Anchit's Museum";
    return () => {
      document.title = prev;
    };
  }, []);

  return (
    <section className="relative mx-auto min-h-dvh max-w-3xl px-5 py-24 sm:px-6">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="absolute top-20 left-1/2 h-64 w-96 -translate-x-1/2 rounded-full bg-cyan/5 blur-3xl"
        style={{ filter: "blur(80px)" }}
      />

      {/* Header */}
      <div className="text-center">
        <p className="animate-fade-up text-[0.55rem] text-cyan/70 tracking-[0.4em] uppercase [animation-delay:80ms]">
          About the Museum
        </p>
        <h1 className="mt-3 font-display text-4xl text-paper sm:text-5xl">
          <Typewriter text="Curator's Note" speedMs={45} caret />
        </h1>
        <p className="mt-3 font-display text-lg text-paper/70 italic">
          {curator.subtitle}
        </p>
      </div>

      {/* The letter — glass card */}
      <article className="mt-12 rounded-2xl border border-white/5 bg-deep-800/40 p-7 shadow-[0_18px_50px_rgba(0,0,0,0.45)] sm:p-11">
        <div className="flex items-center gap-4">
          <span
            aria-hidden
            className="flex h-12 w-12 items-center justify-center rounded-full border border-cyan/30 bg-deep-900 font-display text-lg text-cyan shadow-[0_0_16px_rgba(0,212,255,0.15)]"
          >
            A
          </span>
          <div>
            <p className="font-display text-xl text-paper">{curator.name}</p>
            <p className="museum-label mt-0.5 text-[0.5rem] text-paper-faint/50">
              Curator, Founder of Nothing Official
            </p>
          </div>
        </div>

        <div aria-hidden className="my-7 h-px bg-white/5" />

        <div className="space-y-5 text-[0.95rem] leading-[1.85] text-paper/85">
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

        <div aria-hidden className="my-7 h-px bg-white/5" />

        <p className="text-right font-hand text-2xl text-gold/80">
          — Anchit
        </p>
      </article>

      {/* Values */}
      <div className="mt-14">
        <h2 className="museum-label text-[0.55rem] text-cyan/70">What I Care About</h2>
        <div className="mt-4 flex flex-wrap gap-2.5">
          {curator.values.map((v, i) => (
            <span
              key={v}
              className="animate-scale-in rounded-full border border-cyan/20 bg-cyan/5 px-4 py-2 font-display text-sm text-paper transition-all duration-300 hover:-translate-y-0.5 hover:rotate-1 hover:border-cyan/50 hover:bg-cyan/10"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {v}
            </span>
          ))}
        </div>
      </div>

      {/* Future Direction */}
      <div className="mt-12">
        <h2 className="museum-label text-[0.55rem] text-cyan/70">Future Direction</h2>
        <div className="mt-4 rounded-2xl border border-cyan/10 bg-deep-800/40 p-6 sm:p-7">
          <p className="text-[0.95rem] leading-[1.85] text-paper/90">
            {curator.futureDirection}
          </p>
        </div>
      </div>

      {/* Ask Me About */}
      <div className="mt-12">
        <h2 className="museum-label text-[0.55rem] text-cyan/70">Ask Me About</h2>
        <p className="mt-2 font-hand text-xl text-paper-faint/50">
          conversation starters, if we ever meet
        </p>
        <div className="mt-4 flex flex-wrap gap-2.5">
          {curator.askMeAbout.map((topic) => (
            <span
              key={topic}
              className="cursor-default rounded-full border border-white/10 bg-deep-800/60 px-4 py-2 text-[0.8rem] text-paper-faint transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/40 hover:text-gold"
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
          className="museum-label inline-flex items-center gap-2.5 rounded-full border border-cyan/40 bg-cyan/5 px-7 py-3.5 text-[0.6rem] text-cyan transition-all duration-300 hover:bg-cyan/10 hover:shadow-[0_0_20px_rgba(0,212,255,0.15)]"
        >
          Visit the Gift Shop
          <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  );
}
