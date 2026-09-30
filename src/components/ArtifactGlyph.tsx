/**
 * Stylized CSS-only object illustrations for each artifact.
 * No images — everything drawn with divs, gradients, and shadows
 * using the deep-space museum palette (cyan / magenta / gold).
 */
export default function ArtifactGlyph({
  id,
  className = "",
}: {
  id: string;
  className?: string;
}) {
  return <Glyph id={id} className={className} />;
}

function Glyph({ id, className }: { id: string; className: string }) {
  switch (id) {
    case "laptop":
      return (
        <div className={`relative ${className}`}>
          {/* screen glow */}
          <div
            aria-hidden
            className="animate-screen-flicker absolute -inset-4 rounded-full bg-cyan/10 blur-xl"
          />
          <div className="relative mx-auto h-12 w-16 rounded-t-md border border-deep-600 bg-deep-950 p-1 shadow-[0_10px_25px_rgba(0,0,0,0.6)] sm:h-14 sm:w-20">
            <div className="h-full w-full rounded-sm bg-gradient-to-br from-cyan/60 via-cyan-deep/40 to-deep-800">
              <div className="mt-1 ml-1 h-1 w-6 rounded-full bg-paper/50" />
              <div className="mt-1 ml-1 h-1 w-4 rounded-full bg-paper/30" />
              <div className="mt-1 ml-1 h-1 w-5 rounded-full bg-gold/40" />
            </div>
          </div>
          <div className="relative mx-auto h-1.5 w-20 rounded-b-md border-x border-b border-deep-600 bg-deep-700 sm:w-24" />
          {/* stickers */}
          <div aria-hidden className="absolute -top-1 left-2 h-2 w-2 rounded-full bg-magenta/70" />
          <div aria-hidden className="absolute -top-1.5 right-3 h-2.5 w-2.5 rounded-full bg-gold/70" />
          <div aria-hidden className="absolute top-1 -left-1 h-1.5 w-1.5 rounded-full bg-cyan/70" />
        </div>
      );

    case "notebook":
      return (
        <div
          className={`animate-page-flutter relative h-14 w-11 rounded-sm border border-paper/40 bg-paper/80 shadow-[0_8px_20px_rgba(0,0,0,0.55)] sm:h-16 sm:w-12 ${className}`}
          style={{ transform: "rotate(-2deg)" }}
        >
          <div aria-hidden className="absolute inset-x-0 top-0 flex justify-around">
            {Array.from({ length: 4 }).map((_, i) => (
              <span key={i} className="h-1.5 w-px bg-deep-900/60" />
            ))}
          </div>
          <div className="mt-2.5 space-y-1.5 px-1.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-px bg-deep-900/25" style={{ width: `${90 - i * 9}%` }} />
            ))}
          </div>
          <div aria-hidden className="absolute right-0.5 bottom-1.5 h-3 w-3 rounded-full border-2 border-gold/30" />
          <div aria-hidden className="absolute -right-2 top-3 h-4 w-6 -rotate-6 bg-gold/70 shadow-sm" />
        </div>
      );

    case "certificates":
      return (
        <div className={`animate-breathe relative h-14 w-16 sm:h-16 sm:w-20 ${className}`}>
          <div aria-hidden className="absolute bottom-0 left-0 h-10 w-14 rotate-[-5deg] rounded-sm border border-paper/50 bg-paper/60 shadow-md" />
          <div aria-hidden className="absolute bottom-0.5 left-1 h-10 w-14 rotate-[2deg] rounded-sm border border-paper/60 bg-paper/70 shadow-md" />
          <div className="absolute bottom-1 left-2 h-10 w-14 rotate-[-1deg] rounded-sm border border-gold/40 bg-paper/50 p-1.5 shadow-lg">
            <div className="mx-auto h-1 w-8 rounded-full bg-gold/60" />
            <div className="mt-1.5 h-0.5 w-9 bg-deep-900/30" />
            <div className="mt-1 h-0.5 w-7 bg-deep-900/20" />
            <div aria-hidden className="mt-1.5 flex justify-end">
              <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-deep-900/60 text-[0.45rem] text-deep-900">✓</span>
            </div>
          </div>
        </div>
      );

    case "broken-code":
      return (
        <div
          className={`relative h-14 w-[4.5rem] rounded-sm border border-deep-600 bg-deep-950 p-1.5 font-mono shadow-[0_10px_25px_rgba(0,0,0,0.6)] sm:h-16 sm:w-20 ${className}`}
          style={{ transform: "rotate(1.5deg)" }}
        >
          <div className="space-y-1">
            {["✕ err", "✕ Error:", "✕ undef", "✕ fail", "✕ …"].map((t, i) => (
              <div key={i} className="truncate text-[0.4rem] leading-none text-magenta/80">
                {t}
              </div>
            ))}
          </div>
          <div aria-hidden className="absolute -inset-3 rounded bg-magenta/5 blur-lg" />
        </div>
      );

    case "chessboard":
      return (
        <div
          className={`relative rounded-sm border border-deep-600 bg-deep-800 p-1 shadow-[0_12px_28px_rgba(0,0,0,0.6)] ${className}`}
          style={{ transform: "rotate(-3deg)" }}
        >
          <div className="grid grid-cols-4 gap-px">
            {Array.from({ length: 16 }).map((_, i) => {
              const dark = (Math.floor(i / 4) + i) % 2 === 0;
              return (
                <span
                  key={i}
                  className={`h-3 w-3 sm:h-3.5 sm:w-3.5 ${dark ? "bg-deep-950" : "bg-paper/70"}`}
                />
              );
            })}
          </div>
        </div>
      );

    case "gap-year":
      return (
        <div
          className={`relative h-14 w-14 rounded-sm border border-paper/40 bg-paper/80 p-1.5 shadow-[0_8px_20px_rgba(0,0,0,0.55)] sm:h-16 sm:w-16 ${className}`}
        >
          <div className="h-2.5 w-full rounded-sm bg-magenta/20" />
          <div className="mt-1.5 grid grid-cols-7 gap-0.5">
            {Array.from({ length: 21 }).map((_, i) => (
              <span key={i} className="h-1 w-1 rounded-[1px] bg-deep-900/30" />
            ))}
          </div>
          <div aria-hidden className="absolute top-6 left-5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-magenta animate-date-pulse">
            <span className="font-hand text-[0.55rem] leading-none text-magenta">16</span>
          </div>
          <div aria-hidden className="absolute -right-3 -bottom-2 w-12 rotate-[-8deg] rounded-sm bg-gold px-1 py-0.5 text-center font-hand text-[0.6rem] leading-none text-deep-950 shadow animate-sway">
            my year →
          </div>
        </div>
      );

    case "mobile":
      return (
        <div className={`relative ${className}`}>
          <div
            className="relative h-16 w-8 rounded-lg border border-deep-600 bg-deep-950 p-0.5 shadow-[0_10px_25px_rgba(0,0,0,0.6)] sm:h-[4.5rem] sm:w-9"
            style={{ transform: "rotate(4deg)" }}
          >
            <div className="h-full w-full overflow-hidden rounded-md bg-gradient-to-b from-cyan/30 to-deep-800">
              <div className="mt-2 ml-1 h-0.5 w-4 rounded-full bg-paper/40" />
              <div className="mt-1 ml-1 h-0.5 w-3 rounded-full bg-paper/25" />
              <div className="mt-1 ml-1 h-0.5 w-4 rounded-full bg-gold/30" />
            </div>
            <div aria-hidden className="absolute inset-x-1.5 top-1 h-0.5 rounded-full bg-deep-700" />
            {/* notification glow */}
            <div aria-hidden className="animate-phone-glow absolute inset-0 rounded-md bg-cyan/30" />
            {/* crack */}
            <svg aria-hidden className="absolute inset-0 h-full w-full" viewBox="0 0 32 64">
              <polyline
                points="20,2 14,18 22,30 12,44 18,62"
                fill="none"
                stroke="rgba(232,228,216,0.3)"
                strokeWidth="0.8"
              />
            </svg>
          </div>
          <div aria-hidden className="absolute -inset-3 rounded-full bg-cyan/10 blur-lg" />
        </div>
      );

    case "drawer-letter":
      return (
        <div className={`relative ${className}`}>
          <div
            className="relative h-11 w-20 rounded-sm border border-deep-600 bg-gradient-to-b from-deep-700 to-deep-800 shadow-[inset_0_1px_0_rgba(232,228,216,0.06),0_10px_22px_rgba(0,0,0,0.6)] sm:w-24"
          >
            <div aria-hidden className="absolute top-1/2 left-1/2 h-1 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/60 shadow-[0_0_6px_rgba(240,192,64,0.3)]" />
            {/* paper peeking out */}
            <div
              aria-hidden
              className="absolute -top-2 left-3 h-5 w-6 rotate-[-6deg] rounded-[1px] border border-paper/60 bg-paper/70 shadow"
            >
              <div className="mt-1 ml-0.5 h-px w-3.5 bg-deep-900/40" />
              <div className="mt-1 ml-0.5 h-px w-2.5 bg-deep-900/30" />
            </div>
          </div>
        </div>
      );

    case "bracelet":
      return (
        <div className={`relative flex h-9 w-14 items-center justify-center sm:h-10 sm:w-16 ${className}`}>
          <div
            aria-hidden
            className="absolute h-8 w-8 rounded-full border-[3.5px] border-dashed border-gold/80 shadow-[0_4px_12px_rgba(0,0,0,0.5)] sm:h-9 sm:w-9"
          />
          <div aria-hidden className="absolute h-8 w-8 rotate-45 rounded-full border border-paper/20 sm:h-9 sm:w-9" />
        </div>
      );

    case "fail-rebellious":
      return (
        <div
          className={`relative h-14 w-16 rounded-sm border border-paper/30 bg-paper/70 p-2 shadow-[0_10px_24px_rgba(0,0,0,0.6)] sm:w-20 ${className}`}
          style={{ transform: "rotate(2deg)" }}
        >
          <div className="space-y-1.5">
            {[80, 65, 72].map((w, i) => (
              <div key={i} className="h-px bg-deep-900/30" style={{ width: `${w}%` }} />
            ))}
          </div>
          <span aria-hidden className="absolute inset-0 flex items-center justify-center text-2xl leading-none text-magenta/60">
            ✕
          </span>
        </div>
      );

    case "fail-dream-app":
      return (
        <div className={`relative ${className}`}>
          <div
            className="relative h-14 w-16 rounded-sm border border-dashed border-paper/40 bg-deep-800 p-1.5 shadow-[0_10px_24px_rgba(0,0,0,0.6)] sm:w-20"
            style={{ transform: "rotate(-2deg)" }}
          >
            <div className="flex gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-magenta/50" />
              <span className="h-1.5 w-1.5 rounded-full bg-paper/30" />
              <span className="h-1.5 w-1.5 rounded-full bg-paper/30" />
            </div>
            <div className="mt-1.5 h-2 rounded-sm bg-paper/10" />
            <div className="mt-1 grid grid-cols-3 gap-1">
              <span className="h-2.5 rounded-sm bg-paper/10" />
              <span className="h-2.5 rounded-sm bg-paper/10" />
              <span className="h-2.5 rounded-sm bg-paper/10" />
            </div>
          </div>
          <span
            aria-hidden
            className="absolute inset-0 flex rotate-[-14deg] items-center justify-center rounded-sm border-2 border-magenta/70 text-[0.55rem] font-bold tracking-[0.25em] text-magenta/80"
          >
            CANCELLED
          </span>
        </div>
      );

    case "fail-screen-time":
      return (
        <div
          className={`relative h-14 w-16 rounded-sm border border-cyan/25 bg-deep-950 p-2 shadow-[0_10px_24px_rgba(0,0,0,0.6)] sm:w-20 ${className}`}
          style={{ transform: "rotate(1deg)" }}
        >
          <div className="flex h-full items-end justify-between gap-1">
            {[35, 55, 45, 90, 65].map((h, i) => (
              <span
                key={i}
                className="w-1.5 rounded-t-sm bg-gradient-to-t from-cyan-deep to-cyan/80"
                style={{ height: `${h}%`, boxShadow: i === 3 ? "0 0 8px rgba(0,212,255,0.5)" : undefined }}
              />
            ))}
          </div>
          <span className="museum-label absolute -top-2 right-1 bg-deep-900 px-1 text-[0.4rem] text-cyan/60">
            9h
          </span>
          <div aria-hidden className="absolute -inset-2 rounded bg-cyan/5 blur-lg" />
        </div>
      );

    default:
      return (
        <div className={`h-12 w-12 rounded-sm border border-white/10 bg-deep-700 ${className}`} />
      );
  }
}
