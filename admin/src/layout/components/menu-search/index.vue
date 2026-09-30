<template>
    <!-- 搜索入口：短输入框，点击或回车打开菜单搜索弹窗 -->
    <el-input
        v-model="keyword"
        class="menu-search-trigger"
        :class="{ 'is-active': visible }"
        placeholder="菜单搜索"
        readonly
        :prefix-icon="Search"
        @click="open"
        @keydown.enter.prevent="open"
    />

    <!-- 菜单搜索弹窗（Element Plus Dialog：自带全屏遮罩） -->
    <el-dialog
        v-model="visible"
        class="menu-search-dialog"
        width="450px"
        top="56px"
        :show-close="false"
        append-to-body
        @opened="onOpened"
        @closed="onClosed"
    >
        <div class="menu-search-body" @keydown.enter="goFirst">
            <div class="menu-search-input">
                <el-input
                    ref="inputRef"
                    v-model="keyword"
                    placeholder="菜单搜索: 支持中文、路由路径"
                    clearable
                    :prefix-icon="Search"
                />
            </div>
            <div class="menu-search-list">
                <el-scrollbar max-height="300px">
                    <div v-if="!results.length" class="menu-search-empty">
                        {{ keyword ? '未找到匹配的菜单' : '暂无可搜索的菜单' }}
                    </div>
                    <div
                        v-for="item in results"
                        :key="item.path || item.name"
                        class="menu-search-item"
                        :title="item.path"
                        @click="goMenu(item)"
                    >
                        {{ item.title }}
                    </div>
                </el-scrollbar>
            </div>
        </div>
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref, computed, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { Search } from '@element-plus/icons-vue'

interface MenuSearchItem {
    name: string
    title: string
    path: string
    /** 检索文本：中文名 / 简短名 / 路由路径 / 菜单标识（均转小写） */
    searchText: string
}

const router = useRouter()

const visible = ref(false)
const keyword = ref('')
const inputRef = ref<any>(null)

/** 结果条数上限，避免菜单过多时渲染过重 */
const MAX_RESULT = 60

/**
 * 菜单来源：已注册的路由表（与侧边栏菜单同源）。
 * 仅取可跳转的页面节点（meta.type == 1）且未被隐藏（meta.show !== false），
 * 排除登录页等非菜单页面。
 */
const menuList = computed<MenuSearchItem[]>(() => {
    const records: any[] = router.getRoutes()
    return records
        .filter((route) => route.meta?.type == 1 && route.meta?.show !== false)
        .filter((route) => !String(route.path).endsWith('/login'))
        .map((route) => {
            const title = String(route.meta?.title || route.meta?.short_title || '')
            return {
                name: String(route.name ?? ''),
                title,
                path: String(route.path ?? ''),
                searchText: `${ title } ${ route.meta?.short_title || '' } ${ route.path || '' } ${ route.name ?? '' }`.toLowerCase()
            }
        })
        .filter((item) => item.title !== '')
})

const results = computed<MenuSearchItem[]>(() => {
    const kw = keyword.value.trim().toLowerCase()
    if (!kw) return menuList.value.slice(0, MAX_RESULT)
    return menuList.value.filter((item) => item.searchText.includes(kw)).slice(0, MAX_RESULT)
})

const open = () => {
    visible.value = true
}

// 打开动画结束后聚焦输入框，避免动画期间聚焦导致抖动
const onOpened = () => {
    nextTick(() => inputRef.value?.focus?.())
}

const onClosed = () => {
    keyword.value = ''
}

// 与侧边栏一致：按路由路径跳转，路径缺失时退回按路由名跳转
const goMenu = (item: MenuSearchItem) => {
    if (!item.path && !item.name) return
    visible.value = false
    router.push(item.path || { name: item.name }).catch(() => {
        if (item.name) router.push({ name: item.name }).catch(() => {})
    })
}

const goFirst = () => {
    if (results.value.length) goMenu(results.value[0])
}
</script>

<style lang="scss" scoped>
/* 搜索入口：短输入框，聚焦或弹窗展开时略微加宽 */
.menu-search-trigger {
    flex-shrink: 0;
    width: 150px;
    transition: width 180ms ease;

    &:focus-within,
    &.is-active {
        width: 200px;
    }

    :deep(.el-input__wrapper) {
        cursor: pointer;
    }

    :deep(.el-input__inner) {
        cursor: pointer;
    }
}

.menu-search-body {
    display: flex;
    flex-direction: column;
}

.menu-search-input {
    padding: 12px;
}

.menu-search-list {
    border-top: 1px solid var(--el-border-color-lighter);
    padding: 4px 0;
}

.menu-search-item {
    padding: 8px 16px;
    font-size: 13px;
    line-height: 20px;
    color: #1d1f3a;
    cursor: pointer;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    &:hover {
        background-color: #f2f6ff;
        color: var(--el-color-primary);
    }
}

.menu-search-empty {
    padding: 24px 0;
    font-size: 12px;
    color: #a0a3bd;
    text-align: center;
}
</style>

<!-- el-dialog 由 Element Plus 渲染并 append 到 body，需用非 scoped 样式定制；
     提高选择器优先级（.el-dialog.menu-search-dialog）以覆盖组件库默认的 16px 内边距 -->
<style lang="scss">
.el-dialog.menu-search-dialog {
    --el-dialog-padding-primary: 0;

    padding: 0;
    border-radius: 4px;
    overflow: hidden;

    .el-dialog__header {
        display: none;
        padding: 0;
        margin: 0;
    }

    .el-dialog__body {
        padding: 0;
    }
}
</style>
