import { useMemo } from "react";

/** Generate a set of stars once (stable across re-renders). */
function makeStars(count = 160) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() < 0.7 ? 1 : 2,
    duration: 3 + Math.random() * 4,
    delay: Math.random() * 5,
    opacity: 0.2 + Math.random() * 0.5,
  }));
}

/**
 * STARFIELD
 * =========
 * Fixed background of twinkling stars. Pure CSS animation — no JS
 * after the initial render. Skipped entirely under reduced motion.
 */
export default function Starfield() {
  const reduced = typeof window !== "undefined"
    && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const stars = useMemo(() => makeStars(140), []);

  if (reduced) {
    return (
      <div aria-hidden className="fixed inset-0 pointer-events-none">
        {stars.slice(0, 40).map((s) => (
          <span
            key={s.id}
            className="absolute rounded-full bg-white/30"
            style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size }}
          />
        ))}
      </div>
    );
  }

  return (
    <div aria-hidden className="fixed inset-0 pointer-events-none overflow-hidden">
      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            opacity: s.opacity,
            animation: `star-twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
