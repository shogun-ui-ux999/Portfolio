/**
 * UPLOADTHING — FILE ROUTER (SERVER SIDE)
 * ========================================
 * Defines the museum's upload endpoints. A FileRoute is like an
 * API endpoint: it declares which file types are allowed, how big,
 * and what to do once a file lands in storage.
 *
 * This router is mounted by the dev-server middleware in
 * `vite.config.ts` at POST `/api/uploadthing`. The client helpers in
 * `src/lib/uploadthing.ts` point at that same URL.
 *
 * The token is read from `UPLOADTHING_TOKEN` — set it in the
 * workspace environment, never in code.
 * ========================================
 */
import { createUploadthing, type FileRouter } from "uploadthing/express";

const f = createUploadthing();

export const uploadRouter = {
  /**
   * "Leave something on the desk" — a visitor's photo, sketch, or
   * scanned keepsake pinned to the Gift Shop wall. Images or PDFs,
   * one file at a time, up to 8 MB.
   */
  visitorPin: f({
    image: { maxFileSize: "8MB", maxFileCount: 1 },
    pdf: { maxFileSize: "8MB", maxFileCount: 1 },
  }).onUploadComplete(async ({ file }) => {
    // The wall keeps everything in the visitor's browser for now —
    // this callback is where a database write would go later.
    console.log("[uploadthing] visitor pin archived:", file.name, file.ufsUrl);
    // Returned data is typed end-to-end on the client.
    return { pinnedAt: new Date().toISOString() };
  }),
} satisfies FileRouter;

export type UploadRouter = typeof uploadRouter;
