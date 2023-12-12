import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "remote-app",
      filename: "remoteEntry.js",
      // Modules to expose
      exposes: {
        "./routes": "./src/routes/index.tsx",
      },
      shared: [],
    }),
  ],
  server: {
    port: 4401,
  },
  preview: {
    port: 4402,
  },
});
