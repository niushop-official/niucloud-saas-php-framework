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
        addTab(roter: RouteLocationNormalizedLoaded) {
            if (roter.meta && roter.meta.type != 1) return
            // 没有页面组件的路由（容器路由、菜单视图文件不存在的记录）不加入标签栏
            const component: any = this.getPageComponent(roter)
            if (!component) return
            if (this.tabs[roter.name]) {
                this.tabs[roter.name].query = roter.query || {}
                return
            }
            this.tabs[roter.name] = {
                path: roter.path,
                title: roter.meta ? roter.meta.title : '',
                name: roter.name,
                icon: roter.meta ? roter.meta.icon : '',
                query: roter.query || {},
                compomentName: component.__name || component.name || ''
            }
        },
        /**
         * 获取当前路由最终要渲染的页面组件
         * 容器路由、组件文件缺失的记录没有 components，从最深层往上找第一个有组件的记录
         */
        getPageComponent(roter: RouteLocationNormalizedLoaded): any {
            for (let i = roter.matched.length - 1; i >= 0; i--) {
                const component: any = roter.matched[i]?.components?.default
                if (component) return component
            }
            return null
        },
        removeTab(name: string) {
            delete this.tabs[name]
        },
        removeLeft(name: string) {
            const names = Object.keys(this.tabs)
            for (let i = names.indexOf(name) - 1; i >= 0; i--) delete this.tabs[names[i]]
        },
        removeRight(name: string) {
            const names = Object.keys(this.tabs)
            for (let i = names.indexOf(name) + 1; i < names.length; i++) delete this.tabs[names[i]]
        },
        removeOthers(name: string) {
            Object.keys(this.tabs).forEach((key: string) => { key != name && delete this.tabs[key] })
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
                name.push(state.tabs[key].compomentName)
            })
            return name
        }
    }
})

export default useTabbarStore
