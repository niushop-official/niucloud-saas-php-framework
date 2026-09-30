<template>
    <div class="home-workbench">
        <!-- ========== 顶部通栏 ========== -->
        <header class="home-header">
            <div class="home-brand" v-if="webConfig">
                <div class="home-brand-logo">
                    <el-image class="w-full h-full" :src="img(webConfig.icon)" fit="contain">
                        <template #error>
                            <img class="w-full h-full object-contain" src="@/app/assets/images/logo.default.png" alt="" />
                        </template>
                    </el-image>
                </div>
                <span class="home-brand-name">{{ webConfig.site_name }}</span>
            </div>

            <div class="home-header-right">
                <button v-if="userStore.userInfo.is_super_admin" class="home-console-btn" @click="toHome">控制台</button>

                <div class="home-user">
                    <div class="home-user-avatar">{{ userInitial }}</div>
                    <div class="home-user-menu">
                        <div class="home-user-menu-head">
                            <div class="home-user-avatar is-lg">{{ userInitial }}</div>
                            <div class="home-user-menu-info">
                                <span class="home-user-menu-name">{{ userStore.userInfo.username }}</span>
                                <span class="home-user-menu-role">{{ userStore.userInfo.is_super_admin ? '超级管理员' : '站点管理员' }}</span>
                            </div>
                        </div>
                        <div class="home-user-menu-divider"></div>
                        <div class="home-user-menu-item is-danger" @click="logoutFn()">退出登录</div>
                    </div>
                </div>
            </div>
        </header>

        <!-- ========== 主体内容 ========== -->
        <main class="home-main">
            <!-- 工具栏 -->
            <div class="home-toolbar">
                <!-- 左侧：应用横向切换 + 全部应用 -->
                <div class="home-menu-container">
                    <div class="home-scroll-wrap">
                        <!-- 左侧箭头：仅当还可以向左滚动时出现 -->
                        <button type="button" class="home-scroll-arrow is-left" v-show="canScrollLeft"
                                @click="scrollMenu(-1)">
                            <el-icon>
                                <ArrowLeft />
                            </el-icon>
                        </button>

                        <div class="home-scroll-menu" ref="scrollMenuRef" @scroll="updateScrollState">
                            <div class="home-menu-tab" :class="{ 'is-active': params.app === '' }" @click="setApp('')">所有应用</div>
                            <div v-for="(item, index) in addonList" :key="index" class="home-menu-tab"
                                 :class="{ 'is-active': params.app === item.key }" @click="setApp(item.key)">
                                {{ item.title }}
                            </div>
                        </div>

                        <!-- 右侧箭头：仅当还可以向右滚动时出现 -->
                        <button type="button" class="home-scroll-arrow is-right" v-show="canScrollRight"
                                @click="scrollMenu(1)">
                            <el-icon>
                                <ArrowRight />
                            </el-icon>
                        </button>
                    </div>

                    <div class="home-popover-wrap shrink-0" v-if="addonList.length">
                        <button class="home-more-btn" :class="{ 'is-open': moreAppsOpen }" @click.stop="toggleMoreApps">全部应用</button>
                        <div class="home-popover home-apps-popover" v-show="moreAppsOpen" @click.stop>
                            <div class="home-app-tag" :class="{ 'is-active': params.app === '' }" @click="setApp('')">所有应用</div>
                            <div v-for="(item, index) in addonList" :key="index" class="home-app-tag"
                                 :class="{ 'is-active': params.app === item.key }" @click="setApp(item.key)">
                                {{ item.title }}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 右侧：搜索 / 筛选 / 创建站点 -->
                <div class="home-toolbar-right">
                    <el-input v-model.trim="params.keywords" class="home-search" placeholder="站点名称/编号" @keyup.enter="getHomeSiteFn(1)">
                        <template #suffix>
                            <el-icon class="cursor-pointer" @click.stop="getHomeSiteFn(1)">
                                <Search />
                            </el-icon>
                        </template>
                    </el-input>

                    <div class="home-popover-wrap">
                        <button class="home-filter-btn" :class="{ 'is-open': filterOpen || !!typeName || !!site.params.status }" @click.stop="toggleFilter">筛选</button>
                        <div class="home-popover home-filter-popover" v-show="filterOpen" @click.stop>
                            <div class="home-filter-group">
                                <label class="home-filter-label">平台分类</label>
                                <el-select v-model="filterForm.appType" class="w-full" placeholder="全部平台">
                                    <el-option v-for="item in platformList" :key="item.value" :label="item.label" :value="item.value" />
                                </el-select>
                            </div>
                            <div class="home-filter-group">
                                <label class="home-filter-label">状态</label>
                                <el-select v-model="filterForm.status" class="w-full" placeholder="全部状态">
                                    <el-option v-for="item in statusList" :key="item.value" :label="item.label" :value="item.value" />
                                </el-select>
                            </div>
                            <div class="home-filter-group">
                                <label class="home-filter-label">排序方式</label>
                                <el-radio-group v-model="filterForm.sort">
                                    <el-radio v-for="item in sortList" :key="item.value" :value="item.value">{{ item.label }}</el-radio>
                                </el-radio-group>
                            </div>
                            <div class="home-filter-actions">
                                <button class="home-btn-ghost" @click="resetFilter">重置</button>
                                <el-button type="primary" class="home-btn-apply" @click="applyFilter">确定</el-button>
                            </div>
                        </div>
                    </div>

                    <el-button type="primary" class="home-create-btn" :disabled="siteGroupLoading" @click="openCreateSite">+ 创建站点</el-button>
                </div>
            </div>

            <!-- 站点卡片区 -->
            <div class="home-content page-scrollbar" v-loading="loading">
                <div class="home-grid" v-if="tableData.length">
                    <div v-for="(item, index) in tableData" :key="index" class="home-card" @click="selectSite(item)">
                        <div class="home-card-head">
                            <div class="home-card-avatar">
                                <img v-if="item.icon" :src="img(item.icon)" alt="" />
                                <img v-else src="@/app/assets/images/site_default.png" alt="" />
                            </div>
                            <div class="home-card-info">
                                <div class="home-card-name">{{ item.site_name }}</div>
                                <div class="home-card-id">ID: {{ item.site_id }}</div>
                            </div>
                            <div class="home-status-badge" :class="statusClass(item.status)" v-if="item.status_name">{{ item.status_name }}</div>
                        </div>

                        <div class="home-card-tags" v-if="item.app_name && item.app_name.length">
                            <span class="home-tag" v-for="(name, appIndex) in item.app_name" :key="appIndex">{{ name }}</span>
                        </div>

                        <div class="home-card-footer">
                            <div class="home-expire">
                                <span class="home-expire-label">到期时间</span>
                                <span class="home-expire-value" :class="{ 'is-expired': item.status == 2 }">{{ formatExpire(item.expire_time) }}</span>
                            </div>

                            <!-- 渠道入口：仅返回了访问地址的渠道可点击跳转 -->
                            <div class="home-channels" v-if="item.channels && item.channels.length">
                                <template v-for="(channel, channelIndex) in item.channels" :key="channelIndex">
                                    <span v-if="channelIcon(channel.key)" class="iconfont home-channel-icon" :class="[channelIcon(channel.key), { 'is-link': channel.url }]"
                                          :title="channel.name" @click.stop="channel.url && selectSite(item, channel)"></span>
                                    <span v-else class="home-channel-icon is-text" :class="{ 'is-link': channel.url }" :title="channel.name"
                                          @click.stop="channel.url && selectSite(item, channel)">{{ String(channel.name || '').slice(0, 1) }}</span>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="home-empty" v-else-if="!loading">
                    <img src="@/app/assets/images/site_empty.png" class="w-[220px] h-[165px]" />
                    <p class="home-empty-text">暂无站点</p>
                </div>
            </div>

            <!-- 分页 -->
            <div class="home-pagination" v-if="site.total">
                <el-pagination v-model:current-page="site.params.page" v-model:page-size="site.params.limit"
                    layout="total, sizes, prev, pager, next, jumper" :total="site.total"
                    @size-change="getHomeSiteFn()" @current-change="getHomeSiteFn" :hide-on-single-page="true" />
            </div>

            <!-- 版权 -->
            <div class="home-copyright" v-if="copyright">
                <div>
                    <a :href="copyright.copyright_link" target="_blank">
                        <span class="mr-3" v-if="copyright.company_name">{{ copyright.company_name }}</span>
                    </a>
                    <a href="https://beian.miit.gov.cn/" v-if="copyright.icp" target="_blank">
                        <span class="mr-3">{{ copyright.icp }}</span>
                    </a>
                </div>
                <div class="home-copyright-links">
                    <span class="mx-1" @click="getInfoFn">版权信息</span> | <span class="mx-1">开发者联盟与隐私的声明</span> |
                    <span class="mx-1">隐私政策</span> | <span class="mx-1">联系我们</span> | <span class="mx-1">Cookies</span>
                </div>
            </div>
        </main>
    </div>

    <el-dialog v-model="dialogVisible" title="版权信息" width="500">
        <span>{{ copyright.copyright_desc }}</span>
        <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false">确定</el-button>
            </div>
        </template>
    </el-dialog>

    <CreateSiteDialog v-model="createSiteDialog" :site-group="siteGroup" @success="getHomeSiteFn" />
