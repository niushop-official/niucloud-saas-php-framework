/**
 * H5 分构建 shared 包专用入口（避免拉取 useSystemStore / common 的条件编译链）
 */
import i18n from './i18n'
import Language from './language'
import { resolveLocaleRoutePath } from './route-path'

export const language = new Language(i18n)

export { i18n }

export function t(message: string): string {
    const route = resolveLocaleRoutePath()
    const file = language.getFileKey(route)
    const key = `${file.fileKey}.${message}`
    if (i18n.global.t(message) !== message) return i18n.global.t(message)
    const val = i18n.global.t(key)
    if (val !== key) return val
    // 兜底：按需加载当前插件页语言包；返回【响应式】的 i18n.global.t(key)，
    // 语言包异步加载完成后 vue-i18n 会基于 messages 响应式依赖自动重新求值，
    // 避免此前直接返回 '' 导致永久空白/输出 key。
    if (route.startsWith('/addon/')) {
        const locale = (i18n.global.locale as unknown as { value: string }).value || 'zh-Hans'
        language.loadLocaleMessages(route.replace(/^\//, ''), locale)
    }
    return i18n.global.t(key)
}

export default {
    install(app: any) {
        app.use(i18n)
    }
}
