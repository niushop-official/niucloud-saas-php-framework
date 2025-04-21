import request from '@/utils/request'

// USER_CODE_BEGIN -- qiankun_recharge_order
/**
 * 获取充值订单列表
 * @param params
 * @returns
 */
export function getOrderList(params: Record<string, any>) {
    return request.get(`qiankun_recharge/order`, {params})
}

/**
 * 获取充值订单详情
 * @param id 充值订单id
 * @returns
 */
export function getOrderInfo(id: number) {
    return request.get(`qiankun_recharge/order/${id}`);
}

/**
 * 添加充值订单
 * @param params
 * @returns
 */
export function addOrder(params: Record<string, any>) {
    return request.post('qiankun_recharge/order', params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 编辑充值订单
 * @param id
 * @param params
 * @returns
 */
export function editOrder(params: Record<string, any>) {
    return request.put(`qiankun_recharge/order/${params.id}`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 删除充值订单
 * @param id
 * @returns
 */
export function deleteOrder(id: number) {
    return request.delete(`qiankun_recharge/order/${id}`, { showErrorMessage: true, showSuccessMessage: true })
}

export function getWithMemberList(params: Record<string,any>){
    return request.get('qiankun_recharge/member_all', {params})
}export function getWithOptionsList(params: Record<string,any>){
    return request.get('qiankun_recharge/options_all', {params})
}

// USER_CODE_END -- qiankun_recharge_order
