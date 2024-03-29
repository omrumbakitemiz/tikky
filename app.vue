<script setup lang="ts">
// get version from runtimeConfig
const config = useRuntimeConfig();
const route = useRoute();
</script>

<template>
  <div>
    <NuxtPwaManifest />
    <NuxtLayout>
      <div class="flex flex-col gap-y-4">
        <ClientOnly> PWA Installed: {{ $pwa?.isPWAInstalled }} </ClientOnly>

        <p>App Version: {{ config.public.appVersion }}</p>

        <p>ID (from query param): {{ route.query.id }}</p>

        <ClientOnly>
          <GetPhoto />
        </ClientOnly>
      </div>
    </NuxtLayout>
  </div>
</template>
