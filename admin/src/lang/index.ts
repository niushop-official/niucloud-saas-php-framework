import i18n, { language } from "./i18n"
import useAppStore from '@/stores/modules/app'
import { resolveLangFile, resolveRouteAddon, resolveRouteView, inferAddonFromPath } from '@/utils/addon-lang'
import { getCurrentInstance } from 'vue'
import { useRoute } from 'vue-router'

function currentRoute() {
    if (getCurrentInstance()) {
        return useRoute()
    }
    return useAppStore().route as Parameters<typeof resolveRouteAddon>[0]
}

const t = (message: string) => {
    const route = currentRoute()
    let app = resolveRouteAddon(route)
    const path = resolveRouteView(route)
    if (!app) app = inferAddonFromPath(path)
    const file = resolveLangFile(app, path)
    const key = `${file}.${message}`
    return i18n.global.t(key) != key ? i18n.global.t(key) : i18n.global.t(message)
}

export { language, t, i18n }

export default {
    install(app: any) {
        app.use(i18n);
    }
};