</template>

<script lang="ts" setup>
import { reactive, ref, toRefs, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { ArrowLeft, ArrowRight, Search } from '@element-plus/icons-vue'
import { getHomeSite, getSiteGroup } from '@/app/api/home'
import { getStatusList } from '@/app/api/site'
import useUserStore from '@/stores/modules/user'
import useSystemStore from '@/stores/modules/system'
import { getWebCopyright } from '@/app/api/sys'
import { getGroupAppList } from '@/app/api/addon'
import { ElMessage } from 'element-plus'
import { AnyObject } from '@/types/global'
import Test from '@/utils/test'
import { img, getToken } from '@/utils/common'
import CreateSiteDialog from './components/create-site-dialog.vue'

const userStore: AnyObject = useUserStore()
const copyright = ref(null)
getWebCopyright().then(({ data }) => {
    copyright.value = data
})
const dialogVisible = ref(false)
const getInfoFn = () => {
    if (copyright.value.copyright_desc) {
        dialogVisible.value = true
    }
}

interface Site {
    params: {
        keywords: string,
        page: number,
        limit: number,
        app: string,
        sort: string,
        status: string
    },
    loading: boolean,
    tableData: {
        site_id: number,
        site_name: string,
        logo: string,
        icon: string,
        // 站点包含的应用/插件名称
        app_name: string[],
        // 站点已开启的端渠道；有访问地址 url 时才可点击跳转
        channels: {
            key: string,
            name: string,
            url?: string
        }[],
        group_name: string,
        status: number,
        status_name: string,
        create_time: string,
        expire_time: string | number
    }[],
    total: number
}

const sortList = ref([
    {
        label: '创建时间',
        value: 'create_time'
    },
    {
        label: '站点编号',
        value: 'site_id'
    }
])

const statusList = ref<{ label: string, value: string }[]>([
    { label: '全部状态', value: '' }
])
getStatusList().then(res => {
    const data = res.data || {}
    statusList.value = [
        { label: '全部状态', value: '' },
        ...Object.keys(data).map(key => ({ label: data[key], value: String(key) }))
    ]
}).catch(() => {})

// 平台分类筛选（保持原有行为，仅用于前端状态展示）
const platformList = [
    { label: 'H5', value: 'h5' },
    { label: '微信小程序', value: 'wx' },
    { label: 'PC', value: 'pc' },
    { label: 'APP', value: 'app' },
    { label: '支付宝小程序', value: 'zfb' }
]

const site: Site = reactive({
    params: {
        keywords: '',
        page: 1,
        limit: 20,
        app: '',
        sort: 'create_time',
        status: ''
    },
    loading: false,
    tableData: [],
    total: 0
})

const { params, loading, tableData } = toRefs(site)

const getHomeSiteFn = (page: number = 1) => {
    site.params.page = page
    site.loading = true
    getHomeSite(site.params).then(res => {
        site.tableData = res.data.data
        site.total = res.data.total
        site.loading = false
    }).catch(() => {
        site.loading = false
    })
}
getHomeSiteFn()

// 筛选（平台分类 / 状态 / 排序）
const typeName = ref('')
const filterForm = ref({
    appType: '',
    sort: 'create_time',
    status: ''
})

// 弹层开合
const moreAppsOpen = ref(false)
const filterOpen = ref(false)
const closePopovers = (e: MouseEvent) => {
    const target = e.target as HTMLElement
    // 下拉选择等被传送到 body 的浮层不参与关闭判定
    if (target?.closest?.('.el-popper, .el-select__popper, .el-select-dropdown')) return
    moreAppsOpen.value = false
    filterOpen.value = false
}

/**
 * 应用横向菜单：溢出滚动与左右箭头
 */
const scrollMenuRef = ref<HTMLElement | null>(null)
const canScrollLeft = ref(false)
const canScrollRight = ref(false)

// 同步两侧箭头显隐：滚动到底 / 到顶后对应方向箭头消失
const updateScrollState = () => {
    const el = scrollMenuRef.value
    if (!el) return
    const maxScroll = el.scrollWidth - el.clientWidth
    canScrollLeft.value = el.scrollLeft > 1
    canScrollRight.value = maxScroll > 1 && el.scrollLeft < maxScroll - 1
}

// 每次移动一屏的 80%，至少移动 120px
const scrollMenu = (direction: number) => {
    const el = scrollMenuRef.value
    if (!el) return
    const step = Math.max(el.clientWidth * 0.8, 120)
    el.scrollBy({ left: direction * step, behavior: 'smooth' })
}

onMounted(() => {
    document.addEventListener('click', closePopovers)
    window.addEventListener('resize', updateScrollState)
    nextTick(updateScrollState)
})
onUnmounted(() => {
    document.removeEventListener('click', closePopovers)
    window.removeEventListener('resize', updateScrollState)
})
const toggleMoreApps = () => {
    filterOpen.value = false
    moreAppsOpen.value = !moreAppsOpen.value
}
const toggleFilter = () => {
    moreAppsOpen.value = false
    if (!filterOpen.value) {
        filterForm.value.appType = typeName.value
        filterForm.value.sort = site.params.sort
        filterForm.value.status = site.params.status
    }
    filterOpen.value = !filterOpen.value
}

// 切换应用
const setApp = (app: string) => {
    site.params.app = app
    moreAppsOpen.value = false
    getHomeSiteFn(1)
}

const applyFilter = () => {
    typeName.value = filterForm.value.appType
    site.params.sort = filterForm.value.sort
    site.params.status = filterForm.value.status
    filterOpen.value = false
    getHomeSiteFn(1)
}
const resetFilter = () => {
    filterForm.value.appType = ''
    filterForm.value.sort = 'create_time'
    filterForm.value.status = ''
    typeName.value = ''
    site.params.sort = 'create_time'
    site.params.status = ''
    filterOpen.value = false
    getHomeSiteFn(1)
}

// 网络设置
const webConfig = computed(() => useSystemStore().website)

const userInitial = computed(() => String(userStore.userInfo?.username || 'U').slice(0, 1).toUpperCase())

const selectSite = (site: any, channel?: { url?: string }) => {
    window.localStorage.setItem('site.siteId', site.site_id)
    window.localStorage.setItem('site.siteInfo', site)
    window.localStorage.setItem('site.comparisonSiteIdStorage', site.site_id)
    // 渠道只打开接口返回的访问地址；点卡片仍进站点后台
    if (channel) {
        if (channel.url) window.open(channel.url)
        return
    }
    window.open(`${ location.origin }/site/`)
}

const toHome = () => {
    window.localStorage.setItem('admin.siteId', 0)
    if (!window.localStorage.getItem('admin.token')) {
        window.localStorage.setItem('admin.token', getToken())
        window.localStorage.setItem('admin.comparisonTokenStorage', getToken())
    }
    if (!window.localStorage.getItem('admin.userinfo')) {
        window.localStorage.setItem('admin.userinfo', JSON.stringify(useUserStore().userInfo))
    }
    location.replace(location.origin + '/admin')
}

const logoutFn = () => {
    userStore.logout()
}

/**
 * 获取应用列表
 */
const addonList = ref<{
    key: string,
    title: string,
    icon?: string
}[]>([])
getGroupAppList().then(({ data }) => {
    const apps: any = []
    Object.keys(data).forEach(key => {
        const addon = data[key]
        addon.type == 'app' && apps.push(addon)
    })
    addonList.value = apps
}).catch()

// 应用列表渲染完成 / 数量变化后重新计算箭头显隐
watch(addonList, () => nextTick(updateScrollState), { flush: 'post' })

/**
 * 渠道标识 -> iconfont
 */
const channelIcons: Record<string, string> = {
    pc: 'iconPCc',
    h5: 'iconH5c',
    app: 'iconAPPc',
    weapp: 'iconxiaochengxutongbuc',
    aliapp: 'iconzhifubaoxiaochengxuc',
    wechat: 'iconweixingongzhonghao'
}
const channelIcon = (key: string) => channelIcons[key] || ''

/**
 * 站点状态样式
 */
const statusClass = (status: any) => {
    if (status == 1) return 'is-normal'
    if (status == 2) return 'is-expired'
    return 'is-closed'
}

/**
 * 到期时间格式化
 */
const formatExpire = (value: any) => {
    if (!value || value === '0') return '--'
    if (typeof value === 'number') {
        const date = new Date(value * 1000)
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        return `${ date.getFullYear() }-${ month }-${ day }`
    }
    return String(value).split(' ')[0]
}

const siteGroupLoading = ref(true)
const siteGroup = ref([])
getSiteGroup().then(({ data }) => {
    !Test.empty(data) && (siteGroup.value = data)
    siteGroupLoading.value = false
}).catch(() => {
    siteGroupLoading.value = false
})

const createSiteDialog = ref(false)
const openCreateSite = () => {
    if (!siteGroup.value.length) {
        ElMessage('暂无店铺套餐')
        return
    }
    createSiteDialog.value = true
}
</script>

<style lang="scss" scoped>
/* ========== 页面骨架 ========== */
.home-workbench {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
    background-color: var(--sys-color-bg-page);
    color: var(--sys-color-text-primary);
    font-size: var(--sys-font-size-base);
}

/* ========== 顶部通栏 ========== */
.home-header {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: space-between;
    height: var(--cmp-header-height);
    padding: 0 var(--space-8);
    background-color: var(--cmp-header-bg);
    border-bottom: 1px solid var(--cmp-header-border);
}

.home-brand {
    display: flex;
    align-items: center;
    min-width: 0;
    gap: var(--space-3);
}

.home-brand-logo {
    flex-shrink: 0;
    width: 36px;
    height: 36px;
    overflow: hidden;
    border: 1px solid var(--sys-color-border-light);
    border-radius: var(--sys-radius-md);
    background-color: var(--sys-color-fill-light);
}

.home-brand-name {
    overflow: hidden;
    max-width: 280px;
    font-size: var(--sys-font-size-md);
    font-weight: var(--sys-font-weight-semibold);
    text-overflow: ellipsis;
    white-space: nowrap;
}

.home-header-right {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    gap: var(--space-4);
}

.home-console-btn {
    height: 34px;
    padding: 0 var(--space-4);
    border: 1px solid var(--sys-color-border-default);
    border-radius: var(--sys-radius-md);
    background-color: transparent;
    color: var(--sys-color-text-regular);
    font-size: var(--sys-font-size-base);
    cursor: pointer;
    transition: color .2s, border-color .2s, background-color .2s;

    &:hover {
        color: var(--sys-color-primary);
        border-color: var(--sys-color-primary);
        background-color: var(--sys-color-primary-soft);
    }
}

/* 用户信息悬浮菜单 */
.home-user {
    position: relative;
    display: flex;
    align-items: center;
    height: var(--cmp-header-height);
    cursor: pointer;
}

.home-user-avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 34px;
    height: 34px;
    border: 2px solid var(--sys-color-bg-surface);
    border-radius: var(--sys-radius-full);
    background-color: var(--sys-color-primary);
    box-shadow: 0 0 0 1px var(--sys-color-border-default);
    color: var(--el-color-white);
    font-size: var(--sys-font-size-base);
    font-weight: var(--sys-font-weight-semibold);
    transition: transform .2s, box-shadow .2s;

    &.is-lg {
        width: 36px;
        height: 36px;
    }
}

