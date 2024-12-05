import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    host: true,
    port: parseInt(process.env.PORT) || 5173,
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'http://localhost:8080',
        changeOrigin: true
      }
    }
  },
  build: {
    sourcemap: true,  // Add sourcemaps for debugging
    minify: 'terser',  // Use terser for better minification
    terserOptions: {
      compress: {
        drop_console: true,  // Remove console logs
        drop_debugger: true  // Remove debugger statements
      }
    },
    outDir: 'dist'
  },
  optimizeDeps: {
    exclude: ['backend'],
    entries: [
      'src/**/*.vue',
      'src/**/*.js'
    ]
  },
  define: {
    'import.meta.env.VITE_API_URL': JSON.stringify('https://horsetooth-backend-885625737131.us-central1.run.app')
  }
})
