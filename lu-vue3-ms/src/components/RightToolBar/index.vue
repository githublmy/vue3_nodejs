<template>
  <div class="top-right-btn">
    <el-row>
      <el-tooltip effect="dark" :content="!showBorder ? '显示边框' : '隐藏边框'" placement="top">
        <el-button size="default" circle v-blur icon="FullScreen" @click="toggleBorder()" />
      </el-tooltip>
      <el-tooltip
        effect="dark"
        :content="showSearch ? '隐藏搜索' : '显示搜索'"
        placement="top"
        v-if="search"
      >
        <el-button v-blur size="default" circle icon="Search" @click="toggleSearch()" />
      </el-tooltip>
      <el-tooltip effect="dark" content="刷新" placement="top">
        <el-button v-blur circle size="default" icon="Refresh" @click="refresh()" />
      </el-tooltip>
    </el-row>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  showBorder: {
    type: Boolean,
    default: true
  },
  showSearch: {
    type: Boolean,
    default: true
  },
  search: {
    type: Boolean,
    default: true
  }
})

const emits = defineEmits(['update:showBorder', 'update:showSearch', 'queryTable'])
// 边框
function toggleBorder() {
  console.log(props)
  emits('update:showBorder', !props.showBorder)
}
// 搜索
function toggleSearch() {
  emits('update:showSearch', !props.showSearch)
}

// 刷新
function refresh() {
  emits('queryTable')
}
</script>

<style lang="scss" scoped>
.top-right-btn {
  margin-left: auto;
}

:deep(.el-transfer__button) {
  border-radius: 50%;
  display: block;
  margin-left: 0px;
}

:deep(.el-transfer__button:first-child) {
  margin-bottom: 10px;
}

.my-el-transfer {
  text-align: center;
}
</style>