.home-user:hover .home-user-avatar {
    transform: scale(1.05);
    box-shadow: 0 0 0 2px var(--el-color-primary-light-7);
}

.home-user-menu {
    position: absolute;
    top: 55px;
    right: 0;
    width: 184px;
    padding: var(--space-2);
    background-color: var(--cmp-dialog-bg);
    border: 1px solid var(--sys-color-border-light);
    border-radius: var(--sys-radius-lg);
    box-shadow: var(--cmp-dialog-shadow);
    opacity: 0;
    visibility: hidden;
    transform: translateY(10px);
    transition: opacity .25s cubic-bezier(.16, 1, .3, 1), transform .25s cubic-bezier(.16, 1, .3, 1), visibility .25s;
    z-index: 60;
}

.home-user:hover .home-user-menu {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
}

.home-user-menu-head {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-2);
}

.home-user-menu-info {
    display: flex;
    flex-direction: column;
    min-width: 0;
}

.home-user-menu-name {
    overflow: hidden;
    color: var(--sys-color-text-primary);
    font-size: var(--sys-font-size-base);
    font-weight: var(--sys-font-weight-semibold);
    text-overflow: ellipsis;
    white-space: nowrap;
}

.home-user-menu-role {
    margin-top: 2px;
    color: var(--sys-color-text-secondary);
    font-size: var(--sys-font-size-xs);
}

