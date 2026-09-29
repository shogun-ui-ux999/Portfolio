import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMuseum } from "../context/MuseumContext";

/**
 * Entrance — a quiet museum after hours.
 * Loads into a cinematic fade-in before revealing the invitation.
 */
export default function Entrance() {
  const { openTour, openListView, setEntered } = useMuseum();
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setRevealed(true), 300);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <section
      className={`relative flex min-h-dvh flex-col items-center justify-center px-5 py-24 text-center transition-opacity duration-1000 ${
        revealed ? "opacity-100" : "opacity-0"
        }`}
    >
      {/* Lamp glow anchor */}
      <div
        aria-hidden
        className="animate-lamp pointer-events-none absolute top-[18%] left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-amber-glow/10 blur-3xl"
      />

      <p className="museum-label animate-fade-up text-[0.6rem] text-museum-gold/80 [animation-delay:100ms]">
        Open After Hours
      </p>

      <h1 className="animate-fade-up mt-5 max-w-3xl font-serif text-5xl leading-[1.05] text-paper-50 [animation-delay:250ms] sm:text-7xl">
        Anchit's Museum
      </h1>

      <p className="animate-fade-up mt-5 max-w-xl text-base leading-relaxed text-paper-200/85 [animation-delay:450ms] sm:text-lg">
        A self-guided tour of my work, failures, curiosity, and the gap year that
        changed everything.
      </p>

      <p className="animate-fade-up mt-4 font-hand text-2xl text-amber-glow/90 [animation-delay:650ms]">
        Please touch the artifacts.
      </p>

      <div className="animate-fade-up mt-10 flex flex-col items-center gap-3.5 [animation-delay:850ms] sm:flex-row">
        <Link
          to="/bedroom"
          onClick={() => setEntered(true)}
          className="museum-label group inline-flex items-center gap-2.5 rounded-full border border-amber-glow/60 bg-amber-glow/10 px-7 py-3.5 text-[0.65rem] text-amber-glow transition-all duration-300 hover:bg-amber-glow/20 hover:shadow-[0_0_30px_rgba(232,163,61,0.25)]"
        >
          Enter the Bedroom
          <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">
            →
          </span>
        </Link>
        <button
          type="button"
          onClick={openTour}
          className="museum-label rounded-full border border-paper-400/25 px-6 py-3.5 text-[0.6rem] text-paper-200 transition-colors duration-300 hover:border-museum-gold/50 hover:text-museum-gold"
        >
          Take the 30-Second Tour
        </button>
        <button
          type="button"
          onClick={openListView}
          className="museum-label px-2 py-3 text-[0.6rem] text-paper-300/60 underline decoration-paper-400/30 underline-offset-4 transition-colors duration-300 hover:text-paper-100"
        >
          View Artifact List
        </button>
      </div>

      <div
        aria-hidden
        className="animate-fade-in pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-night-950 to-transparent [animation-delay:1200ms]"
      />
    </section>
  );
}
