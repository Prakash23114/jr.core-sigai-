import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// ✅ ESM-safe export (works with Node 18+)
export default defineConfig({
  plugins: [react()],
});
