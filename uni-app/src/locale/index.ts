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
    return i18n.global.t(key) != key ? i18n.global.t(key) : ''
}

export { language, t }
export { default as i18n } from './i18n'

export default {
    install(app: any) {
        //注册i18n
        app.use(i18n);
    }
};
