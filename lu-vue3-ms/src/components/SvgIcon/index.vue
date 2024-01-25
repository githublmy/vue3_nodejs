<template>
  <i class="el-icon">
    <svg aria-hidden="true" class="svg-icon" :class="className">
      <use :href="symbolId" />
    </svg>
  </i>
</template>
<script setup lang="ts">
const props = defineProps({
  prefix: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    required: true,
    default: ''
  },
  className: {
    type: String,
    default: ''
  }
})
const symbolId = computed(() => `#${props.prefix}-${props.name}`)
// console.log(symbolId);
</script>
<style lang="scss" scoped>
.isvg {
  vertical-align: middle;
  margin-right: 5px;
  width: var(--el-menu-icon-width);
}
</style>
