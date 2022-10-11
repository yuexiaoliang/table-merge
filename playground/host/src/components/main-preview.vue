<script lang="ts" setup>
import { ref, defineExpose } from 'vue';

const iframe = ref();

const onSend = (data: any) => {
  if (!iframe.value) return;
  iframe.value.contentWindow.postMessage(data, 'http://127.0.0.1:5173/');
};

defineExpose([onSend]);
</script>

<template>
  <div class="main-content">
    <iframe class="main-content__iframe" ref="iframe" src="http://192.168.1.75:8001" scrolling="auto" frameborder="0"></iframe>
  </div>
</template>

<style lang="scss" scoped>
.main-content {
  height: 100%;

  &__iframe {
    width: 100%;
    height: 100%;
  }
}
</style>
