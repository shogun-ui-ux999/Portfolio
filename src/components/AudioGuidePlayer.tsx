import { useCallback, useEffect, useRef, useState } from "react";

/**
 * AUDIO GUIDE PLAYER
 * ==================
 * The museum's own audio player — no default browser chrome. A glowing
 * play/pause orb, a lit progress bar, and elapsed time.
 *
 * Guarantees:
 * - Never autoplays; audio starts only on user click.
 * - Cleans itself up: when unmounted the audio element is paused.
 * - Tries the given src; if it fails to load, the player still works
 *   visually and reports the state honestly.
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
  fallbackSrc,
  title,
  variant = "plaque",
  onPlayingChange,
}: {
  src: string;
  /** Tried automatically if `src` fails to load (e.g. `/audio/<id>.mp3`) */
  fallbackSrc?: string;
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
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  /** Tracks which source is active so the fallback is tried only once. */
  const activeSrcRef = useRef(src);
  const fallbackTriedRef = useRef(false);

  // Keep src in sync; load on mount and whenever src changes.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Reset state for a fresh source.
    setPlaying(false);
    setProgress(0);
    setDuration(0);
    setEnded(false);
    setFailed(false);
    setLoaded(false);
    activeSrcRef.current = src;
    fallbackTriedRef.current = false;

    audio.src = src;
    audio.load();

    return () => {
      audio.pause();
    };
  }, [src]);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (failed || !loaded) return;
    if (audio.paused) {
      void audio.play().catch(() => {
        setPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [failed, loaded]);

  const seek = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !Number.isFinite(audio.duration)) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    audio.currentTime = ratio * audio.duration;
  }, []);

  const isWelcome = variant === "welcome";

  return (      <div
      className={
        isWelcome
          ? "w-full max-w-md rounded-2xl border border-cyan/20 bg-deep-800/70 px-5 py-4 backdrop-blur-sm"
          : "rounded-xl border border-cyan/15 bg-deep-800/50 px-4 py-3.5"
      }
    >
      {/* The actual element — fully custom UI. */}
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onError={() => {
          // CLIENT-SIDE FALLBACK: the primary URL (UploadThing CDN) failed
          // to load — swap to the local static copy if one exists and we
          // haven't already tried it. Only when both fail do we surface
          // the failed state (transcript-only experience).
          const audio = audioRef.current;
          if (
            audio &&
            fallbackSrc &&
            !fallbackTriedRef.current &&
            activeSrcRef.current !== fallbackSrc
          ) {
            fallbackTriedRef.current = true;
            activeSrcRef.current = fallbackSrc;
            setFailed(false);
            setLoaded(false);
            setProgress(0);
            setDuration(0);
            audio.src = fallbackSrc;
            audio.load();
            return;
          }
          setFailed(true);
          setPlaying(false);
        }}
        onPlay={() => {
          setPlaying(true);
          setEnded(false);
          setFailed(false);
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
          if (audio && Number.isFinite(audio.duration)) {
            setDuration(audio.duration);
            setLoaded(true);
          }
        }}
      />

      <div className="flex items-center gap-3.5">
        {/* Play / pause orb */}
        <button
          type="button"
          onClick={toggle}
          disabled={failed || !loaded}
          aria-label={playing ? `Pause ${title ?? "audio guide"}` : `Play ${title ?? "audio guide"}`}
          className={`group flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
            isWelcome
              ? "border border-cyan/40 bg-cyan/10 text-cyan hover:bg-cyan/20 hover:shadow-[0_0_24px_rgba(0,212,255,0.3)]"
              : "border border-cyan/30 bg-cyan/5 text-cyan hover:border-cyan/50 hover:bg-cyan/10"
          } ${ended ? "animate-player-pulse" : ""} ${failed || !loaded ? "opacity-40 cursor-not-allowed" : ""}`}
        >
          {playing ? (
            <span aria-hidden className="flex items-center gap-[3px]">
              <span className="h-3.5 w-[3px] rounded-full bg-current" />
              <span className="h-3.5 w-[3px] rounded-full bg-current" />
            </span>
          ) : (
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
                isWelcome ? "text-cyan/85" : "text-cyan/85"
              }`}
            >
              {title ?? "Audio Guide"}
            </span>
            <span
              className={`shrink-0 font-sans text-[0.65rem] tabular-nums ${
                isWelcome ? "text-paper-faint/50" : "text-paper-faint/50"
              }`}
            >
              {formatTime(duration * progress)} / {formatTime(duration)}
            </span>
          </div>

          {/* Progress bar */}
          <div
            role="slider"
            aria-label="Seek audio"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress * 100)}
            tabIndex={0}
            onClick={seek}
            className={`mt-2 h-1.5 w-full cursor-pointer overflow-hidden rounded-full ${
              isWelcome ? "bg-cyan/10" : "bg-cyan/10"
            }`}
          >
            <div
              className="h-full rounded-full transition-[width] duration-150 ease-linear"
              style={{
                width: `${progress * 100}%`,
                background: "linear-gradient(90deg, var(--color-cyan-deep), var(--color-cyan))",
                boxShadow: "0 0 10px rgba(0,212,255,0.4)",
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
                    "bg-cyan/60"
                  }`}
                  style={{
                    animation: `waveBar 900ms ease-in-out ${i * 110}ms infinite`,
                    height: "40%",
                  }}
                />
              ))}
            </div>
          )}

          {/* Error state */}
          {failed && (
            <p className="mt-1.5 text-[0.55rem] text-magenta/60">
              Audio unavailable — showing transcript instead.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
