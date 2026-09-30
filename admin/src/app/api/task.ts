import request from '@/utils/request'

/**
 * 获取当前进行中的任务（按站点隔离：互斥任务与非互斥任务可并行）
 * 返回：list（全部进行中任务）、queue_alive（队列是否可用）与优先展示的任务字段（互斥任务优先）
 */
export function getTaskActive() {
    return request.get('task/active', { showErrorMessage: false })
}

/**
 * 任务筛选配置（类型 / 状态选项，由后端字典统一维护）
 * @returns { types: [{label,value}], status: [{label,value}] }
 */
export function getTaskConfig() {
    return request.get('task/config')
}

/**
 * 创建统一任务
 * @param taskType cloud_build / upgrade
 * @param params   业务入参（云编译：scope/port/addon；升级：addon/data）
 */
export function createTask(taskType: string, params: Record<string, any> = {}) {
    return request.post(`task/create/${ taskType }`, { params }, { showSuccessMessage: false })
}

/**
 * 任务详情
 */
export function getTaskDetail(taskKey: string) {
    return request.get(`task/${ taskKey }`, { showErrorMessage: false })
}

/**
 * 驱动任务推进一片/一步
 * 队列可用时后端只回显状态不推进（driven_by=queue）；
 * 前端判定队列假死（状态长时间无变化）时传 force=true 强制接管驱动
 */
export function runTask(taskKey: string, cursor: string = '', force: boolean = false) {
    return request.post(`task/${ taskKey }/run`, { cursor, force: force ? 1 : 0 }, { showErrorMessage: false, showSuccessMessage: false })
}

/**
 * 用户决策（仅 waiting_input 状态生效）
 * @param code retry / cancel / rollback / continue
 */
export function operateTask(taskKey: string, code: string) {
    return request.post(`task/${ taskKey }/operate`, { code }, { showSuccessMessage: false })
}

/**
 * 取消任务
 */
export function cancelTask(taskKey: string) {
    return request.post(`task/${ taskKey }/cancel`)
}

/**
 * 终端输出事件（增量 / 全量回放）
 * @param taskKey
 * @param afterSeq 增量起点（0 表示全量）
 * @param limit    0 不限
 */
export function getTaskEvents(taskKey: string, afterSeq: number = 0, limit: number = 0) {
    return request.get(`task/${ taskKey }/events`, {
        params: { after_seq: afterSeq, limit },
        showErrorMessage: false
    })
}

/**
 * 节点审计记录
 */
export function getTaskSteps(taskKey: string) {
    return request.get(`task/${ taskKey }/steps`, { showErrorMessage: false })
}

/**
 * 任务记录分页列表
 */
export function getTaskRecords(params: Record<string, any>) {
    return request.get('task/records', { params })
}

/**
 * 任务产物（云编译：download.zip + 产物目录；备份：归档目录等）
 * @param taskKey 任务标识
 * @param depth 目录展开层数，默认 2 层
 */
export function getTaskArtifacts(taskKey: string, depth: number = 2, taskType: string = '') {
    return request.get(`task/${ taskKey }/artifact`, {
        params: { depth, type: taskType },
        showErrorMessage: false
    })
}

/**
 * 下载任务产物（二进制流）
 * @param taskKey 任务标识
 * @param path 产物内相对路径；不传表示下载产物压缩包
 */
export function downloadTaskArtifact(taskKey: string, path: string = '', taskType: string = '') {
    return request.get(`task/${ taskKey }/artifact/download`, {
        params: { path, type: taskType },
        responseType: 'blob',
        showErrorMessage: false
    })
}

/**
 * 删除任务记录（同步清理任务目录）
 * @param ids 逗号分隔字符串或 id 数组
 */
export function delTaskRecords(ids: string | number[]) {
    return request.delete('task/records', {
        params: { ids: Array.isArray(ids) ? ids.join(',') : ids },
        showSuccessMessage: true
    })
}
