<template>
  <el-row>
    <el-col :span="4">
      <el-scrollbar height="calc(100vh - 80px)">
        <el-menu
          class="el-menu-demo"
          :default-active="defaultActive"
          @select="selectMenu"
        >
          <el-menu-item v-for="item in menus" :index="item.id" :key="item.id">
            {{ item.title }}
          </el-menu-item>
        </el-menu>
      </el-scrollbar>
    </el-col>
    <el-col :span="20">
      <el-scrollbar height="calc(100vh - 80px)">
        <component :is="currentCom" v-bind="propsObject"></component>
      </el-scrollbar>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
const arr = Array(100000)
  .fill("")
  .map((_item, i) => ({ id: i + 1, name: "数据项" + (i + 1) }));
const propsObject = ref({
  // 组件参数
  itemHeight: 30,
  boxHeight: 300,
  originalData: arr,
});
// 异步组件
const ImgToBase64 = defineAsyncComponent(
  () => import("./components/ImgToBase64.vue")
);
const Sign = defineAsyncComponent(() => import("./components/Sign.vue"));
const CountAnimate = defineAsyncComponent(
  () => import("./components/CountAnimate.vue")
);
const VirtualList = defineAsyncComponent(
  () => import("./components/VirtualList.vue")
);
const VirtualList2 = defineAsyncComponent(
  () => import("./components/VirtualList2.vue")
);
const menus = [
  {
    title: "图片转base64",
    id: "base64",
    component: markRaw(ImgToBase64),
  },
  {
    title: "电子签名",
    id: "sign",
    component: markRaw(Sign),
  },
  {
    title: "数字动画",
    id: "CountAnimate",
    component: markRaw(CountAnimate),
  },
  {
    title: "虚拟列表",
    id: "VirtualList",
    component: markRaw(VirtualList),
  },{
    title: "虚拟列表el滚动条",
    id: "VirtualList2",
    component: markRaw(VirtualList2),
  }
];
// 默认选择
const defaultActive = ref(menus[4].id);
// 当前显示的组件
const currentCom = ref(menus[4].component);
const selectMenu = (v: string) => {
  defaultActive.value = v;
  const idx = menus.findIndex((item) => item.id === v);
  currentCom.value = menus[idx].component;
  // console.log(currentCom);
};
</script>
<style lang="scss" scoped>
.el-menu-demo {
  .el-menu-item {
    height: 36px;
  }
}
</style>
