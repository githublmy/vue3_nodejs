<template>
  <div
    class="virtual-list"
    v-loading="loading"
    :style="{ height: boxHeight + 'px' }"
  >
    <div class="scrollView" @scroll="onScroll" ref="scrollViewRef">
      <div
        class="virtualScroller"
        :style="{ height: scrollHeight + 'px' }"
      ></div>

      <div class="list" :style="{ transform: `translateY(${startOffset}px)` }">
        <div
          class="item"
          v-for="item in list"
          :key="item"
          :style="{ height: itemHeight + 'px', lineHeight: itemHeight + 'px' }"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
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
// 虚拟列表
const scrollViewRef = ref();
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
const startOffset = ref(0);

// 滚动
const scroll = () => {
  // 获取滚动条距离顶部的距离
  const scrollTop = scrollViewRef.value.scrollTop;
  // console.log(scrollTop);
  // 计算当前滚动条距离顶部的项的索引，向下取整
  const start = Math.floor(scrollTop / itemHeight.value);
  // console.log(start, "start");
  // 计算当前滚动条距离底部的项的索引，向上取整  多取一条数据，防止底部出现空白
  const end = start + Math.ceil(boxHeight.value / itemHeight.value) + 1;
  // console.log(end, "end");
  // 列表滚动到当前滚动条的位置    开始位置 * 项高
  startOffset.value = start * itemHeight.value;
  // 截取数据源
  list.value = originalData.value.slice(start, end);
};
// 滚动条防抖
const onScroll = debounce(scroll, 30);
</script>
<style lang="scss" scoped>
.virtual-list {
  width: 200px;
}
.scrollView {
  background: #f00;
  overflow-y: auto;
  height: 100%;
  width: 100%;
  position: relative;

  .list {
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
