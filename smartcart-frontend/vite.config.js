import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,          // Set the default port to 5173
    strictPort: true,    // Prevent Vite from switching to another port
  },
})
