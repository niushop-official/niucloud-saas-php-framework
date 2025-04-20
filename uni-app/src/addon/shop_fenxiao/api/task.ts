import request from '@/utils/request'

/**
 * 任务奖励是否开启
 * @returns
 */
export function getTaskConfig() {
    return request.get("shop_fenxiao/task/config")
}

/**
 * 任务奖励分页列表
 * @returns
 */
export function getTaskList(params: Record<string, any>) {
    return request.get("shop_fenxiao/task/lists", params)
}

/**
 * 任务奖励详情
 * @returns
 */
export function getTaskInfo(id: number) {
    return request.get(`shop_fenxiao/task/detail/${ id }`)
}

/**
 * 任务奖励明细
 * @returns
 */
export function getTaskRecord(id: number) {
    return request.get(`shop_fenxiao/task_reward_list/${ id }`)
}