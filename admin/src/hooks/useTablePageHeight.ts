import { computed, nextTick, onActivated, onBeforeUnmount, onMounted, ref } from 'vue'

/**
 * 让列表页表格占满页面剩余高度，数据超出时在表格内部滚动。
 *
 * 使用方式（配合全局样式类 table-fill-page）：
 *
 * ```vue
 * const { pageRef, pageStyle } = useTablePageHeight()
 * ```
 *
 * 外层容器是 div 或 el-card 均可（el-card 时弹性容器落在 el-card__body 上），样式等价：
 *
 * ```html
 * <div ref="pageRef" class="main-container table-fill-page" :style="pageStyle">
 *     <div class="table-fill-page__card">
 *         <div class="table-search-wrap table-search-wrap--panel table-fill-page__search">搜索区</div>
 *         <div class="table-panel table-fill-page__panel">
 *             <table-toolbar />
 *             <div class="table-fill-page__table">
 *                 <el-table height="100%" />
 *             </div>
 *             <table-pagination />
 *         </div>
 *     </div>
 * </div>
 * ```
 */
export function useTablePageHeight() {
    const pageRef = ref<HTMLElement>()
    const pageHeight = ref(0)
    const pageStyle = computed(() => (pageHeight.value ? { height: `${pageHeight.value}px` } : undefined))

    let resizeObserver: ResizeObserver | null = null
    let resizeFrame = 0

    /**
     * 根据页面当前所在的滚动窗口计算剩余高度，兼容后台不同布局
     */
    const updatePageHeight = () => {
        const pageElement = pageRef.value
        if (!pageElement) return

        const scrollViewport = pageElement.closest('.el-scrollbar__wrap') as HTMLElement | null
        const viewportBottom = scrollViewport?.getBoundingClientRect().bottom ?? window.innerHeight
        const parentPaddingBottom = pageElement.parentElement
            ? Number.parseFloat(window.getComputedStyle(pageElement.parentElement).paddingBottom) || 0
            : 0
        const availableHeight = Math.floor(viewportBottom - pageElement.getBoundingClientRect().top - parentPaddingBottom)

        if (availableHeight > 0) pageHeight.value = availableHeight
    }

    const schedulePageHeightUpdate = () => {
        window.cancelAnimationFrame(resizeFrame)
        resizeFrame = window.requestAnimationFrame(updatePageHeight)
    }

    onMounted(async () => {
        await nextTick()
        schedulePageHeightUpdate()
        window.addEventListener('resize', schedulePageHeightUpdate)

        const scrollViewport = pageRef.value?.closest('.el-scrollbar__wrap')
        if (scrollViewport) {
            resizeObserver = new ResizeObserver(schedulePageHeightUpdate)
            resizeObserver.observe(scrollViewport)
        }
    })

    onActivated(() => {
        nextTick(schedulePageHeightUpdate)
    })

    onBeforeUnmount(() => {
        window.removeEventListener('resize', schedulePageHeightUpdate)
        resizeObserver?.disconnect()
        window.cancelAnimationFrame(resizeFrame)
    })

    return {
        pageRef,
        pageStyle,
        /** 容器或内容变化后可手动触发重新计算 */
        refreshTablePageHeight: schedulePageHeightUpdate
    }
}
