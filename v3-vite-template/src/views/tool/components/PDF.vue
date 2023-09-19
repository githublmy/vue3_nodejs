<template>
  <div style="height: 100%">
    <VuePdfApp :pdf="pd"></VuePdfApp>
  </div>
</template>

<script lang="ts" setup>
import VuePdfApp from "vue3-pdf-app";
import "vue3-pdf-app/dist/icons/main.css";
import pd from "@/assets/document/test2.pdf";
</script>
<style lang="scss" scoped>
:deep(.pdf-vue3-canvas-container) {
  height: $page-height;
}
</style>
