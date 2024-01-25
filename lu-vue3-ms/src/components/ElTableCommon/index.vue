<template>
  <div>
    <el-row v-if="config" class="mb8" align="bottom">
      <slot name="toolbar" />
      <RightToolBar
        v-model:showBorder="config.showBorder"
        v-model:showSearch="config.showSearch"
        @queryTable="config.handleEvent"
      />
    </el-row>
    <el-table
      :data="tableData"
      :size="size"
      v-adaptive
      :border="config?.showBorder"
      :row-key="rowKey"
      :tree-props="treeProps"
      :header-cell-style="headerRowStyle"
      v-loading="loading"
      @select="handleSelect"
      @selection-change="handleSelectionChange"
    >
      <template v-for="item in tableTitle" :key="item.prop">
        <el-table-column
          :align="item.align || 'center'"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :minWidth="item.minWidth"
          :type="item.type"
          :fixed="item.fixed"
        >
          <template v-if="item.slot" #default="{ row, $index }">
            <slot :name="item.slot" :row="row" :index="$index"></slot>
          </template>
          <!-- 是否有操作按钮 -->
          <template v-if="item.type == 'operate'" #default="{ row }">
            <el-button
              v-for="(item2, index2) in item.btnList"
              :key="index2"
              :type="item2.type"
              :plain="item2.plain || true"
              :icon="item2.icon"
              :size="item2.size || 'small'"
              :link="item2.link || true"
              @click="item2.handleEventBtn(row)"
              v-blur
              >{{ item2.text }}</el-button
            >
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div v-if="total > 0" class="pagination-container">
      <el-pagination
        :background="background"
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :layout="layout"
        :page-sizes="pageSizes"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { TableOptions } from '@/types/index'
const headerRowStyle = () => {
  return {
    // background: "#e9f1fa",
  }
}
interface IPt {
  page: number
  limit: number
}

const emit = defineEmits<{
  (event: 'pagination', obj: IPt): void
  (event: 'selectTableRow', val: TableOptions): void
  (event: 'selectSingle', selection: TableOptions[], row: TableOptions): void
  (event: 'update:page', id: number): void
  (event: 'update:limit', id: number): void
}>()
const props = defineProps({
  config: {
    type: Object
  },
  tableTitle: {
    type: Array as PropType<TableOptions[]>
  },
  tableData: {
    type: Array as any
  },
  total: {
    type: Number,
    default: 0
  },
  rowKey: {
    type: [Number, String],
    default: null
  },
  treeProps: {
    type: Object,
    default: () => {}
  },
  loading: Boolean,
  page: {
    type: Number,
    default: 1
  },
  limit: {
    type: Number,
    default: 10
  },
  pageSizes: {
    type: Array,
    default() {
      return [10, 20, 30, 50]
    }
  },
  layout: {
    type: String,
    default: 'total, sizes, prev, pager, next, jumper'
  },
  background: {
    type: Boolean,
    default: true
  },
  size: {
    type: String,
    default: 'default'
  }
})

const { config, tableTitle, tableData, total, loading, page, limit, size, rowKey, treeProps } =
  toRefs(props)

const currentPage = computed({
  get() {
    return page.value
  },
  set(val: number) {
    emit('update:page', val)
  }
})
const pageSize = computed({
  get() {
    return limit.value
  },
  set(val: number) {
    emit('update:limit', val)
  }
})
const handleSelectionChange = (val: TableOptions) => {
  emit('selectTableRow', val)
}

/**
 * @description: 单选
 * @param {*} val
 * @return {*}
 */
const handleSelect = (selection: TableOptions[], row: TableOptions) => {
  emit('selectSingle', selection, row)
}
const handleSizeChange = (val: number) => {
  if (currentPage.value * val > total.value) {
    currentPage.value = 1
  }
  emit('pagination', { page: currentPage.value, limit: val })
}
function handleCurrentChange(val: number) {
  emit('pagination', { page: val, limit: pageSize.value })
}
</script>
<style lang="scss" scoped>
.pagination-container {
  box-sizing: border-box;
  margin-top: 10px;
}
</style>
