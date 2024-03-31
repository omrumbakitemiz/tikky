<script setup lang="ts">
import { blobToBase64 } from '@/utils/blob';
import { Loader2 } from 'lucide-vue-next';
import Camera from 'simple-vue-camera';

const camera = ref<InstanceType<typeof Camera>>();
const cameraEnabled = ref(false);
const base64Image = ref<string>();
const openAIResponse = ref();
const loading = ref(false);

const snapshot = async () => {
  const blob = await camera.value?.snapshot();

  if (!blob) {
    console.error('Something went wrong while taking the snapshot');
    return;
  }

  base64Image.value = await blobToBase64(blob);
  console.log(base64Image.value);

  cameraEnabled.value = false;
};

const clearImage = () => {
  base64Image.value = '';
  cameraEnabled.value = true;
};

const generateData = async () => {
  loading.value = true;

  const response = await $fetch('/vision', {
    method: 'POST',
    body: {
      imageString: base64Image.value,
    },
  });

  openAIResponse.value = response;

  loading.value = false;
};
</script>

<template>
  <div class="flex flex-col w-44 gap-y-6">
    <div class="w-full">
      <Button class="w-full" v-if="!cameraEnabled" @click="cameraEnabled = !cameraEnabled">Open Camera</Button>
      <Button class="w-full" variant="secondary" v-else @click="cameraEnabled = !cameraEnabled">Close Camera</Button>
    </div>

    <Camera v-if="cameraEnabled" ref="camera" :resolution="{ width: 300, height: 300 }">
      <div class="size-full flex justify-center items-end">
        <div class="p-1 cursor-pointer" @click="snapshot">📸</div>
      </div>
    </Camera>

    <div>
      <img v-if="base64Image" :src="base64Image" alt="Snapshot" class="w-full" />
    </div>

    <div class="flex flex-col gap-y-3">
      <Button :disabled="!base64Image" class="w-full" variant="secondary" @click="generateData">
        <span v-if="loading"><Loader2 class="w-4 h-4 mr-2 animate-spin" />Please wait</span>
        <span v-else>Upload Photo</span>
      </Button>

      <Button :disabled="!base64Image" class="w-full" variant="destructive" @click="clearImage">Clear Image</Button>
    </div>

    <div>
      <span>openAIResponse: {{ JSON.stringify(openAIResponse) }}</span>
    </div>
  </div>
</template>
