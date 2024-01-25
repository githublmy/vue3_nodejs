/*
 * @Description: 全局设置
 */
import { defineStore } from 'pinia'

export const useSettingStore = defineStore('setting', {
  state: () => ({
    isDark: false,
    isCollapse: false,
    locale: 'zh-cn'
  }),
  actions: {
    // 菜单主题
    toggleTheme() {
      this.isDark = !this.isDark
    },
    // 菜单切换
    toggleSidebar() {
      this.isCollapse = !this.isCollapse
    }
  },
  persist: {
    paths: ['isDark', 'locale'] //需要持久化的数据 []表示都不持久化
  }
})
