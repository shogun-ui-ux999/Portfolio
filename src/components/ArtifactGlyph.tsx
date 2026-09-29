/**
 * Stylized CSS-only object illustrations for each artifact.
 * No images — everything drawn with divs, gradients, and shadows
 * so the room stays lightweight.
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
            className="absolute -inset-4 rounded-full bg-screen/20 blur-xl"
          />
          <div className="relative mx-auto h-12 w-16 rounded-t-md border border-night-600 bg-night-950 p-1 shadow-[0_10px_25px_rgba(0,0,0,0.6)] sm:h-14 sm:w-20">
            <div className="h-full w-full rounded-sm bg-gradient-to-br from-screen/70 via-screen-dim/50 to-night-800">
              <div className="mt-1 ml-1 h-1 w-6 rounded-full bg-paper-50/60" />
              <div className="mt-1 ml-1 h-1 w-4 rounded-full bg-paper-50/30" />
              <div className="mt-1 ml-1 h-1 w-5 rounded-full bg-amber-glow/50" />
            </div>
          </div>
          <div className="relative mx-auto h-1.5 w-20 rounded-b-md border-x border-b border-night-600 bg-night-700 sm:w-24" />
          {/* stickers */}
          <div aria-hidden className="absolute -top-1 left-2 h-2 w-2 rounded-full bg-fail-red/80" />
          <div aria-hidden className="absolute -top-1.5 right-3 h-2.5 w-2.5 rounded-full bg-museum-gold/80" />
          <div aria-hidden className="absolute top-1 -left-1 h-1.5 w-1.5 rounded-full bg-screen/80" />
        </div>
      );

    case "notebook":
      return (
        <div
          className={`relative h-14 w-11 rounded-sm border border-paper-400/40 bg-paper-100 shadow-[0_8px_20px_rgba(0,0,0,0.55)] sm:h-16 sm:w-12 ${className}`}
          style={{ transform: "rotate(-2deg)" }}
        >
          <div aria-hidden className="absolute inset-x-0 top-0 flex justify-around">
            {Array.from({ length: 4 }).map((_, i) => (
              <span key={i} className="h-1.5 w-px bg-night-800/60" />
            ))}
          </div>
          <div className="mt-2.5 space-y-1.5 px-1.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-px bg-night-800/25" style={{ width: `${90 - i * 9}%` }} />
            ))}
          </div>
          <div aria-hidden className="absolute right-0.5 bottom-1.5 h-3 w-3 rounded-full border-2 border-amber-deep/40" />
          <div aria-hidden className="absolute -right-2 top-3 h-4 w-6 -rotate-6 bg-amber-glow/80 shadow-sm" />
        </div>
      );

    case "certificates":
      return (
        <div className={`relative h-13 w-16 sm:h-15 sm:w-18 ${className}`}>
          <div aria-hidden className="absolute bottom-0 left-0 h-10 w-14 rotate-[-5deg] rounded-sm border border-paper-400/50 bg-paper-300 shadow-md" />
          <div aria-hidden className="absolute bottom-0.5 left-1 h-10 w-14 rotate-[2deg] rounded-sm border border-paper-400/60 bg-paper-200 shadow-md" />
          <div className="absolute bottom-1 left-2 h-10 w-14 rotate-[-1deg] rounded-sm border border-museum-gold/50 bg-paper-50 p-1.5 shadow-lg">
            <div className="mx-auto h-1 w-8 rounded-full bg-museum-gold/70" />
            <div className="mt-1.5 h-0.5 w-9 bg-night-800/30" />
            <div className="mt-1 h-0.5 w-7 bg-night-800/20" />
            <div aria-hidden className="mt-1.5 flex justify-end">
              <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-emerald-800/60 text-[0.45rem] text-emerald-800">✓</span>
            </div>
          </div>
        </div>
      );

    case "broken-code":
      return (
        <div
          className={`relative h-14 w-[4.5rem] rounded-sm border border-night-600 bg-night-950 p-1.5 font-mono shadow-[0_10px_25px_rgba(0,0,0,0.6)] sm:h-16 sm:w-20 ${className}`}
          style={{ transform: "rotate(1.5deg)" }}
        >
          <div className="space-y-1">
            {["✕ err", "✕ Error:", "✕ undef", "✕ fail", "✕ …"].map((t, i) => (
              <div key={i} className="truncate text-[0.4rem] leading-none text-fail-red/90">
                {t}
              </div>
            ))}
          </div>
          <div aria-hidden className="absolute -inset-3 rounded bg-fail-red/10 blur-lg" />
        </div>
      );

    case "chessboard":
      return (
        <div
          className={`relative rounded-sm border border-night-600 bg-night-800 p-1 shadow-[0_12px_28px_rgba(0,0,0,0.6)] ${className}`}
          style={{ transform: "rotate(-3deg)" }}
        >
          <div className="grid grid-cols-4 gap-px">
            {Array.from({ length: 16 }).map((_, i) => {
              const dark = (Math.floor(i / 4) + i) % 2 === 0;
              return (
                <span
                  key={i}
                  className={`h-3 w-3 sm:h-3.5 sm:w-3.5 ${dark ? "bg-night-950" : "bg-paper-300/80"}`}
                />
              );
            })}
          </div>
        </div>
      );

    case "gap-year":
      return (
        <div
          className={`relative h-14 w-14 rounded-sm border border-paper-400/40 bg-paper-100 p-1.5 shadow-[0_8px_20px_rgba(0,0,0,0.55)] sm:h-16 sm:w-16 ${className}`}
        >
          <div className="h-2.5 w-full rounded-sm bg-fail-red/25" />
          <div className="mt-1.5 grid grid-cols-7 gap-0.5">
            {Array.from({ length: 21 }).map((_, i) => (
              <span key={i} className="h-1 w-1 rounded-[1px] bg-night-800/30" />
            ))}
          </div>
          <div aria-hidden className="absolute top-6 left-5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-fail-red">
            <span className="font-hand text-[0.55rem] leading-none text-fail-red">16</span>
          </div>
          <div aria-hidden className="absolute -right-3 -bottom-2 w-12 rotate-[-8deg] rounded-sm bg-amber-glow px-1 py-0.5 text-center font-hand text-[0.6rem] leading-none text-night-900 shadow">
            my year →
          </div>
        </div>
      );

    case "mobile":
      return (
        <div className={`relative ${className}`}>
          <div
            className="relative h-16 w-8 rounded-lg border border-night-600 bg-night-950 p-0.5 shadow-[0_10px_25px_rgba(0,0,0,0.6)] sm:h-18 sm:w-9"
            style={{ transform: "rotate(4deg)" }}
          >
            <div className="h-full w-full overflow-hidden rounded-md bg-gradient-to-b from-screen/40 to-night-800">
              <div className="mt-2 ml-1 h-0.5 w-4 rounded-full bg-paper-50/50" />
              <div className="mt-1 ml-1 h-0.5 w-3 rounded-full bg-paper-50/30" />
              <div className="mt-1 ml-1 h-0.5 w-4 rounded-full bg-amber-glow/40" />
            </div>
            <div aria-hidden className="absolute inset-x-1.5 top-1 h-0.5 rounded-full bg-night-700" />
            {/* crack */}
            <svg aria-hidden className="absolute inset-0 h-full w-full" viewBox="0 0 32 64">
              <polyline
                points="20,2 14,18 22,30 12,44 18,62"
                fill="none"
                stroke="rgba(245,238,218,0.35)"
                strokeWidth="0.8"
              />
            </svg>
          </div>
          <div aria-hidden className="absolute -inset-3 rounded-full bg-screen/15 blur-lg" />
        </div>
      );

    case "drawer-letter":
      return (
        <div className={`relative ${className}`}>
          <div
            className="relative h-11 w-20 rounded-sm border border-night-600 bg-gradient-to-b from-night-700 to-night-800 shadow-[inset_0_1px_0_rgba(245,238,218,0.08),0_10px_22px_rgba(0,0,0,0.6)] sm:w-24"
          >
            <div aria-hidden className="absolute top-1/2 left-1/2 h-1 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-museum-gold/70 shadow-[0_0_6px_rgba(201,161,92,0.4)]" />
            {/* paper peeking out */}
            <div
              aria-hidden
              className="absolute -top-2 left-3 h-5 w-6 rotate-[-6deg] rounded-[1px] border border-paper-400/60 bg-paper-200 shadow"
            >
              <div className="mt-1 ml-0.5 h-px w-3.5 bg-night-800/40" />
              <div className="mt-1 ml-0.5 h-px w-2.5 bg-night-800/30" />
            </div>
          </div>
        </div>
      );

    case "bracelet":
      return (
        <div className={`relative flex h-9 w-14 items-center justify-center sm:h-10 sm:w-16 ${className}`}>
          <div
            aria-hidden
            className="absolute h-8 w-8 rounded-full border-[3.5px] border-dashed border-amber-deep/90 shadow-[0_4px_12px_rgba(0,0,0,0.5)] sm:h-9 sm:w-9"
          />
          <div aria-hidden className="absolute h-8 w-8 rotate-45 rounded-full border border-paper-200/30 sm:h-9 sm:w-9" />
        </div>
      );

    case "fail-rebellious":
      return (
        <div
          className={`relative h-14 w-16 rounded-sm border border-paper-400/30 bg-paper-100/90 p-2 shadow-[0_10px_24px_rgba(0,0,0,0.6)] sm:w-20 ${className}`}
          style={{ transform: "rotate(2deg)" }}
        >
          <div className="space-y-1.5">
            {[80, 65, 72].map((w, i) => (
              <div key={i} className="h-px bg-night-800/30" style={{ width: `${w}%` }} />
            ))}
          </div>
          <span aria-hidden className="absolute inset-0 flex items-center justify-center text-2xl leading-none text-fail-red/70">
            ✕
          </span>
        </div>
      );

    case "fail-dream-app":
      return (
        <div className={`relative ${className}`}>
          <div
            className="relative h-14 w-16 rounded-sm border border-dashed border-paper-400/40 bg-night-800 p-1.5 shadow-[0_10px_24px_rgba(0,0,0,0.6)] sm:w-20"
            style={{ transform: "rotate(-2deg)" }}
          >
            <div className="flex gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-fail-red/60" />
              <span className="h-1.5 w-1.5 rounded-full bg-paper-400/40" />
              <span className="h-1.5 w-1.5 rounded-full bg-paper-400/40" />
            </div>
            <div className="mt-1.5 h-2 rounded-sm bg-paper-400/15" />
            <div className="mt-1 grid grid-cols-3 gap-1">
              <span className="h-2.5 rounded-sm bg-paper-400/12" />
              <span className="h-2.5 rounded-sm bg-paper-400/12" />
              <span className="h-2.5 rounded-sm bg-paper-400/12" />
            </div>
          </div>
          <span
            aria-hidden
            className="absolute inset-0 flex rotate-[-14deg] items-center justify-center rounded-sm border-2 border-fail-red/80 text-[0.55rem] font-bold tracking-[0.25em] text-fail-red/90"
          >
            CANCELLED
          </span>
        </div>
      );

    case "fail-screen-time":
      return (
        <div
          className={`relative h-14 w-16 rounded-sm border border-screen/30 bg-night-950 p-2 shadow-[0_10px_24px_rgba(0,0,0,0.6)] sm:w-20 ${className}`}
          style={{ transform: "rotate(1deg)" }}
        >
          <div className="flex h-full items-end justify-between gap-1">
            {[35, 55, 45, 90, 65].map((h, i) => (
              <span
                key={i}
                className="w-1.5 rounded-t-sm bg-gradient-to-t from-screen-dim to-screen/80"
                style={{ height: `${h}%`, boxShadow: i === 3 ? "0 0 8px rgba(127,180,217,0.5)" : undefined }}
              />
            ))}
          </div>
          <span className="museum-label absolute -top-2 right-1 bg-night-900 px-1 text-[0.4rem] text-screen/70">
            9h
          </span>
          <div aria-hidden className="absolute -inset-2 rounded bg-screen/10 blur-lg" />
        </div>
      );

    default:
      return (
        <div className={`h-12 w-12 rounded-sm border border-paper-400/30 bg-night-700 ${className}`} />
      );
  }
}
