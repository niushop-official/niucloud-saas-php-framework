import request from '@/utils/request'
export function getRealStatus() {
    return request.get(`tk_vip/real/status`)
}

// USER_CODE_BEGIN -- tkvip_real
/**
 * 获取实名认证列表
 * @param params
 * @returns
 */
export function getRealList(params: Record<string, any>) {
    return request.get(`tk_vip/real`, {params})
}

/**
 * 获取实名认证详情
 * @param id 实名认证id
 * @returns
 */
export function getRealInfo(id: number) {
    return request.get(`tk_vip/real/${id}`);
}

/**
 * 添加实名认证
 * @param params
 * @returns
 */
export function addReal(params: Record<string, any>) {
    return request.post('tk_vip/real', params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 编辑实名认证
 * @param id
 * @param params
 * @returns
 */
export function editReal(params: Record<string, any>) {
    return request.put(`tk_vip/real/${params.id}`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 删除实名认证
 * @param id
 * @returns
 */
export function deleteReal(id: number) {
    return request.delete(`tk_vip/real/${id}`, { showErrorMessage: true, showSuccessMessage: true })
}

export function getWithMemberList(params: Record<string,any>){
    return request.get('tk_vip/member_all', {params})
}

// USER_CODE_END -- tkvip_real
