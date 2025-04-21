import request from '@/utils/request'

/**
 * 任务奖励分页列表
 */
export function getTaskList(params: Record<string, any>) {
    return request.get('shop_fenxiao/task', { params });
}

/**
 * 新增任务奖励
 * @param params
 * @returns
 */
export function addTask(params: Record<string, any>) {
    return request.post('shop_fenxiao/task', params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 编辑任务奖励
 * @param params
 * @returns
 */
export function editTask(params: Record<string, any>) {
    return request.put(`shop_fenxiao/task/${ params.id }`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 删除任务奖励
 * @param params
 * @returns
 */
export function deleteTask(params: Record<string, any>) {
    return request.delete(`shop_fenxiao/task/${ params.id }`, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 任务奖励详情
 * @param params
 * @returns
 */
export function getTaskDetail(params: Record<string, any>) {
    return request.get(`shop_fenxiao/task/${ params.id }`, { params })
}


/**
 * 任务失效
 * @param params
 * @returns
 */
export function taskFinish(params: Record<string, any>) {
    return request.put(`shop_fenxiao/task_finish/${ params.id }`, params, {
        showErrorMessage: true,
        showSuccessMessage: true
    })
}

/**
 * 获取任务奖励配置
 * @returns
 */
export function getTaskConfig() {
    return request.get(`shop_fenxiao/task_config`)
}

/**
 * 设置任务奖励配置
 * @param params
 * @returns
 */
export function setTaskConfig(params: Record<string, any>) {
    return request.put(`shop_fenxiao/task_config`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 获取任务状态
 * @returns
 */
export function getTaskStatus() {
    return request.get(`shop_fenxiao/task_status`)
}

/**
 * 奖励明细分页列表
 * @param params
 * @returns
 */
export function getTaskMemberList(params: Record<string, any>) {
    return request.get(`shop_fenxiao/task_member`, { params })
}

/**
 * 奖励明细详情
 * @param params
 * @returns
 */
export function getTaskMemberDetail(params: Record<string, any>) {
    return request.get(`shop_fenxiao/task_member/${ params.id }`, { params })
}