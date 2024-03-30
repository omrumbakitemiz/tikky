<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
</script>

<template>
  <div class="h-screen">
    <NuxtPwaManifest />
    <NuxtLayout>
      <div class="flex flex-col gap-y-4">
        <ClientOnly v-if="runtimeConfig.public.env === 'PRODUCTION'"> PWA Installed: {{ $pwa?.isPWAInstalled }} </ClientOnly>

        <GetPhotoNew />
      </div>
    </NuxtLayout>
  </div>
</template>
