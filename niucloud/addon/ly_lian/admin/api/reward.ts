import request from '@/utils/request'

// USER_CODE_BEGIN -- ly_lian_reward
/**
 * 获取链动2+1奖励列表
 * @param params
 * @returns
 */
export function getLianRewardList(params: Record<string, any>) {
    return request.get(`ly_lian/lian_reward`, {params})
}

/**
 * 获取链动2+1奖励详情
 * @param id 链动2+1奖励id
 * @returns
 */
export function getLianRewardInfo(id: number) {
    return request.get(`ly_lian/lian_reward/${id}`);
}

/**
 * 添加链动2+1奖励
 * @param params
 * @returns
 */
export function addLianReward(params: Record<string, any>) {
    return request.post('ly_lian/lian_reward', params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 编辑链动2+1奖励
 * @param id
 * @param params
 * @returns
 */
export function editLianReward(params: Record<string, any>) {
    return request.put(`ly_lian/lian_reward/${params.id}`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 删除链动2+1奖励
 * @param id
 * @returns
 */
export function deleteLianReward(id: number) {
    return request.delete(`ly_lian/lian_reward/${id}`, { showErrorMessage: true, showSuccessMessage: true })
}



// USER_CODE_END -- ly_lian_reward