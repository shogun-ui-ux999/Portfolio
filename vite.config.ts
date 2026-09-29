import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    hmr: false,
    port: Number(process.env.PORT) || 5173,
    // Allow the managed Freebuff/E2B preview host (port-prefixed,
    // so the whole sandbox provider suffix is allowed).
    allowedHosts: [".e2b.app"],
  },
  preview: {
    host: "0.0.0.0",
    port: Number(process.env.PORT) || 4173,
  },
});
