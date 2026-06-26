import { nextTick } from 'vue'
import { loadAddonLang, preloadAllAddonLangs, resolveLangFile, inferAddonFromPath } from '@/utils/addon-lang'

class Language {
    private i18n: any;
    private loadLocale: Array<string> = []; //已加载的语言

    constructor(i18n: any) {
        this.i18n = i18n
    }

    /**
     *
     * @param locale 设置语言
     */
    public setI18nLanguage(locale: string) {
        if (this.i18n.mode === 'legacy') {
            this.i18n.global.locale = locale
        } else {
            this.i18n.global.locale = locale
        }
        let html = document.querySelector('html')
        html && html.setAttribute('lang', locale)
    }

    /**
     * 加载语言包
     * @param app
     * @param path
     * @param locale
     * @returns
     */
    public async loadLocaleMessages(app: string, path: string, locale: string) {
        try {
            if (!app) app = inferAddonFromPath(path)
            const file = resolveLangFile(app, path)

            let pageMessages: Record<string, string> = {}
            if (app) {
                if (import.meta.env.DEV) {
                    const messages = await import(/* @vite-ignore */ `@/addon/${app}/lang/${locale}/${file}.json`)
                    pageMessages = messages.default || {}
                } else {
                    pageMessages = await loadAddonLang(app, locale, file)
                }
            } else {
                const messages = await import(`@/app/lang/${locale}/${file}.json`)
                pageMessages = messages.default || {}
            }

            let data: Record<string, string> = {}
            Object.keys(pageMessages).forEach(key => {
                data[`${file}.${key}`] = pageMessages[key]
            })

            // 查询插件的公共语言包（合并到根 key，与 dev 启动时 globEager 行为一致）
            if (app) {
                try {
                    let commonMessages: Record<string, string> = {}
                    if (import.meta.env.DEV) {
                        const messagesCommon = await import(/* @vite-ignore */ `@/addon/${app}/lang/${locale}/common.json`)
                        commonMessages = messagesCommon.default || {}
                    } else {
                        commonMessages = await loadAddonLang(app, locale, 'common')
                    }
                    Object.keys(commonMessages).forEach(key => {
                        data[key] = commonMessages[key]
                    })
                } catch (e) {
                    // 未找到插件公共语言包
                }
            }

            this.i18n.global.mergeLocaleMessage(locale, data)
            this.setI18nLanguage(locale)
            return nextTick()
        } catch (e) {
            this.setI18nLanguage(locale)
            return nextTick()
        }
    }

    /** 生产环境启动时预加载各插件全部语言包 */
    public async preloadAddonLangs() {
        await preloadAllAddonLangs((locale, messages) => {
            this.i18n.global.mergeLocaleMessage(locale, messages)
        })
    }
}

export default Language
