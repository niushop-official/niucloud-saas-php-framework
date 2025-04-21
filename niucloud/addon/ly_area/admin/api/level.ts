import request from '@/utils/request'

// USER_CODE_BEGIN -- ly_area_level
/**
 * 获取区域代理等级列表
 * @param params
 * @returns
 */
export function getLevelList(params: Record<string, any>) {
    return request.get(`ly_area/level`, {params})
}

/**
 * 获取区域代理等级详情
 * @param level_id 区域代理等级level_id
 * @returns
 */
export function getLevelInfo(level_id: number) {
    return request.get(`ly_area/level/${level_id}`);
}

/**
 * 添加区域代理等级
 * @param params
 * @returns
 */
export function addLevel(params: Record<string, any>) {
    return request.post('ly_area/level', params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 编辑区域代理等级
 * @param level_id
 * @param params
 * @returns
 */
export function editLevel(params: Record<string, any>) {
    return request.put(`ly_area/level/${params.level_id}`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 删除区域代理等级
 * @param level_id
 * @returns
 */
export function deleteLevel(level_id: number) {
    return request.delete(`ly_area/level/${level_id}`, { showErrorMessage: true, showSuccessMessage: true })
}


export function getLevelNum() {
    return request.get(`ly_area/level_num`);
}

/**
 * 获取股东等级升级条件卡片
 */
export function getLevelCard(params: Record<string, any>) {
    return request.get('ly_area/level_card',{params});
}


//更新等级状态
export function updateLevelStatus(params: Record<string, any>) {
    return request.put(`ly_area/level_status`, params, { showSuccessMessage: true })
}





// USER_CODE_END -- ly_area_level