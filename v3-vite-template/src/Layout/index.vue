<!--
 * @Author: 455886774@qq.com lu123456
 * @Date: 2022-11-18 10:18:27
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-09-04 10:12:40
 * @Description: 布局页面
-->
<template>
  <el-container>
    <el-container style="height: 100vh" class="layout-container">
      <el-aside :style="{ width: !isCollapse ? '200px' : '64px' }">
        <el-scrollbar>
          <SideBar />
        </el-scrollbar>
      </el-aside>
      <el-container>
        <el-header style="height: 80px">
          <Breadcrumb />
          <TagsView />
        </el-header>
        <el-main>
          <router-view v-slot="{ Component, route }">
            <transition name="page" mode="out-in">
              <component :is="Component" :key="route.path" />
            </transition>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import Breadcrumb from "./Breadcrumb/index.vue";
import TagsView from "./TagsView/index.vue";
import SideBar from "./Sidebar/index.vue";
import { useSidebarStore } from "@/store/modules/sidebar";
const sidebarStore = useSidebarStore();
const isCollapse = computed(() => sidebarStore.isCollapse);
</script>

<style lang="scss" scoped>
.el-aside {
  transition: width 0.3s;
  -webkit-transition: width 0.3s;
  -moz-transition: width 0.3s;
  -webkit-transition: width 0.3s;
  -o-transition: width 0.3s;
}
.page-enter-active,
.page-leave-active {
  transition: all 0.3s;
}

.page-enter,
.page-leave-active {
  opacity: 0;
  transform: translateX(-10px);
}
.page-move {
  transition: all 0.3s;
}

.layout-container .el-header {
  position: relative;
  padding: 0;
}
.layout-container .el-aside {
  background-color: #304156;
  transition: width 0.3s;
}
.layout-container .el-main {
  padding: 0;
  overflow: hidden;
}
</style>
