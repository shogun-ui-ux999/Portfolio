import { useEffect, useRef, useState } from "react";

/**
 * CURSOR GLOW
 * ===========
 * A soft glow that follows the cursor. Uses event delegation on the
 * document root, so it automatically covers buttons/links rendered
 * later (modals, route changes) — no per-element listeners to leak.
 */
export default function CursorGlow() {
  const [pos, setPos] = useState({ x: -1000, y: -1000 });
  const [interactive, setInteractive] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setPos({ x: e.clientX, y: e.clientY });
        const target = e.target as HTMLElement | null;
        setInteractive(
          Boolean(
            target?.closest(
              "button, a, [role='button'], input, select, textarea, [tabindex]",
            ),
          ),
        );
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const size = interactive ? 380 : 320;
  const bg = interactive
    ? "radial-gradient(circle, rgba(255,45,120,0.10) 0%, transparent 70%)"
    : "radial-gradient(circle, rgba(0,212,255,0.07) 0%, transparent 70%)";

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        left: pos.x,
        top: pos.y,
        width: size,
        height: size,
        borderRadius: "9999px",
        background: bg,
        pointerEvents: "none",
        zIndex: 5,
        transform: "translate(-50%, -50%)",
        transition: "width 0.3s ease, height 0.3s ease, background 0.3s ease",
      }}
    />
  );
}
