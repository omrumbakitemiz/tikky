<script setup lang="ts">
// get version from runtimeConfig
const config = useRuntimeConfig();
const route = useRoute();

const video = ref<HTMLVideoElement | null>(null);

const openCamera = () => {
  // open camera
  navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
    const video = document.createElement('video');
    video.srcObject = stream;
    video.autoplay = true;
    document.body.appendChild(video);
  });
};
</script>

<template>
  <div>
    <NuxtPwaManifest />
    <NuxtLayout>
      <div class="flex flex-col gap-y-4">
        <ClientOnly> PWA Installed: {{ $pwa?.isPWAInstalled }} </ClientOnly>

        <p>App Version: {{ config.public.appVersion }}</p>

        <p>ID (from query param): {{ route.query.id }}</p>

        <!-- open camera -->
        <Button @click="openCamera">Open Camera</Button>
        <video ref="video" autoplay></video>
      </div>
    </NuxtLayout>
  </div>
</template>
