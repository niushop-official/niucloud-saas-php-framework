import request from '@/utils/request'



// USER_CODE_BEGIN -- ttcard_cardmsg
/**
 * 获取消息管理列表
 * @param params
 * @returns
 */
export function getCardmsgList(params: Record<string, any>) {
    return request.get(`ttcard/cardmsg`, {params})
}

/**
 * 获取消息管理详情
 * @param id 消息管理id
 * @returns
 */
export function getCardmsgInfo(id: number) {
    return request.get(`ttcard/cardmsg/${id}`);
}

/**
 * 添加消息管理
 * @param params
 * @returns
 */
export function addCardmsg(params: Record<string, any>) {
    return request.post('ttcard/cardmsg', params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 编辑消息管理
 * @param id
 * @param params
 * @returns
 */
export function editCardmsg(params: Record<string, any>) {
    return request.put(`ttcard/cardmsg/${params.id}`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 删除消息管理
 * @param id
 * @returns
 */
export function deleteCardmsg(id: number) {
    return request.delete(`ttcard/cardmsg/${id}`, { showErrorMessage: true, showSuccessMessage: true })
}

export function getWithUserList(params: Record<string,any>){
    return request.get('ttcard/user_all', {params})
}
export function getWithUserList2(params: Record<string,any>){
    return request.get('ttcard/user_all', {params})
}
export function getWithCardList(params: Record<string,any>){
    return request.get('ttcard/card_all', {params})
}

// USER_CODE_END -- ttcard_cardmsg
