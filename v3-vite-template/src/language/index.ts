import { createI18n } from "vue-i18n";
//这是我自己创建的语言包
import mZhLocale from "./zh-cn/zh-cn";
import mEnLocale from "./en/en";
import pinia from "@/store";
import { useSettingStore } from "@/store/modules/setting";
const useSetting = useSettingStore(pinia);

console.log(mZhLocale);

const i18n = createI18n({
  legacy: false, // 使用composition API
  locale: useSetting.locale,
  globalInjection: true, // 表明使用全局t函数
  messages: {
    en: mEnLocale,
    zh: mZhLocale,
  },
});

export default i18n; //将i18函数导出
