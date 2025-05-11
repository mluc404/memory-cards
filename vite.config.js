import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    host: "0.0.0.0",
  },
  base:
    process.env.NODE_ENV === "production" &&
    process.env.DEPLOY_PLATFORM === "github"
      ? "/memory-cards/"
      : "/",
});
