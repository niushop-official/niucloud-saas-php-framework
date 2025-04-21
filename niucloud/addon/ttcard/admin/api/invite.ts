import request from '@/utils/request'



// USER_CODE_BEGIN -- ttcard_invite
/**
 * 获取微官网邀请管理列表
 * @param params
 * @returns
 */
export function getInviteList(params: Record<string, any>) {
    return request.get(`ttcard/invite`, {params})
}

/**
 * 获取微官网邀请管理详情
 * @param id 微官网邀请管理id
 * @returns
 */
export function getInviteInfo(id: number) {
    return request.get(`ttcard/invite/${id}`);
}

/**
 * 添加微官网邀请管理
 * @param params
 * @returns
 */
export function addInvite(params: Record<string, any>) {
    return request.post('ttcard/invite', params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 编辑微官网邀请管理
 * @param id
 * @param params
 * @returns
 */
export function editInvite(params: Record<string, any>) {
    return request.put(`ttcard/invite/${params.id}`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 删除微官网邀请管理
 * @param id
 * @returns
 */
export function deleteInvite(id: number) {
    return request.delete(`ttcard/invite/${id}`, { showErrorMessage: true, showSuccessMessage: true })
}

export function getWithUserList(params: Record<string,any>){
    return request.get('ttcard/user_all', {params})
}export function getWithWebsiteList(params: Record<string,any>){
    return request.get('ttcard/website_all', {params})
}export function getWithUserList2(params: Record<string,any>){
    return request.get('ttcard/user_all', {params})
}export function getWithCardList(params: Record<string,any>){
    return request.get('ttcard/card_all', {params})
}

// USER_CODE_END -- ttcard_invite
