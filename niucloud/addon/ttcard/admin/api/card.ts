import request from '@/utils/request'





// USER_CODE_BEGIN -- ttcard_card
/**
 * 获取名片管理列表
 * @param params
 * @returns
 */
export function getCardList(params: Record<string, any>) {
    return request.get(`ttcard/card`, {params})
}

/**
 * 获取名片管理详情
 * @param id 名片管理id
 * @returns
 */
export function getCardInfo(id: number) {
    return request.get(`ttcard/card/${id}`);
}

/**
 * 添加名片管理
 * @param params
 * @returns
 */
export function addCard(params: Record<string, any>) {
    return request.post('ttcard/card', params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 编辑名片管理
 * @param id
 * @param params
 * @returns
 */
export function editCard(params: Record<string, any>) {
    return request.put(`ttcard/card/${params.id}`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 删除名片管理
 * @param id
 * @returns
 */
export function deleteCard(id: number) {
    return request.delete(`ttcard/card/${id}`, { showErrorMessage: true, showSuccessMessage: true })
}

export function getWithUserList(params: Record<string,any>){
    return request.get('ttcard/user_all', {params})
}export function getWithIndustryList(params: Record<string,any>){
    return request.get('ttcard/industry_all', {params})
}export function getWithCardbackgroundList(params: Record<string,any>){
    return request.get('ttcard/cardbackground_all', {params})
}

// USER_CODE_END -- ttcard_card