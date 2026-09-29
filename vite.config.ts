import { defineConfig } from "vite";
import type { Connect, Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { createRouteHandler } from "uploadthing/express";
import { uploadRouter } from "./src/server/uploadthing";
import { getMuseumAudioUrls } from "./src/server/museumAudio";

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
      // Same-origin JSON endpoint for the museum's audio guide URLs.
      // The UploadThing token stays server-side; the client only ever
      // sees the resulting public file URLs.
      server.middlewares.use("/api/museum-audio", (req, res, _next) => {
        if (req.method !== "GET") {
          res.statusCode = 405;
          res.end();
          return;
        }
        getMuseumAudioUrls()
          .then((urls) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.setHeader("Cache-Control", "no-store");
            res.end(JSON.stringify(urls));
          })
          .catch((error) => {
            console.warn("[museum-audio] endpoint error:", error);
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({}));
          });
      });
    },
    configurePreviewServer(server) {
      if (handler) {
        server.middlewares.use("/api/uploadthing", handler);
      }
      server.middlewares.use("/api/museum-audio", (_req, res) => {
        getMuseumAudioUrls()
          .then((urls) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.setHeader("Cache-Control", "no-store");
            res.end(JSON.stringify(urls));
          })
          .catch(() => {
            res.statusCode = 200;
            res.end(JSON.stringify({}));
          });
      });
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
