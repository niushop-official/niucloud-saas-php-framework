import request from '@/utils/request'
import storage from '@/utils/storage'
import envConfig from '@/utils/config'

/**
 * 目标列表（含各自版本与清单状态）
 * @param params { algorithm, is_bom, is_crlf_lf } 可选，用于让状态反映当前规则
 */
export function getIntegrityTargets(params?: Record<string, any>) {
    return request.get(`sys/integrity/targets`, { params })
}

/**
 * 可选算法
 */
export function getIntegrityAlgorithms() {
    return request.get(`sys/integrity/algorithms`)
}

/**
 * 页面配置（默认算法 / 分片大小 / 产品 / 版本 / 清单根目录 / 当前规则）
 */
export function getIntegrityConfig() {
    return request.get(`sys/integrity/config`)
}

/**
 * 单个目标的清单状态
 * @param params { target, algorithm, is_bom, is_crlf_lf }
 */
export function getIntegrityBaselineStatus(params: Record<string, any>) {
    return request.get(`sys/integrity/baseline_status`, { params })
}

/**
 * 分片检测
 * @param params { target, path, algorithm, is_bom, is_crlf_lf, cursor }
 */
export function checkIntegrity(params: Record<string, any>) {
    return request.post(`sys/integrity/check`, params)
}

/**
 * 单个文件的文本比对（官方 vs 本地）
 * @param params { target, file, algorithm, is_bom, is_crlf_lf }
 */
export function getIntegrityFileDiff(params: Record<string, any>) {
    return request.get(`sys/integrity/file_diff`, { params })
}

/**
 * 用官方内容写回本地文件（覆盖前逐文件备份）
 * @param data { target, files: string[], algorithm, is_bom, is_crlf_lf }
 */
export function restoreIntegrityFiles(data: Record<string, any>) {
    return request.post(`sys/integrity/restore`, data)
}

/**
 * 构造流式检测的 SSE 地址
 *
 * EventSource 不支持自定义请求头，token 与 site-id 只能通过 query 传递
 * （后端 Request::adminToken() / Request::adminSiteId() 已支持 query 回退）。
 * 拼接口径与站内信推送的 getMessageStreamUrl() 保持一致，避免两处各写一套。
 *
 * ★ 返回的是**绝对地址**：EventSource 用的是浏览器原生请求，不经过项目的 request 封装，
 *   也就没有 baseURL 兜底，相对地址在子路径部署时会连到错误的位置。
 *
 * @param params { target, path, algorithm, is_bom, is_crlf_lf }
 */
export function getIntegrityStreamUrl(params: Record<string, any> = {}) {
    const token = storage.get('token') || ''
    const siteId = storage.get('siteId') || 0
    const base = envConfig.VITE_APP_BASE_URL || '/adminapi/'
    const prefix = base.startsWith('http') ? base : `${location.origin}${base.startsWith('/') ? '' : '/'}${base}`
    const path = `${prefix}${prefix.endsWith('/') ? '' : '/'}sys/integrity/stream`
    const tokenKey = envConfig.VITE_REQUEST_HEADER_TOKEN_KEY || 'token'
    const siteIdKey = envConfig.VITE_REQUEST_HEADER_SITEID_KEY || 'site-id'

    const query = new URLSearchParams({
        [tokenKey]: String(token),
        [siteIdKey]: String(siteId)
    })

    Object.keys(params).forEach(key => {
        const value = params[key]
        if (value !== undefined && value !== null && value !== '') {
            query.set(key, String(value))
        }
    })

    return `${path}?${query.toString()}`
}
