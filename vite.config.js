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
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  },
  build: {
    sourcemap: false,  // Disable source maps
    minify: 'terser',  // Use terser for better minification
    terserOptions: {
      compress: {
        drop_console: true,  // Remove console logs
        drop_debugger: true  // Remove debugger statements
      }
    }
  }
})
