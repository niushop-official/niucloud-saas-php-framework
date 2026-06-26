import { isSplitBuildEnabled } from '@/utils/split-build'



type UniGlobal = typeof globalThis & {

    uni?: UniApp.Uni

    getCurrentPages?: () => UniApp.Page[]

}



/** 分构建下使用 Core 挂载的全局 uni，避免 addon 内嵌 uni-h5 副本 */

export function getUni(): UniApp.Uni {

    if (!isSplitBuildEnabled()) {

        return uni

    }

    const g = globalThis as UniGlobal

    if (g.uni && typeof (g.uni as UniApp.Uni & { reLaunch?: unknown }).reLaunch === 'function') {

        return g.uni

    }

    return new Proxy(g.uni || ({} as UniApp.Uni), {

        get(_target, prop: string | symbol) {

            const u = (globalThis as UniGlobal).uni as Record<string | symbol, unknown> | undefined

            if (!u) return undefined

            const val = u[prop]

            if (typeof val === 'function') {

                return (...args: unknown[]) => (val as (...a: unknown[]) => unknown).apply(u, args)

            }

            return val

        }

    }) as UniApp.Uni

}



/** 安全调用 uni API（分构建下优先走 Core 全局 uni） */

export function uniCall<K extends keyof UniApp.Uni>(

    method: K,

    ...args: Parameters<UniApp.Uni[K] extends (...a: infer A) => unknown ? (...a: A) => unknown : never>

): ReturnType<UniApp.Uni[K] extends (...a: infer _A) => infer R ? (...a: _A) => R : never> {

    const api = getUni()[method]

    if (typeof api !== 'function') {

        throw new TypeError(`uni.${String(method)} is not a function`)

    }

    return (api as (...a: unknown[]) => unknown).apply(getUni(), args) as ReturnType<

        UniApp.Uni[K] extends (...a: infer _A) => infer R ? (...a: _A) => R : never

    >

}

