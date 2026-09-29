/**
 * UPLOADTHING — CLIENT HELPERS
 * ============================
 * Typed upload components bound to the museum's FileRouter.
 * The generated components default to `/api/uploadthing` on the
 * current origin — exactly where the dev-server middleware in
 * `vite.config.ts` mounts the route handler. Because the handler is
 * same-origin, no CORS setup is needed.
 * ============================
 */
import { generateUploadDropzone } from "@uploadthing/react";
import type { UploadRouter } from "../server/uploadthing";

export const VisitorUploadDropzone = generateUploadDropzone<UploadRouter>();
