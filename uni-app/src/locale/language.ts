import { nextTick } from 'vue'
import { getAppPages, getSubPackagesPages } from '@/utils/pages'
import {
    isSplitBuildEnabled
} from '@/utils/split-build'
import {
    wapUrl
} from '@/utils/addon-lang'
import { getUni } from '@/utils/uni-runtime'
import { parseLocaleFileKey } from './route-path'

class Language {
    private i18n: any
    private loadLocale: Array<string> = [] //已加载的语言

    public path = ''

    constructor(i18n: any) {
        this.i18n = i18n
    }

    /**
     *
     * @param locale 设置语言
     */
    public setI18nLanguage(locale: string, path: string = '') {
        if (this.i18n.global.locale == locale) return
        this.i18n.global.locale = locale
        path && (this.path = path)
        getUni().setLocale(locale)
    }

    public loadAllLocaleMessages(app: string, locale: string) {
        // H5 分构建：语言包按需 fetch，不预加载全部 chunk
        if (isSplitBuildEnabled()) return

        const pages = app == 'app' ? getAppPages() : getSubPackagesPages()
        pages.forEach((path: string) => {
            this.loadLocaleMessages(path, locale)
        })
    }

    /**
     * 分构建下从 assets/locale/app/{locale}/ 拉取主包语言包
     */
    private async loadSplitAppLocale(file: string, fileKey: string, locale: string) {
        if (this.loadLocale.includes(`${fileKey}.${locale}`)) {
            this.setI18nLanguage(locale, file)
            return nextTick()
        }
        this.loadLocale.push(`${fileKey}.${locale}`)

        try {
            const url = wapUrl(`assets/locale/app/${locale}/${file}.json`)
            const res = await fetch(url)
            if (!res.ok) throw new Error(String(res.status))
            const ct = (res.headers.get('content-type') || '').toLowerCase()
            if (ct.includes('text/html')) throw new Error('invalid locale response')
            const pack = await res.json()
            const data: Record<string, string> = {}
            Object.keys(pack).forEach((key) => {
                data[`${fileKey}.${key}`] = pack[key]
            })
            this.i18n.global.mergeLocaleMessage(locale, data)
            this.setI18nLanguage(locale, file)
        } catch {
            this.setI18nLanguage(locale, file)
        }
        return nextTick()
    }

    private async fetchLocaleJson(url: string): Promise<Record<string, string>> {
        const res = await fetch(url)
        if (!res.ok) throw new Error(String(res.status))
        const ct = (res.headers.get('content-type') || '').toLowerCase()
        if (ct.includes('text/html')) throw new Error('invalid locale response')
        return res.json()
    }

    private mergeLocalePack(locale: string, fileKey: string, pack: Record<string, string>) {
        const data: Record<string, string> = {}
        Object.keys(pack).forEach((key) => {
            data[`${fileKey}.${key}`] = pack[key]
        })
        this.i18n.global.mergeLocaleMessage(locale, data)
    }

    /**
     * 分构建下从 assets/addons/{key}/locale/ 拉取语言包（含 common.json）
     */
    private async loadSplitAddonLocale(
        addonKey: string,
        file: string,
        fileKey: string,
        locale: string
    ) {
        if (this.loadLocale.includes(`${fileKey}.${locale}`)) {
            this.setI18nLanguage(locale, file)
            return nextTick()
        }
        this.loadLocale.push(`${fileKey}.${locale}`)

        const commonKey = `${addonKey}.common.${locale}`
        const localeRoot = wapUrl(`assets/addons/${addonKey}/locale/${locale}`)

        try {
            if (file !== 'common' && !this.loadLocale.includes(commonKey)) {
                this.loadLocale.push(commonKey)
                try {
                    const commonPack = await this.fetchLocaleJson(`${localeRoot}/common.json`)
                    this.mergeLocalePack(locale, `${addonKey}.common`, commonPack)
                    Object.keys(commonPack).forEach((key) => {
                        this.i18n.global.mergeLocaleMessage(locale, { [key]: commonPack[key] })
                    })
                } catch {
                    // common.json 可选
                }
            }

            const pack = await this.fetchLocaleJson(`${localeRoot}/${file}.json`)
            this.mergeLocalePack(locale, fileKey, pack)
            this.setI18nLanguage(locale, file)
        } catch {
            this.setI18nLanguage(locale, file)
        }
        return nextTick()
    }

    /**
     * 加载语言包
     * @param path
     * @param locale
     * @returns
     */
    public async loadLocaleMessages(path: string, locale: string) {
        try {
            const { route, file, fileKey } = this.getFileKey(path)

            // 是否已加载
            if (this.loadLocale.includes(`${fileKey}.${locale}`)) {
                this.setI18nLanguage(locale, file)
                return nextTick()
            }

            if (isSplitBuildEnabled()) {
                if (route === 'app') {
                    return this.loadSplitAppLocale(file, fileKey, locale)
                }
                return this.loadSplitAddonLocale(route, file, fileKey, locale)
            }

            this.loadLocale.push(`${fileKey}.${locale}`)

            let messages: any
            // #ifdef APP-PLUS
            const appLang = import.meta.glob('../app/locale/**/*.json', { eager: true })
            const addonLang = import.meta.glob('../addon/**/locale/**/*.json', { eager: true })
            messages = route == 'app' ? appLang[`../app/locale/${locale}/${file}.json`] : addonLang[`../addon/${route}/locale/${locale}/${file}.json`]
            // #endif

            // #ifndef APP-PLUS
            messages = await import(route == 'app' ? `../app/locale/${locale}/${file}.json` : `../addon/${route}/locale/${locale}/${file}.json`)
            // #endif

            let data: Record<string, string> = {}
            Object.keys(messages.default).forEach(key => {
                data[`${fileKey}.${key}`] = messages.default[key]
            })
            this.i18n.global.mergeLocaleMessage(locale, data)
            this.setI18nLanguage(locale, file)

            return nextTick()
        } catch (e) {
            this.setI18nLanguage(locale)
            return nextTick()
        }
    }

    public getFileKey = (path: string) => parseLocaleFileKey(path)
}

export default Language
