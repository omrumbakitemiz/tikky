<script setup lang="ts"></script>

<template>
  <div>
    <NuxtPwaManifest />
    <NuxtLayout>
      <div>
        <h1>Nuxt Vite PWA</h1>
        <ClientOnly> PWA Installed: {{ $pwa?.isPWAInstalled }} </ClientOnly>
      </div>
    </NuxtLayout>
  </div>
</template>
