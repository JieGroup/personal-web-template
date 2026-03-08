import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

// Load environment variables based on mode
export default defineConfig(({ mode }) => {
  dotenv.config({ path: `.env.${mode}` });

  console.log('Vite mode:', mode);

  const apiBaseUrl = process.env.VITE_API_BASE_URL || 'http://localhost:5200';

  // Set base path: use VITE_BASE_PATH env var, or '/' by default
  // For GitHub Pages deployment set VITE_BASE_PATH=/personal-web-template/
  const base = process.env.VITE_BASE_PATH || '/';

  return {
    base,
    server: {
      cors: true,
      host: '0.0.0.0',
      port: 5300,
      strictPort: true,
      hmr: {
        protocol: 'ws',
        host: '0.0.0.0',
        port: 5300,
        overlay: false,
        clientPort: 5300
      },
      proxy: {
        '/api': {
          target: apiBaseUrl,
          changeOrigin: true,
          secure: false,
        },
      },
    },
    build: {
      outDir: 'build',
      emptyOutDir: true,
      sourcemap: mode === 'development',
      chunkSizeWarningLimit: 1000,
    },
    plugins: [react()],
  };
});
