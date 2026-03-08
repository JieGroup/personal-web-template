import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

// Load environment variables based on mode
export default defineConfig(({ mode }) => {
  // Load the appropriate .env file based on the mode (e.g., .env.production, .env.development)
  dotenv.config({ path: `.env.${mode}` });

  // Log the mode to debug during builds
  console.log('Vite mode:', mode);

  // Extract API base URL from environment variables
  const apiBaseUrl = process.env.VITE_API_BASE_URL || 'http://localhost:5200';
  console.log('apiBaseUrl:', process.env.VITE_API_BASE_URL);
  return {
    server: {
      cors: true, // Enable CORS
      host: '0.0.0.0', // Bind to all network interfaces
      port: 5300, // Development server port
      strictPort: true, // Ensure exact port usage or fail
      hmr: {
        protocol: 'ws',
        host: '0.0.0.0',
        port: 5300,
        overlay: false,
        clientPort: 5300
      },
      proxy: {
        '/api': {
          target: apiBaseUrl, // Proxy API calls to the backend
          changeOrigin: true,
          secure: false, // Disable SSL verification for local development
        },
      },
    },
    build: {
      outDir: 'build', // Output directory for the production build
      emptyOutDir: true, // Clear the output directory before building
      sourcemap: mode === 'development', // Only generate sourcemaps in development
      chunkSizeWarningLimit: 1000, // Increase chunk size warning limit for larger bundles
    },
    plugins: [react()],
  };
});
