import request from '@/utils/request'





// USER_CODE_BEGIN -- ttcard_collect
/**
 * 获取收藏管理列表
 * @param params
 * @returns
 */
export function getCollectList(params: Record<string, any>) {
    return request.get(`ttcard/collect`, {params})
}

/**
 * 获取收藏管理详情
 * @param id 收藏管理id
 * @returns
 */
export function getCollectInfo(id: number) {
    return request.get(`ttcard/collect/${id}`);
}

/**
 * 添加收藏管理
 * @param params
 * @returns
 */
export function addCollect(params: Record<string, any>) {
    return request.post('ttcard/collect', params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 编辑收藏管理
 * @param id
 * @param params
 * @returns
 */
export function editCollect(params: Record<string, any>) {
    return request.put(`ttcard/collect/${params.id}`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 删除收藏管理
 * @param id
 * @returns
 */
export function deleteCollect(id: number) {
    return request.delete(`ttcard/collect/${id}`, { showErrorMessage: true, showSuccessMessage: true })
}

export function getWithUserList(params: Record<string,any>){
    return request.get('ttcard/user_all', {params})
}export function getWithCardList(params: Record<string,any>){
    return request.get('ttcard/card_all', {params})
}

// USER_CODE_END -- ttcard_collect