.home-user-menu-divider {
    height: 1px;
    margin: var(--space-1) 0;
    background-color: var(--sys-color-fill-light);
}

.home-user-menu-item {
    padding: var(--space-2) var(--space-2);
    border-radius: var(--sys-radius-sm);
    color: var(--sys-color-text-regular);
    font-size: var(--sys-font-size-sm);
    transition: background-color .2s, color .2s;

    &.is-danger:hover {
        background-color: var(--el-color-danger-light-9);
        color: var(--sys-color-danger);
    }
}

/* ========== 主体区域 ========== */
.home-main {
    display: flex;
    flex: 1;
    flex-direction: column;
    min-height: 0;
    padding-top: var(--space-6);
}

.home-toolbar {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-5);
    margin-bottom: var(--space-6);
    padding-inline: var(--space-8);
}

.home-menu-container {
    display: flex;
    flex: 1;
    align-items: center;
    gap: var(--space-2);
    min-width: 0;
}

/* 横向滚动区 + 两侧滚动箭头 */
.home-scroll-wrap {
    position: relative;
    display: flex;
    flex: 1;
    min-width: 0;
}

.home-scroll-menu {
    display: flex;
    flex: 1;
    align-items: center;
    gap: var(--space-2);
    min-width: 0;
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
        display: none;
    }
}

