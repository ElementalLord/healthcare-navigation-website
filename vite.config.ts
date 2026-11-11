import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Relative base so the built site works on GitHub Pages or any sub-folder.
  base: './',
  plugins: [react(), tailwindcss()],
  build: {
    // React + Framer Motion + the router are ~185 KB gzipped; that's expected for this stack.
    chunkSizeWarningLimit: 700,
  },
  resolve: {
    alias: { '@': path.resolve(import.meta.dirname, './src') },
  },
})
