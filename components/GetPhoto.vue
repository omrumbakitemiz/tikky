<script lang="ts" setup>
import { ref } from 'vue';

const video = ref<HTMLVideoElement>();
const canvas = ref<HTMLCanvasElement>();
const photoResult = ref<HTMLDivElement>();

const openCamera = () => {
  if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((mediaStream) => {
        if (video.value) {
          video.value.srcObject = mediaStream;
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
  canvas.value.width = 200;
  canvas.value.height = 200;
  canvas.value.getContext('2d')?.drawImage(video.value, 0, 0, 200, 200);

  photoResult.value.innerHTML = canvas.value.toDataURL();
}
</script>

<template>
  <div>
    <div class="flex gap-x-2">
      <!-- open camera -->
      <Button @click="openCamera">Take Photo</Button>

      <!-- capture photo -->
      <Button @click="capture">Capture</Button>
    </div>

    <video ref="video" autoplay></video>

    <canvas ref="canvas"></canvas>

    <div ref="photoResult"></div>
  </div>
</template>
