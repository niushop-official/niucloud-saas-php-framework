import { defineStore } from 'pinia'
import storage from '@/utils/storage'

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

const theme = storage.get('theme') ?? {}

const useSystemStore = defineStore('system', {
    state: (): System => {
        return {
            menuIsCollapse: false,
            menuDrawer: false,
            dark: theme.dark ?? false,
            theme: theme.theme ?? '#273de3',
            sidebar: theme.sidebar ?? 'oneType',
            lang: storage.get('lang') ?? 'zh-cn',
            sidebarStyle: theme.sidebarStyle ?? 'threeType',
            currHeadMenuName: '',
            website: {},
            layoutConfig: {},
            tab: storage.get('tab') ?? false
        }
    },
    actions: {
    }
})

export default useSystemStore
