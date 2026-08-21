import { createI18n } from "vue-i18n"

import Language from "./language"
import zhCn from "./zh-cn/common.json";
import en from "./en/common.json"

// 内置插件（admin/src/addon 下，随 core 一起打包，部署模式下没有独立的 dist/assets/addons/{key}/index.js）
// 的 common 语言包需直接合并进基础字典。globEager 在编译期已静态收集（dev/prod 均打进 bundle），
// 此处运行时合并不能仅在 DEV 执行，否则部署模式下内置插件语言包丢失。
const addonZhCnCommon = import.meta.globEager('@/addon/**/lang/zh-cn/common.json')
const addonEnCommon = import.meta.globEager('@/addon/**/lang/en/common.json')
for (const key in addonZhCnCommon) {
    Object.assign(zhCn, addonZhCnCommon[key].default)
}
for (const key in addonEnCommon) {
    Object.assign(en, addonEnCommon[key].default)
}

//创建实例
let i18n = createI18n({
    locale: 'zh-cn',
    fallbackLocale: 'zh-cn',
    datetimeFormats: {},
    numberFormats: {},
    globalInjection: true, //是否全局注入
    silentTranslationWarn: true,
    messages: {
        "zh-cn": zhCn,
        en
    },
    silentFallbackWarn: true
});

const language = new Language(i18n);

export { language };
export default i18n;
