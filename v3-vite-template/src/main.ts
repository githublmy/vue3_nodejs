import { createApp } from "vue";
import "./assets/style/index.scss";
import App from "./App.vue";
import router from "./router";
import pinia from "./store";
// 自定义指令
import directives from "./directives";
// 提示信息函数
import elMsg from "@/utils/elPlusMessage/index.ts";
// 引入svg注册脚本
import "virtual:svg-icons-register";
// 引入svg组件
import SvgIcon from "@/components/SvgIcon/index.vue";
//粒子背景插件
import Particles from "vue3-particles";
// 如果只想导入css变量暗黑主题
import 'element-plus/theme-chalk/dark/css-vars.css'
// 引入图标
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const app = createApp(App);
//注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app
  .use(router)
  .use(pinia)
  .use(directives)
  .use(Particles)
  .provide("elMsg", readonly(elMsg))
  .component("svg-icon", SvgIcon)
  .mount("#app");
