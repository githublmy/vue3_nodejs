<template>
  <div class="baseStyle aiEdit">
    <AiEditor />
  </div>
</template>

<script lang="ts" setup>
import AiEditor from './components/AiEditor/index.vue'
</script>
<style lang="scss" scoped>
.aiEdit {
  .aie-container {
    div {
      span {
        display: none;
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.aiEdit {
  height: 100%;
}
</style>
