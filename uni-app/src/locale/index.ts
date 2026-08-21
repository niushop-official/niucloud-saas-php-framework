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
    // 关键修复：返回【响应式】的 i18n.global.t(key)，而非静态的 message。
    // 语言包是异步 fetch 的，切换页面时往往尚未加载完成即已渲染，
    // 此前的 return message 是静态字符串，mergeLocaleMessage 后不会重算 → 永久输出 key。
    // 改为返回 i18n.global.t(key) 后，vue-i18n 会基于 messages 的响应式依赖在加载完成后自动重新求值。
    return i18n.global.t(key)
}

export { language, t }
export { default as i18n } from './i18n'

export default {
    install(app: any) {
        //注册i18n
        app.use(i18n);
    }
};
