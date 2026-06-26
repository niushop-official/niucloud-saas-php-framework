/**
 * 分构建下 addon 动态页面生命周期适配
 */
import {
    defineComponent,
    getCurrentInstance,
    h,
    inject,
    nextTick,
    onUnmounted,
    ref,
    type Component,
    type ComponentInternalInstance,
    type InjectionKey,
    type Ref,
    type ShallowRef
} from 'vue'
import { isSplitBuildEnabled } from '@/utils/split-build'

export const ADDON_PAGE_QUERY_KEY: InjectionKey<Ref<Record<string, unknown>>> =
    Symbol('addonPageQuery')

/** bridge 持有当前挂载的 addon 页实例，用于 onShow/onHide 转发（避免 keep-alive 下全局实例错乱） */
export const BRIDGE_ADDON_INSTANCE_KEY: InjectionKey<
    ShallowRef<ComponentInternalInstance | null>
> = Symbol('bridgeAddonInstance')

type UniPageHook = 'onLoad' | 'onShow' | 'onHide' | 'onUnload'

const WRAPPED = Symbol('addonLifecycleWrapped')

type SetupFn = (props: Record<string, unknown>, ctx: unknown) => unknown

type ComponentWithOpts = Component & {
    setup?: SetupFn
    __scopeId?: string
    __vccOpts?: Component & { setup?: SetupFn; __scopeId?: string }
}

function addonWrapClass(scopeId?: string) {
    if (!scopeId?.startsWith('data-v-')) return ''
    return `addon-wrap-${scopeId.slice('data-v-'.length)}`
}

type InstanceWithPage = ComponentInternalInstance & {
    $pageInstance?: ComponentInternalInstance
}

function runWithDeferredUniHooks<T>(instance: ComponentInternalInstance, fn: () => T): T {
    const inst = instance as InstanceWithPage
    const savedPageInstance = inst.$pageInstance
    inst.$pageInstance = instance
    try {
        return fn()
    } finally {
        inst.$pageInstance = savedPageInstance
    }
}

export function invokeAddonPageHooks(
    instance: ComponentInternalInstance,
    hook: UniPageHook,
    args?: unknown
) {
    const hooks = (instance as Record<string, unknown>)[hook]
    if (!Array.isArray(hooks) || hooks.length === 0) return
    for (const raw of hooks) {
        const fn =
            typeof raw === 'function'
                ? raw
                : (raw as { __weh?: (...a: unknown[]) => unknown }).__weh
        if (typeof fn === 'function') fn(args)
    }
}

function bindAddonInstance(
    bridgeRef: ShallowRef<ComponentInternalInstance | null> | undefined,
    instance: ComponentInternalInstance
) {
    if (bridgeRef) bridgeRef.value = instance
}

function unbindAddonInstance(
    bridgeRef: ShallowRef<ComponentInternalInstance | null> | undefined,
    instance: ComponentInternalInstance
) {
    if (bridgeRef && bridgeRef.value === instance) {
        bridgeRef.value = null
    }
}

function scheduleInitialPageHooks(
    instance: ComponentInternalInstance,
    pageQuery: Ref<Record<string, unknown>>,
    bridgeRef: ShallowRef<ComponentInternalInstance | null> | undefined,
    includeLoad: boolean
) {
    const run = () => {
        bindAddonInstance(bridgeRef, instance)
        if (includeLoad) {
            invokeAddonPageHooks(instance, 'onLoad', pageQuery.value)
        }
        invokeAddonPageHooks(instance, 'onShow')
    }

    queueMicrotask(() => {
        nextTick(run)
    })
}

function scheduleFragmentHooks(
    instance: ComponentInternalInstance,
    bridgeRef: ShallowRef<ComponentInternalInstance | null> | undefined
) {
    queueMicrotask(() => {
        nextTick(() => {
            bindAddonInstance(bridgeRef, instance)
            invokeAddonPageHooks(instance, 'onShow')
        })
    })
}

function patchSetupOnTarget(
    target: ComponentWithOpts,
    mode: 'page' | 'fragment'
) {
    const originalSetup = target.setup
    if (!originalSetup) return false

    target.setup = (props, ctx) => {
        const instance = getCurrentInstance()!
        const pageQuery =
            mode === 'page'
                ? inject(ADDON_PAGE_QUERY_KEY, ref({}))
                : ref({})
        const bridgeRef =
            mode === 'page'
                ? inject(BRIDGE_ADDON_INSTANCE_KEY, undefined)
                : undefined

        const setupResult = runWithDeferredUniHooks(instance, () =>
            originalSetup.call(target, props, ctx)
        )

        const finish = () => {
            if (mode === 'page') {
                scheduleInitialPageHooks(instance, pageQuery, bridgeRef, true)
            } else {
                scheduleFragmentHooks(instance, bridgeRef)
            }
        }

        if (setupResult instanceof Promise) {
            setupResult.then(() => nextTick(finish))
        } else {
            finish()
        }

        onUnmounted(() => unbindAddonInstance(bridgeRef, instance))
        return setupResult
    }

    return true
}

export function wrapAddonPageComponent(
    Comp: Component,
    mode: 'page' | 'fragment' = 'page'
): Component {
    if (!isSplitBuildEnabled() || !Comp || (Comp as Record<symbol, boolean>)[WRAPPED]) {
        return Comp
    }

    const comp = Comp as ComponentWithOpts
    const target = comp.__vccOpts || comp
    if (!patchSetupOnTarget(target, mode)) return Comp

    ;(Comp as Record<symbol, boolean>)[WRAPPED] = true

    const wrapClass = addonWrapClass(target.__scopeId || comp.__scopeId)
    if (!wrapClass) return Comp

    const Inner = Comp
    return defineComponent({
        name: mode === 'page' ? 'AddonPageShell' : 'AddonFragmentShell',
        inheritAttrs: false,
        setup(_props, { attrs, slots }) {
            return () =>
                h(
                    'div',
                    {
                        class: wrapClass,
                        style: mode === 'page' ? { minHeight: '100%' } : undefined
                    },
                    [h(Inner, attrs, slots)]
                )
        }
    }) as Component
}
