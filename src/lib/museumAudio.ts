/**
 * MUSEUM AUDIO — CLIENT ACCESS
 * ============================
 * The only client-visible piece of the audio integration: it fetches
 * the URL map from the server's `/api/museum-audio` endpoint and
 * caches it for the whole session. The UPLOADTHING_TOKEN never
 * reaches this side of the wall.
 *
 * On any failure (static build, server error) this resolves to an
 * empty map and every player falls back to the transcript-only view.
 * ============================
 */

export type MuseumAudioId =
  | "welcome"
  | "laptop"
  | "certificates"
  | "broken-code"
  | "notebook"
  | "bracelet"
  | "drawer-letter";

export type MuseumAudioMap = Partial<Record<MuseumAudioId, string>>;

let cache: MuseumAudioMap | null = null;
let inflight: Promise<MuseumAudioMap> | null = null;

export function fetchMuseumAudioUrls(): Promise<MuseumAudioMap> {
  if (cache) return Promise.resolve(cache);
  if (inflight) return inflight;

  inflight = fetch("/api/museum-audio")
    .then((res) => (res.ok ? (res.json() as Promise<MuseumAudioMap>) : {}))
    .then((map) => {
      cache = map ?? {};
      return cache;
    })
    .catch(() => {
      // Static build, offline, or server hiccup — transcript fallback.
      cache = {};
      return cache;
    })
    .finally(() => {
      inflight = null;
    });

  return inflight;
}

export function getCachedMuseumAudioUrls(): MuseumAudioMap | null {
  return cache;
}
