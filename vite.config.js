import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import projectPhotos from './plugins/projectPhotos.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), projectPhotos()],
})
