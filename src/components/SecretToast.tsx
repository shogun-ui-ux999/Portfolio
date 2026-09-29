import { useEffect, useState } from "react";
import { useMuseum } from "../context/MuseumContext";

/** Elegant one-time toast when the visitor finds the private collection. */
export default function SecretToast() {
  const { foundSecretCollection, closeArtifact } = useMuseum();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!foundSecretCollection) return;
    const show = window.setTimeout(() => setVisible(true), 600);
    const hide = window.setTimeout(() => setVisible(false), 6500);
    return () => {
      window.clearTimeout(show);
      window.clearTimeout(hide);
    };
  }, [foundSecretCollection]);

  if (!visible) return null;

  return (
    <div
      role="status"
      className="animate-fade-up fixed bottom-5 left-1/2 z-[95] w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 rounded-xl border border-museum-gold/40 bg-night-800/95 px-5 py-4 text-center shadow-[0_18px_50px_rgba(0,0,0,0.7)] backdrop-blur-sm sm:bottom-8"
    >
      <button
        type="button"
        onClick={() => setVisible(false)}
        aria-label="Dismiss message"
        className="absolute top-2 right-2.5 text-sm text-paper-300/40 transition-colors hover:text-paper-200"
      >
        ×
      </button>
      <p className="font-serif text-[1.05rem] leading-snug text-paper-100 italic">
        "You found the private collection. The curator appreciates curiosity."
      </p>
      <button
        type="button"
        onClick={() => {
          setVisible(false);
          closeArtifact();
        }}
        className="museum-label mt-2.5 text-[0.5rem] text-museum-gold/80 transition-colors hover:text-museum-gold"
      >
        Continue exploring
      </button>
    </div>
  );
}
