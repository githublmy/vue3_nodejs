<template>
  <div id="home">
    首页
    <span>{{ $t("message.Hello") }}</span>
  </div>
</template>
<script lang="ts" setup>
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
const driverObj = driver({
  showProgress: true,
  prevBtnText: "←上一步",
  nextBtnText: "下一步→",
  doneBtnText: "√完成",
  progressText:"{{current}} / {{total}}",
  steps: [
    {
      element: "#app",
      popover: {
        title: "欢迎使用本系统",
        description: "欢迎你",
        side: "left",
        align: "start",
      },
    },
    {
      element: ".logo",
      popover: {
        title: "logo和系统名称",
        description: "这是logo系统名称",
        side: "bottom",
        align: "start",
      },
    },
    {
      element: ".sidebar .el-scrollbar.scrollbar",
      popover: {
        title: "导航菜单，点击跳转页面",
        description: "导航菜单，点击跳转页面",
        side: "bottom",
        align: "start",
      },
    },
    {
      element: ".el-header .breadcrumb",
      popover: {
        title: "面包屑导航",
        description: "面包屑导航",
        side: "left",
        align: "start",
      },
    },
    {
      element: ".el-header .breadcrumb .right",
      popover: {
        title: "个人中心",
        description: "个人中心",
        side: "left",
        align: "start",
      },
    },
    {
      element: ".el-header .link",
      popover: {
        title: "tags导航",
        description: "tags导航",
        side: "left",
        align: "start",
      },
    },
    {
      element: ".el-main",
      popover: {
        title: "内容区域",
        description: "内容区域",
        side: "left",
        align: "start",
      },
    },
    {
      popover: {
        title: "欢迎进入系统",
        description: "以上就是全部内容，点击确定进入系统",
      },
    },
  ],
});

driverObj.drive();
</script>
<style lang="scss" scoped>
#home {
  width: 100%;
  height: 600px;
}
</style>
