import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/", // כאן עדכן לנתיב שבו רץ האתר שלך
  plugins: [react()],
  server: {
    port: 5173, // ודא שהפורט נכון
  },
});
