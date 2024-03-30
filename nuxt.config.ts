import process from 'node:process';

const sw = process.env.SW === 'true';

export default defineNuxtConfig({
  app: {
    head: {
      viewport: 'width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0',
    },
  },
  runtimeConfig: {
    // Public keys that are exposed to the client
    public: {
      appVersion: process.env.npm_package_version,
      env: process.env.NODE_ENV as 'DEVELOPMENT' | 'PRODUCTION',
    },
  },
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt', '@nuxtjs/color-mode', '@vite-pwa/nuxt'],
  shadcn: {
    prefix: '',
    componentDir: './components/ui',
  },
  colorMode: {
    classSuffix: '',
  },
  pwa: {
    strategies: sw ? 'injectManifest' : 'generateSW',
    srcDir: sw ? 'service-worker' : undefined,
    filename: sw ? 'sw.ts' : undefined,
    registerType: 'autoUpdate',
    manifest: {
      orientation: 'any',
      display: 'standalone',
      lang: 'en',
      name: 'Tikky',
      short_name: 'Tikky',
      start_url: process.env.NODE_ENV === 'PRODUCTION' ? 'https://tikky.immino.dev' : 'localhostL3000',
      scope: process.env.NODE_ENV === 'PRODUCTION' ? 'https://tikky.immino.dev' : 'localhostL3000',
      description: 'Pay Friends Easily: Your Bill Sharing Solution!',
      theme_color: '#8936FF',
      background_color: '#2EC6FE',
      icons: [
        {
          purpose: 'maskable',
          sizes: '512x512',
          src: 'icon512_maskable.png',
          type: 'image/png',
        },
        {
          purpose: 'any',
          sizes: '512x512',
          src: 'icon512_rounded.png',
          type: 'image/png',
        },
      ],
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    },
    injectManifest: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    },
    client: {
      installPrompt: true,
      // you don't need to include this: only for testing purposes
      // if enabling periodic sync for update use 1 hour or so (periodicSyncForUpdates: 3600)
      periodicSyncForUpdates: 20,
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallback: '/',
      navigateFallbackAllowlist: [/^\/$/],
      type: 'module',
    },
  },
});
