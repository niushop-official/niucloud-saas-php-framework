import { createApp } from 'vue'
import App from './App.vue'
import roter from './router'
import ElementPlus from 'element-plus'
import pinia from './stores'
import lang from './lang'
import directives from './utils/directives'
import '@/styles/index.scss'
import { getAppType, useElementIcon } from './utils/common'
import 'highlight.js/styles/stackoverflow-light.css';
import hljs from 'highlight.js/lib/common'
import hljsVuePlugin from '@highlightjs/vue-plugin'
import VueUeditorWrap from 'vue-ueditor-wrap'

window.hl = hljs

import { initAddonManifests } from '@/utils/addon-lang'
import { language } from '@/lang'

// 端口级样式作用域：共享页面无需新增类名或调整 HTML 结构。
// 仅 admin 端添加标识，site/home 保持原有 DOM 作用域。
document.documentElement.classList.toggle('app-type-admin', getAppType() === 'admin')

async function run() {
    if (!import.meta.env.DEV) {
        await initAddonManifests()
    }
    const app = createApp(App)
    app.use(pinia)
    app.use(lang)
    app.use(roter)
    app.use(directives)
    app.use(ElementPlus)
    app.use(hljsVuePlugin)
    app.use(VueUeditorWrap)
    useElementIcon(app)
    app.mount('#app')

    // 插件语言包延迟加载：挂载后再等浏览器空闲才预载，避免 10+MB 插件包与首屏
    // API 请求（session.list/ws_info 等）抢带宽；配合 ?v=buildTime HTTP 缓存，
    // 首次之后预载近乎零成本。路由守卫会按需补加载当前页面缺失的语言包
    if (!import.meta.env.DEV) {
        const idle = (window as any).requestIdleCallback || ((cb: () => void) => setTimeout(cb, 3000))
        idle(() => language.preloadAddonLangs())
    }
}

run()
