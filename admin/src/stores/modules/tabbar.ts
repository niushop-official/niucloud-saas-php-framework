import { defineStore } from 'pinia'
import type { RouteLocationNormalizedLoaded, RouteRecordName } from 'vue-router'
import useSystemStore from '@/stores/modules/system'

interface Tabbar {
    curr: string,
    tabs: {
        [key: RouteRecordName]: any
    }
}

const useTabbarStore = defineStore('tabbar', {
    state: (): Tabbar => {
        return {
            curr: '',
            tabs: {}
        }
    },
    actions: {
        addTab(router: RouteLocationNormalizedLoaded) {
            if (router.meta && router.meta.type != 1) return
            if (this.tabs[router.name]) {
                this.tabs[router.name].query = router.query || {}
                return
            }
            this.tabs[router.name] = {
                path: router.path,
                title: router.meta ? router.meta.title : '',
                name: router.name,
                query: router.query || {},
                componentName: router.matched.at(-1)?.components.default.__name
            }
        },
        removeTab(path: string) {
            delete this.tabs[path]
        },
        clearTab() {
            this.tabs = {}
        }
    },
    getters: {
        tabLength: (state) => Object.keys(state.tabs).length,
        tabNames: (state) => {
            const name: any[] = []
            if (!useSystemStore().tab) return name
            Object.keys(state.tabs).forEach(key => {
                name.push(state.tabs[key].componentName)
            })
            return name
        }
    }
})

export default useTabbarStore
