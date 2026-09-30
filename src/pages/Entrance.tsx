import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMuseum } from "../context/MuseumContext";
import AudioGuidePlayer from "../components/AudioGuidePlayer";

/**
 * ENTRANCE — the museum after the universe went dark.
 * Cinematic lamp-turns-on intro once per session; returning visitors
 * get the staged fade-in plus the Curator&apos;s Welcome if recorded.
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
      className={`relative flex min-h-dvh flex-col items-center justify-center px-5 py-28 text-center transition-opacity duration-1000 ${
        revealed ? "opacity-100" : "opacity-0"
      }`}
    >
      {showIntro && <CinematicIntro onDone={() => setShowIntro(false)} />}

      {/* Anchor glow behind the title */}
      <div
        aria-hidden
        className="absolute top-[18%] left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan/5 blur-3xl"
        style={{ filter: "blur(80px)" }}
      />

      <p className="animate-fade-up text-[0.55rem] text-cyan/70 tracking-[0.4em] uppercase [animation-delay:100ms]">
        Open After Hours
      </p>

      {/* Hero title — animated gradient text */}
      <h1 className="animate-fade-up mt-5 max-w-3xl font-display text-5xl leading-[1.05] sm:text-7xl [animation-delay:250ms]">
        <GradientTitle>Anchit&apos;s Museum</GradientTitle>
      </h1>

      <p className="animate-fade-up mt-5 max-w-xl text-base leading-relaxed text-paper/80 [animation-delay:450ms] sm:text-lg">
        A self-guided tour of my work, failures, curiosity, and the gap year that
        changed everything.
      </p>

      <p className="animate-fade-up mt-4 font-hand text-2xl text-gold/80 [animation-delay:650ms]">
        Please touch the artifacts.
      </p>

      {/* Curator&apos;s Welcome — subtle, only when the recording exists */}
      {hasWelcome && !welcomeOpen && (
        <button
          type="button"
          onClick={() => setWelcomeOpen(true)}
          className="animate-fade-up mt-6 inline-flex items-center gap-2.5 rounded-full border border-white/10 px-5 py-2.5 text-[0.55rem] text-paper-faint transition-all duration-300 hover:border-cyan/40 hover:text-cyan [animation-delay:700ms]"
        >
          <span aria-hidden className="inline-block h-0 w-0 border-y-[4px] border-l-[7px] border-y-transparent border-l-cyan/60" />
          Listen to the Curator&apos;s Welcome
        </button>
      )}
      {hasWelcome && welcomeOpen && (
        <div className="animate-fade-up mt-6 flex w-full justify-center [animation-delay:700ms]">
          <AudioGuidePlayer
            src={audioUrls.welcome as string}
            fallbackSrc="/audio/welcome.mp3"
            title="The Curator's Welcome"
            variant="welcome"
          />
        </div>
      )}

      {/* CTA buttons */}
      <div className="animate-fade-up mt-10 flex flex-col items-center gap-3.5 [animation-delay:850ms] sm:flex-row">
        <button
          type="button"
          onClick={enter}
          className="group inline-flex items-center gap-2.5 rounded-full border border-cyan/40 bg-cyan/5 px-7 py-3.5 text-[0.6rem] text-cyan transition-all duration-300 hover:bg-cyan/10 hover:shadow-[0_0_30px_rgba(0,212,255,0.2)]"
        >
          Enter the Bedroom
          <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">
            →
          </span>
        </button>
        <button
          type="button"
          onClick={openTour}
          className="museum-label rounded-full border border-white/10 px-6 py-3.5 text-[0.55rem] text-paper-faint transition-colors duration-300 hover:border-magenta/40 hover:text-magenta"
        >
          Take the 30-Second Tour
        </button>
        <button
          type="button"
          onClick={openListView}
          className="museum-label px-2 py-3 text-[0.55rem] text-paper-faint/60 hover:text-paper/80 underline decoration-white/10 underline-offset-4 transition-colors duration-300"
        >
          View Artifact List
        </button>
      </div>

      {/* Bottom fade */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-deep-950 to-transparent"
        style={{ animationDelay: "1200ms" }}
      />
    </section>
  );
}

/**
 * Animated gradient text using CSS background-clip.
 */
function GradientTitle({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-block"
      style={{
        background: "linear-gradient(135deg, #00d4ff 0%, #f0c040 40%, #ff2d78 70%, #00d4ff 100%)",
        backgroundSize: "200% 200%",
        animation: "gradientShift 6s ease infinite",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      {children}
    </span>
  );
}

const INTRO_LETTERS = "ANCHIT'S MUSEUM".split("");

/**
 * CINEMATIC INTRO — the museum powers on in the dark.
 * Pure opacity/transform/filter animations. Skippable; instant under
 * reduced motion.
 */
function CinematicIntro({ onDone }: { onDone: () => void }) {
  const [stage, setStage] = useState(0);
  const navigate = useNavigate();
  const { setEntered } = useMuseum();

  useEffect(() => {
    const timers = [
      window.setTimeout(() => setStage(1), 800),
      window.setTimeout(() => setStage(2), 1700),
      window.setTimeout(() => setStage(3), 2700),
      window.setTimeout(() => setStage(4), 3600),
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
      className="fixed inset-0 z-[120] flex flex-col items-center justify-center bg-deep-950"
      onClick={finish}
      role="presentation"
    >
      {/* Power-on glow */}
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-[1400ms] ease-out"
        style={{
          opacity: stage >= 1 ? 1 : 0,
          boxShadow: "0 0 60px 30px rgba(0,212,255,0.4), 0 0 200px 120px rgba(0,212,255,0.12)",
          transform: `translate(-50%, -50%) scale(${stage >= 1 ? 1 : 0.2})`,
          background: "rgba(0,212,255,0.8)",
        }}
      />

      {/* Title letters materialize */}
      {stage >= 2 && (
        <h1
          className="relative flex flex-wrap justify-center px-4 font-display text-5xl text-paper sm:text-7xl"
          aria-label="Anchit's Museum"
        >
          {INTRO_LETTERS.map((ch, i) => (
            <span
              key={i}
              aria-hidden
              className="animate-intro-letter inline-block"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              {ch === " " ? "\u00A0" : ch}
            </span>
          ))}
        </h1>
      )}

      {stage >= 3 && (
        <p className="animate-fade-up relative mt-6 max-w-xl px-6 text-center text-sm leading-relaxed text-paper/75 sm:text-base">
          A self-guided tour of my work, failures, curiosity, and the gap year that
          changed everything.
        </p>
      )}

      {stage >= 4 && (
        <>
          <p className="animate-fade-up relative mt-5 font-hand text-2xl text-gold/80">
            Please touch the artifacts.
          </p>
          <button
            type="button"
            onClick={enterNow}
            className="animate-pulse-glow-cyan museum-label relative mt-9 rounded-full border border-cyan/50 bg-cyan/10 px-7 py-3.5 text-[0.6rem] text-cyan"
          >
            Enter the Bedroom
          </button>
          <button
            type="button"
            onClick={finish}
            className="museum-label relative mt-6 text-[0.5rem] text-paper-faint/40 hover:text-paper/70"
          >
            Skip intro
          </button>
        </>
      )}
    </div>
  );
}
