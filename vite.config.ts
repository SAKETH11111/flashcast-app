import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  plugins: [react()],
  base: "/flashcast-app/",
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      // Ensure all imports of 'three' resolve to the same instance
      "three": resolve(__dirname, "./node_modules/three"), 
    },
  },
  assetsInclude: ['**/*.glb', '**/*.glsl'], // Tell Vite to treat .glb and .glsl as assets
})
