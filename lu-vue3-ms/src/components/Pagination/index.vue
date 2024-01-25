<template>
  <div :class="{ hidden: hidden }" class="pagination-container">
    <el-pagination
      :background="background"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :layout="layout"
      :page-sizes="pageSizes"
      :pager-count="pagerCount"
      :total="total"
      small
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  total: {
    required: true,
    type: Number
  },
  page: {
    type: Number,
    default: 1
  },
  limit: {
    type: Number,
    default: 20
  },
  pageSizes: {
    type: Array,
    default() {
      return [10, 20, 30, 50]
    }
  },
  // 移动端页码按钮的数量端默认值5
  pagerCount: {
    type: Number,
    default: document.body.clientWidth < 992 ? 5 : 7
  },
  layout: {
    type: String,
    default: 'total, sizes, prev, pager, next'
  },
  background: {
    type: Boolean,
    default: true
  },
  hidden: {
    type: Boolean,
    default: false
  }
})

const emit: any = defineEmits()
const currentPage = computed({
  get() {
    return props.page
  },
  set(val: any) {
    emit('update:page', val)
  }
})
const pageSize = computed({
  get() {
    return props.limit
  },
  set(val: any) {
    emit('update:limit', val)
  }
})
function handleSizeChange(val: number) {
  if (currentPage.value * val > props.total) {
    currentPage.value = 1
  }
  emit('pagination', { page: currentPage.value, limit: val })
}
function handleCurrentChange(val: any) {
  emit('pagination', { page: val, limit: pageSize.value })
}
</script>

<style scoped>
.pagination-container {
  background: #fff;
}
.pagination-container.hidden {
  display: none;
}
</style>
