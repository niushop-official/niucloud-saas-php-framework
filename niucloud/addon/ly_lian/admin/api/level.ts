import request from '@/utils/request'

// USER_CODE_BEGIN -- ly_lian_level
/**
 * 获取链动2+1等级列表
 * @param params
 * @returns
 */
export function getLevelList(params: Record<string, any>) {
    return request.get(`ly_lian/level`, {params})
}

/**
 * 获取链动2+1等级详情
 * @param id 链动2+1等级id
 * @returns
 */
export function getLevelInfo(id: number) {
    return request.get(`ly_lian/level/${id}`);
}

/**
 * 添加链动2+1等级
 * @param params
 * @returns
 */
export function addLevel(params: Record<string, any>) {
    return request.post('ly_lian/level', params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 编辑链动2+1等级
 * @param id
 * @param params
 * @returns
 */
export function editLevel(params: Record<string, any>) {
    return request.put(`ly_lian/level/${params.id}`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 删除链动2+1等级
 * @param id
 * @returns
 */
export function deleteLevel(id: number) {
    return request.delete(`ly_lian/level/${id}`, { showErrorMessage: true, showSuccessMessage: true })
}


/**
 * 获取链动等级权重
 */
export function getLevelNum() {
    return request.get('ly_lian/level_num');
}
/**
 * 获取链动等级升级条件卡片
 */
export function getLevelCard(params: Record<string, any>) {
    return request.get('ly_lian/level_card',{params});
}



// USER_CODE_END -- ly_lian_level