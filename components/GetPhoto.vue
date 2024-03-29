<script setup lang="ts">
import { ref } from 'vue';

const video = ref<HTMLVideoElement>();
const canvas = ref<HTMLCanvasElement>();
const photoResult = ref<string>();

const openCamera = () => {
  if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
      .getUserMedia({ video: { width: 180 } })
      .then((mediaStream) => {
        if (video.value) {
          video.value.srcObject = mediaStream;
          video.value.onloadedmetadata = () => {
            video.value?.play();
          };
        }
      })
      .catch(function (error) {
        console.log('Something went wrong!');
      });
  }
};

function capture() {
  if (!canvas.value || !video.value) {
    return;
  }
  canvas.value.width = video.value.videoWidth;
  canvas.value.height = video.value.videoHeight;

  canvas.value.getContext('2d')?.drawImage(video.value, 0, 0, canvas.value.width, canvas.value.height);

  photoResult.value = canvas.value.toDataURL();
}
</script>

<template>
  <div class="flex flex-col w-full">
    <div class="flex gap-x-2">
      <!-- open camera -->
      <Button @click="openCamera">Take Photo</Button>

      <!-- capture photo -->
      <Button @click="capture">Capture</Button>
    </div>

    <video class="size-44" ref="video"></video>

    <canvas class="hidden size-44" ref="canvas"></canvas>

    Image Result:
    <img v-if="photoResult" class="size-44" :src="photoResult" />
  </div>
</template>
