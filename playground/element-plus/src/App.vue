<script setup lang="ts">
import { ref } from 'vue';

const content = ref('');

window.addEventListener('message', (event) => {
  const { origin, data } = event;
  if (origin !== 'http://192.168.1.87:5100') return;

  console.log(event.origin, event);
  content.value = data;
});
</script>

<template>{{ content }}</template>

<style lang="scss" scoped></style>
