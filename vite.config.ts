import { defineConfig } from 'vite'

// One self-contained script per major version: dist/v1/relay.js (window.Relay). public/ holds the demo
// page served at the site root (https://ritesh-dhekane.github.io/relay/).
export default defineConfig({
  base: '/relay/',
  build: {
    lib: { entry: 'src/index.ts', name: 'Relay', formats: ['iife'], fileName: () => 'v1/relay.js' },
    target: 'es2020',
  },
})