.home-scroll-arrow {
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 2;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    padding: 0;
    border: none;
    background-color: transparent;
    color: var(--sys-color-text-secondary);
    font-size: var(--sys-font-size-md);
    cursor: pointer;
    transition: color .2s;

    .el-icon {
        position: relative;
        z-index: 1;
    }

    &:hover {
        color: var(--sys-color-primary);
    }

    &.is-left {
        left: 0;

        &::before {
            content: "";
            position: absolute;
            inset: 0;
            background: linear-gradient(90deg, var(--sys-color-bg-page) 55%, transparent);
        }
    }

    &.is-right {
        right: 0;

        &::before {
            content: "";
            position: absolute;
            inset: 0;
            background: linear-gradient(270deg, var(--sys-color-bg-page) 55%, transparent);
        }
    }
}

.home-menu-tab {
    flex-shrink: 0;
    padding: var(--space-2) var(--space-4);
    border: 1px solid transparent;
    border-radius: var(--sys-radius-md);
    color: var(--sys-color-text-secondary);
    font-size: var(--sys-font-size-base);
    white-space: nowrap;
    cursor: pointer;
    transition: color .2s, background-color .2s, border-color .2s;

    &:hover {
        color: var(--sys-color-text-primary);
        background-color: var(--sys-color-fill-dark);
    }

    &.is-active {
        border-color: var(--el-color-primary-light-7);
        background-color: var(--sys-color-primary-soft);
        color: var(--sys-color-primary);
        font-weight: var(--sys-font-weight-medium);
    }
}

