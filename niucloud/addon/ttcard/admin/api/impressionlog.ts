import request from '@/utils/request'



// USER_CODE_BEGIN -- ttcard_impressionlog
/**
 * 获取个人印象日志管理列表
 * @param params
 * @returns
 */
export function getImpressionlogList(params: Record<string, any>) {
    return request.get(`ttcard/impressionlog`, {params})
}

/**
 * 获取个人印象日志管理详情
 * @param id 个人印象日志管理id
 * @returns
 */
export function getImpressionlogInfo(id: number) {
    return request.get(`ttcard/impressionlog/${id}`);
}

/**
 * 添加个人印象日志管理
 * @param params
 * @returns
 */
export function addImpressionlog(params: Record<string, any>) {
    return request.post('ttcard/impressionlog', params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 编辑个人印象日志管理
 * @param id
 * @param params
 * @returns
 */
export function editImpressionlog(params: Record<string, any>) {
    return request.put(`ttcard/impressionlog/${params.id}`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 删除个人印象日志管理
 * @param id
 * @returns
 */
export function deleteImpressionlog(id: number) {
    return request.delete(`ttcard/impressionlog/${id}`, { showErrorMessage: true, showSuccessMessage: true })
}

export function getWithImpressionList(params: Record<string,any>){
    return request.get('ttcard/impression_all', {params})
}export function getWithUserList(params: Record<string,any>){
    return request.get('ttcard/user_all', {params})
}export function getWithCardList(params: Record<string,any>){
    return request.get('ttcard/card_all', {params})
}

// USER_CODE_END -- ttcard_impressionlog
