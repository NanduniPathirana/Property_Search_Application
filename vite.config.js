import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Property_Search_Application/',
  
  test: {
    environment: "jsdom",      // Browser-like environment
    globals: true,             // Use test(), expect() without imports
    setupFiles: "./src/setupTests.js"
  }
});