.home-toolbar-right {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    gap: var(--space-3);
}

.home-popover-wrap {
    position: relative;
}

.home-more-btn,
.home-filter-btn {
    line-height: 1;
    display: flex;
    align-items: center;
    height: 34px;
    padding: 0 var(--space-3);
    border: 1px solid transparent;
    border-radius: var(--sys-radius-md);
    background-color: transparent;
    color: var(--sys-color-text-secondary);
    font-size: var(--sys-font-size-base);
    white-space: nowrap;
    cursor: pointer;
    transition: color .2s, background-color .2s, border-color .2s;

    &:hover,
    &.is-open {
        color: var(--sys-color-primary);
        background-color: var(--sys-color-primary-soft);
    }
}

.home-more-btn::after {
    content: "";
    width: 0;
    height: 0;
    margin-left: var(--space-1);
    border-top: 4px solid currentColor;
    border-right: 4px solid transparent;
    border-left: 4px solid transparent;
}

.home-filter-btn {
    border-color: var(--sys-color-border-default);
    color: var(--sys-color-text-regular);
}

.home-popover {
    position: absolute;
    top: 44px;
    left: 0;
    z-index: 50;
    padding: var(--space-2);
    background-color: var(--cmp-dialog-bg);
    border: 1px solid var(--sys-color-border-light);
    border-radius: var(--sys-radius-lg);
    box-shadow: var(--cmp-dialog-shadow);
}

.home-apps-popover {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
    width: max-content;
    max-width: 360px;
}

.home-app-tag {
    padding: var(--space-2) var(--space-3);
    border-radius: var(--sys-radius-sm);
    color: var(--sys-color-text-regular);
    font-size: var(--sys-font-size-sm);
    white-space: nowrap;
    cursor: pointer;
    transition: color .15s, background-color .15s;

    &:hover {
        background-color: var(--sys-color-primary-soft);
        color: var(--sys-color-primary);
    }

    &.is-active {
        background-color: var(--sys-color-primary);
        color: var(--el-color-white);
        font-weight: var(--sys-font-weight-medium);
    }
}

