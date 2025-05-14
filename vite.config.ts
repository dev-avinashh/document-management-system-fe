import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mkcert from "vite-plugin-mkcert";

export default defineConfig({
  server: {
    port: 5175,
	https: true,
  },
  plugins: [react(), mkcert()],
  build: {
    outDir: "build",
  },
});
