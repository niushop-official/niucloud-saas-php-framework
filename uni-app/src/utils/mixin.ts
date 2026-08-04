import { watch } from 'vue'
import { currRoute } from './common'
import { redirectInterceptor } from './interceptor'
import { clearActiveAddonPageRoute } from '@/utils/addon-page-route'
import useConfigStore from "@/stores/config";
import useSystemStore from '@/stores/system'
import { useShare } from '@/hooks/useShare'

export default {
    install(vue) {
        vue.mixin({
            data() {
                return {
                    query: {},
                    hasRedirected: false,
                    lastPath: '',
                    lastQuery: ''
                }
            },
            onLoad: (data: object) => {
                const route = currRoute() || ''

                this.query = data

                useSystemStore().$patch((state) => {
                    state.currRoute = route
                })
            },
            onShow: () => {
                const route = currRoute() || ''

                // 离开桥接插件页（app/pages/addon-universal）时清空登记的逻辑路由，
                // 避免残留值污染后续非桥接页（如登录页）的语言包 fileKey 与底部导航选中态
                if (!route.includes('/app/pages/addon-universal')) {
                    clearActiveAddonPageRoute()
                }

                useSystemStore().$patch((state) => {
                    state.currRoute = route
                })

                let loginBack = uni.getStorageSync('loginBack');
                if (loginBack && loginBack.url == '/' + route) {
                    this.query = loginBack.param
                }

                if (!this.hasRedirected || this.lastPath !== route || JSON.stringify(this.lastQuery) !== JSON.stringify(this.query)) {
                    redirectInterceptor({
                        path: route,
                        query: this.query
                    })
                    // 更新状态，表示已经调用过
                    this.hasRedirected = true;
                    this.lastPath = route;
                    this.lastQuery = { ...this.query };
                }
                
            },
            onShareAppMessage() {
                // #ifdef MP
                return useShare().onShareAppMessage()
                // #endif
            },
            onShareTimeline() {
                // #ifdef MP
                return useShare().onShareTimeline()
                // #endif
            },
            methods: {
                themeColor() {
                    const configStore = useConfigStore()
                    return configStore.getThemeColor();
                }
            },
            onReady(){
                const systemStore = useSystemStore()
                // #ifdef APP-PLUS
                watch(() => systemStore.versionInfo, () => {
                    const newVersion = useSystemStore().versionInfo
                    if (newVersion) {
                        const lock = uni.getStorageSync('update_version_close_lock') || {}
                        if (!lock[ newVersion.version_code ] || newVersion.is_forced_upgrade) useSystemStore().showUpdateVersion()
                    }
                }, { immediate: true })
                // #endif
            }
        });
    },
};
