import { useCallback, useEffect, useState } from "react";
import { useMuseum } from "../context/MuseumContext";
import { bedroomArtifacts, getArtifact } from "../data/artifacts";
import ArtifactImage from "../components/ArtifactImage";
import { DustMotes, GoldenRain, useKonamiCode } from "../components/motion";

/** Entrance order for the room's staggered reveal. */
const REVEAL_ORDER = [
  "laptop",
  "notebook",
  "certificates",
  "chessboard",
  "mobile",
  "gap-year",
  "broken-code",
  "bracelet",
  "drawer-letter",
];

/** The Bedroom — the main interactive space. A stylized late-night room. */
export default function Bedroom() {
  const { viewedIds, openListView, openTour } = useMuseum();
  const [hint, setHint] = useState<string | null>(null);
  const [entered, setEntered] = useState(false);
  const [konami, setKonami] = useState(false);
  const [celebrate, setCelebrate] = useState(false);

  const bedroom = bedroomArtifacts;
  const viewed = bedroom.filter((a) => viewedIds.has(a.id)).length;
  const complete = viewed === bedroom.length;

  useEffect(() => {
    const prev = document.title;
    document.title = "The Bedroom — Anchit's Museum";
    const t = window.setTimeout(() => setEntered(true), 120);
    return () => {
      document.title = prev;
      window.clearTimeout(t);
    };
  }, []);

  // All nine viewed: everything glows once, softly.
  useEffect(() => {
    if (!complete) return;
    setCelebrate(true);
    const t = window.setTimeout(() => setCelebrate(false), 2400);
    return () => window.clearTimeout(t);
  }, [complete]);

  useKonamiCode(
    useCallback(() => {
      setKonami(true);
      window.setTimeout(() => setKonami(false), 4200);
    }, []),
  );

  const revealDelay = useCallback(
    (id: string) => {
      const index = REVEAL_ORDER.indexOf(id);
      return entered ? Math.max(0, index) * 200 : 0;
    },
    [entered],
  );

  return (
    <section className="relative mx-auto min-h-dvh max-w-6xl px-4 pt-24 pb-28 sm:px-6">
      <GoldenRain active={konami} />

      {/* Header */}
      <div className="text-center">
        <p className="museum-label animate-fade-up text-[0.6rem] text-museum-gold/80">
          The Main Wing
        </p>
        <h1 className="animate-fade-up mt-3 font-serif text-4xl text-paper-50 [animation-delay:120ms] sm:text-5xl">
          The Bedroom
        </h1>
        <p className="animate-fade-up mx-auto mt-3 max-w-md text-sm leading-relaxed text-paper-300/75 [animation-delay:240ms]">
          A late-night workspace. Click any object to read its plaque.
        </p>

        {/* Progress tracker — amber fill, gold celebration at 9/9 */}
        <div className="animate-fade-up mx-auto mt-5 max-w-xs [animation-delay:340ms]">
          <p className="museum-label text-[0.6rem] text-amber-glow/90" aria-live="polite">
            Artifacts viewed: {viewed} / {bedroom.length}
          </p>
          <div className="mt-2 h-1 overflow-hidden rounded-full bg-paper-400/15">
            <div
              className={`h-full rounded-full transition-all duration-700 ease-out ${
                complete ? "animate-pulse-glow bg-museum-gold" : "bg-amber-glow/80"
              }`}
              style={{ width: `${(viewed / bedroom.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="animate-fade-up mt-4 flex flex-wrap items-center justify-center gap-3 [animation-delay:420ms]">
          <button
            type="button"
            onClick={openTour}
            className="museum-label min-h-[44px] rounded-full border border-amber-glow/50 bg-amber-glow/10 px-5 py-2.5 text-[0.55rem] text-amber-glow transition-colors hover:bg-amber-glow/20"
          >
            Take the 30-Second Tour
          </button>
          <button
            type="button"
            onClick={openListView}
            className="museum-label min-h-[44px] rounded-full border border-paper-400/25 px-5 py-2.5 text-[0.55rem] text-paper-300 transition-colors hover:border-museum-gold/40 hover:text-museum-gold"
          >
            Prefer a list view?
          </button>
        </div>
      </div>

      {/* ── THE ROOM ── */}
      <div className="relative mt-12 hidden h-[560px] overflow-hidden rounded-3xl border border-paper-400/15 bg-night-950 shadow-[inset_0_0_120px_rgba(0,0,0,0.75),0_30px_80px_rgba(0,0,0,0.6)] sm:block">
        {/* Room lighting */}
        <div
          aria-hidden
          className="animate-lamp pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 42% 38% at 50% 30%, rgba(232,163,61,0.16), transparent 70%), radial-gradient(ellipse 30% 25% at 30% 34%, rgba(127,180,217,0.10), transparent 70%)",
          }}
        />
        {/* Dust motes in the lamp light */}
        <DustMotes count={18} />
        {/* Collection-complete: the whole room glows softly, once */}
        {celebrate && (
          <div
            aria-hidden
            className="animate-pulse-glow pointer-events-none absolute inset-0 bg-amber-glow/5"
          />
        )}
        {/* Vignette */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 75% 70% at 50% 45%, transparent 55%, rgba(14,11,8,0.55) 100%)",
          }}
        />
        {/* Floor */}
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-[26%] bg-gradient-to-t from-night-800/80 to-transparent" />

        {/* Wall artifacts */}
        <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-center gap-12 px-6 pt-8 sm:gap-24 sm:pt-10">
          <RoomArtifact id="gap-year" setHint={setHint} delayMs={revealDelay("gap-year")} />
          <RoomArtifact id="broken-code" setHint={setHint} delayMs={revealDelay("broken-code")} />
        </div>

        {/* Shelf */}
        <div className="absolute top-[34%] left-[7%] z-10 w-28 sm:left-[9%] sm:w-36">
          <RoomArtifact id="certificates" setHint={setHint} delayMs={revealDelay("certificates")} />
          <div aria-hidden className="animate-drop-in mt-1 h-1.5 w-full rounded-b-sm bg-night-600/90 shadow-lg" style={{ animationDelay: `${revealDelay("certificates")}ms` }} />
        </div>

        {/* Desk */}
        <div className="absolute inset-x-0 bottom-[24%] z-20 px-6 sm:px-12">
          <div className="relative mx-auto max-w-3xl">
            <div
              aria-hidden
              className="animate-lamp-breathe pointer-events-none absolute -top-8 left-1/2 h-40 w-72 -translate-x-1/2 rounded-full bg-amber-glow/10 blur-3xl"
            />
            <div className="relative flex flex-wrap items-end justify-center gap-6 sm:gap-10">
              <RoomArtifact id="laptop" setHint={setHint} delayMs={revealDelay("laptop")} />
              <RoomArtifact id="notebook" setHint={setHint} delayMs={revealDelay("notebook")} />
              <RoomArtifact id="bracelet" setHint={setHint} delayMs={revealDelay("bracelet")} />
              <RoomArtifact id="drawer-letter" setHint={setHint} delayMs={revealDelay("drawer-letter")} />
            </div>
            <div aria-hidden className="mt-1 h-2 rounded-b-lg bg-gradient-to-b from-night-600 to-night-700 shadow-[0_16px_40px_rgba(0,0,0,0.7)]" />
          </div>
        </div>

        {/* Floor: chessboard */}
        <div className="absolute bottom-[4%] left-[8%] z-10 sm:left-[15%]">
          <RoomArtifact id="chessboard" setHint={setHint} delayMs={revealDelay("chessboard")} />
        </div>

        {/* Nightstand */}
        <div className="absolute right-[7%] bottom-[22%] z-10 sm:right-[11%]">
          <div className="flex flex-col items-center">
            <RoomArtifact id="mobile" setHint={setHint} delayMs={revealDelay("mobile")} />
            <div aria-hidden className="mt-0.5 h-8 w-14 rounded-b-lg border-x border-b border-night-600 bg-night-700/80 sm:w-16" />
          </div>
        </div>
      </div>

      {/* ── COMPACT ROOM (mobile) ── */}
      <div className="mt-10 sm:hidden">
        <p className="museum-label animate-fade-up text-center text-[0.55rem] text-paper-300/50">
          Tap an object to read its plaque
        </p>
        <ul className="mt-5 grid grid-cols-2 gap-3">
          {bedroom.map((a) => (
            <li key={a.id} className="animate-fade-up" style={{ animationDelay: `${revealDelay(a.id)}ms` }}>
              <RoomArtifact id={a.id} setHint={setHint} compact />
            </li>
          ))}
        </ul>
        <div className="animate-fade-up mt-6 rounded-2xl border border-paper-400/15 bg-night-800/40 p-5 text-center [animation-delay:500ms]">
          <p className="text-sm leading-relaxed text-paper-300/75">
            Prefer the full room? It opens best on a larger screen — the list view has everything.
          </p>
          <button
            type="button"
            onClick={openListView}
            className="museum-label mt-4 min-h-[44px] w-full rounded-full border border-amber-glow/50 bg-amber-glow/10 px-5 py-3 text-[0.6rem] text-amber-glow"
          >
            Explore in List View
          </button>
        </div>
      </div>

      {/* Handwritten hint bubble */}
      {hint && (
        <p
          aria-hidden
          className="animate-fade-up pointer-events-none fixed bottom-6 left-1/2 z-40 -translate-x-1/2 rounded-full border border-museum-gold/30 bg-night-800/95 px-5 py-2.5 font-hand text-lg whitespace-nowrap text-amber-glow/90 shadow-xl backdrop-blur-sm"
        >
          {hint}
        </p>
      )}
    </section>
  );
}

/** A clickable object in the room. Always a real <button>, ≥44px touch. */
function RoomArtifact({
  id,
  setHint,
  compact = false,
  delayMs = 0,
}: {
  id: string;
  setHint: (h: string | null) => void;
  compact?: boolean;
  delayMs?: number;
}) {
  const { openArtifact, viewedIds } = useMuseum();
  const artifact = getArtifact(id);
  if (!artifact) return null;
  const isViewed = viewedIds.has(id);
  const hintText = getHintText(id);

  return (
    <button
      type="button"
      onClick={() => openArtifact(id)}
      onMouseEnter={() => setHint(hintText)}
      onMouseLeave={() => setHint(null)}
      onFocus={() => setHint(hintText)}
      onBlur={() => setHint(null)}
      aria-label={`${artifact.title} — ${artifact.objectName}. Open exhibit plaque.`}
      style={delayMs ? { animationDelay: `${delayMs}ms` } : undefined}
      className={`group relative min-h-[44px] min-w-[44px] rounded-xl outline-offset-4 transition-all duration-300 hover:z-30 hover:scale-105 hover:brightness-110 focus-visible:z-30 focus-visible:scale-105 active:scale-95 ${
        compact
          ? "flex w-full flex-col items-center gap-2 border border-paper-400/15 bg-night-800/60 p-3"
          : "animate-drop-in"
      }`}
    >
      {/* Warm amber halo on hover — the object steps into the light */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-3 rounded-2xl bg-amber-glow/0 blur-lg transition-all duration-300 group-hover:bg-amber-glow/15"
      />
      <ArtifactImage id={id} />
      <span
        className={
          compact
            ? "block text-center text-xs leading-snug text-paper-300/80"
            : "pointer-events-none absolute top-full left-1/2 -translate-x-1/2 pt-1.5 text-center font-hand text-base whitespace-nowrap text-amber-glow/0 transition-all duration-300 group-hover:text-amber-glow/90 group-focus-visible:text-amber-glow/90"
        }
      >
        {compact ? artifact.title : getAnnotation(id)}
      </span>
      {isViewed && !compact && (
        <span
          aria-hidden
          className="animate-scale-in absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-museum-gold text-[0.55rem] text-night-900 shadow"
        >
          ✓
        </span>
      )}
    </button>
  );
}

function getAnnotation(id: string): string {
  switch (id) {
    case "laptop":
      return "late-night terminal";
    case "notebook":
      return "AI + biology blueprint";
    case "certificates":
      return "proof of independent study";
    case "broken-code":
      return "the first 100 errors";
    case "chessboard":
      return "64 squares of logic";
    case "gap-year":
      return "the age 16 pivot";
    case "mobile":
      return "the hustle screen";
    case "drawer-letter":
      return "hidden";
    case "bracelet":
      return "quiet sacrifices";
    default:
      return "";
  }
}

function getHintText(id: string): string | null {
  if (id === "drawer-letter") return "Something old is hidden here.";
  if (id === "bracelet") return "A quiet sacrifice.";
  return null;
}
