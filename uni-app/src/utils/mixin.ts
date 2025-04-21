import { currRoute } from './common'
import { redirectInterceptor } from './interceptor'
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
                return useShare().onShareAppMessage()
            },
            onShareTimeline() {
                return useShare().onShareTimeline()
            },
            methods: {
                themeColor() {
                    const configStore = useConfigStore()
                    return configStore.getThemeColor();
                }
            }
        });
    },
};
