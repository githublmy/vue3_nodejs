/*
 * @Author: lu
 * @LastEditors: Please set LastEditors
 * @Date: 2023-03-27 09:57:59
 * @LastEditTime: 2023-03-27 14:41:50
 * @Description: 菜单折叠方法
 */
import { defineStore } from "pinia";

export const useSidebarStore = defineStore("sidebar", {
  state: () => ({
    isCollapse: false,
  }),
  actions: {
    // 菜单切换
    toggleSidebar() {
      this.isCollapse = !this.isCollapse;
    },
  },
});
