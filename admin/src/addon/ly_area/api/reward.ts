import request from '@/utils/request'

// USER_CODE_BEGIN -- ly_area_reward
/**
 * 获取链动2+1奖励列表
 * @param params
 * @returns
 */
export function getAreaRewardList(params: Record<string, any>) {
    return request.get(`ly_area/area_reward`, {params})
}

/**
 * 获取链动2+1奖励详情
 * @param id 链动2+1奖励id
 * @returns
 */
export function getAreaRewardInfo(id: number) {
    return request.get(`ly_area/area_reward/${id}`);
}

/**
 * 添加链动2+1奖励
 * @param params
 * @returns
 */
export function addAreaReward(params: Record<string, any>) {
    return request.post('ly_area/area_reward', params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 编辑链动2+1奖励
 * @param id
 * @param params
 * @returns
 */
export function editAreaReward(params: Record<string, any>) {
    return request.put(`ly_area/area_reward/${params.id}`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 删除链动2+1奖励
 * @param id
 * @returns
 */
export function deleteAreaReward(id: number) {
    return request.delete(`ly_area/area_reward/${id}`, { showErrorMessage: true, showSuccessMessage: true })
}



// USER_CODE_END -- ly_area_reward