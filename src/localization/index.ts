import { createI18n } from "vue-i18n";
import ZH from "./languages/zh";
import EN from "./languages/en";

const messages = {
  en: {
    ...EN,
  },
  zh: {
    ...ZH,
  },
};

const getCurrentLanguage = () => {
  const lang = navigator.language;
  const langCode = lang.indexOf("zh") !== -1 ? "zh" : "en";
  localStorage.setItem("lang", langCode);
  return langCode;
};

export const i18n = createI18n({
  legacy: false,
  globalInjection: true, // 全局模式 支持{{ $t("message.hello") }}
  locale: getCurrentLanguage(),
  messages: messages,
  fallbackLocale: "zh",
});
