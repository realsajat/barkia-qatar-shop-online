import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
    // Bundle analyzer - generates stats.html in dist folder
    mode === 'production' && visualizer({
      filename: 'dist/stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Manual chunk splitting for better caching
        manualChunks: {
          // React and React DOM
          'react-vendor': ['react', 'react-dom'],
          // React Router
          'router': ['react-router-dom'],
          // UI components and animations
          'ui-vendor': [
            '@radix-ui/react-accordion',
            '@radix-ui/react-alert-dialog',
            '@radix-ui/react-aspect-ratio',
            '@radix-ui/react-avatar',
            '@radix-ui/react-checkbox',
            '@radix-ui/react-collapsible',
            '@radix-ui/react-context-menu',
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-hover-card',
            '@radix-ui/react-label',
            '@radix-ui/react-menubar',
            '@radix-ui/react-navigation-menu',
            '@radix-ui/react-popover',
            '@radix-ui/react-progress',
            '@radix-ui/react-radio-group',
            '@radix-ui/react-scroll-area',
            '@radix-ui/react-select',
            '@radix-ui/react-separator',
            '@radix-ui/react-slider',
            '@radix-ui/react-slot',
            '@radix-ui/react-switch',
            '@radix-ui/react-tabs',
            '@radix-ui/react-toast',
            '@radix-ui/react-toggle',
            '@radix-ui/react-toggle-group',
            '@radix-ui/react-tooltip'
          ],
          // Animation libraries
          'animation': ['framer-motion', 'embla-carousel-react'],
          // Utility libraries
          'utils': [
            'clsx',
            'class-variance-authority',
            'tailwind-merge',
            'date-fns',
            'zod'
          ],
          // Form libraries
          'forms': [
            'react-hook-form',
            '@hookform/resolvers',
            'input-otp'
          ],
          // Icons and charts
          'icons-charts': ['lucide-react', 'recharts'],
          // Query and state management
          'query': ['@tanstack/react-query'],
          // Other libraries
          'misc': [
            'cmdk',
            'emailjs-com',
            'next-themes',
            'react-day-picker',
            'react-resizable-panels',
            'sonner',
            'vaul'
          ]
        }
      }
    },
    // Enable source maps for better debugging in production
    sourcemap: mode === 'development',
    // Minify for production
    minify: mode === 'production' ? 'esbuild' : false,
    // Target modern browsers for better optimization
    target: 'es2015',
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@tanstack/react-query',
      'framer-motion',
      'lucide-react'
    ],
  },
}));
