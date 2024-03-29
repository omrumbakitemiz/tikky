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

        const track = mediaStream.getVideoTracks()[0];
      })
      .catch(function (error) {
        console.log('Something went wrong!');
      });
  }
};

function capture() {
  if (!canvas.value || !video.value || !photoResult.value) {
    return;
  }
  canvas.value.width = 180;
  canvas.value.height = 180;

  canvas.value.getContext('2d')?.drawImage(video.value, 0, 0, canvas.value.width, canvas.value.height);

  photoResult.value = canvas.value.toDataURL();
  console.log(photoResult.value);
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

    <video ref="video"></video>

    <canvas class="hidden" ref="canvas"></canvas>
  </div>
</template>
