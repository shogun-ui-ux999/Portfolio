import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMuseum } from "../context/MuseumContext";
import AudioGuidePlayer from "../components/AudioGuidePlayer";

/**
 * Entrance — a quiet museum after hours.
 * First visit in a session: a cinematic lamp-turns-on intro.
 * Returning visits: the staged fade-in, plus the Curator's Welcome
 * audio guide once the recording exists.
 */
export default function Entrance() {
  const { openTour, openListView, setEntered, audioUrls } = useMuseum();
  const navigate = useNavigate();
  const [revealed, setRevealed] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [welcomeOpen, setWelcomeOpen] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setRevealed(true), 300);
    return () => window.clearTimeout(t);
  }, []);

  // Cinematic intro: once per browser session, never on reduced motion.
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem("museum-intro-seen");
    if (!reduced && !seen) {
      sessionStorage.setItem("museum-intro-seen", "1");
      setShowIntro(true);
    }
  }, []);

  const enter = useCallback(() => {
    setEntered(true);
    navigate("/bedroom");
  }, [setEntered, navigate]);

  const hasWelcome = Boolean(audioUrls.welcome);

  return (
    <section
      className={`relative flex min-h-dvh flex-col items-center justify-center px-5 py-24 text-center transition-opacity duration-1000 ${
        revealed ? "opacity-100" : "opacity-0"
      }`}
    >
      {showIntro && <CinematicIntro onDone={() => setShowIntro(false)} />}

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

      {/* Curator's Welcome — subtle, only when the recording exists */}
      {hasWelcome && !welcomeOpen && (
        <button
          type="button"
          onClick={() => setWelcomeOpen(true)}
          className="animate-fade-up museum-label mt-6 inline-flex items-center gap-2.5 rounded-full border border-paper-400/25 px-5 py-2.5 text-[0.55rem] text-paper-200 transition-colors duration-300 hover:border-amber-glow/50 hover:text-amber-glow [animation-delay:700ms]"
        >
          <span
            aria-hidden
            className="inline-block h-0 w-0 border-y-[4px] border-l-[7px] border-y-transparent border-l-current"
          />
          Listen to the Curator's Welcome
        </button>
      )}
      {hasWelcome && welcomeOpen && (
        <div className="animate-fade-up mt-6 flex w-full justify-center [animation-delay:700ms]">
          <AudioGuidePlayer
            src={audioUrls.welcome as string}
            title="The Curator's Welcome"
            variant="welcome"
          />
        </div>
      )}

      <div className="animate-fade-up mt-10 flex flex-col items-center gap-3.5 [animation-delay:850ms] sm:flex-row">
        <button
          type="button"
          onClick={enter}
          className="museum-label group inline-flex items-center gap-2.5 rounded-full border border-amber-glow/60 bg-amber-glow/10 px-7 py-3.5 text-[0.65rem] text-amber-glow transition-all duration-300 hover:bg-amber-glow/20 hover:shadow-[0_0_30px_rgba(232,163,61,0.25)]"
        >
          Enter the Bedroom
          <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">
            →
          </span>
        </button>
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

const INTRO_LINES = ["A", "n", "c", "h", "i", "t", "'", "s", " ", "M", "u", "s", "e", "u", "m"];

/**
 * CINEMATIC INTRO — the lamp turns on in a dark room.
 * Phase timing per the museum's direction; every phase is pure
 * opacity/transform/filter so it stays on the compositor. Skippable
 * by click or key; instant when reduced motion is requested.
 */
function CinematicIntro({ onDone }: { onDone: () => void }) {
  const [stage, setStage] = useState(0);
  const navigate = useNavigate();
  const { setEntered } = useMuseum();

  useEffect(() => {
    const timers = [
      window.setTimeout(() => setStage(1), 900),
      window.setTimeout(() => setStage(2), 1900),
      window.setTimeout(() => setStage(3), 2900),
      window.setTimeout(() => setStage(4), 3800),
    ];
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, []);

  const finish = useCallback(() => {
    sessionStorage.setItem("museum-intro-seen", "1");
    onDone();
  }, [onDone]);

  const enterNow = useCallback(() => {
    finish();
    setEntered(true);
    navigate("/bedroom");
  }, [finish, setEntered, navigate]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter") enterNow();
      if (e.key === "Escape" || e.key === " ") finish();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [enterNow, finish]);

  return (
    <div
      className="fixed inset-0 z-[120] flex flex-col items-center justify-center bg-night-950"
      onClick={finish}
      role="presentation"
    >
      {/* The lamp: a dot that blooms into the room's glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-glow transition-all duration-[1400ms] ease-out"
        style={{
          opacity: stage >= 1 ? 1 : 0,
          boxShadow: "0 0 60px 30px rgba(232,163,61,0.45), 0 0 220px 140px rgba(232,163,61,0.16)",
          transform: `translate(-50%, -50%) scale(${stage >= 1 ? 1 : 0.2})`,
        }}
      />

      {/* Title — letters materialize */}
      {stage >= 2 && (
        <h1 className="relative flex flex-wrap justify-center px-4 font-serif text-5xl text-paper-50 sm:text-7xl" aria-label="Anchit's Museum">
          {INTRO_LINES.map((ch, i) => (
            <span
              key={i}
              aria-hidden
              className="animate-intro-letter inline-block"
              style={{ animationDelay: `${i * 55}ms` }}
            >
              {ch === " " ? "\u00A0" : ch}
            </span>
          ))}
        </h1>
      )}

      {stage >= 3 && (
        <p className="animate-fade-up relative mt-6 max-w-xl px-6 text-center text-sm leading-relaxed text-paper-200/80 sm:text-base">
          A self-guided tour of my work, failures, curiosity, and the gap year
          that changed everything.
        </p>
      )}

      {stage >= 4 && (
        <>
          <p className="animate-fade-up relative mt-5 font-hand text-2xl text-amber-glow/90">
            Please touch the artifacts.
          </p>
          <button
            type="button"
            onClick={enterNow}
            className="animate-pulse-glow museum-label relative mt-9 rounded-full border border-amber-glow/60 bg-amber-glow/10 px-7 py-3.5 text-[0.65rem] text-amber-glow"
          >
            Enter the Bedroom
          </button>
          <button
            type="button"
            onClick={finish}
            className="museum-label relative mt-6 text-[0.5rem] text-paper-300/40 hover:text-paper-200"
          >
            Skip intro
          </button>
        </>
      )}
    </div>
  );
}
