import request from '@/utils/request'

// USER_CODE_BEGIN -- shortvideo_label
/**
 * 获取话题管理列表
 * @param params
 * @returns
 */
export function getLabelList(params: Record<string, any>) {
    return request.get(`shortvideo/label`, {params})
}

/**
 * 获取话题管理详情
 * @param id 话题管理id
 * @returns
 */
export function getLabelInfo(id: number) {
    return request.get(`shortvideo/label/${id}`);
}

/**
 * 添加话题管理
 * @param params
 * @returns
 */
export function addLabel(params: Record<string, any>) {
    return request.post('shortvideo/label', params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 编辑话题管理
 * @param id
 * @param params
 * @returns
 */
export function editLabel(params: Record<string, any>) {
    return request.put(`shortvideo/label/${params.id}`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 删除话题管理
 * @param id
 * @returns
 */
export function deleteLabel(id: number) {
    return request.delete(`shortvideo/label/${id}`, { showErrorMessage: true, showSuccessMessage: true })
}



// USER_CODE_END -- shortvideo_label
