import { defineConfig } from "vite";
import type { Connect, Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { createRouteHandler } from "uploadthing/express";
import { uploadRouter } from "./src/server/uploadthing";

/**
 * UploadThing route handler mounted on the dev/preview server.
 *
 * This project deploys as a static SPA (`vite build` → `dist/`), so
 * there is no production Node server to host the presigning route.
 * In the managed preview (which runs the Vite dev server) the
 * middleware below serves POST `/api/uploadthing`; on a static host
 * the Visitors' Wall falls back to its "desk closed" state.
 *
 * Requires `UPLOADTHING_TOKEN` in the workspace environment.
 */
function uploadthingDevPlugin(): Plugin {
  let handler: Connect.NextHandleFunction | undefined;
  try {
    handler = createRouteHandler({
      router: uploadRouter,
    }) as unknown as Connect.NextHandleFunction;
  } catch (error) {
    console.warn(
      "[uploadthing] route handler unavailable — uploads disabled:",
      error instanceof Error ? error.message : error,
    );
  }

  return {
    name: "uploadthing-route-handler",
    apply: "serve",
    configureServer(server) {
      if (handler) {
        server.middlewares.use("/api/uploadthing", handler);
      }
    },
    configurePreviewServer(server) {
      if (handler) {
        server.middlewares.use("/api/uploadthing", handler);
      }
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss(), uploadthingDevPlugin()],
  server: {
    host: true,
    hmr: false,
  },
});
