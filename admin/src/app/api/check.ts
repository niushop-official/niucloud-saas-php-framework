import request from '@/utils/request'
import storage from '@/utils/storage'
import envConfig from '@/utils/config'

/**
 * 校验场景
 * - cloud_build：云编译（发版 / 编译前）
 * - upgrade    ：系统升级（升级前）
 *
 * 注意：这里不能加 export。
 * .build/shared/core-shared.ts 是由脚本聚合各 api 模块导出生成的 barrel。
 * 该脚本按值重导出成员，而类型别名编译后并不存在于运行时，
 * 被收进去会在 Rollup 阶段报「成员未导出」的错误。
 * 保持模块内可见即可，函数签名里使用它不受影响。
 *
 * ★ 另外：该脚本是扫源码文本匹配的（不做语法解析），本文件注释里
 *   不要写出导出语句的字面示例，否则会被误当成真实导出写进 barrel。
 */
type CheckScene = 'cloud_build' | 'upgrade' | string

/**
 * 场景校验清单（不执行检测）
 *
 * 前端先拿到清单渲染出完整的待校验列表，再连接 SSE 逐项点亮结果，
 * 避免「等待首帧时空白 / 清单到达时突然出现」的观感。
 * @param scene 场景
 */
export function getCheckMeta(scene: CheckScene) {
    return request.get('sys/check/meta', {
        params: { scene },
        showErrorMessage: false
    })
}

/**
 * 清单缓存：同一场景的校验项由后端字典固定，缓存后再次打开弹窗可立即渲染，
 * 省掉一次请求（注意：这里是模块级变量，跨组件实例共享）
 */
const sceneMetaCache = new Map<string, { title: string, tip: string, items: any[] }>()

export function getCachedSceneMeta(scene: CheckScene): { title: string, tip: string, items: any[] } | null {
    return sceneMetaCache.get(String(scene)) ?? null
}

export function setCachedSceneMeta(scene: CheckScene, meta: { title: string, tip: string, items: any[] }) {
    if (!scene) return
    sceneMetaCache.set(String(scene), meta)
}

/**
 * 一次性校验（SSE 不可用时的降级通道）
 * @param scene  场景
 * @param params 业务参数（如升级的 addon）
 */
export function runCheck(scene: CheckScene, params: Record<string, any> = {}) {
    return request.get('sys/check/run', {
        params: { scene, params: JSON.stringify(params) },
        showErrorMessage: false
    })
}

/**
 * 构造流式校验的 SSE 地址
 *
 * EventSource 不支持自定义请求头，token 与 site-id 只能通过 query 传递
 * （后端 Request::adminToken() / Request::adminSiteId() 已支持 query 回退）。
 * 拼接口径与站内信推送、代码完整性检测保持一致。
 *
 * ★ 返回**绝对地址**：EventSource 是浏览器原生请求，不经过 request 封装，
 *   没有 baseURL 兜底，相对地址在子路径部署时会连到错误位置。
 *
 * @param scene  场景
 * @param params 业务参数（会被序列化为 JSON 字符串，避免 URL 参数结构限制）
 */
export function getCheckStreamUrl(scene: CheckScene, params: Record<string, any> = {}): string {
    const token = storage.get('token') || ''
    const siteId = storage.get('siteId') || 0
    const base = envConfig.VITE_APP_BASE_URL || '/adminapi/'
    const prefix = base.startsWith('http') ? base : `${ location.origin }${ base.startsWith('/') ? '' : '/' }${ base }`
    const path = `${ prefix }${ prefix.endsWith('/') ? '' : '/' }sys/check/stream`
    const tokenKey = envConfig.VITE_REQUEST_HEADER_TOKEN_KEY || 'token'
    const siteIdKey = envConfig.VITE_REQUEST_HEADER_SITEID_KEY || 'site-id'

    const query = new URLSearchParams({
        [ tokenKey ]: String(token),
        [ siteIdKey ]: String(siteId),
        scene: String(scene),
        params: JSON.stringify(params ?? {})
    })

    return `${ path }?${ query.toString() }`
}
