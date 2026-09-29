import { useCallback, useEffect, useRef, useState } from "react";

/**
 * AUDIO GUIDE PLAYER
 * ==================
 * The museum's own audio player — no default browser chrome. A brass
 * play/pause toggle, a lamp-lit progress bar, and elapsed time.
 *
 * Guarantees:
 * - Never autoplays; audio starts only on user click.
 * - Cleans itself up: when unmounted (modal closed, route changed)
 *   the audio element is paused and released.
 * - `onEnded` lets hosts react (e.g. one gentle pulse).
 */

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function AudioGuidePlayer({
  src,
  title,
  variant = "plaque",
  onPlayingChange,
}: {
  src: string;
  /** Short label shown beside the controls */
  title?: string;
  /** "plaque" = inside the artifact modal, "welcome" = Entrance hero */
  variant?: "plaque" | "welcome";
  /** Optional: notified when playback starts/stops (for read-along UI) */
  onPlayingChange?: (playing: boolean) => void;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [ended, setEnded] = useState(false);

  // Load nothing until the visitor asks for it: the element's src is
  // always set, but playback is strictly user-initiated (no autoplay,
  // no preload of audio data until first play).
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.load();
    return () => {
      // Unmount (modal closed / route changed / tab closed): stop
      // playback and release the element.
      audio.pause();
      audio.removeAttribute("src");
    };
  }, [src]);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      void audio.play().catch(() => {
        // Autoplay policies or a failed fetch — stay quiet, stay elegant.
        setPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, []);

  const seek = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !Number.isFinite(audio.duration)) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    audio.currentTime = ratio * audio.duration;
  }, []);

  const isWelcome = variant === "welcome";

  return (
    <div
      className={
        isWelcome
          ? "w-full max-w-md rounded-2xl border border-amber-glow/30 bg-night-800/70 px-5 py-4 backdrop-blur-sm"
          : "rounded-xl border border-screen/25 bg-screen/5 px-4 py-3.5"
      }
    >
      {/* The actual element — kept hidden; UI is fully custom. */}
      <audio
        ref={audioRef}
        src={src}
        preload="none"
        onPlay={() => {
          setPlaying(true);
          setEnded(false);
          onPlayingChange?.(true);
        }}
        onPause={() => {
          setPlaying(false);
          onPlayingChange?.(false);
        }}
        onEnded={() => {
          setPlaying(false);
          setEnded(true);
          onPlayingChange?.(false);
        }}
        onTimeUpdate={() => {
          const audio = audioRef.current;
          if (audio && Number.isFinite(audio.duration) && audio.duration > 0) {
            setProgress(audio.currentTime / audio.duration);
          }
        }}
        onLoadedMetadata={() => {
          const audio = audioRef.current;
          if (audio && Number.isFinite(audio.duration)) setDuration(audio.duration);
        }}
      />

      <div className="flex items-center gap-3.5">
        {/* Play / pause toggle — morphs between the two states */}
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? `Pause ${title ?? "audio guide"}` : `Play ${title ?? "audio guide"}`}
          className={`group flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
            isWelcome
              ? "border border-amber-glow/60 bg-amber-glow/10 text-amber-glow hover:bg-amber-glow/20 hover:shadow-[0_0_24px_rgba(232,163,61,0.35)]"
              : "border border-screen/50 bg-screen/10 text-screen hover:border-screen hover:bg-screen/20"
          } ${ended ? "animate-player-pulse" : ""}`}
        >
          {playing ? (
            // Pause glyph — two bars
            <span aria-hidden className="flex items-center gap-[3px]">
              <span className="h-3.5 w-[3px] rounded-full bg-current" />
              <span className="h-3.5 w-[3px] rounded-full bg-current" />
            </span>
          ) : (
            // Play glyph — triangle
            <span
              aria-hidden
              className="ml-0.5 h-0 w-0 border-y-[6px] border-l-[10px] border-y-transparent border-l-current"
            />
          )}
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-3">
            <span
              className={`museum-label truncate text-[0.5rem] ${
                isWelcome ? "text-amber-glow/90" : "text-screen/90"
              }`}
            >
              {title ?? "Audio Guide"}
            </span>
            <span
              className={`shrink-0 font-sans text-[0.65rem] tabular-nums ${
                isWelcome ? "text-paper-300/60" : "text-paper-300/50"
              }`}
            >
              {formatTime(duration * progress)} / {formatTime(duration)}
            </span>
          </div>

          {/* Progress bar — clickable, lamp-lit fill */}
          <div
            role="slider"
            aria-label="Seek audio"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress * 100)}
            tabIndex={0}
            onClick={seek}
            className={`mt-2 h-1.5 w-full cursor-pointer overflow-hidden rounded-full ${
              isWelcome ? "bg-amber-glow/15" : "bg-screen/15"
            }`}
          >
            <div
              className="h-full rounded-full transition-[width] duration-150 ease-linear"
              style={{
                width: `${progress * 100}%`,
                background: isWelcome
                  ? "linear-gradient(90deg, #c77f2a, #e8a33d)"
                  : "linear-gradient(90deg, #4a7a9b, #7fb4d9)",
                boxShadow: isWelcome
                  ? "0 0 10px rgba(232,163,61,0.5)"
                  : "0 0 10px rgba(127,180,217,0.45)",
              }}
            />
          </div>

          {/* Sound wave bars while playing */}
          {playing && (
            <div aria-hidden className="mt-1.5 flex h-2 items-end gap-[3px]">
              {[0, 1, 2, 3, 4].map((i) => (
                <span
                  key={i}
                  className={`w-[3px] rounded-full ${
                    isWelcome ? "bg-amber-glow/70" : "bg-screen/70"
                  }`}
                  style={{
                    animation: `wave 900ms ease-in-out ${i * 110}ms infinite`,
                    height: "40%",
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