.home-filter-popover {
    right: 0;
    left: auto;
    width: 260px;
    padding: var(--space-4);
}

.home-filter-group {
    margin-bottom: var(--space-4);
}

.home-filter-label {
    display: block;
    margin-bottom: var(--space-2);
    color: var(--sys-color-text-secondary);
    font-size: var(--sys-font-size-xs);
}

.home-filter-actions {
    display: flex;
    justify-content: flex-end;
    gap: var(--space-2);
    margin-top: var(--space-5);
}

.home-btn-ghost {
    padding: var(--space-2) var(--space-3);
    border: 1px solid var(--sys-color-border-default);
    border-radius: var(--sys-radius-sm);
    background-color: transparent;
    color: var(--sys-color-text-regular);
    font-size: var(--sys-font-size-sm);
    cursor: pointer;
    transition: background-color .2s;

    &:hover {
        background-color: var(--sys-color-fill-light);
    }
}

.home-create-btn {
    height: 36px;
    padding: 0 var(--space-5);
    border-radius: var(--sys-radius-md);
}

/* ========== 站点卡片区 ========== */
.home-content {
    flex: 1;
    min-height: 0;
    padding-inline: var(--space-8);
    overflow-y: auto;
}

.home-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: var(--space-5);
    align-content: start;
    /* 第一行上移和阴影画在滚动区域里，顶边留出空隙 */
    padding-top: var(--sys-space-3);
    padding-bottom: var(--space-6);
}

.home-card {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: var(--cmp-module-card-gap);
    overflow: hidden;
    padding: var(--cmp-module-card-padding);
    background-color: var(--cmp-module-card-bg);
    border: var(--cmp-module-card-border-width) solid var(--cmp-module-card-border-color);
    border-radius: var(--cmp-module-card-radius);
    color: var(--cmp-module-card-text);
    cursor: pointer;
    transition: border-color .2s, box-shadow .2s, transform .2s;

    &::before {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        height: var(--cmp-module-card-accent-height);
        background: linear-gradient(90deg, var(--cmp-module-card-accent-start), var(--cmp-module-card-accent-end));
        opacity: 0;
        transition: opacity .3s;
    }

    &:hover {
        border-color: var(--cmp-module-card-hover-border-color);
        box-shadow: var(--cmp-module-card-hover-shadow);
        transform: translateY(var(--cmp-module-card-hover-offset));

        &::before {
            opacity: 1;
        }
    }
}

.home-card-head {
    display: flex;
    align-items: center;
    gap: var(--space-3);
}

.home-card-avatar {
    flex-shrink: 0;
    width: 44px;
    height: 44px;
    overflow: hidden;
    border: 1px solid var(--sys-color-border-light);
    border-radius: var(--sys-radius-md);
    background-color: var(--sys-color-fill-light);

    img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
}

.home-card-info {
    flex: 1;
    min-width: 0;
}

.home-card-name {
    overflow: hidden;
    color: var(--sys-color-text-primary);
    font-size: var(--sys-font-size-md);
    font-weight: var(--sys-font-weight-semibold);
    text-overflow: ellipsis;
    white-space: nowrap;
}

.home-card-id {
    margin-top: 2px;
    color: var(--sys-color-text-secondary);
    font-family: Consolas, "SFMono-Regular", monospace;
    font-size: var(--sys-font-size-xs);
}

.home-status-badge {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    gap: var(--space-1);
    padding: var(--space-1) var(--space-2);
    border-radius: var(--sys-radius-sm);
    /* 文案与底色跟随状态色，底色取对应颜色的淡色 */
    background-color: var(--cmp-status-tag-default-bg);
    color: var(--cmp-status-tag-default-text);
    font-size: var(--sys-font-size-xs);
    font-weight: var(--sys-font-weight-medium);

    /* 状态点与状态色保持一致 */
    &::before {
        content: "";
        width: 6px;
        height: 6px;
        border-radius: var(--sys-radius-full);
        background-color: var(--sys-color-text-placeholder);
    }

    &.is-normal {
        background-color: var(--cmp-status-tag-success-bg);
        color: var(--cmp-status-tag-success-text);

        &::before {
            background-color: var(--sys-color-success);
        }
    }

    &.is-expired {
        background-color: var(--cmp-status-tag-danger-bg);
        color: var(--cmp-status-tag-danger-text);

        &::before {
            background-color: var(--sys-color-danger);
        }
    }

    &.is-closed {
        background-color: var(--cmp-status-tag-default-bg);
        color: var(--cmp-status-tag-default-text);

        &::before {
            background-color: var(--sys-color-text-placeholder);
        }
    }
}

