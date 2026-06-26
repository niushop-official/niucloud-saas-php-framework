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
    return val !== key ? val : ''
}

export default {
    install(app: any) {
        app.use(i18n)
    }
}
