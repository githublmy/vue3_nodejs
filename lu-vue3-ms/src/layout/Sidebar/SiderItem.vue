<template>
  <template v-for="item in menuList" :key="item.path">
    <el-menu-item v-if="!item.children || !item.children.length" :index="item.path">
      <template v-if="item.icon">
        <el-icon>
          <component :is="item.icon" />
        </el-icon>
        <!-- <SvgIcon v-else :name="item.meta.icon" /> -->
      </template>
      <template #title>
        <span>{{ item.title }}</span>
      </template>
    </el-menu-item>
    <el-sub-menu v-else :index="item.path">
      <template #title>
        <template v-if="item.icon">
          <el-icon>
            <component :is="item.icon" />
          </el-icon>
          <!-- <SvgIcon v-else :name="item.meta.icon" /> -->
        </template>
        <span>{{ item.title }}</span>
      </template>
      <sider-item :menuList="item.children" />
    </el-sub-menu>
  </template>
</template>

<script lang="ts" setup>
import type { IRouteData } from '@/store/types/userStore'

const props = defineProps<{
  menuList: IRouteData[]
}>()
const { menuList } = toRefs(props)
</script>
