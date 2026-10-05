import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // framer-motion + gsap drive the scroll-3D deck; keep them split so
          // every other route stays small. (No WebGL chunk — the old lattice
          // component is gone; all 3D is DOM perspective transforms.)
          motion: ['framer-motion', 'gsap'],
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
});
