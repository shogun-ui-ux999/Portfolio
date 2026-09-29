import { UTApi } from "uploadthing/server";

/**
 * MUSEUM AUDIO — SERVER-SIDE UPLOADTHING LOOKUP
 * =============================================
 * Resolves the public URLs for the curator's recorded audio guides.
 *
 * SECURITY: reads UPLOADTHING_TOKEN from the server environment only.
 * This module is imported exclusively by `vite.config.ts` (dev/preview
 * middleware) — it is never part of the client bundle, and the token
 * has no `VITE_` prefix so Vite cannot leak it into the build.
 *
 * RESILIENCE: every failure mode (missing token, API error, timeout,
 * rate limit) resolves to an empty object and logs to the server
 * console. The museum never breaks — the frontend falls back to the
 * transcript-only experience.
 * =============================================
 */

/** Artifact ids that have a recorded audio guide. */
export const MUSEUM_AUDIO_IDS = [
  "welcome",
  "laptop",
  "certificates",
  "broken-code",
  "notebook",
  "bracelet",
  "drawer-letter",
] as const;

export type MuseumAudioId = (typeof MUSEUM_AUDIO_IDS)[number];

export type MuseumAudioUrls = Partial<Record<MuseumAudioId, string>>;

/** Files in the UploadThing app must be named "<id>.mp3". */
const EXPECTED_FILENAMES = new Set(
  MUSEUM_AUDIO_IDS.map((id) => `${id}.mp3`),
);

/** In-process cache — the UploadThing API is hit once per server boot
 *  (or until the cache is invalidated), never per modal click. */
let cache: MuseumAudioUrls | null = null;
let inflight: Promise<MuseumAudioUrls> | null = null;

/** Public UploadThing CDN url for a stored file key. */
function publicUrlForKey(key: string): string {
  return `https://utfs.io/f/${key}`;
}

async function fetchAudioUrls(): Promise<MuseumAudioUrls> {
  const token = process.env.UPLOADTHING_TOKEN;
  if (!token) {
    console.warn(
      "[museum-audio] UPLOADTHING_TOKEN is not set — serving transcript-only experience.",
    );
    return {};
  }

  // UTApi reads UPLOADTHING_TOKEN from the environment automatically.
  const utapi = new UTApi();

  // The guide is 7 files, but the app also stores visitor pins, so
  // page through up to a few hundred entries to find them all.
  const byId = new Map<MuseumAudioId, string>();
  const limit = 100;
  for (let offset = 0; offset < 500; offset += limit) {
    const { files, hasMore } = await utapi.listFiles({ limit, offset });
    for (const file of files) {
      if (!EXPECTED_FILENAMES.has(file.name)) continue;
      const id = file.name.replace(/\.mp3$/, "") as MuseumAudioId;
      // Prefer the most recently uploaded version of each guide.
      if (!byId.has(id)) byId.set(id, file.key);
    }
    if (!hasMore) break;
  }

  const urls: MuseumAudioUrls = {};
  for (const [id, key] of byId) {
    urls[id] = publicUrlForKey(key);
  }
  return urls;
}

/**
 * Returns a map of artifact id → public audio url, e.g.
 * `{ welcome: "https://utfs.io/f/...", laptop: "https://utfs.io/f/..." }`.
 * Never throws; resolves to `{}` on any failure.
 */
export async function getMuseumAudioUrls(): Promise<MuseumAudioUrls> {
  if (cache) return cache;
  if (inflight) return inflight;

  inflight = (async () => {
    try {
      // Guard against a hung UploadThing API — resolve empty after 10s.
      const result = await Promise.race([
        fetchAudioUrls(),
        new Promise<MuseumAudioUrls>((resolve) =>
          setTimeout(() => {
            console.warn("[museum-audio] UploadThing API timed out — serving transcripts only.");
            resolve({});
          }, 10_000),
        ),
      ]);
      cache = result;
      return result;
    } catch (error) {
      console.warn(
        "[museum-audio] failed to fetch audio URLs — serving transcript-only experience:",
        error instanceof Error ? error.message : error,
      );
      return {};
    } finally {
      inflight = null;
    }
  })();

  return inflight;
}

/** Test/diagnostic helper — clears the in-process cache. */
export function clearMuseumAudioCache(): void {
  cache = null;
}
