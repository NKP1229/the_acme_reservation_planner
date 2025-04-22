import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const serverPort = process.env.PORT || 3000;
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": `http://localhost:${serverPort}`,
    },
  },
});
