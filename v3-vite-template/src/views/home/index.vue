<template>
  <div id="home">
    首页
    <span>{{ $t("message.Hello") }}</span>
    <el-button type="primary" size="small" @click="restart">重新播放</el-button>
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
  progressText: "{{current}} / {{total}}",
  popoverClass: "driverjs-theme",
  overlayColor: "#b3eaff",
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

const restart = () => {
  driverObj.drive();
};
</script>
<style lang="scss">
$color: #409eff;

.driver-popover.driverjs-theme .driver-popover-title {
  font-size: 20px;
}

.driver-popover.driverjs-theme .driver-popover-title,
.driver-popover.driverjs-theme .driver-popover-description,
.driver-popover.driverjs-theme .driver-popover-progress-text {
  color: #000;
}
.driver-popover.driverjs-theme .driver-popover-progress-text {
  margin-right: 10px;
}
.driver-popover.driverjs-theme .driver-popover-navigation-btns button {
  flex: 1;
  text-align: center;
  background-color: $color;
  color: #ffffff;
  // border: 2px solid #000;
  text-shadow: none;
  // font-size: 14px;
  border-radius: 6px;
}

.driver-popover.driverjs-theme .driver-popover-navigation-btns button:hover {
  background-color: lighten($color, 10%);
  color: #ffffff;
}

.driver-popover.driverjs-theme .driver-popover-navigation-btns {
  justify-content: space-between;
  gap: 3px;
}

// .driver-popover.driverjs-theme .driver-popover-close-btn {
//   color: #fff;
// }

.driver-popover.driverjs-theme .driver-popover-close-btn:hover {
  color: lighten(#000, 30%);
}

.driver-popover.driverjs-theme
  .driver-popover-arrow-side-left.driver-popover-arrow {
  border-left-color: #fde047;
}

.driver-popover.driverjs-theme
  .driver-popover-arrow-side-right.driver-popover-arrow {
  border-right-color: #fde047;
}

.driver-popover.driverjs-theme
  .driver-popover-arrow-side-top.driver-popover-arrow {
  border-top-color: #fde047;
}

.driver-popover.driverjs-theme
  .driver-popover-arrow-side-bottom.driver-popover-arrow {
  border-bottom-color: #fde047;
}
</style>
