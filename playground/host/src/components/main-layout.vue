<script setup lang="ts">
import { ref } from 'vue';
import MainEditor from './main-editor.vue';
import MainPreview from './main-preview.vue';

const isDragging = ref(false);
const editorHeight = ref(500);
const windowHeight = window.innerHeight;

const startDrag = (event: MouseEvent) => {
  editorHeight.value = windowHeight - event.y;
};

const finishDrag = () => {
  isDragging.value = false;
  document.removeEventListener('mousemove', startDrag);
};

const onMousedown = () => {
  isDragging.value = true;
  document.addEventListener('mousemove', startDrag);
};

document.addEventListener('mouseup', finishDrag);
</script>

<template>
  <div class="layout dark" :style="{ '--editor-height': editorHeight + 'px' }">
    <div class="layout__preview">
      <main-preview></main-preview>
      <div class="shade" :class="{ 'shade--visible': isDragging }"></div>
    </div>

    <div class="layout__editor">
      <main-editor></main-editor>
      <div class="drag-line" @mousedown="onMousedown" @mouseup="finishDrag"></div>
    </div>
  </div>
</template>

<style lang="scss">
.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;

  &__preview {
    flex: 1;
    position: relative;
    overflow: hidden;

    .shade {
      display: none;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;

      &--visible {
        display: block;
      }
    }
  }

  &__editor {
    position: relative;
    width: 100%;
    height: var(--editor-height);
    background-color: var(--main-bg-color);
    color: var(--main-color);

    .drag-line {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      z-index: 3;
      height: 4px;
      background-color: transparent;
      transition: background-color 0.2s;
      cursor: n-resize;

      &:hover {
        background-color: var(--border-color);
      }
    }
  }
}
</style>
