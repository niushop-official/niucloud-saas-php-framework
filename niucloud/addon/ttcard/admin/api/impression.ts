import request from '@/utils/request'



// USER_CODE_BEGIN -- ttcard_impression
/**
 * 获取个人印象列表
 * @param params
 * @returns
 */
export function getImpressionList(params: Record<string, any>) {
    return request.get(`ttcard/impression`, {params})
}

/**
 * 获取个人印象详情
 * @param id 个人印象id
 * @returns
 */
export function getImpressionInfo(id: number) {
    return request.get(`ttcard/impression/${id}`);
}

/**
 * 添加个人印象
 * @param params
 * @returns
 */
export function addImpression(params: Record<string, any>) {
    return request.post('ttcard/impression', params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 编辑个人印象
 * @param id
 * @param params
 * @returns
 */
export function editImpression(params: Record<string, any>) {
    return request.put(`ttcard/impression/${params.id}`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 删除个人印象
 * @param id
 * @returns
 */
export function deleteImpression(id: number) {
    return request.delete(`ttcard/impression/${id}`, { showErrorMessage: true, showSuccessMessage: true })
}



// USER_CODE_END -- ttcard_impression
