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
      <component :is="currentCom"></component>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import ImgToBase64 from "./components/ImgToBase64.vue";
import PDF from "./components/PDF.vue";

const menus = [
  {
    title: "图片转base64",
    id: "base64",
    component: markRaw(ImgToBase64),
  },
  {
    title: "在线预览PDF",
    id: "PDF",
    component: markRaw(PDF),
  },
];
// 默认选择
const defaultActive = ref(menus[0].id);
// 当前显示的组件
const currentCom = ref(menus[0].component);
const selectMenu = (v: string) => {
  defaultActive.value = v;
  const idx = menus.findIndex((item) => item.id === v);
  currentCom.value = menus[idx].component;
  console.log(currentCom);
};
</script>
<style lang="scss" scoped>
.el-menu-demo {
  .el-menu-item {
    height: 36px;
  }
}
</style>
