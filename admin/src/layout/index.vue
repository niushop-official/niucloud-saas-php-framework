<template>
    <blank-layout v-if="isBlankPage" />
    <component :is="layout" v-else />
    <!--
        全局任务详情抽屉：后台任何位置打开任务详情都复用它（taskRunner.openDetail()），
        不再跳转任务详情路由。放这里挂载一次，与当前使用哪套 layout 无关。
    -->
    <task-drawer v-if="enableTask" />
</template>

<script lang="ts" setup>
import { ref, markRaw, computed, watch, defineComponent, h, defineAsyncComponent, provide, inject, onMounted, nextTick } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { getAppType } from '@/utils/common'
import useUserStore from '@/stores/modules/user'
import useSystemStore from '@/stores/modules/system'
import useTaskRunnerStore from '@/stores/modules/taskRunner'
import taskDrawer from '@/layout/components/task-drawer/index.vue'
import Storage from '@/utils/storage'
import { isBlankMenu } from '@/hooks/useMenuActive'
import { KEEP_CONTENT_SCROLL, rememberContentScroll, scrollContentTo } from './content-scroll'

const sysLayout = import.meta.glob('./*/index.vue')
const addonLayout = import.meta.glob('@/addon/**/layout/index.vue')
const modules = Object.assign(sysLayout, addonLayout)

let siteLayout = 'site'
switch (getAppType()) {
    case 'admin':
        siteLayout = Storage.get('admin_layout') || 'admin'
        break
    default:
        const siteInfo = useUserStore().siteInfo
        if (siteInfo && siteInfo.apps) {
            const layouts = useSystemStore().layoutConfig
            if (siteInfo.apps.length == 1) {
                layouts[siteInfo.apps[0].key] != undefined && (siteLayout = layouts[siteInfo.apps[0].key])
            } else {
                layouts.system != undefined && (siteLayout = layouts.system)
            }
        }
}

const layout = ref<any>(null)

Object.keys(modules).forEach(key => {
    key.indexOf(`/${siteLayout}/`) !== -1 && (layout.value = markRaw(defineAsyncComponent(modules[key])))
})

!layout.value && (layout.value = markRaw(defineAsyncComponent(modules['./default/index.vue'])))

/**
 * 任务体系（执行器 / 详情抽屉）两端通用：
 * - 平台端：升级 / 云编译 / 备份 / 插件打包 / 模板库同步
 * - 站点端：小程序发布等站点级任务
 * 任务按 site_id 隔离，后端也只返回当前站点的任务，两端共用一套组件与接口。
 */
const enableTask = true

/**
 * is_blank（新窗口打开）菜单对应的页面：隐藏整个后台框架（菜单栏 / 顶部栏 / 标签栏），只渲染页面内容
 */
const route = useRoute()
/**
 * 页面通过 setLayout 显式指定的版面（如装修编辑器 diy/edit、poster/edit 指定的 decorate）。
 * 这类指定比 is_blank 更具体，优先级更高；路由变化时重置。
 */
const pageLayoutName = ref('')
watch(() => route.fullPath, (toPath, fromPath) => {
    pageLayoutName.value = ''
    if (fromPath) rememberContentScroll(fromPath)
    const keep = Boolean(window.history.state?.[KEEP_CONTENT_SCROLL])
    const apply = () => scrollContentTo(toPath, keep)
    apply()
    nextTick(apply)
})

const isBlankPage = computed(() => !pageLayoutName.value && isBlankMenu(route.meta as Record<string, any>))

/**
 * 空白布局：仅承载页面内容，全屏可滚动，保留与原布局一致的页面内边距与背景
 */
const BlankLayout = markRaw(defineComponent({
    name: 'BlankLayout',
    setup() {
        return () => h('div', {
            class: 'h-screen w-full overflow-auto',
            'data-content-scroll': '',
            style: 'box-sizing: border-box; padding: 15px; background: var(--el-bg-color-page);'
        }, [ h(RouterView) ])
    }
}))

/**
 * 全局任务执行：后台任何时候只要存在进行中的任务（云编译 / 升级 / 备份），
 * 都由 taskRunner 统一推进，无需停留在任务详情页
 *
 * 页面级跳过（声明式，框架不写死业务路径）：
 * 页面里 inject('setTaskRunnerSkip') 并传 true 即可跳过本次任务接管
 * （如聊天室：task/active 对该页无用，还多一个首屏请求）。
 * 时序：bootstrap 推迟到本组件 onMounted——Vue 子组件先于父组件挂载，
 * 页面的声明此时已生效；页面卸载时解除声明，自动补一次 bootstrap（booted 保证仅一次）。
 */
const taskRunnerSkip = ref(false)
provide('setTaskRunnerSkip', (skip: boolean) => {
    taskRunnerSkip.value = !!skip
})

if (enableTask) {
    onMounted(() => {
        if (!taskRunnerSkip.value) {
            useTaskRunnerStore().bootstrap()
            return
        }
        // 当前页面声明了跳过：等声明解除（页面卸载）后再接管
        const stopSkipWatch = watch(taskRunnerSkip, (skip) => {
            if (!skip) {
                stopSkipWatch()
                useTaskRunnerStore().bootstrap()
            }
        })
    })
}

/**
 * 监听某些页面需要独立配置布局
 */
provide('setLayout', (name: any) => {
    // 记录页面级版面指定：该页面不再套用 is_blank 的空白版面
    pageLayoutName.value = name
    if (siteLayout == name) return
    siteLayout = name
    Object.keys(modules).forEach(key => {
        key.indexOf(`/${name}/`) !== -1 && (layout.value = markRaw(defineAsyncComponent(modules[key])))
    })
})
</script>

<style lang="scss" scoped></style>
