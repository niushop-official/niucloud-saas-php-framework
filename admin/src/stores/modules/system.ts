import { defineStore } from 'pinia'
import storage from '@/utils/storage'
import { useCssVar } from '@vueuse/core'
import {getWebConfig, getWebsiteLayout} from '@/app/api/sys'

interface System {
    menuIsCollapse: boolean,
    menuDrawer: boolean,
    dark: boolean,
    theme: string,
    lang: string,
    sidebar: string,
    sidebarStyle: string,
    currHeadMenuName: any,
    website: Object,
    layoutConfig: Object,
    tab: Boolean
}

const DEFAULT_THEME = '#3b82f6'
const theme = storage.get('theme') ?? {}
// 只把旧默认色换成新默认色，用户自己选过的颜色保持不变。
if (!theme.theme || String(theme.theme).toLowerCase() === '#273de3') {
    theme.theme = DEFAULT_THEME
}

const useSystemStore = defineStore('system', {
    state: (): System => {
        return {
            menuIsCollapse: false,
            menuDrawer: false,
            dark: theme.dark ?? false,
            theme: theme.theme ?? DEFAULT_THEME,
            sidebar: theme.sidebar ?? 'oneType',
            lang: storage.get('lang') ?? 'zh-cn',
            sidebarStyle: theme.sidebarStyle ?? 'threeType',
            currHeadMenuName: '',
            website: {},
            layoutConfig: {},
            tab: storage.get('tab') ?? true
        }
    },
    actions: {
        setHeadMenu(value: any) {
            this.currHeadMenuName = value
        },
        setTheme(state: string, value: any) {
            this[state] = value
            theme[state] = value
            storage.set({ key: 'theme', data: theme })
        },
        setTab(value: any) {
            this.tab = value
            storage.set({ key: 'tab', data: value })
        },
        toggleMenuCollapse(value: boolean) {
            this.menuIsCollapse = value
            storage.set({ key: 'menuiscollapse', data: value })
            useCssVar('--aside-width').value = value ? 'calc(var(--el-menu-icon-width) + var(--el-menu-base-level-padding) * 2)' : '210px'
        },
        async getWebsiteInfo() {
            await getWebConfig().then(({ data }) => {
                this.website = data
            }).catch()
        },
        async getWebsiteLayout() {
            await getWebsiteLayout().then(({ data }) => {
                this.layoutConfig = data
            }).catch()
        }
    }
})

export default useSystemStore
