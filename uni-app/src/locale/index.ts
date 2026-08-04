import i18n, { language } from "./i18n"
import useSystemStore from '@/stores/system'
import { getCurrentInstance } from 'vue'
import { resolveLocaleRoutePath, normalizeRoutePath } from './route-path'

const t = (message: string) => {
    let route = resolveLocaleRoutePath()
    // #ifdef MP
    const mpRoute = getCurrentInstance()?.root.ctx.$scope.__route__ || useSystemStore().currRoute
    if (mpRoute) route = normalizeRoutePath(`/${String(mpRoute).replace(/^\//, '')}`)
    // #endif

    const file = language.getFileKey(route)
    const key = `${ file.fileKey }.${ message }`
    if (i18n.global.t(message) != message) return i18n.global.t(message)
    if (i18n.global.t(key) != key) return i18n.global.t(key)

    // 命名空间未命中：按需加载当前插件页语言包（兜底，避免整块命名空间漏加载导致空白）
    if (route.startsWith('/addon/')) {
        language.loadLocaleMessages(route.replace(/^\//, ''), uni.getLocale())
    }
    // 缺词时返回 key 本身，便于排查（而非静默空白）
    return message
}

export { language, t }
export { default as i18n } from './i18n'

export default {
    install(app: any) {
        //注册i18n
        app.use(i18n);
    }
};
