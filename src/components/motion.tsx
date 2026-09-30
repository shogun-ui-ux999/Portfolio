import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

/**
 * ANIMATION HOOKS
 * ===============
 * Small, dependency-free helpers behind the museum's animation
 * system. All of them are IntersectionObserver-based or pure CSS
 * delegation, and everything collapses to "visible instantly" when
 * the visitor prefers reduced motion.
 */

const reducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Animation classes the museum uses for scroll-triggered reveals. */
export type RevealVariant =
  | "animate-fade-up"
  | "animate-fade-down"
  | "animate-fade-left"
  | "animate-fade-right"
  | "animate-scale-in"
  | "animate-blur-in"
  | "animate-slide-reveal"
  | "animate-drop-in"
  | "animate-stamp";

/**
 * Reveals children when they enter the viewport. Renders a wrapper
 * that stays invisible until observed, then applies the chosen
 * animation class once.
 */
export function Reveal({
  variant = "animate-fade-up",
  delayMs = 0,
  className = "",
  children,
}: {
  variant?: RevealVariant;
  delayMs?: number;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (reducedMotion() || typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} ${shown ? variant : "opacity-0"}`}
      style={delayMs ? { animationDelay: `${delayMs}ms` } : undefined}
    >
      {children}
    </div>
  );
}

/**
 * Types text out character by character. Honors reduced motion by
 * rendering the full text immediately. The caret blinks briefly
 * after completion when `caret` is true.
 */
export function Typewriter({
  text,
  speedMs = 28,
  className = "",
  caret = false,
  startDelayMs = 0,
}: {
  text: string;
  speedMs?: number;
  className?: string;
  caret?: boolean;
  startDelayMs?: number;
}) {
  const [count, setCount] = useState(() => (reducedMotion() ? text.length : 0));
  const [done, setDone] = useState(() => reducedMotion());

  useEffect(() => {
    if (reducedMotion()) {
      setCount(text.length);
      setDone(true);
      return;
    }
    let i = 0;
    let interval: number | undefined;
    const start = window.setTimeout(() => {
      interval = window.setInterval(() => {
        i += 1;
        setCount(i);
        if (i >= text.length) {
          window.clearInterval(interval);
          setDone(true);
        }
      }, speedMs);
    }, startDelayMs);
    return () => {
      window.clearTimeout(start);
      if (interval) window.clearInterval(interval);
    };
  }, [text, speedMs, startDelayMs]);

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden>{text.slice(0, count)}</span>
      {caret && (
        <span
          aria-hidden
          className={`ml-0.5 inline-block w-[2px] translate-y-[2px] bg-gold/80 ${
            done ? "animate-pulse" : ""
          }`}
          style={{ height: "1em" }}
        />
      )}
    </span>
  );
}

/** Dust motes drifting through the lamp light. Pure CSS animations. */
export function DustMotes({ count = 16 }: { count?: number }) {
  const motes = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: (i * 61) % 100,
    top: 30 + ((i * 37) % 60),
    delay: (i * 1.7) % 9,
    duration: 7 + ((i * 13) % 6),
    size: i % 3 === 0 ? 3 : 2,
  }));

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {motes.map((m) => (
        <span
          key={m.id}
          className="absolute rounded-full bg-cyan/60"
          style={{
            left: `${m.left}%`,
            top: `${m.top}%`,
            width: m.size,
            height: m.size,
            opacity: 0,
            animation: `dustDrift ${m.duration}s linear ${m.delay}s infinite`,
            boxShadow: "0 0 6px rgba(0,212,255,0.4)",
          }}
        />
      ))}
    </div>
  );
}

/** Konami code easter egg → golden rain + curator message. */
export function useKonamiCode(onUnlock: () => void) {
  useEffect(() => {
    const sequence = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "KeyB",
      "KeyA",
    ];
    let index = 0;
    const onKey = (e: KeyboardEvent) => {
      if (e.code === sequence[index]) {
        index += 1;
        if (index === sequence.length) {
          index = 0;
          onUnlock();
        }
      } else {
        index = e.code === sequence[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onUnlock]);
}

/** Golden rain overlay for easter eggs. */
export function GoldenRain({ active }: { active: boolean }) {
  const [drops] = useState(() =>
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: (i * 97) % 100,
      delay: (i % 12) * 0.14,
      duration: 1.6 + ((i * 7) % 10) / 10,
    })),
  );

  if (!active) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[130] overflow-hidden">
      {drops.map((d) => (
        <span
          key={d.id}
          className="absolute top-[-12px] h-3 w-[3px] rounded-full bg-gold"
          style={{
            left: `${d.left}%`,
            boxShadow: "0 0 8px rgba(240,192,64,0.9)",
            animation: `goldenDrop ${d.duration}s linear ${d.delay}s both`,
          }}
        />
      ))}
      <p className="museum-label absolute inset-x-0 top-1/2 -translate-y-1/2 text-center text-[0.7rem] text-text-gold">
        The curator sees your curiosity.
      </p>
    </div>
  );
}
