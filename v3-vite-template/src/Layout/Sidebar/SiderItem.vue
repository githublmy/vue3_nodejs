<template>
  <template v-for="item in menuList" :key="item.path">
    <el-menu-item
      v-if="!item.children || !item.children.length"
      :index="item.path"
    >
      <template v-if="item.meta?.icon">
        <el-icon>
          <component :is="item.meta?.icon" />
        </el-icon>
        <!-- <SvgIcon v-else :name="item.meta.icon" /> -->
      </template>
      <template #title>
        <!-- 内置图标，首字母大写为element内置，否则为自定义svg -->
        <span>{{ item.meta?.title }}</span>
      </template>
    </el-menu-item>
    <el-sub-menu v-else :index="item.path">
      <template #title>
        <template v-if="item.meta?.icon">
          <el-icon>
            <component :is="item.meta?.icon" />
          </el-icon>
          <!-- <SvgIcon v-else :name="item.meta.icon" /> -->
        </template>
        <span>{{ item.meta?.title }}</span>
      </template>
      <sider-item :menuList="item.children" />
    </el-sub-menu>
  </template>
</template>

<script lang="ts" setup>
import type { RouteRecordRaw } from "vue-router";

// const { menuList } = defineProps({
//   menuList: Array<RouteRecordRaw>,
// });
const props = defineProps<{
  menuList: RouteRecordRaw[];
}>();
const { menuList } = toRefs(props);
</script>
