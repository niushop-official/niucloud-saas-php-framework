import { createI18n } from 'vue-i18n'

import Language from './language'
import zhHans from './zh-Hans/common.json'
import en from './en/common.json'

function resolveInitialLocale(): string {
    try {
        const u = (globalThis as typeof globalThis & { uni?: UniApp.Uni }).uni
        if (u && typeof u.getLocale === 'function') {
            const locale = u.getLocale()
            if (locale) return locale
        }
    } catch {
        // wap-locale 作为 ES module 可能早于 uni-h5 执行
    }
    return 'zh-Hans'
}

//创建实例
let i18n = createI18n({
    locale: resolveInitialLocale(),
    globalInjection: true, //是否全局注入
    silentFallbackWarn: true,
    silentTranslationWarn: true,
    messages: {
        'zh-Hans': zhHans,
        en
    }
})

const language = new Language(i18n)

export { language }
export default i18n
