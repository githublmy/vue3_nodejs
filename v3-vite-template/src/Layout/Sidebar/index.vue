<!--
 * @Description: 侧边导航
-->
<template>
  <div class="sidebar">
    <div class="logo">
      <img src="/vite.svg" />
      <span
        class="sidebar-title"
        :style="{
          transform: !isCollapse ? 'translateX(0)' : 'translateX(100px)',
        }"
        >{{ ProjectTitle }}</span
      >
    </div>
    <el-scrollbar class="scrollbar">
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
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import SiderItem from "./SiderItem.vue";
import { useSettingStore } from "@/store/modules/setting";
import { useUserStore } from "@/store/modules/user";
const { routes } = useUserStore();
const route = useRoute();
const settingStore = useSettingStore();
const isCollapse = computed(() => settingStore.isCollapse);
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
.sidebar {
  .logo {
    width: 100%;
    height: 40px;
    line-height: 40px;
    overflow: hidden;
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 20px;
    img {
      width: 24px;
      height: 24px;
      vertical-align: middle;
    }

    & .sidebar-title {
      position: absolute;
      top: 0;
      left: 49px;
      z-index: 999;
      margin: 0;
      color: #fff;
      font-size: 14px;
      font-weight: 700;
      line-height: 40px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
      transition: all 0.3s;
    }
  }
  .scrollbar {
    height: calc(100vh - 40px);
  }
}
</style>
