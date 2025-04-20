import request from '@/utils/request'





// USER_CODE_BEGIN -- qiankun_vip_card
/**
 * 获取会员卡密列表
 * @param params
 * @returns
 */
export function getCardList(params: Record<string, any>) {
    return request.get(`qiankun_vip_card/card`, {params})
}

/**
 * 获取会员卡密详情
 * @param id 会员卡密id
 * @returns
 */
export function getCardInfo(id: number) {
    return request.get(`qiankun_vip_card/card/${id}`);
}

/**
 * 添加会员卡密
 * @param params
 * @returns
 */
export function addCard(params: Record<string, any>) {
    return request.post('qiankun_vip_card/card', params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 编辑会员卡密
 * @param id
 * @param params
 * @returns
 */
export function editCard(params: Record<string, any>) {
    return request.put(`qiankun_vip_card/card/${params.id}`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 删除会员卡密
 * @param id
 * @returns
 */
export function deleteCard(id: number) {
    return request.delete(`qiankun_vip_card/card/${id}`, { showErrorMessage: true, showSuccessMessage: true })
}

export function getWithMemberLevelList(params: Record<string,any>){
    return request.get('qiankun_vip_card/member_level_all', {params})
}export function getWithOrderList(params: Record<string,any>){
    return request.get('qiankun_vip_card/order_all', {params})
}export function getWithMemberList(params: Record<string,any>){
    return request.get('qiankun_vip_card/member_all', {params})
}

// USER_CODE_END -- qiankun_vip_card
