import request from '@/utils/request'

// USER_CODE_BEGIN -- tkvip_order
/**
 * 获取VIP订单列表
 * @param params
 * @returns
 */
export function getOrderList(params: Record<string, any>) {
    return request.get(`tk_vip/order`, {params})
}

/**
 * 获取VIP订单详情
 * @param id VIP订单id
 * @returns
 */
export function getOrderInfo(id: number) {
    return request.get(`tk_vip/order/${id}`);
}

/**
 * 添加VIP订单
 * @param params
 * @returns
 */
export function addOrder(params: Record<string, any>) {
    return request.post('tk_vip/order', params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 编辑VIP订单
 * @param id
 * @param params
 * @returns
 */
export function editOrder(params: Record<string, any>) {
    return request.put(`tk_vip/order/${params.id}`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 删除VIP订单
 * @param id
 * @returns
 */
export function deleteOrder(id: number) {
    return request.delete(`tk_vip/order/${id}`, { showErrorMessage: true, showSuccessMessage: true })
}

export function getWithMemberList(params: Record<string,any>){
    return request.get('tk_vip/member_all', {params})
}export function getWithMemberLevelList(params: Record<string,any>){
    return request.get('tk_vip/member_level_all', {params})
}

// USER_CODE_END -- tkvip_order
