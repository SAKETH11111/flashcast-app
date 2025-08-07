import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import svgr from "vite-plugin-svgr"

// Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  plugins: [react(), svgr()],
  // On Vercel (root domain), assets should be served from root
  base: "/",
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "three": resolve(__dirname, "./node_modules/three"),
    },
  },
  assetsInclude: ['**/*.glb', '**/*.glsl'],
  css: {
    postcss: './postcss.config.js'
  }
})
