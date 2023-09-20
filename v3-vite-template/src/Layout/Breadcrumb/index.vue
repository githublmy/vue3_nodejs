<template>
  <div class="breadcrumb">
    <div class="left">
      <div @click="changeSidebar">
        <el-icon v-if="isCollapse" size="26" class="iconElIcon"
          ><Fold
        /></el-icon>
        <el-icon v-else size="26" class="iconElIcon"><Expand /></el-icon>
      </div>
      <el-breadcrumb class="app-breadcrumb">
        <transition-group name="breadcrumb">
          <el-breadcrumb-item
            v-for="item in pathList"
            :to="item.meta.isBreadcrumb ? item.path : ''"
            :key="item.path"
            >{{ item.meta.title }}</el-breadcrumb-item
          >
        </transition-group>
      </el-breadcrumb>
    </div>
    <div class="right">
      <el-avatar :src="logo" fit="fill" />
      <span style="margin: 0 10px">{{ "角色" }}：{{ "管理员" }}</span>
      <!-- 切换主题 -->
      <el-switch
        v-model="theme"
        style="
          --el-switch-on-color: rgb(158, 158, 158);
          --el-switch-off-color: rgb(158, 158, 158);
          --el-switch-border-color: #dcdfe6;
        "
        inactive-action-icon="Sunny"
        active-action-icon="Moon"
        @change="toggleDark"
      />
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          个人中心
          <el-icon class="el-icon--right">
            <ArrowDown />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="changePassword"
              >修改密码</el-dropdown-item
            >
            <el-dropdown-item command="logOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDark, useToggle } from "@vueuse/core";
import logo from "@/assets/vite.svg";
import { useSidebarStore } from "@/store/modules/sidebar";
import { useUserStore } from "@/store/modules/user";
import type { IElPlusMsgFun } from "@/utils/elPlusMessage/type";
const elMsg = inject("elMsg") as IElPlusMsgFun;
const sidebarStore = useSidebarStore();
const route = useRoute();
const pathList: Ref = ref([]); //导航菜单
const isDark = useDark();
const theme = ref(isDark.value);

const toggleDark = useToggle(isDark);

// // 菜单折叠状态
const isCollapse = computed(() => sidebarStore.isCollapse);
const handleCommand = (v: string) => {
  if (v === "logOut") {
    elMsg.confirm(
      "确定退出登录吗？",
      () => {
        elMsg.success("退出成功");
        useUserStore().$reset();
        location.href = "/";
      },
      () => {
        console.log("取消");
      }
    );
  }
};
// 监听路由
watch(
  () => route,
  (newValue: { path: string | string[]; matched: string | any[] }) => {
    if (newValue.path.indexOf("/redirect") > -1) {
      return;
    }
    // console.log(newValue, "面包屑导航");
    pathList.value = newValue.matched.slice(1);
  },
  { immediate: true, deep: true }
);
// 折叠菜单方法
function changeSidebar() {
  sidebarStore.toggleSidebar();
}
</script>
<style lang="scss" scoped>
.breadcrumb-enter-active {
  transition: all 0.5s;
}

.breadcrumb-enter-from,
.breadcrumb-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.breadcrumb {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 $px-20;
  box-shadow: 0 1px 0px rgba($color: #cbcaca, $alpha: 0.5);
  .left {
    display: flex;
  }
  .right {
    display: flex;
    align-items: center;
    .el-dropdown-link {
      cursor: pointer;
      color: #409eff;
    }
  }
}
.iconElIcon {
  height: 50px;
}
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  line-height: 50px;
  margin-left: 8px;
}
</style>
