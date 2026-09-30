import { defineStore } from 'pinia'
import { getConfig } from '@/app/api/auth'
import { isWeixinBrowser } from "@/utils/common";
import useSystemStore from "@/stores/system";

interface loginConfig {
    is_username: number | boolean,
    is_mobile: number | boolean,
    is_auth_register: number | boolean,
    is_force_access_user_info: number | boolean,
    is_bind_mobile: number | boolean,
    wechat_error: string,
    agreement_show: number | boolean,
    bg_url: string,
    logo: string,
    desc: string
}
interface tabbarConfig {
    backgroundColor: string,
    textColor: string,
    textHoverColor: string,
    list: AnyObject[]
}
interface Config {
    login: loginConfig,
    tabbarList: any,
    tabbar: tabbarConfig | null,
    addon: String,
    themeColor: any
}

const useConfigStore = defineStore('config', {
    state: (): Config => {
        return {
            login: {
                is_username: 0,
                is_mobile: 0,
                is_auth_register: 0,
                is_force_access_user_info: 0,
                is_bind_mobile: 0,
                wechat_error: '',
                agreement_show: 0,
                bg_url: '',
                logo: '',
                desc: ''
            },
            tabbarList: {},
            tabbar: null,
            addon: '',
            themeColor: ''
        }
    },
    actions: {
        async getLoginConfig() {
            let url = '';
            // #ifdef H5
            if (isWeixinBrowser()) {
                const systemStore = useSystemStore()
                url = systemStore.systemInfo.platform == 'ios' ? uni.getStorageSync('initUrl') : location.href
            }
            // #endif
            await getConfig({ url }).then((res: any) => {
                this.login.is_username = res.data.is_username
                this.login.is_mobile = res.data.is_mobile
                this.login.is_auth_register = parseInt(res.data.is_auth_register)
                this.login.is_force_access_user_info = parseInt(res.data.is_force_access_user_info)
                this.login.is_bind_mobile = parseInt(res.data.is_bind_mobile)
                this.login.agreement_show = parseInt(res.data.agreement_show)
                this.login.bg_url = res.data.bg_url // 背景图
                this.login.logo = res.data.logo //logo
                this.login.desc = res.data.desc // 描述
            })
        },
        // 获取主色调
        getThemeColor() {
            let themeColorStorage = uni.getStorageSync('current_theme_color');
            if (!this.themeColor && themeColorStorage) {
                this.themeColor = JSON.parse(themeColorStorage);
            }

            // 某些站点的主题配置以 JSON 字符串返回（或曾被重复序列化）。
            // style 绑定接收到该字符串时，H5 运行时会把每个字符当成样式键，
            // 从而尝试写入 CSSStyleDeclaration[0] 并中断页面渲染。
            let themeColor: any = this.themeColor
            while (typeof themeColor === 'string') {
                try {
                    themeColor = JSON.parse(themeColor)
                } catch (e) {
                    break
                }
            }

            if (themeColor && typeof themeColor === 'object') {
                let style = '';
                for (let k in themeColor) {
                    style += `${ k }:${ themeColor[k] };`;
                }
                return style;
            }
            return typeof themeColor === 'string' ? themeColor : '';
        }
    }
})

export default useConfigStore
