<template>
  <el-scrollbar
    ref="virtualRef"
    :height="boxHeight"
    noresize
    @scroll="handleScroll"
    v-loading="loading"
    always
    style="width: 200px"
  >
    <div class="virtual" :style="{ height: scrollHeight + 'px' }">
      <div
        class="reList"
        :style="{ transform: 'translateY(' + startOffset + 'px)' }"
      >
        <div
          class="Vitem"
          :style="{ height: itemHeight + 'px' }"
          v-for="item in list"
          :key="item.id"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { debounce } from "@/utils/tool";

interface p {
  id: number;
  name: string;
  [key: string]: any;
}
interface Props {
  itemHeight?: number;
  boxHeight?: number;
  originalData: p[];
}
const props = withDefaults(defineProps<Props>(), {
  itemHeight: 30,
  boxHeight: 300,
  originalData: () => [],
});
const { itemHeight, boxHeight, originalData } = toRefs(props);

const loading = ref(true);
setTimeout(() => {
  loading.value = false;
}, 2000);
// 要渲染的数据列表
const list: Ref = ref([]);
// 偏移位置
const scrollHeight = computed(() => {
  return originalData.value.length * itemHeight.value;
});
// console.log(scrollHeight.value, "scrollHeight");

list.value = originalData.value.slice(
  0,
  Math.ceil(boxHeight.value / itemHeight.value)
);
// 元素平移位置
const startOffset = ref(0);

// 滚动
const scroll = (v: { scrollTop: number }) => {
  console.log("滚动触发");
  // 获取滚动条距离顶部的距离
  const scrollTop = v.scrollTop;
  // console.log(scrollTop);
  // 计算当前滚动条距离顶部的项的索引，向下取整
  const start = Math.floor(scrollTop / itemHeight.value);
  // console.log(start, "start");
  // 计算当前滚动条距离底部的项的索引，向上取整 多取一条数据，防止底部出现空白
  const end = start + Math.ceil(boxHeight.value / itemHeight.value) + 1;
  // console.log(end, "end");
  // 列表平移到当前滚动条的位置    开始位置 * 项高
  startOffset.value = start * itemHeight.value;
  // 截取数据源
  list.value = originalData.value.slice(start, end);
};
// 滚动条防抖
const handleScroll = debounce(scroll, 30);
</script>
<style lang="scss" scoped>
.virtual {
  width: 200px;
  background: rgb(149, 250, 179);
  position: relative;
}
.virList {
  width: 100%;
}
.reList {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  .Vitem {
    width: 100%;
  }
}
</style>
