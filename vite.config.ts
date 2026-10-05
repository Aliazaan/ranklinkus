import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    // One stylesheet: it is small, cached across routes and avoids a flash of unstyled routes.
    cssCodeSplit: false,
  },
})
