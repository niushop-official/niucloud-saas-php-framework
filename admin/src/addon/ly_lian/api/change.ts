import request from '@/utils/request'

// USER_CODE_BEGIN -- ly_lian_change
/**
 * 获取链动2+1关系变动列表
 * @param params
 * @returns
 */
export function getLianChangeList(params: Record<string, any>) {
    return request.get(`ly_lian/lian_change`, {params})
}

/**
 * 获取链动2+1关系变动详情
 * @param id 链动2+1关系变动id
 * @returns
 */
export function getLianChangeInfo(id: number) {
    return request.get(`ly_lian/lian_change/${id}`);
}

/**
 * 添加链动2+1关系变动
 * @param params
 * @returns
 */
export function addLianChange(params: Record<string, any>) {
    return request.post('ly_lian/lian_change', params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 编辑链动2+1关系变动
 * @param id
 * @param params
 * @returns
 */
export function editLianChange(params: Record<string, any>) {
    return request.put(`ly_lian/lian_change/${params.id}`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 删除链动2+1关系变动
 * @param id
 * @returns
 */
export function deleteLianChange(id: number) {
    return request.delete(`ly_lian/lian_change/${id}`, { showErrorMessage: true, showSuccessMessage: true })
}



// USER_CODE_END -- ly_lian_change