.home-card-tags {
    /* 只保留一行：放不下的整枚标签换到第二行后连同容器一起裁掉，不会出现半截标签 */
    --home-tag-height: 24px;

    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    gap: var(--space-2);
    max-height: var(--home-tag-height);
    overflow: hidden;
}

.home-tag {
    /* 不收缩、不截断，每一枚标签都按内容完整展示 */
    flex: 0 0 auto;
    height: var(--home-tag-height);
    padding: 0 var(--space-2);
    border: 1px solid var(--sys-color-border-light);
    border-radius: var(--sys-radius-sm);
    background-color: var(--sys-color-fill-light);
    color: var(--sys-color-text-regular);
    font-size: var(--sys-font-size-xs);
    font-weight: var(--sys-font-weight-medium);
    line-height: 22px;
    white-space: nowrap;
}

.home-card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: auto;
    padding-top: var(--space-3);
    border-top: 1px dashed var(--sys-color-border-light);
}

.home-expire {
    display: flex;
    flex: 1 1 auto;
    align-items: center;
    min-width: 0;
    gap: var(--space-2);
}

.home-expire-label {
    flex-shrink: 0;
    color: var(--sys-color-text-placeholder);
    font-size: var(--sys-font-size-xs);
}

.home-expire-value {
    overflow: hidden;
    color: var(--sys-color-text-regular);
    font-size: var(--sys-font-size-sm);
    font-weight: var(--sys-font-weight-medium);
    text-overflow: ellipsis;
    white-space: nowrap;

    /* 到期与正常状态统一为中性灰，减少颜色信息 */
    &.is-expired {
        color: var(--sys-color-text-secondary);
    }
}

.home-channels {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    gap: var(--space-2);
}

.home-channel-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    color: var(--sys-color-text-secondary);
    font-size: 16px;
    line-height: 1;

    &.is-link {
        cursor: pointer;
        transition: color .2s;

        &:hover {
            color: var(--sys-color-primary);
        }
    }

    &.is-text {
        border-radius: var(--sys-radius-sm);
        background-color: var(--sys-color-fill-light);
        font-size: 10px;
    }
}

.home-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 80px;
}

.home-empty-text {
    margin-top: var(--space-5);
    color: var(--sys-color-text-placeholder);
    font-size: var(--sys-font-size-base);
}

/* ========== 分页与版权 ========== */
.home-pagination {
    display: flex;
    flex-shrink: 0;
    justify-content: center;
    padding: var(--space-3) var(--space-8);
}

.home-copyright {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: space-between;
    padding: 0 var(--space-8) var(--space-4);
    color: var(--sys-color-text-secondary);
    font-size: var(--sys-font-size-xs);
}

.home-copyright-links {
    display: flex;
    align-items: center;
    cursor: pointer;
}

/* ========== Element Plus 局部适配 ========== */
:deep(.home-search .el-input__wrapper) {
    box-shadow: none;
    border: 1px solid var(--sys-color-border-default);
    border-radius: var(--sys-radius-md);
    background-color: var(--cmp-input-bg);

    &:hover,
    &.is-focus {
        border-color: var(--sys-color-primary);
        box-shadow: 0 0 0 3px var(--sys-color-primary-soft);
    }
}

:deep(.home-filter-popover .el-select__wrapper) {
    min-height: 34px;
    box-shadow: none;
    border: 1px solid var(--sys-color-border-default);
    border-radius: var(--sys-radius-sm);
    background-color: var(--cmp-input-bg);
}

.home-search {
    width: 220px;

    :deep(.el-input__inner) {
        color: var(--cmp-input-text);
        font-size: var(--sys-font-size-base);

        &::placeholder {
            color: var(--cmp-input-placeholder);
        }
    }
}

:deep(.home-btn-apply) {
    height: 32px;
    padding: 0 var(--space-3);
    border-radius: var(--sys-radius-sm);
    font-size: var(--sys-font-size-sm);
}

:deep(.el-pagination) {
    --el-pagination-font-size: var(--sys-font-size-sm);
}
</style>

<style lang="scss">
.home-filter-popover .el-radio-group {
    display: flex;
    gap: 16px;
    align-items: center;

    .el-radio {
        margin-right: 0;
    }
}
</style>
