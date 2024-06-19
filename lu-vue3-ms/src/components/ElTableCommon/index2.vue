<template>
  <div ref="customTable" class="custom-table" :style="{ height: h }">
    <el-table
      ref="tableRef"
      :data="tableData"
      v-bind="attrs"
      :size="size"
      v-loading="loading"
      :header-cell-style="headerRowStyle"
      style="width: 100%"
      :height="tHeight"
    >
      <slot>
        <!-- 遍历表头数据 -->
        <template v-for="(item, _index) in tableTitle" :key="_index">
          <!-- 是否是自定义插槽的数据 -->
          <slot :name="item.slotName ?? ''">
            <el-table-column v-bind="item">
              <!-- 遍历插槽名称 -->
              <template
                v-for="(item2, index2) in item?.slots || []"
                :key="index2"
                #[item2]="scope"
              >
                <slot :name="item2" :scope="scope"></slot>
              </template>
            </el-table-column>
          </slot>
        </template>
      </slot>
    </el-table>
    <div v-if="!hiddenPagination && total > 0" class="pagination-container">
      <el-pagination
        :small="size == 'small' ? true : false"
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
const attrs = useAttrs();
interface IPt {
  page: number;
  limit: number;
}
const h = ref();

const tableRef: Ref = ref();
const emit = defineEmits<{
  (event: "pagination", obj: IPt): void;
  (event: "update:page", id: number): void;
  (event: "update:limit", id: number): void;
}>();
const props = defineProps({
  tableTitle: {
    type: Array as any,
  },
  tableData: {
    type: Array as any,
  },
  height: {
    type: [Number, String],
    default: () => {
      return "";
    },
  },
  total: {
    type: Number,
    default: 0,
  },
  adaptiveConfig: {
    type: Object,
    default: () => {
      return {
        bottomOffset: 0,
      };
    },
  },
  // 是否显示分页
  hiddenPagination: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  page: {
    type: Number,
    default: 1,
  },
  limit: {
    type: Number,
    default: 10,
  },
  pageSizes: {
    type: Array,
    default() {
      return [10, 20, 30, 50];
    },
  },
  layout: {
    type: String,
    default: "total, sizes, prev, pager, next, jumper",
  },
  background: {
    type: Boolean,
    default: true,
  },
  size: {
    type: String,
    default: () => {
      return "default";
    },
  },
  reduceHeight: {
    type: Number,
    default: () => {
      return 58;
    },
  },
  calcHeight: {
    type: [Number, String],
    default: () => {
      return "";
    },
  },
});

const { tableTitle, tableData, total, loading, page, limit } = toRefs(props);
const headerRowStyle = () => {
  return {
    background: "#e9f1fa",
  };
};
const currentPage = computed({
  get() {
    return page.value;
  },
  set(val: number) {
    emit("update:page", val);
  },
});
const pageSize = computed({
  get() {
    return limit.value;
  },
  set(val: number) {
    emit("update:limit", val);
  },
});

const tHeight = computed(() => {
  return props.calcHeight
    ? null
    : `calc(100% - ${
        !props.hiddenPagination ? props.adaptiveConfig.bottomOffset : 0
      }px)`;
});

onMounted(() => {
  nextTick(() => {
    // 表格的高度  20是底部padding的大小
    const dom = document.querySelector(".custom-table") as Element;
    // 隐藏分页距离底部10px ，显示分页距离底部 props.reduceHeight
    const bottom = props.hiddenPagination ? 10 : props.reduceHeight;
    h.value =
      props.calcHeight ||
      `calc(100vh - ${dom.getBoundingClientRect().top + bottom}px)`;
  });
});
const handleSizeChange = (val: number) => {
  if (currentPage.value * val > total.value) {
    currentPage.value = 1;
  }
  tableRef.value.setScrollTop(0);
  emit("pagination", { page: currentPage.value, limit: val });
};
function handleCurrentChange(val: number) {
  tableRef.value.setScrollTop(0);
  emit("pagination", { page: val, limit: pageSize.value });
}

defineExpose({
  tableRef,
});
</script>
<style lang="scss" scoped>
.pagination-container {
  box-sizing: border-box;
  margin-top: 10px;
}
</style>
