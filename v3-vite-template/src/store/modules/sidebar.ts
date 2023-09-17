/*
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
