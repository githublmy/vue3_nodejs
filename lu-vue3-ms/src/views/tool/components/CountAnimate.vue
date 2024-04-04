<template>
  <div>
    <el-button type="primary" size="default" @click="startAni">开始</el-button>
    <div>{{ num }}</div>
  </div>
</template>

<script lang="ts" setup>
import { animationForCount } from '@/utils/tool'
const num = ref(4599)
const startAni = () => {
  animationForCount(800, 0, num.value, (v: number) => {
    num.value = Math.round(v)
  })
}
startAni()
</script>
