import { inject, nextTick, provide, ref, watch, type InjectionKey, type Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

/**
 * el-menu 用于清空高亮的哨兵值（不会与任何真实路由 name 重合）
 */
export const BLANK_RESET_VALUE = '__blank_reset__'

/**
 * 菜单高亮回滚方法的注入 key，由承载菜单树的组件 provide，menu-item 通过 useMenuJump 消费
 */
export const MENU_ACTIVE_RESET_KEY: InjectionKey<() => Promise<void>> = Symbol('menuActiveReset')

/**
 * 是否需要新窗口打开
 *
 * 仅菜单类型（menu_type=1）支持该属性；后端 tinyint 可能返回字符串 "0"/"1"，故统一按数值判断。
 * @param meta 路由 meta
 */
export function isBlankMenu(meta?: Record<string, any> | null): boolean {
    return Number(meta?.type) === 1 && Number(meta?.is_blank) === 1
}

/**
 * 受控菜单高亮
 *
 * 在承载菜单树（二级菜单）的组件中调用，把返回的 menuActive 绑定到 el-menu 的 :default-active。
 * 同时向子孙 menu-item 注入高亮回滚方法：点击需要新窗口打开的菜单后调用，使高亮停留在原菜单。
 *
 * 原理：el-menu 在 :router="false" 时点击会直接改写内部 activeIndex；
 * 把 default-active 先置为哨兵值、再置回当前路由，可触发 el-menu 重新同步，从而恢复原高亮。
 * 两次更新处于同一渲染周期，无可见闪烁。
 */
export function useMenuActive() {
    const route = useRoute()
    const menuActive = ref(String(route.name || ''))

    watch(() => route.name, () => {
        menuActive.value = String(route.name || '')
    })

    const resetMenuActive = async () => {
        menuActive.value = BLANK_RESET_VALUE
        await nextTick()
        menuActive.value = String(route.name || '')
    }
    provide(MENU_ACTIVE_RESET_KEY, resetMenuActive)

    return { menuActive, resetMenuActive }
}

/**
 * 一次性回滚任意高亮 ref（用于一级菜单使用自定义高亮变量的场景）
 * @param target 高亮 ref
 * @param backValue 回滚后的值（通常是当前路由 name）
 */
export async function rollbackMenuActive<T>(target: Ref<T>, backValue: T): Promise<void> {
    target.value = BLANK_RESET_VALUE as unknown as T
    await nextTick()
    target.value = backValue
}

/**
 * 菜单点击跳转
 *
 * 在 menu-item 中调用（需处于 setup 作用域）：返回 true 表示已按"新窗口打开"处理，
 * 调用方应直接 return，不再执行 router.push。
 */
export function useMenuJump() {
    const router = useRouter()
    const resetMenuActive = inject(MENU_ACTIVE_RESET_KEY, null)

    /**
     * @param routeName 最终确定要跳转的路由 name
     * @param meta 菜单项的路由 meta
     * @returns 是否已新窗口打开
     */
    const handleMenuJump = (routeName: string, meta?: Record<string, any> | null): boolean => {
        if (!isBlankMenu(meta)) return false
        const { href } = router.resolve({ name: routeName })
        window.open(href, '_blank')
        resetMenuActive && resetMenuActive()
        return true
    }

    return { handleMenuJump }
}
