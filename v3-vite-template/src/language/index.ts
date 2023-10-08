import { createI18n } from "vue-i18n";
//这是我自己创建的语言包
import zh from "./zh-cn/zh-cn";
import en from "./en/en";
import pinia from "@/store";
import { useSettingStore } from "@/store/modules/setting";
const useSetting = useSettingStore(pinia);

const i18n = createI18n({
  silentTranslationWarn: true, //无声翻译警告
  legacy: false, // 使用composition API
  locale: useSetting.locale,
  globalInjection: true, // 表明使用全局t函数
  fallbackLocale: "en",
  sync: true, //If you don’t want to inherit locale from global scope, you need to set sync of i18n component option to false.
  missingWarn: false,
  fallbackWarn: false,
  silentFallbackWarn: true,
  messages: {
    en,
    zh,
  },
});

export default i18n; //将i18函数导出
