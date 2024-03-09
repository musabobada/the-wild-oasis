import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/the-wild-oasis/",
  plugins: [react(), eslint()],
  server: {
    host: true,
    strictPort: true,
    port: 8080
  }
});
