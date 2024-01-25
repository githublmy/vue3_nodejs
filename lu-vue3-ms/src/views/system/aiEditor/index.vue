<template>
  <div class="baseStyle aiEdit">
    <el-scrollbar>
      <AiEditor />
    </el-scrollbar>
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
