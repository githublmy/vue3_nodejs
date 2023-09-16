<!--
 * @Author: lu
 * @LastEditors: Please set LastEditors
 * @Date: 2022-11-18 10:22:15
 * @LastEditTime: 2023-09-05 15:44:41
 * @Description: 侧边导航
-->
<template>
  <div>
    <div class="logo">
      <img
        :style="{ marginLeft: !isCollapse ? '20px' : '16px' }"
        :class="!isCollapse ? 'img2' : ''"
        src="/vite.svg"
      />
      <i class="sidebar-title" :style="{ opacity: !isCollapse ? 1 : '0' }">{{
        ProjectTitle
      }}</i>
    </div>
    <el-menu
      class="el-menu-vertical-demo"
      :default-active="route.path"
      active-text-color="#00d4ff"
      background-color="#304156"
      text-color="#FFFFFFB3"
      :collapse="isCollapse"
      :collapse-transition="false"
      router
    >
      <SiderItem :menuList="routes" />
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import SiderItem from "./SiderItem.vue";
import { useSidebarStore } from "@/store/modules/sidebar";
import { useUserStore } from "@/store/modules/user";
const { routes } = useUserStore();
const route = useRoute();
const sidebarStore = useSidebarStore();
const isCollapse = computed(() => sidebarStore.isCollapse);
const ProjectTitle = computed(() => import.meta.env.VITE_TITLE);
</script>
<style lang="scss">
// 折叠动画
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
</style>
<style lang="scss" scoped>
.el-menu-vertical-demo {
  border: none;
  :deep(.el-menu-item.is-active) {
    // background-color: #1890ff;
    transition: 0.3s;
  }
}

.img2 {
  margin-left: 16px;
}

.logo {
  width: 100%;
  height: 40px;
  line-height: 40px;
  overflow: hidden;
  position: relative;

  img {
    width: 32px;
    height: 32px;
    vertical-align: middle;
    transition: margin-left 0.3s;
  }

  & .sidebar-title {
    position: absolute;
    top: 0;
    left: 52px;
    z-index: 1;
    display: inline-block;
    margin: 0;
    padding-left: 12px;
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    line-height: 50px;
    font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
    vertical-align: middle;
    transition: all 0.3s;
  }
}
</style>
