import type { Artifact } from "../data/artifacts";
import type { Hotspot } from "../data/hotspots";
import { artifactIcons } from "./icons/artifactIcons";

interface ArtifactHotspotProps {
  artifact: Artifact;
  hotspot: Hotspot;
  viewed: boolean;
  /** Curator's hover hint (secrets), shown while `showHint` is true */
  hint?: string;
  showHint?: boolean;
  /** Small tag rendered above the pin, e.g. "Curator's Private Item" */
  badge?: string;
  onOpen: (artifact: Artifact) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

/**
 * A clickable artifact pin on the bedroom scene. Unviewed pins
 * glow and pulse like lamp-lit points of interest; failures get
 * a brick-red treatment instead of the warm amber.
 */
export default function ArtifactHotspot({
  artifact,
  hotspot,
  viewed,
  hint,
  showHint = false,
  badge,
  onOpen,
  onMouseEnter,
  onMouseLeave,
}: ArtifactHotspotProps) {
  const Icon = artifactIcons[artifact.id];
  const isFailure = artifact.isFailure;

  return (
    <button
      type="button"
      onClick={() => onOpen(artifact)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      aria-label={`${artifact.exhibitNumber}: ${artifact.title} — ${artifact.objectName}`}
      title={`${artifact.exhibitNumber} — ${artifact.title}`}
      className="group absolute z-10 -translate-x-1/2 -translate-y-1/2 outline-none"
      style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
    >
      {/* Curator hint on hover, before a secret is opened */}
      {hint && showHint && (
        <span
          aria-hidden
          className="pointer-events-none absolute -top-2 left-1/2 z-30 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-md border border-gold-400/40 bg-night-950/95 px-3 py-1.5 font-hand text-lg leading-none text-gold-400 shadow-plaque"
        >
          {hint}
        </span>
      )}

      {/* Private badge above a revealed secret */}
      {badge && (
        <span className="pointer-events-none absolute -top-1 left-1/2 z-20 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-full border border-gold-400/50 bg-night-950/90 px-2.5 py-1 font-type text-[0.55rem] uppercase tracking-[0.2em] text-gold-400">
          {badge}
        </span>
      )}

      {/* Soft light pool under the hotspot */}
      <span
        aria-hidden
        className={`absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl transition-opacity duration-500 ${
          isFailure
            ? "bg-brick-400/20 opacity-70"
            : viewed
            ? "bg-gold-400/10 opacity-60"
            : "bg-amber-lamp/20 opacity-70"
        }`}
      />

      {/* The pin itself */}
      <span
        className={`relative flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur-sm transition-all duration-300 sm:h-12 sm:w-12 ${
          viewed
            ? "border-gold-400/60 bg-night-900/80 text-gold-400"
            : isFailure
            ? "border-brick-400/60 bg-night-900/80 text-brick-400 group-hover:scale-110 group-hover:border-brick-400 group-focus-visible:scale-110 group-focus-visible:border-brick-400"
            : "border-amber-lamp/50 bg-night-900/70 text-amber-glow group-hover:scale-110 group-hover:border-amber-glow group-focus-visible:scale-110 group-focus-visible:border-amber-glow"
        } ${viewed ? "" : "animate-float"}`}
      >
        {/* Pulse ring for not-yet-viewed artifacts */}
        {!viewed && (
          <span
            aria-hidden
            className={`absolute inset-0 rounded-full border opacity-70 ${
              isFailure ? "border-brick-400/40" : "border-amber-lamp/40"
            }`}
            style={{ animation: "hotspotPulse 2.6s ease-out infinite" }}
          />
        )}
        {Icon ? (
          <span className="block h-5 w-5 sm:h-5 sm:w-5">{Icon({})}</span>
        ) : (
          <span className="block h-2 w-2 rounded-full bg-amber-glow" />
        )}
      </span>

      {/* Museum label on hover / focus */}
      <span className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 w-max max-w-[220px] -translate-x-1/2 scale-95 rounded-md border border-paper-400/20 bg-night-950/95 px-3 py-2 text-left opacity-0 shadow-plaque backdrop-blur-sm transition-all duration-200 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100">
        <span
          className={`block font-type text-[0.55rem] uppercase tracking-[0.3em] ${
            isFailure ? "text-brick-400/90" : "text-amber-lamp/80"
          }`}
        >
          {artifact.exhibitNumber}
        </span>
        <span className="mt-0.5 block font-serif text-xs font-semibold text-paper-50">
          {artifact.title}
        </span>
      </span>

      {/* Viewed check */}
      {viewed && (
        <span
          aria-hidden
          className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-gold-400 text-[0.6rem] font-bold text-night-950"
        >
          ✓
        </span>
      )}
    </button>
  );
}
