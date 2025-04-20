import request from '@/utils/request'

// USER_CODE_BEGIN -- ttcard_cardbackground
/**
 * 获取背景图管理列表
 * @param params
 * @returns
 */
export function getCardbackgroundList(params: Record<string, any>) {
    return request.get(`ttcard/cardbackground`, {params})
}

/**
 * 获取背景图管理详情
 * @param id 背景图管理id
 * @returns
 */
export function getCardbackgroundInfo(id: number) {
    return request.get(`ttcard/cardbackground/${id}`);
}

/**
 * 添加背景图管理
 * @param params
 * @returns
 */
export function addCardbackground(params: Record<string, any>) {
    return request.post('ttcard/cardbackground', params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 编辑背景图管理
 * @param id
 * @param params
 * @returns
 */
export function editCardbackground(params: Record<string, any>) {
    return request.put(`ttcard/cardbackground/${params.id}`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 删除背景图管理
 * @param id
 * @returns
 */
export function deleteCardbackground(id: number) {
    return request.delete(`ttcard/cardbackground/${id}`, { showErrorMessage: true, showSuccessMessage: true })
}



// USER_CODE_END -- ttcard_cardbackground
