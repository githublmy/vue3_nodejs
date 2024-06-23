<template>
  <el-config-provider
    :size="config.size"
    :z-index="config.zIndex"
    :locale="localeLanguage"
    :button="buttonConfig"
    :message="msgConfig"
  >
    <router-view />
    <!-- <router-link to="/home">首页</router-link>
    <router-link to="/home2">下一页</router-link>
    <button @click="toggle">切换</button>
    <el-button v-blur type="primary" size="default">按钮</el-button>
    {{ token }} -->
    <!--    <router-view></router-view>
    <VueForm :data="data" te="ts" />
    <!~~ <el-table mb-1 :data="[]" />
    <el-pagination :total="100" /> ~~>
    <el-button v-blur="'ceshi'" type="primary" size="default" @click="btn"
      >点击</el-button
    >-->
  </el-config-provider>
</template>
<script lang="ts" setup>
// import DevicePixelRatio from "@/utils/devicePixelRatio";
import { useSettingStore } from "@/store/modules/setting";
import time from "@/utils/buildTime.json";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import en from "element-plus/dist/locale/en.mjs";

const { locale } = storeToRefs(useSettingStore());
const msgConfig = {
  max: 3, //同时显示的最大的消息提示数量
};
const config: any = {
  zIndex: 3000,
  size: "default",
};
const buttonConfig = {
  autoInsertSpace: true, //是否在按钮的中文自动添加空格
};

const localeLanguage = computed(() => (locale.value === "zh-cn" ? zhCn : en));

onMounted(() => {
  // new DevicePixelRatio().init();
}),
  console.log(
    `%c 前端打包时间 %c ${time.latestTime} `,
    "background:#3eaf7c ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff",
    "background:#007AFF ;padding: 1px; color: #fff; font-weight: bold;"
  );
const a = 99;

console.log("清除？App。vue", a);
</script>
