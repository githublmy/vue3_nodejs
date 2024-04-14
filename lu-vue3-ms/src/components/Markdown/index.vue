<template>
  <div>
    <el-row :gutter="20">
      <el-radio-group
        style="margin-bottom: 10px"
        v-model="themeValue"
        @change="changeTheme"
      >
        <el-radio-button value="classic">经典主题</el-radio-button>
        <el-radio-button value="dark">暗黑主题</el-radio-button>
      </el-radio-group>
      <el-button
        v-blur
        style="margin-left: 10px"
        type="primary"
        size="default"
        @click="clearValue"
        >清空</el-button
      >
    </el-row>
    <div id="vditor" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Vditor from "vditor";
import "vditor/dist/index.css";
import type { Theme } from "./types";
const vditor = ref<Vditor | null>(null);
const themeValue = ref<Theme>("classic");
const valueRef = ref("");

onMounted(() => {
  vditor.value = new Vditor("vditor", {
    mode: "sv", // 所见即所得（wysiwyg）、即时渲染（ir）、分屏预览（sv）
    height: "calc(100vh - 162px)", //高度
    // placeholder: "内容区域", //占位内容
    minHeight: 200, //最小高度
    theme: themeValue.value, //"classic" | "dark"
    counter: {
      enable: true,
    },
    cache: {
      enable: false,
    },
    // 预览
    preview: {
      actions: [], //默认值为 ["desktop", "tablet", "mobile", "mp-wechat", "zhihu"]
      // theme: {
      //   current: "wechat",
      // },
    },
    // 大纲
    // outline: {
    //   enable: true,
    //   position:"left",//"right" | "left"
    // }
    input: (v) => {
      valueRef.value = v;
    },
    after: () => {
      setValue();
    },
  });
  // console.log(vditor.value);
});
// 设置主题
const changeTheme = (v: Theme) => {
  vditor.value!.setTheme(v);
};
const setValue = () => {
  vditor.value!.setValue(valueRef.value);
};
function clearValue() {
  valueRef.value = "";
  setValue();
}
</script>
<style lang="scss">
.vditor-preview {
  .vditor-reset {
    color: var(--textarea-text-color) !important;
  }
}
</style>
