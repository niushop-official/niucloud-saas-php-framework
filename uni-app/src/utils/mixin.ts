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
                    query: {}
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

                redirectInterceptor({
                    path: route,
                    query: this.query
                })
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
