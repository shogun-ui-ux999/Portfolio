import type { Artifact } from "./artifacts";
import { bedroomArtifacts } from "./artifacts";

/**
 * ============================================================
 *  HOTSPOT GEOMETRY
 * ============================================================
 *  Percentages of the bedroom stage (a 1600×1000 scene), matched
 *  to where each object is drawn in
 *  `public/assets/bedroom-background.svg`. To move an artifact,
 *  adjust `x` / `y` (center of the object) here — no component
 *  changes needed.
 * ============================================================
 */

export interface Hotspot {
  artifactId: string;
  /** Horizontal center, % of stage width */
  x: number;
  /** Vertical center, % of stage height */
  y: number;
}

export const hotspots: Record<string, Hotspot> = {
  laptop: { artifactId: "laptop", x: 70, y: 48 }, // desk, center-right
  notebook: { artifactId: "notebook", x: 59.4, y: 55.8 }, // desk, left of laptop
  certificates: { artifactId: "certificates", x: 44.4, y: 8.5 }, // shelf, top center-left
  "broken-code": { artifactId: "broken-code", x: 35, y: 23 }, // poster on wall
  chessboard: { artifactId: "chessboard", x: 53.8, y: 90 }, // floor
  "gap-year": { artifactId: "gap-year", x: 18.8, y: 51.5 }, // calendar on wall
  mobile: { artifactId: "mobile", x: 40.6, y: 80 }, // nightstand
  "drawer-letter": { artifactId: "drawer-letter", x: 82.8, y: 69.5 }, // desk drawer unit
  bracelet: { artifactId: "bracelet", x: 77.8, y: 54.8 }, // desk edge
};

/** Bedroom artifacts joined with their hotspot geometry, in exhibit order. */
export const hotspotArtifacts: Array<{ artifact: Artifact; hotspot: Hotspot }> =
  bedroomArtifacts
    .filter((artifact) => hotspots[artifact.id])
    .map((artifact) => ({ artifact, hotspot: hotspots[artifact.id] }));
