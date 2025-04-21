import request from '@/utils/request'

// USER_CODE_BEGIN -- tkvip_vip
/**
 * 获取会员VIP管理列表
 * @param params
 * @returns
 */
export function getVipList(params: Record<string, any>) {
    return request.get(`tk_vip/vip`, {params})
}

/**
 * 获取会员VIP管理详情
 * @param id 会员VIP管理id
 * @returns
 */
export function getVipInfo(id: number) {
    return request.get(`tk_vip/vip/${id}`);
}

/**
 * 添加会员VIP管理
 * @param params
 * @returns
 */
export function addVip(params: Record<string, any>) {
    return request.post('tk_vip/vip', params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 编辑会员VIP管理
 * @param id
 * @param params
 * @returns
 */
export function editVip(params: Record<string, any>) {
    return request.put(`tk_vip/vip/${params.id}`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 删除会员VIP管理
 * @param id
 * @returns
 */
export function deleteVip(id: number) {
    return request.delete(`tk_vip/vip/${id}`, { showErrorMessage: true, showSuccessMessage: true })
}

export function getWithMemberList(params: Record<string,any>){
    return request.get('tk_vip/member_all', {params})
}export function getWithMemberLevelList(params: Record<string,any>){
    return request.get('tk_vip/member_level_all', {params})
}

// USER_CODE_END -- tkvip_vip
