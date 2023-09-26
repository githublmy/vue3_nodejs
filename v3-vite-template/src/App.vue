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
import { useSettingStore } from "@/store/modules/setting";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import en from "element-plus/dist/locale/en.mjs";
const { locale } = storeToRefs(useSettingStore());

// console.log(locale);
// enum T {
//   success = "ceshi",
//   err = 3,
//   warning,
// }
// let a = T.success;
// console.log(a);
// console.log(elMsg);
// elMsg.success("测试");
// import type { ComponentInternalInstance } from "vue";
// const { proxy } = getCurrentInstance() as ComponentInternalInstance;
// console.log(proxy);
// interface Ia {
//   length?: number;
// }
// function name<T extends Ia>(v: T) {
//   console.log(v.length);

//   return v;
// }
// const r3 = name<number>(444);

// console.log(r3);

// function name<T, K extends keyof T>(obj: T, key: K) {
//   return obj[key];
// }
// const obj = {
//   na: "z",
//   ag: 44,
// };
// console.log(name(obj, "na"));
// function name(key: keyof typeof obj) {
//   return obj[key];
// }
// const obj = {
//   na: "z",
//   ag: 44,
// };
// console.log(name("na"));
interface Iarr {
  id: number;
  name: string;
}
let arr = [
  {
    id: 1,
    name: "张三",
  },
  {
    id: 2,
    name: "张三",
  },
  {
    id: 3,
    name: "张三",
  },
];

function getData(arr: Iarr[], key: string, num: number) {
  let ls = arr.filter((item) => item[key as keyof Iarr] === num);
  return ls;
}
getData(arr, "id", 3);

const msgConfig = {
  max: 3, //同时显示的最大的消息提示数量
};
const config = {
  zIndex: 3000,
  size: "default",
};
const buttonConfig = {
  autoInsertSpace: true, //是否在按钮的中文自动添加空格
};

// const language = ref("zh-cn");
const localeLanguage = computed(() => (locale.value === "zh-cn" ? zhCn : en));
// const elMsg = inject("elPlusMsgFun") as IElPlusMsgFun;
// const { token } = storeToRefs(useUserStore());
// token.value = "测试";
// console.log(token.value);
// const btn = () => {
//   elMsg.success("成功");
// };
// ElMessage({
//   message: "122",
//   type: "success",
//   duration: 5 * 1000,
// });
// elMsg.confirm(
//   "测试",
//   () => {
//     console.log("成功");
//   },
//   () => {
//     console.log("取消");
//   }
// );
// const toggle = () => {
//   language.value = language.value === "zh-cn" ? "en" : "zh-cn";
// };
</script>
