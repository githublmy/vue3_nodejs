/*
 * @Author: lu
 * @LastEditors:
 * @Date: 2023-08-30 17:27:23
 * @LastEditTime: 2023-08-31 15:27:33
 * @Description: 自定义指令集合
 */
import type { App, ComponentOptions } from "vue";
// 失去焦点
import blur from "./blur";
// 计算表格高度撑满视口高度
import adaptive from "./adaptive";

const directives: ComponentOptions = {
  blur,
  adaptive,
};
export default {
  install(app: App) {
    Object.keys(directives).forEach((key) => {
      app.directive(key, directives[key]);
    });
  },
};
